MVP System Architecture

High-Level Package Diagram

High-Level Architecture Diagram

```mermaid
flowchart LR
    subgraph IoT["IoT Device Layer"]
        S["DHT11 Sensor<br/>Temperature & Humidity"]
        E["ESP32 Monitoring Node<br/>Collects one reading every hour"]
    end

    subgraph COM["Communication Layer"]
        C["MQTT / HTTP API<br/>Sends hourly sensor readings"]
    end

    subgraph SERVER["Server Layer"]
        API["Flask Backend API"]
        EP["API Endpoints"]
        RV["Reading Validation"]
        TC["Threshold Checking"]
        AP["Alert Processing Logic"]
    end

    subgraph DATA["Data Layer"]
        DB["SQL Database<br/>Users<br/>Devices<br/>Sensor Readings<br/>Alerts<br/>Alert Notifications<br/>Threshold Settings"]
    end

    subgraph CLIENT["Client Layer"]
        WD["Web Dashboard<br/>HTML, CSS, JavaScript"]
        U["System Users<br/>Owner<br/>Admin / Manager<br/>Inspector"]
    end

    subgraph EXT["External Services Layer"]
        EMAIL["Email Alert Service"]
        RU["Responsible Users<br/>Owner<br/>Admin / Manager<br/>Inspector"]
    end

    S -->|"Temperature and humidity data"| E
    E -->|"Hourly reading"| C
    C -->|"POST /api/readings"| API

    API --> EP
    EP --> RV
    RV --> TC
    TC --> AP

    API -->|"Store readings and alerts"| DB
    DB -->|"Retrieve stored data"| API

    WD -->|"GET /api/readings<br/>GET /api/alerts<br/>GET /api/devices"| API
    U -->|"View dashboard, devices, readings, and alerts"| WD

    AP -->|"Warning or critical alert"| EMAIL
    EMAIL -->|"Send email notification"| RU
```
⸻

Architecture Overview

FlexSight is designed as an IoT-based web monitoring platform that follows a layered architecture to ensure clear separation of responsibilities, maintainability, and scalability.

The system consists of an IoT device layer for collecting temperature and humidity readings, a client layer for user interaction through a web dashboard, a server layer for processing sensor data and alerts, a data layer for storing readings and system records, and external services for sending alert notifications.

The ESP32 monitoring node collects readings from the DHT11 temperature and humidity sensor and sends the data to the backend using MQTT or HTTP/API communication. The backend validates the received data, stores it in the database, checks temperature thresholds, and triggers warning or critical alerts when abnormal readings are detected.

⸻
## System Components

| Component | Technology | Description |
|---|---|---|
| IoT Device | ESP32 Monitoring Node | Collects sensor readings every hour and sends them to the backend system. |
| Sensor | DHT11 Temperature & Humidity Sensor | Measures temperature and humidity values from the monitored device environment. |
| Frontend | HTML, CSS, JavaScript | Web dashboard used to display readings, alerts, device status, and historical data. |
| Backend | Python + Flask | RESTful API server responsible for receiving readings, validating data, processing alerts, and serving dashboard data. |
| Communication | MQTT / HTTP API | Used to transmit hourly sensor readings from the ESP32 node to the backend system. |
| Database | SQL Database | Stores users, devices, sensor readings, alerts, alert notifications, and threshold settings. |
| Alert Logic | Threshold Monitoring | Checks readings against warning and critical temperature thresholds. |
| Email Notifications | SMTP / Email Service | Sends warning and critical alert notifications to responsible users. |
:::
⸻

Architecture Overview

FlexSight is designed as an IoT-based web monitoring platform that follows a layered architecture to ensure clear separation of responsibilities, maintainability, and scalability.

The system consists of an IoT device layer for collecting temperature and humidity readings, a client layer for user interaction through a web dashboard, a server layer for processing sensor data and alerts, a data layer for storing readings and system records, and an external service layer for sending email alert notifications.

The ESP32 monitoring node collects readings from the DHT11 temperature and humidity sensor exactly once every hour and sends the data to the backend using MQTT or HTTP/API communication. The backend validates the received data, stores it in the database, checks temperature thresholds, and triggers warning or critical alerts when abnormal readings are detected.



System Components

Component

Technology

Description

IoT Device

ESP32 Monitoring Node

Collects sensor readings every hour and sends them to the backend system.

Sensor

DHT11 Temperature & Humidity Sensor

Measures temperature and humidity values from the monitored device environment.

Frontend

HTML, CSS, JavaScript

Web dashboard used to display readings, alerts, device status, and historical data.

Backend

Python + Flask

RESTful API server responsible for receiving readings, validating data, processing alerts, and serving dashboard data.

Communication

MQTT / HTTP API

Used to transmit hourly sensor readings from the ESP32 node to the backend system.

Database

SQL Database

Stores users, devices, sensor readings, alerts, alert notifications, and threshold settings.

Alert Logic

Threshold Monitoring

Checks readings against warning and critical temperature thresholds.

Email Notifications

SMTP / Email Service

Sends warning and critical alert notifications to responsible users.


Architectural Principles

Separation of Concerns

Each layer has a clear responsibility. The ESP32 node collects readings, the backend processes data and alerts, the database stores records, and the dashboard displays information to users.

Scalability

The architecture allows additional ESP32 monitoring nodes to be added in the future without changing the overall system structure.

Maintainability

Using a layered structure makes the system easier to update, debug, and expand during future development stages.

Reliability

Temperature and humidity readings are validated before storage, and abnormal readings trigger alert logic to support quick response.

Extensibility

The system can later support additional sensors, configurable thresholds, and summary reports while keeping the MVP structure simple.
