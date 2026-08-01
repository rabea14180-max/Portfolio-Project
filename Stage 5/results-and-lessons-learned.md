# FlexSight — Results and Lessons Learned

**Stage 5 — Task 0**

## Project Summary

FlexSight is a deployed IoT temperature-monitoring system that connects an ESP32 and DHT11 sensor to a Flask backend, PostgreSQL database, and React dashboard.

The team completed all 16 planned tasks across three sprints.

## Final Results

| Area | Result |
|---|---|
| Hardware | ESP32 and DHT11 integrated |
| Backend | Flask REST APIs implemented |
| Database | Devices, readings, alerts, and users stored in PostgreSQL |
| Frontend | React dashboard deployed |
| Monitoring | Temperature readings collected and displayed |
| Thresholds | Authorized users can configure the temperature threshold |
| Alerts | Alerts can be generated, acknowledged, and resolved |
| Security | Authentication and role-based access implemented |
| Deployment | Stable web MVP deployed and validated |

## Testing Results

A total of **38 automated checks passed**:

- 26 frontend unit tests.
- 12 backend and integration tests.

Testing covered authentication, permissions, devices, readings, thresholds, alerts, APIs, and production connectivity.

## Challenges and Lessons Learned

| Challenge | Lesson Learned |
|---|---|
| Hardware integration required repeated testing | Begin sensor testing earlier |
| Frontend and backend were developed in parallel | Define API formats before integration |
| Role permissions were different for each user | Test every role using separate accounts |
| Local and deployed environments behaved differently | Validate the production system separately |
| Additional ideas increased the scope | Keep the MVP focused on essential features |

## Team Contributions

| Team Member | Contribution |
|---|---|
| Hamsa Bnian Alammar | Project management, sprint coordination, and sensor integration |
| Rabea Thabit | Source control, Flask backend, REST APIs, and PostgreSQL |
| Munirah Alotaibi | QA, UI/UX, React frontend, testing, and documentation |

## Conclusion

FlexSight achieved its main objective by delivering a stable sensor-to-dashboard temperature-monitoring MVP. The project strengthened the team’s experience in integration, testing, deployment, and teamwork.
