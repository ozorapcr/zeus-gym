import { COLORS } from "../constants";

export default function ProgressRing({ value = 65, size = 128 }) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <svg height={size} width={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke="rgba(205, 76, 126, 0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={COLORS.accent}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={stroke}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
        <text
          fill={COLORS.text}
          fontSize="22"
          fontWeight="800"
          textAnchor="middle"
          x="50%"
          y="50%"
          dominantBaseline="middle"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}
