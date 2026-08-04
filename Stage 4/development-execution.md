# Task 1: Execute Development Tasks

## Purpose

The purpose of this task was to implement the FlexSight MVP features according to the approved sprint plan. Development included the database, Flask backend, React frontend, ESP32 integration, role-based access, testing files, and production deployment.

## Team Execution Responsibilities

| Team Member | Role | Executed Responsibilities |
|---|---|---|
| Hamsa Bnian Alammar | Project Manager and ESP32 Developer | Coordinated sprint execution, monitored deadlines, connected the DHT11 sensor to the ESP32, configured Wi-Fi, and sent temperature readings to the API |
| Rabea Thabit | SCM and Backend Developer | Managed repository integration, developed backend models and APIs, implemented authentication and permissions, and configured deployment |
| Munirah Alotaibi | QA, UI/UX, and Frontend Developer | Developed the React interface, tested database and integrated functions, verified completed features, and prepared Stage 4 documentation |

## Sprint 1 Execution: 30 June–6 July 2026

| Implemented Task | Responsible | Implementation Evidence | Status |
|---|---|---|---|
| Create the database schema and sample data | Munirah Alotaibi and Rabea | Database schema, seed data, and test queries under `database/` | Completed |
| Implement backend models and configuration | Rabea | `backend/models.py`, `backend/config.py`, and `backend/app.py` | Completed |
| Implement sign up, login, and logout | Rabea | Authentication routes in `backend/routes.py` | Completed |
| Create the initial React application | Munirah Alotaibi | React pages, routes, layout, and shared components under `frontend/src/` | Completed |
| Test the database and initial functions | Munirah Alotaibi | Database queries, screenshots, and [`database-testing-evidence.md`](./database-testing-evidence.md) | Completed |

## Sprint 2 Execution: 7–13 July 2026

| Implemented Task | Responsible | Implementation Evidence | Status |
|---|---|---|---|
| Connect the DHT11 sensor to the ESP32 | Hamsa | `sensor/esp32_temperature.ino` | Completed |
| Complete Dashboard, Devices, Readings, and Alerts | Munirah Alotaibi and Rabea | React pages connected to Flask APIs | Completed |
| Complete Users and Settings | Munirah Alotaibi and Rabea | User-management and account-settings pages and APIs | Completed |
| Add role-based access | Munirah Alotaibi and Rabea | Protected frontend routes and backend role checks | Completed |
| Add device actions | Munirah Alotaibi and Rabea | Add, update, activate, deactivate, and delete device functions | Completed |
| Add configurable thresholds | Munirah Alotaibi and Rabea | Warning and critical threshold fields and APIs | Completed |
| Add account password and deletion functions | Munirah Alotaibi and Rabea | Change-password and account-deletion functions | Completed |

## Sprint 3 Execution: 14–20 July 2026

| Implemented Task | Responsible | Implementation Evidence | Status |
|---|---|---|---|
| Connect the ESP32 to Wi-Fi | Hamsa | Wi-Fi configuration in the ESP32 program | Completed |
| Send temperature readings to the API | Hamsa | HTTP POST implementation in `sensor/esp32_temperature.ino` | Completed |
| Complete frontend, backend, and database integration | Team | React API requests connected to the Flask backend and database | Completed |
| Complete account and permission updates | Rabea and Munirah Alotaibi | Account settings and role-access changes | Completed |
| Configure production deployment | Rabea | Gunicorn, production API configuration, and `deploy/deploy.sh` | Completed |
| Fix mobile navigation and page overflow | Rabea | Responsive Sidebar, Topbar, Layout, and CSS updates | Completed |
| Allow Admin users to manage Inspector accounts | Rabea | User API and protected-route updates | Completed |
| Review the integrated MVP | Hamsa and team | Review of the implemented Sprint 3 features | Completed |

## Additional Updates After Sprint 3: 21–23 July 2026

| Implemented Task | Responsible | Implementation Evidence | Status |
|---|---|---|---|
| Add unit and production integration test cases | Munirah Alotaibi | `backend/flexsight_test.py` | Completed |
| Remove the local database file from the repository | Munirah Alotaibi | `backend/instance/flexsight.db` was deleted | Completed |
| Update frontend and backend integration | Hamsa and Rabea | Backend application, routes, API configuration, and Dashboard updates | Completed |
| Prepare Stage 4 documentation | Munirah Alotaibi | Sprint planning, development execution, and progress documentation | Completed |
| Remove the password-reset implementation from the final version | Rabea | Password-reset pages, routes, fields, and migration were removed | Completed |
| Update authentication to use usernames | Rabea | Login API and React Login page updates | Completed |
| Display the signed-in username | Rabea | Frontend authentication storage and Topbar updates | Completed |
| Add alert-resolution information | Rabea | `resolved_by` and `resolved_at` were added to the alerts response and table | Completed |
| Update route permissions and navigation visibility | Rabea | Backend role checks, protected routes, Sidebar, and Settings updates | Completed |
| Update Dashboard data fetching | Rabea | Dashboard and device API handling updates | Completed |

## Development Practices

| Area | Applied Practice |
|---|---|
| Backend structure | Application setup, configuration, models, and routes were stored in separate files |
| Frontend structure | Pages, reusable components, styles, and API functions were organized separately |
| Access control | Protected React routes and backend role checks were used |
| Configuration | Environment-based configuration was used for the backend and production environment |
| Documentation | Planning, execution, progress, database testing, and deployment files were stored in the repository |

## Source Control Management

| SCM Activity | Actual Implementation |
|---|---|
| Repository | The team used a shared GitHub repository |
| Main branch | Most Stage 4 development was committed directly to `main` |
| Commit tracking | Team members committed backend, frontend, sensor, testing, documentation, and deployment changes |
| Integration | Merge commits were used to synchronize and integrate team updates |
| SCM responsibility | Rabea managed repository integration and the deployment version |
| Pull requests | A formal Pull Request workflow is not documented in the Stage 4 repository history |

## QA During Development

| QA Activity | Evidence |
|---|---|
| Database testing | Test queries, results, and database screenshots were added |
| Frontend checking | React pages and completed interface functions were checked during integration |
| Backend and API testing | A Python file containing unit and production integration test cases was added |
| Integration checking | Frontend, backend, database, and API connections were checked during development |
| Issue reporting | QA reported implementation and interface issues to the team |
| Debugging details | Progress issues and adjustments are documented under Task 2 |
| Final testing | Detailed final QA tests and results are documented under Task 4 |

## Task Result

The planned database, backend, frontend, sensor, access-control, and deployment functions were implemented during the three sprints. Additional repository updates were completed from 21 to 23 July 2026. Detailed debugging, testing results, and final deliverable links are documented in their corresponding Stage 4 tasks.
