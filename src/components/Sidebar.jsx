import { NavLink } from "react-router-dom";
import { COLORS, NAV_ITEMS } from "../constants";

export default function Sidebar({ active, setActive, session, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark"></div>
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

          // Untuk playground instruksi (/components)
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
        <div className="user-avatar">{session.name.slice(0, 1)}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: COLORS.textSec }}>{session.role}</div>
          <div className="user-name">{session.name}</div>
        </div>
        <button onClick={onLogout} className="logout-button">Keluar</button>
      </div>
    </aside>
  );
}
