import { useEffect, useState } from "react";
import { apiRequest, formatDate, getReadingStatus, getRole } from "../api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Dashboard() {
  const role = getRole();
  const canViewDevicesAndReadings = role === "OWNER" || role === "ADMIN";

  const [devices, setDevices] = useState([]);
  const [readings, setReadings] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      const requests = [apiRequest("/dashboard/alerts")];

      if (canViewDevicesAndReadings) {
        requests.push(
          apiRequest("/dashboard/devices"),
          apiRequest("/dashboard/readings")
        );
      }

      const [alertsRes, devicesRes, readingsRes] = await Promise.all(requests);

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
        devicesRes && Array.isArray(devicesRes.data) ? devicesRes.data : []
      );
      setReadings(
        readingsRes && Array.isArray(readingsRes.data) ? readingsRes.data : []
      );
      setLoading(false);
    }

    fetchData();
  }, [canViewDevicesAndReadings]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const activeAlerts = alerts.filter((a) => a.status === "OPEN").length;
  const criticalAlerts = alerts.filter((a) => a.severity === "CRITICAL").length;
  const recentAlerts = alerts.slice(0, 5);

  const metrics = [
    { label: "Active Alerts", value: activeAlerts },
    { label: "Critical Alerts", value: criticalAlerts },
  ];

  if (canViewDevicesAndReadings) {
    const onlineDevices = devices.filter(
      (d) => String(d.status).toLowerCase() === "online"
    ).length;

    const activeDevices = devices.filter((d) => d.is_active).length;

    const sortedReadings = [...readings].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    const latestReading = sortedReadings[0];

    metrics.unshift(
      { label: "Total Devices", value: devices.length },
      { label: "Online Devices", value: onlineDevices },
      { label: "Active Devices", value: activeDevices }
    );

    metrics.push({
      label: "Latest Temperature",
      value: latestReading ? String(latestReading.temperature) + "°C" : "—",
    });
  }

  const recentReadings = canViewDevicesAndReadings
    ? [...readings]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5)
    : [];

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-tables">
        {canViewDevicesAndReadings && (
          <div className="card">
            <h2 className="card-title">Recent Readings</h2>

            {recentReadings.length === 0 ? (
              <p className="muted-text">No readings available</p>
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
                      <tr key={String(reading.device_id) + "-" + String(reading.timestamp) + "-" + String(index)}>
                        <td>{reading.device_id}</td>
                        <td>{reading.temperature}°C</td>
                        <td>
                          <StatusBadge value={getReadingStatus(reading.temperature)} />
                        </td>
                        <td>{formatDate(reading.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="card">
          <h2 className="card-title">Recent Alerts</h2>

          {recentAlerts.length === 0 ? (
            <p className="muted-text">No alerts available</p>
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
                    <tr key={String(alert.alert_id)}>
                      <td>{alert.alert_id}</td>
                      <td>{alert.device_id}</td>
                      <td>{alert.temperature}°C</td>
                      <td>
                        <StatusBadge value={alert.severity} />
                      </td>
                      <td>
                        <StatusBadge value={alert.status} />
                      </td>
                      <td>{formatDate(alert.triggered_at)}</td>
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
