# Database Schema

## users

* id (PK)
* username (UNIQUE)
* password_hash
* email (UNIQUE)
* mobile (UNIQUE)
* role (owner / organisation_owner / admin_manager / inspector)
* notification_preferences (email / sms / push / all)
* account_status (active / inactive / suspended)
* last_login_at
* created_at
* updated_at

## organizations

* id (PK)
* name
* owner_id (FK -> users.id)
* address
* contact_email
* contact_mobile
* is_active
* created_at
* updated_at

## organization_members

* id (PK)
* organization_id (FK -> organizations.id)
* user_id (FK -> users.id)
* role_in_org (admin / inspector / viewer)
* assigned_at
* created_at

## locations

* id (PK)
* organization_id (FK -> organizations.id)
* name
* address
* city
* district
* latitude
* longitude
* is_active
* created_at
* updated_at

## embedded_devices

* id (PK)
* device_code (UNIQUE)
* organization_id (FK -> organizations.id)
* location_id (FK -> locations.id)
* name
* status (online / offline / maintenance / error)
* is_active
* firmware_version
* battery_level
* last_heartbeat_at
* last_seen_at
* created_at
* updated_at

## temperature_sensors

* id (PK)
* sensor_code (UNIQUE)
* device_id (FK -> embedded_devices.id)
* name
* current_temp
* calibration_offset
* min_range
* max_range
* last_calibration_at
* is_calibrated
* created_at
* updated_at

## sensor_readings

* id (PK)
* device_id (FK -> embedded_devices.id)
* sensor_id (FK -> temperature_sensors.id)
* temperature_value
* recorded_at

## mqtt_brokers

* id (PK)
* broker_url
* port
* default_topic
* use_tls
* max_connections
* status (active / inactive)
* created_at
* updated_at

## device_broker_mapping

* id (PK)
* device_id (FK -> embedded_devices.id)
* broker_id (FK -> mqtt_brokers.id)
* topic
* auth_token_hash
* assigned_at

## servers

* id (PK)
* server_name
* host_url
* status (active / inactive / maintenance)
* cpu_usage
* memory_usage
* created_at
* updated_at

## databases

* id (PK)
* server_id (FK -> servers.id)
* db_connection
* db_type (relational / time_series)
* backup_schedule
* status
* created_at
* updated_at

## threshold_configs

* id (PK)
* organization_id (FK -> organizations.id)
* name
* threshold_value
* warning_value
* cooldown_minutes
* is_active
* applied_to (organization / location / device)
* created_at
* updated_at

## alerts

* id (PK)
* alert_code (UNIQUE)
* device_id (FK -> embedded_devices.id)
* sensor_id (FK -> temperature_sensors.id)
* temperature
* threshold_value
* severity (info / warning / critical / emergency)
* status (triggered / acknowledged / resolved / escalated)
* cooldown_until
* triggered_at
* resolved_at
* resolved_by (FK -> users.id)
* created_at
* updated_at

# Relationships

* users 1 -> 1 organizations (owner)
* organizations 1 -> N organization_members
* organization_members N -> 1 users
* organizations 1 -> N locations
* organizations 1 -> N embedded_devices
* organizations 1 -> N threshold_configs
* locations 1 -> N embedded_devices
* embedded_devices 1 -> 1 temperature_sensors
* embedded_devices 1 -> N sensor_readings
* embedded_devices 1 -> N device_heartbeats
* embedded_devices 1 -> N alerts
* embedded_devices 1 -> N firmware_updates
* embedded_devices N -> N mqtt_brokers (via device_broker_mapping)
* temperature_sensors 1 -> N sensor_readings
* temperature_sensors 1 -> N calibration_logs
* temperature_sensors 1 -> N alerts
* mqtt_brokers N -> N servers (via broker_server_mapping)
* servers 1 -> N databases
* threshold_configs 1 -> N threshold_device_mapping
* alerts 1 -> N alert_notifications
* users 1 -> N dashboards
* users 1 -> N admin_actions
* users 1 -> N audit_logs


