-- Sample testing data for Stage 4 database testing.
-- This file is used only to verify database tables, relationships, alerts, dashboards, and notifications.

USE temperature_monitoring_system;

-- Users
INSERT INTO users (username, password_hash, email, role)
VALUES
('owner_user', 'hashed_password', 'owner@flexsight.com', 'OWNER'),
('admin_user', 'hashed_password', 'admin@flexsight.com', 'ADMIN'),
('inspector_user', 'hashed_password', 'inspector@flexsight.com', 'INSPECTOR');

-- Embedded Devices
INSERT INTO embedded_devices (status, is_active, last_heartbeat, firmware_version, managed_by)
VALUES
('ONLINE', TRUE, NOW(), 'v1.0.0', 1),
('ONLINE', TRUE, NOW(), 'v1.0.0', 2),
('OFFLINE', TRUE, NULL, 'v1.0.0', 2);

-- Temperature Sensors
INSERT INTO temperature_sensors (device_id, current_temperature, calibration_offset, min_range, max_range)
VALUES
(1, 23.50, 0.00, 0.00, 60.00),
(2, 47.00, 0.00, 0.00, 60.00),
(3, NULL, 0.00, 0.00, 60.00);

-- Threshold Configuration
INSERT INTO threshold_configs (warning_value, critical_value, is_active)
VALUES
(45.00, 50.00, TRUE);

-- Temperature Logs
INSERT INTO temperature_logs (sensor_id, temperature, recorded_at)
VALUES
(1, 23.50, NOW()),
(2, 47.00, NOW()),
(2, 52.00, NOW());

-- Alerts
INSERT INTO alerts (device_id, temperature, status, severity, created_at)
VALUES
(2, 47.00, 'OPEN', 'WARNING', NOW()),
(2, 52.00, 'OPEN', 'CRITICAL', NOW());

-- Dashboards
INSERT INTO dashboards (current_user_id)
VALUES
(1);

-- Notifications
INSERT INTO notifications (alert_id, user_id, notification_type, sent_at, status)
VALUES
(1, 2, 'EMAIL', NOW(), 'SENT'),
(2, 1, 'EMAIL', NOW(), 'PENDING');

-- Device Threshold Relationships
INSERT INTO device_thresholds (device_id, config_id)
VALUES
(1, 1),
(2, 1),
(3, 1);
