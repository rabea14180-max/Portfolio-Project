# 🌡️ FlexSight – Temperature Monitoring & Alert System

## 📋 Stage 2 – Project Charter Development

---

## 📑 Table of Contents

1. Overview
2. Project Information
3. Project Objectives
4. Stakeholders & Team Roles
5. Scope
6. Risks & Mitigation Strategies
7. High-Level Project Plan
8. Timeline
9. Key Milestones
10. Collaboration & Decision-Making
11. Stage Deliverables
12. Repository Structure
13. Project Status
14. Next Stage

---

## 🎯 Overview

| Item | Description |
|--------|--------|
| Project | FlexSight – Temperature Monitoring & Alert System |
| Stage | Stage 2 – Project Charter Development |
| Purpose | Develop a clear project charter that defines objectives, roles, scope, risks, and the high-level project plan |
| System Type | IoT-based temperature monitoring and alert system |
| Main Goal | Improve operational safety by detecting abnormal temperature levels and generating automatic alerts |
| Data Flow | Embedded monitoring devices collect temperature readings, send data through MQTT/API, process it on a centralized server, and display it on a monitoring dashboard |
| Alert Function | When abnormal temperature levels are detected, the system automatically generates alerts so responsible personnel can respond before critical incidents occur |

---

## 📌 Project Information

| Item | Details |
|------|----------|
| Project Name | FlexSight – Temperature Monitoring & Alert System |
| Project Type | Embedded IoT / Safety Monitoring MVP |
| Stage | Stage 2 – Project Charter |
| Date | May 2026 |
| Team Members | Rabea Younis Thabit, Hanin Taqi Al Sayed Hassan, Munirah Enad Alotaibi, Hamsa Bnian Alammar |

---

## 🎯 Project Objectives

The purpose of this stage is to establish a solid foundation for the project by defining its objectives, stakeholders, scope, risks, and development roadmap.

### 1.1 Purpose

| Area | Description |
|--------|--------|
| Problem | Many facilities, including server rooms, warehouses, factories, and industrial environments, lack continuous and automated temperature monitoring |
| Current Challenge | Traditional manual inspection is slow, inconsistent, and unable to trigger instant alerts |
| FlexSight Solution | FlexSight provides a lightweight real-time monitoring solution that detects abnormal heat levels early |
| Main Pipeline | MQTT/API → Server → Dashboard Alert |
| Expected Result | Responsible personnel are notified before equipment damage, operational downtime, or safety incidents occur |

### 1.2 SMART Objectives

| # | SMART Attribute | Objective |
|---|----------------|------------|
| 1 | Specific, Measurable, Time-bound | Build and demonstrate a working temperature monitoring prototype that transmits sensor readings via MQTT/API to a server and triggers an automatic dashboard alert when temperature reaches 50°C by the end of the project timeline |
| 2 | Relevant, Achievable | Implement a centralized server that receives, processes, and logs incoming temperature data, enabling at least one connected device to be monitored with full alert logic functioning correctly |
| 3 | Specific, Achievable, Scalable | Design the MVP architecture to be modular and expandable so that additional sensors, locations, and future AI features can be integrated without rebuilding the core system |

---

## 👥 Stakeholders & Team Roles

This section identifies the individuals and groups involved in the project and defines their responsibilities and interests.

### 2.1 Internal Stakeholders – Team Roles

| Name | Role | Responsibilities |
|---------|---------|---------|
| Hamsa Bnian Alammar | Team Leader & Frontend Developer | Leads team coordination, follows up on tasks, supports project planning, and develops frontend dashboard pages using HTML, CSS, and JavaScript |
| Hanin Taqi Al Sayed Hassan | Programming & Backend Developer | Handles programming tasks, backend logic, ESP32 monitoring node setup, temperature sensor integration, MQTT/API communication, and alert processing |
| Rabea Younis Thabit | Backend Developer | Builds and supports the backend structure, server-side processing, API handling, database connection, and temperature threshold checking |
| Munirah Enad Alotaibi | UI/UX Designer & Frontend Developer | Designs Figma wireframes, dashboard layout, visual identity, reusable components, and supports frontend implementation based on the final UI design |

