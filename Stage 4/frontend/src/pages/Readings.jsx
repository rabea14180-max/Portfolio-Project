import { useEffect, useState } from "react";
import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Readings() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function getFilterParams() {
    const params = {};

    if (deviceId.trim()) params.device_id = deviceId.trim();
    if (deviceName.trim()) params.device_name = deviceName.trim();
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return params;
  }

  async function fetchReadings(params = {}) {
    setLoading(true);
    setError("");

    const query = new URLSearchParams(params);
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

  useEffect(() => {
    fetchReadings();
  }, []);

  function handleFilterSubmit(event) {
    event.preventDefault();
    fetchReadings(getFilterParams());
  }

  function handleClearFilters() {
    setDeviceId("");
    setDeviceName("");
    setStartDate("");
    setEndDate("");
    fetchReadings();
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

      <div className="card">
        <h2 className="card-title">Temperature Readings</h2>

        <div className="filter-actions" style={{ marginBottom: "24px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEmployeeSearch}
          >
            Search by Name
          </button>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : readings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Device Name</th>
                  <th>Temperature</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                  <th>Name</th>
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
                    <td>{reading.name || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Readings;
