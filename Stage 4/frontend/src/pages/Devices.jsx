import { useEffect, useState } from "react";
import { apiRequest, formatDate } from "../api";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

const EMPTY_FORM = {
  name: "",
  ip_address: "",
  location: "",
  warning_threshold: "",
  critical_threshold: "",
};

// Validates the shared Add/Update Device field set. Returns an error
// message, or an object with the parsed numeric threshold values when valid.
function validateDeviceFields(name, ipAddress, location, warningThreshold, criticalThreshold) {
  if (!name || !ipAddress || !location || !warningThreshold || !criticalThreshold) {
    return { error: "All fields are required" };
  }

  const warningValue = Number(warningThreshold);
  const criticalValue = Number(criticalThreshold);

  if (Number.isNaN(warningValue) || Number.isNaN(criticalValue)) {
    return { error: "Warning and Critical thresholds must be valid numbers" };
  }

  if (criticalValue <= warningValue) {
    return { error: "Critical Threshold must be greater than Warning Threshold" };
  }

  return { warningValue, criticalValue };
}

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formIsError, setFormIsError] = useState(false);

  // Sensor Settings: per-row action menu
  const [openMenuId, setOpenMenuId] = useState(null);

  // Sensor Settings: row-level feedback (Update/Delete/Turn On/Turn Off)
  const [rowMessage, setRowMessage] = useState("");
  const [rowIsError, setRowIsError] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // Sensor Settings: Update Device modal (reuses the Add Device form fields)
  const [editingDevice, setEditingDevice] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editIsError, setEditIsError] = useState(false);

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

  useEffect(() => {
    fetchDevices();
  }, []);

  function toggleRowMenu(deviceId) {
    setOpenMenuId((current) => (current === deviceId ? null : deviceId));
  }

  function openEditForm(device) {
    setEditingDevice(device);
    setEditForm({
      name: device.name || "",
      ip_address: device.ip_address || "",
      location: device.location || "",
      warning_threshold:
        device.warning_threshold !== null && device.warning_threshold !== undefined
          ? String(device.warning_threshold)
          : "",
      critical_threshold:
        device.critical_threshold !== null && device.critical_threshold !== undefined
          ? String(device.critical_threshold)
          : "",
    });
    setEditMessage("");
    setEditIsError(false);
    setOpenMenuId(null);
  }

  function closeEditForm() {
    if (editSubmitting) return;
    setEditingDevice(null);
    setEditForm(EMPTY_FORM);
    setEditMessage("");
    setEditIsError(false);
  }

  function handleEditChange(field) {
    return (e) => setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (!editingDevice) return;

    setEditMessage("");
    setEditIsError(false);

    const name = editForm.name.trim();
    const ipAddress = editForm.ip_address.trim();
    const location = editForm.location.trim();

    const validation = validateDeviceFields(
      name,
      ipAddress,
      location,
      editForm.warning_threshold,
      editForm.critical_threshold
    );
    if (validation.error) {
      setEditIsError(true);
      setEditMessage(validation.error);
      return;
    }

    setEditSubmitting(true);

    const result = await apiRequest(`/dashboard/devices/${editingDevice.device_id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        ip_address: ipAddress,
        location,
        warning_threshold: validation.warningValue,
        critical_threshold: validation.criticalValue,
      }),
    });

    setEditSubmitting(false);

    if (result.ok && result.data?.success) {
      setEditingDevice(null);
      setEditForm(EMPTY_FORM);
      setRowIsError(false);
      setRowMessage("Device updated successfully");
      await fetchDevices();
      return;
    }

    setEditIsError(true);
    setEditMessage(result.data?.message || "Failed to update device");
  }

  async function handleDeleteDevice(device) {
    setOpenMenuId(null);

    const confirmed = window.confirm(
      `Delete device "${device.name || device.device_id}"? This will permanently remove the device and its related sensor records. This cannot be undone.`
    );
    if (!confirmed) return;

    setRowMessage("");
    setDeleteLoadingId(device.device_id);

    const result = await apiRequest(`/dashboard/devices/${device.device_id}`, {
      method: "DELETE",
    });

    setDeleteLoadingId(null);

    if (result.ok && result.data?.success) {
      setRowIsError(false);
      setRowMessage("Device deleted successfully");
      await fetchDevices();
      return;
    }

    setRowIsError(true);
    setRowMessage(result.data?.message || "Failed to delete device");
  }

  async function handleToggleActive(device) {
    setOpenMenuId(null);
    setRowMessage("");
    setStatusLoadingId(device.device_id);

    const nextActive = !device.is_active;
    const result = await apiRequest(`/dashboard/devices/${device.device_id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ is_active: nextActive }),
    });

    setStatusLoadingId(null);

    if (result.ok && result.data?.success) {
      setRowIsError(false);
      setRowMessage(nextActive ? "Device turned on successfully" : "Device turned off successfully");
      await fetchDevices();
      return;
    }

    setRowIsError(true);
    setRowMessage(result.data?.message || "Failed to update device status");
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setFormMessage("");
    setFormIsError(false);
  }

  function toggleForm() {
    setFormOpen((open) => {
      if (open) resetForm();
      return !open;
    });
  }

  function handleCancel() {
    resetForm();
    setFormOpen(false);
  }

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormMessage("");
    setFormIsError(false);

    const name = form.name.trim();
    const ipAddress = form.ip_address.trim();
    const location = form.location.trim();
    const warningThreshold = form.warning_threshold;
    const criticalThreshold = form.critical_threshold;

    if (!name || !ipAddress || !location || !warningThreshold || !criticalThreshold) {
      setFormIsError(true);
      setFormMessage("All fields are required");
      return;
    }

    const warningValue = Number(warningThreshold);
    const criticalValue = Number(criticalThreshold);

    if (Number.isNaN(warningValue) || Number.isNaN(criticalValue)) {
      setFormIsError(true);
      setFormMessage("Warning and Critical thresholds must be valid numbers");
      return;
    }

    if (criticalValue <= warningValue) {
      setFormIsError(true);
      setFormMessage("Critical Threshold must be greater than Warning Threshold");
      return;
    }

    setSubmitting(true);

    const result = await apiRequest("/dashboard/devices", {
      method: "POST",
      body: JSON.stringify({
        name,
        ip_address: ipAddress,
        location,
        warning_threshold: warningValue,
        critical_threshold: criticalValue,
      }),
    });

    setSubmitting(false);

    if (result.status === 403) {
      setFormIsError(true);
      setFormMessage("Unauthorized access");
      return;
    }

    if (result.status === 409) {
      setFormIsError(true);
      setFormMessage(result.data?.message || "A device with this IP address already exists");
      return;
    }

    if (result.status === 400) {
      setFormIsError(true);
      setFormMessage(result.data?.message || "Invalid device details");
      return;
    }

    if (result.status === 0) {
      setFormIsError(true);
      setFormMessage(result.data?.message || "Unable to connect to server");
      return;
    }

    if (result.ok && result.data?.success) {
      resetForm();
      setFormOpen(false);
      await fetchDevices();
      return;
    }

    setFormIsError(true);
    setFormMessage(result.data?.message || "Failed to add device");
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="devices-page">
      <div className="card">
        <h2 className="card-title">All Devices</h2>

        {rowMessage && (
          <div className={`alert ${rowIsError ? "alert-error" : "alert-success"} devices-row-alert`}>
            {rowMessage}
          </div>
        )}

        {devices.length === 0 ? (
          <p className="muted-text devices-empty-text">No data available</p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Device Name</th>
                  <th>IP Address</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th>Last Heartbeat</th>
                  <th>Firmware Version</th>
                  <th>Warning Threshold</th>
                  <th>Critical Threshold</th>
                  <th>Sensor Settings</th>
                </tr>
              </thead>

              <tbody>
                {devices.map((device) => (
                  <tr key={device.device_id}>
                    <td>{device.device_id}</td>
                    <td>{device.name || "—"}</td>
                    <td>{device.ip_address || "—"}</td>
                    <td>{device.location || "—"}</td>
                    <td>
                      <StatusBadge value={device.status} />
                    </td>
                    <td>
                      <StatusBadge value={device.is_active} />
                    </td>
                    <td>{formatDate(device.last_heartbeat)}</td>
                    <td>{device.firmware_version || "—"}</td>
                    <td>
                      {device.warning_threshold !== null && device.warning_threshold !== undefined
                        ? `${device.warning_threshold}°C`
                        : "—"}
                    </td>
                    <td>
                      {device.critical_threshold !== null && device.critical_threshold !== undefined
                        ? `${device.critical_threshold}°C`
                        : "—"}
                    </td>
                    <td>
                      <div className="device-actions">
                        <button
                          type="button"
                          className="device-actions-toggle"
                          aria-haspopup="true"
                          aria-expanded={openMenuId === device.device_id}
                          aria-label={`Sensor settings for ${device.name || device.device_id}`}
                          disabled={statusLoadingId === device.device_id || deleteLoadingId === device.device_id}
                          onClick={() => toggleRowMenu(device.device_id)}
                        >
                          {statusLoadingId === device.device_id || deleteLoadingId === device.device_id
                            ? "..."
                            : "⋮"}
                        </button>

                        {openMenuId === device.device_id && (
                          <div className="device-actions-menu" role="menu">
                            <button
                              type="button"
                              className="device-actions-item"
                              role="menuitem"
                              onClick={() => openEditForm(device)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="device-actions-item device-actions-item-danger"
                              role="menuitem"
                              onClick={() => handleDeleteDevice(device)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="device-actions-item"
                              role="menuitem"
                              onClick={() => handleToggleActive(device)}
                            >
                              {device.is_active ? "Turn Off" : "Turn On"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="add-device-toolbar">
        <button
          type="button"
          className="add-device-toggle"
          aria-label="Add device"
          aria-expanded={formOpen}
          onClick={toggleForm}
        >
          +
        </button>
      </div>

      {formOpen && (
        <div className="card add-device-form-card">
          <h2 className="card-title">Add Device</h2>

          <form className="add-device-form" onSubmit={handleSubmit}>
            {formMessage && (
              <div className={`alert ${formIsError ? "alert-error" : "alert-success"}`}>
                {formMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="device_name">Device Name</label>
              <input
                id="device_name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="device_ip_address">IP Address</label>
              <input
                id="device_ip_address"
                type="text"
                value={form.ip_address}
                onChange={handleChange("ip_address")}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="device_location">Location</label>
              <input
                id="device_location"
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="device_warning_threshold">Warning Threshold (°C)</label>
              <input
                id="device_warning_threshold"
                type="number"
                step="0.1"
                value={form.warning_threshold}
                onChange={handleChange("warning_threshold")}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="device_critical_threshold">Critical Threshold (°C)</label>
              <input
                id="device_critical_threshold"
                type="number"
                step="0.1"
                value={form.critical_threshold}
                onChange={handleChange("critical_threshold")}
                required
              />
            </div>

            <div className="add-device-form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Adding..." : "Add Device"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {editingDevice && (
        <div className="modal-overlay" onClick={closeEditForm}>
          <div
            className="card add-device-form-card modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="card-title">Update Device</h2>

            <form className="add-device-form" onSubmit={handleEditSubmit}>
              {editMessage && (
                <div className={`alert ${editIsError ? "alert-error" : "alert-success"}`}>
                  {editMessage}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="edit_device_name">Device Name</label>
                <input
                  id="edit_device_name"
                  type="text"
                  value={editForm.name}
                  onChange={handleEditChange("name")}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_device_ip_address">IP Address</label>
                <input
                  id="edit_device_ip_address"
                  type="text"
                  value={editForm.ip_address}
                  onChange={handleEditChange("ip_address")}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_device_location">Location</label>
                <input
                  id="edit_device_location"
                  type="text"
                  value={editForm.location}
                  onChange={handleEditChange("location")}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_device_warning_threshold">Warning Threshold (°C)</label>
                <input
                  id="edit_device_warning_threshold"
                  type="number"
                  step="0.1"
                  value={editForm.warning_threshold}
                  onChange={handleEditChange("warning_threshold")}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit_device_critical_threshold">Critical Threshold (°C)</label>
                <input
                  id="edit_device_critical_threshold"
                  type="number"
                  step="0.1"
                  value={editForm.critical_threshold}
                  onChange={handleEditChange("critical_threshold")}
                  required
                />
              </div>

              <div className="add-device-form-actions">
                <button type="submit" className="btn btn-primary" disabled={editSubmitting}>
                  {editSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditForm}
                  disabled={editSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Devices;
