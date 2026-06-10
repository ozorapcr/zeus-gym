import { COLORS } from "../constants";

export default function SummaryTile({ value, label, tone = "dark", icon = "Home" }) {
  const tones = {
    dark: COLORS.accentDim,
    pink: COLORS.accent,
    soft: "#E07BA3",
  };

  return (
    <div
      style={{
        background: tones[tone] ?? tones.dark,
        borderRadius: 8,
        color: "#ffffff",
        minHeight: 82,
        padding: "17px 16px",
        position: "relative",
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 800, left: 14, opacity: 0.9, position: "absolute", top: 18 }}>
        {icon}
      </span>
      <span
        style={{
          border: "1px solid #ffffff",
          borderRadius: "50%",
          color: "#ffffff",
          fontSize: 10,
          fontWeight: 900,
          height: 16,
          lineHeight: "14px",
          position: "absolute",
          right: 10,
          textAlign: "center",
          top: 10,
          width: 16,
        }}
      >
        $
      </span>
      <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 600, textAlign: "center" }}>
        {value}
      </div>
      <div style={{ color: "#ffffff", fontSize: 11, textAlign: "center" }}>{label}</div>
    </div>
  );
}
