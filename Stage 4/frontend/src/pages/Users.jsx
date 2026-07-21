import { useCallback, useEffect, useState } from "react";
import { apiRequest, getRole } from "../api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const role = getRole();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    const result = await apiRequest("/users");

    if (result.status === 403) {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    if (!result.ok) {
      setError(result.data?.message || "Unable to connect to server");
      setLoading(false);
      return;
    }

    setUsers(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  }, []);

  const canManage = role === "OWNER" || role === "ADMIN";

  useEffect(() => {
    if (!canManage) return;
    fetchUsers();
  }, [canManage, fetchUsers]);

  async function handleDelete(userId) {
    setActionLoading(userId);
    setError("");

    const result = await apiRequest(`/users/${userId}`, { method: "DELETE" });

    setActionLoading(null);

    if (result.ok && result.data?.success) {
      await fetchUsers();
      return;
    }

    setError(result.data?.message || "Failed to delete user");
  }

  if (!canManage) {
    return (
      <div className="card unauthorized-card">
        <p className="unauthorized-message">
          Unauthorized access. This page is restricted to Owner and Admin users.
        </p>
      </div>
    );
  }

  if (loading) return <LoadingState />;
  if (error && users.length === 0) return <ErrorState message={error} />;
  if (users.length === 0) return <EmptyState />;

  return (
    <div className="card">
      <h2 className="card-title">System Users</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>
                  <StatusBadge value={user.role} />
                </td>
                <td>
                  <StatusBadge value={user.account_status} />
                </td>
                <td>
                  {role === "OWNER" && user.role !== "OWNER" && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      disabled={actionLoading === user.user_id}
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
