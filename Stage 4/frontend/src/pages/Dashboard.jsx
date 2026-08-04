import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

const ALERT_THRESHOLD = 20;

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

    const [alertsRes, devicesRes, readingsRes] =
      await Promise.all([
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

    setAlerts(
      Array.isArray(alertsRes.data)
        ? alertsRes.data
        : []
    );

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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const openAlerts = alerts.filter(
    (alert) =>
      String(alert.status).toUpperCase() === "OPEN"
  );

  const activeAlerts = openAlerts.length;

  const criticalAlerts = openAlerts.filter(
    (alert) =>
      String(alert.severity).toUpperCase() ===
      "CRITICAL"
  ).length;

  const latestOpenAlert = [...openAlerts].sort(
    (a, b) =>
      new Date(b.triggered_at) -
      new Date(a.triggered_at)
  )[0];

  const recentAlerts = [...alerts]
    .sort(
      (a, b) =>
        new Date(b.triggered_at) -
        new Date(a.triggered_at)
    )
    .slice(0, 5);

  const onlineDevices = devices.filter(
    (device) =>
      String(device.status).toLowerCase() === "online"
  ).length;

  const activeDevices = devices.filter(
    (device) => device.is_active
  ).length;

  const sortedReadings = [...readings].sort(
    (a, b) =>
      new Date(b.timestamp) -
      new Date(a.timestamp)
  );

  const latestReading = sortedReadings[0];

  const metrics = [
    {
      label: "Latest Temperature",
      value: latestReading
        ? `${latestReading.temperature}°C`
        : "—",
      featured: true,
    },
    {
      label: "Total Devices",
      value: devices.length,
    },
    {
      label: "Online Devices",
      value: onlineDevices,
    },
    {
      label: "Active Devices",
      value: activeDevices,
    },
    {
      label: "Active Alerts",
      value: activeAlerts,
    },
    {
      label: "Critical Alerts",
      value: criticalAlerts,
    },
  ];

  const recentReadings = sortedReadings.slice(0, 5);

  const latestAlertSeverity = latestOpenAlert
    ? String(
        latestOpenAlert.severity
      ).toUpperCase()
    : "";

  const chartData = [...readings]
    .filter(
      (reading) =>
        reading.timestamp &&
        reading.temperature !== null &&
        reading.temperature !== undefined &&
        !Number.isNaN(Number(reading.temperature))
    )
    .sort(
      (a, b) =>
        new Date(a.timestamp) -
        new Date(b.timestamp)
    )
    .slice(-20)
    .map((reading) => ({
      timestamp: reading.timestamp,
      temperature: Number(reading.temperature),
      deviceId: reading.device_id,
      time: new Date(
        reading.timestamp
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  const xAxisInterval =
    chartData.length > 6
      ? Math.max(
          Math.ceil(chartData.length / 5) - 1,
          0
        )
      : 0;

  return (
    <div className="dashboard">
      {latestOpenAlert && (
        <div
          role="alert"
          className={
            latestAlertSeverity === "CRITICAL"
              ? "temperature-alert temperature-alert-critical"
              : "temperature-alert temperature-alert-warning"
          }
        >
          <div className="temperature-alert-icon">
            {latestAlertSeverity === "CRITICAL"
              ? "!"
              : "⚠"}
          </div>

          <div className="temperature-alert-content">
            <div className="temperature-alert-header">
              <div className="temperature-alert-heading">
                <span className="temperature-alert-label">
                  {latestAlertSeverity === "CRITICAL"
                    ? "Critical Alert"
                    : "Temperature Warning"}
                </span>

                <h3 className="temperature-alert-title">
                  Temperature threshold exceeded
                </h3>
              </div>

              <div className="temperature-alert-value">
                {latestOpenAlert.temperature}°C
              </div>
            </div>

            <div className="temperature-alert-details">
              <span>
                Device {latestOpenAlert.device_id}
              </span>

              <span className="temperature-alert-dot">
                •
              </span>

              <span>
                {formatDate(
                  latestOpenAlert.triggered_at
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={
              metric.featured
                ? "metric-card metric-card-featured"
                : "metric-card"
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

      <div className="card temperature-chart-card">
        <div className="temperature-chart-header">
          <div>
            <h2 className="card-title">
              Today&apos;s Temperature
            </h2>

            <p className="temperature-chart-subtitle">
              Live temperature readings
            </p>
          </div>
        </div>

        {chartData.length === 0 ? (
          <p className="muted-text">
            No readings available for the chart
          </p>
        ) : (
          <div className="temperature-chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient
                    id="temperatureAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#67e8f9"
                      stopOpacity={0.18}
                    />

                    <stop
                      offset="100%"
                      stopColor="#67e8f9"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="temperatureLineGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop
                      offset="0%"
                      stopColor="#818cf8"
                    />

                    <stop
                      offset="50%"
                      stopColor="#67e8f9"
                    />

                    <stop
                      offset="100%"
                      stopColor="#22d3ee"
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="rgba(148, 163, 184, 0.14)"
                />

                <XAxis
                  dataKey="time"
                  interval={xAxisInterval}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={{
                    stroke:
                      "rgba(148, 163, 184, 0.18)",
                  }}
                  tickLine={false}
                  minTickGap={55}
                />

                <YAxis
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={42}
                  allowDecimals
                  domain={[
                    (dataMin) =>
                      Math.floor(
                        Math.min(
                          Number(dataMin) - 1,
                          ALERT_THRESHOLD - 1
                        )
                      ),
                    (dataMax) =>
                      Math.ceil(
                        Math.max(
                          Number(dataMax) + 1,
                          ALERT_THRESHOLD + 1
                        )
                      ),
                  ]}
                  tickFormatter={(value) =>
                    `${value}°`
                  }
                />

                <ReferenceLine
                  y={ALERT_THRESHOLD}
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="7 7"
                  label={{
                    value: "20°C Alert threshold",
                    position: "insideBottomRight",
                    fill: "#f87171",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke:
                      "rgba(103, 232, 249, 0.38)",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  contentStyle={{
                    background: "#0f1f33",
                    border:
                      "1px solid rgba(103, 232, 249, 0.22)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    boxShadow:
                      "0 12px 30px rgba(0, 0, 0, 0.28)",
                  }}
                  labelStyle={{
                    color: "#94a3b8",
                    marginBottom: "6px",
                  }}
                  formatter={(value) => [
                    `${Number(value).toFixed(1)}°C`,
                    "Temperature",
                  ]}
                  labelFormatter={(_, payload) => {
                    const reading =
                      payload?.[0]?.payload;

                    if (!reading) {
                      return "";
                    }

                    return `Device ${
                      reading.deviceId
                    } · ${formatDate(
                      reading.timestamp
                    )}`;
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature"
                  stroke="url(#temperatureLineGradient)"
                  strokeWidth={2.5}
                  fill="url(#temperatureAreaGradient)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#22d3ee",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  isAnimationActive
                  animationDuration={700}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="dashboard-tables">
        <div className="card">
          <h2 className="card-title">
            Recent Readings
          </h2>

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
                  {recentReadings.map(
                    (reading, index) => (
                      <tr
                        key={`${reading.device_id}-${reading.timestamp}-${index}`}
                        className={
                          index === 0
                            ? "latest-reading-row"
                            : undefined
                        }
                      >
                        <td>
                          {reading.device_id}
                        </td>

                        <td>
                          {reading.temperature}°C
                        </td>

                        <td>
                          <StatusBadge
                            value={reading.status}
                          />
                        </td>

                        <td>
                          {formatDate(
                            reading.timestamp
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">
            Recent Alerts
          </h2>

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

                      <td>
                        {alert.temperature}°C
                      </td>

                      <td>
                        <StatusBadge
                          value={alert.severity}
                        />
                      </td>

                      <td>
                        <StatusBadge
                          value={alert.status}
                        />
                      </td>

                      <td>
                        {formatDate(
                          alert.triggered_at
                        )}
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