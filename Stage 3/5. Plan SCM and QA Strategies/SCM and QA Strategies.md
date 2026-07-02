# SCM and QA Strategies

## Purpose

To establish practical procedures for source code management, team collaboration, testing, deployment, and quality assurance throughout the FlexSight development lifecycle.

The SCM and QA strategy supports the MVP development process, including authentication, backend APIs, database integration, dashboard pages, hourly temperature readings, alert generation, and email notification handling.

---

# Team Structure

### Hamsa Alammar & Munirah Alotaibi

Responsible for frontend development, dashboard implementation, authentication pages, user interface components, and user experience improvements.

This includes:

- Sign up page
- Login page
- Log out button
- Dashboard pages
- Devices page
- Alerts page
- Readings page
- Users page
- Settings page

### Rabeea Thabet & Hanin Alhassan

Responsible for backend development, MQTT communication, API implementation, authentication endpoints, database integration, and sensor data processing.

This includes:

- Flask backend API
- Sign up API
- Login API
- Log out API
- Readings API
- Alerts API
- Devices API
- Users API
- Threshold settings API
- Database connection
- Temperature validation
- Alert processing logic

### All Team Members

Responsible for testing, bug reporting, reviewing project updates, verifying authentication flow, checking dashboard behavior, and maintaining overall software quality.

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

text
feat: add sign up page
feat: add login page
feat: add logout button
feat: add dashboard temperature card
feat: implement alert notification logic
feat: add authentication API endpoints
fix: correct sensor reading validation
fix: correct login form validation
test: add API endpoint tests
test: test authentication flow
docs: update technical documentation


---

## Code Review

Before pushing any changes, each team member tests their work locally to verify that the implementation functions correctly.

After the changes are pushed to the shared repository, the team reviews the updated files, verifies that the new functionality works as expected, and resolves any issues before continuing development.

Code Review Checklist:

- Assigned task is completed.
- Functionality works correctly.
- Authentication flow works correctly.
- API endpoints return correct responses.
- Dashboard displays correct data.
- No conflicts with other project files.
- Reported issues are fixed before continuing development.

---

## Team Workflow

1. Select the assigned task.
2. Pull the latest updates from the shared GitHub repository.
3. Implement the required functionality on the local machine.
4. Test the implementation locally.
5. Commit the completed work with a clear commit message.
6. Push the updated files to the shared GitHub repository.
7. Review the updated files with the team.
8. Perform integration testing after combining all completed tasks.
9. Conduct a final project review and resolve any remaining issues before submission.

---

# Plan QA Processes

## Testing Strategy

All team members share responsibility for testing and quality assurance throughout the project.

Testing includes:

### Unit Testing

Testing individual functions and modules independently.

Examples:

- Temperature validation functions.
- Threshold checking logic.
- Alert generation logic.
- Login validation logic.
- Sign up validation logic.
- API utility functions.

### Integration Testing

Testing communication between:

- Sign up page and backend API.
- Login page and backend API.
- Log out action and backend API.
- ESP32 monitoring device and MQTT/API communication.
- MQTT/API communication and backend server.
- Backend and database.
- Backend and dashboard.
- Alert logic and notification records.

### Manual Testing

Testing complete user workflows and overall system behavior.

Manual testing includes:

- User sign up.
- User login.
- User logout.
- Dashboard navigation.
- Viewing hourly temperature readings.
- Viewing device status.
- Viewing warning and critical alerts.
- Updating alert status.
- Updating threshold settings.

---

## Testing Tools

### Pytest

Used for backend unit testing.

### Postman

Used to validate API endpoints and API responses.

### Browser Testing

Used to verify dashboard functionality, authentication pages, responsiveness, and user interface behavior.

### MySQL Workbench / Terminal

Used to verify database tables, inserted records, relationships, and test queries.

---

# Project-Specific QA Coverage

### Authentication Flow

Verify that users can sign up, log in, access the dashboard, and log out successfully.

### Role Access Flow

Verify that Owner, Admin, and Inspector users can access the correct dashboard features based on their roles.

### Sensor Monitoring Flow

Verify that temperature readings are received correctly from the ESP32 monitoring device.

### Data Storage Flow

Verify that temperature readings are successfully stored in the database.

### Dashboard Flow

Verify that hourly temperature readings are displayed correctly on the dashboard.

### Alert Flow

Verify that warning and critical alerts are generated based on configured temperature thresholds.

### API Flow

Verify that all API endpoints return accurate and valid data.

### Email Notification Flow

Verify that notification records are created when warning or critical alerts occur.

---

# Manual Critical Flows

### Critical Flow 1

A new user signs up using the Sign Up page.

### Critical Flow 2

A registered user logs in using the Login page.

### Critical Flow 3

The user accesses the dashboard based on the assigned role.

### Critical Flow 4

The ESP32 monitoring device sends an hourly temperature reading.

### Critical Flow 5

The backend server receives and processes the temperature data.

### Critical Flow 6

The processed temperature data is stored in the database.

### Critical Flow 7

The dashboard displays the latest hourly temperature reading.

### Critical Flow 8

A warning alert is generated when the temperature reaches the warning range.

### Critical Flow 9

A critical alert is generated when the temperature reaches or exceeds 50°C.

### Critical Flow 10

The user logs out and returns to the login page.

---

# Development Workflow

1. Complete the assigned task.
2. Test the functionality locally.
3. Commit and push the changes to the shared GitHub repository.
4. Pull the latest project updates.
5. Perform integration testing with the complete system.
6. Record bugs or issues.
7. Fix reported issues.
8. Re-test after fixing.
9. Prepare the final version for submission.

---

# Final Project Validation

1. Verify that all project components work together correctly.
2. Test sign up, login, and log out.
3. Test all required API endpoints.
4. Test database records and relationships.
5. Test dashboard data display.
6. Test temperature threshold alert generation.
7. Test notification records.
8. Re-run the required tests.
9. Fix any remaining issues.
10. Perform final manual testing.
11. Prepare the final version for submission.

---

# Deliverable Section

## SCM Strategy

- Git and GitHub workflow.
- Shared GitHub repository collaboration.
- Commit and push process.
- Pull latest updates before new work.
- Local testing before uploading changes.
- Team code review process.
- Final integration review before submission.

## QA Strategy

- Unit Testing.
- Integration Testing.
- Manual Testing.
- Authentication testing.
- API endpoint testing.
- Database testing.
- Dashboard testing.
- Alert testing.
- Pytest and Postman tools.
- Browser testing.
- Final system validation before project submission.
