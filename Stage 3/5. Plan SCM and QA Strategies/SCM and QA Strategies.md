# SCM and QA Strategies

## Purpose

To establish practical procedures for source code management, team collaboration, testing, deployment, and quality assurance throughout the FlexSight development lifecycle.

---

# Team Structure

### Hamsa Alammar & Munirah Alotaibi

Responsible for frontend development, dashboard implementation, user interface components, and user experience improvements.

### Rabeea Thabet & Hanin Alhassan

Responsible for backend development, MQTT communication, API implementation, database integration, and sensor data processing.

### All Team Members

Responsible for testing, bug reporting, reviewing project updates, and maintaining overall software quality.

---

# SCM Processes

## Version Control

The project uses Git and GitHub as the primary version control system.

All team members work on the same shared GitHub repository. Each member completes their assigned task on their local machine, tests the implementation, commits the changes, and pushes the updated files to the repository.

Before starting new work, team members pull the latest updates from the repository to ensure everyone is working on the most recent version of the project.

---

## Commit Plan

Team members create clear and meaningful commits for each completed logical change.

Commit examples:

```text
feat: add dashboard temperature card
feat: implement alert notification logic
fix: correct sensor reading validation
test: add API endpoint tests
docs: update technical documentation
```

---

## Code Review

Before pushing any changes, each team member tests their work locally to verify that the implementation functions correctly.

After the changes are pushed to the shared repository, the team reviews the updated files, verifies that the new functionality works as expected, and resolves any issues before continuing development.

Code Review Checklist:

* Assigned task is completed.
* Functionality works correctly.
* No conflicts with other project files.
* Reported issues are fixed before continuing development.

---

## Team Workflow

1. Select the assigned task.
2. Implement the required functionality on the local machine.
3. Test the implementation locally.
4. Commit and push the completed work to the shared GitHub repository.
5. Pull the latest updates from the repository before continuing development.
6. Perform integration testing after combining all completed tasks.
7. Conduct a final project review and resolve any remaining issues before submission.

---

# Plan QA Processes

## Testing Strategy

All team members share responsibility for testing and quality assurance throughout the project.

Testing includes:

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

Testing complete user workflows and overall system behavior.

---

## Testing Tools

### Pytest

Used for backend unit testing.

### Postman

Used to validate API endpoints and API responses.

### Browser Testing

Used to verify dashboard functionality, responsiveness, and user interface behavior.

---

# Project-Specific QA Coverage

### Sensor Monitoring Flow

Verify that sensor readings are received correctly from the sensor.

### Data Storage Flow

Verify that temperature readings are successfully stored in the database.

### Dashboard Flow

Verify that live temperature readings are displayed correctly on the dashboard.

### Alert Flow

Verify that an alert is automatically generated when the temperature reaches or exceeds **50°C**.

### API Flow

Verify that all API endpoints return accurate and valid data.

---

# Manual Critical Flows

### Critical Flow 1

The sensor sends a temperature reading.

### Critical Flow 2

The backend server receives and processes the sensor data.

### Critical Flow 3

The processed temperature data is stored in the database.

### Critical Flow 4

The dashboard displays the latest temperature reading.

### Critical Flow 5

An alert is generated automatically when the temperature reaches or exceeds **50°C**.

---

# Development Workflow

1. Complete the assigned task.
2. Test the functionality locally.
3. Commit and push the changes to the shared GitHub repository.
4. Pull the latest project updates.
5. Perform integration testing with the complete system.

---

# Final Project Validation

1. Verify that all project components work together correctly.
2. Re-run the required tests.
3. Fix any remaining issues.
4. Perform final manual testing.
5. Prepare the final version for submission.

---

# Deliverable Section

## SCM Strategy

* Git and GitHub workflow.
* Shared GitHub repository collaboration.
* Commit and push process.
* Local testing before uploading changes.
* Team code review process.

## QA Strategy

* Unit Testing.
* Integration Testing.
* Manual Testing.
* Pytest and Postman tools.
* Final system validation before project submission.
