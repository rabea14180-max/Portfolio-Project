from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import Blueprint, current_app, jsonify, request
from flask_mail import Message
from werkzeug.security import check_password_hash, generate_password_hash

from models import (
    Alert,
    Dashboard,
    EmbeddedDevice,
    ThresholdConfig,
    DeviceThreshold,
    TemperatureLog,
    TemperatureSensor,
    User,
    db,
)

# POST /api/readings is the only endpoint left under /api - it's the ESP32/MQTT
# device ingestion contract, not part of the user-facing dashboard API surface.
api = Blueprint("api", __name__, url_prefix="/api")
auth = Blueprint("auth", __name__, url_prefix="/auth")
users_bp = Blueprint("users", __name__, url_prefix="/users")
dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")


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
        u.email
        for u in User.query.filter(
            User.dashboard_id == device.dashboard_id,
            User.role.in_(["OWNER", "ADMIN"]),
        ).all()
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
        dashboard_id=device.dashboard_id,
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
# Auth endpoints (/auth)
# ---------------------------------------------------------------------------

@auth.route("/register-owner", methods=["POST"])
def register_owner():
    """Public self-registration. Anyone can register as an Owner, which is how
    a new dashboard/workspace is bootstrapped - there is no one above an Owner
    to create that account for them."""

    data = request.get_json(silent=True) or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"success": False, "message": "User already exists"}), 409

    owner = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password, method="pbkdf2:sha256"),
        role="OWNER",
    )
    db.session.add(owner)
    db.session.flush()  # assigns owner.user_id without committing yet

    dashboard = Dashboard(owner_id=owner.user_id)
    db.session.add(dashboard)
    db.session.flush()  # assigns dashboard.dashboard_id

    owner.dashboard_id = dashboard.dashboard_id
    db.session.commit()

    return jsonify({"success": True, "message": "Owner account created successfully"}), 201


@auth.route("/login", methods=["POST"])
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


@auth.route("/logout", methods=["POST"])
@token_required
def logout():
    # JWTs are stateless, so logout is handled client-side by discarding the
    # token. This endpoint exists to match the documented API contract.
    return jsonify({"success": True, "message": "Logged out successfully"}), 200


# ---------------------------------------------------------------------------
# User management endpoints (/users) - Owner only
# ---------------------------------------------------------------------------

def _create_dashboard_user(role):
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"success": False, "message": "User already exists"}), 409

    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password, method="pbkdf2:sha256"),
        role=role,
        dashboard_id=request.current_user.dashboard_id,
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": True, "message": "User account created successfully"}), 201


@users_bp.route("/admin", methods=["POST"])
@token_required
@roles_required("OWNER")
def create_admin():
    return _create_dashboard_user("ADMIN")


@users_bp.route("/inspector", methods=["POST"])
@token_required
@roles_required("OWNER")
def create_inspector():
    return _create_dashboard_user("INSPECTOR")


@users_bp.route("", methods=["GET"])
@token_required
@roles_required("OWNER")
def get_users():
    members = User.query.filter(
        User.dashboard_id == request.current_user.dashboard_id
    ).all()
    result = [
        {
            "user_id": u.user_id,
            "username": u.username,
            "role": u.role,
            "account_status": "active",
        }
        for u in members
    ]
    return jsonify(result), 200


@users_bp.route("/<int:user_id>", methods=["DELETE"])
@token_required
@roles_required("OWNER")
def delete_user(user_id):
    target = User.query.filter(
        User.user_id == user_id,
        User.dashboard_id == request.current_user.dashboard_id,
    ).first()

    if target is None:
        return jsonify({"success": False, "message": "User not found"}), 404

    if target.role == "OWNER":
        return jsonify({"success": False, "message": "Cannot delete the dashboard owner"}), 400

    db.session.delete(target)
    db.session.commit()

    return jsonify({"success": True, "message": "User deleted successfully"}), 200


# ---------------------------------------------------------------------------
# Readings ingestion (/api/readings) - unauthenticated device/system endpoint
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


# ---------------------------------------------------------------------------
# Dashboard endpoints (/dashboard) - scoped to request.current_user.dashboard_id
# ---------------------------------------------------------------------------

@dashboard_bp.route("", methods=["GET"])
@token_required
def get_dashboard():
    dashboard = Dashboard.query.get(request.current_user.dashboard_id)
    if dashboard is None:
        return jsonify({"success": False, "message": "Dashboard not found"}), 404

    return jsonify(
        {
            "dashboard_id": dashboard.dashboard_id,
            "created_at": dashboard.created_at.isoformat(),
            "owner_username": dashboard.owner.username,
        }
    ), 200


@dashboard_bp.route("/devices", methods=["GET"])
@token_required
@roles_required("OWNER", "ADMIN")
def get_devices():
    devices = EmbeddedDevice.query.filter(
        EmbeddedDevice.dashboard_id == request.current_user.dashboard_id
    ).all()
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


@dashboard_bp.route("/readings", methods=["GET"])
@token_required
@roles_required("OWNER", "ADMIN")
def get_readings():
    device_id = request.args.get("device_id", type=int)
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    query = (
        TemperatureLog.query.join(TemperatureSensor)
        .join(EmbeddedDevice)
        .filter(EmbeddedDevice.dashboard_id == request.current_user.dashboard_id)
    )

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


@dashboard_bp.route("/alerts", methods=["GET"])
@token_required
def get_alerts():
    alerts = (
        Alert.query.filter(Alert.dashboard_id == request.current_user.dashboard_id)
        .order_by(Alert.created_at.desc())
        .all()
    )
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


@dashboard_bp.route("/alerts/<int:alert_id>", methods=["PUT"])
@token_required
def update_alert(alert_id):
    alert = Alert.query.filter(
        Alert.alert_id == alert_id,
        Alert.dashboard_id == request.current_user.dashboard_id,
    ).first()
    if alert is None:
        return jsonify({"success": False, "message": "Alert not found"}), 404

    data = request.get_json(silent=True) or {}
    status = (data.get("status") or "").upper()

    if status not in ("OPEN", "ACKNOWLEDGED", "RESOLVED"):
        return jsonify({"success": False, "message": "Invalid status value"}), 400

    alert.status = status
    if status == "RESOLVED":
        alert.resolved_by = request.current_user.user_id
        alert.resolved_at = datetime.utcnow()

    db.session.commit()
    return jsonify({"success": True, "message": "Alert updated successfully"}), 200


@dashboard_bp.route("/settings/threshold", methods=["PUT"])
@token_required
@roles_required("OWNER", "ADMIN")
def update_threshold():
    data = request.get_json(silent=True) or {}
    warning_threshold = data.get("warning_threshold")
    critical_threshold = data.get("critical_threshold")

    if warning_threshold is None or critical_threshold is None:
        return jsonify({"success": False, "message": "Missing threshold values"}), 400

    config = ThresholdConfig.query.filter_by(
        dashboard_id=request.current_user.dashboard_id, is_active=True
    ).first()
    if config is None:
        config = ThresholdConfig(
            dashboard_id=request.current_user.dashboard_id,
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
