# FLEX SIGHT
## Temperature Monitoring & Alert System

**PROJECT CHARTER**  
**Stage 2 Report | May 2026**

| Item | Details |
|------|---------|
| Project Name | Flex Sight — Temperature Monitoring & Alert System |
| Project Type | Embedded IoT / Safety Monitoring MVP |
| Stage | Stage 2 — Project Charter |
| Date | May 2026 |
| Team | Rabea Younis Thabit, Hanin Taqi Al Sayed Hassan, Munirah Enad Alotaibi, Hamsa Bnian Alammar |

---

# 1. Project Objectives

## 1.1 Purpose

Flex Sight exists to address a widespread but under-served operational safety challenge: many facilities — including server rooms, warehouses, factories, and industrial environments — lack continuous, automated temperature monitoring.

Traditional manual inspection is slow, inconsistent, and incapable of triggering instant alerts. Flex Sight provides a lightweight, real-time solution by following a clear pipeline:

`MQTT/API → Server → Dashboard Alert`

The system detects abnormal heat levels early and notifies responsible personnel before damage or danger occurs.

## 1.2 SMART Objectives

| # | SMART Attribute | Objective |
|---|----------------|-----------|
| 1 | Specific, Measurable, Time-bound | Build and demonstrate a working temperature monitoring prototype that transmits sensor readings via MQTT/API to a server and triggers an automatic dashboard alert when temperature reaches 50°C by the end of the project timeline. |
| 2 | Relevant, Achievable | Implement a centralised server that receives, processes, and logs all incoming temperature data, enabling at least one connected device to be monitored with full alert logic functioning correctly. |
| 3 | Specific, Achievable, Scalable | Design the MVP architecture to be modular and expandable so additional sensors, locations, and future AI features can be integrated without rebuilding the core system. |

---

# 2. Stakeholders & Team Roles

## 2.1 Internal Stakeholders — Team Roles

| Name | Role | Responsibilities |
|------|------|------------------|
| Hamsa Bnian Alammar | Team Leader & Frontend Developer | Leads team coordination, follows up on tasks, supports project planning, and develops frontend dashboard pages using HTML, CSS, and JavaScript. |
| Hanin Taqi Al Sayed Hassan | Programming & Backend Developer | Handles programming tasks, backend logic, ESP32 monitoring node setup, temperature sensor integration, MQTT/API communication, and alert processing. |
| Rabea Younis Thabit | Backend Developer | Builds and supports the backend structure, server-side processing, API handling, database connection, and temperature threshold checking. |
| Munirah Enad Alotaibi | UI/UX Designer & Frontend Developer | Designs Figma wireframes, dashboard layout, visual identity, reusable components, and supports frontend implementation based on the final UI design. |

## 2.2 External Stakeholders

| Stakeholder | Interest / Role in Project |
|------------|----------------------------|
| Instructors / Tutors | Evaluate project progress, provide feedback, and assess deliverables at each stage. |
| End Users (Facility Operators) | Operations managers and safety teams in warehouses, server rooms, factories, and industrial facilities who monitor the dashboard and respond to alerts. |
| Organisation Owners | Decision-makers responsible for operational safety and reduced equipment damage risk. |

---

# 3. Scope

## 3.1 In-Scope

- Temperature sensor integration with an embedded device
- MQTT/API communication layer for real-time data transmission
- Server-side processing for receiving, storing, and evaluating temperature readings
- Automatic alert logic triggered at approximately 50°C
- Dashboard displaying live temperature readings, device status, and alerts
- Database storage for temperature history, alert logs, and device records
- Four user roles: Owner, Organisation Owner, Admin/Manager, Inspector
- Target environments: warehouses, server rooms, data centres, industrial facilities

## 3.2 Out-of-Scope (MVP Stage)

- Mobile push notification application
- Smoke, flame, gas, or humidity sensor integration
- AI-based risk analysis or predictive alerts
- Camera integration for visual monitoring
- Multi-location or multi-branch deployment
- Advanced analytics or business intelligence reporting
- Third-party external system integrations

---

# 4. Risks & Mitigation Strategies

| Risk | Likelihood | Mitigation Strategy |
|------|------------|--------------------|
| Unstable internet connection disrupting MQTT/API transmission | Medium | Implement local buffering and retransmission after connectivity restoration. |
| Sensor inaccuracy or calibration issues | Medium | Conduct calibration tests and compare readings with a reference thermometer. |
| Fixed 50°C threshold may not suit all environments | Medium | Make the threshold configurable on the server side. |
| Power supply interruption to the embedded device | Low | Document power requirements and recommend UPS solutions. |
| Team unfamiliarity with MQTT implementation | Low | Allocate research time and use well-documented MQTT libraries. |
| Hardware quality variation | Low | Source reliable components and test multiple sensor units. |
| Database failure or data loss | Medium | Implement automatic backups and recovery procedures. |
| Server downtime preventing alerts | Medium | Deploy monitoring tools and maintain backup server configurations. |
| False alerts from temporary fluctuations | Medium | Apply validation and averaging logic before triggering alerts. |
| Team availability conflicts | Medium | Create a clear schedule and maintain shared documentation. |
| Security vulnerabilities in API or MQTT communication | Low | Use authentication, secure communication protocols, and restricted access permissions. |




