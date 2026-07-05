from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import Blueprint, current_app, jsonify, request
from flask_mail import Message
from werkzeug.security import check_password_hash, generate_password_hash

from models import (
    Alert,
    EmbeddedDevice,
    ThresholdConfig,
    DeviceThreshold,
    TemperatureLog,
    TemperatureSensor,
    User,
    db,
)

api = Blueprint("api", __name__, url_prefix="/api")


# ---------------------------------------------------------------------------
# Auth helpers
# ---------------------------------------------------------------------------

def generate_token(user):
    payload = {
        "user_id": user.user_id,
        "role": user.role,
        "exp": datetime.utcnow() + timedelta(hours=8),
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")


def token_required(f):
    """Validates the JWT sent in the Authorization header and attaches
    the current user to request.current_user."""

    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.split(" ")[1] if auth_header.startswith("Bearer ") else None

        if not token:
            return jsonify({"success": False, "message": "Unauthorized access"}), 401

        try:
            payload = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Unauthorized access"}), 401

        current_user = User.query.get(payload["user_id"])
        if current_user is None:
            return jsonify({"success": False, "message": "Unauthorized access"}), 401

        request.current_user = current_user
        return f(*args, **kwargs)

    return decorated


def roles_required(*roles):
    """Restricts an endpoint to specific roles (e.g. OWNER only),
    matching the Access Control Matrix in the API documentation."""

    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if request.current_user.role not in roles:
                return jsonify({"success": False, "message": "Unauthorized access"}), 403
            return f(*args, **kwargs)

        return decorated

    return wrapper


# ---------------------------------------------------------------------------
# Alert email notifications
# ---------------------------------------------------------------------------

def send_alert_email(alert, device):
    mail = current_app.extensions.get("mail")
    if mail is None:
        return

    recipients = [
        u.email for u in User.query.filter(User.role.in_(["OWNER", "ADMIN"])).all()
    ]
    if not recipients:
        return

    msg = Message(
        subject=f"[FlexSight] {alert.severity} alert - Device {device.device_id}",
        recipients=recipients,
        body=(
            f"A {alert.severity} temperature alert was triggered.\n\n"
            f"Device ID: {device.device_id}\n"
            f"Temperature: {alert.temperature}\n"
            f"Time: {alert.created_at}\n"
        ),
    )
    mail.send(msg)


def check_threshold_and_alert(device, sensor, temperature):
    """Compares the reading against the active threshold linked to this
    device (via device_thresholds) and creates/sends an alert if needed."""

    device_threshold = DeviceThreshold.query.filter_by(device_id=device.device_id).first()
    if device_threshold is None:
        return None

    config = ThresholdConfig.query.get(device_threshold.config_id)
    if config is None or not config.is_active:
        return None

    severity = None
    if temperature >= float(config.critical_value):
        severity = "CRITICAL"
    elif temperature >= float(config.warning_value):
        severity = "WARNING"

    if severity is None:
        return None

    alert = Alert(
        device_id=device.device_id,
        temperature=temperature,
        severity=severity,
        status="OPEN",
    )
    db.session.add(alert)
    db.session.commit()

    send_alert_email(alert, device)
    return alert


# ---------------------------------------------------------------------------
# Auth endpoints
# ---------------------------------------------------------------------------

@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = (data.get("role") or "").upper()

    if not all([username, email, password, role]):
        return jsonify({"success": False, "message": "Invalid sensor data"}), 400

    if role not in ("OWNER", "ADMIN", "INSPECTOR"):
        return jsonify({"success": False, "message": "Invalid role"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"success": False, "message": "User already exists"}), 409

    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password, method='pbkdf2:sha256'),
        role=role,
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": True, "message": "User account created successfully"}), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user is None or not check_password_hash(user.password_hash, password or ""):
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

    user.last_login = datetime.utcnow()
    db.session.commit()

    token = generate_token(user)
    return jsonify({"success": True, "role": user.role, "token": token}), 200


@api.route("/logout", methods=["POST"])
@token_required
def logout():
    # JWTs are stateless, so logout is handled client-side by discarding the
    # token. This endpoint exists to match the documented API contract.
    return jsonify({"success": True, "message": "Logged out successfully"}), 200


# ---------------------------------------------------------------------------
# Readings endpoints
# ---------------------------------------------------------------------------

