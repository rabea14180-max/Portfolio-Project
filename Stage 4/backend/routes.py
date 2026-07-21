import hashlib
import ipaddress
import secrets
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
    Notification,
    ThresholdConfig,
    DeviceThreshold,
    TemperatureLog,
    TemperatureSensor,
    User,
    db,
)

# All user-facing blueprints live under /api so nginx can proxy exactly one
# prefix to Flask and fall back to the React SPA's index.html for everything
# else. Without this, a browser refresh on a route like /dashboard or /users
# (which React Router also owns) hit these blueprints directly instead of
# the SPA shell.
api = Blueprint("api", __name__, url_prefix="/api")
auth = Blueprint("auth", __name__, url_prefix="/api/auth")
users_bp = Blueprint("users", __name__, url_prefix="/api/users")
dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")


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
        print("Mail extension not found.")
        return

    recipients = [
        u.email
        for u in User.query.filter(
            User.dashboard_id == device.dashboard_id,
            User.role.in_(["OWNER", "ADMIN"]),
        ).all()
    ]

    if not recipients:
        print("No recipients found.")
        return

    msg = Message(
        subject=f"[FlexSight] {alert.severity} Alert - Device {device.device_id}",
        sender=current_app.config.get("MAIL_DEFAULT_SENDER"),
        recipients=recipients,
        body=(
            f"Temperature Alert\n\n"
            f"Device ID: {device.device_id}\n"
            f"Temperature: {alert.temperature}°C\n"
            f"Severity: {alert.severity}\n"
            f"Time: {alert.created_at}\n"
        ),
    )

    try:
        mail.send(msg)
        print("Email sent successfully.")
    except Exception as e:
        print(f"Email sending failed: {e}")
        
def check_threshold_and_alert(device, sensor, temperature):
    """Checks the temperature against the device threshold.

    Creates one alert and sends one email when the temperature crosses
    the warning or critical threshold. It also resolves active alerts
    automatically when the temperature returns to normal.
    """

    device_threshold = DeviceThreshold.query.filter_by(
        device_id=device.device_id
    ).first()

    if device_threshold is None:
        return None

    config = ThresholdConfig.query.get(device_threshold.config_id)

    if config is None or not config.is_active:
        return None

    warning_value = float(config.warning_value)
    critical_value = float(config.critical_value)

    # Temperature returned to normal:
    # automatically resolve any active alerts for this device.
    if temperature < warning_value:
        active_alerts = Alert.query.filter(
            Alert.dashboard_id == device.dashboard_id,
            Alert.device_id == device.device_id,
            Alert.status.in_(["OPEN", "ACKNOWLEDGED"]),
        ).all()

        if active_alerts:
            for active_alert in active_alerts:
                active_alert.status = "RESOLVED"
                active_alert.resolved_at = datetime.utcnow()

            db.session.commit()

        return None

    if temperature >= critical_value:
        severity = "CRITICAL"
    else:
        severity = "WARNING"

    # Do not create another alert while an OPEN or ACKNOWLEDGED alert exists.
    existing_alert = Alert.query.filter(
        Alert.dashboard_id == device.dashboard_id,
        Alert.device_id == device.device_id,
        Alert.status.in_(["OPEN", "ACKNOWLEDGED"]),
    ).first()

    if existing_alert:
        return existing_alert

    alert = Alert(
        dashboard_id=device.dashboard_id,
        device_id=device.device_id,
        temperature=temperature,
        severity=severity,
        status="OPEN",
    )

    db.session.add(alert)
    db.session.commit()

    try:
        send_alert_email(alert, device)
    except Exception as e:
        print(f"Email Error: {e}")

    return alert


# ---------------------------------------------------------------------------
# Password reset email
# ---------------------------------------------------------------------------

RESET_TOKEN_TTL_MINUTES = 30


def send_reset_email(user, raw_token):
    mail = current_app.extensions.get("mail")
    # MAIL_USERNAME unset means the SMTP server isn't actually configured
    # yet (Mail(app) is always registered regardless). Sending would try to
    # open a real SMTP connection with no credentials and can hang well
    # past gunicorn's worker timeout, killing the request with a bare 500
    # instead of the JSON error responses this API otherwise always returns.
    if mail is None or not current_app.config.get("MAIL_USERNAME"):
        current_app.logger.warning(
            "Skipping password reset email for user_id=%s: MAIL_USERNAME is not configured.",
            user.user_id,
        )
        return

    reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password?token={raw_token}"
    msg = Message(
        subject="[FlexSight] Reset your password",
        recipients=[user.email],
        body=(
            "We received a request to reset your FlexSight password.\n\n"
            f"Reset your password: {reset_link}\n\n"
            f"This link expires in {RESET_TOKEN_TTL_MINUTES} minutes. "
            "If you didn't request this, you can safely ignore this email."
        ),
    )
    mail.send(msg)


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


