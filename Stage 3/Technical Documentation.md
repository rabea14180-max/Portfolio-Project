# FlexSight - Technical Documentation

## Stage 3

### Temperature & Humidity Monitoring and Alert System

---

# Introduction

## Purpose of this Document

This Technical Documentation provides a comprehensive overview of the FlexSight MVP from a technical perspective. It defines the system architecture, software components, database design, interaction flows, API specifications, source control strategy, and quality assurance processes that guide the implementation of the project.

The document serves as a technical blueprint for the development team, ensuring that all members share a common understanding of the system structure, communication flow, and implementation approach before development progresses further.

---

## Project Overview

FlexSight is an IoT-based Temperature and Humidity Monitoring System designed to improve environmental monitoring and operational safety in facilities such as server rooms, warehouses, laboratories, and industrial environments.

The system continuously collects temperature and humidity readings using a DHT11 sensor connected to an ESP32 monitoring node. Sensor readings are transmitted to the backend through MQTT or HTTP APIs, where they are validated, stored, and analyzed.

Whenever the measured temperature reaches predefined warning or critical thresholds, the backend automatically generates alerts and sends email notifications to responsible users. All collected data, device status, and alerts are displayed through a web-based dashboard, allowing users to monitor monitored environments in real time.

---

## Project Objectives

The primary objectives of the FlexSight MVP are:

* Monitor environmental temperature and humidity using ESP32 monitoring devices.
* Collect and store sensor readings every hour.
* Automatically detect abnormal temperature levels based on predefined thresholds.
* Generate warning and critical alerts whenever unsafe conditions are detected.
* Notify responsible users through email notifications.
* Provide a centralized dashboard for monitoring devices, readings, and alerts.
* Build a scalable architecture that supports future expansion with additional monitoring devices and sensors.

---

## Scope of the MVP

The current MVP focuses on the core monitoring functionality required to demonstrate the feasibility of the FlexSight platform.

### Included in the MVP

* Temperature monitoring
* Humidity monitoring
* ESP32 monitoring node
* DHT11 sensor integration
* Hourly sensor readings
* Alert generation
* Email notifications
* Device status monitoring
* Historical readings
* Web dashboard
* User authentication and role management

### Out of Scope

The following features are intentionally excluded from the MVP:

* Mobile application
* SMS notifications
* Push notifications
* AI-based prediction
* Smoke detection
* Gas detection
* Flame detection
* Camera integration
* Energy monitoring
* HVAC monitoring
* Enterprise analytics

---

# System Overview

FlexSight follows a layered IoT architecture that separates responsibilities into multiple independent layers. Each layer performs a dedicated function, improving maintainability, scalability, and reliability.

The monitoring process begins with the DHT11 Temperature and Humidity Sensor, which measures environmental conditions once every hour. The ESP32 Monitoring Node collects these readings and transmits them to the backend using MQTT or HTTP communication.

The Flask Backend API validates incoming readings, stores them in the SQL database, evaluates threshold values, and generates warning or critical alerts whenever abnormal temperatures are detected.

Finally, the Web Dashboard retrieves the processed data through REST APIs and presents live readings, device status, historical records, and alert information to authorized users.

This layered architecture enables the system to remain modular while allowing future enhancements such as additional sensors, multiple monitoring nodes, configurable thresholds, and advanced reporting features without significant architectural changes.
