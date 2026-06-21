Use Case 1: User Login
Description

The user enters login credentials through the dashboard. The server validates the credentials against the database and returns the authentication result.
```mermaid
sequenceDiagram
    actor User
    participant Dashboard
    participant Server
    participant Database

    User->>Dashboard: Enter username & password
    Dashboard->>Server: Login request
    Server->>Database: Validate credentials
    Database-->>Server: User record
    Server-->>Dashboard: Authentication result
    Dashboard-->>User: Access granted / denied

```
- Components Involved
- User
- Dashboard
- Server
- Database

Use Case 2: Temperature Monitoring and Alert Generation
Description

The embedded device reads temperature data from the sensor and sends it through MQTT. The server processes the data, checks thresholds, and creates an alert if the temperature exceeds the configured limit.
```mermaid
sequenceDiagram
    participant TemperatureSensor
    participant EmbeddedDevice
    participant MQTTBroker
    participant Server
    participant Database
    participant Alert
    participant NotificationService

    TemperatureSensor->>EmbeddedDevice: Read temperature
    EmbeddedDevice->>MQTTBroker: Publish temperature data
    MQTTBroker->>Server: Forward message
    Server->>Database: Save temperature log
    Server->>Server: Check threshold

    alt Temperature exceeds threshold
        Server->>Alert: Create alert
        Alert->>Database: Save alert log
        Alert->>NotificationService: Trigger notification
        NotificationService-->>Alert: Notification sent
    end
```
- Components Involved
- TemperatureSensor
- EmbeddedDevice
- MQTTBroker
- Server
- Database
- Alert
- NotificationService

Use Case 3: View Live Readings on Dashboard
Description

An inspector or administrator requests real-time monitoring data. The dashboard retrieves the latest readings from the server and displays them.

```mermaid
sequenceDiagram
    actor Inspector
    participant Dashboard
    participant Server
    participant Database

    Inspector->>Dashboard: Open monitoring dashboard
    Dashboard->>Server: Request latest readings
    Server->>Database: Fetch temperature records
    Database-->>Server: Reading data
    Server-->>Dashboard: Live readings
    Dashboard-->>Inspector: Display readings & status
```
- Components Involved
- Inspector
- Dashboard
- Server
- Database
  
### Summary of Key Use Cases

| Use Case | Main Purpose |
|---|---|
| **User Login** | Authenticate users and grant system access. |
| **Temperature Monitoring & Alert Generation** | Detect abnormal temperatures and trigger alerts when thresholds are exceeded. |
| **View Live Readings** | Display real-time temperature readings and device status information on the dashboard. |

