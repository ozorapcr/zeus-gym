// ============================================================
//  pages/Keanggotaan.jsx  —  Modern Membership Management UI
// ============================================================

import { useState } from "react";

import { COLORS } from "../constants";

import {
  PageHeader,
  Badge,
} from "../components/UI";

import { addMonths } from "../dataStore";

/* ============================================================
   STATUS COLOR
============================================================ */
const STATUS_COLOR = {
  Aktif: "green",
  "Hampir Habis": "orange",
  Kadaluarsa: "red",
};

/* ============================================================
   MEMBER CARD
============================================================ */
function MemberCard({ m, onRenew }) {
  return (
    <div
      style={{
        background: COLORS.card,

        border: `1px solid ${COLORS.border}`,

        borderRadius: 24,

        padding: "20px 24px",

        display: "flex",
        alignItems: "center",

        gap: 20,

        transition: "0.2s ease",

        boxShadow:
          "0 6px 24px rgba(0,0,0,0.03)",
      }}
    >
      {/* ============================================================
          AVATAR
      ============================================================ */}
      <div
        style={{
          width: 58,
          height: 58,

          borderRadius: 18,

          background:
            "rgba(205,76,126,0.12)",

          color: COLORS.accent,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontWeight: 700,

          fontSize: 15,

          flexShrink: 0,
        }}
      >
        {m.avatar}
      </div>

      {/* ============================================================
          INFO
      ============================================================ */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 700,

            color: COLORS.text,

            fontSize: 16,

            marginBottom: 4,
          }}
        >
          {m.name}
        </div>

        <div
          style={{
            fontSize: 13,

            color: COLORS.textSec,

            lineHeight: 1.6,
          }}
        >
          {m.id} • Paket {m.plan}
        </div>
      </div>

      {/* ============================================================
          STATUS
      ============================================================ */}
      <div
        style={{
          textAlign: "right",

          minWidth: 130,
        }}
      >
        <Badge color={STATUS_COLOR[m.status]}>
          {m.status}
        </Badge>

        <div
          style={{
            fontSize: 12,

            color: COLORS.textSec,

            marginTop: 8,
          }}
        >
          Exp: {m.expiry}
        </div>
      </div>

      {/* ============================================================
          BUTTON
      ============================================================ */}
      {m.status !== "Aktif" && (
        <button
          onClick={() => onRenew(m.id)}
          style={{
            background: COLORS.accent,

            color: "#FFFFFF",

            border: "none",

            padding: "12px 18px",

            borderRadius: 16,

            fontWeight: 700,

            cursor: "pointer",

            fontSize: 13,

            boxShadow:
              "0 10px 24px rgba(205,76,126,0.22)",
          }}
        >
          Perpanjang
        </button>
      )}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Keanggotaan({
  database,
  actions,
}) {
  const [search, setSearch] = useState("");

  const members = database.members;

  /* ============================================================
     FILTER SEARCH
  ============================================================ */
  const filtered = members.filter(
    (m) =>
      m.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      m.id
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  /* ============================================================
     SUMMARY COUNT
  ============================================================ */
  const counts = members.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;

    return acc;
  }, {});

  /* ============================================================
     RENEW MEMBER
  ============================================================ */
  const renewMember = (memberId) => {
    actions.updateDatabase((current) => ({
      ...current,

      members: current.members.map((member) =>
        member.id === memberId
          ? {
              ...member,

              status: "Aktif",

              expiry: addMonths(
                new Date(),
                1
              ),
            }
          : member
      ),
    }));
  };

  return (
    <div>
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}
      <PageHeader
        title="Tracking Keanggotaan"
        subtitle="Status otomatis & reminder pengingat perpanjangan keanggotaan"
      />

      {/* ============================================================
          SUMMARY - BENTUK KOTAK (W:245, H:162, Radius:15, Fill:#D9D9D9) - TANPA GARIS WARNA
      ============================================================ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          marginBottom: 28,
        }}
      >
        {[
          ["Aktif", counts["Aktif"] || 0, COLORS.green, "Member aktif saat ini"],
          ["Hampir Habis", counts["Hampir Habis"] || 0, COLORS.orange, "Perlu diperpanjang"],
          ["Kadaluarsa", counts["Kadaluarsa"] || 0, COLORS.red, "Tidak aktif"],
        ].map(([label, count, color, desc]) => (
          <div
            key={label}
            style={{
              width: 245,
              height: 162,
              background: "#D9D9D9",
              borderRadius: 15,
              padding: "24px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.03)",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* NOMOR */}
            <div
              style={{
                fontSize: 42,
                fontWeight: 800,
                color: color,
                lineHeight: 1,
              }}
            >
              {count}
            </div>

            {/* LABEL */}
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: COLORS.text,
                marginTop: 14,
              }}
            >
              {label}
            </div>

            {/* DESC */}
            <div
              style={{
                fontSize: 13,
                color: COLORS.textSec,
                marginTop: 6,
                lineHeight: 1.6,
              }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================
          SEARCH
      ============================================================ */}
      <div
        style={{
          position: "relative",

          marginBottom: 24,
        }}
      >
        <input
          placeholder="Cari nama atau ID anggota..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",

            background: "#FFFFFF",

            border: `1px solid ${COLORS.border}`,

            borderRadius: 20,

            padding: "16px 18px",

            color: COLORS.text,

            fontSize: 14,

            outline: "none",

            boxSizing: "border-box",

            transition: "0.2s ease",

            boxShadow:
              "0 4px 18px rgba(0,0,0,0.02)",
          }}
        />
      </div>

      {/* ============================================================
          MEMBER LIST
      ============================================================ */}
      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              background: COLORS.card,

              border: `1px solid ${COLORS.border}`,

              borderRadius: 24,

              padding: 50,

              textAlign: "center",

              color: COLORS.textSec,

              fontSize: 14,
            }}
          >
            Tidak ada anggota ditemukan.
          </div>
        ) : (
          filtered.map((m) => (
            <MemberCard
              key={m.id}
              m={m}
              onRenew={renewMember}
            />
          ))
        )}
      </div>
    </div>
  );
}