# FlexSight — Results and Lessons Learned

**Stage 5 — Task 0: Document Results and Lessons Learned**

## Project Information

| Item | Details |
|---|---|
| **Project** | FlexSight Temperature Monitoring and Alert System |
| **Deliverable** | Project Results and Lessons Learned |
| **Team** | Hamsa Bnian Alammar, Rabea Thabit, and Munirah Alotaibi |
| **MVP Status** | Stable deployed web MVP validated |

## Executive Summary

FlexSight delivered a functional web-based MVP that connects an ESP32 monitoring node and DHT11 temperature sensor to a Flask backend, SQL database, and React dashboard. The completed system supports Sign Up, Log In, Log Out, device monitoring, stored temperature readings, configurable thresholds, alert handling, user management, and role-based access control.

The final result met the core objectives defined for the MVP: capture temperature data from physical hardware, process and store readings, present operational information through a deployed dashboard, and create alerts when a configured temperature limit is exceeded.

All 16 planned development tasks were completed across three sprints, and the stable deployed MVP was validated through backend, integration, and frontend testing.

## 1. Project Objective and Delivered MVP

FlexSight was created to improve temperature visibility in sensitive environments such as warehouses, factories, server rooms, data centers, electrical rooms, technical rooms, and offices. These environments are project target contexts and are not presented as current FlexSight customers.

The delivered MVP includes:

- Sign Up for creating a new Owner account.
- Log In for authenticating registered users.
- Log Out for securely ending the current user session.
- A monitoring dashboard that displays the latest temperature, device status, and alert indicators.
- Device records and stored temperature readings.
- Configurable alert thresholds.
- Alert creation when a temperature reading exceeds the configured threshold.
- Alert acknowledgment and resolution.
- User management.
- Role-Based Access Control.
- ESP32 and DHT11 integration.
- SQL database storage.
- Backend APIs.
- A deployed web application.

### User Roles

- **Owner:** Full system access, including user management.
- **Admin/Manager:** Operational management access according to assigned permissions.
- **Inspector:** Dashboard-only, view-only access.

## 2. Results Summary

The completed MVP demonstrates the full monitoring path from a physical temperature reading to a visible web response:

1. The DHT11 sensor provides a temperature value to the ESP32 monitoring node.
2. The ESP32 sends the reading through the system communication layer.
3. The Flask backend validates and processes the reading.
4. The reading is stored in the SQL database.
5. The React dashboard retrieves and displays the available system information.
6. If the reading exceeds the configured threshold, the backend creates an alert.
7. An authorized user can acknowledge or resolve the alert.

The default project threshold is **50°C**, and the threshold is configurable.

## 3. Comparison with the Project Charter

| Initial Objective | Delivered Outcome | Status |
|---|---|---|
| Capture temperature through physical hardware | ESP32 and DHT11 were integrated with the system reading flow. | Achieved |
| Display monitoring data in a web dashboard | The React dashboard displays temperature, device, and alert information. | Achieved |
| Store temperature readings | Readings are processed by Flask and stored in the SQL database. | Achieved |
| Generate alerts when a threshold is exceeded | The backend creates alerts using a configurable threshold. | Achieved |
| Control access by user role | Owner, Admin/Manager, and Inspector permissions were implemented. | Achieved |
| Deliver and deploy a stable MVP | The integrated web system was deployed and validated. | Achieved |

## 4. Implemented Functional Results

### Authentication Functions

- The system provides a Sign Up page for creating a new Owner account.
- Registered users can securely Log In using their account credentials.
- Authenticated users can Log Out and end their active session.
- Protected pages require authentication before access is granted.
- Available pages and system functions are controlled according to the user's role.

### Dashboard and Monitoring Functions

- The dashboard refreshes available system information every five seconds.
- Dashboard metrics include:
  - Latest temperature.
  - Total devices.
  - Online devices.
  - Active devices.
  - Open alerts.
  - Critical alerts.
  - Latest open alert.
  - Five most recent alerts.
