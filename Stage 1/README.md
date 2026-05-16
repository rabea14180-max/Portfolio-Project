# Flex Sight — Temperature Monitoring & Alert System

## Overview

Flex Sight is a lightweight embedded temperature monitoring and alert system designed to improve safety and monitoring efficiency in operational environments such as server rooms, warehouses, factories, data centers, and technical facilities.

The system continuously monitors temperature readings using embedded sensors and sends the data in real time through MQTT/API communication to a central server. The server processes the readings, checks whether the temperature reaches a critical threshold, and automatically triggers an alert on the dashboard when abnormal temperatures are detected.

Core workflow:

MQTT/API → Server → Dashboard Alert

Flex Sight focuses on providing a simple and scalable monitoring solution that supports early detection of overheating risks and helps organizations respond faster to potential safety incidents.

---

## Team Members

- Munirah Alotaibi
- Hanin Alhassan
- Hamsa Alammar
- Rabeea Thabet

---

## Communication & Collaboration Rules

To maintain effective teamwork and smooth project coordination, the team established clear communication and meeting guidelines throughout the project development process.

### Communication Rules
- Team members are expected to respond to important messages within a reasonable timeframe.
- Urgent updates and technical issues are communicated immediately through group channels.
- Discussions related to development, system changes, or documentation are shared with all members to maintain transparency.

### Meeting Rules
- Meetings are scheduled based on team availability and project deadlines.
- Each meeting focuses on progress updates, technical discussions, task distribution, and issue resolution.
- Decisions are made collaboratively through discussion and agreement among team members.

---

## Collaboration Tools

| Tool | Purpose |
|---|---|
| WhatsApp | Daily communication and quick updates |
| Discord | Technical discussions and file sharing |
| Google Meet | Online meetings and team coordination |
| Google Docs | Collaborative documentation and report writing |
| Canva | Presentation design and visual materials |
| GitHub | Version control and project organization |

---

## Problem Statement

Many operational environments still rely on manual inspection or delayed monitoring methods to detect high temperatures. This can lead to delayed responses, reduced visibility, equipment damage, and increased safety risks.

Flex Sight addresses this issue by providing continuous real-time monitoring and centralized dashboard alerts whenever the temperature reaches approximately 50°C.

---

## Project Idea

The idea behind Flex Sight is to create an embedded monitoring system capable of detecting abnormal temperature levels and instantly notifying users through a dashboard interface.

The project combines embedded sensing, real-time communication, server-side processing, and dashboard monitoring into one simple workflow. The goal is to provide an achievable MVP that solves a real operational problem while remaining scalable for future improvements.

---

## System Implementation

The system will be implemented using four main components:

### Embedded Sensor Layer
Temperature sensors continuously collect environmental readings.

### MQTT/API Communication
Sensor data is transmitted in real time using lightweight MQTT/API communication protocols.

### Server Layer
The server receives incoming readings, processes the data, checks threshold values, and manages alert logic.

### Dashboard Layer
The dashboard displays live readings, device status, and automatic alerts whenever abnormal temperatures are detected.

---

## Technologies Used

### Hardware Components
- Temperature Sensors
- Embedded Monitoring Device
- Wi-Fi Communication Module

### Software Components
- MQTT/API Communication
- Backend Server
- Database System
- Dashboard Monitoring Interface
- GitHub for version control and collaboration

---

## Main Features

- Real-time temperature monitoring
- Automatic dashboard alerts
- MQTT/API communication
- Centralized monitoring interface
- Threshold detection at approximately 50°C
- Lightweight and scalable architecture
- Live device and reading visibility

---

## Target Users & Environments

Flex Sight is designed for organizations and operational environments that require continuous temperature monitoring and fast alert response.

### System Owners
Responsible for monitoring the overall system, reviewing alerts, and supervising operational performance.

### Administrators
Manage devices, monitor readings, and supervise dashboard activity and alerts.

### Safety Teams
Track abnormal temperature alerts and respond quickly to potential safety incidents.

### Technical Staff
Monitor device performance and ensure system reliability and maintenance.

Target environments include:
- Warehouses
- Server rooms
- Data centers
- Factories
- Industrial facilities
- Technical and electrical rooms

---

## Why Flex Sight Was Selected

Several ideas were explored during the brainstorming phase, including AI-based camera systems, mobile alert applications, and full fire detection systems.

Flex Sight was selected because it provides the best balance between feasibility, simplicity, scalability, and practical impact. The project aligns with the available timeline, team capabilities, and MVP objectives while solving a real-world safety problem.

---

## Strengths of the Project

- Simple and achievable MVP
- Real-time monitoring capabilities
- Fast alert generation
- Low implementation cost
- Scalable architecture
- Suitable for multiple industries
- Can be expanded with AI, cameras, and additional sensors

---

## Success Metrics

The success of Flex Sight will be measured using several key indicators:

- Continuous real-time monitoring performance
- Fast dashboard alert response time
- Reliable MQTT/API communication
- Stable temperature data transmission
- Accurate threshold detection at approximately 50°C
- Scalable system performance for future expansion

The project also aims to improve monitoring efficiency and reduce delayed responses in operational environments.

---

## Challenges & Opportunities

### Challenges
- Dependence on stable internet connectivity
- Sensor calibration and testing requirements
- Hardware accuracy limitations
- Continuous power supply requirements
- Different environments may require different threshold values

### Opportunities
- AI-based monitoring and prediction
- Camera integration
- Multi-location monitoring
- Additional sensor support
- Mobile notification systems
- Advanced reporting and analytics

---

## Future Expansion

Future versions of Flex Sight may include:

- Smoke and flame sensors
- AI-based analysis
- Camera integration
- Multi-location monitoring
- Mobile notifications
- Advanced reporting and analytics

These future enhancements can transform Flex Sight into a more advanced smart safety and monitoring platform.

---

## Conclusion

Flex Sight is a practical and scalable temperature monitoring solution designed to improve operational safety through real-time monitoring and instant dashboard alerts.

The project combines embedded systems, MQTT/API communication, server-side processing, and dashboard monitoring into one efficient workflow that supports early risk detection and faster response in operational environments.

---

## Project Documentation

[Flex Sight Final Report](https://github.com/rabea14180-max/Portfolio-Project/blob/main/Stage%201/Flex-Sight-Final-Report%20--.pdf)
