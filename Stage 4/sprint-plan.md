## Task 0: Plan and Define Sprints

Project Overview

FlexSight is a temperature monitoring system. An ESP32 connected to a DHT11 sensor sends temperature readings through Wi-Fi to a Flask backend API. The readings are stored in a database and displayed in a React dashboard. The MVP also includes authentication, role-based access, device management, configurable temperature thresholds, alerts, account settings, testing, and production deployment.

## Team Roles and Responsibilities

| Team Member | Role | Responsibilities |
|---|---|---|
| Hamsa Bnian Alammar | Project Manager and ESP32 Developer | Organize sprints, coordinate team tasks, monitor deadlines, connect the DHT11 sensor to the ESP32, and send readings to the API |
| Rabea Thabit | SCM and Backend Developer | Manage source control, develop backend models and APIs, implement authentication and permissions, integrate backend services, and manage deployment |
| Munirah Alotaibi | QA, UI/UX, and Frontend Developer | Develop the React interface, test the database and integrated system, verify completed features, and prepare Stage 4 documentation |

Sprint Duration

The planned development work was divided into three one-week sprints. Following the Sprint 3 review, a three-day stabilization period was used to complete additional integration, authentication, permission, and alert-tracking improvements.

Iteration	Date	Goal
Sprint 1	30 June–6 July 2026	Create the database, backend, authentication, and initial frontend
Sprint 2	7–13 July 2026	Complete the dashboard features, user roles, device settings, and initial sensor setup
Sprint 3	14–20 July 2026	Complete ESP32 integration, testing, responsive interface fixes, and production deployment
Final Stabilization	21–23 July 2026	Complete final integration, authentication updates, access-control adjustments, alert tracking, and deployment verification

## User Story Breakdown

| User Story | Tasks or Features | Priority |
|---|---|---|
| As a user, I want to create an account and sign in securely so that I can access FlexSight | Sign up, username login, logout, and protected routes | Must Have |
| As an Owner or Admin, I want to manage devices and thresholds so that temperature monitoring can be configured | Device management, device status, warning thresholds, and critical thresholds | Must Have |
| As an authorized user, I want to view the dashboard, temperature readings, and alerts so that I can monitor environmental conditions | Dashboard metrics, readings page, alerts page, and temperature status classification | Must Have |
| As an Owner or Admin, I want to manage users and roles so that system access can be controlled | User management and Owner, Admin, and Inspector permissions | Should Have |
| As an authorized user, I want resolved alerts to show who resolved them and when so that alert actions are traceable | Resolved-by and resolved-at alert information | Should Have |
| As the monitoring system, I want the ESP32 to send sensor readings to the API so that temperature data is stored automatically | DHT11 integration, Wi-Fi connection, and HTTP POST requests | Must Have |

## MoSCoW Prioritization

The MoSCoW framework was applied before Sprint 1 and used to maintain the MVP scope throughout development.

| Priority | Features | Final Outcome |
|---|---|---|
| Must Have | Authentication, username login, devices, temperature readings, alerts, thresholds, database, ESP32 integration, role-based access, testing, and deployment | Completed |
| Should Have | User management, account settings, responsive navigation, alert resolution tracking, and interface improvements | Completed |
| Could Have | Email notifications and password-reset workflow | Deferred from the final MVP |
| Won't Have | Location management, mobile application, humidity, smoke, gas, camera, and AI features | Excluded from Stage 4 scope |

## Sprint 1

| Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|
| Define sprint tasks and priorities | Must Have | Hamsa | 30 Jun | Stage 3 documentation | Completed |
| Create the database schema and sample data | Must Have | Munirah Alotaibi and Rabea | 2 Jul | Final database design | Completed |
| Implement backend models and configuration | Must Have | Rabea | 3 Jul | Database schema | Completed |
| Implement sign up, login, and logout | Must Have | Rabea | 3 Jul | Backend models | Completed |
| Create the React application and main pages | Must Have | Munirah Alotaibi | 4 Jul | Approved UI design | Completed |
| Test the database and initial functions | Must Have | Munirah Alotaibi | 6 Jul | Database and backend | Completed |