```mermaid
classDiagram
    class User {
        +String userId
        +String username
        +String password
        +String email
        +String mobile
        +Enum role
        +List notificationPreferences
        +DateTime lastLogin
        +login() Boolean
        +logout() void
        +viewDashboard() void
        +updateNotificationPreferences(prefs) void
        +resetPassword() Boolean
        +receiveNotification(alert) void
    }
    class Owner {
        +manageOrganizations() void
        +manageSystemSettings() void
        +viewSystemReports() void
    }
    class OrganisationOwner {
        +manageDevices() void
        +manageUsers() void
        +manageLocations() void
        +assignDevicesToLocations() void
    }
    class AdminManager {
        +monitorAlerts() void
        +reviewDeviceStatus() void
        +exportAlertReports() void
        +manageThresholds() void
    }
    class Inspector {
        +viewReadings() void
        +followUpIncidents() void
        +exportReadings() void
        +markIncidentResolved() void
    }
    class EmbeddedDevice {
        +String deviceId
        +String location
        +String status
        +Boolean isActive
        +String organisationId
        +DateTime lastHeartbeat
        +String firmwareVersion
        +String batteryLevel
        +connectToNetwork() void
        +sendData(payload: String) void
        +calibrate() void
        +sendHeartbeat() void
        +isOnline() Boolean
        +updateFirmware(version: String) void
    }
    class TemperatureSensor {
        +String sensorId
        +Float currentTemp
        +Float calibrationOffset
        +DateTime lastCalibration
        +Float minRange
        +Float maxRange
        +readTemperature() Float
        +isCalibrated() Boolean
        +calibrate(offset: Float) void
        +validateReading() Boolean
    }
    class MQTTBroker {
        +String brokerUrl
        +Int port
        +String topic
        +Boolean useTLS
        +Int maxConnections
        +publish(topic, message) void
        +subscribe(topic) void
        +authenticateDevice(deviceId, token) Boolean
        +disconnectDevice(deviceId) void
    }
    class Server {
        +String serverId
        +String status
        +Int cpuUsage
        +Int memoryUsage
        +receiveData(payload) void
        +processDataAsync(temp) void
        +checkThreshold(temp) Boolean
        +triggerAlert() void
        +processHeartbeat(deviceId) void
        +restart() void
    }
    class Database {
        +String dbConnection
        +String backupSchedule
        +saveTemperatureLog() void
        +saveAlertLog() void
        +fetchDeviceRecords() List
        +fetchAlertHistory() List
        +saveHeartbeatLog() void
        +fetchUsersByRole(role) List
        +fetchUsersByOrganisation(orgId) List
        +backup() void
        +restore(backupId: String) void
    }
    class Alert {
        +String alertId
        +String deviceId
        +Float temperature
        +DateTime timestamp
        +Enum status
        +Enum severity
        +DateTime cooldownUntil
        +String resolvedBy
        +trigger() void
        +resolve() void
        +notifyUser() void
        +isThrottled() Boolean
        +escalate() void
    }
    class Dashboard {
        +String dashboardId
        +String currentUserId
        +String layout
        +Boolean isRealTime
        +displayLiveReadings() void
        +showAlert(alert) void
        +updateDeviceStatus() void
        +connectWebSocket() void
        +exportData(format: String) void
        +filterByDateRange(start, end) void
    }
    class ThresholdConfig {
        +String configId
        +Float thresholdValue
        +Float warningValue
        +Boolean isActive
        +Int cooldownMinutes
        +String appliedTo
        +updateThreshold(value) void
        +getThreshold() Float
        +applyToDevice(deviceId: String) void
    }
    class NotificationService {
        +String serviceId
        +sendEmail(user, alert) Boolean
        +sendSMS(user, alert) Boolean
        +getRecipients(deviceId) List
        +notifyAll(alert) void
    }

    User <|-- Owner
    User <|-- OrganisationOwner
    User <|-- AdminManager
    User <|-- Inspector
    EmbeddedDevice *-- TemperatureSensor
    Server *-- ThresholdConfig
    EmbeddedDevice --> MQTTBroker
    MQTTBroker --> Server
    Server --> Database
    Dashboard --> Server
    User --> Dashboard
    Server --> Alert
    
    Alert --> NotificationService : uses
    NotificationService --> User : sends to
    NotificationService --> Database : fetches users
    
  ```
