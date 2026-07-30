import { useEffect, useState } from "react";
import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Readings() {
  const [readings, setReadings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(false);
  const [error, setError] = useState("");
  const [activityError, setActivityError] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  async function fetchReadings(params = {}) {
    setLoading(true);
    setError("");

    const query = new URLSearchParams();

    if (params.device_id) query.append("device_id", params.device_id);
    if (params.device_name) query.append("device_name", params.device_name);
    if (params.start_date) query.append("start_date", params.start_date);
    if (params.end_date) query.append("end_date", params.end_date);

    const queryString = query.toString();
    const endpoint = queryString
      ? `/dashboard/readings?${queryString}`
      : "/dashboard/readings";

    const result = await apiRequest(endpoint);

    if (!result.ok) {
      setError(result.data?.message || "Unable to connect to server");
      setLoading(false);
      return;
    }

    setReadings(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  }

  async function fetchEmployeeActivity(name = "") {
    setActivityLoading(true);
    setActivityError("");

    const query = new URLSearchParams();

    if (name.trim()) {
      query.append("employee_name", name.trim());
    }

    const queryString = query.toString();
    const endpoint = queryString
      ? `/dashboard/employee-activity?${queryString}`
      : "/dashboard/employee-activity";

    const result = await apiRequest(endpoint);

    if (!result.ok) {
      setActivityError(
        result.data?.message || "Unable to load employee activity"
      );
      setActivityLoading(false);
      return;
    }

    setActivities(Array.isArray(result.data) ? result.data : []);
    setActivityLoading(false);
  }

  useEffect(() => {
    fetchReadings();
    fetchEmployeeActivity();
  }, []);

  function handleFilterSubmit(event) {
    event.preventDefault();

    const params = {};

    if (deviceId.trim()) params.device_id = deviceId.trim();
    if (deviceName.trim()) params.device_name = deviceName.trim();
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    fetchReadings(params);
  }

  function handleEmployeeSubmit(event) {
    event.preventDefault();
    fetchEmployeeActivity(employeeName);
  }

  function handleClearFilters() {
    setDeviceId("");
    setDeviceName("");
    setStartDate("");
    setEndDate("");
    fetchReadings();
  }

  function handleClearEmployee() {
    setEmployeeName("");
    fetchEmployeeActivity();
  }

  return (
    <div>
      <div className="card filter-card">
        <h2 className="card-title">Filter Readings</h2>

        <form className="filter-form" onSubmit={handleFilterSubmit}>
          <div className="form-group">
            <label htmlFor="device_id">Device ID</label>
            <input
              id="device_id"
              type="number"
              value={deviceId}
              onChange={(event) => setDeviceId(event.target.value)}
              placeholder="e.g. 1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="device_name">Device Name</label>
            <input
              id="device_name"
              type="text"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
              placeholder="e.g. Server Room Sensor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="card filter-card">
        <h2 className="card-title">Filter Employee Activity</h2>

        <form className="filter-form" onSubmit={handleEmployeeSubmit}>
          <div className="form-group">
            <label htmlFor="employee_name">Employee Name</label>
            <input
              id="employee_name"
              type="text"
              value={employeeName}
              onChange={(event) => setEmployeeName(event.target.value)}
              placeholder="Search by employee name"
            />
          </div>

          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">
              Search
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearEmployee}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {activityLoading ? (
        <LoadingState />
      ) : activityError ? (
        <ErrorState message={activityError} />
      ) : activities.length === 0 ? (
        <div className="card">
          <p>No employee activity found.</p>
        </div>
      ) : (
        <div className="card">
          <h2 className="card-title">Employee Activity Records</h2>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>Alert ID</th>
                  <th>Device ID</th>
                  <th>Date and Time</th>
                </tr>
              </thead>

              <tbody>
                {activities.map((activity, index) => (
                  <tr
                    key={`${activity.employee_name}-${activity.action}-${activity.timestamp}-${index}`}
                  >
                    <td>{activity.employee_name}</td>
                    <td>
                      <StatusBadge value={activity.role} />
                    </td>
                    <td>{activity.action}</td>
                    <td>{activity.details}</td>
                    <td>{activity.alert_id || "—"}</td>
                    <td>{activity.device_id || "—"}</td>
                    <td>
                      {activity.timestamp
                        ? formatDate(activity.timestamp)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : readings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="card">
          <h2 className="card-title">Temperature Readings</h2>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Device Name</th>
                  <th>Temperature</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {readings.map((reading, index) => (
                  <tr
                    key={`${reading.device_id}-${reading.timestamp}-${index}`}
                  >
                    <td>{reading.device_id}</td>
                    <td>{reading.device_name || "—"}</td>
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
        </div>
      )}
    </div>
  );
}

export default Readings;
