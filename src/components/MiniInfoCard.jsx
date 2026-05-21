import { COLORS } from "../constants";

export default function MiniInfoCard({ title, value, icon = "*" }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid rgba(205, 76, 126, 0.18)",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 12 }}>
        <span style={{ color: COLORS.accent }}>{icon}</span>
        <span style={{ color: COLORS.textSec, fontSize: 12 }}>{title}</span>
      </div>
      <strong style={{ color: COLORS.text, fontSize: 22 }}>{value}</strong>
    </div>
  );
}
