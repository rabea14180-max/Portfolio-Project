# Database Testing Evidence

This document provides evidence that the FlexSight PostgreSQL database was created and tested successfully during Stage 4.

The database was tested using PostgreSQL tools and the VS Code terminal. Testing confirmed that the database tables, sample data, and relationships were created correctly.

---

## 1. Database Connection

This screenshot confirms that the FlexSight PostgreSQL database was connected successfully.

![Database Connection](assets/database-testing/show-databases.png)

---

## 2. Database Tables

This screenshot shows the database tables created for the FlexSight system.

![Database Tables](assets/database-testing/show-tables.png)

---

## 3. Users Table

This screenshot shows the users stored in the database with their assigned roles: OWNER, ADMIN, and INSPECTOR.

![Users Table](assets/database-testing/users-table.png)

---

## 4. Embedded Devices Table

This screenshot shows the embedded devices stored in the database, including device status, activity state, heartbeat time, firmware version, and assigned manager.

![Embedded Devices Table](assets/database-testing/embedded-devices-table.png)

---

## 5. Temperature Sensors Table

This screenshot shows the temperature sensors linked to embedded devices, including the current temperature, calibration offset, and sensor range.

![Temperature Sensors Table](assets/database-testing/temperature-sensors-table.png)

---

## 6. Threshold Configurations Table

This screenshot shows the warning and critical temperature thresholds used by the system.

![Threshold Configurations Table](assets/database-testing/threshold-configs-table.png)

---

## 7. Temperature Logs Table

This screenshot shows stored temperature readings. The sample data includes normal, warning, and critical temperature values.

![Temperature Logs Table](assets/database-testing/temperature-logs-table.png)

---

## 8. Alerts Table

This screenshot shows warning and critical alerts generated from abnormal temperature readings.

![Alerts Table](assets/database-testing/alerts-table.png)

---

## 9. Dashboards Table

This screenshot shows the dashboard record linked to the current user.

![Dashboards Table](assets/database-testing/dashboards-table.png)

---

## 10. Device Thresholds Table

This screenshot shows the relationship between embedded devices and threshold configurations.

![Device Thresholds Table](assets/database-testing/device-thresholds-table.png)

---

## Database Testing Summary

The PostgreSQL database was tested successfully. The tables were created, sample data was inserted, and database queries confirmed that users, embedded devices, temperature sensors, threshold configurations, temperature logs, alerts, dashboards, and device threshold relationships were stored correctly.

This evidence supports the Stage 4 testing requirements by demonstrating that the database layer of the FlexSight MVP works correctly with the backend models, APIs, and web dashboard.
