import { Link } from "react-router-dom";

export function FlexSightLogo() {
  return (
    <svg
      viewBox="0 0 520 330"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fsLogoBlue" x1="60" y1="40" x2="440" y2="280">
          <stop offset="0%" stopColor="#4c73d9" />
          <stop offset="50%" stopColor="#79aeef" />
          <stop offset="100%" stopColor="#9dd9f8" />
        </linearGradient>

        <linearGradient id="fsLogoLight" x1="80" y1="60" x2="390" y2="250">
          <stop offset="0%" stopColor="#72b4f3" />
          <stop offset="100%" stopColor="#e3f8ff" />
        </linearGradient>

        <linearGradient id="fsLogoDark" x1="70" y1="40" x2="430" y2="270">
          <stop offset="0%" stopColor="#3156be" />
          <stop offset="100%" stopColor="#486fd0" />
        </linearGradient>

        <radialGradient id="fsLogoCenter">
          <stop offset="0%" stopColor="#e8f9ff" />
          <stop offset="45%" stopColor="#b9e7fa" />
          <stop offset="100%" stopColor="#5c8de0" />
        </radialGradient>
      </defs>

      <path
        d="M48 145C72 84 143 38 230 30C284 25 332 30 367 41C302 39 241 52 187 75C128 100 89 130 65 162C52 179 40 167 48 145Z"
        fill="url(#fsLogoDark)"
      />

      <path
        d="M51 135C82 77 150 43 229 34C279 28 326 32 359 41C299 43 240 57 187 80C129 105 91 134 67 165C53 183 38 163 51 135Z"
        fill="url(#fsLogoBlue)"
      />

      <path
        d="M62 190C78 130 129 88 191 67C242 50 296 47 348 56C300 60 254 75 215 96C164 123 129 158 108 205C99 226 82 226 70 213C63 206 60 198 62 190Z"
        fill="url(#fsLogoLight)"
      />

      <circle cx="270" cy="157" r="72" fill="#3154ba" />
      <circle cx="270" cy="157" r="59" fill="#72b0ec" />
      <circle cx="270" cy="157" r="48" fill="url(#fsLogoCenter)" />

      <rect
        x="247"
        y="134"
        width="46"
        height="46"
        transform="rotate(45 270 157)"
        fill="#111a46"
      />

      <path
        d="M410 48C445 54 472 69 487 91C502 114 502 142 490 168C466 219 401 255 324 275C278 287 233 292 195 288C255 278 315 259 363 230C414 200 446 163 451 126C455 95 442 69 410 48Z"
        fill="url(#fsLogoDark)"
      />

      <path
        d="M405 48C431 53 454 63 470 79C487 96 491 117 485 140C473 186 420 225 351 249C301 267 248 276 199 273C255 261 307 242 350 217C400 188 430 155 435 120C440 89 428 65 405 48Z"
        fill="url(#fsLogoBlue)"
      />

      <path
        d="M205 252C263 242 316 222 358 196C395 173 420 146 435 116C424 156 396 192 354 218C314 243 262 256 205 252Z"
        fill="#d5f4ff"
      />

      <path
        d="M192 286C258 280 323 263 379 237C421 218 455 194 480 167C472 199 445 226 408 248C352 282 274 301 205 296C193 295 184 291 192 286Z"
        fill="url(#fsLogoBlue)"
      />
    </svg>
  );
}

