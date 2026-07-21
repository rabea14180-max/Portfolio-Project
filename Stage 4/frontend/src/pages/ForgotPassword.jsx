import { useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    const result = await apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!result.ok || !result.data?.success) {
      setIsError(true);
      setMessage(result.data?.message || "Unable to process your request");
      return;
    }

    setMessage(result.data.message || "If that email is registered, a reset link has been sent.");
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
          <h2 className="auth-form-title">Forgot Password</h2>
          <p className="settings-description">
            Enter your account email and we&apos;ll send you a link to reset your password.
          </p>

          {message && (
            <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>{message}</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your account email"
              required
              autoComplete="email"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="auth-footer">
          Remembered your password?{" "}
          <Link to="/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
