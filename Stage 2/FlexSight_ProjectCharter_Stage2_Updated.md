## Temperature Monitoring & Alert System

| Item | Details |
|---|---|
| Project Name | FlexSight — Temperature Monitoring & Alert System |
| Project Type | Embedded IoT / Web Dashboard MVP |
| Stage | Stage 2 — Project Charter |
| Date | May 2026 |
| Team | Rabea Younis Thabit, Hanin Taqi Al Sayed Hassan, Munirah Enad Alotaibi, Hamsa Bnian Alammar |

---

# 1. Project Objectives

## 1.1 Purpose

FlexSight exists to address an operational monitoring challenge: abnormal temperature levels may not be detected early when monitoring depends on manual checking or delayed reporting.

Manual monitoring can cause several issues:

- Temperature changes may be noticed late.
- Critical heat levels may not trig…
## Temperature Monitoring & Alert System

*PROJECT CHARTER*  
*Stage 2 Report | May 2026*

| Item | Details |
|---|---|
| Project Name | FlexSight — Temperature Monitoring & Alert System |
| Project Type | Embedded IoT / Web Dashboard MVP |
| Stage | Stage 2 — Project Charter |
| Date | May 2026 |
| Team | Rabea Younis Thabit, Hanin Taqi Al Sayed Hassan, Munirah Enad Alotaibi, Hamsa Bnian Alammar |

---

# 1. Project Objectives

## 1.1 Purpose

FlexSight exists to address an operational monitoring challenge: abnormal temperature levels may not be detected early when monitoring depends on manual checking or delayed reporting.

Manual monitoring can cause several issues:

- Temperature changes may be noticed late.
- Critical heat levels may not trigger a fast response.
- Monitoring data may not be stored in one place.
- Responsible users may not receive clear alert information.
- Dashboard access may be difficult to manage without authentication.

FlexSight provides a lightweight temperature monitoring MVP using an ESP32 monitoring device, MQTT/API communication, backend processing, database storage, a web dashboard, dashboard alerts, email notifications, and basic user authentication.

The project follows this main workflow:

```text
User Authentication → Web Dashboard
Temperature Sensor → ESP32 Monitoring Device → MQTT/API → Server → Database → Web Dashboard → Dashboard Alert 
```


The system collects hourly temperature readings, processes them on the server, stores them in the database, and displays readings, device status, and alerts on the web dashboard.


---

## 1.2 SMART Objectives

| # | SMART Attribute | Objective |
|---|---|---|
| 1 | Specific, Measurable, Time-bound | Build and demonstrate a working temperature monitoring MVP that collects hourly readings from an ESP32 monitoring device and sends the readings to the backend through MQTT/API by the end of the project timeline. |
| 2 | Specific, Achievable | Implement backend processing that receives, validates, stores, and evaluates temperature readings using warning and critical thresholds. |
| 3 | Measurable, Relevant | Trigger dashboard alerts when abnormal temperature levels are detected, including warning readings from 45°C to 49°C and critical readings at 50°C or above. |
| 4 | Achievable, Relevant | Store users, devices, readings, alerts, threshold settings,  a database to support dashboard monitoring and testing. |
| 5 | Specific, Achievable | Implement a basic authentication flow that allows users to sign up, log in, access the dashboard, and log out. |
| 6 | Scalable | Design the MVP architecture to be modular so additional ESP32 devices and future improvements can be added later without rebuilding the core system. |

---

# 2. Stakeholders & Team Roles

## 2.1 Internal Stakeholders — Team Roles

| Name | Role | Responsibilities |
|---|---|---|
| Hamsa Bnian Alammar | Team Leader & Frontend Developer | Leads team coordination, follows up on tasks, supports project planning, and develops frontend dashboard and authentication pages using HTML, CSS, and JavaScript. |
| Hanin Taqi Al Sayed Hassan | Programming & Backend Developer | Handles programming tasks, backend logic, API development, ESP32 data integration support, MQTT/API communication, and alert processing. |
| Rabea Younis Thabit | Backend Developer | Builds and supports the backend structure, database implementation, server-side processing, API handling, database connection, and temperature threshold checking. |
| Munirah Enad Alotaibi | UI/UX Designer & Frontend Developer | Designs Figma wireframes, authentication screens, dashboard layout, visual identity, reusable components, and supports frontend implementation based on the final UI design. |

