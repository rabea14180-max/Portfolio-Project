import { useEffect, useState } from "react";
import { apiRequest, formatDate, getReadingStatus } from "../api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Readings() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function fetchReadings(params = {}) {
    setLoading(true);
    setError("");

    const query = new URLSearchParams();
    if (params.device_id) query.append("device_id", params.device_id);
    if (params.start_date) query.append("start_date", params.start_date);
    if (params.end_date) query.append("end_date", params.end_date);

    const queryString = query.toString();
    const endpoint = queryString ? `/dashboard/readings?${queryString}` : "/dashboard/readings";

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

  function handleFilterSubmit(e) {
    e.preventDefault();
    const params = {};
    if (deviceId.trim()) params.device_id = deviceId.trim();
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    fetchReadings(params);
  }

  function handleClearFilters() {
    setDeviceId("");
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
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="e.g. 1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClearFilters}>
              Clear
            </button>
          </div>
        </form>
      </div>

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
                  <th>Temperature</th>
                  <th>Calculated Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((reading, index) => (
                  <tr key={`${reading.device_id}-${reading.timestamp}-${index}`}>
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
        </div>
      )}
    </div>
  );
}

export default Readings;