@auth.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()

    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    # Always return the same generic response whether or not the email is
    # registered, so this endpoint can't be used to discover which emails
    # have accounts.
    generic_response = jsonify(
        {"success": True, "message": "If that email is registered, a reset link has been sent."}
    )

    user = User.query.filter_by(email=email).first()
    if user is None:
        return generic_response, 200

    raw_token = secrets.token_urlsafe(32)
    user.reset_token_hash = hashlib.sha256(raw_token.encode()).hexdigest()
    user.reset_token_expires_at = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_TTL_MINUTES)
    db.session.commit()

    try:
        send_reset_email(user, raw_token)
    except Exception:
        # Email delivery failing (e.g. SMTP not configured yet) shouldn't
        # surface to the client - the response stays generic either way -
        # but it should be visible in the server logs.
        current_app.logger.exception("Failed to send password reset email to user_id=%s", user.user_id)

    return generic_response, 200


@auth.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json(silent=True) or {}
    token = data.get("token") or ""
    new_password = data.get("new_password") or ""

    if not token or not new_password:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    if len(new_password) < 8:
        return jsonify({"success": False, "message": "New password must be at least 8 characters"}), 400

    token_hash = hashlib.sha256(token.encode()).hexdigest()
    user = User.query.filter_by(reset_token_hash=token_hash).first()

    if (
        user is None
        or user.reset_token_expires_at is None
        or user.reset_token_expires_at < datetime.utcnow()
    ):
        return jsonify({"success": False, "message": "This reset link is invalid or has expired"}), 400

    user.password_hash = generate_password_hash(new_password, method="pbkdf2:sha256")
    user.reset_token_hash = None
    user.reset_token_expires_at = None
    db.session.commit()

    return jsonify({"success": True, "message": "Password reset successfully"}), 200


@auth.route("/logout", methods=["POST"])
@token_required
def logout():
    # JWTs are stateless, so logout is handled client-side by discarding the
    # token. This endpoint exists to match the documented API contract.
    return jsonify({"success": True, "message": "Logged out successfully"}), 200


@auth.route("/change-password", methods=["POST"])
@token_required
def change_password():
    data = request.get_json(silent=True) or {}
    current_password = data.get("current_password") or ""
    new_password = data.get("new_password") or ""
    user = request.current_user

    if not current_password or not new_password:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    if not check_password_hash(user.password_hash, current_password):
        return jsonify({"success": False, "message": "Current password is incorrect"}), 400

    if len(new_password) < 8:
        return jsonify({"success": False, "message": "New password must be at least 8 characters"}), 400

    if check_password_hash(user.password_hash, new_password):
        return jsonify({"success": False, "message": "New password must be different"}), 400

    user.password_hash = generate_password_hash(new_password, method="pbkdf2:sha256")
    db.session.commit()
    return jsonify({"success": True, "message": "Password changed successfully"}), 200


