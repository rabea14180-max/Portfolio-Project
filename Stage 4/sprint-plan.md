## Task 0: Plan and Define Sprints

## Project Overview

FlexSight is a temperature monitoring system. An ESP32 connected to a DHT11 sensor sends temperature readings to a Flask backend. The readings are stored in a database and displayed in a React dashboard.

## Team Roles

| Team Member | Role |
|---|---|
| Hamsa Bnian Alammar | Project Manager and ESP32 Development |
| Rabea Thabit | SCM and Backend Development |
| Munirah Alotaibi | QA, UI/UX, and Frontend Development |

## Sprint Duration

The development work was divided into three one-week sprints.

| Sprint | Date | Goal |
|---|---|---|
| Sprint 1 | 30 June–6 July 2026 | Create the database, backend, authentication, and initial frontend |
| Sprint 2 | 7–13 July 2026 | Complete the dashboard features and initial sensor setup |
| Sprint 3 | 14–20 July 2026 | Complete the ESP32 integration, testing, fixes, and deployment |

## MoSCoW Prioritization

| Priority | Features |
|---|---|
| Must Have | Authentication, devices, temperature readings, alerts, thresholds, database, ESP32 integration, and deployment |
| Should Have | User management, role-based access, and account settings |
| Could Have | Email notifications and small interface improvements |
| Won't Have | Location management, mobile application, humidity, smoke, gas, camera, and AI features |

## Sprint 1

| Task | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|
| Define sprint tasks and priorities | Hamsa | 30 Jun | Stage 3 documentation | Completed |
| Create the database schema and sample data | Munirah Alotaibi and Rabea | 2 Jul | Final database design | Completed |
| Implement backend models and configuration | Rabea | 3 Jul | Database schema | Completed |
| Implement sign up, login, and logout | Rabea | 3 Jul | Backend models | Completed |
| Create the React application and main pages | Munirah Alotaibi | 4 Jul | Approved UI design | Completed |
| Test the database and initial functions | Munirah Alotaibi | 6 Jul | Database and backend | Completed |

## Sprint 2

| Task | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|
| Connect the DHT11 sensor to the ESP32 | Hamsa | 7 Jul | Hardware setup | Completed |
| Complete Dashboard, Devices, Readings, and Alerts | Munirah Alotaibi and Rabea | 10 Jul | Frontend and APIs | Completed |
| Complete Users and Settings | Munirah Alotaibi and Rabea | 12 Jul | Authentication and user APIs | Completed |
| Add role-based access | Munirah Alotaibi and Rabea | 12 Jul | Authentication | Completed |
| Add device actions and threshold settings | Munirah Alotaibi and Rabea | 13 Jul | Device and threshold APIs | Completed |

## Sprint 3

| Task | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|
| Connect the ESP32 to Wi-Fi and send readings to the API | Hamsa | 16 Jul | Sensor and reading API | Completed |
| Complete account settings and permission fixes | Rabea and Munirah Alotaibi | 18 Jul | Authentication and roles | Completed |
| Test the frontend, backend, and database connection | Munirah Alotaibi | 19 Jul | Completed integration | Completed |
| Prepare and deploy the final version | Rabea | 19 Jul | Completed MVP | Completed |
| Review the final MVP | Hamsa and team | 20 Jul | Deployment | Completed |

## Main Dependencies

- The database was required before completing the backend APIs.
- Authentication was required before adding protected pages and roles.
- The reading API was required before connecting the ESP32.
- Integration had to be completed before final testing and deployment.
