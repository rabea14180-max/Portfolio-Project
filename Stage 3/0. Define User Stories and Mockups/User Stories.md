# User Stories

## Persona 1: Owner

### Must Have (MVP)

* **As an Owner**, I want to view all organizations, users, devices, and alerts, **so that** I can supervise the entire FlexSight system.
* **As an Owner**, I want to access dashboard data across all organizations, **so that** I can monitor the overall system status.
* **As an Owner**, I want to view critical alerts from all monitored environments, **so that** I can identify high-risk situations quickly.
* **As an Owner**, I want to manage system settings, **so that** the monitoring process can be controlled at the system level.

### Should Have

* **As an Owner**, I want to manage user roles and permissions, **so that** each user has the correct access level.
* **As an Owner**, I want to view system performance and alert summaries, **so that** I can evaluate the effectiveness of the monitoring system.

### Could Have

* **As an Owner**, I want to generate summary reports, **so that** I can review temperature trends and alert history.

## Persona 2: Organisation Owner

### Must Have (MVP)

* **As an Organisation Owner**, I want to view devices and locations under my organization, **so that** I can monitor temperature conditions within my organization.
* **As an Organisation Owner**, I want to view warning and critical alerts related to my organization, **so that** I can follow up on operational safety issues.
* **As an Organisation Owner**, I want to view historical hourly temperature readings, **so that** I can review previous temperature changes.
* **As an Organisation Owner**, I want to monitor device status, **so that** I can know whether each ESP32 device is online or offline.

### Should Have

* **As an Organisation Owner**, I want to manage users within my organization, **so that** the right team members can access the dashboard.
* **As an Organisation Owner**, I want to receive critical email alerts, **so that** I am informed when serious temperature issues occur.

### Could Have

* **As an Organisation Owner**, I want to customize warning and critical temperature thresholds, **so that** alert levels match the needs of each location.

## Persona 3: Admin / Manager

### Must Have (MVP)

* **As an Admin/Manager**, I want to view temperature readings from ESP32 devices, **so that** I can monitor the current temperature status of each location.
* **As an Admin/Manager**, I want to see warning and critical alerts on the dashboard, **so that** I can respond quickly to abnormal temperature levels.
* **As an Admin/Manager**, I want to view device status, **so that** I can know whether each monitoring device is working properly.
* **As an Admin/Manager**, I want to filter readings by organization, location, sector, device, and date, **so that** I can analyze temperature data easily.
* **As an Admin/Manager**, I want to review active alerts, **so that** I can prioritize urgent incidents.

### Should Have

* **As an Admin/Manager**, I want to receive email notifications for abnormal temperatures, **so that** responsible users are informed even when they are not viewing the dashboard.
* **As an Admin/Manager**, I want to view alert history, **so that** I can track previous incidents and responses.

### Could Have

* **As an Admin/Manager**, I want to view email delivery status, **so that** I can confirm whether alert notifications were sent successfully.

## Persona 4: Inspector

### Must Have (MVP)

* **As an Inspector**, I want to view assigned alerts and affected devices or locations, **so that** I can follow up on reported incidents.
* **As an Inspector**, I want to view temperature readings, **so that** I can understand the severity of the issue.
* **As an Inspector**, I want to view alert details including device ID, location, temperature, and time, **so that** I can inspect the issue accurately.
* **As an Inspector**, I want to update the alert status as resolved or unresolved, **so that** the team can track incident follow-up progress.

### Should Have

* **As an Inspector**, I want to add follow-up notes to an alert, **so that** the response details are documented.
* **As an Inspector**, I want to view previous alerts for the same location, **so that** I can identify repeated temperature issues.

### Could Have

* **As an Inspector**, I want to receive assigned alert notifications, **so that** I can follow up on incidents faster.

## Won’t Have (Out of MVP Scope)

* The system will not include a mobile application in the MVP.
* The system will not include mobile push notifications in the MVP.
* The system will not include AI-based risk prediction in the MVP.
* The system will not monitor smoke, gas, flame, humidity, or camera feeds in the MVP.
* The system will not support advanced analytics or enterprise-level reporting in the MVP.
* The system will not include external integrations with third-party monitoring platforms in the MVP.
