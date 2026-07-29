# Stage 5: Project Closure — Final Report

> **Project:** FlexSight — Temperature Monitoring & Alert System  
> **Repository:** https://github.com/rabea14180-max/Portfolio-Project  
> **Production Environment:** http://64.227.153.34/login  
> **Stack:** React/Vite · Python/Flask · SQL Database · ESP32 · DHT11  
> **Development Period:** June 30, 2026 — July 20, 2026  
> **Team Size:** 3 members  

---

## Purpose of This Report

This document is the final report for Stage 5 of the FlexSight project. It summarizes the MVP results, lessons learned during development, and the main points from the team retrospective.

The report is divided into three sections:

1. Results Summary
2. Lessons Learned
3. Team Retrospective Highlights

---

## 1. Results Summary

### 1.1 MVP Core Functionalities

FlexSight is a deployed temperature monitoring and alert system. It connects an ESP32 and DHT11 sensor to a Flask backend and displays the collected data in a React web dashboard.

The completed MVP includes:

- Owner account registration and user login.
- Role-based access for Owner, Admin, and Inspector users.
- A dashboard showing the latest temperature, device totals, and alert totals.
- Device management and device status tracking.
- Warning and critical temperature thresholds.
- Temperature readings history with search filters.
- Alert records with Open, Acknowledged, and Resolved statuses.
- User management for Owner and Admin accounts.
- Account settings for changing usernames and passwords.
- ESP32 and DHT11 integration with the production API.
- A deployed frontend, backend, and database.

### 1.2 Outcomes Compared With Initial Objectives

The team completed all 16 planned development tasks across three sprints. The main MVP requirements were implemented and tested.

| Initial Objective | Result |
|---|---|
| User authentication | Completed |
| Username login | Completed |
| Role-based access | Completed |
| Device management | Completed |
| Temperature readings | Completed |
| Warning and critical alerts | Completed |
| Configurable thresholds | Completed |
| Database connection | Completed |
| ESP32 and DHT11 integration | Completed |
| User management | Completed |
| Account settings | Completed |
| Alert resolution tracking | Completed |
| Testing | Completed |
| Production deployment | Completed |

The following items were deferred:

- Password reset.
- Email notifications.

The following items were outside the agreed MVP scope:

- Mobile application.
- Location management.
- Humidity, smoke, gas, and camera monitoring.
- Artificial intelligence features.
- Advanced analytics and external integrations.

### 1.3 Project Metrics

| Metric | Result |
|---|---|
| Development sprints | 3 |
| Planned tasks | 16 |
| Completed tasks | 16 |
| Average velocity | 5.3 tasks per sprint |
| Production integration tests | 12 passed |
| Frontend automated tests | 26 passed |
| Total recorded tests | 38 passed |
| Supported user roles | 3 |
| MVP deployment | Completed |

The frontend tests covered API requests, protected routes, authentication redirects, and status badge colors. Production tests covered the API health, dashboard data, devices, temperature readings, alerts, users, and database connectivity.

---

## 2. Lessons Learned

### 2.1 What Went Well

- Dividing the project into three sprints made the development work easier to follow.
- Assigning clear responsibilities allowed frontend, backend, and testing work to continue in parallel.
- Reusing React components such as `ProtectedRoute`, `StatusBadge`, `LoadingState`, and `ErrorState` reduced repeated code.
- Testing with production data helped confirm that the frontend, backend, and database were connected correctly.
- GitHub provided one shared location for code review and integration.
- Testing each completed feature helped the team resolve issues before the final deployment.

### 2.2 Challenges and Resolutions

| Challenge | Resolution |
|---|---|
| Connecting the React frontend to the Flask API | A shared API helper was used for requests, tokens, and authentication errors. |
| Controlling access for different user roles | Protected routes and role checks were added to the frontend and backend. |
| Displaying wide device and reading tables | Responsive table containers were added to prevent page overflow. |
| Updating dashboard data | The dashboard was configured to request updated data automatically. |
| Highlighting the correct navigation item | The active sidebar link logic and page routes were reviewed and corrected. |
| Improving the Settings page layout | Form cards and spacing were updated to match the dashboard design. |
| Integrating the ESP32 sensor | Sensor readings were tested against the production API and database. |
| Maintaining a stable deployed version | Integration changes were reviewed before being added to the main branch. |

### 2.3 Future Improvements

For future versions, the team could:

- Add email notifications for critical alerts.
- Add a complete password reset flow.
- Add charts for temperature trends.
- Improve mobile responsiveness for large data tables.
- Increase automated backend and frontend test coverage.
- Add clearer deployment monitoring and error logs.
- Continue testing features during each sprint instead of leaving integration checks until the end.

---

## 3. Team Retrospective Highlights

### Team Roles

| Team Member | Role |
|---|---|
| Hamsa Bnian Alammar | Project Manager and Frontend Developer |
| Rabea Thabit | Source Control Manager and Backend Developer |
| Munirah Alotaibi | Quality Assurance and Frontend Developer |

### What Worked Well as a Team?

- The team used the sprint plan to track tasks and deadlines.
- Team members worked according to their technical responsibilities.
- Frontend and backend work was integrated through agreed API endpoints.
- The SCM reviewed integration changes and maintained the stability of the main branch.
- QA tested the completed features and verified fixes before final acceptance.
- Problems were discussed and resolved during the same sprint whenever possible.

### What Challenges Did the Team Face?

- Some frontend pages needed changes after being connected to real backend data.
- Role permissions required testing with multiple account types.
- Hardware, backend, database, and frontend integration required several rounds of testing.
- Interface issues appeared on wide tables and smaller screens.
- Deployment testing found differences that were not visible in the local development environment.

### How Can the Team Improve?

- Agree on API response formats earlier.
- Add automated tests while each feature is being developed.
- Allow more time for hardware and deployment integration.
- Keep short records of important technical decisions.
- Test responsive layouts throughout development.
- Review the complete user flow at the end of every sprint.

---

## 4. Conclusion

The FlexSight team completed and deployed the planned MVP in three sprints. The final system monitors temperature readings, manages devices and users, creates alerts, applies role-based access, and connects the ESP32 sensor to a web dashboard.

All 16 planned development tasks were completed, and 38 recorded tests passed across frontend and production integration testing. The final result meets the agreed scope for a temperature monitoring and alert system.

The project showed the importance of clear roles, continuous testing, stable API contracts, and early integration between hardware and software components.

---

## Landing Page

The FlexSight landing page is available in:

`Stage_5/Landing_Page.html`

It presents the project purpose, main features, system screenshots, team members, production environment, and GitHub repository.
