import { COLORS, NAV_ITEMS } from "../constants";

export default function Sidebar({ active, setActive, session, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">G</div>
        <div>
          <div className="brand-title">GYM<span>PRO</span></div>
          <div className="brand-subtitle">MANAGEMENT</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={active === item ? "nav-item active" : "nav-item"}
          >
            {item}
          </button>
        ))}
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
