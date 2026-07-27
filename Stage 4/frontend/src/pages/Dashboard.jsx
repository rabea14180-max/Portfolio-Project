import { useEffect, useState } from "react";
import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [readings, setReadings] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchData(showLoading = false) {
    if (showLoading) {
      setLoading(true);
    }

    setError("");

    const [alertsRes, devicesRes, readingsRes] = await Promise.all([
      apiRequest("/dashboard/alerts"),
      apiRequest("/dashboard/devices"),
      apiRequest("/dashboard/readings"),
    ]);

    if (
      !alertsRes.ok ||
      (devicesRes && !devicesRes.ok) ||
      (readingsRes && !readingsRes.ok)
    ) {
      const message =
        alertsRes.data?.message ||
        devicesRes?.data?.message ||
        readingsRes?.data?.message ||
        "Unable to connect to server";

      setError(message);
      setLoading(false);
      return;
    }

    setAlerts(Array.isArray(alertsRes.data) ? alertsRes.data : []);

    setDevices(
      devicesRes && Array.isArray(devicesRes.data)
        ? devicesRes.data
        : []
    );

    setReadings(
      readingsRes && Array.isArray(readingsRes.data)
        ? readingsRes.data
        : []
    );

    setLoading(false);
  }

  useEffect(() => {
    fetchData(true);

    const intervalId = window.setInterval(() => {
      fetchData(false);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const openAlerts = alerts.filter(
    (alert) => String(alert.status).toUpperCase() === "OPEN"
  );

  const activeAlerts = openAlerts.length;

  const criticalAlerts = openAlerts.filter(
    (alert) => String(alert.severity).toUpperCase() === "CRITICAL"
  ).length;

  const latestOpenAlert = [...openAlerts].sort(
    (a, b) => new Date(b.triggered_at) - new Date(a.triggered_at)
  )[0];

  const recentAlerts = [...alerts]
    .sort(
      (a, b) => new Date(b.triggered_at) - new Date(a.triggered_at)
    )
    .slice(0, 5);

  const metrics = [
    { label: "Active Alerts", value: activeAlerts },
    { label: "Critical Alerts", value: criticalAlerts },
  ];

  const onlineDevices = devices.filter(
    (device) => String(device.status).toLowerCase() === "online"
  ).length;

  const activeDevices = devices.filter(
    (device) => device.is_active
  ).length;

  const sortedReadings = [...readings].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const latestReading = sortedReadings[0];

  metrics.unshift(
    { label: "Total Devices", value: devices.length },
    { label: "Online Devices", value: onlineDevices },
    { label: "Active Devices", value: activeDevices }
  );

  metrics.unshift({
    label: "Latest Temperature",
    value: latestReading
      ? `${latestReading.temperature}°C`
      : "—",
    featured: true,
  });

  const recentReadings = sortedReadings.slice(0, 5);

  return (
    <div className="dashboard">
      {latestOpenAlert && (
        <div
          role="alert"
          className={
            String(latestOpenAlert.severity).toUpperCase() === "CRITICAL"
              ? "temperature-alert temperature-alert-critical"
              : "temperature-alert temperature-alert-warning"
          }
        >
          <div>
            <strong>
              {String(latestOpenAlert.severity).toUpperCase() === "CRITICAL"
                ? "🚨 Critical Temperature Alert!"
                : "⚠️ High Temperature Warning!"}
            </strong>

            <p>
              Device {latestOpenAlert.device_id} recorded{" "}
              {latestOpenAlert.temperature}°C.
            </p>

            <small>
              Triggered at {formatDate(latestOpenAlert.triggered_at)}
            </small>
          </div>
        </div>
      )}

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={
              metric.featured ? "metric-card metric-card-featured" : "metric-card"
            }
          >
            <div className="metric-info">
              <span className="metric-label">
                {metric.label}
              </span>

              <span className="metric-value">
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-tables">
        <div className="card">
          <h2 className="card-title">Recent Readings</h2>

          {recentReadings.length === 0 ? (
            <p className="muted-text">
              No readings available
            </p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Device ID</th>
                    <th>Temperature</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>

                <tbody>
                  {recentReadings.map((reading, index) => (
                    <tr
                      key={`${reading.device_id}-${reading.timestamp}-${index}`}
                      className={index === 0 ? "latest-reading-row" : undefined}
                    >
                      <td>{reading.device_id}</td>

                      <td>{reading.temperature}°C</td>

                      <td>
                        <StatusBadge value={reading.status} />
                      </td>

                      <td>{formatDate(reading.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">Recent Alerts</h2>

          {recentAlerts.length === 0 ? (
            <p className="muted-text">
              No alerts available
            </p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Alert ID</th>
                    <th>Device ID</th>
                    <th>Temperature</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Triggered At</th>
                  </tr>
                </thead>

                <tbody>
                  {recentAlerts.map((alert) => (
                    <tr key={alert.alert_id}>
                      <td>{alert.alert_id}</td>

                      <td>{alert.device_id}</td>

                      <td>{alert.temperature}°C</td>

                      <td>
                        <StatusBadge value={alert.severity} />
                      </td>

                      <td>
                        <StatusBadge value={alert.status} />
                      </td>

                      <td>
                        {formatDate(alert.triggered_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;