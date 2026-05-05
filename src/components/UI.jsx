// ============================================================
//  components/UI.jsx  —  Reusable shared UI primitives
// ============================================================
import { COLORS } from "../constants";

/* ── Badge ──────────────────────────────────────────────── */
export function Badge({ children, color = "accent" }) {
  const MAP = {
    accent: { bg: "#e8ff0022", text: COLORS.accent,  border: "#e8ff0044" },
    green:  { bg: "#00cc6622", text: COLORS.green,   border: "#00cc6644" },
    red:    { bg: "#ff333322", text: COLORS.red,     border: "#ff333344" },
    orange: { bg: "#ff880022", text: COLORS.orange,  border: "#ff880044" },
    muted:  { bg: "#66666622", text: COLORS.textSec, border: "#66666644" },
  };
  const s = MAP[color] ?? MAP.accent;
  return (
    <span style={{
      background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
    }}>
      {children}
    </span>
  );
}

/* ── StatCard ────────────────────────────────────────────── */
export function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 12, padding: "20px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {accent && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 3, background: COLORS.accent,
        }} />
      )}
      <div style={{
        fontSize: 12, color: COLORS.textSec, letterSpacing: 1,
        textTransform: "uppercase", marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 32, fontWeight: 800,
        color: accent ? COLORS.accent : COLORS.text,
        fontFamily: "monospace",
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: COLORS.textSec, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ── Input ───────────────────────────────────────────────── */
export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{
          display: "block", fontSize: 12,
          color: COLORS.textSec, marginBottom: 6, letterSpacing: 0.5,
        }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: "100%", background: COLORS.dark,
          border: `1px solid ${COLORS.border}`, borderRadius: 8,
          padding: "10px 14px", color: COLORS.text,
          fontSize: 14, outline: "none", boxSizing: "border-box",
          ...props.style,
        }}
      />
    </div>
  );
}

/* ── Textarea ────────────────────────────────────────────── */
export function Textarea({ label, rows = 3, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{
          display: "block", fontSize: 12,
          color: COLORS.textSec, marginBottom: 6,
        }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        {...props}
        style={{
          width: "100%", background: COLORS.dark,
          border: `1px solid ${COLORS.border}`, borderRadius: 8,
          padding: "10px 14px", color: COLORS.text,
          fontSize: 14, outline: "none", resize: "vertical",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* ── PrimaryButton ───────────────────────────────────────── */
export function PrimaryButton({ children, style, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: COLORS.accent, color: COLORS.black,
        border: "none", padding: "12px 28px", borderRadius: 8,
        fontWeight: 900, cursor: "pointer", fontSize: 14,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ── Card ────────────────────────────────────────────────── */
export function Card({ children, style }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 12, padding: 24, ...style,
    }}>
      {children}
    </div>
  );
}

/* ── SectionTitle ────────────────────────────────────────── */
export function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 13, fontWeight: 700, color: COLORS.textSec,
      letterSpacing: 1, marginBottom: 16,
      textTransform: "uppercase",
    }}>
      {children}
    </div>
  );
}

/* ── PageHeader ──────────────────────────────────────────── */
export function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: COLORS.text, margin: 0 }}>
        {title}
      </h2>
      <p style={{ color: COLORS.textSec, margin: "6px 0 0", fontSize: 14 }}>
        {subtitle}
      </p>
    </div>
  );
}