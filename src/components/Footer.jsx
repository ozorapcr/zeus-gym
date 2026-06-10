import { COLORS } from "../constants";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.textSec,
        fontSize: 13,
        marginTop: 34,
        padding: "22px 0 4px",
        textAlign: "center",
      }}
    >
      <strong style={{ color: COLORS.text }}>GYM ZEUS</strong>
      <span> - Components Playground 2026</span>
    </footer>
  );
}
