# FlexSight Frontend

FlexSight is a React web dashboard for monitoring temperature readings received from an ESP32 connected to a DHT11 sensor. The frontend communicates with the Flask backend to display devices, readings, alerts, users, thresholds, and account settings.

## Features

| Feature | Description |
|---|---|
| Authentication | Username-based sign up, login, and logout |
| Dashboard | Displays system status and temperature information |
| Devices | Displays devices and configurable temperature thresholds |
| Readings | Displays temperature readings and calculated statuses |
| Alerts | Displays warning and critical temperature alerts |
| Users | Supports role-based user management |
| Settings | Supports account and system settings |
| Protected Routes | Restricts pages based on authentication and user role |
| Status Badges | Displays normal, warning, critical, active, and offline states |

## User Roles

| Role | Access |
|---|---|
| Owner | Full system access |
| Admin | Access to assigned administration functions, including Inspector account management |
| Inspector | Dashboard access only |

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface development |
| Vite | Development server and production build |
| React Router | Navigation and protected routes |
| Vitest | Frontend automated testing |
| React Testing Library | React component testing |
| jsdom | Browser environment for automated tests |

## Installation

bash
npm install


## Environment Configuration

Create a .env file inside the frontend directory when a custom backend URL is required:

env
VITE_API_BASE_URL=http://127.0.0.1:5001


The API base URL must not include /api because the frontend API helper adds it automatically.

## Run the Development Server

bash
npm run dev


The local frontend is normally available at:

text
http://localhost:5173


## Available Commands

| Command | Purpose |
|---|---|
| npm run dev | Start the development server |
| npm test | Run all frontend automated tests |
| npm run build | Create the production build |
| npm run preview | Preview the production build locally |

## Automated Tests

| Test File | Coverage | Tests |
|---|---|---:|
| [api.test.js](./test/api.test.js) | Authentication helpers, temperature status, and date handling | 9 |
| [status-badge.test.jsx](./test/status-badge.test.jsx) | StatusBadge text and colors | 13 |
| [protected-route.test.jsx](./test/protected-route.test.jsx) | Authentication redirects and role restrictions | 4 |
| *Total* |  | *26* |

Run the complete test suite:

bash
npm test


Verified result:

text
Test Files  3 passed (3)
Tests       26 passed (26)


## Production Build

bash
npm run build


The generated production files are placed in the dist directory.

## Project Structure

| Path | Purpose |
|---|---|
| src/App.jsx | Application routes |
| src/api.js | API requests and shared helper functions |
| src/components/ | Shared React components |
| src/pages/ | Application pages |
| test/ | Frontend automated tests |
| dist/ | Generated production build |

## Related Links

| Resource | Link |
|---|---|
| Backend Source | [FlexSight Backend](../backend/) |
| Stage 4 Documentation | [Stage 4](../) |
| Production Environment | [FlexSight Production](http://64.227.153.34) |
| Source Repository | [Portfolio Project](https://github.com/rabea14180-max/Portfolio-Project) |
