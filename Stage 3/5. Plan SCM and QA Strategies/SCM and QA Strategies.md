# SCM and QA Strategies

## Purpose

To establish practical procedures for source code management, team collaboration, testing, deployment, and quality assurance throughout the FlexSight development lifecycle.

---

# Team Structure

### Hamsa Alammar & Munirah Alotaibi

Frontend development, dashboard implementation, user interface components, and user experience improvements.

### Rabeea Thabet & Hanin Alhassan

Backend development, MQTT communication, API implementation, database integration, and sensor data processing.

### All Team Members

Testing responsibilities, bug reporting, code reviews, and quality assurance activities.

---

# SCM Processes

## Version Control

The project will use Git and GitHub as the primary version control system.

The repository will contain protected branches to ensure code stability and proper collaboration.

---

## Branching Strategy

### main

Contains only stable and approved production-ready code.

### development

Integration branch used for combining completed features before final release.

### feature/<feature-name>

Used for developing individual features and tasks.

Examples:

* feature-dashboard
* feature-alert-system
* feature-api
* feature-database
* feature-sensor-monitoring

### hotfix/<issue>

Used for urgent bug fixes when necessary.

---

## Commit Plan

Team members will create small and frequent commits for each logical change.

Commit examples:

```text
feat: add dashboard temperature card
feat: implement alert notification logic
fix: correct sensor reading validation
test: add API endpoint tests
docs: update technical documentation
```

---

## Code Review and Pull Requests

Direct pushes to the main and development branches are not allowed.

Every change must be submitted through a Pull Request.

Pull Request requirements:

* Related task must be completed.
* Code must pass testing.
* At least one team member must review the code.
* Required comments and fixes must be resolved before merging.

---

## Team Workflow

1. Select assigned task.
2. Create feature branch from development.
3. Implement functionality.
4. Test locally.
5. Create Pull Request.
6. Review and approve changes.
7. Merge into development.
8. Perform integration testing.
9. Release approved code to main.

---

# Plan QA Processes

## Testing Strategy

All team members share responsibility for testing and quality assurance.

Testing will include:

### Unit Testing

Testing individual functions and modules independently.

Examples:

* Temperature validation functions.
* Alert generation logic.
* API utility functions.

### Integration Testing

Testing communication between:

* Sensor and MQTT broker.
* MQTT broker and backend server.
* Backend and database.
* Backend and dashboard.

### Manual Testing

Testing complete user workflows and system behavior.

---

## Testing Tools

### Pytest

Used for backend unit testing.

### Postman

Used to validate API endpoints and responses.

### Browser Testing

Used to test dashboard functionality and responsiveness.

---

# Project-Specific QA Coverage

### Sensor Monitoring Flow

Verify that sensor readings are received correctly.

### Data Storage Flow

Verify that temperature readings are stored successfully in the database.

### Dashboard Flow

Verify that live temperature data appears correctly on the dashboard.

### Alert Flow

Verify that alerts are triggered automatically when temperature exceeds the configured threshold (50°C).

### API Flow

Verify that all API endpoints return accurate and valid data.

---

# Manual Critical Flows

### Critical Flow 1

Sensor sends temperature reading.

### Critical Flow 2

Server receives and processes sensor data.

### Critical Flow 3

Temperature data is stored in the database.

### Critical Flow 4

Dashboard displays the latest reading.

### Critical Flow 5

Alert is generated when temperature reaches or exceeds 50°C.

---

# Deployment Pipeline

## Staging Pipeline (Development Branch)

1. Push code to development.
2. Run automated tests.
3. Perform API validation.
4. Deploy to staging environment.
5. Execute manual testing checklist.

---

## Production Pipeline (Main Branch)

1. Re-run required tests.
2. Deploy stable version.
3. Perform smoke testing.
4. Monitor logs and system alerts.
5. Verify dashboard and API availability.

---

# Deliverable Section

## SCM Strategy

* Git and GitHub workflow.
* main / development / feature / hotfix branching model.
* Pull Requests and code reviews.
* Protected branches and approval process.

## QA Strategy

* Unit Testing.
* Integration Testing.
* Manual Testing.
* Pytest and Postman tools.
* Staging and production deployment validation.
