import { COLORS } from "../constants";

export default function MetricCard({ value, label, tone = "neutral", icon = "$" }) {
  const tones = {
    neutral: "rgba(205, 76, 126, 0.1)",
    pink: "rgba(205, 76, 126, 0.14)",
    dark: "rgba(177, 63, 107, 0.16)",
    soft: "rgba(224, 123, 163, 0.2)",
  };

  return (
    <div
      style={{
        background: tones[tone] ?? tones.neutral,
        border: "1px solid rgba(205, 76, 126, 0.18)",
        borderRadius: 8,
        minHeight: 86,
        padding: "18px 16px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <span
        style={{
          alignItems: "center",
          border: `1px solid ${COLORS.accent}`,
          borderRadius: "50%",
          color: COLORS.accent,
          display: "flex",
          fontSize: 10,
          fontWeight: 900,
          height: 16,
          justifyContent: "center",
          position: "absolute",
          right: 10,
          top: 10,
          width: 16,
        }}
      >
        {icon}
      </span>

      <div style={{ color: COLORS.accent, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: COLORS.textSec, fontSize: 11, marginTop: 6 }}>{label}</div>
    </div>
  );
}
