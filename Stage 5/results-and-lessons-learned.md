# FlexSight — Results and Lessons Learned

## Project Information

| Item | Details |
|---|---|
| Project Name | FlexSight |
| Project Type | Temperature Monitoring and Alert System |
| Team Members | Hamsa Bnian Alammar, Rabea Thabit, Munirah Alotaibi |
| Development Period | Three Sprints |
| MVP Status | Stable deployed web MVP validated |

## 1. Executive Summary

FlexSight is a web-based temperature monitoring and alert system designed for environments such as server rooms, warehouses, factories, technical rooms, and offices.

The system connects an ESP32 monitoring device and a DHT11 temperature sensor to a Flask backend. Temperature readings are stored in a PostgreSQL database and displayed through a React dashboard.

The completed MVP supports user authentication, device monitoring, stored temperature readings, user-defined temperature thresholds, alert handling, user management, and role-based access control.

All 16 planned development tasks were completed across three sprints. The final system was integrated, tested, and deployed successfully.

## 2. Project Objectives

The main objectives of FlexSight were to:

- Collect temperature readings using an ESP32 and DHT11 sensor.
- Send sensor readings to the backend through an API.
- Store temperature readings in a PostgreSQL database.
- Display devices, readings, and alerts through a web dashboard.
- Allow authorized users to set and update temperature thresholds.
- Generate alerts when a temperature reading reaches the selected threshold.
- Allow authorized users to acknowledge and resolve alerts.
- Provide secure authentication and role-based access control.
- Deploy a stable and functional web MVP.

## 3. Final Results

The team successfully delivered the following features:

### Authentication and Account Management

- Owner registration.
- User login and logout.
- Password and account settings.
- Protected routes based on authentication.
- Role-based access for Owner, Admin, and Inspector.

### Device Monitoring

- Device registration and management.
- Device status display.
- Connection between the ESP32 monitoring device and the backend.
- Storage of device information in the PostgreSQL database.

### Temperature Readings

- Temperature collection using the DHT11 sensor.
- Transmission of readings from the ESP32 to the backend API.
- Storage of temperature readings in the PostgreSQL database.
- Display of current and historical readings in the React dashboard.

### Temperature Thresholds

- User-defined temperature thresholds.
- Authorized users can set and update the threshold.
- The system uses the selected threshold to determine when an alert should be generated.

### Alert Management

- Automatic alert creation when the selected temperature threshold is reached.
- Display of alerts inside the web dashboard.
- Alert status tracking.
- Acknowledge and resolve actions for authorized users.

### User Management

- Creation of Admin and Inspector accounts.
- Access permissions based on user roles.
- Protection of restricted pages and actions.

### Deployment

- Integration of the ESP32, Flask backend, PostgreSQL database, and React frontend.
- Deployment of the web application.
- Validation of the deployed MVP.

## 4. Results Compared with the Original Plan

| Planned Objective | Final Result | Status |
|---|---|---|
| User authentication | Registration, login, and logout implemented | Completed |
| Temperature collection | ESP32 and DHT11 integrated | Completed |
| Backend API | Flask APIs implemented | Completed |
| Database storage | Devices, readings, alerts, and users stored in PostgreSQL | Completed |
| Web dashboard | React dashboard implemented | Completed |
| Temperature thresholds | Authorized users can set and update the threshold | Completed |
| Alert generation | Alerts are generated according to the selected threshold | Completed |
| Alert management | Alerts are displayed and managed through the dashboard | Completed |
| Role-based access | Owner, Admin, and Inspector permissions implemented | Completed |
| Testing | Backend, integration, and frontend tests completed | Completed |
| Deployment | Stable web MVP deployed and validated | Completed |

## 5. Testing Results

The system was validated through backend, integration, and frontend testing.

The completed tests covered:

- API health and availability.
- User registration, login, and logout.
- Authentication and protected routes.
- User roles and permissions.
- Device data retrieval.
- Temperature reading storage and display.
- Temperature threshold configuration.
- Alert creation and status changes.
- Dashboard data.
- Frontend status components.
- API helper functions.
- Route protection.

A total of 38 automated checks passed across the backend, integration, and frontend test suites.

## 6. Challenges Faced

### Hardware and Software Integration

Connecting the ESP32 and DHT11 sensor to the deployed backend required careful testing of Wi-Fi connectivity, API requests, and data formats.

### Temperature Threshold Configuration

The threshold feature required coordination between the frontend, backend, and database to allow authorized users to update the temperature value and ensure that alerts were generated using the selected threshold.

### Role-Based Access Control

Each user role required different permissions. The team reviewed both frontend routes and backend authorization to ensure that users could only access permitted features.

### Frontend and Backend Integration

Differences in field names, API responses, and authentication handling caused integration issues that required coordination between frontend and backend development.

### Deployment

The deployed environment behaved differently from the local development environment. API configuration, network access, and PostgreSQL database connectivity had to be verified after deployment.

### Scope Management

Several additional ideas were considered during the project. The team maintained the MVP focus on temperature monitoring and alert response to complete a stable system within the available time.

## 7. Lessons Learned

### Plan Integration Early

Hardware, backend, database, and frontend integration should begin early because integration problems may not appear when components are tested separately.

### Keep the MVP Focused

Limiting the MVP to temperature monitoring helped the team complete, test, and deploy the main system successfully.

### Test Permissions for Each Role

Role-based access should be tested using separate accounts for every role instead of relying only on code review.

### Use Consistent API Contracts

Consistent endpoint names, field names, and response formats reduce frontend and backend integration problems.

### Make Configurable Features Clear

User-controlled settings, such as temperature thresholds, should be clearly connected between the interface, backend logic, and database.

### Validate the Deployed System

Successful local testing does not guarantee that the deployed version will behave in the same way. The production system must be tested separately.

### Maintain Clear Team Responsibilities

Clear responsibilities helped the team coordinate project management, sensor development, backend development, frontend development, source control, documentation, and quality assurance.

## 8. Team Contributions

| Team Member | Role and Contribution |
|---|---|
| Hamsa Bnian Alammar | Project management, sprint coordination, progress follow-up, and ESP32 sensor development |
| Rabea Thabit | Source control management, backend development, APIs, PostgreSQL database integration, and deployment support |
| Munirah Alotaibi | Quality assurance, UI/UX, frontend development, testing, and project documentation |

## 9. Future Improvements

Future versions of FlexSight may include:

- Improved charts and reporting.
- Additional device health information.
- More detailed alert history.
- More automated integration tests.
- Improved responsive design.

These improvements are not part of the completed MVP and are proposed only for future development.

## 10. Conclusion

FlexSight achieved its main objective by delivering a stable web-based temperature monitoring and alert system.

The final MVP successfully connects the ESP32 and DHT11 sensor to a Flask backend, PostgreSQL database, and React dashboard. It provides authentication, device monitoring, stored temperature readings, user-defined temperature thresholds, alert handling, user management, and role-based access control.

The project demonstrated the importance of scope control, early integration, consistent API design, permission testing, configurable threshold management, and production validation. The completed system provides a strong foundation for future improvements.
