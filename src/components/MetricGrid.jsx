export default function MetricGrid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 18,
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}
