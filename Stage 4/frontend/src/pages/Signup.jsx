import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  apiRequest,
  validatePassword,
  validateUsername,
} from "../api";
import { FlexSightLogo } from "./Landing";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    const result = await apiRequest("/auth/register-owner", {
      method: "POST",
      body: JSON.stringify({
        username: username.trim(),
        email,
        password,
      }),
    });

    setLoading(false);

    if (result.ok && result.data?.success) {
      setSuccess(
        result.data.message ||
          "Owner account created successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }

    setError(
      result.data?.message ||
        "Unable to create account"
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-header">
            <div className="auth-logo">
              <FlexSightLogo />
            </div>

            <div className="auth-brand-text">
              <h1 className="auth-title">
                FlexSight
              </h1>
            </div>
          </div>

          <p className="auth-subtitle">
            Temperature Monitoring & Alert System
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <h2 className="auth-form-title">
            Create Owner Account
          </h2>

          <p className="settings-description">
            Signing up creates a new Owner account.
            Owners can then add Admin and Inspector
            accounts from inside the dashboard.
          </p>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
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
              placeholder="Choose a username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              required
              autoComplete="email"
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
              placeholder="Choose a password"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link
            to="/login"
            className="auth-link"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
