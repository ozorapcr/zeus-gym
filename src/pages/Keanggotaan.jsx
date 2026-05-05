// ============================================================
//  pages/Keanggotaan.jsx  —  Membership tracking & management
// ============================================================
import { useState } from "react";
import { COLORS } from "../constants";
import { PageHeader, Badge } from "../components/UI";
import { addMonths } from "../dataStore";

const STATUS_COLOR = {
  "Aktif":        "green",
  "Hampir Habis": "orange",
  "Kadaluarsa":   "red",
};

/* Member row card */
function MemberCard({ m, onRenew }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 12, padding: "18px 24px",
      display: "flex", alignItems: "center", gap: 20,
      transition: "border-color 0.15s",
    }}>
      {/* Avatar */}
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: COLORS.accent, color: COLORS.black,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 14, flexShrink: 0,
      }}>
        {m.avatar}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15 }}>{m.name}</div>
        <div style={{ fontSize: 12, color: COLORS.textSec, marginTop: 2 }}>
          {m.id} · Paket {m.plan}
        </div>
      </div>

      {/* Status + Expiry */}
      <div style={{ textAlign: "right" }}>
        <Badge color={STATUS_COLOR[m.status]}>{m.status}</Badge>
        <div style={{ fontSize: 11, color: COLORS.textSec, marginTop: 6 }}>
          Exp: {m.expiry}
        </div>
      </div>

      {/* Renew button (only for non-active) */}
      {m.status !== "Aktif" && (
        <button onClick={() => onRenew(m.id)} style={{
          background: COLORS.accent, color: COLORS.black,
          border: "none", padding: "8px 16px", borderRadius: 8,
          fontWeight: 800, cursor: "pointer", fontSize: 12,
        }}>
          Perpanjang
        </button>
      )}
    </div>
  );
}

export default function Keanggotaan({ database, actions }) {
  const [search, setSearch] = useState("");
  const members = database.members;

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
  );

  // Summary counts
  const counts = members.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});
  const renewMember = (memberId) => {
    actions.updateDatabase((current) => ({
      ...current,
      members: current.members.map((member) => (
        member.id === memberId
          ? { ...member, status: "Aktif", expiry: addMonths(new Date(), 1) }
          : member
      )),
    }));
  };

  return (
    <div>
      <PageHeader
        title="Tracking Keanggotaan"
        subtitle="Status otomatis & reminder pengingat perpanjangan keanggotaan"
      />

      {/* Summary strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12, marginBottom: 24,
      }}>
        {[
          ["Aktif",        counts["Aktif"]        || 0, "green"],
          ["Hampir Habis", counts["Hampir Habis"]  || 0, "orange"],
          ["Kadaluarsa",   counts["Kadaluarsa"]    || 0, "red"],
        ].map(([label, count, color]) => {
          const col = { green: COLORS.green, orange: COLORS.orange, red: COLORS.red }[color];
          return (
            <div key={label} style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: 10, padding: "16px 20px",
              borderTop: `3px solid ${col}`,
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: col, fontFamily: "monospace" }}>
                {count}
              </div>
              <div style={{ fontSize: 12, color: COLORS.textSec, marginTop: 4 }}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <input
        placeholder="Cari nama atau ID anggota..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%", background: COLORS.card,
          border: `1px solid ${COLORS.border}`, borderRadius: 10,
          padding: "12px 16px", color: COLORS.text,
          fontSize: 14, outline: "none", boxSizing: "border-box",
          marginBottom: 20,
        }}
      />

      {/* Member list */}
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: COLORS.textSec }}>
            Tidak ada anggota ditemukan.
          </div>
        ) : (
          filtered.map((m) => <MemberCard key={m.id} m={m} onRenew={renewMember} />)
        )}
      </div>
    </div>
  );
}
