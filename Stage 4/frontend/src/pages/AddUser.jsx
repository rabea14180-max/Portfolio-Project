import { useState } from "react";
import { apiRequest, getRole, validateUsername } from "../api";

function AddUser() {
  const currentRole = getRole();
  const canCreateAdmin = currentRole === "OWNER";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(canCreateAdmin ? "ADMIN" : "INSPECTOR");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    setLoading(true);

    const endpoint = role === "ADMIN" ? "/users/admin" : "/users/inspector";
    const result = await apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify({ username: username.trim(), email, password }),
    });

    setLoading(false);

    if (result.ok && result.data?.success) {
      setSuccess(result.data.message || "User account created successfully");
      setUsername("");
      setEmail("");
      setPassword("");
      return;
    }

    if (result.status === 403) {
      setError("Unauthorized access");
      return;
    }

    setError(result.data?.message || "Unable to create account");
  }

  return (
    <div className="card settings-card">
      <h2 className="card-title">Add User</h2>
      <p className="settings-description">
        Create an Admin or Inspector account. They belong to your account and
        cannot create accounts of their own.
      </p>

      <form className="settings-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {canCreateAdmin && <option value="ADMIN">ADMIN</option>}
            <option value="INSPECTOR">INSPECTOR</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
