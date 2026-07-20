# FlexSight — Stage 4 Sprint Plan

## 1. Project Overview

FlexSight is a web-based temperature monitoring and alert system. The MVP collects hourly temperature readings from a DHT11 sensor connected to an ESP32 monitoring device, sends the readings to the backend through an API, stores them in the database, and displays devices, readings, alerts, users, and threshold settings in the web dashboard.

Stage 4 followed an Agile approach and was divided into three one-week sprints. Each sprint included planning, development, source-control review, testing, review, and retrospective activities.

## 2. Team Roles and Responsibilities

| Team Member | Stage 4 Role | Main Responsibilities |
|---|---|---|
| Hamsa Bnian Alammar | Project Manager and Frontend Developer | Sprint planning, task coordination, deadline tracking, frontend support, and ESP32 sensor implementation |
| Rabea Thabit | Source Control Manager and Backend Developer | Git workflow, code review, branch and merge integrity, backend APIs, database integration, deployment, and production fixes |
| Munirah | Quality Assurance, UI/UX Designer, and Frontend Developer | Test planning, database and UI testing, bug reporting, interface implementation, usability checks, and verification of completed fixes |
| Hanin Taqi | Programming and Backend Developer | Sensor communication, MQTT/API support, alert logic, backend development, and integration support |

## 3. Sprint Duration

| Sprint | Period | Duration | Main Goal |
|---|---|---:|---|
| Sprint 1 | 30 June–6 July 2026 | 1 week | Build the database, backend foundation, authentication, and initial React frontend |
| Sprint 2 | 7–13 July 2026 | 1 week | Integrate the sensor and complete the main dashboard features |
| Sprint 3 | 14–20 July 2026 | 1 week | Complete hardware/API integration, final testing, fixes, and production deployment |

## 4. MoSCoW Prioritization

| Priority | Features |
|---|---|
| Must Have | Sign up, login, logout, role-based access, device management, hourly temperature readings, alerts, configurable thresholds, database storage, ESP32/API integration, and production deployment |
| Should Have | User management, account security settings, device status, responsive navigation, loading/error states, and database testing evidence |
| Could Have | Email notification support, additional dashboard summaries, and minor interface enhancements |
| Won't Have in This MVP | Mobile application, location management, humidity/gas/smoke/flame monitoring, camera monitoring, SMS, AI risk scoring, advanced analytics, third-party integrations, and multi-branch management |

## 5. Sprint 1 — Foundation and Core Development

*Period:* 30 June–6 July 2026  
*Sprint Goal:* Establish the database, backend services, authentication, and initial React dashboard structure.

| ID | Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|---|
| S1-01 | Confirm MVP scope and Stage 4 responsibilities | Must Have | Hamsa | 30 Jun | Stage 3 documentation | Completed |
| S1-02 | Create database schema and relationships | Must Have | Rabea, Munirah | 1 Jul | Final data model | Completed |
| S1-03 | Add seed data and database test queries | Must Have | Munirah | 2 Jul | S1-02 | Completed |
| S1-04 | Implement Flask application configuration and models | Must Have | Rabea, Hanin | 3 Jul | S1-02 | Completed |
| S1-05 | Implement signup, login, logout, and JWT authentication | Must Have | Rabea | 3 Jul | S1-04 | Completed |
| S1-06 | Create React/Vite frontend and application routes | Must Have | Munirah | 4 Jul | Approved UI structure | Completed |
| S1-07 | Create shared UI components and API utility | Should Have | Munirah | 4 Jul | S1-06, S1-05 | Completed |
| S1-08 | Connect the backend to the hosted PostgreSQL database | Must Have | Rabea | 5 Jul | S1-04 | Completed |
| S1-09 | Test database tables, relationships, and sample records | Must Have | Munirah | 6 Jul | S1-03, S1-08 | Completed |
| S1-10 | Review code and merge accepted changes | Must Have | Rabea | 6 Jul | All Sprint 1 development tasks | Completed |

*Sprint 1 Deliverables:*

- Database schema, seed data, and test queries
- Flask backend foundation and data models
- Authentication APIs
- Initial React application and shared components
- Database testing evidence

## 6. Sprint 2 — Dashboard, Devices, and Sensor Features

*Period:* 7–13 July 2026  
*Sprint Goal:* Complete the main dashboard pages, threshold controls, device actions, and initial sensor integration.

