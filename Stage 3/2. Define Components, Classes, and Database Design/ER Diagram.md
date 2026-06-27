Components, Classes, and Database Design

Database Overview

The FlexSight database is designed to support user management, ESP32 monitoring devices, temperature sensors, hourly temperature readings, threshold configuration, alert processing, and email notification handling.

The schema uses primary keys (PK) and foreign keys (FK) to maintain clear relationships between the main system entities.

⸻

Database Schema

users

* id (PK)
* username (UNIQUE)
* password_hash
* email (UNIQUE)
* role (owner / admin / inspector)
* notification_preferences (email)
* account_status (active / inactive / suspended)
* last_login_at
* created_at
* updated_at

embedded_devices

* id (PK)
* device_code (UNIQUE)
* user_id (FK -> users.id)
* name
* status (online / offline / maintenance / error)
* is_active
* firmware_version
* last_heartbeat_at
* last_reading_at
* created_at
* updated_at

temperature_sensors

* id (PK)
* sensor_code (UNIQUE)
* device_id (FK -> embedded_devices.id)
* name
* current_temperature
* calibration_offset
* min_range
* max_range
* last_calibration_at
* is_calibrated
* created_at
* updated_at

sensor_readings

* id (PK)
* device_id (FK -> embedded_devices.id)
* sensor_id (FK -> temperature_sensors.id)
* temperature
* recorded_at

threshold_configs

* id (PK)
* device_id (FK -> embedded_devices.id)
* name
* warning_value
* critical_value
* cooldown_minutes
* is_active
* created_at
* updated_at

alerts

* id (PK)
* alert_code (UNIQUE)
* device_id (FK -> embedded_devices.id)
* sensor_id (FK -> temperature_sensors.id)
* assigned_to (FK -> users.id)
* temperature
* threshold_value
* severity (warning / critical)
* status (triggered / acknowledged / resolved / unresolved)
* cooldown_until
* triggered_at
* acknowledged_at
* resolved_at
* resolved_by (FK -> users.id)
* created_at
* updated_at

alert_notifications

* id (PK)
* alert_id (FK -> alerts.id)
* user_id (FK -> users.id)
* notification_type (email)
* status (sent / failed / pending)
* sent_at
* created_at

⸻

Relationships

* users 1 -> N embedded_devices
* embedded_devices 1 -> 1 temperature_sensors
* embedded_devices 1 -> N sensor_readings
* embedded_devices 1 -> N alerts
* embedded_devices 1 -> N threshold_configs
* temperature_sensors 1 -> N sensor_readings
* temperature_sensors 1 -> N alerts
* alerts 1 -> N alert_notifications
* users 1 -> N alert_notifications
* users 1 -> N alerts (assigned_to)
* users 1 -> N alerts (resolved_by)

⸻

Back-end Components

The FlexSight backend is composed of core components responsible for authentication, device monitoring, temperature reading processing, threshold checking, alert generation, database storage, dashboard communication, and email notification delivery.

Each component has a clear responsibility and works with other components to support the complete temperature monitoring workflow.

User

Represents a FlexSight system user who can access the platform based on an assigned role.

Owner

Represents the highest-level user responsible for supervising the full FlexSight system, including users, devices, alerts, readings, and system settings.

Admin

Represents the system user responsible for monitoring devices, reviewing alerts, checking device status, and following up on abnormal temperature readings.

Inspector

Represents the user responsible for viewing assigned alerts, checking affected devices, adding follow-up notes, and marking alerts as resolved or unresolved.

EmbeddedDevice

Represents the ESP32 monitoring device responsible for collecting hourly temperature readings and sending them to the backend.

TemperatureSensor

Represents the temperature sensor connected to the ESP32 monitoring device.

Server

Represents the Flask backend server responsible for receiving, validating, processing, and storing temperature data.

Database

Represents the SQL database layer responsible for storing and retrieving users, devices, readings, alerts, threshold settings, and notification records.

Alert

Represents a warning or critical event generated when temperature readings exceed the configured threshold.

Dashboard

Represents the web interface used by users to view temperature readings, alerts, device status, and system summaries.

ThresholdConfig

Represents the warning and critical threshold settings used to classify temperature readings.

NotificationService

Represents the service responsible for sending email alert notifications to responsible users.

The following class diagram visually represents these components, their attributes, methods, and relationships.

