import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-brand">
          <div className="sidebar-logo">
            <svg
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="FlexSight logo"
              role="img"
            >
              <defs>
                <linearGradient
                  id="landing-flexsight-gradient"
                  x1="8"
                  y1="56"
                  x2="56"
                  y2="8"
                >
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="45%" stopColor="#8b5cf6" />
                  <stop offset="75%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>

                <linearGradient
                  id="landing-temperature-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>

              <path
                d="M51 48A25 25 0 1 1 54 20"
                fill="none"
                stroke="url(#landing-flexsight-gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <circle cx="54" cy="20" r="3" fill="#22d3ee" />

              <g transform="translate(0 -5)">
                <path
                  d="M32 18
                     A5 5 0 0 1 37 23
                     V38
                     A9 9 0 1 1 27 38
                     V23
                     A5 5 0 0 1 32 18Z"
                  fill="none"
                  stroke="#e0e7ff"
                  strokeWidth="3"
                />

                <path
                  d="M32 25V42"
                  stroke="url(#landing-temperature-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle
                  cx="32"
                  cy="43"
                  r="5"
                  fill="url(#landing-temperature-gradient)"
                />
              </g>

              <path
                d="M43 29V35 M47 26V38 M51 30V34"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span>FlexSight</span>
        </div>

        <Link to="/login" className="landing-login-btn">
          Log In
        </Link>
      </header>

      <main className="landing-hero">
        <section className="landing-content">
          <p className="landing-badge">
            Temperature Monitoring System
          </p>

          <h1>
            Monitor Temperature.
            <br />
            Respond to Changes.
          </h1>

          <p className="landing-description">
            FlexSight connects an ESP32 and DHT11 sensor to a web
            dashboard for viewing temperature readings, monitoring
            devices, and managing threshold alerts.
          </p>

          <div className="landing-actions">
            <Link to="/signup" className="landing-primary-btn">
              Sign Up
            </Link>

            <Link to="/login" className="landing-secondary-btn">
              Log In
            </Link>
          </div>
        </section>

        <section
          className="landing-visual"
          aria-label="FlexSight system preview"
        >
          <div className="sensor-card">
            <span className="sensor-status">
              System Preview
            </span>

            <div className="sensor-temp">
              <span>Example Reading</span>
              <strong>19.0°C</strong>
            </div>

            <div className="sensor-details">
              <div>
                <span>Device</span>
                <strong>ESP32</strong>
              </div>

              <div>
                <span>Sensor</span>
                <strong>DHT11</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section id="features" className="landing-features">
        <div>
          <h3>Temperature Readings</h3>
          <p>
            View readings received from connected ESP32 devices.
          </p>
        </div>

        <div>
          <h3>Threshold Alerts</h3>
          <p>
            Track alerts when temperature exceeds the configured limit.
          </p>
        </div>

        <div>
          <h3>Dashboard Access</h3>
          <p>
            Manage devices, readings, alerts, and users based on role.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