## Sprint 2

| Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|
| Connect the DHT11 sensor to the ESP32 | Must Have | Hamsa | 7 Jul | Hardware setup | Completed |
| Complete Dashboard, Devices, Readings, and Alerts | Must Have | Munirah Alotaibi and Rabea | 10 Jul | Frontend and APIs | Completed |
| Complete Users and Settings | Should Have | Munirah Alotaibi and Rabea | 12 Jul | Authentication and user APIs | Completed |
| Add role-based access for Owner, Admin, and Inspector | Must Have | Munirah Alotaibi and Rabea | 12 Jul | Authentication | Completed |
| Add device actions and configurable threshold settings | Must Have | Munirah Alotaibi and Rabea | 13 Jul | Device and threshold APIs | Completed |

## Sprint 3

| Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|
| Connect the ESP32 to Wi-Fi and send readings to the API | Must Have | Hamsa | 16 Jul | Sensor and reading API | Completed |
| Complete account settings and initial permission fixes | Should Have | Rabea and Munirah Alotaibi | 18 Jul | Authentication and roles | Completed |
| Test the frontend, backend, and database connection | Must Have | Munirah Alotaibi | 19 Jul | Completed integration | Completed |
| Configure production deployment and relative API access | Must Have | Rabea | 19 Jul | Stable frontend and backend | Completed |
| Fix mobile navigation and horizontal page overflow | Should Have | Rabea | 19 Jul | Integrated frontend | Completed |
| Allow Admin users to manage Inspector accounts | Should Have | Rabea | 20 Jul | User management and permissions | Completed |
| Conduct the initial MVP review | Must Have | Hamsa and team | 20 Jul | Deployment | Completed |

## Final Stabilization: 21–23 July 2026

| Task | Priority | Responsible | Deadline | Dependency | Status |
|---|---|---|---|---|---|
| Add unit and production integration test cases | Must Have | Munirah Alotaibi | 21 Jul | Deployed APIs and test data | Completed |
| Update frontend and backend integration | Must Have | Hamsa and Rabea | 21 Jul | Deployed MVP | Completed |
| Prepare sprint planning, execution, and progress documentation | Must Have | Munirah Alotaibi | 21 Jul | Completed sprint records | Completed |
| Defer the unfinished password-reset workflow from the final MVP | Could Have | Rabea | 22 Jul | Final scope review | Completed |
| Update authentication to use usernames and display the signed-in username | Must Have | Rabea | 23 Jul | Authentication APIs | Completed |
| Add resolved-by and resolved-at information to alerts | Should Have | Rabea | 23 Jul | Alert resolution API | Completed |
| Finalize route permissions, sidebar visibility, and account options | Must Have | Rabea | 23 Jul | Role-based access | Completed |
| Simplify dashboard data fetching and finalize device access rules | Must Have | Rabea | 23 Jul | Dashboard and device APIs | Completed |
| Verify the final production frontend and API | Must Have | QA and team | 23 Jul | Final integrated build | Completed |

## Main Dependencies

| No. | Dependency |
|---|---|
| 1 | The approved Stage 3 documentation was required before sprint planning and implementation. |
| 2 | The database schema was required before completing backend models and APIs. |
| 3 | Authentication was required before implementing protected pages and role-based permissions. |
| 4 | The reading API was required before connecting the ESP32 to the deployed system. |
| 5 | Device APIs were required before completing threshold settings and device actions. |
| 6 | Backend APIs were required before completing frontend integration. |
| 7 | Alert resolution logic was required before displaying resolved-by and resolved-at information. |
| 8 | Full integration was required before final testing and production verification. |

## Planning Adjustment

| Item | Details |
|---|---|
| Original Plan | Complete three one-week sprints by 20 July 2026. |
| Identified Adjustments | Additional authentication, permission, integration, and alert-tracking improvements were identified during the final review and deployment verification. |
| Adjustment Period | 21–23 July 2026. |
| Final Result | The additional tasks were completed without adding new out-of-scope MVP features. |
