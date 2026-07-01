-- Database testing queries for Stage 4.
-- These queries are used to verify that the database, tables, sample data, and relationships work correctly.

USE temperature_monitoring_system;

-- Show all databases
SHOW DATABASES;

-- Show all tables in FlexSight database
SHOW TABLES;

-- Test users table
SELECT * FROM users;

-- Test embedded devices table
SELECT * FROM embedded_devices;

-- Test temperature sensors table
SELECT * FROM temperature_sensors;

-- Test threshold configurations table
SELECT * FROM threshold_configs;

-- Test temperature logs table
SELECT * FROM temperature_logs;

-- Test alerts table
SELECT * FROM alerts;

-- Test dashboards table
SELECT * FROM dashboards;

-- Test notifications table
SELECT * FROM notifications;

-- Test device thresholds relationship table
SELECT * FROM device_thresholds;

-- Test normal readings
SELECT * FROM temperature_logs
WHERE temperature < 45;

-- Test warning readings
SELECT * FROM temperature_logs
WHERE temperature >= 45 AND temperature < 50;

-- Test critical readings
SELECT * FROM temperature_logs
WHERE temperature >= 50;

-- Test alerts with notifications and users
SELECT 
    a.alert_id,
    a.temperature,
    a.severity,
    a.status AS alert_status,
    n.notification_type,
    n.status AS notification_status,
    u.email
FROM alerts a
JOIN notifications n ON a.alert_id = n.alert_id
JOIN users u ON n.user_id = u.user_id;

-- Test devices with sensors and temperature logs
SELECT 
    d.device_id,
    d.status,
    s.sensor_id,
    l.temperature,
    l.recorded_at
FROM embedded_devices d
JOIN temperature_sensors s ON d.device_id = s.device_id
JOIN temperature_logs l ON s.sensor_id = l.sensor_id;
