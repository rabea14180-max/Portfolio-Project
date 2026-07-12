from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    role = db.Column(db.Enum("OWNER", "ADMIN", "INSPECTOR", name="user_role"), nullable=False)
    # Nullable because an Owner row is inserted before its Dashboard exists
    # (the Dashboard needs the Owner's user_id first) - always set right after.
    dashboard_id = db.Column(db.Integer, db.ForeignKey("dashboards.dashboard_id"), nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    dashboard = db.relationship("Dashboard", foreign_keys=[dashboard_id], backref="members")


class EmbeddedDevice(db.Model):
    __tablename__ = "embedded_devices"
    __table_args__ = (
        # Same private IP may exist on separate dashboards - uniqueness is
        # scoped to (dashboard_id, ip_address), not global. Nullable so
        # rows migrated from before this feature (with no ip_address yet)
        # don't collide with each other.
        db.UniqueConstraint("dashboard_id", "ip_address", name="uq_embedded_devices_dashboard_ip"),
    )

    device_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dashboard_id = db.Column(db.Integer, db.ForeignKey("dashboards.dashboard_id"), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    last_heartbeat = db.Column(db.DateTime, nullable=True)
    firmware_version = db.Column(db.String(100))
    managed_by = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    manager = db.relationship("User", backref="managed_devices")
    dashboard = db.relationship("Dashboard", backref="devices")


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
    dashboard_id = db.Column(db.Integer, db.ForeignKey("dashboards.dashboard_id"), nullable=False)
    warning_value = db.Column(db.Numeric(5, 2), nullable=False)
    critical_value = db.Column(db.Numeric(5, 2), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    dashboard = db.relationship("Dashboard", backref="threshold_configs")


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
    dashboard_id = db.Column(db.Integer, db.ForeignKey("dashboards.dashboard_id"), nullable=False)
    device_id = db.Column(db.Integer, db.ForeignKey("embedded_devices.device_id"), nullable=False)
    temperature = db.Column(db.Numeric(5, 2), nullable=False)
    status = db.Column(db.Enum("OPEN", "ACKNOWLEDGED", "RESOLVED", name="alert_status"), default="OPEN")
    severity = db.Column(db.Enum("WARNING", "CRITICAL", name="alert_severity"), nullable=False)
    resolved_by = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    resolved_at = db.Column(db.DateTime, nullable=True)

    device = db.relationship("EmbeddedDevice", backref="alerts")
    resolver = db.relationship("User", backref="resolved_alerts")
    dashboard = db.relationship("Dashboard", backref="alerts")


class Dashboard(db.Model):
    __tablename__ = "dashboards"

    dashboard_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False, unique=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(
        db.TIMESTAMP,
        server_default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
    )

    owner = db.relationship("User", foreign_keys=[owner_id], backref="owned_dashboard", uselist=False)


class Notification(db.Model):
    __tablename__ = "notifications"

    notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dashboard_id = db.Column(db.Integer, db.ForeignKey("dashboards.dashboard_id"), nullable=False)
    alert_id = db.Column(db.Integer, db.ForeignKey("alerts.alert_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    notification_type = db.Column(db.Enum("EMAIL", "SMS", "PUSH", name="notification_type"), default="EMAIL")
    sent_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    status = db.Column(db.Enum("PENDING", "SENT", "FAILED", name="notification_status"), default="PENDING")

    alert = db.relationship("Alert", backref="notifications")
    user = db.relationship("User", backref="notifications")
    dashboard = db.relationship("Dashboard", backref="notifications")


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
