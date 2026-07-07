import { useState } from "react";
import { apiRequest, getRole } from "../api";

function Settings() {
  const role = getRole();
  const [warningThreshold, setWarningThreshold] = useState("");
  const [criticalThreshold, setCriticalThreshold] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    const result = await apiRequest("/dashboard/settings/threshold", {
      method: "PUT",
      body: JSON.stringify({
        warning_threshold: Number(warningThreshold),
        critical_threshold: Number(criticalThreshold),
      }),
    });

    setLoading(false);

    if (result.status === 403) {
      setIsError(true);
      setMessage("Unauthorized access");
      return;
    }

    if (result.ok && result.data?.success) {
      setIsError(false);
      setMessage(result.data.message || "Threshold updated successfully");
      return;
    }

    setIsError(true);
    setMessage(result.data?.message || "Failed to update thresholds");
  }

  if (!["OWNER", "ADMIN"].includes(role)) {
    return (
      <div className="card unauthorized-card">
        <p className="unauthorized-message">
          Unauthorized access. This page is restricted to Owner and Admin users.
        </p>
      </div>
    );
  }

  return (
    <div className="card settings-card">
      <h2 className="card-title">Threshold Settings</h2>
      <p className="settings-description">
        Configure warning and critical temperature thresholds for alert generation.
      </p>

      <form className="settings-form" onSubmit={handleSubmit}>
        {message && (
          <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="warning_threshold">Warning Threshold (°C)</label>
          <input
            id="warning_threshold"
            type="number"
            step="0.1"
            value={warningThreshold}
            onChange={(e) => setWarningThreshold(e.target.value)}
            placeholder="e.g. 45"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="critical_threshold">Critical Threshold (°C)</label>
          <input
            id="critical_threshold"
            type="number"
            step="0.1"
            value={criticalThreshold}
            onChange={(e) => setCriticalThreshold(e.target.value)}
            placeholder="e.g. 50"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Thresholds"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
