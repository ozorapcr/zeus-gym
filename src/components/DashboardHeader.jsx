import { COLORS } from "../constants";
import Avatar from "./Avatar";

export default function DashboardHeader({ brand = "GYM ZEUS" }) {
  return (
    <header
      style={{
        alignItems: "center",
        borderBottom: "1px solid rgba(205, 76, 126, 0.18)",
        display: "flex",
        gap: 16,
        justifyContent: "space-between",
        padding: "14px 18px",
      }}
    >
      <strong style={{ color: COLORS.accent, fontSize: 12 }}>{brand}</strong>
      <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
        <input
          aria-label="Search"
          placeholder="Search"
          style={{
            background: "rgba(205, 76, 126, 0.06)",
            border: "1px solid rgba(205, 76, 126, 0.18)",
            borderRadius: 999,
            fontSize: 12,
            outline: "none",
            padding: "8px 12px",
            width: 150,
          }}
        />
        <span style={{ color: COLORS.accent, fontSize: 13, fontWeight: 800 }}>Mail</span>
        <Avatar name="Admin" />
      </div>
    </header>
  );
}
