# Sequence Diagrams / Use Cases

## Use Case 1: User Sign Up

### Description

A new user enters account information through the FlexSight web dashboard. The Flask Backend API receives the sign up request, validates the user data, stores the new user account in the SQL database, and returns the account creation result.

```mermaid
sequenceDiagram
    actor User as User<br/>(Owner / Admin / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API
    participant DB as SQL Database

    User->>Dashboard: Enter sign up information
    Dashboard->>API: Send sign up request
    API->>DB: Check if email already exists
    DB-->>API: Return email availability
    API->>DB: Store new user account
    DB-->>API: Confirm account creation
    API-->>Dashboard: Sign up result
    Dashboard-->>User: Account created / error message
```


### Components Involved

- User
- Web Dashboard
- Flask Backend API
- SQL Database

---

## Use Case 2: User Login

### Description

The user enters login credentials through the FlexSight web dashboard. The Flask Backend API validates the credentials against the SQL database and returns the authentication result based on the user role.

```mermaid
sequenceDiagram
    actor User as User<br/>(Owner / Admin / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API
    participant DB as SQL Database

    User->>Dashboard: Enter email and password
    Dashboard->>API: Send login request
    API->>DB: Validate user credentials
    DB-->>API: Return user record and role
    API-->>Dashboard: Authentication result
    Dashboard-->>User: Access granted / denied
```


### Components Involved

- User
- Web Dashboard
- Flask Backend API
- SQL Database

---

## Use Case 3: Hourly Temperature Monitoring and Alert Generation

### Description

The temperature sensor reads temperature data once every hour. The ESP32 Monitoring Device sends the hourly reading to the Flask Backend API through MQTT or HTTP API. The backend stores the reading, checks the temperature threshold, and creates an alert if the reading reaches the warning or critical range.

```mermaid
sequenceDiagram
    participant Sensor as Temperature Sensor
    participant ESP32 as ESP32 Monitoring Device
    participant Comm as MQTT / HTTP API
    participant API as Flask Backend API
    participant DB as SQL Database
    participant Email as Email Alert Service
    actor Users as Responsible Users<br/>(Owner / Admin / Inspector)

    Sensor->>ESP32: Read temperature once every hour
    ESP32->>Comm: Send hourly temperature reading
    Comm->>API: POST /api/readings
    API->>DB: Store temperature reading
    API->>API: Validate reading and check threshold

    alt Temperature below 45°C
        API-->>DB: Store normal status only
    else Temperature 45°C to 49°C
        API->>DB: Create warning alert
        API->>Email: Send warning email notification
        Email-->>Users: Notify responsible users
    else Temperature 50°C or above
        API->>DB: Create critical alert
        API->>Email: Send critical email notification
        Email-->>Users: Notify responsible users
    end
```


### Components Involved

- Temperature Sensor
- ESP32 Monitoring Device
- MQTT / HTTP API
- Flask Backend API
- SQL Database
- Email Alert Service
- Responsible Users

---

## Use Case 4: View Latest Hourly Readings on Dashboard

### Description

An Owner, Admin, or Inspector opens the dashboard to view the latest hourly temperature readings. The dashboard requests the stored readings from the Flask Backend API, and the API retrieves the data from the SQL database.

```mermaid
sequenceDiagram
    actor User as User<br/>(Owner / Admin / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API
    participant DB as SQL Database

    User->>Dashboard: Open readings dashboard
    Dashboard->>API: Request latest hourly readings
    API->>DB: Fetch temperature readings and device status
    DB-->>API: Return hourly readings
    API-->>Dashboard: Send readings and alert status
    Dashboard-->>User: Display hourly readings, device status, and alerts
```


### Components Involved

- User
- Web Dashboard
- Flask Backend API
- SQL Database

---

## Use Case 5: User Log Out

### Description

A logged-in user clicks the log out button from the FlexSight dashboard. The web dashboard sends a log out request to the Flask Backend API, the session is ended, and the user is redirected back to the login page.

```mermaid
sequenceDiagram
    actor User as User<br/>(Owner / Admin / Inspector)
    participant Dashboard as Web Dashboard
    participant API as Flask Backend API

    User->>Dashboard: Click log out
    Dashboard->>API: Send log out request
    API-->>Dashboard: Confirm session ended
    Dashboard-->>User: Redirect to login page
```


### Components Involved

- User
- Web Dashboard
- Flask Backend API

---

## Summary of Key Use Cases

| Use Case | Main Purpose |
|---|---|
| User Sign Up | Create a new user account in the FlexSight system. |
| User Login | Authenticate users and grant system access based on role. |
| Hourly Temperature Monitoring & Alert Generation | Collect hourly temperature readings, check thresholds, and create alerts when abnormal temperatures are detected. |
| View Latest Hourly Readings | Display hourly temperature readings, device status, and alert status on the dashboard. |
| User Log Out | End the user session and return to the login page. |
