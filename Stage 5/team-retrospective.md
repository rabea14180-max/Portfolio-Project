# FlexSight — Team Retrospective

## Project Information

| Item | Details |
|---|---|
| Project Name | FlexSight |
| Project Type | Temperature Monitoring and Alert System |
| Team Members | Hamsa Bnian Alammar, Rabea Thabit, Munirah Alotaibi |
| Development Period | Three Sprints |
| Final Status | MVP completed, tested, and deployed |

## 1. Retrospective Overview

This retrospective reviews the team’s experience during the development of FlexSight.

The project combined an ESP32 and DHT11 temperature sensor with a Flask backend, PostgreSQL database, and React web dashboard. The team worked across three sprints to complete the planned features, integrate the system components, perform testing, and deploy the final MVP.

The retrospective identifies what worked well, the challenges faced by the team, and the improvements that could support future projects.

## 2. What Went Well

### Clear Team Responsibilities

Each team member had defined responsibilities based on their project role. This helped the team divide the work between project coordination, hardware, backend, source control, frontend, UI/UX, testing, and documentation.

### Sprint Planning

Dividing the work into three sprints helped the team organize development tasks and monitor progress. The sprint plan provided a clear order for building the database, backend, frontend, sensor integration, testing, and deployment.

### Team Communication

The team communicated regularly to discuss progress, integration requirements, technical issues, and pending tasks. This helped identify problems before the final deployment.

### Scope Control

The team maintained the project’s focus on temperature monitoring and alert management. Keeping the MVP focused helped the team complete all 16 planned development tasks.

### Successful System Integration

The ESP32, DHT11 sensor, Flask backend, PostgreSQL database, and React frontend were successfully connected. Temperature readings could be collected, transmitted, stored, and displayed through the web dashboard.

### Configurable Temperature Threshold

The system allowed authorized users to set and update the temperature threshold instead of relying on a fixed value. Alerts were generated according to the selected threshold.

### Testing and Deployment

The team tested the backend, integration, frontend components, authentication, permissions, devices, readings, and alerts. The final MVP was successfully deployed and validated.

## 3. Challenges Faced

### Hardware Connectivity

Connecting the ESP32 to Wi-Fi and sending sensor readings to the backend required repeated testing. Network availability and API configuration affected the integration process.

### Frontend and Backend Integration

Some integration issues were caused by differences in API responses, field names, authentication handling, and expected data formats.

### Role-Based Permissions

The Owner, Admin, and Inspector roles required different access permissions. The team had to test each role separately to ensure that pages and actions were properly protected.

### Threshold Configuration

Allowing users to change the temperature threshold required coordination between the interface, backend logic, and PostgreSQL database.

### Deployment Environment

The deployed environment required additional validation because configuration and connectivity could behave differently from the local development environment.

### Time Management

The team had to balance implementation, testing, documentation, integration, and presentation preparation within a limited development period.

## 4. What Could Be Improved

### Start Integration Earlier

Hardware, backend, database, and frontend integration could begin earlier in the development process. This would provide more time to identify and resolve integration issues.

### Increase Testing During Each Sprint

Testing could be performed continuously as each feature is completed instead of concentrating most validation near the end of development.

### Define API Responses Earlier

The team could document API endpoints, request formats, response fields, and error messages before frontend integration begins.

### Test User Roles Continuously

Separate test accounts for Owner, Admin, and Inspector could be used throughout development to detect permission problems earlier.

### Document Technical Changes Immediately

Changes to the database, APIs, permissions, and interface could be documented as soon as they are implemented to keep all project files consistent.

### Reserve More Time for Deployment

Future projects should include additional time for production configuration, deployment testing, and resolving environment-specific issues.

## 5. Team Contributions

| Team Member | Role | Main Contributions |
|---|---|---|
| Hamsa Bnian Alammar | Project Manager and ESP32 Development | Coordinated the project, followed sprint progress, organized team tasks, and worked on the ESP32 and DHT11 sensor integration |
| Rabea Thabit | SCM and Backend Development | Managed source control, developed the Flask backend and APIs, worked with the PostgreSQL database, and supported deployment |
| Munirah Alotaibi | QA, UI/UX, and Frontend Development | Developed and improved the React interface, supported UI/UX design, performed testing, and worked on project documentation |

## 6. Lessons Learned as a Team

The FlexSight project helped the team understand that:

- Clear responsibilities improve coordination and accountability.
- A focused MVP is easier to complete, test, and deploy.
- Integration should begin before all components are considered finished.
- API structures must remain consistent between frontend and backend.
- Each user role must be tested independently.
- Configurable features must be connected correctly across the interface, backend, and database.
- Production validation is necessary even when the system works locally.
- Regular communication is important when multiple components depend on each other.
- Documentation should be updated whenever the implementation changes.

## 7. Action Items for Future Projects

For future projects, the team plans to:

- Begin system integration earlier.
- Add testing activities to every sprint.
- Define API contracts before frontend integration.
- Maintain separate accounts for testing every user role.
- Document technical changes during development.
- Reserve more time for deployment and production testing.
- Continue using clear roles and sprint-based planning.

## 8. Final Reflection

The team successfully delivered a functional and deployed FlexSight MVP.

Despite challenges involving hardware connectivity, system integration, permissions, configuration, and deployment, the team completed the planned work and gained practical experience in developing a full-stack system connected to physical hardware.

The project improved the team’s skills in project coordination, ESP32 integration, backend development, PostgreSQL database management, React development, UI/UX, testing, source control, documentation, and deployment.
