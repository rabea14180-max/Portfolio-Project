import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiRequest } from "../api";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (newPassword.length < 8) {
      setIsError(true);
      setMessage("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage("New password and confirmation do not match");
      return;
    }

    setLoading(true);
    const result = await apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, new_password: newPassword }),
    });
    setLoading(false);

    if (!result.ok || !result.data?.success) {
      setIsError(true);
      setMessage(result.data?.message || "Unable to reset password");
      return;
    }

    setDone(true);
    setMessage("Password reset successfully. Redirecting to sign in...");
    window.setTimeout(() => navigate("/login", { replace: true }), 1500);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">FS</div>
          <h1 className="auth-title">FlexSight</h1>
          <p className="auth-subtitle">Temperature Monitoring & Alert System</p>
        </div>

        {!token ? (
          <>
            <div className="alert alert-error">
              This reset link is invalid. Please request a new one.
            </div>
            <p className="auth-footer">
              <Link to="/forgot-password" className="auth-link">
                Request a new reset link
              </Link>
            </p>
          </>
        ) : (
          <>
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2 className="auth-form-title">Reset Password</h2>

              {message && (
                <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>{message}</div>
              )}

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
                  disabled={done}
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
                  disabled={done}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading || done}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="auth-footer">
              <Link to="/login" className="auth-link">
                Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