---

## 2.2 External Stakeholders

| Stakeholder | Interest / Role in Project |
|---|---|
| Instructors / Tutors | Evaluate project progress, provide feedback, and assess deliverables at each stage. |
| System Users | Use the web dashboard to monitor temperature readings, device status, alerts, and follow-up actions. |
| Owner | Has full access to users, devices, readings, alerts, threshold settings, authentication, and system settings. |
| Admin | Monitors temperature readings, device status, alerts, dashboard activity, and authenticated system access. |
| Inspector | Follows up on assigned alerts, reviews affected devices, adds notes, and updates incident status. |

---

# 3. Scope

## 3.1 In-Scope

| # | Feature | Description |
|---|---|---|
| 1 | Temperature Monitoring | Collect hourly temperature readings from ESP32 monitoring devices. |
| 2 | ESP32 Monitoring Device | Use an ESP32-based device to collect and send temperature data. |
| 3 | MQTT/API Communication | Send temperature readings from the ESP32 device to the backend. |
| 4 | Server Processing | Receive, validate, process, and store temperature data. |
| 5 | Threshold Checking | Classify readings as normal, warning, or critical based on configured thresholds. |
| 6 | Web Dashboard | Display temperature readings, device status, and alert information. |
| 7 | Dashboard Alerts | Show warning and critical alerts when abnormal temperatures are detected. |
| 8 | Historical Readings | Store and display previous hourly temperature readings. |
| 9 | User Roles | Support Owner, Admin, and Inspector roles with role-based access. |
| 10| User Authentication | Allow users to sign up, log in, access the dashboard, and log out. |
| 11| Database Storage | Store users, devices, temperature readings, alerts, threshold settings, and notification records. |

---

## 3.2 Out-of-Scope — MVP Stage

| # | Feature | Status |
|---|---|---|
| 1 | Mobile Application | Out of Scope |
| 2 | Mobile Push Notifications | Out of Scope |
| 3 | SMS Notifications | Out of Scope |
| 4 | Gas Monitoring | Out of Scope |
| 5 | Smoke Monitoring | Out of Scope |
| 6 | Flame Monitoring | Out of Scope |
| 7 | Camera Monitoring | Out of Scope |
| 8 | AI-Based Risk Prediction | Out of Scope |
| 9 | Power Monitoring | Out of Scope |
| 10 | HVAC Monitoring | Out of Scope |
| 11 | Energy Monitoring | Out of Scope |
| 12 | Advanced Analytics | Out of Scope |
| 13 | Third-Party System Integrations | Out of Scope |

These features may be considered in future versions after the temperature monitoring MVP and basic authentication flow are completed and tested.

---

# 4. Deliverables

| Deliverable | Description |
|---|---|
| Project Charter | Stage 2 documentation defining objectives, scope, roles, risks, timeline, and deliverables. |
| System Workflow | High-level workflow showing ESP32 device, MQTT/API, backend, database, dashboard, alerts, and email notifications. |
| Authentication Flow | Sign up page, login page, log out action, and related backend API endpoints. |
| Database Design | Initial database structure for users, devices, temperature readings, alerts, thresholds, and notifications. |
| Web Dashboard Design | Dashboard screens for readings, device status, alerts, users, and settings. |
| Backend Plan | Initial plan for backend APIs, server processing, threshold checking, and dashboard data support. |
| Testing Plan | Initial plan for testing database, authentication, API endpoints, dashboard display, alerts |

---

# 5. Risks & Mitigation Strategies

