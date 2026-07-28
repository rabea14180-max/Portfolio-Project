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
      localStorage.setItem("flexsight_username", username);

      navigate("/dashboard");
      return;
    }

    setError(result.data?.message || "Invalid username or password");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-brand-header">

            <div className="auth-logo">
              <svg
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="FlexSight logo"
                role="img"
              >
                <defs>
                  <linearGradient
                    id="auth-ring-gradient"
                    x1="8"
                    y1="56"
                    x2="56"
                    y2="8"
                  >
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="55%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>

                  <linearGradient
                    id="auth-temperature-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f9a8d4" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>

                <path
                  d="M51 48A25 25 0 1 1 54 20"
                  fill="none"
                  stroke="url(#auth-ring-gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                <circle
                  cx="54"
                  cy="20"
                  r="3"
                  fill="#22d3ee"
                />

                <g transform="translate(0 -5)">
                  <path
                    d="
                      M32 18
                      A5 5 0 0 1 37 23
                      V38
                      A9 9 0 1 1 27 38
                      V23
                      A5 5 0 0 1 32 18Z
                    "
                    fill="none"
                    stroke="#e0e7ff"
                    strokeWidth="3"
                  />

                  <path
                    d="M32 25V42"
                    stroke="url(#auth-temperature-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="32"
                    cy="43"
                    r="5"
                    fill="url(#auth-temperature-gradient)"
                  />
                </g>

                <path
                  d="M43 29V35 M47 26V38 M51 30V34"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="auth-brand-text">
              <h1 className="auth-title">FlexSight</h1>

              <p className="auth-tagline">
                MONITOR · INSIGHT · ALERT
              </p>
            </div>

          </div>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <h2 className="auth-form-title">
            Sign In
          </h2>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="auth-link"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;