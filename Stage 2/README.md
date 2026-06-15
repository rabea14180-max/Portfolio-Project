Stage 2 – Project Charter Development

During Stage 2, the team developed the Project Charter for FlexSight – Temperature Monitoring & Alert System.

FlexSight is an IoT-based temperature monitoring and alert system designed to improve operational safety in environments where temperature fluctuations can lead to equipment damage, operational downtime, or safety incidents.

The system continuously collects temperature readings from embedded monitoring devices, transmits data through MQTT/API communication, processes incoming data on a centralized server, and displays real-time information through a monitoring dashboard.

When abnormal temperature levels are detected, the system automatically generates alerts to support rapid response and reduce operational risks.

⸻

Project Objectives

The main objective of FlexSight is to develop a working IoT-based temperature monitoring system capable of detecting abnormal temperature conditions and generating automatic alerts.

The project objectives include:

* Build a functional MVP using embedded devices
* Provide real-time dashboard monitoring
* Implement MQTT/API data transmission
* Process incoming data on a centralized server
* Store temperature readings and alert history
* Generate automatic alerts when abnormal temperature levels are detected
* Create a scalable architecture for future expansion

⸻

Stakeholders

Type	Stakeholder	Role / Interest
Internal	Project Team Members	Responsible for planning, designing, developing, documenting, and testing the project
Internal	Instructors / Evaluators	Review project progress, documentation, technical design, and final MVP delivery
External	Facility Managers	Monitor temperature levels and respond to alerts
External	Safety Officers	Use alerts to improve operational safety and reduce incident response time
External	Warehouse Operators	Benefit from continuous temperature monitoring in storage environments
External	Server Room Administrators	Monitor server room temperature and reduce equipment damage risks
External	Operations Teams	Use the dashboard to track environmental conditions and alerts
External	Industrial Site Supervisors	Monitor temperature risks in industrial and technical facilities

⸻

Team Roles

Team Member	Role	Responsibilities
Hamsa Alammar	Team Leader & Frontend Developer	Leads team coordination, follows up on tasks, supports project planning, and develops the frontend dashboard interface
Munirah Alotaibi	UI/UX Designer & Frontend Developer	Designs the user interface, prepares dashboard layout and user experience, and supports frontend implementation
Hanin Hassan	Programming & Backend Developer	Handles programming tasks, backend development, MQTT/API communication, and data processing support
Rabea Thabit	Backend Developer	Supports backend development, API handling, database connection, threshold checking, and alert processing

⸻

Project Scope

FlexSight is focused on temperature monitoring only during the MVP phase.

In-Scope

* Real-time temperature monitoring
* Embedded monitoring devices
* MQTT/API data transmission
* Server-side processing and evaluation
* Temperature threshold monitoring
* Automatic alert generation
* Dashboard visualization
* Historical data storage
* Web dashboard interface
* Basic documentation and GitHub repository organization

Out-of-Scope

* Smoke sensors
* Gas detection
* Flame detection
* AI-based risk analysis
* Camera integration
* Multi-location monitoring
* Advanced analytics
* Mobile notifications
* Native mobile application

⸻

Technical Stack

Hardware

* ESP32 Development Board
* Temperature and Humidity Sensor
* Breadboard
* Jumper Wires
* USB Cable
* OLED Display
* Buzzer
* Relay Module
* Motion Sensor
* Light Sensor
* LEDs
* Resistors
* Push Buttons

Software

* Python
* MQTT
* HTML
* CSS
* JavaScript
* SQL Database

Tools

* GitHub
* Figma
* Google Docs
* Canva

⸻

Risk Assessment

The team identified several risks that may affect the project during planning, development, and testing.

#	Risk	Category	Likelihood	Impact	Mitigation Strategy
1	Delayed detection due to incorrect data transmission	Technical	Medium	High	Test MQTT/API communication early and validate data flow
2	Temperature readings may be inaccurate or inconsistent	Hardware	Medium	Medium	Test the sensor repeatedly and compare readings with expected values
3	Backend and dashboard integration issues	Integration	Medium	High	Define API requirements clearly and test endpoints before frontend integration
4	Alert logic may not trigger correctly	Functionality	Medium	High	Test normal and abnormal temperature scenarios before the final demo
5	Project scope expansion beyond MVP	Scope	Medium	Medium	Keep the MVP focused on temperature monitoring only and move advanced features to future vision
6	Timeline delays during development	Timeline	Medium	High	Break tasks into smaller parts and track progress regularly

⸻

High-Level Project Plan

Stage	Phase	Main Activities	Deliverable
Stage 1	Idea Development	Team formation, brainstorming sessions, idea evaluation, problem identification, solution definition, and project selection	Idea Development Documentation and Stage 1 README
Stage 2	Project Charter Development	Project objectives, SMART goals, stakeholder identification, team role definition, scope definition, risk assessment, mitigation planning, and high-level project planning	Project Charter and Stage 2 README
Stage 3	Technical Documentation and System Design	System architecture design, database design, MQTT communication flow, API planning, user flow design, dashboard structure, and technical specifications	Technical documentation and system design
Stage 4	MVP Development	Develop embedded monitoring device flow, backend server, database connection, dashboard interface, and alert logic	Functional MVP prototype
Stage 5	Testing and Project Closure	Test data flow, validate alerts, finalize documentation, prepare presentation, and submit project	Final demo and project submission

⸻

Project Status

✅ Stage 1 Completed
✅ Stage 2 Completed
✅ Project Planning Completed
🚧 Preparing for Technical Documentation
## Project Charter

📄 View Complete Project Charter

[FlexSight_ProjectCharter_Stage2_Updated.md](./FlexSight_ProjectCharter_Stage2_Updated.md)
