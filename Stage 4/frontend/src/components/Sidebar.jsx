import { NavLink, useNavigate } from "react-router-dom";
import { logoutRequest, getRole } from "../api";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/devices", label: "Devices", icon: "⬡", roles: ["OWNER", "ADMIN"] },
  { to: "/alerts", label: "Alerts", icon: "!" },
  { to: "/readings", label: "Readings", icon: "◇" },
  { to: "/users", label: "Users", icon: "○", roles: ["OWNER", "ADMIN"] },
  { to: "/users/new", label: "Add User", icon: "+", roles: ["OWNER", "ADMIN"] },
  { to: "/settings", label: "Settings", icon: "⚙️︎" },
];

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const role = getRole();
  const visibleNavItems = navItems.filter((item) => !item.roles || item.roles.includes(role));

  async function handleLogout() {
    await logoutRequest();
    navigate("/login");
  }

  return (
    <aside className={`sidebar${open ? " sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">FS</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">FlexSight</span>
          <span className="sidebar-brand-tagline">Temperature Monitoring</span>
        </div>
        <button
          type="button"
          className="sidebar-close-btn"
          aria-label="Close navigation menu"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `sidebar-link${isActive ? " sidebar-link-active" : ""}`
            }
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
