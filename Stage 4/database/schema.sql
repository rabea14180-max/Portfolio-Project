CREATE DATABASE temperature_monitoring_system;
USE temperature_monitoring_system;

-- Each dashboard is a private tenant: one Owner, with the Admin/Inspector
-- accounts that Owner creates, and all devices/alerts/thresholds/notifications
-- scoped to it. Declared before `users` here for readability, but since it
-- references users(user_id) and users references it back (users.dashboard_id),
-- the two are created together with dashboards.owner_id added after users exists.
CREATE TABLE dashboards (
    dashboard_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('OWNER', 'ADMIN', 'INSPECTOR') NOT NULL,
    -- Nullable: an Owner row is inserted before its Dashboard exists (the
    -- Dashboard needs the Owner's user_id first), then this is set right after.
    dashboard_id INT NULL,
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(dashboard_id)
);

ALTER TABLE dashboards ADD FOREIGN KEY (owner_id) REFERENCES users(user_id);

CREATE TABLE embedded_devices (
    device_id INT AUTO_INCREMENT PRIMARY KEY,
    dashboard_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_heartbeat DATETIME NULL,
    firmware_version VARCHAR(100),
    managed_by INT,
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(dashboard_id),
    FOREIGN KEY (managed_by) REFERENCES users(user_id)
);

CREATE TABLE temperature_sensors (
    sensor_id INT AUTO_INCREMENT PRIMARY KEY,
    device_id INT NOT NULL,
    current_temperature DECIMAL(5,2),
    calibration_offset DECIMAL(5,2) DEFAULT 0,
    min_range DECIMAL(5,2),
    max_range DECIMAL(5,2),
    FOREIGN KEY (device_id) REFERENCES embedded_devices(device_id)
);

CREATE TABLE threshold_configs (
    config_id INT AUTO_INCREMENT PRIMARY KEY,
    dashboard_id INT NOT NULL,
    warning_value DECIMAL(5,2) NOT NULL,
    critical_value DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(dashboard_id)
);

CREATE TABLE temperature_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_id INT NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES temperature_sensors(sensor_id)
);

CREATE TABLE alerts (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    dashboard_id INT NOT NULL,
    device_id INT NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    status ENUM('OPEN', 'ACKNOWLEDGED', 'RESOLVED') DEFAULT 'OPEN',
    severity ENUM('WARNING', 'CRITICAL') NOT NULL,
    resolved_by INT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME NULL,
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(dashboard_id),
    FOREIGN KEY (device_id) REFERENCES embedded_devices(device_id),
    FOREIGN KEY (resolved_by) REFERENCES users(user_id)
);

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    dashboard_id INT NOT NULL,
    alert_id INT NOT NULL,
    user_id INT NOT NULL,
    notification_type ENUM('EMAIL', 'SMS', 'PUSH') DEFAULT 'EMAIL',
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'SENT', 'FAILED') DEFAULT 'PENDING',
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(dashboard_id),
    FOREIGN KEY (alert_id) REFERENCES alerts(alert_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE device_thresholds (
    device_id INT NOT NULL,
    config_id INT NOT NULL,
    PRIMARY KEY (device_id, config_id),
    FOREIGN KEY (device_id) REFERENCES embedded_devices(device_id),
    FOREIGN KEY (config_id) REFERENCES threshold_configs(config_id)
);