@auth.route("/account", methods=["DELETE"])
@token_required
def delete_account():
    data = request.get_json(silent=True) or {}
    current_password = data.get("current_password") or ""
    user = request.current_user

    if not current_password:
        return jsonify({"success": False, "message": "Current password is required"}), 400

    if not check_password_hash(user.password_hash, current_password):
        return jsonify({"success": False, "message": "Current password is incorrect"}), 400

    try:
        if user.role != "OWNER":
            Notification.query.filter_by(user_id=user.user_id).delete(synchronize_session=False)
            EmbeddedDevice.query.filter_by(managed_by=user.user_id).update(
                {EmbeddedDevice.managed_by: None}, synchronize_session=False
            )
            Alert.query.filter_by(resolved_by=user.user_id).update(
                {Alert.resolved_by: None}, synchronize_session=False
            )
            db.session.delete(user)
            db.session.commit()
            return jsonify({"success": True, "message": "Account deleted successfully"}), 200

        dashboard_id = user.dashboard_id
        if dashboard_id is None:
            return jsonify({"success": False, "message": "Dashboard not found"}), 404

        member_ids = [
            member_id
            for (member_id,) in db.session.query(User.user_id)
            .filter(User.dashboard_id == dashboard_id)
            .all()
        ]
        device_ids = [
            device_id
            for (device_id,) in db.session.query(EmbeddedDevice.device_id)
            .filter(EmbeddedDevice.dashboard_id == dashboard_id)
            .all()
        ]
        sensor_ids = []
        if device_ids:
            sensor_ids = [
                sensor_id
                for (sensor_id,) in db.session.query(TemperatureSensor.sensor_id)
                .filter(TemperatureSensor.device_id.in_(device_ids))
                .all()
            ]

        Notification.query.filter_by(dashboard_id=dashboard_id).delete(synchronize_session=False)

        if sensor_ids:
            TemperatureLog.query.filter(TemperatureLog.sensor_id.in_(sensor_ids)).delete(
                synchronize_session=False
            )

        if device_ids:
            DeviceThreshold.query.filter(DeviceThreshold.device_id.in_(device_ids)).delete(
                synchronize_session=False
            )
            TemperatureSensor.query.filter(TemperatureSensor.device_id.in_(device_ids)).delete(
                synchronize_session=False
            )

        Alert.query.filter_by(dashboard_id=dashboard_id).delete(synchronize_session=False)
        ThresholdConfig.query.filter_by(dashboard_id=dashboard_id).delete(synchronize_session=False)
        EmbeddedDevice.query.filter_by(dashboard_id=dashboard_id).delete(synchronize_session=False)

        User.query.filter(User.dashboard_id == dashboard_id).update(
            {User.dashboard_id: None}, synchronize_session=False
        )
        Dashboard.query.filter_by(dashboard_id=dashboard_id).delete(synchronize_session=False)
        if member_ids:
            User.query.filter(User.user_id.in_(member_ids)).delete(synchronize_session=False)

        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Unable to delete account"}), 500

    return jsonify({"success": True, "message": "Account deleted successfully"}), 200


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
@roles_required("OWNER", "ADMIN")
def create_inspector():
    return _create_dashboard_user("INSPECTOR")


@users_bp.route("", methods=["GET"])
@token_required
@roles_required("OWNER", "ADMIN")
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
    # Outer-joined to each device's active threshold in a single query
    # (via device_thresholds) instead of querying per-device in a loop.
    rows = (
        db.session.query(
            EmbeddedDevice,
            ThresholdConfig.warning_value,
            ThresholdConfig.critical_value,
        )
        .outerjoin(DeviceThreshold, DeviceThreshold.device_id == EmbeddedDevice.device_id)
        .outerjoin(
            ThresholdConfig,
            db.and_(
                ThresholdConfig.config_id == DeviceThreshold.config_id,
                ThresholdConfig.is_active.is_(True),
            ),
        )
        .filter(EmbeddedDevice.dashboard_id == request.current_user.dashboard_id)
        .all()
    )

    result = [
        {
            "device_id": d.device_id,
            "name": d.name,
            "ip_address": d.ip_address,
            "location": d.location,
            "status": d.status,
            "is_active": d.is_active,
            "last_heartbeat": d.last_heartbeat.isoformat() if d.last_heartbeat else None,
            "firmware_version": d.firmware_version,
            "warning_threshold": float(warning_value) if warning_value is not None else None,
            "critical_threshold": float(critical_value) if critical_value is not None else None,
        }
        for d, warning_value, critical_value in rows
    ]
    return jsonify(result), 200


@dashboard_bp.route("/devices", methods=["POST"])
@token_required
@roles_required("OWNER", "ADMIN")
def create_device():
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    ip_address_raw = (data.get("ip_address") or "").strip()
    location = (data.get("location") or "").strip()
    warning_threshold = data.get("warning_threshold")
    critical_threshold = data.get("critical_threshold")

    if not name or not ip_address_raw or not location or warning_threshold is None or critical_threshold is None:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    try:
        ipaddress.ip_address(ip_address_raw)
    except ValueError:
        return jsonify({"success": False, "message": "Invalid IP address"}), 400

    try:
        warning_value = float(warning_threshold)
        critical_value = float(critical_threshold)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Threshold values must be numeric"}), 400

    if critical_value <= warning_value:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Critical Threshold must be greater than Warning Threshold",
                }
            ),
            400,
        )

    dashboard_id = request.current_user.dashboard_id

    duplicate = EmbeddedDevice.query.filter(
        EmbeddedDevice.dashboard_id == dashboard_id,
        EmbeddedDevice.ip_address == ip_address_raw,
    ).first()
    if duplicate is not None:
        return (
            jsonify({"success": False, "message": "A device with this IP address already exists"}),
            409,
        )

    try:
        device = EmbeddedDevice(
            dashboard_id=dashboard_id,
            name=name,
            ip_address=ip_address_raw,
            location=location,
            status="offline",
            is_active=True,
            last_heartbeat=None,
            managed_by=request.current_user.user_id,
        )
        db.session.add(device)
        db.session.flush()  # assigns device.device_id for the rows below

        # /api/readings rejects readings when a device has no sensor, so one
        # is always created alongside the device.
        sensor = TemperatureSensor(device_id=device.device_id)
        db.session.add(sensor)

        config = ThresholdConfig(
            dashboard_id=dashboard_id,
            warning_value=warning_value,
            critical_value=critical_value,
            is_active=True,
        )
        db.session.add(config)
        db.session.flush()  # assigns config.config_id for the link below

        link = DeviceThreshold(device_id=device.device_id, config_id=config.config_id)
        db.session.add(link)

        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to create device"}), 500

    return (
        jsonify(
            {
                "success": True,
                "message": "Device added successfully",
                "device": {
                    "device_id": device.device_id,
                    "name": device.name,
                    "ip_address": device.ip_address,
                    "location": device.location,
                    "status": device.status,
                    "is_active": device.is_active,
                    "last_heartbeat": device.last_heartbeat,
                    "firmware_version": device.firmware_version,
                    "warning_threshold": warning_value,
                    "critical_threshold": critical_value,
                },
            }
        ),
        201,
    )


