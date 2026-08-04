## Use Case 3: Hourly Temperature Monitoring and Alert Generation

### Description

The temperature sensor reads temperature data once every hour. The ESP32 Monitoring Device sends the hourly reading to the Flask Backend API through MQTT or HTTP API. The backend stores the reading, checks the temperature threshold, and creates a warning or critical alert if the reading exceeds the configured threshold. The alert is then displayed on the web dashboard.

```mermaid
sequenceDiagram
    participant Sensor as Temperature Sensor
    participant ESP32 as ESP32 Monitoring Device
    participant Comm as MQTT / HTTP API
    participant API as Flask Backend API
    participant DB as SQL Database
    participant Dashboard as Web Dashboard

    Sensor->>ESP32: Read temperature once every hour
    ESP32->>Comm: Send hourly temperature reading
    Comm->>API: POST /api/readings

    API->>DB: Store temperature reading
    API->>API: Validate reading and check threshold

    alt Temperature below 45°C
        API-->>DB: Store normal reading
    else Temperature 45°C to 49°C
        API->>DB: Create warning alert
    else Temperature 50°C or above
        API->>DB: Create critical alert
    end

    Dashboard->>API: Request latest readings and alerts
    API->>DB: Fetch readings and alerts
    DB-->>API: Return latest data
    API-->>Dashboard: Send readings and alerts
```

### Components Involved

- Temperature Sensor
- ESP32 Monitoring Device
- MQTT / HTTP API
- Flask Backend API
- SQL Database
- Web Dashboard
- | Use Case | Main Purpose |
|---|---|
| User Sign Up | Create a new user account in the FlexSight system. |
| User Login | Authenticate users and grant system access based on role. |
| Hourly Temperature Monitoring & Alert Generation | Collect hourly temperature readings, check thresholds, create alerts, and display them on the dashboard. |
| View Latest Hourly Readings | Display hourly temperature readings, device status, and alert status on the dashboard. |
| User Log Out | End the user session and return to the login page. |
