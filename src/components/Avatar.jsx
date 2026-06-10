import { COLORS } from "../constants";

export default function Avatar({ name }) {
  const initials = String(name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div
      title={name}
      style={{
        alignItems: "center",
        background: "rgba(205, 76, 126, 0.1)",
        borderRadius: 14,
        color: COLORS.accent,
        display: "flex",
        fontSize: 14,
        fontWeight: 900,
        height: 42,
        justifyContent: "center",
        width: 42,
      }}
    >
      {initials || "?"}
    </div>
  );
}
