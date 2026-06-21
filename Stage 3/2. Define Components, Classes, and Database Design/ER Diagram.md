

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
