import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, clearAuth, getRole } from "../api";

function Settings() {
  const navigate = useNavigate();
  const role = getRole();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeMessage, setChangeMessage] = useState("");
  const [changeIsError, setChangeIsError] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleChangePassword(e) {
    e.preventDefault();
    setChangeMessage("");
    setChangeIsError(false);

    if (newPassword.length < 8) {
      setChangeIsError(true);
      setChangeMessage("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangeIsError(true);
      setChangeMessage("New password and confirmation do not match");
      return;
    }

    setChangeLoading(true);
    const result = await apiRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
    setChangeLoading(false);

    if (!result.ok || !result.data?.success) {
      setChangeIsError(true);
      setChangeMessage(result.data?.message || "Unable to change password");
      return;
    }

    setChangeMessage("Password changed successfully. Redirecting to sign in...");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    window.setTimeout(() => {
      clearAuth();
      navigate("/login", { replace: true });
    }, 1200);
  }

  async function handleDeleteAccount(e) {
    e.preventDefault();
    setDeleteMessage("");

    const ownerWarning =
      "Deleting an Owner account permanently deletes its dashboard, users, devices, readings, alerts, and settings. This cannot be undone.";
    const memberWarning = "Deleting your account is permanent and cannot be undone.";

    if (!window.confirm(role === "OWNER" ? ownerWarning : memberWarning)) return;

    setDeleteLoading(true);
    const result = await apiRequest("/auth/account", {
      method: "DELETE",
      body: JSON.stringify({ current_password: deletePassword }),
    });
    setDeleteLoading(false);

    if (!result.ok || !result.data?.success) {
      setDeleteMessage(result.data?.message || "Unable to delete account");
      return;
    }

    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <div className="security-settings">
      <div className="card settings-card">
        <h2 className="card-title">Change Password</h2>
        <p className="settings-description">
          Update your password. You will need to sign in again after saving.
        </p>

        <form className="settings-form" onSubmit={handleChangePassword}>
          {changeMessage && (
            <div className={`alert ${changeIsError ? "alert-error" : "alert-success"}`}>
              {changeMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="current_password">Current Password</label>
            <input
              id="current_password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password">New Password</label>
            <input
              id="new_password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm New Password</label>
            <input
              id="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={changeLoading}>
            {changeLoading ? "Saving..." : "Save Changes"}
          </button>

          <Link to="/forgot-password" className="settings-forgot-link">
            Forgot your password?
          </Link>
        </form>
      </div>

      <div className="card settings-card danger-zone">
        <h2 className="card-title danger-title">Delete Account</h2>
        <p className="settings-description">
          {role === "OWNER"
            ? "Permanently delete your account and all dashboard data, users, devices, readings, and alerts."
            : "Permanently delete your FlexSight account."}
        </p>

        <form className="settings-form" onSubmit={handleDeleteAccount}>
          {deleteMessage && <div className="alert alert-error">{deleteMessage}</div>}

          <div className="form-group">
            <label htmlFor="delete_password">Current Password</label>
            <input
              id="delete_password"
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger" disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
