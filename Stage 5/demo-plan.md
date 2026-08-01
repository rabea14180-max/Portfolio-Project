# FlexSight — Live Demo Plan

**Stage 5 — Task 3: Final Presentation and Live Demo Preparation**

## Project Information

| Item | Details |
|---|---|
| Project | FlexSight Temperature Monitoring and Alert System |
| Team | Hamsa Bnian Alammar, Rabea Thabit, and Munirah Alotaibi |
| Live Project | https://flexsight.dev/links |
| Repository | https://github.com/rabea14180-max/Portfolio-Project |

## Pre-Demo Checklist

- Confirm that the website and login page are working.
- Verify that devices, readings, and alerts are available.
- Confirm that the alert email recipient is configured.
- Verify that email notifications are working.
- Open the presentation, website, and demonstration email before starting.
- Hide passwords and sensitive information.
- Keep real screenshots as a backup.

## Live Demo Steps

1. Open FlexSight and log in.
2. Show the Dashboard and system statistics.
3. Show registered devices and their status.
4. Open the Readings page and explain the stored temperature data.
5. Demonstrate the user-configurable temperature threshold.
6. Show the configured email recipient.
7. Show the alert generated when the threshold is exceeded.
8. Show the alert notification received by email.
9. Acknowledge or resolve the alert.
10. Demonstrate role-based access.

## Email Alerts

FlexSight can send an email notification when a temperature reading exceeds the threshold configured by an authorized user.

The email notification provides information about the triggered alert so the responsible user can respond without continuously monitoring the dashboard.

During the demo:

- Confirm the configured recipient email.
- Trigger or display an existing temperature alert.
- Show the alert inside the FlexSight dashboard.
- Open the received email notification.
- Do not display passwords or private account information.

## User Roles

- **Owner:** Full system access, including users, devices, alerts, thresholds, and email settings.
- **Admin/Manager:** Manages users, devices, alerts, thresholds, and email settings according to permissions.
- **Inspector:** View-only access to Dashboard and Readings, with access to Settings to change the password.

## System Flow

DHT11 Sensor → ESP32 → Flask REST API → PostgreSQL → React Dashboard

When a reading exceeds the configured threshold, the backend creates an alert inside the application and sends an email notification to the configured recipient.

## Demo Closing

FlexSight delivers a complete sensor-to-dashboard workflow with temperature monitoring, stored readings, configurable thresholds, dashboard alerts, email notifications, and role-based access control.

If the live website or email service is unavailable, the team will continue the demonstration using real screenshots.

## Live Demo

**FlexSight Website:** https://flexsight.dev/links
