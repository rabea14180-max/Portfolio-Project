import { useEffect, useState, useCallback } from "react";
import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [employeeName, setEmployeeName] = useState("");

  const fetchAlerts = useCallback(async (employeeName = "") => {
    setLoading(true);
    setError("");

    const query = new URLSearchParams();
    if (employeeName.trim()) query.set("employee_name", employeeName.trim());
    const queryString = query.toString();
    const endpoint = queryString
      ? `/dashboard/alerts?${queryString}`
      : "/dashboard/alerts";

    const result = await apiRequest(endpoint);

    if (!result.ok) {
      setError(result.data?.message || "Unable to connect to server");
      setLoading(false);
      return;
    }

    setAlerts(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  function handleEmployeeSearch(event) {
    event.preventDefault();
    fetchAlerts(employeeName);
  }

  function handleClearEmployeeSearch() {
    setEmployeeName("");
    fetchAlerts("");
  }

  async function updateAlertStatus(alertId, status) {
    setActionLoading(alertId);

    const result = await apiRequest(`/dashboard/alerts/${alertId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    setActionLoading(null);

    if (result.ok && result.data?.success) {
      await fetchAlerts();
      return;
    }

    setError(result.data?.message || "Failed to update alert");
  }

  return (
    <div className="card">
      <h2 className="card-title">All Alerts</h2>

      <form
        className="filter-form"
        onSubmit={handleEmployeeSearch}
        style={{ marginBottom: "24px" }}
      >
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="employee_name">Search by Name</label>
          <input
            id="employee_name"
            type="text"
            value={employeeName}
            onChange={(event) => setEmployeeName(event.target.value)}
            placeholder="Enter employee name"
          />
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">
            Search
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearEmployeeSearch}
          >
            Clear
          </button>
        </div>
      </form>

      {loading ? (
        <LoadingState />
      ) : error && alerts.length === 0 ? (
        <ErrorState message={error} />
      ) : alerts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {error && <div className="alert alert-error">{error}</div>}
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
                  <th>Resolved By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
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
                    <td>{formatDate(alert.triggered_at)}</td>
                    <td>{alert.resolved_by || "—"}</td>
                    <td>
                      <div className="action-buttons">
                        {alert.status === "OPEN" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-warning"
                            disabled={actionLoading === alert.alert_id}
                            onClick={() => updateAlertStatus(alert.alert_id, "ACKNOWLEDGED")}
                          >
                            Acknowledge
                          </button>
                        )}
                        {(alert.status === "OPEN" || alert.status === "ACKNOWLEDGED") && (
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            disabled={actionLoading === alert.alert_id}
                            onClick={() => updateAlertStatus(alert.alert_id, "RESOLVED")}
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Alerts;
