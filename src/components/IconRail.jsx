import { COLORS } from "../constants";

const icons = ["=", "O", "B", "*", "H", "P", "C", "A", "S"];

export default function IconRail({ activeIndex = 3 }) {
  return (
    <aside
      style={{
        alignItems: "center",
        background: `linear-gradient(180deg, ${COLORS.accentDim}, ${COLORS.accent})`,
        borderRadius: "8px 0 0 8px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        padding: "14px 10px",
        width: 44,
      }}
    >
      {icons.map((icon, index) => (
        <div
          key={`${icon}-${index}`}
          style={{
            alignItems: "center",
            background: index === activeIndex ? "rgba(255,255,255,0.18)" : "transparent",
            borderRadius: 8,
            color: index === activeIndex ? "#ffffff" : "rgba(255,255,255,0.78)",
            display: "flex",
            fontSize: 15,
            fontWeight: 800,
            height: 24,
            justifyContent: "center",
            width: 24,
          }}
        >
          {icon}
        </div>
      ))}
    </aside>
  );
}
