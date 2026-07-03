from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    role = db.Column(db.Enum("OWNER", "ADMIN", "INSPECTOR"), nullable=False)
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())


class EmbeddedDevice(db.Model):
    __tablename__ = "embedded_devices"

    device_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    last_heartbeat = db.Column(db.DateTime, nullable=True)
    firmware_version = db.Column(db.String(100))
    managed_by = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    manager = db.relationship("User", backref="managed_devices")


class TemperatureSensor(db.Model):
    __tablename__ = "temperature_sensors"

    sensor_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey("embedded_devices.device_id"), nullable=False)
    current_temperature = db.Column(db.Numeric(5, 2))
    calibration_offset = db.Column(db.Numeric(5, 2), default=0)
    min_range = db.Column(db.Numeric(5, 2))
    max_range = db.Column(db.Numeric(5, 2))

    device = db.relationship("EmbeddedDevice", backref="sensors")


class ThresholdConfig(db.Model):
    __tablename__ = "threshold_configs"

    config_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    warning_value = db.Column(db.Numeric(5, 2), nullable=False)
    critical_value = db.Column(db.Numeric(5, 2), nullable=False)
    is_active = db.Column(db.Boolean, default=True)


class TemperatureLog(db.Model):
    __tablename__ = "temperature_logs"

    log_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sensor_id = db.Column(db.Integer, db.ForeignKey("temperature_sensors.sensor_id"), nullable=False)
    temperature = db.Column(db.Numeric(5, 2), nullable=False)
    recorded_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

    sensor = db.relationship("TemperatureSensor", backref="logs")


class Alert(db.Model):
    __tablename__ = "alerts"

    alert_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey("embedded_devices.device_id"), nullable=False)
    temperature = db.Column(db.Numeric(5, 2), nullable=False)
    status = db.Column(db.Enum("OPEN", "ACKNOWLEDGED", "RESOLVED"), default="OPEN")
    severity = db.Column(db.Enum("WARNING", "CRITICAL"), nullable=False)
    resolved_by = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    resolved_at = db.Column(db.DateTime, nullable=True)

    device = db.relationship("EmbeddedDevice", backref="alerts")
    resolver = db.relationship("User", backref="resolved_alerts")


class Dashboard(db.Model):
    __tablename__ = "dashboards"

    dashboard_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    current_user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    user = db.relationship("User", backref="dashboards")


class Notification(db.Model):
    __tablename__ = "notifications"

    notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    alert_id = db.Column(db.Integer, db.ForeignKey("alerts.alert_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    notification_type = db.Column(db.Enum("EMAIL", "SMS", "PUSH"), default="EMAIL")
    sent_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    status = db.Column(db.Enum("PENDING", "SENT", "FAILED"), default="PENDING")

    alert = db.relationship("Alert", backref="notifications")
    user = db.relationship("User", backref="notifications")


class DeviceThreshold(db.Model):
    __tablename__ = "device_thresholds"

    device_id = db.Column(
        db.Integer,
        db.ForeignKey("embedded_devices.device_id"),
        primary_key=True
    )
    config_id = db.Column(
        db.Integer,
        db.ForeignKey("threshold_configs.config_id"),
        primary_key=True
    )

    device = db.relationship("EmbeddedDevice", backref="threshold_links")
    config = db.relationship("ThresholdConfig", backref="device_links")
