# FlexSight — Team Retrospective

**Stage 5 — Task 2: Team Retrospective**

## Project Information

| Item | Details |
|---|---|
| Project | FlexSight Temperature Monitoring and Alert System |
| Team | Hamsa Bnian Alammar, Rabea Thabit, and Munirah Alotaibi |
| Development Period | Three Sprints |
| Completed Tasks | 16 of 16 |
| MVP Status | Stable and Deployed |

## Retrospective Purpose

This retrospective reviews the FlexSight team’s performance throughout the project, including successful practices, challenges, lessons learned, and opportunities for improvement.

The team delivered a working IoT temperature-monitoring system that connects an ESP32 and DHT11 sensor to a Flask backend, PostgreSQL database, and React web dashboard.

## Team Contributions

### Hamsa Bnian Alammar

**Role: Project Manager and Hardware Integration**

- Led project planning and sprint coordination.
- Organized tasks and monitored project progress.
- Worked on the ESP32 and DHT11 sensor.
- Supported hardware testing and system integration.

### Rabea Thabit

**Role: SCM and Backend Developer**

- Managed source control and repository organization.
- Developed the Flask backend and REST APIs.
- Implemented the PostgreSQL database structure and integration.
- Supported backend and production integration testing.

### Munirah Alotaibi

**Role: QA, Frontend Developer, and Documentation**

- Developed frontend pages and reusable React components.
- Planned and executed frontend and integration tests.
- Verified role-based access and system functionality.
- Prepared and maintained project documentation.

## What Went Well

- All 16 planned tasks were completed across three sprints.
- Team responsibilities were clearly distributed.
- Frontend, backend, hardware, and documentation work progressed in parallel.
- PostgreSQL was successfully integrated with the Flask backend.
- The ESP32 and DHT11 sensor were connected to the deployed system.
- The configurable temperature threshold and alert workflow were implemented.
- Role-based access was completed for Owner, Admin/Manager, and Inspector.
- Automated testing helped identify issues before final delivery.
- A total of 38 automated checks passed.
- The final web MVP was deployed and prepared for demonstration.

## Challenges and Responses

| Challenge | Team Response |
|---|---|
| ESP32 and sensor integration required additional testing | The team used iterative hardware testing and gradual integration |
| Frontend and backend work happened in parallel | Responsibilities and API requirements were clarified between team members |
| Connecting the complete sensor-to-dashboard workflow | Each component was tested separately before final integration |
| Managing the project within the available time | The team prioritized MVP requirements and postponed nonessential features |
| Maintaining consistent project documentation | Documentation was reviewed and updated throughout the final stages |

## What Could Be Improved

- Hardware testing should begin earlier in the development process.
- Frontend and backend integration checks should happen more frequently.
- Additional buffer time should be included for hardware-related problems.
- API formats and expected responses should be confirmed earlier.
- Documentation should be updated immediately after major project changes.
- Short team check-ins should be scheduled more consistently.

## Lessons Learned

- Early testing reduces problems during final integration.
- Hardware development requires additional time and repeated validation.
- Clear ownership helps the team make faster decisions.
- Small, focused sprints make project progress easier to manage.
- Automated tests improve confidence before deployment.
- A focused MVP scope helps the team complete the essential functionality.
- Clear communication between frontend, backend, and hardware members is necessary for successful integration.

## Action Items for Future Projects

| Action Item | Expected Improvement |
|---|---|
| Begin hardware testing during the first sprint | Detect sensor and connectivity issues earlier |
| Schedule regular integration checkpoints | Reduce frontend and backend integration problems |
| Define API contracts before implementation | Improve consistency between system components |
| Add time buffers for technical risks | Reduce pressure near the final deadline |
| Update documentation after every major change | Keep project information accurate |
| Continue using automated tests | Identify regressions before deployment |

## Final Retrospective Summary

The FlexSight team successfully delivered a stable and deployed MVP that meets the agreed project scope. The project includes temperature monitoring, stored readings, user-configurable thresholds, alert handling, user management, role-based access control, sensor integration, PostgreSQL storage, and a React web dashboard.

The project strengthened the team’s experience in planning, collaboration, hardware integration, frontend and backend development, testing, documentation, and deployment. The lessons identified in this retrospective will support better planning and execution in future projects.
