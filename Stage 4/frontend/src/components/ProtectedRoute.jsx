import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../api";

function ProtectedRoute({ children, roles }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(getRole())) {
    return (
      <div className="card unauthorized-card">
        <p className="unauthorized-message">Unauthorized access.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