| Risk | Likelihood | Mitigation Strategy |
|---|---|---|
| Unstable internet connection disrupting MQTT/API transmission | Medium | Test connectivity and handle failed transmission attempts during testing. |
| Sensor inaccuracy or calibration issues | Medium | Conduct calibration tests and compare readings with a reference thermometer. |
| Fixed threshold values may need adjustment | Medium | Allow warning and critical thresholds to be configurable in system settings. |
| Power supply interruption to the ESP32 monitoring device | Low | Use a stable power source during testing and document power requirements. |
| Team unfamiliarity with MQTT implementation | Low | Allocate research time and use well-documented MQTT/API examples. |
| Hardware quality variation | Low | Use approved and tested components before integration. |
| Database failure or data loss | Medium | Keep SQL files, sample data, and testing evidence documented in the repository. |
| Server downtime preventing alerts | Medium | Test backend availability and document recovery steps during development. |
| False alerts from temporary fluctuations | Medium | Validate readings before generating alerts. |
| Team availability conflicts | Medium | Create a clear schedule, assign responsibilities, and maintain shared documentation. |
| Security vulnerabilities in API or authentication | Medium | Use authentication, password hashing, restricted access, and role-based permissions. |
| Authentication errors | Medium | Test sign up, login, and log out flows before final integration. |
| Dashboard not displaying API data correctly | Medium | Test frontend API connection and verify dashboard data display using sample records. |

---

# 6. High-Level Timeline

| Phase | Timeframe | Main Activities |
|---|---|---|
| Phase 1 — Planning | Week 1–2 | Define project idea, team roles, problem statement, and scope. |
| Phase 2 — Project Charter | Week 3–4 | Prepare objectives, stakeholders, scope, risks, deliverables, and timeline. |
| Phase 3 — Technical Documentation | Week 5–6 | Prepare user stories, system architecture, database design, API endpoints, Figma screens, SCM strategy, and QA strategy. |
| Phase 4 — MVP Development | Week 7–10 | Build database, backend models, API routes, authentication flow, dashboard pages, alert logic, and dashboard API connection. |
| Phase 5 — Testing & Validation | Week 11 | Test database, authentication, APIs, dashboard display, threshold alerts|
| Phase 6 — Final Delivery | Week 12 | Prepare final documentation, demo, presentation, and repository review. |

---

# 7. Planned Milestones

| Milestone | Description | Expected Output |
|---|---|---|
| Stage 1 Completion | Team formation and idea development are completed. | Stage 1 README |
| Stage 2 Completion | Project charter is prepared and approved. | Stage 2 Project Charter |
| Stage 3 Technical Documentation | Technical documentation will be prepared after the project charter. | Stage 3 Technical Documentation |
| Database Preparation | MySQL database structure will be created and tested during MVP development. | schema.sql, seed.sql, test_queries.sql, and testing evidence |
| Backend Development | Backend structure, models, and API routes will be prepared. | Flask backend files and API endpoints |
| Authentication Flow | Sign up, login, and log out flow will be implemented. | Authentication pages and API endpoints |
| Dashboard Development | Dashboard pages will be created and prepared for API data. | HTML, CSS, and JavaScript dashboard files |
| Integration | Dashboard will be connected with backend APIs. | Working backend-dashboard data flow |
| QA Testing | Database, authentication, APIs, alerts, and dashboard will be tested. | QA evidence and bug tracking |
| Final Demo Preparation | MVP will be prepared for final presentation. | Final report, demo, and project repository |

---

# 8. Success Criteria

The Stage 2 project charter will be considered successful if:

- The project scope is clearly defined.
- The MVP focuses on temperature monitoring and basic authentication.
- The team roles and responsibilities are clear.
- The risks and mitigation strategies are documented.
- The planned workflow is technically feasible.
- The deliverables are aligned with the project timeline.
- The project can move into technical documentation and MVP development.

---

# 9. Project Summary

FlexSight is a web-based temperature monitoring and alert system designed to support early response to abnormal temperature levels.

The MVP focuses on:

text
User Authentication → Web Dashboard
Temperature Sensor → ESP32 Monitoring Device → MQTT/API → Server → Database → Web Dashboard → Dashboard Alert 


The system allows users to sign up, log in, access the dashboard, and log out. It collects hourly temperature readings from ESP32 monitoring devices, sends the readings to the backend through MQTT/API, validates and stores the data, checks warning and critical thresholds, and displays device status, readings, and alerts on the web dashboard.

The MVP is limited to temperature monitoring and basic authentication. Mobile applications, mobile push notifications, SMS notifications, gas monitoring, smoke monitoring, flame monitoring, camera monitoring, AI-based risk prediction, power monitoring, HVAC monitoring, energy monitoring, advanced analytics, and third-party integrations are intentionally out of scope for the current version.
