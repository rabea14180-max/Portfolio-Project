# FlexSight Backend

Flask REST API for the FlexSight temperature monitoring system. The backend receives temperature readings, stores system data, manages authentication and roles, and provides data to the React dashboard.

## Requirements

- Python 3
- pip
- PostgreSQL database

## Setup

Create and activate a Python virtual environment:

bash
python3 -m venv .venv
source .venv/bin/activate


Install the backend dependencies:

bash
python3 -m pip install -r requirements.txt


## Environment Configuration

Create a .env file inside the backend directory and configure the database and application secret:

env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key


Do not commit the .env file or any passwords, database credentials, or authentication tokens.

## Run the Backend

bash
python3 app.py


The frontend currently uses this local API address by default:

text
http://127.0.0.1:5001


## API Health Check

text
GET /api/health


Example:

bash
curl http://127.0.0.1:5001/api/health


## Main API Areas

| Area | Example Endpoint |
|---|---|
| Health | GET /api/health |
| Sign Up | POST /api/auth/signup |
| Login | POST /api/auth/login |
| Logout | POST /api/auth/logout |
| Dashboard | GET /api/dashboard |
| Devices | GET /api/dashboard/devices |
| Readings | GET /api/dashboard/readings |
| Alerts | GET /api/dashboard/alerts |
| Users | GET /api/users |

Protected endpoints require a valid authentication token and enforce Owner, Admin, and Inspector permissions.

## Automated Tests

The backend test suite contains:

| Test Group | Coverage | Tests |
|---|---|---:|
| Temperature Unit Tests | Normal, warning, and critical temperature classification | 5 |
| Production Integration Tests | API health, Owner dashboard, devices, readings, alerts, users, and connected data | 7 |
| *Total* |  | *12* |

Run the complete backend test suite:

bash
python3 flexsight_test.py


The production integration tests request a valid Owner username and password securely at runtime. Credentials are not stored in the test file.

Verified result:

text
Ran 12 tests in 16.538s
OK


## Project Structure

| File | Purpose |
|---|---|
| app.py | Flask application entry point |
| config.py | Application and database configuration |
| models.py | Database models |
| routes.py | API routes and backend logic |
| flexsight_test.py | Unit and production integration tests |
| requirements.txt | Python dependencies |

## Production Environment

The deployed FlexSight application is available at:

[http://64.227.153.34](http://64.227.153.34)

## Related Links

| Resource | Link |
|---|---|
| Frontend Source | [FlexSight Frontend](../frontend/) |
| Stage 4 Documentation | [Stage 4](../) |
| Source Repository | [Portfolio Project](https://github.com/rabea14180-max/Portfolio-Project) |
