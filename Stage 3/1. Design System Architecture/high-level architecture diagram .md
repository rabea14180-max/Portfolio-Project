flowchart LR
    subgraph AUTH["Authentication Layer"]
        SU["Sign Up<br/>Create account"]
        LI["Login<br/>Authenticate user"]
        LO["Log Out<br/>End session"]
    end

    subgraph IoT["IoT Device Layer"]
        S["Temperature Sensor<br/>Measures temperature"]
        E["ESP32 Monitoring Device<br/>Collects one reading every hour"]
    end

    subgraph COM["Communication Layer"]
        C["MQTT / HTTP API<br/>Sends hourly temperature readings"]
    end

    subgraph SERVER["Server Layer"]
        API["Flask Backend API"]
        AUTHAPI["Authentication APIs<br/>/api/signup<br/>/api/login<br/>/api/logout"]
        EP["System API Endpoints"]
        RV["Reading Validation"]
        TC["Threshold Checking"]
        AP["Alert Processing Logic"]
    end

    subgraph DATA["Data Layer"]
        DB["MySQL Database<br/>Users<br/>Devices<br/>Temperature Readings<br/>Alerts<br/>Threshold Settings"]
    end

    subgraph CLIENT["Client Layer"]
        WD["Web Dashboard<br/>HTML, CSS, JavaScript"]
        U["System Users<br/>Owner<br/>Admin<br/>Inspector"]
    end

    U -->|"Sign up / Login"| SU
    SU --> AUTHAPI
    LI --> AUTHAPI
    LO --> AUTHAPI
    AUTHAPI -->|"Create, validate, or end session"| DB
    AUTHAPI -->|"Authenticated access"| WD

    S -->|"Temperature data"| E
    E -->|"Hourly reading"| C
    C -->|"POST /api/readings"| API

    API --> EP
    EP --> RV
    RV --> TC
    TC --> AP

    API -->|"Store readings and alerts"| DB
    DB -->|"Retrieve stored data"| API

    WD -->|"GET /api/readings<br/>GET /api/alerts<br/>GET /api/devices<br/>GET /api/users"| API
    U -->|"View dashboard, devices, readings, alerts, users, and settings"| WD
    WD -->|"Log out action"| LO

    ```

    Architecture Overview

FlexSight is designed as an IoT-based web monitoring platform that follows a layered architecture to keep responsibilities clear, maintainable, and scalable.

The system includes an authentication layer, an IoT device layer, a communication layer, a server layer, a data layer, and a client layer.

The authentication layer allows users to sign up, log in, access the dashboard, and log out. Access to the dashboard depends on the user role: Owner, Admin, or Inspector.

The ESP32 monitoring device collects temperature readings from the temperature sensor once every hour and sends the data to the backend using MQTT or HTTP API communication. The backend validates the received data, stores it in the database, checks temperature thresholds, and triggers warning or critical alerts when abnormal readings are detected.

The web dashboard displays temperature readings, device status, alerts, user information, settings, and historical readings.

System Components
Component	Technology	Description
Authentication	Flask Backend / User Session Logic	Allows users to sign up, log in, access the dashboard, and log out
IoT Device	ESP32 Monitoring Device	Collects temperature readings every hour and sends them to the backend system
Sensor	Temperature Sensor	Measures temperature values from the monitored environment
Frontend	HTML, CSS, JavaScript	Web dashboard used to display readings, alerts, device status, users, settings, and historical data
Backend	Python + Flask	RESTful API server responsible for authentication, receiving readings, validating data, processing alerts, and serving dashboard data
Communication	MQTT / HTTP API	Used to transmit hourly temperature readings from the ESP32 device to the backend system
Database	MySQL Database	Stores users, devices, temperature readings, alerts, threshold settings, and dashboard records
Alert Logic	Threshold Monitoring	Checks readings against normal, warning, and critical temperature thresholds
Architectural Principles
Separation of Concerns

Each layer has a clear responsibility. Authentication manages user access, the ESP32 monitoring device collects readings, the backend processes data and alerts, the database stores records, and the dashboard displays information to users.

Scalability

The architecture allows additional ESP32 monitoring devices and future improvements to be added without changing the overall system structure.

Maintainability

Using a layered structure makes the system easier to update, debug, test, and expand during future development stages.

Reliability

Temperature readings are validated before storage, and abnormal readings trigger alert logic to support quick response.

Security

The authentication flow helps restrict dashboard access to authorized users only. Users can sign up, log in, and log out, while role-based access supports different permissions for Owner, Admin, and Inspector.

Extensibility

The system can later support additional ESP32 monitoring devices, improved authentication rules, configurable thresholds, and summary reports while keeping the MVP structure simple.
