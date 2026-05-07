// ============================================================
//  components/UI.jsx — Modern Neo Gym UI Components
// ============================================================

import { COLORS } from "../constants";

/* ────────────────────────────────────────────────────────────
   Badge
──────────────────────────────────────────────────────────── */
export function Badge({ children, color = "accent" }) {
  const MAP = {
    accent: {
      bg: "rgba(232,255,0,0.12)",
      text: COLORS.accent,
      border: "rgba(232,255,0,0.24)",
    },
    green: {
      bg: "rgba(0,204,102,0.12)",
      text: COLORS.green,
      border: "rgba(0,204,102,0.24)",
    },
    red: {
      bg: "rgba(255,80,80,0.12)",
      text: COLORS.red,
      border: "rgba(255,80,80,0.24)",
    },
    orange: {
      bg: "rgba(255,136,0,0.12)",
      text: COLORS.orange,
      border: "rgba(255,136,0,0.24)",
    },
    muted: {
      bg: "rgba(255,255,255,0.04)",
      text: COLORS.textSec,
      border: COLORS.border,
    },
  };

  const s = MAP[color] ?? MAP.accent;

  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   Stat Card
──────────────────────────────────────────────────────────── */
export function StatCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 20,
        padding: "24px",
        backdropFilter: "blur(14px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      {/* Accent Glow */}
      {accent && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(232,255,0,0.12), transparent 45%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 3,
              background: COLORS.accent,
            }}
          />
        </>
      )}

      <div
        style={{
          fontSize: 11,
          color: COLORS.textSec,
          marginBottom: 12,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 38,
          fontWeight: 900,
          lineHeight: 1,
          color: accent ? COLORS.accent : COLORS.text,
          marginBottom: 10,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {value}
      </div>

      {sub && (
        <div
          style={{
            fontSize: 13,
            color: COLORS.textSec,
            lineHeight: 1.5,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Input
──────────────────────────────────────────────────────────── */
export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textSec,
            marginBottom: 8,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        style={{
          width: "100%",
          background: COLORS.dark,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: "13px 16px",
          color: COLORS.text,
          fontSize: 14,
          outline: "none",
          transition: "0.18s ease",
          boxSizing: "border-box",
          backdropFilter: "blur(8px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = COLORS.accent;
          e.target.style.boxShadow =
            "0 0 0 4px rgba(232,255,0,0.08)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = COLORS.border;
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Textarea
──────────────────────────────────────────────────────────── */
export function Textarea({ label, rows = 4, ...props }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textSec,
            marginBottom: 8,
          }}
        >
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        {...props}
        style={{
          width: "100%",
          background: COLORS.dark,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: "13px 16px",
          color: COLORS.text,
          fontSize: 14,
          outline: "none",
          resize: "vertical",
          transition: "0.18s ease",
          boxSizing: "border-box",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Primary Button
──────────────────────────────────────────────────────────── */
export function PrimaryButton({ children, style, ...props }) {
  return (
    <button
      {...props}
      style={{
        position: "relative",
        overflow: "hidden",
        background: COLORS.accent,
        color: COLORS.black,
        border: "none",
        borderRadius: 14,
        padding: "13px 24px",
        fontWeight: 900,
        fontSize: 13,
        letterSpacing: 0.6,
        cursor: "pointer",
        transition: "0.18s ease",
        boxShadow: "0 10px 24px rgba(232,255,0,0.18)",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   Secondary Button
──────────────────────────────────────────────────────────── */
export function SecondaryButton({ children, style, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: "rgba(255,255,255,0.03)",
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "12px 20px",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        transition: "0.18s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   Card
──────────────────────────────────────────────────────────── */
export function Card({ children, style }) {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 22,
        padding: 24,
        overflow: "hidden",
        backdropFilter: "blur(18px)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.28)",
        ...style,
      }}
    >
      {/* subtle glow */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(232,255,0,0.04)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Section Title
──────────────────────────────────────────────────────────── */
export function SectionTitle({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: COLORS.accent,
          boxShadow: "0 0 14px rgba(232,255,0,0.6)",
        }}
      />

      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: COLORS.textSec,
          letterSpacing: 1.4,
          textTransform: "uppercase",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Page Header
──────────────────────────────────────────────────────────── */
export function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 34 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 999,
            background: COLORS.accent,
          }}
        />
        <span
          style={{
            color: COLORS.accent,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.4,
            textTransform: "uppercase",
          }}
        >
          FITPRO SYSTEM
        </span>
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: 38,
          lineHeight: 1.1,
          fontWeight: 900,
          color: COLORS.text,
          letterSpacing: -1.5,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            marginTop: 10,
            color: COLORS.textSec,
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 620,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}