- Alert records include:
  - Alert ID.
  - Device ID.
  - Temperature.
  - Severity.
  - Status.
  - Triggered time.
  - Resolved by.
  - Acknowledge and Resolve actions.
- Authorized users can acknowledge or resolve alerts.
- The Inspector role is restricted to dashboard-only, view-only access.

## 5. Project Metrics

| Indicator | Measured Result | Interpretation |
|---|---|---|
| Planned development tasks | 16/16 completed | All planned Stage 4 development tasks were completed. |
| Development cycle | 3 sprints | Work was delivered incrementally. |
| Average velocity | 5.3 tasks per sprint | Average completed work across the three sprints. |
| Backend and integration tests | 12 tests | Covered backend and system integration behavior. |
| StatusBadge frontend tests | 13 tests passed | Verified status display behavior. |
| ProtectedRoute frontend tests | 4 tests passed | Verified protected-route behavior. |
| API helper frontend tests | 9 tests passed | Verified frontend API helper behavior. |
| Total listed frontend tests | 26 tests | 13 StatusBadge + 4 ProtectedRoute + 9 API helper tests. |
| Deployment result | Stable MVP validated | The integrated web MVP was deployed and checked. |

> **Measurement note:** These figures describe completed tasks and listed tests. They are not a claim of 100% code coverage.

## 6. What Went Well

### Focused MVP Scope

The team concentrated on temperature monitoring and avoided unrelated features. This kept the build aligned with the original project problem and allowed the core monitoring workflow to be completed.

### Incremental Delivery

Three development sprints provided clear checkpoints for the database, authentication, dashboard, backend APIs, sensor integration, testing, and deployment.

### Full-Stack Integration

The project successfully connected the DHT11 sensor, ESP32 monitoring node, Flask backend, SQL database, and React frontend.

### Role-Based Access Control

Permissions were separated across Owner, Admin/Manager, and Inspector. The Inspector was correctly restricted to dashboard-only, view-only access.

### Testing and Fix Verification

Backend, integration, and frontend tests supported defect discovery and fix verification before final validation.

### Team Collaboration

Project management, source control, documentation, quality assurance, frontend development, backend development, and sensor work were coordinated across the team.

## 7. Challenges and How They Were Addressed

| Challenge | How It Was Addressed |
|---|---|
| Connecting the ESP32 and DHT11 to the software system | The sensor connection was developed and tested incrementally before full-system integration. |
| Integrating the frontend, backend, database, and hardware | Components and APIs were validated separately and then combined during the integration sprint. |
| Implementing authentication and role permissions | Protected routes and access behavior were checked according to each user role. |
| Restricting Inspector access | The Inspector experience was limited to dashboard-only, view-only access and verified during testing. |
| Maintaining main-branch stability | Source-control responsibilities and Git-based integration practices were used to manage shared changes. |
| Resolving defects before deployment | QA documented issues, developers applied fixes, and the fixes were verified before final validation. |

## 8. Team Contributions

| Team Member | Role and Contributions |
|---|---|
| **Hamsa Bnian Alammar** | Project management, frontend support, and sensor connection/testing. |
| **Rabea Thabit** | Source control management and backend development. |
| **Munirah Alotaibi** | Documentation, quality assurance, and frontend development. |

## 9. Team Retrospective

A team retrospective was conducted after completing the FlexSight MVP to evaluate the team's performance, discuss the main challenges, and identify improvements for future projects.

### Participants

- Hamsa Bnian Alammar
- Rabea Thabit
- Munirah Alotaibi

### What Worked Well

- Team responsibilities were divided according to each member's role and technical responsibilities.
- The three-sprint structure provided clear development checkpoints.
- Regular communication helped coordinate frontend, backend, documentation, QA, and sensor tasks.
- Git-based source control supported collaboration and integration.
- Testing throughout development helped identify defects and verify fixes before deployment.
- The team maintained a focused MVP scope.
- Team members supported each other during integration and final validation.

