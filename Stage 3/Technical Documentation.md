# FlexSight - Technical Documentation

## Stage 3: Technical Documentation

### Temperature and Humidity Monitoring and Alert System

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [User Stories and Mockups](#user-stories-and-mockups)
4. [System Architecture](#system-architecture)
5. [Components, Classes, and Database Design](#components-classes-and-database-design)
6. [High-Level Sequence Diagrams](#high-level-sequence-diagrams)
7. [External and Internal APIs](#external-and-internal-apis)
8. [SCM and QA Strategies](#scm-and-qa-strategies)
9. [Technical Justifications](#technical-justifications)
10. [Conclusion](#conclusion)

---

# Introduction

FlexSight is an IoT-based temperature and humidity monitoring system designed to support safer and more reliable environmental monitoring in operational environments such as server rooms, warehouses, laboratories, offices, and technical facilities.

This technical documentation translates the project objectives and MVP requirements into a detailed technical plan. It defines the system architecture, user stories, mockups, components, classes, database structure, sequence diagrams, API specifications, source control strategy, quality assurance plan, and technical justifications.

The purpose of this document is to provide the development team with a clear technical blueprint before implementation. It helps ensure that all team members understand how the system is structured, how data flows between components, how alerts are generated, and how the system will be tested and maintained.

---

# System Overview

The FlexSight MVP focuses on monitoring temperature and humidity readings using a DHT11 sensor connected to an ESP32 monitoring node.

The ESP32 collects sensor readings once every hour and sends the data to the backend system through MQTT or HTTP API communication. The backend validates the incoming readings, stores them in a SQL database, checks temperature threshold values, and generates warning or critical alerts when abnormal temperature levels are detected.

The web dashboard allows authorized users to view device status, temperature and humidity readings, historical records, and alert information. The system also supports email notifications to inform responsible users when a warning or critical alert occurs.

FlexSight follows a layered architecture that separates responsibilities across the IoT device layer, communication layer, backend layer, database layer, frontend dashboard, and external notification services.

---

# MVP Scope

The MVP includes the core features required to demonstrate the main monitoring and alerting workflow.

## Included in MVP

- Temperature monitoring.
- Humidity monitoring.
- ESP32 monitoring node.
- DHT11 sensor integration.
- Hourly sensor readings.
- Device status monitoring.
- SQL database storage.
- Web dashboard.
- Warning and critical alerts.
- Email alert notifications.
- User roles and access control.

## Out of MVP Scope

The following features are excluded from the MVP:

- Mobile application.
- Mobile push notifications.
- SMS notifications.
- AI-based risk prediction.
- Smoke monitoring.
- Gas monitoring.
- Flame monitoring.
- Camera feeds.
- Power monitoring.
- HVAC monitoring.
- Energy monitoring.
- Advanced analytics.
- Enterprise-level reporting.
- External integrations with third-party monitoring platforms.

- # User Stories and Mockups

This section defines the functional requirements of the FlexSight MVP from the users' perspective. User Stories describe the expected functionality of the system based on each user role. These stories help the development team understand user needs and prioritize features for the MVP.

The project follows the **MoSCoW prioritization method**, which classifies features into Must Have, Should Have, Could Have, and Won't Have categories.

---

## User Stories

The following User Stories define the primary functional requirements of the FlexSight MVP. They are organized according to the MoSCoW prioritization method and grouped by user role.

---

## Persona 1: Owner

### Must Have (MVP)

* As an Owner, I want to view all users, devices, readings, and alerts, so that I can supervise the entire FlexSight system.
* As an Owner, I want to access dashboard data across all monitored environments, so that I can monitor the overall system status.
* As an Owner, I want to view critical alerts from all monitored environments, so that I can identify high-risk situations quickly.
* As an Owner, I want to manage system settings, so that the monitoring process can be controlled at the system level.
* As an Owner, I want to view device status, so that I can know whether each ESP32 monitoring device is online or offline.

### Should Have

* As an Owner, I want to manage user roles and permissions, so that each user has the correct access level.
* As an Owner, I want to view system performance and alert summaries, so that I can evaluate the effectiveness of the monitoring system.
* As an Owner, I want to view historical hourly temperature and humidity readings, so that I can review previous environmental changes.

### Could Have

* As an Owner, I want to generate summary reports, so that I can review temperature trends and alert history.
* As an Owner, I want to customize warning and critical temperature thresholds, so that alert levels match the needs of each monitored device or sector.

---

## Persona 2: Admin / Manager

### Must Have (MVP)

* As an Admin/Manager, I want to view temperature and humidity readings from ESP32 devices, so that I can monitor the current environmental status of each monitored device.
* As an Admin/Manager, I want to see warning and critical alerts on the dashboard, so that I can respond quickly to abnormal temperature levels.
* As an Admin/Manager, I want to view device status, so that I can know whether each monitoring device is working properly.
* As an Admin/Manager, I want to filter readings by sector, device, and date, so that I can analyze sensor data easily.
* As an Admin/Manager, I want to review active alerts, so that I can prioritize urgent incidents.
* As an Admin/Manager, I want to view warning and critical alerts, so that I can follow up on operational safety issues.

### Should Have

* As an Admin/Manager, I want to receive email notifications for abnormal temperatures, so that responsible users are informed even when they are not viewing the dashboard.
* As an Admin/Manager, I want to view alert history, so that I can track previous incidents and responses.
* As an Admin/Manager, I want to monitor hourly readings, so that I can confirm that FlexSight is collecting readings exactly once every hour.

### Could Have

* As an Admin/Manager, I want to view email delivery status, so that I can confirm whether alert notifications were sent successfully.
* As an Admin/Manager, I want to export readings and alert data, so that I can prepare reports when needed.

---

## Persona 3: Inspector

### Must Have (MVP)

* As an Inspector, I want to view assigned alerts and affected devices, so that I can follow up on reported incidents.
* As an Inspector, I want to view temperature and humidity readings, so that I can understand the severity of the issue.
* As an Inspector, I want to view alert details including device ID, temperature, humidity, and time, so that I can inspect the issue accurately.
* As an Inspector, I want to update the alert status as resolved or unresolved, so that the team can track incident follow-up progress.
* As an Inspector, I want to view the affected device status, so that I can know whether the monitoring device is online or offline.

### Should Have

* As an Inspector, I want to add follow-up notes to an alert, so that the response details are documented.
* As an Inspector, I want to view previous alerts for the same device, so that I can identify repeated temperature issues.

### Could Have

* As an Inspector, I want to receive assigned alert notifications, so that I can follow up on incidents faster.

---

## Won't Have (Out of MVP Scope)

The following features are intentionally excluded from the MVP and may be considered in future releases:

* Mobile application.
* Mobile push notifications.
* SMS notifications.
* AI-based risk prediction.
* Smoke monitoring.
* Gas monitoring.
* Flame monitoring.
* Camera feeds.
* Power monitoring.
* HVAC monitoring.
* Energy monitoring.
* Advanced analytics.
* Enterprise-level reporting.
* External integrations with third-party monitoring platforms.

---

# Mockups

To visualize the user interface before implementation, several mockups were designed to represent the main screens of the FlexSight dashboard.

These mockups provide a clear understanding of the system layout and user experience before development begins.

The mockups include:

* Login Screen
* Dashboard
* Devices Screen
* Alert Details Screen
* Alert Notification
* History Screen

## Figma Design

https://www.figma.com/design/16Nuzcwz3B1azhiJiN22X9/FlexSight-Stage-3-Technical-Documentation

The Figma prototype serves as the visual reference for the frontend implementation and demonstrates the expected appearance and navigation flow of the FlexSight web dashboard.
