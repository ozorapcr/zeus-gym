import { COLORS } from "../constants";

const variants = {
  primary: {
    background: COLORS.accent,
    border: "1px solid transparent",
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(205, 76, 126, 0.22)",
  },
  secondary: {
    background: "#ffffff",
    border: `1px solid ${COLORS.border}`,
    color: COLORS.text,
    boxShadow: "none",
  },
  success: {
    background: COLORS.green,
    border: "1px solid transparent",
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(52, 199, 89, 0.16)",
  },
  danger: {
    background: COLORS.red,
    border: "1px solid transparent",
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(255, 90, 90, 0.16)",
  },
  warning: {
    background: COLORS.orange,
    border: "1px solid transparent",
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(255, 158, 132, 0.18)",
  },
};

export default function Button({ children, type = "primary", style, ...props }) {
  return (
    <button
      {...props}
      style={{
        borderRadius: 14,
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 800,
        padding: "11px 16px",
        ...variants[type],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
