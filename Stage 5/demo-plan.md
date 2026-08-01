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
- Open the presentation and website before starting.
- Hide passwords and sensitive information.
- Keep the real screenshots as a backup.

## Live Demo Steps

1. Open FlexSight and log in.
2. Show the Dashboard and system statistics.
3. Show registered devices and their status.
4. Open the Readings page and explain the stored temperature data.
5. Demonstrate the user-configurable temperature threshold.
6. Show generated alerts and their severity and status.
7. Acknowledge or resolve an alert.
8. Demonstrate role-based access.

## User Roles

- **Owner:** Full system access.
- **Admin/Manager:** Manages users, devices, alerts, and configuration.
- **Inspector:** View-only access to Dashboard and Readings, with access to Settings to change the password.

## System Flow

DHT11 Sensor → ESP32 → Flask REST API → PostgreSQL → React Dashboard

The backend compares incoming readings with the threshold configured by an authorized user and creates an alert when the threshold is exceeded.

## Demo Closing

FlexSight delivers a complete sensor-to-dashboard workflow with temperature monitoring, stored readings, configurable thresholds, alerts, and role-based access control.

If the live website is unavailable, the team will continue the demonstration using the real screenshots included in the presentation.

## Live Demo

**FlexSight Website:** https://flexsight.dev/links
ڑ
