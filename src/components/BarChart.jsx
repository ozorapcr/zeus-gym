import { COLORS } from "../constants";

export default function BarChart({ data = [], height = 160 }) {
  const max = Math.max(...data, 1);

  return (
    <div
      style={{
        alignItems: "end",
        background: "rgba(205, 76, 126, 0.08)",
        borderRadius: 8,
        display: "flex",
        gap: 10,
        height,
        padding: "18px 18px 14px",
      }}
    >
      {data.map((value, index) => (
        <div
          key={`${value}-${index}`}
          style={{
            background: index % 3 === 0 ? COLORS.accentDim : COLORS.accent,
            borderRadius: "4px 4px 0 0",
            height: `${Math.max(8, (value / max) * 100)}%`,
            width: "100%",
          }}
        />
      ))}
    </div>
  );
}
