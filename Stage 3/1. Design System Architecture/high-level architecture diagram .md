MVP System Architecture

High-Level Package Diagram

High-Level Architecture Diagram




<img width="4000" height="4000" alt="High- Level Architecture Diagram" src="https://github.com/user-attachments/assets/6fc5a93b-b30b-4ed1-8ad2-5f734225fad3" />

⸻

Architecture Overview

FlexSight is designed as an IoT-based web monitoring platform that follows a layered architecture to ensure clear separation of responsibilities, maintainability, and scalability.

The system consists of an IoT device layer for collecting temperature and humidity readings, a client layer for user interaction through a web dashboard, a server layer for processing sensor data and alerts, a data layer for storing readings and system records, and external services for sending alert notifications.

The ESP32 monitoring node collects readings from the DHT11 temperature and humidity sensor and sends the data to the backend using MQTT or HTTP/API communication. The backend validates the received data, stores it in the database, checks temperature thresholds, and triggers warning or critical alerts when abnormal readings are detected.

⸻

System Components

Component	Technology	Description
IoT Device	ESP32 Monitoring Node	Collects sensor readings and sends them to the backend system
Sensor	DHT11 Temperature & Humidity Sensor	Measures temperature and humidity values from the monitored environment
Frontend	HTML, CSS, JavaScript	Web dashboard used to display readings, alerts, device status, and historical data
Backend	Python + Flask	RESTful API server responsible for receiving readings, validating data, processing alerts, and serving dashboard data
Communication	MQTT / HTTP API	Used to transmit sensor readings from the ESP32 node to the backend system
Database	SQL Database	Stores organizations, users, devices, locations, temperature readings, and alert logs
Alert Logic	Threshold Monitoring	Checks readings against warning and critical temperature thresholds
Email Notifications	SMTP / Email Service	Sends warning and critical alert notifications to responsible users

⸻

Architectural Principles

Separation of Concerns:
Each layer has a clear responsibility. The ESP32 node collects readings, the backend processes data and alerts, the database stores records, and the dashboard displays information to users.

Scalability:
The architecture allows additional ESP32 monitoring nodes to be added in the future without changing the overall system structure.

Maintainability:
Using a layered structure makes the system easier to update, debug, and expand during future development stages.

Reliability:
Temperature readings are validated before storage, and abnormal readings trigger alert logic to support quick response.

Extensibility:
The system can later support additional sensors, configurable thresholds, advanced reports, or more notification methods while keeping the MVP structure simple.