### Challenges Discussed

- Connecting the ESP32 and DHT11 sensor to the software system.
- Integrating the frontend, backend, database, and physical hardware.
- Implementing and testing authentication and role-based permissions.
- Restricting the Inspector role to dashboard-only access.
- Maintaining the stability of the main branch during integration.
- Completing testing, defect resolution, and deployment within the planned schedule.

### How the Challenges Were Addressed

- Hardware integration was developed and tested incrementally.
- APIs and system components were tested separately before full integration.
- Access behavior was verified using accounts with different user roles.
- Source-control responsibilities helped organize shared changes.
- QA documented defects and verified the implemented fixes.
- The team kept the MVP focused on essential temperature-monitoring functions.
- Integration and deployment issues were reviewed collaboratively by the team.

### Improvements for Future Projects

- Begin hardware integration during the first sprint.
- Define clearer acceptance criteria for every task.
- Prepare test accounts for every user role earlier.
- Keep technical documentation synchronized with code changes.
- Schedule regular integration checkpoints.
- Record important technical decisions throughout development.
- Reserve dedicated time for testing, defect resolution, and deployment validation.

### Retrospective Action Items

| Action Item | Expected Benefit |
|---|---|
| Start hardware testing during the first sprint | Reduce late hardware and software integration issues |
| Review task progress at regular checkpoints | Identify delays and blockers earlier |
| Prepare role-based test scenarios in advance | Improve access-control validation |
| Update documentation after major changes | Keep project information accurate |
| Review shared changes before integration | Maintain main-branch stability |
| Reserve a stabilization period before delivery | Provide sufficient time for testing and fixes |

### Retrospective Outcome

The retrospective showed that the team successfully delivered the planned FlexSight MVP through focused scope, incremental development, defined responsibilities, and continuous testing.

The main improvement identified for future projects was to begin integration and role-based testing earlier while maintaining more frequent documentation and progress reviews.

## 10. Lessons Learned

### Test Hardware Integration Early

Physical-device issues are easier to isolate before the hardware is combined with the full software stack.

### Integrate Continuously

Connecting the frontend, backend, database, and sensor in smaller increments reduces late-stage troubleshooting.

### Validate Every User Role Independently

Successful authentication does not guarantee correct authorization. Each role requires its own access and navigation test path.

### Keep the MVP Focused

A controlled scope improves the team's ability to complete and validate the essential user journey.

### Use Clear Ownership with Shared Visibility

Defined responsibilities reduce duplication, while regular communication keeps dependent tasks aligned.

### Reserve Time for Testing and Fixes

Testing throughout development is more effective than leaving all defect resolution until the end of the project.

### Maintain Documentation Continuously

Updated documentation makes technical decisions, responsibilities, testing evidence, and project handover clearer.

## 11. Recommendations for Future Projects

- Define hardware integration checkpoints from the first sprint.
- Prepare test accounts and acceptance scenarios for every role before implementation is complete.
- Keep API contracts and project documentation synchronized with code changes.
- Include a dedicated stabilization period for integration testing, defect fixes, and deployment checks.
- Record measurable acceptance criteria for every Must-have requirement.

## 12. Potential Future Enhancements

The following items are recommendations only and are not current MVP functionality:

- Email alert notifications.
- A functional password-reset workflow.
- Production-grade temperature sensors for operational use.
- Support for multiple monitored locations.
- Advanced reporting and analytics.

## 13. Conclusion

FlexSight achieved its core objective by delivering a deployed temperature monitoring and alert MVP that connects physical sensing hardware to a controlled web dashboard. The completed system supports Sign Up, Log In, Log Out, readings, devices, alerts, thresholds, users, and role-based access.

The project demonstrated the importance of focused scope, incremental integration, role-specific testing, continuous documentation, and coordinated source control. The completed MVP provides a validated foundation for future improvements without overstating unimplemented capabilities.
