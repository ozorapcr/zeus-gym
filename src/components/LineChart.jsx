import { COLORS } from "../constants";

export default function LineChart({ points = [] }) {
  const width = 420;
  const height = 160;
  const max = Math.max(...points, 1);
  const step = width / Math.max(points.length - 1, 1);
  const coords = points.map((value, index) => {
    const x = index * step;
    const y = height - (value / max) * (height - 18) - 8;
    return `${x},${y}`;
  });

  return (
    <div
      style={{
        background: "rgba(205, 76, 126, 0.08)",
        borderRadius: 8,
        height,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
        {[32, 64, 96, 128].map((y) => (
          <line key={y} x1="0" x2={width} y1={y} y2={y} stroke="rgba(205,76,126,0.18)" strokeWidth="1" />
        ))}
        {points.map((_, index) => (
          <line key={index} x1={index * step} x2={index * step} y1="0" y2={height} stroke="rgba(205,76,126,0.12)" strokeWidth="1" />
        ))}
        <polyline fill="none" points={coords.join(" ")} stroke={COLORS.accent} strokeWidth="3" />
        {coords.map((coord, index) => {
          const [x, y] = coord.split(",");
          return <circle key={index} cx={x} cy={y} fill={COLORS.accent} r="3.5" />;
        })}
      </svg>
    </div>
  );
}
