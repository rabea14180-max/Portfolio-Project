import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (result.ok && result.data?.success) {
      localStorage.setItem("flexsight_token", result.data.token);
      localStorage.setItem("flexsight_role", result.data.role);
      navigate("/dashboard");
      return;
    }

    setError(result.data?.message || "Invalid username or password");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">FS</div>
          <h1 className="auth-title">FlexSight</h1>
          <p className="auth-subtitle">Temperature Monitoring & Alert System</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Sign In</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
