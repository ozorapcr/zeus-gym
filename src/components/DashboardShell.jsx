export default function DashboardShell({ sidebar, header, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid rgba(205, 76, 126, 0.18)",
        boxShadow: "0 16px 36px rgba(205, 76, 126, 0.08)",
        borderRadius: 8,
        display: "grid",
        gridTemplateColumns: "44px 1fr",
        overflow: "hidden",
      }}
    >
      {sidebar}
      <div>
        {header}
        <div style={{ padding: 18 }}>{children}</div>
      </div>
    </div>
  );
}