### 2.2 External Stakeholders

| Stakeholder | Interest / Role in Project |
|------------|------------|
| Instructors / Tutors | Evaluate project progress, provide feedback, and assess deliverables at each stage |
| End Users – Facility Operators | Operations managers and safety teams in warehouses, server rooms, factories, and industrial facilities who monitor the dashboard and respond to alerts |
| Organisation Owners | Decision-makers in target sectors responsible for operational safety and primary beneficiaries of faster response and reduced equipment damage risk |

---

## 📦 Project Scope

The project scope defines what will be included in the MVP release and what will be excluded to maintain focus and feasibility.

### 3.1 In-Scope

| # | Included Feature | Description |
|---|------------------|-------------|
| 1 | Temperature Sensor Integration | Integrate a temperature sensor with an embedded device |
| 2 | MQTT/API Communication | Use MQTT/API communication for real-time data transmission |
| 3 | Server-Side Processing | Receive, store, and evaluate temperature readings on the server |
| 4 | Threshold Logic | Trigger an automatic alert when the temperature reaches approximately 50°C |
| 5 | Monitoring Dashboard | Display live temperature readings, device status, and instant alerts |
| 6 | Database Storage | Store temperature history, alert logs, and device records |
| 7 | User Roles | Support Owner, Organisation Owner, Admin / Manager, and Inspector roles |
| 8 | Target Environments | Support warehouses, server rooms, data centres, and industrial facilities |

### 3.2 User Roles

| Role | Description |
|------|-------------|
| Owner | Full access to the system and overall monitoring management |
| Organisation Owner | Manages organisation-level monitoring and related users |
| Admin / Manager | Monitors readings, alerts, and device status |
| Inspector | Reviews readings and responds to alerts or assigned monitoring tasks |

### 3.3 Target Environments

| Environment | Use Case |
|------------|----------|
| Warehouses | Monitor storage temperature and reduce risk of product or equipment damage |
| Server Rooms | Detect temperature increases that may affect servers and network equipment |
| Data Centres | Support continuous environmental monitoring |
| Industrial Facilities | Improve operational safety and early response to abnormal heat levels |

### 3.4 Out-of-Scope – MVP Stage

| # | Excluded Feature | Status |
|---|-----------------|--------|
| 1 | Mobile Push Notification Application | Out of Scope |
| 2 | Smoke Sensor Integration | Out of Scope |
| 3 | Flame Sensor Integration | Out of Scope |
| 4 | Gas Sensor Integration | Out of Scope |
| 5 | Humidity Sensor Integration | Out of Scope |
| 6 | AI-Based Risk Analysis or Predictive Alerts | Out of Scope |
| 7 | Camera Integration for Visual Monitoring | Out of Scope |
| 8 | Multi-location or Multi-branch Deployment | Out of Scope |
| 9 | Advanced Analytics or Business Intelligence Reporting | Out of Scope |
| 10 | Third-party External System Integrations | Out of Scope |

---

## ⚠️ Risks & Mitigation Strategies

Potential risks were identified during the planning phase and corresponding mitigation strategies were prepared to minimize project impact.

| # | Risk | Likelihood | Mitigation Strategy |
|---|------|------------|---------------------|
| 1 | Unstable internet connection disrupting MQTT/API data transmission | Medium | Implement local data buffering on the device so readings are queued and retransmitted once connectivity is restored |
| 2 | Sensor inaccuracy or calibration issues affecting threshold accuracy | Medium | Conduct multiple calibration tests before deployment and compare readings against a reference thermometer |
| 3 | Fixed 50°C threshold may not suit all deployment environments | Medium | Design the threshold as a configurable server-side parameter |
| 4 | Power supply interruption to the embedded device | Low | Recommend UPS or backup power solutions |
| 5 | Team members unfamiliar with MQTT protocol implementation | Low | Allocate early sprint time for MQTT research and testing |
| 6 | Hardware quality variation affecting monitoring reliability | Low | Source components from reliable suppliers and test multiple units |
| 7 | Database failure or data loss | Medium | Implement automatic database backups and recovery procedures |
| 8 | Server downtime preventing alerts | Medium | Maintain backup server configurations |
| 9 | False alerts triggered by temporary sensor fluctuations | Medium | Apply data validation and averaging logic |
| 10 | Team member availability conflicts | Medium | Create a task schedule with clear deadlines |
| 11 | Security vulnerabilities in API or MQTT communication | Low | Use authentication, secure communication protocols, and restricted access permissions |

