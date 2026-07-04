import { getRole } from "../api";

function Topbar({ title }) {
  const role = getRole() || "UNKNOWN";

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-right">
        <span className="topbar-role-label">Role</span>
        <span className="topbar-role-badge">{role}</span>
      </div>
    </header>
  );
}

export default Topbar;
