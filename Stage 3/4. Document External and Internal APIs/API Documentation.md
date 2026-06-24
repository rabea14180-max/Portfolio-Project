API Documentation

Purpose

This document defines the external services and internal API endpoints used by the FlexSight Temperature and Humidity Monitoring System. It explains how sensor data is transmitted, processed, stored, and presented through the dashboard.

The API design supports communication between ESP32 monitoring devices, the backend server, the database, and dashboard users while maintaining a scalable and maintainable architecture.

⸻

External APIs and Services

Overview

FlexSight relies on external communication services to receive sensor readings and deliver notifications.

Service	Purpose	Reason for Selection
MQTT Broker	Receives sensor readings from ESP32 devices and forwards them to the backend.	Lightweight, reliable, and optimized for IoT communication.
SMTP Email Service	Sends warning and critical alert notifications to users.	Simple integration and suitable for automated email notifications.

⸻

MQTT Broker

Purpose

The MQTT Broker acts as the communication layer between ESP32 monitoring devices and the backend server.

Why MQTT Was Chosen

* Lightweight protocol suitable for embedded devices.
* Low bandwidth usage.
* Fast message delivery.
* Widely adopted in IoT applications.
* Supports scalable communication between multiple devices and the server.

Communication Flow

ESP32 Device → MQTT Broker → Backend Server

MQTT Communication

The ESP32 monitoring devices publish sensor readings once every hour. The backend subscribes to the required topics, validates incoming data, stores readings in the database, and generates alerts whenever configured thresholds are exceeded.

⸻

SMTP Email Service

Purpose

The SMTP Email Service is responsible for sending warning and critical alert notifications to responsible users.

Why It Was Chosen

* Easy integration with Flask applications.
* Supports automated notifications.
* Reliable for MVP requirements.
* No mobile application is required during the MVP stage.

Notification Flow

Backend Server → Email Service → System Users

⸻

MQTT Topics Specification

Topic	Publisher	Subscriber	Purpose
flexsight/readings	ESP32 Device	Backend Server	Sends temperature and humidity readings.
flexsight/alerts	Backend Server	Dashboard	Publishes generated alerts.
flexsight/device-status	ESP32 Device	Backend Server	Reports device online/offline status.

⸻

Authentication and Authorization

FlexSight implements Role-Based Access Control (RBAC) to ensure that users only access features relevant to their responsibilities.

Supported Roles

Role	Description
Owner	Full system access including configuration and user management.
Admin / Manager	Monitoring, alert management, and operational supervision.
Inspector	Incident follow-up, alert investigation, and alert resolution.

⸻

Internal API Overview

The backend provides RESTful API endpoints that allow communication between the dashboard, monitoring devices, and system services.

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

API Endpoint Specifications

1. User Login

Endpoint

POST /api/login

Purpose

Authenticate users and grant access to the FlexSight dashboard.

Request Body

{
  "username": "admin",
  "password": "password123"
}

Successful Response

{
  "success": true,
  "role": "admin",
  "token": "jwt_token"
}

⸻

2. Submit Sensor Reading

Endpoint

POST /api/readings

Purpose

Receive temperature and humidity readings from ESP32 monitoring devices.

Request Body

{
  "device_id": "ESP32-001",
  "temperature": 35.4,
  "humidity": 60.2,
  "timestamp": "2026-06-01T10:00:00Z"
}

Successful Response

{
  "success": true,
  "message": "Reading stored successfully"
}

⸻

3. Retrieve Sensor Readings

Endpoint

GET /api/readings

Purpose

Retrieve historical and live sensor readings.

Query Parameters

Parameter	Description
device_id	Filter by device.
location_id	Filter by location.
start_date	Filter start date.
end_date	Filter end date.

Successful Response

[
  {
    "device_id": "ESP32-001",
    "temperature": 35.4,
    "humidity": 60.2,
    "timestamp": "2026-06-01T10:00:00Z"
  }
]

⸻

4. Retrieve Alerts

Endpoint

GET /api/alerts

Purpose

Retrieve active and historical alerts.

Successful Response

[
  {
    "alert_id": 1,
    "severity": "critical",
    "temperature": 52.3,
    "humidity": 78.0,
    "status": "active"
  }
]

⸻

5. Update Alert Status

Endpoint

PUT /api/alerts/{alert_id}

Purpose

Allow authorized users to update alert status.

Request Body

{
  "status": "resolved"
}

Successful Response

{
  "success": true,
  "message": "Alert updated successfully"
}

⸻

6. Retrieve Devices

Endpoint

GET /api/devices

Purpose

Retrieve all monitoring devices and their status.

Successful Response

[
  {
    "device_id": "ESP32-001",
    "status": "online"
  }
]

⸻

7. Retrieve Locations

Endpoint

GET /api/locations

Purpose

Retrieve all monitored locations.

Successful Response

[
  {
    "location_id": 1,
    "name": "Warehouse A"
  }
]

⸻

8. Retrieve Users

Endpoint

GET /api/users

Purpose

Retrieve users and assigned roles.

Successful Response

[
  {
    "user_id": 1,
    "username": "admin",
    "role": "Admin"
  }
]

⸻

9. Update Threshold Configuration

Endpoint

PUT /api/settings/threshold

Purpose

Update warning and critical temperature thresholds.

Request Body

{
  "warning_threshold": 45,
  "critical_threshold": 50
}

Successful Response

{
  "success": true,
  "message": "Threshold updated successfully"
}

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

Unauthorized Access

{
  "success": false,
  "message": "Unauthorized access"
}

Invalid Credentials

{
  "success": false,
  "message": "Invalid username or password"
}

Device Not Found

{
  "success": false,
  "message": "Device not found"
}

Invalid Sensor Data

{
  "success": false,
  "message": "Invalid sensor data"
}

⸻

API Security

The FlexSight API implements several security measures:

* Password hashing before storage.
* Role-Based Access Control (RBAC).
* Authentication token verification.
* Request input validation.
* Protected administrative endpoints.
* Secure communication between system components.
* Validation of incoming sensor readings before database storage.

⸻

Technical Justification

MQTT was selected because it is lightweight and optimized for communication between ESP32 devices and backend services. It minimizes bandwidth usage while providing reliable message delivery for IoT environments.

Flask was selected because it is lightweight, easy to maintain, and well suited for RESTful API development. It supports rapid development while remaining scalable for future project growth.

The API structure follows REST principles and aligns with the User Stories, System Architecture, Database Design, and Sequence Diagrams defined in Stage 3.

⸻

Future Expansion

The API architecture is designed to support future enhancements without major structural changes.

Possible future improvements include:

* Additional environmental sensors.
* Mobile application integration.
* SMS notification services.
* Advanced reporting and analytics.
* Predictive alerting using AI models.
* Multi-location deployment support.
* Third-party monitoring platform integrations.

These features are intentionally excluded from the MVP but can be incorporated in future project phases.