function Landing() {
  return (
    <div className="fs-landing">
      <header className="fs-header">
        <div className="fs-container fs-header-inner">
          <div className="fs-brand">
            <div className="fs-brand-logo">
              <FlexSightLogo />
            </div>
            <span>FlexSight</span>
          </div>

          <Link to="/login" className="fs-header-login">
            Log In
          </Link>
        </div>
      </header>

      <main>
        <section className="fs-hero">
          <div className="fs-container fs-hero-grid">
            <div className="fs-hero-copy">
              <p className="fs-overline">
                TEMPERATURE MONITORING FOR CRITICAL ENVIRONMENTS
              </p>

              <h1>
                Detect temperature risk
                <span> before it becomes a bigger problem.</span>
              </h1>

              <p className="fs-hero-description">
                FlexSight gives businesses real-time visibility into
                temperature conditions and alerts teams when configured
                thresholds are exceeded.
              </p>

              <Link to="/login" className="fs-primary-action">
                View Dashboard
                <span aria-hidden="true">→</span>
              </Link>

              <p className="fs-hero-note">
                Designed for server rooms, warehouses, data centers, and
                temperature-sensitive facilities.
              </p>
            </div>

            <div className="fs-system-visual">
              <div className="fs-system-head">
                <div>
                  <span>LIVE MONITORING</span>
                  <strong>Server Room A</strong>
                </div>

                <div className="fs-online">
                  <span />
                  Online
                </div>
              </div>

              <div className="fs-temp-panel">
                <div>
                  <span>Current temperature</span>
                  <strong>26.9°C</strong>
                </div>

                <span className="fs-alert-badge">CRITICAL</span>
              </div>

              <div className="fs-system-details">
                <div>
                  <span>Device</span>
                  <strong>Device 14</strong>
                </div>

                <div>
                  <span>Sensor</span>
                  <strong>DHT11</strong>
                </div>

                <div>
                  <span>Controller</span>
                  <strong>ESP32</strong>
                </div>
              </div>

              <div className="fs-alert-row">
                <div className="fs-alert-icon">!</div>

                <div>
                  <strong>Temperature threshold exceeded</strong>
                  <span>
                    Critical reading detected from Device 14
                  </span>
                </div>

                <span className="fs-alert-time">Now</span>
              </div>
            </div>
          </div>
        </section>

        <section className="fs-safety">
          <div className="fs-container fs-safety-grid">
            <div className="fs-section-title">
              <p>WHY FLEXSIGHT</p>

              <h2>
                Temperature visibility is part of operational safety.
              </h2>

              <p className="fs-section-description">
                Abnormal heat in a critical space can indicate a condition
                that needs attention. FlexSight keeps temperature readings,
                device activity, and alerts visible so teams can respond
                sooner.
              </p>
            </div>

            <div className="fs-safety-list">
              <article>
                <span>01</span>

                <div>
                  <h3>Continuous monitoring</h3>
                  <p>
                    Temperature readings from connected sensors are sent to
                    the system and available through the web dashboard.
                  </p>
                </div>
              </article>

              <article>
                <span>02</span>

                <div>
                  <h3>Threshold-based alerts</h3>
                  <p>
                    Warning and critical conditions are identified when
                    readings reach configured temperature thresholds.
                  </p>
                </div>
              </article>

              <article>
                <span>03</span>

                <div>
                  <h3>Faster awareness</h3>
                  <p>
                    Alerts and email notifications help bring abnormal
                    temperature conditions to the team's attention.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="fs-process">
          <div className="fs-container">
            <div className="fs-process-heading">
              <p>HOW IT WORKS</p>
              <h2>From the physical sensor to the dashboard.</h2>
            </div>

            <div className="fs-process-flow">
              <article>
                <span className="fs-step-number">01</span>
                <div className="fs-step-dot" />
                <h3>Measure</h3>
                <p>DHT11 measures the temperature.</p>
              </article>

              <article>
                <span className="fs-step-number">02</span>
                <div className="fs-step-dot" />
                <h3>Send</h3>
                <p>ESP32 sends the reading over Wi-Fi.</p>
              </article>

              <article>
                <span className="fs-step-number">03</span>
                <div className="fs-step-dot" />
                <h3>Monitor</h3>
                <p>
                  FlexSight stores and displays readings and device activity.
                </p>
              </article>

              <article>
                <span className="fs-step-number">04</span>
                <div className="fs-step-dot" />
                <h3>Alert</h3>
                <p>
                  The system creates an alert when a configured threshold is
                  reached.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="fs-product">
          <div className="fs-container fs-product-grid">
            <div className="fs-dashboard-window">
              <div className="fs-dashboard-topbar">
                <div className="fs-dashboard-brand">
                  <div className="fs-mini-logo">
                    <FlexSightLogo />
                  </div>
                  <strong>FlexSight</strong>
                </div>

                <span>OWNER</span>
              </div>

              <div className="fs-dashboard-content">
                <div className="fs-dashboard-title">
                  <span>Dashboard</span>
                  <small>System Overview</small>
                </div>

                <div className="fs-dashboard-stats">
                  <div>
                    <span>Latest Temperature</span>
                    <strong>26.9°C</strong>
                  </div>

                  <div>
                    <span>Active Alerts</span>
                    <strong>1</strong>
                  </div>

                  <div>
                    <span>Total Devices</span>
                    <strong>1</strong>
                  </div>
                </div>

                <div className="fs-dashboard-table">
                  <div className="fs-table-heading">
                    <span>Recent Readings</span>
                    <span>Temperature</span>
                    <span>Status</span>
                  </div>

                  <div className="fs-table-row">
                    <strong>Device 14</strong>
                    <strong>26.9°C</strong>
                    <span className="fs-table-critical">Critical</span>
                  </div>

                  <div className="fs-table-row">
                    <strong>Device 14</strong>
                    <strong>26.4°C</strong>
                    <span className="fs-table-warning">Warning</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="fs-product-copy">
              <p>ONE MONITORING VIEW</p>

              <h2>
                Readings, devices, and alerts in one place.
              </h2>

              <p>
                The FlexSight dashboard gives authorized users a central view
                of temperature readings, connected devices, and active
                alerts.
              </p>

              <ul>
                <li>Latest and recent temperature readings</li>
                <li>Connected device status</li>
                <li>Warning and critical alerts</li>
                <li>Email alert notifications</li>
                <li>Role-based user access</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="fs-closing">
          <div className="fs-container fs-closing-inner">
            <div>
              <p>FLEXSIGHT</p>
              <h2>Keep temperature risks visible.</h2>
              <span>
                Monitor critical spaces and respond when conditions require
                attention.
              </span>
            </div>

            <Link to="/login" className="fs-closing-button">
              View Dashboard
            </Link>
          </div>
        </section>
      </main>

      <footer className="fs-footer">
        <div className="fs-container fs-footer-inner">
          <div className="fs-brand fs-brand-footer">
            <div className="fs-brand-logo">
              <FlexSightLogo />
            </div>

            <span>FlexSight</span>
          </div>

          <p>
            IoT Temperature Monitoring & Alert System
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;