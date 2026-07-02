# User Stories

## Authentication User Stories

### Must Have (MVP)

As a new user, I want to sign up, so that I can create an account and access the FlexSight system.

As a registered user, I want to log in, so that I can access the dashboard based on my assigned role.

As a logged-in user, I want to log out, so that I can end my session safely.

As a user, I want the system to validate my login information, so that only authorized users can access the dashboard.

As a user, I want to access dashboard pages based on my role, so that I only see the features allowed for my account.

### Should Have

As a user, I want to see an error message when my login information is incorrect, so that I can understand why access failed.

As a user, I want to be redirected to the login page after logging out, so that I know my session has ended.

### Could Have

As a user, I want password rules during sign up, so that my account is more secure.

---

## Persona 1: Owner

### Must Have (MVP)

As an Owner, I want to sign up and log in, so that I can access the FlexSight dashboard securely.

As an Owner, I want to view all users, devices, temperature readings, and alerts, so that I can supervise the entire FlexSight system.

As an Owner, I want to access the main dashboard, so that I can monitor the overall system status.

As an Owner, I want to view device status, so that I can know whether each ESP32 monitoring device is online or offline.

As an Owner, I want to view critical alerts, so that I can identify high-risk temperature issues quickly.

As an Owner, I want to manage system settings, so that the monitoring process can be controlled at the system level.

As an Owner, I want to manage warning and critical temperature thresholds, so that the system can detect abnormal temperature levels correctly.

As an Owner, I want to manage user roles and permissions, so that each user has the correct access level.

As an Owner, I want to view registered users, so that I can manage user access to the FlexSight system.

As an Owner, I want to log out, so that I can end my dashboard session safely.

### Should Have

As an Owner, I want to view system performance and alert summaries, so that I can evaluate the effectiveness of the monitoring system.

As an Owner, I want to view historical hourly temperature readings, so that I can review previous temperature changes.

As an Owner, I want to manage email notification settings, so that alert emails can be sent to responsible users.

### Could Have

As an Owner, I want to generate summary reports, so that I can review temperature trends and alert history.

As an Owner, I want to export system logs, so that I can keep records for documentation and review.

---

## Persona 2: Admin

### Must Have (MVP)

As an Admin, I want to log in, so that I can access the monitoring dashboard securely.

As an Admin, I want to view temperature readings from ESP32 devices, so that I can monitor the current temperature status of each device.

As an Admin, I want to monitor hourly readings, so that I can confirm that FlexSight is collecting readings once every hour.

As an Admin, I want to view device status, so that I can know whether each monitoring device is working properly.

As an Admin, I want to see warning and critical alerts on the dashboard, so that I can respond quickly to abnormal temperature levels.

As an Admin, I want to review active alerts, so that I can prioritize urgent incidents.

As an Admin, I want to view alert details, so that I can understand the affected device, temperature value, alert severity, and alert time.

As an Admin, I want to filter readings by device and date, so that I can analyze sensor data easily.

As an Admin, I want to log out, so that I can end my dashboard session safely.

### Should Have

As an Admin, I want to receive email notifications for abnormal temperatures, so that responsible users are informed even when they are not viewing the dashboard.

As an Admin, I want to view alert history, so that I can track previous incidents and responses.

As an Admin, I want to export readings and alert data, so that I can prepare reports when needed.

### Could Have

As an Admin, I want to view email delivery status, so that I can confirm whether alert notifications were sent successfully.

As an Admin, I want to refresh device status, so that I can check the latest monitoring condition.

---

## Persona 3: Inspector

### Must Have (MVP)

As an Inspector, I want to log in, so that I can access assigned alerts securely.

As an Inspector, I want to view assigned alerts, so that I can follow up on reported incidents.

As an Inspector, I want to view the affected device, so that I can know which ESP32 device needs attention.

As an Inspector, I want to view temperature readings, so that I can understand the severity of the issue.

As an Inspector, I want to view alert details including device ID, temperature, severity, and time, so that I can inspect the issue accurately.

As an Inspector, I want to acknowledge assigned alerts, so that the team knows the alert is being handled.

As an Inspector, I want to update the alert status as resolved or unresolved, so that the team can track incident follow-up progress.

As an Inspector, I want to view the affected device status, so that I can know whether the monitoring device is online or offline.

As an Inspector, I want to log out, so that I can end my dashboard session safely.

### Should Have

As an Inspector, I want to add follow-up notes to an alert, so that the response details are documented.

As an Inspector, I want to view previous alerts for the same device, so that I can identify repeated temperature issues.

### Could Have

As an Inspector, I want to receive assigned alert notifications, so that I can follow up on incidents faster.

---

## Won’t Have in MVP

The system will not include a mobile application in the MVP.

The system will not include mobile push notifications in the MVP.

The system will not include SMS notifications in the MVP.

The system will not include AI-based risk prediction in the MVP.

The system will not monitor smoke, gas, flame, or camera feeds in the MVP.

The system will not include power monitoring, HVAC monitoring, or energy monitoring in the MVP.

The system will not support advanced analytics or enterprise-level reporting in the MVP.

The system will not include external integrations with third-party monitoring platforms in the MVP.
