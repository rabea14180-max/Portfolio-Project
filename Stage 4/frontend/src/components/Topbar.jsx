import { getRole, getUsername } from "../api";

function Topbar({ title, onMenuClick }) {
  const role = getRole() || "UNKNOWN";
  const username = getUsername();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-menu-btn"
          aria-label="Toggle navigation menu"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-right">
        {username && <span className="topbar-username">{username}</span>}
        <span className="topbar-role-badge">{role}</span>
      </div>
    </header>
  );
}

export default Topbar;
