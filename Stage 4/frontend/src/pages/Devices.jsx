import { useEffect, useState } from "react";
import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDevices() {
      setLoading(true);
      setError("");

      const result = await apiRequest("/dashboard/devices");

      if (result.ok === false) {
        setError(result.data?.message || "Unable to connect to server");
        setLoading(false);
        return;
      }

      setDevices(Array.isArray(result.data) ? result.data : []);
      setLoading(false);
    }

    fetchDevices();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="devices-page">
      <button type="button" className="add-device-bar">
        <span className="add-device-small-icon">+</span>
        <span>Add Device</span>
      </button>

      <div className="card">
        <h2 className="card-title">All Devices</h2>

        {devices.length === 0 ? (
          <p className="muted-text devices-empty-text">No data available</p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th>Last Heartbeat</th>
                  <th>Firmware Version</th>
                </tr>
              </thead>

              <tbody>
                {devices.map((device) => (
                  <tr key={device.device_id}>
                    <td>{device.device_id}</td>
                    <td>
                      <StatusBadge value={device.status} />
                    </td>
                    <td>
                      <StatusBadge value={device.is_active} />
                    </td>
                    <td>{formatDate(device.last_heartbeat)}</td>
                    <td>{device.firmware_version || "—"}</td>
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

export default Devices;
