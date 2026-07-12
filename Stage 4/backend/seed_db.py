from app import create_app
from models import db, User, Dashboard, EmbeddedDevice, TemperatureSensor, ThresholdConfig, TemperatureLog, Alert, DeviceThreshold
from werkzeug.security import generate_password_hash
from datetime import datetime

app = create_app()
with app.app_context():
    # Make sure tables are created
    db.create_all()

    # Clear existing data if any
    db.session.query(DeviceThreshold).delete()
    db.session.query(Alert).delete()
    db.session.query(TemperatureLog).delete()
    db.session.query(TemperatureSensor).delete()
    db.session.query(EmbeddedDevice).delete()
    db.session.query(ThresholdConfig).delete()
    db.session.query(User).delete()
    db.session.query(Dashboard).delete()
    db.session.commit()

    # Add Owner and its Dashboard (Owner needs a user_id before the Dashboard
    # can reference it, then the Dashboard's id is written back onto the Owner)
    owner = User(username='owner_user', password_hash=generate_password_hash('password123', method='pbkdf2:sha256'), email='owner@flexsight.com', role='OWNER')
    db.session.add(owner)
    db.session.flush()

    dashboard = Dashboard(owner_id=owner.user_id)
    db.session.add(dashboard)
    db.session.flush()

    owner.dashboard_id = dashboard.dashboard_id

    # Admin and Inspector belong to the same dashboard as the Owner who created them
    admin = User(username='admin_user', password_hash=generate_password_hash('password123', method='pbkdf2:sha256'), email='admin@flexsight.com', role='ADMIN', dashboard_id=dashboard.dashboard_id)
    inspector = User(username='inspector_user', password_hash=generate_password_hash('password123', method='pbkdf2:sha256'), email='inspector@flexsight.com', role='INSPECTOR', dashboard_id=dashboard.dashboard_id)
    db.session.add_all([admin, inspector])
    db.session.commit()

    # Add Threshold Config
    config = ThresholdConfig(dashboard_id=dashboard.dashboard_id, warning_value=45.00, critical_value=50.00, is_active=True)
    db.session.add(config)
    db.session.commit()

    # Add Embedded Devices
    dev1 = EmbeddedDevice(dashboard_id=dashboard.dashboard_id, name='Cold Room 1', ip_address='192.168.1.10', location='Warehouse A - Cold Room 1', status='ONLINE', is_active=True, last_heartbeat=datetime.utcnow(), firmware_version='v1.0.0', managed_by=owner.user_id)
    dev2 = EmbeddedDevice(dashboard_id=dashboard.dashboard_id, name='Cold Room 2', ip_address='192.168.1.11', location='Warehouse A - Cold Room 2', status='ONLINE', is_active=True, last_heartbeat=datetime.utcnow(), firmware_version='v1.0.0', managed_by=admin.user_id)
    dev3 = EmbeddedDevice(dashboard_id=dashboard.dashboard_id, name='Loading Dock', ip_address='192.168.1.12', location='Warehouse A - Loading Dock', status='OFFLINE', is_active=True, last_heartbeat=None, firmware_version='v1.0.0', managed_by=admin.user_id)
    db.session.add_all([dev1, dev2, dev3])
    db.session.commit()

    # Add Device Threshold Relationships
    dt1 = DeviceThreshold(device_id=dev1.device_id, config_id=config.config_id)
    dt2 = DeviceThreshold(device_id=dev2.device_id, config_id=config.config_id)
    dt3 = DeviceThreshold(device_id=dev3.device_id, config_id=config.config_id)
    db.session.add_all([dt1, dt2, dt3])
    db.session.commit()

    # Add Temperature Sensors
    s1 = TemperatureSensor(device_id=dev1.device_id, current_temperature=23.50, calibration_offset=0.00, min_range=0.00, max_range=60.00)
    s2 = TemperatureSensor(device_id=dev2.device_id, current_temperature=47.00, calibration_offset=0.00, min_range=0.00, max_range=60.00)
    s3 = TemperatureSensor(device_id=dev3.device_id, current_temperature=None, calibration_offset=0.00, min_range=0.00, max_range=60.00)
    db.session.add_all([s1, s2, s3])
    db.session.commit()

    # Add Temperature Logs
    log1 = TemperatureLog(sensor_id=s1.sensor_id, temperature=23.50)
    log2 = TemperatureLog(sensor_id=s2.sensor_id, temperature=47.00)
    log3 = TemperatureLog(sensor_id=s2.sensor_id, temperature=52.00)
    db.session.add_all([log1, log2, log3])
    db.session.commit()

    # Add Alerts
    a1 = Alert(dashboard_id=dashboard.dashboard_id, device_id=dev2.device_id, temperature=47.00, status='OPEN', severity='WARNING')
    a2 = Alert(dashboard_id=dashboard.dashboard_id, device_id=dev2.device_id, temperature=52.00, status='OPEN', severity='CRITICAL')
    db.session.add_all([a1, a2])
    db.session.commit()

    print(f"Database successfully seeded! (Dialect: {db.engine.name})")

