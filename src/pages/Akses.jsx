// ============================================================
//  pages/Akses.jsx  —  Modern Access Verification UI
// ============================================================

import { useState } from "react";
import { COLORS } from "../constants";
import { PageHeader, Card, SectionTitle, Badge } from "../components/UI";

/* ============================================================
   RESULT CARD
============================================================ */
function AccessResult({ result }) {
  if (!result) {
    return (
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 24,
          padding: 36,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",
          minHeight: 340,

          boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 24,

            background: "rgba(205,76,126,0.08)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: 40,

            marginBottom: 22,
          }}
        >
          🔐
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 8,
          }}
        >
          Menunggu Verifikasi
        </div>

        <div
          style={{
            color: COLORS.textSec,
            fontSize: 14,
            lineHeight: 1.7,
            maxWidth: 280,
          }}
        >
          Scan QR atau masukkan ID anggota untuk melakukan verifikasi akses member gym
        </div>
      </div>
    );
  }

  const allowed = result.allowed;

  return (
    <div
      style={{
        background: allowed
          ? "linear-gradient(135deg,#ffffff,#f7fff9)"
          : "linear-gradient(135deg,#ffffff,#fff6f6)",

        border: `2px solid ${
          allowed ? "rgba(52,199,89,0.25)" : "rgba(255,59,48,0.18)"
        }`,

        borderRadius: 24,
        padding: 36,

        textAlign: "center",

        minHeight: 340,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,

          borderRadius: 30,

          background: allowed
            ? "rgba(52,199,89,0.12)"
            : "rgba(255,59,48,0.10)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: 54,

          marginBottom: 24,
        }}
      >
        {allowed ? "✅" : "❌"}
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 800,

          color: allowed ? "#34C759" : "#FF3B30",

          marginBottom: 10,
          letterSpacing: 0.5,
        }}
      >
        {allowed ? "AKSES DIBERIKAN" : "AKSES DITOLAK"}
      </div>

      {!result.unknown && (
        <>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: 6,
            }}
          >
            {result.name}
          </div>

          <div
            style={{
              fontSize: 14,
              color: COLORS.textSec,
              marginBottom: 16,
            }}
          >
            {result.id} • Paket {result.plan}
          </div>

          <Badge color={allowed ? "green" : "red"}>
            {result.status}
          </Badge>
        </>
      )}

      {result.unknown && (
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSec,
            maxWidth: 260,
            lineHeight: 1.7,
          }}
        >
          ID tidak ditemukan di database anggota
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Akses({ database, actions }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const verify = () => {
    if (!input.trim()) return;

    const found = database.members.find(
      (m) =>
        m.id === input.trim().toUpperCase() ||
        m.name.toLowerCase() === input.trim().toLowerCase()
    );

    const time = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (found) {
      const allowed = found.status !== "Kadaluarsa";

      setResult({
        ...found,
        allowed,
      });

      actions.updateDatabase((current) => ({
        ...current,
        accessLogs: [
          {
            id: `ACC${Date.now()}`,
            time,
            name: found.name,
            method: "ID Manual",
            status: allowed ? "Masuk" : "Ditolak",
          },
          ...current.accessLogs,
        ],
      }));
    } else {
      setResult({
        allowed: false,
        unknown: true,
      });

      actions.updateDatabase((current) => ({
        ...current,
        accessLogs: [
          {
            id: `ACC${Date.now()}`,
            time,
            name: input.trim(),
            method: "ID Manual",
            status: "Ditolak",
          },
          ...current.accessLogs,
        ],
      }));
    }
  };

  return (
    <div>
      <PageHeader
        title="Sistem Akses"
        subtitle="Verifikasi cepat menggunakan QR Code atau ID Anggota"
      />

      {/* ============================================================
          MAIN GRID
      ============================================================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* ============================================================
            INPUT PANEL
        ============================================================ */}
        <Card
          style={{
            padding: 36,
            borderRadius: 24,
          }}
        >
          <SectionTitle>Scan / Input ID</SectionTitle>

          {/* CAMERA VIEW */}
          <div
            style={{
              width: 190,
              height: 190,

              margin: "0 auto 28px",

              borderRadius: 28,

              border: `2px dashed ${COLORS.accent}`,

              background: "rgba(205,76,126,0.04)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 54 }}>📷</div>

            <div
              style={{
                fontSize: 13,
                color: COLORS.textSec,
              }}
            >
              Arahkan kamera ke QR
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 13,
              color: COLORS.textSec,
              marginBottom: 14,
            }}
          >
            atau masukkan ID manual
          </div>

          {/* INPUT */}
          <input
            placeholder="Contoh: GYM001"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verify()}
            style={{
              width: "100%",

              background: "#FFFFFF",

              border: `1px solid ${COLORS.border}`,

              borderRadius: 16,

              padding: "15px 18px",

              color: COLORS.text,

              fontSize: 16,

              textAlign: "center",

              outline: "none",

              boxSizing: "border-box",

              fontFamily: "Inter, sans-serif",

              marginBottom: 16,

              transition: "0.2s ease",
            }}
          />

          {/* BUTTON */}
          <button
            onClick={verify}
            style={{
              width: "100%",

              background: COLORS.accent,

              color: "#FFFFFF",

              border: "none",

              padding: "15px",

              borderRadius: 16,

              fontWeight: 700,

              cursor: "pointer",

              fontSize: 14,

              boxShadow: "0 10px 24px rgba(205,76,126,0.22)",
            }}
          >
            VERIFIKASI AKSES
          </button>
        </Card>

        {/* RESULT */}
        <AccessResult result={result} />
      </div>

      {/* ============================================================
          ACCESS LOG
      ============================================================ */}
      <Card
        style={{
          borderRadius: 24,
        }}
      >
        <SectionTitle>Log Akses Hari Ini</SectionTitle>

        {database.accessLogs.slice(0, 8).map((l, i, logs) => (
          <div
            key={l.id || i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,

              padding: "14px 0",

              borderBottom:
                i < logs.length - 1
                  ? `1px solid ${COLORS.border}`
                  : "none",
            }}
          >
            {/* TIME */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,

                color: COLORS.textSec,

                minWidth: 52,
              }}
            >
              {l.time}
            </span>

            {/* NAME */}
            <span
              style={{
                flex: 1,
                fontSize: 14,
                fontWeight: 500,
                color: COLORS.text,
              }}
            >
              {l.name}
            </span>

            {/* METHOD */}
            <span
              style={{
                fontSize: 13,
                color: COLORS.textSec,
              }}
            >
              {l.method}
            </span>

            {/* STATUS */}
            <Badge color={l.status === "Masuk" ? "green" : "red"}>
              {l.status}
            </Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}