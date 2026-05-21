import { COLORS } from "../constants";

export default function Table({ headers, children }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", minWidth: 640, width: "100%" }}>
        <thead>
          <tr style={{ background: "#f7f8fa" }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  borderBottom: `1px solid ${COLORS.border}`,
                  color: COLORS.textSec,
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "14px 16px",
                  textAlign: "left",
                  textTransform: "uppercase",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
