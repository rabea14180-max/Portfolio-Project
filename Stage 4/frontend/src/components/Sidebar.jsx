import { NavLink, useNavigate } from "react-router-dom";
import { logoutRequest } from "../api";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/devices", label: "Devices", icon: "⬡" },
  { to: "/alerts", label: "Alerts", icon: "⚠️" },
  { to: "/readings", label: "Readings", icon: "◈" },
  { to: "/users", label: "Users", icon: "👤" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutRequest();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">FS</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">FlexSight</span>
          <span className="sidebar-brand-tagline">Temperature Monitoring</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              sidebar-link${isActive ? " sidebar-link-active" : ""}
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