@dashboard_bp.route("/devices/<int:device_id>", methods=["PUT"])
@token_required
@roles_required("OWNER", "ADMIN")
def update_device(device_id):
    dashboard_id = request.current_user.dashboard_id

    device = EmbeddedDevice.query.filter(
        EmbeddedDevice.device_id == device_id,
        EmbeddedDevice.dashboard_id == dashboard_id,
    ).first()
    if device is None:
        return jsonify({"success": False, "message": "Device not found"}), 404

    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    ip_address_raw = (data.get("ip_address") or "").strip()
    location = (data.get("location") or "").strip()
    warning_threshold = data.get("warning_threshold")
    critical_threshold = data.get("critical_threshold")

    if not name or not ip_address_raw or not location or warning_threshold is None or critical_threshold is None:
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    try:
        ipaddress.ip_address(ip_address_raw)
    except ValueError:
        return jsonify({"success": False, "message": "Invalid IP address"}), 400

    try:
        warning_value = float(warning_threshold)
        critical_value = float(critical_threshold)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Threshold values must be numeric"}), 400

    if critical_value <= warning_value:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Critical Threshold must be greater than Warning Threshold",
                }
            ),
            400,
        )

    duplicate = EmbeddedDevice.query.filter(
        EmbeddedDevice.dashboard_id == dashboard_id,
        EmbeddedDevice.ip_address == ip_address_raw,
        EmbeddedDevice.device_id != device_id,
    ).first()
    if duplicate is not None:
        return (
            jsonify({"success": False, "message": "A device with this IP address already exists"}),
            409,
        )

    try:
        device.name = name
        device.ip_address = ip_address_raw
        device.location = location

        link = DeviceThreshold.query.filter_by(device_id=device.device_id).first()
        config = ThresholdConfig.query.get(link.config_id) if link else None

        if config is None:
            config = ThresholdConfig(
                dashboard_id=dashboard_id,
                warning_value=warning_value,
                critical_value=critical_value,
                is_active=True,
            )
            db.session.add(config)
            db.session.flush()  # assigns config.config_id for the link below

            if link is None:
                link = DeviceThreshold(device_id=device.device_id, config_id=config.config_id)
                db.session.add(link)
        else:
            config.warning_value = warning_value
            config.critical_value = critical_value

        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to update device"}), 500

    return (
        jsonify(
            {
                "success": True,
                "message": "Device updated successfully",
                "device": {
                    "device_id": device.device_id,
                    "name": device.name,
                    "ip_address": device.ip_address,
                    "location": device.location,
                    "status": device.status,
                    "is_active": device.is_active,
                    "last_heartbeat": device.last_heartbeat.isoformat() if device.last_heartbeat else None,
                    "firmware_version": device.firmware_version,
                    "warning_threshold": warning_value,
                    "critical_threshold": critical_value,
                },
            }
        ),
        200,
    )


