

```mermaid
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
        +receiveNotification(alert) void
    }

    class Owner {
        +manageSystemSettings() void
        +viewSystemReports() void
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
        +String status
        +Boolean isActive
        +DateTime lastHeartbeat
        +String firmwareVersion
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
        +publish(topic, message) void
        +subscribe(topic) void
        +authenticateDevice(deviceId, token) Boolean
    }

    class Server {
        +String serverId
        +String status
        +receiveData(payload) void
        +processDataAsync(temp) void
        +checkThreshold(temp) Boolean
        +triggerAlert() void
        +processHeartbeat(deviceId) void
    }

    class Database {
        +saveTemperatureLog() void
        +saveAlertLog() void
        +fetchDeviceRecords() List
        +fetchAlertHistory() List
        +fetchUsersByRole(role) List
        +backup() void
        +restore() void
    }

    class Alert {
        +String alertId
        +String deviceId
        +Float temperature
        +DateTime timestamp
        +Enum status
        +Enum severity
        +String resolvedBy
        +trigger() void
        +resolve() void
        +notifyUser() void
        +escalate() void
    }

    class Dashboard {
        +String dashboardId
        +String currentUserId
        +Boolean isRealTime
        +displayLiveReadings() void
        +showAlert(alert) void
        +updateDeviceStatus() void
        +connectWebSocket() void
        +exportData(format: String) void
    }

    class ThresholdConfig {
        +String configId
        +Float warningValue
        +Float criticalValue
        +Boolean isActive
        +String appliedTo
        +updateThreshold() void
        +applyToDevice(deviceId: String) void
    }

    class NotificationService {
        +sendEmail(user, alert) Boolean
        +getRecipients(deviceId) List
        +notifyAll(alert) void
    }

    User <|-- Owner
    User <|-- AdminManager
    User <|-- Inspector

    EmbeddedDevice *-- TemperatureSensor

    EmbeddedDevice --> MQTTBroker
    MQTTBroker --> Server

    Server *-- ThresholdConfig
    Server --> Database
    Server --> Alert

    Dashboard --> Server
    Dashboard --> Alert : displays

    User --> Dashboard

    Alert --> NotificationService : uses

    NotificationService --> User : sends to
    NotificationService --> Database : fetches users
    
  ```
