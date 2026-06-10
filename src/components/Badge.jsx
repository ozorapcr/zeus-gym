import { COLORS } from "../constants";

const variants = {
  primary: {
    background: "rgba(205, 76, 126, 0.1)",
    border: "rgba(205, 76, 126, 0.18)",
    color: COLORS.accent,
  },
  secondary: {
    background: "#f3f4f6",
    border: COLORS.border,
    color: COLORS.textSec,
  },
  success: {
    background: "rgba(52, 199, 89, 0.12)",
    border: "rgba(52, 199, 89, 0.22)",
    color: COLORS.green,
  },
  danger: {
    background: "rgba(255, 90, 90, 0.12)",
    border: "rgba(255, 90, 90, 0.22)",
    color: COLORS.red,
  },
  warning: {
    background: "rgba(255, 158, 132, 0.14)",
    border: "rgba(255, 158, 132, 0.26)",
    color: "#b84d2d",
  },
};

export default function Badge({ children, type = "primary" }) {
  const variant = variants[type] ?? variants.primary;

  return (
    <span
      style={{
        alignItems: "center",
        background: variant.background,
        border: `1px solid ${variant.border}`,
        borderRadius: 999,
        color: variant.color,
        display: "inline-flex",
        fontSize: 12,
        fontWeight: 800,
        lineHeight: 1,
        padding: "8px 12px",
      }}
    >
      {children}
    </span>
  );
}