---

## 🗺️ High-Level Project Plan

The following phases outline the complete project lifecycle from idea generation to final delivery.

| Phase | Name | Key Activities | Milestone |
|--------|--------|--------|--------|
| 1 | Ideation & Planning | Form the team, brainstorm ideas, evaluate options, define the problem statement, and select the best solution | Stage 1 Report Submitted |
| 2 | Project Charter | Define objectives, identify stakeholders, determine scope, assess risks, and create the timeline | Project Charter Submitted |
| 3 | Design & Architecture | Create architecture diagrams, database schema, MQTT/API flow, and wireframes | Design Approved |
| 4 | Development & Integration | Develop sensors, server, dashboard, database, and alert logic | Working Prototype Completed |
| 5 | Testing & Validation | Validate sensor accuracy, perform system testing, verify permissions, and fix bugs | All Tests Passed |
| 6 | Final Delivery & Presentation | Prepare documentation, demo, report, and presentation | Final Submission Completed |

---

## 📅 Timeline

| Week | Activity | Related Phase |
|--------|--------|--------|
| Week 1–2 | Ideation & Planning – Team Formation | Phase 1 |
| Week 3–4 | Project Charter Development | Phase 2 |
| Week 5–6 | Technical Documentation & System Design | Phase 3 |
| Week 7–10 | MVP Development & Integration | Phase 4 |
| Week 11 | Testing & Validation | Phase 5 |
| Week 12 | Final Presentation & Project Closure | Phase 6 |

---

## 🏆 Key Milestones

| Milestone | Description |
|------------|------------|
| Stage 1 Report Submitted | Team formation, idea development, and project selection completed |
| Project Charter Submitted | Objectives, scope, stakeholders, risks, and planning completed |
| Design Approved | Architecture, database, MQTT/API flow, and wireframes approved |
| Working Prototype Completed | Core system integrated into a functional prototype |
| All Tests Passed | Calibration, testing, and bug fixing completed |
| Final Submission Completed | Final report, demo, presentation, and submission completed |

---

## 🤝 Collaboration & Decision-Making

| Area | Details |
|--------|--------|
| Daily Updates | WhatsApp |
| Technical Discussions | Discord |
| Remote Meetings | Google Meet |
| Brainstorming | In-person Sessions |
| Documentation | Google Docs & Canva |
| Version Control | GitHub |
| Decision-Making Method | Group Discussion |
| If No Consensus | Team Voting |
| Voting Criteria | Feasibility, Clarity, and Alignment with Project Goals |

---

## 📂 Repository Structure

```text
Stage 2/
├── README.md
└── FlexSight_ProjectCharter_Stage2_Updated.md
```

---

## ✅ Project Status

| Status | Item |
|--------|--------|
| ✅ Completed | Project Charter |
| ✅ Completed | Scope Defined |
| ✅ Completed | Stakeholders Identified |
| ✅ Completed | Risks Assessed |
| ✅ Completed | High-Level Plan Created |
| ✅ Completed | Ready for Stage 3 |

---

## 🚀 Next Stage

### Stage 3 – Technical Documentation & System Design

Upcoming activities include:

- System Architecture Design
- Database Design
- MQTT Communication Flow
- API Planning
- User Flow Design
- Dashboard Structure
- Technical Specifications

This stage will provide the technical foundation required for MVP implementation and integration.

📄 View Complete Project Charter

[FlexSight_ProjectCharter_Stage2_Updated.md](./FlexSight_ProjectCharter_Stage2_Updated.md)