@api.route("/readings", methods=["POST"])
def create_reading():
    """Receives a reading forwarded from the ESP32 device (via MQTT bridge
    or direct HTTP call). No token is required here since the device
    authenticates itself, per the Access Control Matrix ('System')."""

    data = request.get_json(silent=True) or {}
    device_id = data.get("device_id")
    temperature = data.get("temperature")

    if device_id is None or temperature is None:
        return jsonify({"success": False, "message": "Invalid sensor data"}), 400

    device = EmbeddedDevice.query.get(device_id)
    if device is None:
        return jsonify({"success": False, "message": "Device not found"}), 404

    try:
        temperature = float(temperature)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Invalid sensor data"}), 400

    sensor = TemperatureSensor.query.filter_by(device_id=device.device_id).first()
    if sensor is None:
        return jsonify({"success": False, "message": "Invalid sensor data"}), 400

    sensor.current_temperature = temperature
    log = TemperatureLog(sensor_id=sensor.sensor_id, temperature=temperature)
    db.session.add(log)

    device.last_heartbeat = datetime.utcnow()
    device.status = "online"
    db.session.commit()

    check_threshold_and_alert(device, sensor, temperature)

    return jsonify({"success": True, "message": "Reading stored successfully"}), 201


@api.route("/readings", methods=["GET"])
@token_required
def get_readings():
    device_id = request.args.get("device_id", type=int)
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    query = TemperatureLog.query.join(TemperatureSensor)

    if device_id:
        query = query.filter(TemperatureSensor.device_id == device_id)
    if start_date:
        query = query.filter(TemperatureLog.recorded_at >= start_date)
    if end_date:
        query = query.filter(TemperatureLog.recorded_at <= end_date)

    logs = query.order_by(TemperatureLog.recorded_at.desc()).all()

    result = [
        {
            "device_id": log.sensor.device_id,
            "temperature": float(log.temperature),
            "timestamp": log.recorded_at.isoformat(),
        }
        for log in logs
    ]
    return jsonify(result), 200


# ---------------------------------------------------------------------------
# Alerts endpoints
# ---------------------------------------------------------------------------

@api.route("/alerts", methods=["GET"])
@token_required
def get_alerts():
    alerts = Alert.query.order_by(Alert.created_at.desc()).all()
    result = [
        {
            "alert_id": a.alert_id,
            "device_id": a.device_id,
            "severity": a.severity,
            "temperature": float(a.temperature),
            "status": a.status,
            "triggered_at": a.created_at.isoformat(),
        }
        for a in alerts
    ]
    return jsonify(result), 200


@api.route("/alerts/<int:alert_id>", methods=["PUT"])
@token_required
def update_alert(alert_id):
    alert = Alert.query.get(alert_id)
    if alert is None:
        return jsonify({"success": False, "message": "Alert not found"}), 404

    data = request.get_json(silent=True) or {}
    status = (data.get("status") or "").upper()

    if status not in ("OPEN", "ACKNOWLEDGED", "RESOLVED"):
        return jsonify({"success": False, "message": "Invalid sensor data"}), 400

    alert.status = status
    if status == "RESOLVED":
        alert.resolved_by = request.current_user.user_id
        alert.resolved_at = datetime.utcnow()

    db.session.commit()
    return jsonify({"success": True, "message": "Alert updated successfully"}), 200


# ---------------------------------------------------------------------------
# Devices endpoint
# ---------------------------------------------------------------------------

@api.route("/devices", methods=["GET"])
@token_required
def get_devices():
    devices = EmbeddedDevice.query.all()
    result = [
        {
            "device_id": d.device_id,
            "status": d.status,
            "is_active": d.is_active,
            "last_heartbeat": d.last_heartbeat.isoformat() if d.last_heartbeat else None,
            "firmware_version": d.firmware_version,
        }
        for d in devices
    ]
    return jsonify(result), 200


# ---------------------------------------------------------------------------
# Users endpoint (Owner only)
# ---------------------------------------------------------------------------

@api.route("/users", methods=["GET"])
@token_required
@roles_required("OWNER")
def get_users():
    users = User.query.all()
    result = [
        {
            "user_id": u.user_id,
            "username": u.username,
            "role": u.role,
            "account_status": "active",
        }
        for u in users
    ]
    return jsonify(result), 200


# ---------------------------------------------------------------------------
# Threshold settings endpoint (Owner only)
# ---------------------------------------------------------------------------

@api.route("/settings/threshold", methods=["PUT"])
@token_required
@roles_required("OWNER")
def update_threshold():
    data = request.get_json(silent=True) or {}
    warning_threshold = data.get("warning_threshold")
    critical_threshold = data.get("critical_threshold")

    if warning_threshold is None or critical_threshold is None:
        return jsonify({"success": False, "message": "Invalid sensor data"}), 400

    config = ThresholdConfig.query.filter_by(is_active=True).first()
    if config is None:
        config = ThresholdConfig(
            warning_value=warning_threshold,
            critical_value=critical_threshold,
            is_active=True,
        )
        db.session.add(config)
    else:
        config.warning_value = warning_threshold
        config.critical_value = critical_threshold

    db.session.commit()
    return jsonify({"success": True, "message": "Threshold updated successfully"}), 200


# ---------------------------------------------------------------------------
# Generic error handlers
# ---------------------------------------------------------------------------

@api.errorhandler(500)
def internal_error(error):
    return jsonify({"success": False, "message": "Internal server error"}), 500
