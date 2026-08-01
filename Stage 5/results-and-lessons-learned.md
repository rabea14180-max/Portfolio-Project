# FlexSight — Results and Lessons Learned

**Stage 5 — Task 0**

## Project Summary

FlexSight is a deployed IoT temperature-monitoring system that connects an ESP32 and DHT11 sensor to a Flask backend, PostgreSQL database, and React dashboard.

The system displays alerts on the dashboard and sends email notifications when temperature readings exceed the threshold configured by an authorized user.

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
| Email Notifications | Alert emails are sent to the configured recipient |
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
| Email delivery depends on an external service | Verify email configuration before deployment |
| Additional ideas increased the scope | Keep the MVP focused on essential features |

## Team Contributions

| Team Member | Contribution |
|---|---|
| Hamsa Bnian Alammar | Project management, sprint coordination, and sensor integration |
| Rabea Thabit | Source control, Flask backend, REST APIs, PostgreSQL, and email-alert integration |
| Munirah Alotaibi | QA, UI/UX, React frontend, testing, and documentation |

## Conclusion

FlexSight achieved its main objective by delivering a stable sensor-to-dashboard temperature-monitoring MVP with configurable thresholds, dashboard alerts, email notifications, and role-based access control.
