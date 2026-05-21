import { COLORS } from "../constants";

export default function Card({ children, style }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 22,
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