classDiagram
    class User {
        +String userId
        +String username
        +String password
        +String email
        +Enum role
        +DateTime lastLogin
        +login() Boolean
        +logout() void
        +viewDashboard() void
        +resetPassword() Boolean
        +receiveEmailNotification(alert) void
    }

    class Owner {
        +manageUsers() void
        +manageDevices() void
        +manageSystemSettings() void
        +manageThresholds() void
        +viewSystemReports() void
    }

    class Admin {
        +monitorReadings() void
        +monitorAlerts() void
        +reviewDeviceStatus() void
        +viewAlertHistory() void
    }

    class Inspector {
        +viewAssignedAlerts() void
        +viewAlertDetails() void
        +addFollowUpNotes() void
        +acknowledgeAlert() void
        +markAlertResolved() void
    }

    class EmbeddedDevice {
        +String deviceId
        +String deviceCode
        +String status
        +Boolean isActive
        +DateTime lastHeartbeat
        +DateTime lastReadingAt
        +String firmwareVersion
        +connectToNetwork() void
        +sendTemperatureReading(payload: String) void
        +sendHeartbeat() void
        +isOnline() Boolean
    }

    class TemperatureSensor {
        +String sensorId
        +String sensorCode
        +Float currentTemperature
        +Float calibrationOffset
        +Float minRange
        +Float maxRange
        +readTemperature() Float
        +isCalibrated() Boolean
        +calibrate(offset: Float) void
        +validateReading() Boolean
    }

    class SensorReading {
        +String readingId
        +String deviceId
        +String sensorId
        +Float temperature
        +DateTime recordedAt
        +storeReading() void
    }

    class ThresholdConfig {
        +String configId
        +String deviceId
        +Float warningValue
        +Float criticalValue
        +Boolean isActive
        +updateThreshold() void
        +applyToDevice(deviceId: String) void
    }

    class Alert {
        +String alertId
        +String alertCode
        +String deviceId
        +String sensorId
        +String assignedTo
        +Float temperature
        +Float thresholdValue
        +Enum severity
        +Enum status
        +DateTime triggeredAt
        +DateTime acknowledgedAt
        +DateTime resolvedAt
        +String resolvedBy
        +trigger() void
        +acknowledge() void
        +resolve() void
        +notifyResponsibleUsers() void
    }

    class NotificationService {
        +sendEmail(user, alert) Boolean
        +getRecipients(alertId) List
        +notifyResponsibleUsers(alert) void
    }

    class AlertNotification {
        +String notificationId
        +String alertId
        +String userId
        +String notificationType
        +Enum status
        +DateTime sentAt
        +createNotificationRecord() void
        +updateStatus() void
    }

    class Server {
        +String serverId
        +String status
        +receiveData(payload) void
        +validateReading(payload) Boolean
        +processTemperature(temp) void
        +checkThreshold(temp) Boolean
        +triggerAlert() void
        +processHeartbeat(deviceId) void
    }

    class Database {
        +saveTemperatureReading() void
        +saveAlertLog() void
        +saveNotificationRecord() void
        +fetchDeviceRecords() List
        +fetchAlertHistory() List
        +fetchUsersByRole(role) List
    }

    class Dashboard {
        +String dashboardId
        +String currentUserId
        +displayTemperatureReadings() void
        +showAlert(alert) void
        +updateDeviceStatus() void
        +displaySystemSummary() void
    }

    User <|-- Owner
    User <|-- Admin
    User <|-- Inspector

    Owner --> EmbeddedDevice : manages
    Admin --> EmbeddedDevice : monitors
    Inspector --> Alert : follows up

    EmbeddedDevice *-- TemperatureSensor
    EmbeddedDevice --> SensorReading : generates
    TemperatureSensor --> SensorReading : records

    EmbeddedDevice --> Server : sends temperature readings
    Server --> SensorReading : validates and stores
    Server --> ThresholdConfig : checks
    ThresholdConfig --> EmbeddedDevice : applies to

    Server --> Alert : creates
    Alert --> NotificationService : uses
    NotificationService --> User : sends email
    NotificationService --> AlertNotification : creates

    Server --> Database : stores data
    Database --> SensorReading : stores
    Database --> Alert : stores
    Database --> AlertNotification : stores

    Dashboard --> Server : requests data
    Dashboard --> SensorReading : displays
    Dashboard --> Alert : displays
    Dashboard --> EmbeddedDevice : displays status
    User --> Dashboard : views
