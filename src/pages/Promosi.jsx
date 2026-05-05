// ============================================================
//  pages/Promosi.jsx  —  Digital marketing & referral automation
// ============================================================
import { useState } from "react";
import { COLORS } from "../constants";
import { PageHeader, Card, SectionTitle, Badge } from "../components/UI";

const PROMOS = [
  { title: "Ramadan Fit",   disc: "20% OFF",    expires: "31 Mei 2025",  status: "Aktif" },
  { title: "Bring a Friend",disc: "1+1 Gratis", expires: "30 Jun 2025",  status: "Aktif" },
  { title: "Pelajar Special",disc: "35% OFF",   expires: "31 Jul 2025",  status: "Draft"  },
];

const SHARE_CHANNELS = ["WhatsApp", "Instagram", "Email"];

const SEGMENTS = [
  "Semua Anggota (248)",
  "Anggota Kadaluarsa (14)",
  "Paket Premium (99)",
  "Belum Bayar (8)",
];

const CHANNELS = ["WhatsApp", "Email", "Push Notification"];

export default function Promosi() {
  const [sent, setSent] = useState(false);

  // Generate a stable referral code once
  const [referralCode] = useState(
    () => "FITPRO" + String(Math.floor(Math.random() * 900) + 100)
  );

  return (
    <div>
      <PageHeader
        title="Promosi & Referral"
        subtitle="Otomatisasi marketing digital dan sistem referral anggota"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>

        {/* ── Referral Card ── */}
        <div style={{
          background: "linear-gradient(135deg,#1a1f00,#2a3000)",
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 16, padding: 28,
        }}>
          <SectionTitle>Program Referral</SectionTitle>
          <p style={{ fontSize: 14, color: COLORS.textSec, marginBottom: 20 }}>
            Bagikan kode referral dan dapatkan diskon 15% untuk perpanjangan berikutnya!
          </p>

          {/* Code display */}
          <div style={{
            background: COLORS.black, borderRadius: 10,
            padding: "14px 20px", textAlign: "center", marginBottom: 20,
          }}>
            <div style={{ fontSize: 11, color: COLORS.textSec, marginBottom: 4 }}>
              KODE REFERRAL ANDA
            </div>
            <div style={{
              fontSize: 28, fontWeight: 900, color: COLORS.accent,
              fontFamily: "monospace", letterSpacing: 4,
            }}>
              {referralCode}
            </div>
          </div>

          {/* Share buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {SHARE_CHANNELS.map((ch) => (
              <button key={ch} style={{
                background: COLORS.accent, color: COLORS.black,
                border: "none", padding: "8px 4px", borderRadius: 8,
                fontWeight: 800, cursor: "pointer", fontSize: 11,
              }}>
                {ch}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 12, marginTop: 20,
          }}>
            {[
              ["Referral Terkirim", "24"],
              ["Konversi",          "11"],
            ].map(([label, val]) => (
              <div key={label} style={{
                background: "#0a0a0a", borderRadius: 8,
                padding: "12px 14px",
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.accent, fontFamily: "monospace" }}>
                  {val}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Active Promos ── */}
        <Card>
          <SectionTitle>Promo Aktif</SectionTitle>
          {PROMOS.map((p) => (
            <div key={p.title} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "14px 0",
              borderBottom: `1px solid ${COLORS.border}`,
            }}>
              <div>
                <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 14 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginTop: 2 }}>
                  Exp: {p.expires}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontWeight: 800, color: COLORS.accent,
                  fontSize: 15, marginBottom: 6,
                }}>
                  {p.disc}
                </div>
                <Badge color={p.status === "Aktif" ? "green" : "muted"}>
                  {p.status}
                </Badge>
              </div>
            </div>
          ))}

          <button style={{
            marginTop: 16, background: "transparent",
            color: COLORS.accent, border: `1px solid ${COLORS.accent}`,
            padding: "8px 20px", borderRadius: 8,
            cursor: "pointer", fontSize: 12, fontWeight: 700,
          }}>
            + Tambah Promo Baru
          </button>
        </Card>
      </div>

      {/* ── Blast Notification ── */}
      <Card>
        <SectionTitle>Kirim Notifikasi Massal</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          <div>
            <label style={{ display: "block", fontSize: 12, color: COLORS.textSec, marginBottom: 6 }}>
              Target Segmen
            </label>
            <select style={{
              width: "100%", background: COLORS.dark,
              border: `1px solid ${COLORS.border}`, borderRadius: 8,
              padding: "10px 14px", color: COLORS.text,
              fontSize: 14, outline: "none",
            }}>
              {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: COLORS.textSec, marginBottom: 6 }}>
              Channel
            </label>
            <select style={{
              width: "100%", background: COLORS.dark,
              border: `1px solid ${COLORS.border}`, borderRadius: 8,
              padding: "10px 14px", color: COLORS.text,
              fontSize: 14, outline: "none",
            }}>
              {CHANNELS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", fontSize: 12, color: COLORS.textSec, marginBottom: 6 }}>
              Isi Pesan
            </label>
            <textarea
              rows={3}
              placeholder="Tulis pesan promosi..."
              style={{
                width: "100%", background: COLORS.dark,
                border: `1px solid ${COLORS.border}`, borderRadius: 8,
                padding: "10px 14px", color: COLORS.text,
                fontSize: 14, outline: "none", resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ gridColumn: "span 2", display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => setSent(true)}
              style={{
                background: COLORS.accent, color: COLORS.black,
                border: "none", padding: "12px 32px",
                borderRadius: 8, fontWeight: 900,
                cursor: "pointer", fontSize: 14,
              }}
            >
              KIRIM SEKARANG
            </button>
            {sent && (
              <span style={{ fontSize: 13, color: COLORS.green }}>
                ✓ Notifikasi berhasil dikirim!
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}