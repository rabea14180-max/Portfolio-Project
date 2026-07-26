## Task 3: Conduct Sprint Reviews and Retrospectives

## Purpose

The purpose of this task was to review the work completed during each sprint, compare the results with the sprint goals, and identify improvements for the following sprint.

## Review and Retrospective Process

At the end of each sprint, the completed work was compared with the sprint plan and reviewed using the implementation available in the repository.

Each retrospective focused on three questions:

1. What worked well during the sprint?
2. What challenges were identified?
3. What action was required for the next sprint?

## Sprint Review Participants and Evidence
| Sprint | Review Participants | Review Activity | Evidence Used |
|---|---|---|---|
| Sprint 1 | Project team | Reviewed the database, backend structure, authentication, initial React pages, and database testing | Source files and database-testing evidence |
| Sprint 2 | Project team | Reviewed the Dashboard, Devices, Readings, Alerts, Users, Settings, role access, thresholds, and initial sensor setup | React pages, backend APIs, database records, and ESP32 code |
| Sprint 3 | Project team | Reviewed the integrated MVP, ESP32 reading flow, role-based functions, and production deployment | Deployed MVP and Stage 4 source repository |
The sprint reviews were conducted internally by the project team to verify completed work, identify required improvements, and confirm readiness for the next sprint.
## Sprint 1 Review

| Item | Details |
|---|---|
| Sprint Period | 30 June–6 July 2026 |
| Sprint Goal | Create the database, backend, authentication, and initial frontend |
| Completed Work | Database schema, sample data, backend models, configuration, sign up, login, logout, initial React pages, and database testing |
| Review Evidence | Files under database/, backend/, and frontend/ |
| Review Result | The Sprint 1 tasks were completed and the project was ready for feature and sensor integration |

## Sprint 1 Retrospective

| Retrospective Question | Team Reflection |
|---|---|
| What worked well? | The database, backend structure, authentication, and initial React interface were completed in the required dependency order |
| What challenges were identified? | Frontend feature development depended on completing the database, backend APIs, and authentication first |
| What action was required? | Use the completed backend and authentication functions to connect the main dashboard pages during Sprint 2 |

## Sprint 2 Review

| Item | Details |
|---|---|
| Sprint Period | 7–13 July 2026 |
| Sprint Goal | Complete the dashboard features, user roles, device settings, and initial sensor setup |
| Completed Work | Dashboard, Devices, Readings, Alerts, Users, Settings, role-based access, device actions, threshold settings, account functions, and DHT11 sensor setup |
| Review Evidence | React pages, backend routes, account settings, device APIs, and ESP32 sensor code |
| Review Result | The main MVP features were implemented and ready for full integration |

## Sprint 2 Retrospective

| Retrospective Question | Team Reflection |
|---|---|
| What worked well? | The main React pages and backend APIs were completed and connected to the database structure |
| What challenges were identified? | Role permissions, account functions, and frontend-to-backend integration required continued checking |
| What action was required? | Complete permission updates, connect the ESP32 to the API, and verify the integrated system during Sprint 3 |

## Sprint 3 Review

| Item | Details |
|---|---|
| Sprint Period | 14–20 July 2026 |
| Sprint Goal | Complete ESP32 integration, final integration, testing, fixes, and deployment |
| Completed Work | ESP32 Wi-Fi connection, HTTP POST readings, frontend and backend integration, account updates, permission updates, deployment configuration, and final MVP review |
| Review Evidence | ESP32 code, backend routes, React files, deployment files, and repository history |
| Review Result | The MVP was integrated and deployed, with three frontend interface issues recorded for correction |

## Sprint 3 Retrospective

| Retrospective Question | Team Reflection |
|---|---|
| What worked well? | The ESP32, frontend, backend, and database components were integrated, and the production deployment was completed |
| What challenges were identified? | Three frontend interface issues were recorded: Users menu highlighting, Settings page boxes, and the Add Device box |
| What action was required? | Correct the three recorded issues, verify the frontend build, and complete the remaining repository updates |


## Actions Taken After Sprint 3

| Action | Result |
|---|---|
| Fix the Users menu highlight | Exact route matching was added |
| Fix the Settings page boxes | The Settings layout and styles were updated |
| Fix the Add Device box | The form size and layout were adjusted |
| Update frontend and backend integration | Integration files were updated |
| Update authentication | Username login and signed-in username display were added |
| Update alert information | resolved_by and resolved_at were added |
| Update access checks | Backend permissions and frontend route visibility were updated |
| Update Dashboard data handling | Dashboard fetching and device API handling were updated |

## Review Metrics

| Metric | Result |
|---|---:|
| Sprints reviewed | 3 |
| Planned sprint tasks | 18 |
| Completed sprint tasks | 18 |
| Sprint completion rate | 100% |
| Recorded bugs | 3 |
| Resolved bugs | 3 |
| Bug resolution rate | 100% |

## Overall Retrospective

| Area | Final Reflection |
|---|---|
| What worked well? | The team completed the planned database, backend, frontend, sensor, and deployment work across the three sprints |
| What required improvement? | Frontend interface issues and final access and integration updates required additional work after Sprint 3 |
| What was improved? | The three recorded interface issues were fixed, and the remaining authentication, alert, access, and Dashboard updates were completed |
| Future improvement | Include final integration and interface verification earlier in the sprint to reduce updates after the planned sprint period |

## Task Result

The three sprint reviews documented the completed MVP work and the progress made during each sprint. The retrospectives identified dependency, integration, access-control, and interface considerations. The resulting action items were completed and recorded in the repository.
