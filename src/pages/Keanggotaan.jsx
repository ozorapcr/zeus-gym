// ============================================================
//  pages/Keanggotaan.jsx  —  Modern Membership Management UI
// ============================================================

import { useState } from "react";

import { COLORS } from "../constants";

import {
  PageHeader,
  Badge,
  Card,
  SectionTitle,
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

function InfoItem({ label, value }) {
  return (
    <div
      style={{
        background: "#F7F8FA",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: COLORS.textSec,
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.text,
          lineHeight: 1.5,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function MemberDetail({ member, transactions, accessLogs, onClose, onRenew }) {
  if (!member) {
    return (
      <Card
        style={{
          borderRadius: 24,
          minHeight: 360,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "rgba(205,76,126,0.10)",
              color: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              margin: "0 auto 18px",
            }}
          >
            i
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: 8,
            }}
          >
            Pilih Anggota
          </div>
          <div
            style={{
              color: COLORS.textSec,
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: 280,
            }}
          >
            Klik tombol Detail pada salah satu anggota untuk melihat profil dan aktivitasnya.
          </div>
        </div>
      </Card>
    );
  }

  const totalPaid = transactions
    .filter((transaction) => transaction.status === "Sukses")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const latestTransaction = transactions[0];

  return (
    <Card style={{ borderRadius: 24, padding: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center", minWidth: 0 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "rgba(205,76,126,0.12)",
              color: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {member.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: COLORS.text,
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              {member.name}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <Badge color={STATUS_COLOR[member.status]}>{member.status}</Badge>
              <span style={{ color: COLORS.textSec, fontSize: 13, fontWeight: 700 }}>
                {member.id}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Tutup detail anggota"
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            border: `1px solid ${COLORS.border}`,
            background: "#FFFFFF",
            color: COLORS.textSec,
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          x
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 26,
        }}
      >
        <InfoItem label="Paket" value={member.plan} />
        <InfoItem label="Masa Berlaku" value={member.expiry} />
        <InfoItem label="Email" value={member.email} />
        <InfoItem label="No. HP" value={member.phone} />
        <InfoItem label="Alamat" value={member.address} />
        <InfoItem label="Total Bayar" value={`Rp ${totalPaid.toLocaleString("id-ID")}`} />
      </div>

      {member.status !== "Aktif" && (
        <button
          onClick={() => onRenew(member.id)}
          style={{
            width: "100%",
            background: COLORS.accent,
            color: "#FFFFFF",
            border: "none",
            padding: "13px 18px",
            borderRadius: 16,
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 26,
            boxShadow: "0 10px 24px rgba(205,76,126,0.22)",
          }}
        >
          Perpanjang Keanggotaan
        </button>
      )}

      <div style={{ marginBottom: 26 }}>
        <SectionTitle>Pembayaran Terakhir</SectionTitle>
        {latestTransaction ? (
          <div
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 16,
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: COLORS.text, marginBottom: 6 }}>
                {latestTransaction.id}
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSec }}>
                {latestTransaction.method} - {latestTransaction.date}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, color: COLORS.accent, marginBottom: 6 }}>
                Rp {latestTransaction.amount.toLocaleString("id-ID")}
              </div>
              <Badge color={latestTransaction.status === "Sukses" ? "green" : "orange"}>
                {latestTransaction.status}
              </Badge>
            </div>
          </div>
        ) : (
          <div style={{ color: COLORS.textSec, fontSize: 14 }}>
            Belum ada transaksi untuk anggota ini.
          </div>
        )}
      </div>

      <div>
        <SectionTitle>Riwayat Akses</SectionTitle>
        {accessLogs.length ? (
          accessLogs.slice(0, 4).map((log, index) => (
            <div
              key={log.id || index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom:
                  index < Math.min(accessLogs.length, 4) - 1
                    ? `1px solid ${COLORS.border}`
                    : "none",
              }}
            >
              <span style={{ minWidth: 48, fontSize: 12, color: COLORS.textSec, fontWeight: 700 }}>
                {log.time}
              </span>
              <span style={{ flex: 1, fontSize: 13, color: COLORS.textSec }}>
                {log.method}
              </span>
              <Badge color={log.status === "Masuk" ? "green" : "red"}>{log.status}</Badge>
            </div>
          ))
        ) : (
          <div style={{ color: COLORS.textSec, fontSize: 14 }}>
            Belum ada riwayat akses.
          </div>
        )}
      </div>
    </Card>
  );
}

/* ============================================================
   MEMBER CARD
============================================================ */
function MemberCard({ m, selected, onDetail, onRenew }) {
  return (
    <div
      style={{
        background: COLORS.card,

        border: `1px solid ${selected ? COLORS.accent : COLORS.border}`,

        borderRadius: 24,

        padding: "20px 24px",

        display: "flex",
        alignItems: "center",

        gap: 20,

        transition: "0.2s ease",

        boxShadow:
          selected
            ? "0 10px 28px rgba(205,76,126,0.16)"
            : "0 6px 24px rgba(0,0,0,0.03)",
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
      <button
        onClick={() => onDetail(m.id)}
        style={{
          background: selected ? COLORS.accent : "#F4F6F8",

          color: selected ? "#FFFFFF" : COLORS.textSec,

          border: "none",

          padding: "12px 18px",

          borderRadius: 16,

          fontWeight: 700,

          cursor: "pointer",

          fontSize: 13,
        }}
      >
        Detail
      </button>

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
  detailMemberId = "",
  onOpenMemberDetail,
  onCloseMemberDetail,
}) {
  const [search, setSearch] = useState("");
  const [localSelectedMemberId, setLocalSelectedMemberId] = useState(detailMemberId);

  const members = database.members;
  const selectedMemberId = onOpenMemberDetail ? detailMemberId : localSelectedMemberId;
  const selectedMember = members.find((member) => member.id === selectedMemberId);
  const selectedTransactions = selectedMember
    ? database.transactions.filter(
        (transaction) =>
          transaction.memberId === selectedMember.id ||
          transaction.member === selectedMember.name
      )
    : [];
  const selectedAccessLogs = selectedMember
    ? database.accessLogs.filter((log) => log.name === selectedMember.name)
    : [];

  const openDetail = (memberId) => {
    setLocalSelectedMemberId(memberId);
    onOpenMemberDetail?.(memberId);
  };

  const closeDetail = () => {
    setLocalSelectedMemberId("");
    onCloseMemberDetail?.();
  };

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
      {/* Add Detail Panel */}
      <div
        className="member-detail-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 0.85fr)",
          gap: 22,
          alignItems: "start",
        }}
      >
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
                selected={selectedMemberId === m.id}
                onDetail={openDetail}
                onRenew={renewMember}
              />
            ))
          )}
        </div>

        <div className="member-detail-panel" style={{ position: "sticky", top: 24 }}>
          <MemberDetail
            member={selectedMember}
            transactions={selectedTransactions}
            accessLogs={selectedAccessLogs}
            onClose={closeDetail}
            onRenew={renewMember}
          />
        </div>
      </div>
    </div>
  );
}
