# FlexSight – Temperature Monitoring & Alert System

## Overview

FlexSight is an IoT-based temperature monitoring and alert system designed to improve operational safety in environments where abnormal temperature levels may cause equipment damage, operational downtime, or safety incidents.

The system continuously collects temperature readings from a DHT11 Temperature Sensor connected to an ESP32 Monitoring Device. The collected data is transmitted through MQTT/API communication, processed by a centralized Flask backend server, stored in a SQL database, and displayed on a real-time web dashboard.

Whenever abnormal temperature levels are detected, the system automatically generates warning or critical alerts and sends email notifications to responsible users, enabling rapid response and reducing operational risks.

---

# Problem Statement

Many operational environments such as server rooms, warehouses, factories, industrial facilities, and data centers still rely on manual temperature monitoring.

These approaches often result in:

* Delayed detection of abnormal temperature levels.
* Lack of continuous monitoring.
* Slow response to critical incidents.
* Increased risk of equipment damage.
* Limited visibility of system conditions.

FlexSight addresses these challenges by providing a lightweight, automated, and scalable monitoring solution.

---

# Proposed Solution

The system follows a simple and efficient workflow:

```text
DHT11 Temperature Sensor
        │
        ▼
ESP32 Monitoring Device
        │
        ▼
MQTT / HTTP API
        │
        ▼
Flask Backend Server
        │
        ▼
SQL Database
        │
        ▼
Web Dashboard
        │
        ▼
Email Alert Notification
```

### Core Functions

* Real-time temperature monitoring.
* MQTT/API communication.
* Server-side data validation and processing.
* Temperature threshold monitoring.
* Automatic alert generation.
* Email notifications.
* Dashboard visualization.
* Historical data storage.

---

# Project Objectives

## Primary Objective

Develop a functional IoT-based temperature monitoring system capable of detecting abnormal temperature conditions and automatically generating alerts.

## Secondary Objectives

* Build a functional Minimum Viable Product (MVP).
* Provide real-time dashboard monitoring.
* Implement centralized backend processing.
* Store temperature readings and alert history.
* Design a scalable architecture for future expansion.

---

# Target Users

The system is designed for:

* Facility Managers
* Safety Officers
* Warehouse Operators
* Server Room Administrators
* Operations Teams
* Industrial Site Supervisors

---

# Target Sectors

* Warehouses
* Server Rooms
* Factories
* Industrial Facilities
* Data Centers
* Technical Facilities
* Electrical Rooms

---

# Technical Stack

## Hardware

* ESP32 Monitoring Device
* DHT11 Temperature Sensor

## Software

* Python
* Flask
* MQTT
* HTML
* CSS
* JavaScript
* SQL Database

## Tools

* Git
* GitHub
* Figma
* Google Docs
* Canva
* Mermaid

---

# Team Members

| Name                 | Role                                |
| -------------------- | ----------------------------------- |
| **Hamsa Alammar**    | Team Leader & Frontend Developer    |
| **Munirah Alotaibi** | UI/UX Designer & Frontend Developer |
| **Hanin Hassan**     | Backend Developer                   |
| **Rabea Thabit**     | Backend Developer                   |

---

# Project Stages

## Stage 1 – Idea Development

### Completed Activities

* Team Formation
* Brainstorming Sessions
* Idea Evaluation
* Problem Identification
* Solution Definition
* Project Selection

### Deliverables

* Idea Development Documentation
* Stage 1 README

---

## Stage 2 – Project Charter Development

### Completed Activities

* Project Objectives
* SMART Goals
* Stakeholder Identification
* Team Role Definition
* Scope Definition
* Risk Assessment
* Mitigation Planning
* High-Level Project Planning

### Deliverables

* Project Charter
* Stage 2 README

---

## Stage 3 – Technical Documentation

### Completed Activities

* User Stories and Prioritization
* UI/UX Mockups (Figma)
* High-Level System Architecture
* Components and Class Design
* Database Schema Design
* High-Level Sequence Diagrams
* External and Internal API Specifications
* Source Control Management (SCM)
* Quality Assurance (QA) Planning
* Technical Design Justifications

### Deliverables

* Technical Documentation
* Stage 3 README

---

# Project Documentation

The project documentation is organized into three major development stages:

* **Stage 1** – Idea Development
* **Stage 2** – Project Charter
* **Stage 3** – Technical Documentation

Each stage contains its own README together with the corresponding documentation that explains the project's evolution from the initial concept to the complete technical design.

---

# Current Status

✅ Stage 1 Completed

✅ Stage 2 Completed

✅ Stage 3 Completed

✅ Technical Documentation Completed

🚧 Preparing for MVP Development (Implementation Phase)

---

# Repository Structure

```text
Portfolio-Project/
│
├── README.md
│
├── Stage 1/
│   ├── README.md
│   └── FlexSight-Stage1-Fixed.docx
│
├── Stage 2/
│   ├── README.md
│   └── FlexSight_ProjectCharter_Stage2_Updated.md
│
└── Stage 3/
    ├── README.md
    └── TechnicalDocumentation.md
```

---

# Future Vision

Future versions of FlexSight may include:

* Multiple ESP32 Device Monitoring
* Smoke Detection
* Gas Detection
* Flame Detection
* AI-Based Risk Prediction
* Camera Integration
* Advanced Analytics and Reporting
* Mobile Application
* SMS Alert Notifications
* Cloud Deployment
* Real-Time Data Visualization

---

# Authors

Developed by the **FlexSight Team** as part of the Holberton School Portfolio Project.

### Team Members

* Hamsa Alammar
* Munirah Alotaibi
* Hanin Hassan
* Rabea Thabit

© 2026 FlexSight Team
