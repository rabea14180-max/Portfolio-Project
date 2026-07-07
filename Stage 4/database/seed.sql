-- Sample testing data for Stage 4 database testing.
-- This file is used only to verify database tables, relationships, alerts, dashboards, and notifications.

USE temperature_monitoring_system;

-- Owner (dashboard_id set after the dashboard row is inserted below)
INSERT INTO users (username, password_hash, email, role)
VALUES
('owner_user', 'hashed_password', 'owner@flexsight.com', 'OWNER');

-- Dashboard owned by owner_user (user_id 1)
INSERT INTO dashboards (owner_id)
VALUES
(1);

UPDATE users SET dashboard_id = 1 WHERE user_id = 1;

-- Admin and Inspector belong to the same dashboard as the Owner who created them
INSERT INTO users (username, password_hash, email, role, dashboard_id)
VALUES
('admin_user', 'hashed_password', 'admin@flexsight.com', 'ADMIN', 1),
('inspector_user', 'hashed_password', 'inspector@flexsight.com', 'INSPECTOR', 1);

-- Embedded Devices
INSERT INTO embedded_devices (dashboard_id, status, is_active, last_heartbeat, firmware_version, managed_by)
VALUES
(1, 'ONLINE', TRUE, NOW(), 'v1.0.0', 1),
(1, 'ONLINE', TRUE, NOW(), 'v1.0.0', 2),
(1, 'OFFLINE', TRUE, NULL, 'v1.0.0', 2);

-- Temperature Sensors
INSERT INTO temperature_sensors (device_id, current_temperature, calibration_offset, min_range, max_range)
VALUES
(1, 23.50, 0.00, 0.00, 60.00),
(2, 47.00, 0.00, 0.00, 60.00),
(3, NULL, 0.00, 0.00, 60.00);

-- Threshold Configuration
INSERT INTO threshold_configs (dashboard_id, warning_value, critical_value, is_active)
VALUES
(1, 45.00, 50.00, TRUE);

-- Temperature Logs
INSERT INTO temperature_logs (sensor_id, temperature, recorded_at)
VALUES
(1, 23.50, NOW()),
(2, 47.00, NOW()),
(2, 52.00, NOW());

-- Alerts
INSERT INTO alerts (dashboard_id, device_id, temperature, status, severity, created_at)
VALUES
(1, 2, 47.00, 'OPEN', 'WARNING', NOW()),
(1, 2, 52.00, 'OPEN', 'CRITICAL', NOW());

-- Notifications
INSERT INTO notifications (dashboard_id, alert_id, user_id, notification_type, sent_at, status)
VALUES
(1, 1, 2, 'EMAIL', NOW(), 'SENT'),
(1, 2, 1, 'EMAIL', NOW(), 'PENDING');

-- Device Threshold Relationships
INSERT INTO device_thresholds (device_id, config_id)
VALUES
(1, 1),
(2, 1),
(3, 1);