# FLEX SIGHT
## Temperature Monitoring & Alert System

**PROJECT CHARTER**  
**Stage 2 Report | May 2026**

| Item | Details |
|------|---------|
| Project Name | Flex Sight — Temperature Monitoring & Alert System |
| Project Type | Embedded IoT / Safety Monitoring MVP |
| Stage | Stage 2 — Project Charter |
| Date | May 2026 |
| Team | Rabea Younis Thabit, Hanin Taqi Al Sayed Hassan, Munirah Enad Alotaibi, Alammar Bnian Hamsa |

---

# 1. Project Objectives

## 1.1 Purpose

Flex Sight exists to address a widespread but under-served operational safety challenge: many facilities — including server rooms, warehouses, factories, and industrial environments — lack continuous, automated temperature monitoring.

Traditional manual inspection is slow, inconsistent, and incapable of triggering instant alerts. Flex Sight provides a lightweight, real-time solution by following a clear pipeline:

`MQTT/API → Server → Dashboard Alert`

The system detects abnormal heat levels early and notifies responsible personnel before damage or danger occurs.

## 1.2 SMART Objectives

| # | SMART Attribute | Objective |
|---|----------------|-----------|
| 1 | Specific, Measurable, Time-bound | Build and demonstrate a working temperature monitoring prototype that transmits sensor readings via MQTT/API to a server and triggers an automatic dashboard alert when temperature reaches 50°C by the end of the project timeline. |
| 2 | Relevant, Achievable | Implement a centralised server that receives, processes, and logs all incoming temperature data, enabling at least one connected device to be monitored with full alert logic functioning correctly. |
| 3 | Specific, Achievable, Scalable | Design the MVP architecture to be modular and expandable so additional sensors, locations, and future AI features can be integrated without rebuilding the core system. |

---

# 2. Stakeholders & Team Roles

## 2.1 Internal Stakeholders — Team Roles

| Name | Role | Responsibilities |
|------|------|------------------|
| Hamsa Bnian Alammar | Team Leader & Frontend Developer | Leads team coordination, follows up on tasks, supports project planning, and develops frontend dashboard pages using HTML, CSS, and JavaScript. |
| Hanin Taqi Al Sayed Hassan | Programming & Backend Developer | Handles programming tasks, backend logic, ESP32 monitoring node setup, temperature sensor integration, MQTT/API communication, and alert processing. |
| Rabea Younis Thabit | Backend Developer | Builds and supports the backend structure, server-side processing, API handling, database connection, and temperature threshold checking. |
| Munirah Enad Alotaibi | UI/UX Designer & Frontend Developer | Designs Figma wireframes, dashboard layout, visual identity, reusable components, and supports frontend implementation based on the final UI design. |

## 2.2 External Stakeholders

| Stakeholder | Interest / Role in Project |
|------------|----------------------------|
| Instructors / Tutors | Evaluate project progress, provide feedback, and assess deliverables at each stage. |
| End Users (Facility Operators) | Operations managers and safety teams in warehouses, server rooms, factories, and industrial facilities who monitor the dashboard and respond to alerts. |
| Organisation Owners | Decision-makers responsible for operational safety and reduced equipment damage risk. |

---

# 3. Scope

## 3.1 In-Scope

- Temperature sensor integration with an embedded device
- MQTT/API communication layer for real-time data transmission
- Server-side processing for receiving, storing, and evaluating temperature readings
- Automatic alert logic triggered at approximately 50°C
- Dashboard displaying live temperature readings, device status, and alerts
- Database storage for temperature history, alert logs, and device records
- Four user roles: Owner, Organisation Owner, Admin/Manager, Inspector
- Target environments: warehouses, server rooms, data centres, industrial facilities

## 3.2 Out-of-Scope (MVP Stage)

- Mobile push notification application
- Smoke, flame, gas, or humidity sensor integration
- AI-based risk analysis or predictive alerts
- Camera integration for visual monitoring
- Multi-location or multi-branch deployment
- Advanced analytics or business intelligence reporting
- Third-party external system integrations

---

# 4. Risks & Mitigation Strategies

| Risk | Likelihood | Mitigation Strategy |
|------|------------|--------------------|
| Unstable internet connection disrupting MQTT/API transmission | Medium | Implement local buffering and retransmission after connectivity restoration. |
| Sensor inaccuracy or calibration issues | Medium | Conduct calibration tests and compare readings with a reference thermometer. |
| Fixed 50°C threshold may not suit all environments | Medium | Make the threshold configurable on the server side. |
| Power supply interruption to the embedded device | Low | Document power requirements and recommend UPS solutions. |
| Team unfamiliarity with MQTT implementation | Low | Allocate research time and use well-documented MQTT libraries. |
| Hardware quality variation | Low | Source reliable components and test multiple sensor units. |
| Database failure or data loss | Medium | Implement automatic backups and recovery procedures. |
| Server downtime preventing alerts | Medium | Deploy monitoring tools and maintain backup server configurations. |
| False alerts from temporary fluctuations | Medium | Apply validation and averaging logic before triggering alerts. |
| Team availability conflicts | Medium | Create a clear schedule and maintain shared documentation. |
| Security vulnerabilities in API or MQTT communication | Low | Use authentication, secure communication protocols, and restricted access permissions. |

