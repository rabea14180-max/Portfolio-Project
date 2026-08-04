# FlexSight — Stage 4

FlexSight is a temperature monitoring MVP. An ESP32 connected to a DHT11 sensor sends temperature readings to a Flask backend. The backend stores and processes the data, while the React dashboard displays devices, readings, alerts, users, and configurable temperature thresholds.

## System Components

| Component | Technology | Purpose |
|---|---|---|
| Sensor Node | ESP32 and DHT11 | Collect temperature readings |
| Backend | Python and Flask | Authentication, APIs, permissions, and system logic |
| Database | PostgreSQL and SQLAlchemy | Store users, devices, readings, alerts, and thresholds |
| Frontend | React and Vite | Display and manage monitoring data |
| Deployment | Production server | Host the integrated MVP |

## Team Roles

| Team Member | Role |
|---|---|
| Hamsa Bnian Alammar | Project Manager and ESP32 Development |
| Rabea Thabit | SCM and Backend Development |
| Munirah Alotaibi | QA, UI/UX, Frontend Development, and Documentation |

## Sprint Status

| Sprint | Date | Goal | Status |
|---|---|---|---|
| Sprint 1 | 30 June–6 July 2026 | Database, backend, authentication, and initial frontend | Completed |
| Sprint 2 | 7–13 July 2026 | Dashboard features, user roles, device settings, and initial sensor setup | Completed |
| Sprint 3 | 14–20 July 2026 | ESP32 integration, testing, fixes, and deployment | Completed |
| Final Stabilization | 21–23 July 2026 | Authentication, permissions, integration, alerts, and final verification | Completed |

## Stage 4 Documentation

| Task | Document | Status |
|---|---|---|
| Task 0 | [Sprint Planning](./sprint-plan.md) | Completed |
| Task 1 | [Development Execution](./development-execution.md) | Completed |
| Task 2 | [Progress Monitoring and Bug Tracking](./monitor-progress.md) | Completed |
| Task 3 | [Sprint Reviews and Retrospectives](./sprint-reviews-retrospectives.md) | Completed |
| Task 4 | [Final Integration and QA Testing](./final-integration-qa-testing.md) | Completed |
| Task 5 | [Deliverables](./deliverables.md) | Completed |

## Application Documentation

| Area | Documentation |
|---|---|
| Frontend | [Frontend README](./frontend/README.md) |
| Backend | [Backend README](./backend/README.md) |
| Database | [Database Testing Evidence](./database-testing-evidence.md) |
| Source Repository | [Portfolio Project](https://github.com/rabea14180-max/Portfolio-Project) |
| Production Environment | [FlexSight Production](http://64.227.153.34) |

## Quality and Delivery

| Evidence | Link | Result |
|---|---|---|
| Frontend Automated Tests | [Frontend Test Files](./frontend/test/) | 26 Passed |
| Backend Automated Tests | [Backend Test Suite](./backend/flexsight_test.py) | 12 Passed |
| Frontend Production Build | [Frontend README](./frontend/README.md#production-build) | Passed |
| Final QA Results | [Final Integration and QA Testing](./final-integration-qa-testing.md) | Passed |
| Bug Tracking | [Progress Monitoring and Bug Tracking](./monitor-progress.md) | Completed |
| Production Deployment | [FlexSight Production](http://64.227.153.34) | Deployed |

## Final Test Summary

| Category | Passed | Failed | Result |
|---|---:|---:|---|
| Frontend Automated Tests | 26 | 0 | Passed |
| Backend Unit Tests | 5 | 0 | Passed |
| Backend Production Integration Tests | 7 | 0 | Passed |
| **Total Automated Tests** | **38** | **0** | **Passed** |
| Frontend Production Build | 1 | 0 | Passed |

## Project Structure

```text
Stage 4/
├── assets/
│   └── database-testing/
├── backend/
│   ├── .gitignore
│   ├── README.md
│   ├── app.py
│   ├── config.py
│   ├── flexsight_test.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes.py
│   ├── seed_db.py
│   └── test_connection.py
├── database/
│   ├── migration_add_device_fields.sql
│   ├── migration_multi_tenant.sql
│   ├── schema.sql
│   ├── seed.sql
│   └── test-queries.sql
├── deploy/
│   └── deploy.sh
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── Topbar.jsx
│   │   ├── pages/
│   │   │   ├── AddUser.jsx
│   │   │   ├── Alerts.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Devices.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Readings.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Users.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── test/
│   │   ├── api.test.js
│   │   ├── protected-route.test.jsx
│   │   └── status-badge.test.jsx
│   ├── .env.production
│   ├── .gitignore
│   ├── README.md
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── sensor/
│   └── esp32_temperature.ino
├── README.md
├── alerts-table.png
├── database-testing-evidence.md
├── deliverables.md
├── development-execution.md
├── final-integration-qa-testing.md
├── monitor-progress.md
├── sprint-plan.md
└── sprint-reviews-retrospectives.md
```

## Quick Start

| Application | Instructions |
|---|---|
| Frontend | [Frontend Setup and Commands](./frontend/README.md) |
| Backend | [Backend Setup and Commands](./backend/README.md) |

## Production Environment

The deployed FlexSight MVP is available at:

[http://64.227.153.34](http://64.227.153.34)
