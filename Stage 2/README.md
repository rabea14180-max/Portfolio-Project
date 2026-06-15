FlexSight – Temperature Monitoring & Alert System

0. Define Project Objectives

Project Purpose

FlexSight is an IoT-based temperature monitoring and alert system developed to improve operational safety in environments where temperature fluctuations can lead to equipment damage, service interruptions, or safety incidents.

The system continuously collects temperature readings from embedded monitoring devices, transmits data through MQTT/API communication, processes incoming data on a centralized server, and displays real-time information through a monitoring dashboard.

When abnormal temperature levels are detected, the system automatically generates alerts, allowing responsible personnel to respond before critical incidents occur.

⸻

Project Objectives

* Develop a functional temperature monitoring prototype using embedded IoT devices.
* Transmit sensor readings through MQTT/API communication.
* Process and store incoming temperature data on a centralized server.
* Display real-time monitoring information through a web dashboard.
* Generate automated alerts when predefined temperature thresholds are exceeded.
* Establish a scalable architecture that supports future expansion.

⸻

1. Identify Stakeholders and Team Roles

Stakeholders

Type	Stakeholder	Role / Interest
Internal	Project Team Members	Responsible for planning, designing, developing, documenting, and testing the project
Internal	Instructors / Evaluators	Review project progress, documentation, technical design, and final MVP delivery
External	Facility Operators	Benefit from monitoring temperature levels in warehouses, server rooms, factories, and data centers
External	Responsible Personnel	Receive alerts and respond to abnormal temperature conditions before incidents occur
External	Technical Staff	Support the monitoring devices, server connection, and dashboard operation
External	Safety / Operations Teams	Use real-time alerts to improve operational safety and reduce response time

⸻

Team Roles

Team Member	Role	Responsibilities
Hamsa Alammar	Team Leader & Frontend Developer	Leads team coordination, follows up on tasks, supports project planning, and develops the frontend dashboard interface
Munirah Alotaibi	UI/UX Designer & Frontend Developer	Designs the user interface, prepares dashboard layout and user experience, and supports frontend implementation
Hanin Hassan	Backend Developer	Works on backend development, server-side logic, MQTT/API communication handling, and data processing support
Rabea Thabit	Backend Developer	Supports backend development, API handling, database connection, threshold checking, and alert processing

⸻

2. Define Scope

Project Scope Overview

FlexSight is an IoT-based temperature monitoring and alert system designed to provide real-time visibility into temperature conditions in operational environments.

The MVP focuses on collecting temperature readings from embedded monitoring devices, transmitting the data through MQTT/API communication, processing and storing the readings on a centralized server, and displaying live monitoring information through a web dashboard.

The system automatically generates alerts when predefined temperature thresholds are exceeded.

⸻

In-Scope: Included in MVP

* Temperature monitoring using embedded IoT devices
* MQTT/API communication for transmitting temperature readings
* Centralized server for receiving and processing incoming data
* Database storage for temperature readings and alert records
* Web dashboard for real-time monitoring
* Automated alerts when temperature thresholds are exceeded
* Dashboard interface for viewing current temperature status
* Basic project documentation using Markdown
* GitHub repository integration for version control and accessibility
* High-level roadmap and project planning documentation

⸻

Out-of-Scope: Excluded from MVP

* Gas detection
* Smoke detection
* Flame detection
* AI camera detection
* Mobile native application for iOS or Android
* SMS notifications
* Advanced AI-based risk prediction
* Multi-location enterprise monitoring
* Live emergency service integration
* Advanced analytics beyond the basic MVP

⸻

3. Identify Risks

Risk Management Overview

The following table outlines potential risks that may arise during the planning, development, and testing of FlexSight, along with mitigation strategies to address each risk proactively.

⸻

Risk Register

#	Risk	Category	Project Phase	Likelihood	Impact	Mitigation Strategy
1	Project timeline delays due to underestimation of technical tasks	Timeline	All Phases	Medium	High	Break work into smaller tasks, assign clear owners, and review progress regularly
2	Embedded monitoring device connection issues	Technical	Development & Testing	Medium	High	Test device communication early and document setup steps clearly
3	MQTT/API communication failure or instability	Technical	Development & Integration	Medium	High	Test MQTT/API communication separately before full system integration
4	Temperature readings are inaccurate or inconsistent	Hardware / Data Quality	Development & Testing	Medium	Medium	Validate readings through repeated testing and adjust calibration if needed
5	Backend and dashboard integration issues	Integration	Development & Testing	Medium	High	Define API requirements clearly and test each endpoint before connecting with the dashboard
6	Scope expansion beyond the agreed MVP	Scope	Planning & Development	Medium	Medium	Keep the MVP limited to temperature monitoring and move advanced features to future expansion
7	Alert logic does not trigger correctly when thresholds are exceeded	Functionality	Testing	Medium	High	Test normal and abnormal temperature scenarios before the final demo
8	Documentation becomes outdated during development	Documentation	All Phases	Low	Medium	Keep documentation updated in GitHub after major changes

⸻

Risk Priority Matrix

Priority	Risks
🔴 High Priority	Risks 1, 2, 3, 5, 7
🟡 Medium Priority	Risks 4, 6, 8
🟢 Low Priority	None identified at this stage

⸻

4. Develop a High-Level Plan

Timeline: 12 Weeks

Stage	Timeline	Phase	Main Activities	Deliverable	Status
Stage 1	Week 1–2	Team Formation & Idea Development	Team formation, brainstorming, idea evaluation, and final MVP selection	Finalized project idea	Completed
Stage 2	Week 3–4	Project Charter Development	Define objectives, stakeholders, scope, risks, roles, and high-level execution plan	Completed Project Charter	Completed
Stage 3	Week 5–6	Technical Documentation & System Design	System architecture design, database design, MQTT communication flow, API planning, user flow design, dashboard structure, and technical specifications	Technical documentation and system design	Upcoming
Stage 4	Week 7–10	MVP Development	Develop embedded monitoring device flow, backend server, database connection, dashboard interface, and alert logic	Functional MVP prototype	Upcoming
Stage 5	Week 11–12	Testing & Project Closure	Test data flow, validate alerts, finalize documentation, prepare presentation, and submit project	Final demo and project submission	Upcoming

⸻

Key Milestones

Milestone	Target
Project idea finalized	End of Week 2
Project Charter completed	End of Week 4
Technical documentation finalized	End of Week 6
System architecture and database design completed	End of Week 6
MQTT/API communication flow prepared	Week 6
Core MVP features working	End of Week 10
Alert logic tested and validated	Week 11
Final presentation and submission	End of Week 12

⸻

High-Level Execution Plan

1. Finalize the project idea and MVP scope
2. Define project objectives and success direction
3. Identify stakeholders and team responsibilities
4. Define project boundaries and limitations
5. Identify project risks and mitigation strategies
6. Prepare system architecture and technical documentation
7. Design database structure and MQTT/API communication flow
8. Plan dashboard structure and user flow
9. Develop the backend, database, and monitoring dashboard
10. Integrate incoming temperature readings with server processing
11. Test threshold checking and automated alert generation
12. Finalize documentation, presentation materials, and MVP demo

⸻

Project Status

✅ Project Charter Completed
✅ Scope Defined
✅ Stakeholders Identified
✅ Risks Assessed
✅ High-Level Plan Created

---

## Project Charter

📄 View Complete Project Charter

[FlexSight_ProjectCharter_Stage2_Updated.md](./FlexSight_ProjectCharter_Stage2_Updated.md)
