API Documentation

Purpose

This document defines the external services and internal API endpoints used by the FlexSight Temperature and Humidity Monitoring System.

⸻

External APIs and Services

Service	Purpose	Reason for Selection
MQTT Broker	Receives sensor readings from ESP32 devices and forwards them to the backend.	Lightweight and efficient IoT communication protocol.
SMTP Email Service	Sends warning and critical alert notifications.	Reliable and simple notification mechanism for MVP requirements.

⸻

System Communication Flow

flowchart LR
    ESP32["ESP32 + DHT11 Sensor"]
    MQTT["MQTT Broker"]
    API["Flask Backend API"]
    DB["SQL Database"]
    EMAIL["SMTP Email Service"]
    USER["Owner / Admin / Inspector"]
    ESP32 --> MQTT
    MQTT --> API
    API --> DB
    API --> EMAIL
    EMAIL --> USER

⸻

MQTT Topics

Topic	Publisher	Subscriber	Purpose
flexsight/readings	ESP32 Device	Backend Server	Sends temperature and humidity readings.
flexsight/device-status	ESP32 Device	Backend Server	Reports online/offline status.
flexsight/alerts	Backend Server	Dashboard	Publishes generated alerts.

⸻

User Roles

Role	Responsibilities
Owner	Full system access and configuration management.
Admin / Manager	Monitor readings, alerts, and devices.
Inspector	Follow up incidents and update alert status.

⸻

Internal API Overview

Endpoint	Method	Purpose
/api/login	POST	Authenticate users.
/api/readings	POST	Receive sensor readings from ESP32 devices.
/api/readings	GET	Retrieve stored readings.
/api/alerts	GET	Retrieve alerts.
/api/alerts/{id}	PUT	Update alert status.
/api/devices	GET	Retrieve device information.
/api/locations	GET	Retrieve monitored locations.
/api/users	GET	Retrieve users and roles.
/api/settings/threshold	PUT	Update threshold configuration.

⸻

API Processing Flow

sequenceDiagram
    participant ESP32
    participant MQTT
    participant API
    participant Database
    participant Email
    ESP32->>MQTT: Publish reading
    MQTT->>API: Forward reading
    API->>Database: Store reading
    API->>API: Validate & Check Threshold
    alt Threshold Exceeded
        API->>Email: Send Alert
    end

⸻

API Endpoint Specifications

POST /api/login

Request

{
  "username": "admin",
  "password": "password123"
}

Response

{
  "success": true,
  "role": "admin"
}

⸻

POST /api/readings

Request

{
  "device_id": "ESP32-001",
  "temperature": 35.4,
  "humidity": 60.2,
  "timestamp": "2026-06-01T10:00:00Z"
}

Response

{
  "success": true,
  "message": "Reading stored successfully"
}

⸻

GET /api/readings

Query Parameters

Parameter	Description
device_id	Filter by device
location_id	Filter by location
start_date	Start date
end_date	End date

⸻

GET /api/alerts

Returns active and historical alerts.

⸻

PUT /api/alerts/{id}

Updates alert status (resolved/unresolved).

⸻

Access Control Matrix

Endpoint	Owner	Admin / Manager	Inspector
POST /api/login	✓	✓	✓
GET /api/readings	✓	✓	✓
GET /api/alerts	✓	✓	✓
PUT /api/alerts/{id}	✓	✓	✓
GET /api/devices	✓	✓	✓
GET /api/locations	✓	✓	✓
GET /api/users	✓	✗	✗
PUT /api/settings/threshold	✓	✗	✗

⸻

Error Responses

{
  "success": false,
  "message": "Unauthorized access"
}
{
  "success": false,
  "message": "Invalid username or password"
}
{
  "success": false,
  "message": "Device not found"
}

⸻

Technical Justification

* MQTT was selected because it is lightweight and optimized for IoT communication.
* Flask was selected because it is simple, flexible, and suitable for RESTful API development.
* SQL Database was selected to provide structured and reliable storage for system records.
* RESTful APIs provide scalability, maintainability, and clear communication between components.

⸻

Future Expansion

* Mobile application integration.
* SMS notifications.
* Additional environmental sensors.
* Advanced reporting and analytics.
* AI-based predictive alerting.
* Third-party monitoring integrations.
