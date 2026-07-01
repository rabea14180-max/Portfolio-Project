CREATE DATABASE temperature_monitoring_system;
USE temperature_monitoring_system;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('OWNER', 'ADMIN', 'INSPECTOR') NOT NULL,
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE embedded_devices (
    device_id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_heartbeat DATETIME NULL,
    firmware_version VARCHAR(100),
    managed_by INT,
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
    warning_value DECIMAL(5,2) NOT NULL,
    critical_value DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
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
    device_id INT NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    status ENUM('OPEN', 'ACKNOWLEDGED', 'RESOLVED') DEFAULT 'OPEN',
    severity ENUM('WARNING', 'CRITICAL') NOT NULL,
    resolved_by INT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME NULL,
    FOREIGN KEY (device_id) REFERENCES embedded_devices(device_id),
    FOREIGN KEY (resolved_by) REFERENCES users(user_id)
);

CREATE TABLE dashboards (
    dashboard_id INT AUTO_INCREMENT PRIMARY KEY,
    current_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (current_user_id) REFERENCES users(user_id)
);

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    alert_id INT NOT NULL,
    user_id INT NOT NULL,
    notification_type ENUM('EMAIL', 'SMS', 'PUSH') DEFAULT 'EMAIL',
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'SENT', 'FAILED') DEFAULT 'PENDING',
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