@dashboard_bp.route("/devices/<int:device_id>", methods=["DELETE"])
@token_required
@roles_required("OWNER", "ADMIN")
def delete_device(device_id):
    dashboard_id = request.current_user.dashboard_id

    device = EmbeddedDevice.query.filter(
        EmbeddedDevice.device_id == device_id,
        EmbeddedDevice.dashboard_id == dashboard_id,
    ).first()
    if device is None:
        return jsonify({"success": False, "message": "Device not found"}), 404

    try:
        # Clean up dependent rows in FK-safe order before removing the device
        # itself, all inside a single transaction so a failure at any step
        # leaves nothing partially deleted.
        sensor_ids = [
            sid
            for (sid,) in db.session.query(TemperatureSensor.sensor_id)
            .filter(TemperatureSensor.device_id == device.device_id)
            .all()
        ]
        if sensor_ids:
            TemperatureLog.query.filter(TemperatureLog.sensor_id.in_(sensor_ids)).delete(
                synchronize_session=False
            )

        alert_ids = [
            aid
            for (aid,) in db.session.query(Alert.alert_id)
            .filter(Alert.device_id == device.device_id)
            .all()
        ]
        if alert_ids:
            Notification.query.filter(Notification.alert_id.in_(alert_ids)).delete(
                synchronize_session=False
            )
            Alert.query.filter(Alert.device_id == device.device_id).delete(
                synchronize_session=False
            )

        DeviceThreshold.query.filter_by(device_id=device.device_id).delete(synchronize_session=False)
        TemperatureSensor.query.filter_by(device_id=device.device_id).delete(synchronize_session=False)

        db.session.delete(device)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to delete device"}), 500

    return jsonify({"success": True, "message": "Device deleted successfully"}), 200


@dashboard_bp.route("/devices/<int:device_id>/status", methods=["PATCH"])
@token_required
@roles_required("OWNER", "ADMIN")
def update_device_status(device_id):
    dashboard_id = request.current_user.dashboard_id

    device = EmbeddedDevice.query.filter(
        EmbeddedDevice.device_id == device_id,
        EmbeddedDevice.dashboard_id == dashboard_id,
    ).first()
    if device is None:
        return jsonify({"success": False, "message": "Device not found"}), 404

    data = request.get_json(silent=True) or {}
    is_active = data.get("is_active")

    if not isinstance(is_active, bool):
        return jsonify({"success": False, "message": "is_active must be true or false"}), 400

    try:
        device.is_active = is_active
        if not is_active:
            # Turning a device off means it can no longer be reporting in -
            # reflect that immediately rather than waiting on a stale heartbeat.
            device.status = "offline"
        # Turning a device back on deliberately does NOT mark it "online" -
        # that only happens once a new heartbeat/reading arrives.
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to update device status"}), 500

    return (
        jsonify(
            {
                "success": True,
                "message": "Device turned on successfully" if is_active else "Device turned off successfully",
                "device": {
                    "device_id": device.device_id,
                    "status": device.status,
                    "is_active": device.is_active,
                },
            }
        ),
        200,
    )


@dashboard_bp.route("/readings", methods=["GET"])
@token_required
@roles_required("OWNER", "ADMIN")
def get_readings():
    device_id = request.args.get("device_id", type=int)
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    # Each reading's device-specific active threshold (via device_thresholds)
    # is pulled in the same query, so status can be calculated per-row
    # without an N+1 query per reading.
    query = (
        db.session.query(
            TemperatureLog,
            TemperatureSensor.device_id,
            ThresholdConfig.warning_value,
            ThresholdConfig.critical_value,
        )
        .join(TemperatureSensor, TemperatureLog.sensor_id == TemperatureSensor.sensor_id)
        .join(EmbeddedDevice, TemperatureSensor.device_id == EmbeddedDevice.device_id)
        .outerjoin(DeviceThreshold, DeviceThreshold.device_id == EmbeddedDevice.device_id)
        .outerjoin(
            ThresholdConfig,
            db.and_(
                ThresholdConfig.config_id == DeviceThreshold.config_id,
                ThresholdConfig.is_active.is_(True),
            ),
        )
        .filter(EmbeddedDevice.dashboard_id == request.current_user.dashboard_id)
    )

    if device_id:
        query = query.filter(TemperatureSensor.device_id == device_id)
    if start_date:
        query = query.filter(TemperatureLog.recorded_at >= start_date)
    if end_date:
        query = query.filter(TemperatureLog.recorded_at <= end_date)

    rows = query.order_by(TemperatureLog.recorded_at.desc()).all()

    result = []
    for log, log_device_id, warning_value, critical_value in rows:
        temperature = float(log.temperature)

        if warning_value is None or critical_value is None:
            status = "UNKNOWN"
        elif temperature >= float(critical_value):
            status = "CRITICAL"
        elif temperature >= float(warning_value):
            status = "WARNING"
        else:
            status = "NORMAL"

        result.append(
            {
                "device_id": log_device_id,
                "temperature": temperature,
                "status": status,
                "timestamp": log.recorded_at.isoformat(),
            }
        )

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
