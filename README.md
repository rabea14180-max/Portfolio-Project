# FlexSight — Temperature Monitoring & Alert System

*Project Type:* Graduation Project MVP  
*Platform:* Web Dashboard  
*Core Workflow:* Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert  
*Current Scope:* Temperature Monitoring Only  

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Problem Statement](#2-problem-statement)
- [3. Proposed Solution](#3-proposed-solution)
- [4. Project Scope](#4-project-scope)
- [5. Target Users & Sectors](#5-target-users--sectors)
- [6. Team Formation & Roles](#6-team-formation--roles)
- [7. Collaboration Strategy](#7-collaboration-strategy)
- [8. Brainstorming & Idea Evaluation](#8-brainstorming--idea-evaluation)
- [9. Final Decision Justification](#9-final-decision-justification)
- [10. System Architecture](#10-system-architecture)
- [11. Technical Stack](#11-technical-stack)
- [12. Database Design](#12-database-design)
- [13. API Endpoints](#13-api-endpoints)
- [14. UI/UX Design — Figma Web Dashboard](#14-uiux-design--figma-web-dashboard)
- [15. User Flow](#15-user-flow)
- [16. Repository Structure](#16-repository-structure)
- [17. Roadmap](#17-roadmap)
- [18. Risks & Constraints](#18-risks--constraints)
- [19. Future Enhancements](#19-future-enhancements)
- [20. Project Summary](#20-project-summary)

---

## 1. Project Overview

*FlexSight* is a lightweight temperature monitoring and alert system designed to support early safety response in operational environments.

The system continuously reads temperature values from a sensor, sends the readings through *MQTT/API* using a *custom monitoring node*, processes the data on the server, and displays live readings and alerts on a web dashboard.

The main project workflow is:

text
Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert


The current MVP focuses on *temperature monitoring only*.

When the temperature reaches approximately *50C*, the system triggers an automatic dashboard alert.

---

## 2. Problem Statement

Many operational environments such as server rooms, warehouses, factories, offices, data centres, technical facilities, and electrical rooms face safety risks caused by high temperature levels and delayed monitoring.

Traditional manual inspection methods create several issues:

- Temperature levels are not monitored continuously
- Critical heat thresholds may go unnoticed
- Alerts may be delayed or unavailable
- Monitoring data is not centralized
- Safety teams may respond late to abnormal temperature conditions

---

## 3. Proposed Solution

FlexSight provides a real-time temperature monitoring system that follows the workflow:

text
Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert


The system:

- Reads temperature values from a temperature sensor
- Uses a custom monitoring node to send readings
- Transmits readings through MQTT/API
- Processes readings on the server
- Checks readings against a defined threshold
- Triggers an alert when the temperature reaches approximately 50C
- Displays live readings and alerts on a web dashboard

---

## 4. Project Scope

### 4.1 In Scope

| Feature | Description |
|---|---|
| Temperature Monitoring | Continuously reads temperature values |
| Custom Monitoring Node | Team-configured node used to send temperature data |
| MQTT/API Communication | Sends readings from the node to the server |
| Server Processing | Receives and processes temperature data |
| Threshold Checking | Compares readings against the alert threshold |
| Dashboard Alert | Displays alerts when abnormal temperature is detected |
| Live Dashboard | Shows live readings and node status |
| Historical Readings | Stores and displays previous temperature data |
| Basic Reports | Provides simple monitoring summaries |

---

### 4.2 Out of Scope

| Feature | Status |
|---|---|
| Gas Detection | Out of Scope |
| Smoke Detection | Out of Scope |
| Flame Detection | Out of Scope |
| AI Camera Detection | Out of Scope |
| Mobile Application | Out of Scope |
| SMS Notifications | Out of Scope |
| Multi-location Enterprise Monitoring | Out of Scope |
| Advanced AI Risk Analysis | Out of Scope |

These features may be considered in future versions after the temperature monitoring MVP is completed and tested.

---
### Hardware Starter Kit

The team selected an ESP32 starter kit for the initial prototype because it includes the main components needed for early testing and development.

The kit includes:

- ESP32 Development Board
- Temperature and humidity sensor
- Breadboard
- Jumper wires
- USB cable
- OLED display
- Buzzer
- Relay module
- Motion sensor
- Light sensor
- LEDs
- Resistors
- Push buttons

This kit allows the team to start programming, wiring, and testing the first prototype without purchasing each component separately.

The ESP32 Development Board will be used as the programmable monitoring node that reads sensor data and sends temperature readings to the server through MQTT/API.
---

## 5. Target Users & Sectors

### 5.1 Target Users

| User Role | Description |
|---|---|
| Owner | Full access to organizations, users, monitoring nodes, dashboard alerts, and settings |
| Organisation Owner | Manages a specific organization, connected nodes, locations, users, and operational settings |
| Admin / Manager | Monitors dashboard alerts, manages users, reviews node status, and supervises operations |
| Inspector | Views temperature readings, monitors alerts, and follows up on reported incidents |

### 5.2 Target Sectors

- Server rooms
- Warehouses
- Factories
- Data centres
- Technical facilities
- Offices
- Industrial environments
- Electrical rooms

---

## 6. Team Formation & Roles

The project team was structured around the main system workflow:

text
Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert



## 6. Team Formation & Roles

The project team was divided based on the main areas required to build FlexSight: project leadership, UI/UX design, frontend development, backend development, and programming support.


| Role | Team Member | Main Responsibility |
|---|---|---|
| Team Leader & Frontend Developer | Hamsa Bnian Alammar | Leads the team coordination, follows up on tasks, supports project planning, and builds the frontend dashboard pages using HTML, CSS, and JavaScript |
| UI/UX Designer & Frontend Developer | Munirah Enad Alotaibi | Designs the Figma wireframes, design system, dashboard layout, visual identity, reusable components, and supports frontend implementation based on the final UI screens |
| Programming & Backend Developer | Hanin Taqi Al Sayed Hassan | Handles programming tasks, backend logic, ESP32 monitoring node setup, temperature sensor integration, MQTT/API communication, and supports alert processing |
| Backend Developer | Rabea Younis Thabit | Builds and supports the backend structure, server-side processing, API handling, database connection, and temperature threshold checking |

---

## 7. Collaboration Strategy

### 7.1 Communication Tools

| Tool | Purpose |
|---|---|
| WhatsApp | Quick updates and daily communication |
| Discord | Technical discussions and file sharing |
| Google Meet | Remote meetings and team alignment |
| In-person Meetings | Brainstorming and project planning |

### 7.2 Documentation & Design Tools

| Tool | Purpose |
|---|---|
| Google Docs | Collaborative report writing and editing |
| Canva | Presentation slides and visual materials |
| GitHub | File organization and version control |
| Figma | UI/UX design, wireframes, and prototype |
| SharePoint | Project file storage and team documentation workspace |

### 7.3 Decision-Making

Decisions are made through group discussion. If consensus is not reached, the team uses voting to select the most suitable option based on:

- Feasibility
- Clarity
- Technical alignment
- Project timeline
- MVP simplicity

---

## 8. Brainstorming & Idea Evaluation

### 8.1 Brainstorming Techniques

| Technique | Description |
|---|---|
| Mind Mapping | Organized system components, communication methods, sensor options, and alert features visually |
| How Might We Questions | Explored ways to detect abnormal temperature levels and send alerts efficiently |
| Research-Based Discussions | Focused on real incidents, safety challenges, delayed detection, and dashboard alerts |
| SCAMPER | Improved the monitoring idea by modifying existing temperature monitoring concepts |

### 8.2 Ideas Explored

| Idea | Description | Result |
|---|---|---|
| Smart AI Camera | Camera-based system for detecting risks using AI | Rejected |
| Full Fire Detection System | Multi-sensor fire detection system | Rejected |
| Mobile Alert Application | Mobile app for receiving alerts | Rejected |
| FlexSight | Temperature monitoring system using MQTT/API, server processing, and dashboard alerts | Selected |

### 8.3 Evaluation Score

| Idea | Feasibility | Impact | Technical Alignment | Scalability | MVP Simplicity | Total |
|---|---:|---:|---:|---:|---:|---:|
| Smart AI Camera | 2 | 5 | 3 | 5 | 2 | 17 |
| Full Fire Detection System | 3 | 5 | 4 | 5 | 2 | 19 |
| Mobile Alert Application | 4 | 3 | 4 | 3 | 4 | 18 |
| FlexSight | 5 | 4 | 5 | 5 | 5 | 24 |

---

## 9. Final Decision Justification

The team selected FlexSight because it addresses a clear operational safety need and can be built using simple, available components within the project timeline.

FlexSight was chosen because it is:

- Feasible within the project timeline
- Aligned with team skills
- Simple enough for an MVP
- Useful for real operational environments
- Scalable for future development
- Based on a clear workflow: Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert

---

## 10. System Architecture

### 10.1 Architecture Overview

![FlexSight Architecture](./assets/flexsight-system-architecture.jpeg)

### 10.2 Core Workflow

### 10.2 Core Workflow

The FlexSight workflow shows how temperature data moves from the sensor to the dashboard alert.

| Step | Component | Description |
|---|---|---|
| 1 | Temperature Sensor | Reads the current temperature value |
| 2 | ESP32 Monitoring Node | Collects the reading and prepares it for transmission |
| 3 | MQTT/API Layer | Sends the temperature reading to the server |
| 4 | Server Processing | Receives, validates, and processes the reading |
| 5 | Threshold Checking | Compares the reading with the defined alert threshold |
| 6 | Database Storage | Stores temperature readings and alert records |
| 7 | Web Dashboard | Displays live readings, node status, and alerts |
| 8 | Dashboard Alert | Shows an alert when the temperature reaches the critical level |

### 10.3 Data Flow

#### Data Flow Sequence

![FlexSight Sequence Diagram](./assets/flexsight-sequence-diagram.jpeg)
    


---

## 11. Technical Stack

| Layer | Technology | Role |
|---|---|---|
| Sensor Layer | Temperature Sensor | Collects temperature readings |
| Node Layer | Custom Monitoring Node | Team-configured node used to read and send temperature data |
| Communication Layer | MQTT/API | Sends readings from node to server |
| Server Layer | Python / Backend Server | Processes readings and checks threshold |
| Database Layer | Database System | Stores temperature readings, alerts, node records, and logs |
| Dashboard Layer | HTML, CSS, JavaScript | Displays live readings, node status, and alerts |
| Design Layer | Figma | Wireframes, UI design, and prototype |
| Version Control | GitHub | Repository hosting and version control |
| Documentation | SharePoint / Google Docs | Team documentation and project files |

---

## 12. Database Design

### 12.1 Tables

| Table | Fields |
|---|---|
| Users | id, name, email, password, role, created_at |
| Nodes | id, node_name, location, status, created_at |
| Readings | id, node_id, temperature, timestamp |
| Alerts | id, node_id, alert_type, severity, message, status, created_at |

### 12.2 Entity Relationship Diagram

mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email
        string password
        string role
        datetime created_at
    }

    NODES {
        int id PK
        string node_name
        string location
        string status
        datetime created_at
    }

    READINGS {
        int id PK
        int node_id FK
        float temperature
        datetime timestamp
    }

    ALERTS {
        int id PK
        int node_id FK
        string alert_type
        string severity
        string message
        string status
        datetime created_at
    }

    NODES ||--o{ READINGS : has
    NODES ||--o{ ALERTS : generates


---

## 13. API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /login | User login and session creation |
| GET | /dashboard | Return live temperature, node status, and alert summary |
| GET | /nodes | Return connected node list and status |
| GET | /readings | Return historical temperature readings |
| GET | /alerts | Return alert history |
| GET | /reports | Return daily or weekly temperature summary |
| PUT | /settings | Update threshold and alert rules |

---

## 14. UI/UX Design — Figma Web Dashboard

FlexSight is designed as a *web-based monitoring dashboard*, not a mobile application.

The interface focuses on real-time temperature monitoring, dashboard alerts, node status, and simple reporting.

### 14.1 Figma Design Objective

The goal of the Figma design is to translate the FlexSight workflow into a clear user interface:

text
Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert


The UI helps users:

- Monitor live temperature readings
- Identify warning and critical temperature levels
- View connected node status
- Review recent and historical alerts
- Access reports
- Update temperature threshold settings
- Understand system status quickly without technical complexity

### 14.2 Design Platform

| Item | Description |
|---|---|
| Platform | Web Dashboard |
| Device Type | Desktop-first |
| Main Screen Size | 1440 × 1024 |
| Design Tool | Figma |
| Style | Dark Monitoring Dashboard |
| Current MVP Scope | Temperature Monitoring Only |
| Out of Scope | Gas, smoke, flame, AI camera, and mobile app |

### 14.3 Figma File Structure

text
FlexSight Figma File
│
├── 01 Cover
│   └── Project title, tagline, short description, and dashboard preview
│
├── 02 Project Overview
│   └── Problem, solution, target users, sectors, and project value
│
├── 03 System Architecture
│   └── Visual workflow: Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert
│
├── 04 User Flow
│   └── Login → Dashboard → Alerts / Nodes / Reports / Settings
│
├── 05 Wireframes
│   └── Low-fidelity layouts for all main web pages
│
├── 06 Design System
│   └── Colors, typography, spacing, buttons, cards, badges, inputs, and tables
│
├── 07 Final UI Screens
│   └── High-fidelity web dashboard screens
│
├── 08 Prototype
│   └── Clickable navigation between all pages
│
└── 09 Exported Screens
    └── PNG images used in README and presentation


### 14.4 Design Pages

| Page | Purpose |
|---|---|
| Cover Page | Presents the project identity and dashboard preview |
| Login Page | Allows authorized users to access the system |
| Dashboard Page | Displays live temperature, risk level, node status, chart, and recent alerts |
| Alerts Page | Shows alert history, severity, status, and alert details |
| Nodes Page | Lists connected monitoring nodes and their current status |
| Reports Page | Displays daily/weekly temperature summaries and monitoring statistics |
| Settings Page | Allows users to update temperature threshold and alert rules |

### 14.5 Cover Page Design

text
FlexSight
Temperature Monitoring & Alert System

Real-time temperature monitoring dashboard for safer operational environments.


### 14.6 Login Page Design

text
┌──────────────────────────────────────────────────────────────┐
│ Left Branding Section       │ Login Card                     │
│                             │                                │
│ FlexSight                   │ Welcome Back                   │
│ Temperature Monitoring      │ Email                          │
│ & Alert System              │ Password                       │
│                             │ Login Button                   │
│ Real-time monitoring        │ Forgot Password                │
│ for operational safety      │                                │
└──────────────────────────────────────────────────────────────┘


### 14.7 Dashboard Page Design

text
┌────────────────────────────────────────────────────────────────────────────┐
│ Sidebar        │ Top Bar: Dashboard / Location / Admin / Last Updated      │
│                ├────────────────────────────────────────────────────────────┤
│ FlexSight      │ [Temperature] [Risk Level] [Node Status] [Alerts]         │
│ Smart Monitor  │                                                            │
│                │ ┌──────────────────────────────┐ ┌──────────────────────┐ │
│ Dashboard      │ │ Temperature Trend Chart      │ │ Recent Alerts        │ │
│ Alerts         │ │                              │ │ Warning / Critical   │ │
│ Nodes          │ │                              │ │ Normal Updates       │ │
│ Reports        │ └──────────────────────────────┘ └──────────────────────┘ │
│ Settings       │                                                            │
│                │ ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐ │
│                │ │ Overview     │ │ Node Info    │ │ Quick Actions      │ │
│                │ └──────────────┘ └──────────────┘ └────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘


### 14.8 Dashboard Metric Cards

| Card | Example Value | Description |
|---|---|---|
| Temperature | 42.3C | Current temperature reading |
| Risk Level | Warning | Current system risk level |
| Node Status | Online | Node connection status |
| Active Alerts | 2 | Number of active alerts |

### 14.9 Alerts Page Design

| Column | Description |
|---|---|
| Time | When the alert occurred |
| Node | Node that generated the alert |
| Location | Node location |
| Temperature | Recorded temperature |
| Severity | Normal, Warning, or Critical |
| Message | Alert description |
| Status | Open or Resolved |
| Action | View details |

Example row:

text
10:45 AM | Node-01 | Server Room | 50.2C | Critical | Temperature threshold reached | Open | View


### 14.10 Nodes Page Design

text
Node-01
Location: Server Room
Status: Online
Last Reading: 42.3C
Last Update: 10:45 AM


### 14.11 Reports Page Design

Reports content:

- Average temperature
- Highest temperature
- Total alerts
- Node uptime
- Temperature trend chart
- Daily or weekly summary table

### 14.12 Settings Page Design

text
Warning Threshold: 45C
Critical Threshold: 50C
Alert Type: Dashboard Alert
Node Location: Server Room

### 14.13 Wireframes

Wireframe pages:

- Login Wireframe
- Dashboard Wireframe
- Alerts Wireframe
- Nodes Wireframe
- Reports Wireframe
- Settings Wireframe

### 14.14 Design System

| Usage | Color |
|---|---|
| Main Background | #07111F |
| Sidebar | #050A13 |
| Card Background | #0E1A2B |
| Secondary Card | #102238 |
| Border | #1E2D44 |
| Primary Cyan | #16B8D4 |
| Cyan Highlight | #38D9E8 |
| Normal Green | #22C55E |
| Warning Yellow | #FACC15 |
| Critical Red | #EF4444 |
| Main Text | #F8FAFC |
| Muted Text | #94A3B8 |
| Disabled Text | #64748B |

### 14.15 Typography

| Text Type | Font | Weight | Usage |
|---|---|---|---|
| Main Heading | Inter | Bold | Page titles |
| Section Heading | Inter | SemiBold | Card titles and sections |
| Body Text | Inter | Regular | General text |
| Labels | Inter | Medium | Form labels and table headers |
| Numbers | Inter | Bold | Temperature and metric values |

### 14.16 Spacing & Layout Rules

| Item | Value |
|---|---|
| Frame Size | 1440 × 1024 |
| Sidebar Width | 260px |
| Top Bar Height | 80px |
| Card Radius | 16px |
| Card Padding | 24px |
| Section Gap | 24px |
| Grid Gap | 20px |
| Button Height | 48px |
| Input Height | 48px |

### 14.17 Reusable Components

| Component | Description |
|---|---|
| Primary Button | Used for main actions such as Login and Save |
| Secondary Button | Less important actions |
| Input Field | Used in login and settings forms |
| Sidebar Item | Navigation item with active and inactive states |
| Metric Card | Displays live temperature and system status |
| Alert Badge | Shows Normal, Warning, or Critical severity |
| Status Badge | Shows Online, Offline, or Maintenance |
| Node Card | Displays node details and last reading |
| Chart Card | Contains temperature trend chart |
| Table Row | Used in alerts, nodes, and reports pages |
| Quick Action Link | Shortcut to important pages |

### 14.18 Component States

| Component | States |
|---|---|
| Sidebar Item | Default, Hover, Active |
| Button | Default, Hover, Disabled, Loading |
| Alert Badge | Normal, Warning, Critical |
| Status Badge | Online, Offline, Maintenance |
| Input Field | Empty, Focused, Filled, Error |

### 14.19 Prototype Flow

text
Login
  ↓
Dashboard
  ├── Alerts
  ├── Nodes
  ├── Reports
  └── Settings


Interaction flow:

text
Login Button → Dashboard
Sidebar Dashboard → Dashboard Page
Sidebar Alerts → Alerts Page
Sidebar Nodes → Nodes Page
Sidebar Reports → Reports Page
Sidebar Settings → Settings Page
Recent Alert → Alerts Page
Node Status Card → Nodes Page
View Reports → Reports Page
Threshold Settings → Settings Page
Save Settings → Dashboard


### 14.20 Figma Exported Screens

text
assets/
│
├── figma-cover.png
├── figma-login-page.png
├── figma-dashboard-page.png
├── figma-alerts-page.png
├── figma-nodes-page.png
├── figma-reports-page.png
├── figma-settings-page.png
└── figma-prototype-flow.png


### 14.21 Figma Preview in README

md
### Figma Dashboard Preview

![FlexSight Dashboard Preview](./assets/figma-dashboard-page.png)

### Figma Prototype Flow

![FlexSight Prototype Flow](./assets/figma-prototype-flow.png)


### 14.22 UI Scope Note

The current UI design supports the temperature monitoring MVP only.

Gas detection, smoke detection, flame detection, AI camera detection, and mobile app screens are intentionally not included in the current Figma scope.

They may be added later as future enhancements after the temperature monitoring dashboard is completed.

---

## 15. User Flow

text
Login
  ↓
Dashboard
  ├── Alerts
  ├── Nodes
  ├── Reports
  └── Settings


---

## 16. Repository Structure

text
FlexSight/
│
├── README.md
│
├── docs/
│   ├── stage-1.md
│   ├── architecture.md
│   ├── database-design.md
│   ├── api-endpoints.md
│   └── figma-design.md
│
├── hardware/
│   ├── sensor_setup.md
│   └── node_notes.md
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── api_routes.py
│   │   ├── alert_engine.py
│   │   ├── models.py
│   │   └── db_handler.py
│   ├── requirements.txt
│   └── README.md
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── alerts.html
│   ├── nodes.html
│   ├── reports.html
│   ├── settings.html
│   ├── css/
│   │   └── dashboard.css
│   └── js/
│       ├── api.js
│       ├── dashboard.js
│       ├── alerts.js
│       ├── nodes.js
│       └── reports.js
│
└── assets/
    ├── figma-cover.png
    ├── figma-dashboard-page.png
    ├── figma-prototype-flow.png
    ├── architecture-diagram.png
    └── logo.png


---

## 17. Roadmap

| Step | Action |
|---|---|
| Step 1 | Approve project idea and team roles |
| Step 2 | Prepare Stage 1 documentation |
| Step 3 | Define project scope and out-of-scope features |
| Step 4 | Design system architecture |
| Step 5 | Prepare Figma wireframes and final UI screens |
| Step 6 | Build database schema |
| Step 7 | Build backend server and API endpoints |
| Step 8 | Build temperature threshold alert logic |
| Step 9 | Build frontend dashboard pages |
| Step 10 | Connect frontend with backend API |
| Step 11 | Test temperature readings and dashboard alerts |
| Step 12 | Prepare final demo and project documentation |

---

## 18. Risks & Constraints

| Risk / Constraint | Description | Mitigation |
|---|---|---|
| Internet Connectivity | System depends on stable connection for data transmission | Test connection and handle failed requests |
| Sensor Calibration | Temperature accuracy depends on correct calibration | Calibrate sensor before testing |
| Hardware Quality | Low-quality components may affect readings | Use approved and tested components |
| Fixed Threshold | 50C may not fit every environment | Allow threshold update in settings |
| Power Supply | Node requires continuous power | Use stable power source |
| Timeline | Advanced features may exceed project time | Keep MVP focused on temperature monitoring |

---

## 19. Future Enhancements

| Future Feature | Description |
|---|---|
| Gas Detection | Add gas-level monitoring |
| Smoke Detection | Add smoke monitoring |
| Flame Detection | Add flame sensor support |
| AI Camera Detection | Use camera and AI to detect visual safety risks |
| Mobile Application | Provide mobile access and notifications |
| SMS / Email Alerts | Send alerts outside the dashboard |
| Multi-location Monitoring | Monitor multiple branches or facilities |
| Advanced Analytics | Add charts, trends, and risk insights |
| AI Risk Analysis | Predict abnormal temperature patterns |
| PDF Reports | Export reports from the dashboard |

---

## 20. Project Summary

FlexSight is a web-based temperature monitoring and alert system designed to improve early safety response in operational environments.

The project focuses on a clear and achievable MVP:

text
Temperature Sensor → Custom Monitoring Node → MQTT/API → Server → Dashboard Alert


The system monitors temperature readings, processes them on the server, checks against an alert threshold, and displays live readings and alerts on a dashboard.

Gas detection, smoke detection, flame detection, and AI camera features are intentionally kept out of scope for the current MVP and may be added as future enhancements.
