// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { COLORS, NAV_ITEMS } from "../constants";

export default function Sidebar({ active, setActive, session, onLogout }) {
  // Ambil data user dengan aman (safe access)
  const userName = session?.user?.user_metadata?.name || session?.user?.email || session?.name || "Admin";
  const userRole = session?.user?.user_metadata?.role || session?.role || "User";
  const userInitial = userName?.charAt(0)?.toUpperCase() || "A";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">G</div>
        <div>
          <div className="brand-title">GYM<span>ZEUS</span></div>
          <div className="brand-subtitle">MANAGEMENT</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const to =
            item === "Dashboard" || item === "Keanggotaan"
              ? "/"
              : "/" + item.toLowerCase();

          const finalTo = item === "Components" ? "/components" : to;

          return (
            <NavLink
              key={item}
              to={finalTo}
              onClick={() => setActive(item)}
              className={({ isActive }) =>
                active === item || isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              {item}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">{userInitial}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: COLORS.textSec }}>{userRole}</div>
          <div className="user-name">{userName}</div>
        </div>
        <button onClick={onLogout} className="logout-button">Keluar</button>
      </div>
    </aside>
  );
}