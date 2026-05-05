// ============================================================
//  pages/Akses.jsx  —  QR / ID access verification system
// ============================================================
import { useState } from "react";
import { COLORS } from "../constants";
import { PageHeader, Card, SectionTitle, Badge } from "../components/UI";

/* Result card after verification */
function AccessResult({ result }) {
  if (!result) {
    return (
      <div style={{
        background: COLORS.card, border: `1px solid ${COLORS.border}`,
        borderRadius: 16, padding: 32,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", minHeight: 280,
      }}>
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🔐</div>
        <div style={{ color: COLORS.textSec, fontSize: 14 }}>
          Scan QR atau masukkan ID untuk verifikasi akses anggota
        </div>
      </div>
    );
  }

  const allowed = result.allowed;
  return (
    <div style={{
      background: allowed ? "#001a0d" : "#1a0000",
      border:     `2px solid ${allowed ? COLORS.green : COLORS.red}`,
      borderRadius: 16, padding: 32,
      textAlign: "center", minHeight: 280,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>
        {allowed ? "✅" : "❌"}
      </div>
      <div style={{
        fontSize: 22, fontWeight: 900,
        color: allowed ? COLORS.green : COLORS.red, marginBottom: 8,
      }}>
        {allowed ? "AKSES DIBERIKAN" : "AKSES DITOLAK"}
      </div>
      {!result.unknown && (
        <>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
            {result.name}
          </div>
          <div style={{ fontSize: 13, color: COLORS.textSec }}>
            {result.id} · Paket {result.plan}
          </div>
          <div style={{ marginTop: 12 }}>
            <Badge color={allowed ? "green" : "red"}>{result.status}</Badge>
          </div>
        </>
      )}
      {result.unknown && (
        <div style={{ fontSize: 14, color: COLORS.textSec }}>
          ID tidak ditemukan dalam database
        </div>
      )}
    </div>
  );
}

export default function Akses({ database, actions }) {
  const [input,  setInput]  = useState("");
  const [result, setResult] = useState(null);

  const verify = () => {
    if (!input.trim()) return;
    const found = database.members.find(
      (m) =>
        m.id   === input.trim().toUpperCase() ||
        m.name.toLowerCase() === input.trim().toLowerCase()
    );
    const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    if (found) {
      const allowed = found.status !== "Kadaluarsa";
      setResult({ ...found, allowed });
      actions.updateDatabase((current) => ({
        ...current,
        accessLogs: [
          { id: `ACC${Date.now()}`, time, name: found.name, method: "ID Manual", status: allowed ? "Masuk" : "Ditolak" },
          ...current.accessLogs,
        ],
      }));
    } else {
      setResult({ allowed: false, unknown: true });
      actions.updateDatabase((current) => ({
        ...current,
        accessLogs: [
          { id: `ACC${Date.now()}`, time, name: input.trim(), method: "ID Manual", status: "Ditolak" },
          ...current.accessLogs,
        ],
      }));
    }
  };

  return (
    <div>
      <PageHeader
        title="Sistem Akses"
        subtitle="Verifikasi cepat via QR Code atau ID Anggota"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>

        {/* ── Scanner / Input panel ── */}
        <Card style={{ textAlign: "center", padding: 32 }}>
          <SectionTitle>Scan / Input ID</SectionTitle>

          {/* Fake camera viewfinder */}
          <div style={{
            width: 160, height: 160,
            border: `2px dashed ${COLORS.accent}`,
            borderRadius: 16, margin: "0 auto 24px",
            display: "flex", alignItems: "center",
            justifyContent: "center", flexDirection: "column", gap: 8,
          }}>
            <div style={{ fontSize: 40 }}>📷</div>
            <div style={{ fontSize: 11, color: COLORS.textSec }}>Arahkan kamera ke QR</div>
          </div>

          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 12 }}>
            atau masukkan ID manual
          </div>

          <input
            placeholder="Contoh: GYM001"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verify()}
            style={{
              width: "100%", background: COLORS.dark,
              border: `1px solid ${COLORS.border}`, borderRadius: 8,
              padding: 12, color: COLORS.text, fontSize: 16,
              textAlign: "center", outline: "none",
              boxSizing: "border-box", fontFamily: "monospace", marginBottom: 12,
            }}
          />

          <button
            onClick={verify}
            style={{
              width: "100%", background: COLORS.accent, color: COLORS.black,
              border: "none", padding: 12, borderRadius: 8,
              fontWeight: 900, cursor: "pointer", fontSize: 14,
            }}
          >
            VERIFIKASI AKSES
          </button>
        </Card>

        {/* ── Result panel ── */}
        <AccessResult result={result} />
      </div>

      {/* ── Access Log ── */}
      <Card>
        <SectionTitle>Log Akses Hari Ini</SectionTitle>
        {database.accessLogs.slice(0, 8).map((l, i, logs) => (
          <div key={l.id || i} style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "10px 0",
            borderBottom: i < logs.length - 1
              ? `1px solid ${COLORS.border}` : "none",
          }}>
            <span style={{
              fontSize: 12, fontFamily: "monospace",
              color: COLORS.textSec, minWidth: 45,
            }}>
              {l.time}
            </span>
            <span style={{ flex: 1, fontSize: 13, color: COLORS.text }}>{l.name}</span>
            <span style={{ fontSize: 12, color: COLORS.textSec }}>{l.method}</span>
            <Badge color={l.status === "Masuk" ? "green" : "red"}>{l.status}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
