import { COLORS } from "../constants";

const rows = [
  ["Furniture", "52K", "Office"],
  ["Electronics", "99K", "Retail"],
  ["Watch", "32K", "Accessories"],
];

export default function ActivityTable() {
  return (
    <div style={{ background: "rgba(205, 76, 126, 0.08)", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ background: "rgba(205, 76, 126, 0.28)", height: 16 }} />
      {rows.map((row) => (
        <div
          key={row[0]}
          style={{
            borderBottom: `1px solid ${COLORS.border}`,
            display: "grid",
            gap: 10,
            gridTemplateColumns: "1fr 1fr 1fr",
            padding: "10px 14px",
          }}
        >
          {row.map((cell) => (
            <span key={cell} style={{ color: COLORS.textSec, fontSize: 12 }}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
