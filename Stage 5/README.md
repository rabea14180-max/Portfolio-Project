# Stage 5: Project Closure — Final Report

> **Project:** FlexSight — Temperature Monitoring & Alert System  
> **Repository:** https://github.com/rabea14180-max/Portfolio-Project  
> **Live Project:** https://flexsight.dev/links  
> **Stack:** React/Vite · Python/Flask · PostgreSQL · ESP32 · DHT11  
> **Development Period:** June 30, 2026 — July 20, 2026  
> **Team Size:** 3 members  

---

## Purpose of This Report

This report summarizes the final FlexSight MVP results, lessons learned, and team retrospective highlights.

---

## 1. Results Summary

### 1.1 MVP Core Functionalities

FlexSight is a deployed IoT temperature-monitoring and alert system. It connects an ESP32 and DHT11 sensor to a Flask backend, PostgreSQL database, and React dashboard.

The completed MVP includes:

- Owner registration, login, and logout.
- Role-based access for Owner, Admin/Manager, and Inspector.
- Dashboard statistics and latest temperature readings.
- Device management and status tracking.
- Historical temperature readings.
- User-configurable temperature thresholds.
- Automatic dashboard.
- Alert acknowledgment and resolution.
- User and account management.
- ESP32 and DHT11 integration.
- Deployed frontend, backend, and PostgreSQL database.

### 1.2 Outcomes

The team completed all 16 planned tasks across three sprints.

| Objective | Result |
|---|---|
| Authentication and account management | Completed |
| Role-based access control | Completed |
| Device management | Completed |
| Temperature readings | Completed |
| Configurable thresholds | Completed |
| Dashboard alerts | Completed |
| PostgreSQL integration | Completed |
| ESP32 and DHT11 integration | Completed |
| Testing | Completed |
| Production deployment | Completed |

The following items were outside the agreed MVP scope:

- Mobile application.
- Location management.
- Additional sensor types.
- Artificial intelligence features.
- Advanced analytics.
- External system integrations.

### 1.3 Project Metrics

| Metric | Result |
|---|---|
| Development sprints | 3 |
| Planned tasks | 16 |
| Completed tasks | 16 |
| Average velocity | 5.3 tasks per sprint |
| Backend and integration tests | 12 passed |
| Frontend automated tests | 26 passed |
| Total automated checks | 38 passed |
| Supported user roles | 3 |
| MVP deployment | Completed |

Testing covered authentication, permissions, devices, readings, thresholds, alerts, APIs, frontend components, and production connectivity.

---

## 2. Lessons Learned

### 2.1 What Went Well

- Clear responsibilities allowed the team to work in parallel.
- Reusable React components reduced repeated code.
- PostgreSQL was successfully integrated with the Flask backend.
- The ESP32 and DHT11 sensor were connected to the deployed system.
- Configurable thresholds were implemented.
- Automated testing helped identify issues before delivery.
- The final MVP was successfully deployed.

### 2.2 Challenges and Resolutions

| Challenge | Resolution |
|---|---|
| Frontend and backend integration | API requirements and response formats were reviewed |
| Role-based access control | Each role was tested using separate accounts |
| Sensor integration | Hardware and API components were tested gradually |
| Production differences | The deployed system was validated separately |
| Limited development time | Essential MVP features were prioritized |

### 2.3 Future Improvements

Future versions may include:

- Improved temperature charts and reports.
- Additional device health information.
- More detailed alert history.
- Increased automated test coverage.
- Improved responsive design.
- Additional sensor types.

---

## 3. Team Retrospective Highlights

### Team Roles

| Team Member | Role and Contribution |
|---|---|
| Hamsa Bnian Alammar | Project management, sprint coordination, and ESP32 sensor integration |
| Rabea Thabit | Source control, Flask backend, PostgreSQL, APIs |
| Munirah Alotaibi | Quality assurance, React frontend, testing, and documentation |

### What Worked Well?

- Tasks were organized across three sprints.
- Responsibilities were clearly distributed.
- Frontend, backend, and hardware work progressed in parallel.
- Integration issues were identified through regular testing.
- All planned tasks were completed successfully.

### What Could Be Improved?

- Begin hardware testing earlier.
- Define API contracts before implementation.
- Schedule more frequent integration checks.
- Allow additional time for deployment risks.
- Update documentation after major changes.

---

## 4. Conclusion

FlexSight successfully delivered a stable sensor-to-dashboard temperature-monitoring MVP.

The system connects an ESP32 and DHT11 sensor to a Flask backend, PostgreSQL database, and React dashboard. It supports authentication, device monitoring, configurable thresholds, dashboard , user management, and role-based access control.

All 16 planned tasks were completed, and 38 automated checks passed.

---

## Project Links

- **Live Project:** https://flexsight.dev/links
- **GitHub Repository:** https://github.com/rabea14180-max/Portfolio-Project
- **Landing Page:** [Landing_Page.html](Landing_Page.html)
