
   actor User as User<br/>(Owner / Admin-Manager / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API
    participant DB as SQL Database
Sequence Diagrams / Use Cases

Use Case 1: User Login

Description

The user enters login credentials through the FlexSight web dashboard. The Flask Backend API validates the credentials against the SQL database and returns the authentication result based on the user role.

```mermaid
sequenceDiagram
    actor User as User<br/>(Owner / Admin-Manager / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API
    participant DB as SQL Database

    User->>Dashboard: Enter email and password
    Dashboard->>API: Send login request
    API->>DB: Validate user credentials
    DB-->>API: Return user record and role
    API-->>Dashboard: Authentication result
    Dashboard-->>User: Access granted / denied
```
Components Involved

* User
* Web Dashboard
* Flask Backend API
* SQL Database

Use Case 2: Hourly Temperature and Humidity Monitoring and Alert Generation

Description

The DHT11 sensor reads temperature and humidity data once every hour. The ESP32 Monitoring Node sends the hourly reading to the Flask Backend API through MQTT or HTTP API. The backend stores the reading, checks the temperature threshold, and creates an alert if the reading reaches the warning or critical range.

```mermaid
sequenceDiagram
    participant Sensor as DHT11 Sensor
    participant ESP32 as ESP32 Monitoring Node
    participant Comm as MQTT / HTTP API
    participant API as Flask Backend API
    participant DB as SQL Database
    participant Email as Email Alert Service
    actor Users as Responsible Users<br/>(Owner / Admin-Manager / Inspector)

    Sensor->>ESP32: Read temperature and humidity once every hour
    ESP32->>Comm: Send hourly sensor reading
    Comm->>API: POST /api/readings
    API->>DB: Store sensor reading
    API->>API: Validate reading and check threshold

    alt Temperature below 45°C
        API-->>DB: Store normal status only
    else Temperature 45°C to 49°C
        API->>DB: Create warning alert
        API->>Email: Send warning email notification
        Email-->>Users: Notify responsible users
    else Temperature 50°C or above
        API->>DB: Create critical alert
        API->>Email: Send critical email notification
        Email-->>Users: Notify responsible users
    end
```
Components Involved

* DHT11 Sensor
* ESP32 Monitoring Node
* MQTT / HTTP API
* Flask Backend API
* SQL Database
* Email Alert Service
* Responsible Users

Use Case 3: View Latest Hourly Readings on Dashboard

Description

An Owner, Admin/Manager, or Inspector opens the dashboard to view the latest hourly temperature and humidity readings. The dashboard requests the stored readings from the Flask Backend API, and the API retrieves the data from the SQL database.

```mermaid
sequenceDiagram
    actor User as User<br/>(Owner / Admin-Manager / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API
    participant DB as SQL Database

    User->>Dashboard: Open readings dashboard
    Dashboard->>API: Request latest hourly readings
    API->>DB: Fetch sensor readings and device status
    DB-->>API: Return hourly readings
    API-->>Dashboard: Send readings and alert status
    Dashboard-->>User: Display hourly readings, device status, and alerts
```
omponents Involved

* User
* Web Dashboard
* Flask Backend API
* SQL Database

## Summary of Key Use Cases

| Use Case | Main Purpose |
|-----------|-------------|
| User Login | Authenticate users and grant system access based on role. |
| Hourly Temperature and Humidity Monitoring & Alert Generation | Collect hourly sensor readings, check thresholds, and create alerts when abnormal temperatures are detected. |
| View Latest Hourly Readings | Display hourly temperature and humidity readings, device status, and alert status on the dashboard. |
