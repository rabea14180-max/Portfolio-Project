# Database Testing Evidence

This document provides evidence that the FlexSight database was created and tested successfully during Stage 4.

The database was tested using MySQL Workbench and VS Code Terminal. The testing confirmed that the database, tables, sample data, and relationships were created correctly.

---

## 1. Show Databases

This screenshot shows that the MySQL database temperature_monitoring_system was created successfully.

![Show Databases](assets/database-testing/show-databases.png)

---

## 2. Show Tables

This screenshot shows all database tables created successfully.

![Show Tables](assets/database-testing/show-tables.png)

---

## 3. Users Table

This screenshot shows the sample users inserted into the database with their assigned roles: OWNER, ADMIN, and INSPECTOR.

![Users Table](assets/database-testing/users-table.png)

---

## 4. Embedded Devices Table

This screenshot shows the embedded devices stored in the database, including device status, activity state, heartbeat time, firmware version, and assigned manager.

![Embedded Devices Table](assets/database-testing/embedded-devices-table.png)

---

## 5. Temperature Sensors Table

This screenshot shows the temperature sensors linked to embedded devices, including current temperature, calibration offset, and sensor range.

![Temperature Sensors Table](assets/database-testing/temperature-sensors-table.png)

---

## 6. Threshold Configurations Table

This screenshot shows the warning and critical temperature thresholds used by the system.

![Threshold Configurations Table](assets/database-testing/threshold-configs-table.png)

---

## 7. Temperature Logs Table

This screenshot shows stored temperature readings in the database. The sample data includes normal, warning, and critical temperature values.

![Temperature Logs Table](assets/database-testing/temperature-logs-table.png)

---

## 8. Alerts Table

This screenshot shows warning and critical alerts generated from abnormal temperature readings.

![Alerts Table](assets/database-testing/alerts-table.png)

---

## 9. Notifications Table

This screenshot shows notification records linked to alerts and users.

![Notifications Table](assets/database-testing/notifications-table.png)

---

## 10. Dashboards Table

This screenshot shows the dashboard record linked to the current user in the database.

![Dashboards Table](assets/database-testing/dashboards-table.png)

---

## 11. Device Thresholds Table

This screenshot shows the relationship between embedded devices and threshold configurations.

![Device Thresholds Table](assets/database-testing/device-thresholds-table.png)

---

## Database Testing Summary

The database was tested successfully. The tables were created, sample data was inserted, and SELECT queries confirmed that users, embedded devices, temperature sensors, threshold configurations, temperature logs, alerts, dashboards, notifications, and device threshold relationships are stored correctly.

This evidence supports Stage 4 testing requirements by showing that the database layer of the MVP is working before continuing with backend models, API development, and dashboard integration.
