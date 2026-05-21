import { COLORS } from "../constants";

export default function WeatherWidget({ temperature = "21C", label = "Current Weather" }) {
  return (
    <div
      style={{
        alignItems: "center",
        background: "#ffffff",
        border: "1px solid rgba(205, 76, 126, 0.18)",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        padding: 16,
      }}
    >
      <div>
        <div style={{ color: COLORS.textSec, fontSize: 12 }}>{label}</div>
        <strong style={{ color: COLORS.text, fontSize: 24 }}>{temperature}</strong>
      </div>
      <span style={{ color: COLORS.accent, fontSize: 13, fontWeight: 800 }}>Cloud</span>
    </div>
  );
}
