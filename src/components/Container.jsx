export default function Container({ children, style, className = "" }) {
  return (
    <div
      className={className}
      style={{
        margin: "0 auto",
        maxWidth: 1120,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
