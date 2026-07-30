import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, clearAuth, getRole, getUsername, setUsername as persistUsername, validatePassword, validateUsername } from "../api";

function Settings() {
  const navigate = useNavigate();
  const role = getRole();
  const [username, setUsernameField] = useState(getUsername() || "");
  const [usernamePassword, setUsernamePassword] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameIsError, setUsernameIsError] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeMessage, setChangeMessage] = useState("");
  const [changeIsError, setChangeIsError] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleChangeUsername(e) {
    e.preventDefault();
    setUsernameMessage("");
    setUsernameIsError(false);

    const usernameError = validateUsername(username);
    if (usernameError) {
      setUsernameIsError(true);
      setUsernameMessage(usernameError);
      return;
    }

    if (username.trim() === getUsername()) {
      setUsernameIsError(true);
      setUsernameMessage("New username must be different");
      return;
    }

    setUsernameLoading(true);
    const result = await apiRequest("/auth/change-username", {
      method: "POST",
      body: JSON.stringify({
        current_password: usernamePassword,
        new_username: username.trim(),
      }),
    });
    setUsernameLoading(false);

    if (!result.ok || !result.data?.success) {
      setUsernameIsError(true);
      setUsernameMessage(result.data?.message || "Unable to change username");
      return;
    }

    persistUsername(result.data.username);
    setUsernameField(result.data.username);
    setUsernamePassword("");
    setUsernameMessage("Username changed successfully");
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setChangeMessage("");
    setChangeIsError(false);

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setChangeIsError(true);
      setChangeMessage(passwordError);
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
        <h2 className="card-title">Change Username</h2>
        <p className="settings-description">
          Update your username. You will keep using your current password to sign in.
        </p>

        <form className="settings-form" onSubmit={handleChangeUsername}>
          {usernameMessage && (
            <div className={`alert ${usernameIsError ? "alert-error" : "alert-success"}`}>
              {usernameMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsernameField(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username_current_password">Current Password</label>
            <input
              id="username_current_password"
              type="password"
              value={usernamePassword}
              onChange={(e) => setUsernamePassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={usernameLoading}>
            {usernameLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

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
        </form>
      </div>

      {role !== "INSPECTOR" && (
        <div className="card settings-card danger-zone">
          <h2 className="card-title danger-title">Delete Account</h2>

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
      )}
    </div>
  );
}

export default Settings;