| ID | Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|---|
| S2-01 | Connect the DHT11 temperature sensor to the ESP32 | Must Have | Hamsa, Hanin | 7 Jul | Hardware availability | Completed |
| S2-02 | Implement dashboard and role-based navigation | Must Have | Munirah, Rabea | 8 Jul | Sprint 1 authentication | Completed |
| S2-03 | Implement Devices page and device API integration | Must Have | Munirah, Rabea | 9 Jul | S1-07, backend device API | Completed |
| S2-04 | Implement hourly Readings page and reading status display | Must Have | Munirah, Hanin | 10 Jul | Reading API and database | Completed |
| S2-05 | Implement Alerts page and alert-management functions | Must Have | Munirah, Hanin | 10 Jul | Threshold and reading logic | Completed |
| S2-06 | Implement Users page and role restrictions | Should Have | Munirah, Rabea | 11 Jul | Authentication and user API | Completed |
| S2-07 | Implement Settings page and configurable thresholds | Must Have | Munirah, Rabea | 12 Jul | Device and threshold APIs | Completed |
| S2-08 | Add device actions and sensor settings | Should Have | Munirah | 13 Jul | S2-03, S2-07 | Completed |
| S2-09 | Perform functional UI and API testing | Must Have | Munirah | 13 Jul | Completed Sprint 2 features | Completed |
| S2-10 | Review and merge Sprint 2 changes | Must Have | Rabea | 13 Jul | S2-01 to S2-09 | Completed |

*Sprint 2 Deliverables:*

- Working temperature sensor prototype
- Dashboard, Devices, Readings, Alerts, Users, and Settings pages
- Role-based access control
- Configurable warning and critical thresholds
- Connected frontend and backend functionality

## 7. Sprint 3 — Integration, Quality Assurance, and Deployment

*Period:* 14–20 July 2026  
*Sprint Goal:* Complete end-to-end integration, fix critical defects, verify the MVP, and deploy it to production.

| ID | Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|---|
| S3-01 | Implement ESP32 Wi-Fi connection and HTTP POST readings | Must Have | Hamsa, Hanin | 16 Jul | Sensor prototype and reading API | Completed |
| S3-02 | Complete account password and deletion functions | Should Have | Rabea, Munirah | 16 Jul | Authentication APIs | Completed |
| S3-03 | Verify protected routes and role-based permissions | Must Have | Munirah | 17 Jul | Completed frontend and backend roles | Completed |
| S3-04 | Conduct database, API, integration, and UI testing | Must Have | Munirah | 18 Jul | S3-01 to S3-03 | Completed |
| S3-05 | Record bugs, assign owners, and retest fixes | Must Have | Munirah, Rabea | 19 Jul | S3-04 | Completed |
| S3-06 | Configure Nginx, Gunicorn, environment variables, and CI/CD | Must Have | Rabea | 19 Jul | Stable integrated build | Completed |
| S3-07 | Fix responsive navigation and horizontal overflow | Should Have | Rabea | 19 Jul | Production UI verification | Completed |
| S3-08 | Verify Admin and Inspector user permissions | Must Have | Rabea, Munirah | 19 Jul | User management and role rules | Completed |
| S3-09 | Perform final production smoke test | Must Have | Munirah | 20 Jul | Production deployment | Completed |
| S3-10 | Conduct final sprint review and retrospective | Must Have | Hamsa and all members | 20 Jul | Completion of all Stage 4 tasks | Completed |

*Sprint 3 Deliverables:*

- End-to-end ESP32, API, database, and dashboard integration
- Security and permission verification
- Final QA results and bug fixes
- Responsive production interface
- Deployed MVP

## 8. Task Dependencies

1. The database schema had to be completed before backend models and APIs.
2. Authentication APIs had to be completed before protected frontend routes and role-based access.
3. Device and reading APIs had to be available before dashboard integration.
4. Threshold configuration had to be connected before alert behavior could be verified.
5. The sensor and HTTP communication had to work before end-to-end testing.
6. Critical defects had to be fixed and retested before production deployment.

## 9. Agile Activities

- *Sprint Planning:* Goals, priorities, responsibilities, and deadlines were defined at the beginning of each sprint.
- *Daily Stand-Ups:* Members shared completed work, next tasks, and blockers through short team updates.
- *Development:* Tasks were implemented according to their priority and technical dependencies.
- *Code Review:* The SCM reviewed changes and maintained the integrity of the main branch.
- *QA Testing:* Completed features were tested during every sprint, with additional integration and production testing in Sprint 3.
- *Sprint Review:* Completed features were demonstrated and checked against the sprint goal.
- *Sprint Retrospective:* The team documented successes, challenges, and improvements for the following sprint.

## 10. Definition of Done

A task was considered complete when:

- The implementation matched the approved MVP scope.
- The code was committed to the source repository.
- The feature integrated correctly with its dependent components.
- QA tested the expected and invalid scenarios.
- Critical defects were fixed and retested.
- The final change was reviewed and accepted by the SCM.
- Required documentation or testing evidence was added.

## 11. Final Sprint Summary

| Metric | Result |
|---|---:|
| Planned sprints | 3 |
| Completed sprints | 3 |
| Planned tasks | 30 |
| Completed tasks | 30 |
| Completion rate | 100% |
| MVP deployment status | Deployed |
