## Task 1: Execute Development Tasks

## Objective

The objective of this task was to implement the planned FlexSight MVP features during the three sprints. The team worked on the database, backend, frontend, sensor integration, testing, and deployment.

## Team Responsibilities

| Team Member | Role | Responsibility |
|---|---|---|
| Hamsa Bnian Alammar | Project Manager | Followed the sprint plan, coordinated the team, and worked on the ESP32 sensor |
| Rabea Thabit | SCM and Backend Developer | Managed the repository, worked on the backend and database connection, and deployed the project |
| Munirah Alotaibi | QA and Frontend Developer | Developed the React interface and tested the completed features |

## Development Work

### Sprint 1

The team created the database tables and sample data, implemented the Flask backend structure, added authentication, and created the initial React application.

Completed work:

- Database schema and test data
- Backend models and configuration
- Sign up, login, and logout
- React routes and shared components
- Initial database testing

### Sprint 2

The team completed the main dashboard pages and connected them to the backend APIs.

Completed work:

- Dashboard
- Devices
- Temperature readings
- Alerts
- Users
- Settings and temperature thresholds
- Role-based access for Owner, Admin, and Inspector
- Initial DHT11 sensor setup

### Sprint 3

The team completed the ESP32 integration, fixed the remaining issues, and deployed the MVP.

Completed work:

- ESP32 Wi-Fi connection
- Sending temperature readings to the API
- Frontend, backend, and database integration
- Account and permission fixes
- Final deployment

## Source Control

The team used Git and GitHub to store and track the project files. Each member committed their completed work to the shared repository. Rabea Thabit, as the SCM, checked the integrated code and managed the final deployment version.

Most Stage 4 work was committed directly to the main branch. The commit history is available in the project repository.

## QA During Development

QA checked completed features during development and reported issues to the team. The checks included the database, login, dashboard pages, user roles, and frontend-to-backend connection. Fixed issues were checked again before deployment.

The full test cases and results will be included in Task 4.

## Result

The planned MVP features were implemented and integrated successfully. FlexSight is deployed and available at:

[http://64.227.153.34/login](http://64.227.153.34/login)
