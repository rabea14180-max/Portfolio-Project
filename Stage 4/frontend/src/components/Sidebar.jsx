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

  const visibleNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  async function handleLogout() {
    await logoutRequest();
    navigate("/login");
  }

  return (
    <aside className={`sidebar${open ? " sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <svg
            viewBox="0 0 520 330"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="FlexSight logo"
            role="img"
          >
            <defs>
              <linearGradient
                id="blue"
                x1="60"
                y1="40"
                x2="440"
                y2="280"
              >
                <stop offset="0%" stopColor="#4c73d9" />
                <stop offset="50%" stopColor="#79aeef" />
                <stop offset="100%" stopColor="#9dd9f8" />
              </linearGradient>

              <linearGradient
                id="lightBlue"
                x1="80"
                y1="60"
                x2="390"
                y2="250"
              >
                <stop offset="0%" stopColor="#72b4f3" />
                <stop offset="100%" stopColor="#e3f8ff" />
              </linearGradient>

              <linearGradient
                id="darkBlue"
                x1="70"
                y1="40"
                x2="430"
                y2="270"
              >
                <stop offset="0%" stopColor="#3156be" />
                <stop offset="100%" stopColor="#486fd0" />
              </linearGradient>

              <radialGradient id="center">
                <stop offset="0%" stopColor="#e8f9ff" />
                <stop offset="45%" stopColor="#b9e7fa" />
                <stop offset="100%" stopColor="#5c8de0" />
              </radialGradient>
            </defs>

            <path
              d="M48 145C72 84 143 38 230 30C284 25 332 30 367 41C302 39 241 52 187 75C128 100 89 130 65 162C52 179 40 167 48 145Z"
              fill="url(#darkBlue)"
            />

            <path
              d="M51 135C82 77 150 43 229 34C279 28 326 32 359 41C299 43 240 57 187 80C129 105 91 134 67 165C53 183 38 163 51 135Z"
              fill="url(#blue)"
            />

            <path
              d="M62 190C78 130 129 88 191 67C242 50 296 47 348 56C300 60 254 75 215 96C164 123 129 158 108 205C99 226 82 226 70 213C63 206 60 198 62 190Z"
              fill="url(#lightBlue)"
            />

            <circle cx="270" cy="157" r="72" fill="#3154ba" />
            <circle cx="270" cy="157" r="59" fill="#72b0ec" />
            <circle cx="270" cy="157" r="48" fill="url(#center)" />

            <rect
              x="247"
              y="134"
              width="46"
              height="46"
              transform="rotate(45 270 157)"
              fill="#111a46"
            />

            <path
              d="M410 48C445 54 472 69 487 91C502 114 502 142 490 168C466 219 401 255 324 275C278 287 233 292 195 288C255 278 315 259 363 230C414 200 446 163 451 126C455 95 442 69 410 48Z"
              fill="url(#darkBlue)"
            />

            <path
              d="M405 48C431 53 454 63 470 79C487 96 491 117 485 140C473 186 420 225 351 249C301 267 248 276 199 273C255 261 307 242 350 217C400 188 430 155 435 120C440 89 428 65 405 48Z"
              fill="url(#blue)"
            />

            <path
              d="M205 252C263 242 316 222 358 196C395 173 420 146 435 116C424 156 396 192 354 218C314 243 262 256 205 252Z"
              fill="#d5f4ff"
            />

            <path
              d="M192 286C258 280 323 263 379 237C421 218 455 194 480 167C472 199 445 226 408 248C352 282 274 301 205 296C193 295 184 291 192 286Z"
              fill="url(#blue)"
            />
          </svg>
        </div>
<div className="sidebar-brand-text">
  <span className="sidebar-brand-name">FlexSight</span>
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

      <button
        type="button"
        className="sidebar-logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;