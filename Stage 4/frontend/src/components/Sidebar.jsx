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
        <div className="sidebar-logo">
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="FlexSight logo"
    role="img"
  >
    <defs>
      <linearGradient id="flexsight-gradient" x1="8" y1="56" x2="56" y2="8">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="45%" stopColor="#8b5cf6" />
        <stop offset="75%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#2dd4bf" />
      </linearGradient>

      <linearGradient id="temperature-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
    </defs>

    {/* Open monitoring ring */}
    <path
      d="M51 48A25 25 0 1 1 54 20"
      fill="none"
      stroke="url(#flexsight-gradient)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* End point */}
    <circle cx="54" cy="20" r="3" fill="#22d3ee" />

    {/* Thermometer */}
<g transform="translate(0 -5)">
  <path
    d="M32 18
       A5 5 0 0 1 37 23
       V38
       A9 9 0 1 1 27 38
       V23
       A5 5 0 0 1 32 18Z"
    fill="none"
    stroke="#e0e7ff"
    strokeWidth="3"
  />

  <path
    d="M32 25V42"
    stroke="url(#temperature-gradient)"
    strokeWidth="4"
    strokeLinecap="round"
  />

  <circle
    cx="32"
    cy="43"
    r="5"
    fill="url(#temperature-gradient)"
  />
</g>

    {/* Data signal */}
    <path
      d="M43 29V35 M47 26V38 M51 30V34"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">FlexSight</span>
          <span className="sidebar-brand-tagline">
  MONITOR · INSIGHT · ALERT
</span> 
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
