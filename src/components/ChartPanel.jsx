import { COLORS } from "../constants";

export default function ChartPanel({ title, children }) {
  return (
    <section>
      {title && (
        <h3 style={{ color: COLORS.textSec, fontSize: 13, margin: "0 0 10px" }}>
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}
