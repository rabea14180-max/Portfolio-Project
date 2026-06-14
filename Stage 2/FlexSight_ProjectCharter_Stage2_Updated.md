FLEX SIGHT

Temperature Monitoring & Alert System

PROJECT CHARTER

Stage 2 Report  |  May 2026

1. Project Objectives

1.1 Purpose

Flex Sight exists to address a widespread but under-served operational safety challenge: many facilities — including server rooms, warehouses, factories, and industrial environments — lack continuous, automated temperature monitoring. Traditional manual inspection is slow, inconsistent, and incapable of triggering instant alerts. Flex Sight provides a lightweight, real-time solution by following a clear pipeline — MQTT/API → Server → Dashboard Alert — that detects abnormal heat levels early and notifies responsible personnel before damage or danger occurs.

1.2 SMART Objectives

2. Stakeholders & Team Roles

2.1 Internal Stakeholders — Team Roles

2.2 External Stakeholders

3. Scope

3.1 In-Scope

Temperature sensor integration with an embedded device

MQTT/API communication layer for real-time data transmission

Server-side processing: receiving, storing, and evaluating temperature readings

Threshold logic: automatic alert triggered at approximately 50°C

Dashboard displaying live temperature readings, device status, and instant alerts

Database storage for temperature history, alert logs, and device records

Four user roles: Owner, Organisation Owner, Admin/Manager, Inspector

Target environments: warehouses, server rooms, data centres, industrial facilities

3.2 Out-of-Scope (MVP Stage)

Mobile push notification application

Smoke, flame, gas, or humidity sensor integration

AI-based risk analysis or predictive alerts

Camera integration for visual monitoring

Multi-location or multi-branch deployment

Advanced analytics or business intelligence reporting

Third-party external system integrations

4. Risks & Mitigation Strategies

.