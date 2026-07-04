import { useEffect, useState } from "react";
import { apiRequest, getRole } from "../api";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const role = getRole();

  useEffect(() => {
    if (role !== "OWNER") return;

    async function fetchUsers() {
      setLoading(true);
      setError("");

      const result = await apiRequest("/api/users");

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
    }

    fetchUsers();
  }, [role]);

  if (role !== "OWNER") {
    return (
      <div className="card unauthorized-card">
        <p className="unauthorized-message">
          Unauthorized access. This page is restricted to Owner users.
        </p>
      </div>
    );
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (users.length === 0) return <EmptyState />;

  return (
    <div className="card">
      <h2 className="card-title">System Users</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Account Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
