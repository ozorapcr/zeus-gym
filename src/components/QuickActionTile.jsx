import { COLORS } from "../constants";

export default function QuickActionTile({ label, icon = "Up", tone = "pink" }) {
  const tones = {
    pink: COLORS.accent,
    dark: COLORS.accentDim,
    soft: "#E07BA3",
  };

  return (
    <button
      style={{
        alignItems: "center",
        background: tones[tone] ?? tones.pink,
        border: "none",
        borderRadius: 8,
        color: "#ffffff",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        fontSize: 12,
        fontWeight: 800,
        gap: 8,
        justifyContent: "center",
        minHeight: 74,
        padding: 12,
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </button>
  );
}
