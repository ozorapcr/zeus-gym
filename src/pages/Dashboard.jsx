// ============================================================
//  pages/Dashboard.jsx  —  Modern CRM Dashboard UI
// ============================================================

import { COLORS } from "../constants";
import {
  Card,
  SectionTitle,
  PageHeader,
} from "../components/UI";

const BAR_DATA = [65, 80, 72, 90, 85, 78, 95];

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

/* ============================================================
   STAT CARD - BENTUK KOTAK (W:245, H:162, Radius:15, Fill:#D9D9D9)
============================================================ */
function StatCard({ label, value, sub }) {
  return (
    <div
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
      {/* VALUE */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: COLORS.accent,
          lineHeight: 1,
        }}
      >
        {value}
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

      {/* SUB */}
      <div
        style={{
          fontSize: 13,
          color: COLORS.textSec,
          marginTop: 6,
          lineHeight: 1.6,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

export default function Dashboard({ database }) {
  const members = database.members;
  const transactions = database.transactions;

  const activeMembers = members.filter(
    (m) => m.status === "Aktif"
  ).length;

  const expiringMembers = members.filter(
    (m) => m.status !== "Aktif"
  ).length;

  const monthlyRevenue = transactions
    .filter((t) => t.status === "Sukses")
    .reduce((total, trx) => total + trx.amount, 0);

  const planCounts = members.reduce((acc, member) => {
    acc[member.plan] = (acc[member.plan] || 0) + 1;
    return acc;
  }, {});

  const recentActivity = [
    ...transactions.slice(-2).map((trx) => ({
      time: trx.date,
      event: `Pembayaran Rp ${trx.amount.toLocaleString(
        "id-ID"
      )} dari ${trx.member}`,
    })),

    ...members.slice(-2).map((member) => ({
      time: member.expiry,
      event: `Anggota baru terdaftar: ${member.name}`,
    })),
  ].reverse();

  return (
    <div>
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan operasional gym hari ini"
      />

      {/* ============================================================
          STATS - BENTUK KOTAK (W:245, H:162, Radius:15, Fill:#D9D9D9)
      ============================================================ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <StatCard
          label="Total Anggota"
          value={members.length}
          sub="tersimpan di database"
        />

        <StatCard
          label="Anggota Aktif"
          value={activeMembers}
          sub={`dari ${members.length} anggota`}
        />

        <StatCard
          label="Pendapatan"
          value={`Rp ${(monthlyRevenue / 1000000).toFixed(1)}jt`}
          sub="transaksi sukses"
        />

        <StatCard
          label="Perlu Tindak Lanjut"
          value={expiringMembers}
          sub="hampir habis / kadaluarsa"
        />
      </div>

      {/* ============================================================
          CHART SECTION
      ============================================================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* ============================================================
            WEEKLY VISIT CHART
        ============================================================ */}
        <Card
          style={{
            borderRadius: 24,
          }}
        >
          <SectionTitle>Kunjungan Mingguan</SectionTitle>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 14,
              height: 240,
              marginTop: 12,
            }}
          >
            {BAR_DATA.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,

                  display: "flex",
                  flexDirection: "column",

                  alignItems: "center",
                  justifyContent: "flex-end",

                  gap: 10,
                }}
              >
                {/* VALUE */}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color:
                      i === 6
                        ? COLORS.accent
                        : COLORS.textSec,
                  }}
                >
                  {h}
                </span>

                {/* BAR */}
                <div
                  style={{
                    width: "100%",

                    borderRadius: 16,

                    background:
                      i === 6
                        ? `linear-gradient(to top, ${COLORS.accent}, #e07ba3)`
                        : "#E9EDF2",

                    height: `${h}%`,

                    minHeight: 30,

                    transition: "0.3s ease",

                    boxShadow:
                      i === 6
                        ? "0 10px 24px rgba(205,76,126,0.25)"
                        : "none",
                  }}
                />

                {/* LABEL */}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: COLORS.textSec,
                  }}
                >
                  {DAYS[i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ============================================================
            PLAN DISTRIBUTION
        ============================================================ */}
        <Card
          style={{
            borderRadius: 24,
          }}
        >
          <SectionTitle>Distribusi Paket</SectionTitle>

          {[
            ["VIP", COLORS.accent],
            ["Premium", COLORS.orange],
            ["Basic", "#AAB2C0"],
          ].map(([label, col]) => {
            const pct = members.length
              ? Math.round(
                  ((planCounts[label] || 0) /
                    members.length) *
                    100
                )
              : 0;

            return (
              <div
                key={label}
                style={{
                  marginBottom: 22,
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: col,
                      }}
                    />

                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: COLORS.text,
                      }}
                    >
                      {label}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.textSec,
                    }}
                  >
                    {pct}%
                  </span>
                </div>

                {/* BAR */}
                <div
                  style={{
                    background: "#EEF2F6",
                    borderRadius: 999,
                    height: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      background: col,
                      borderRadius: 999,
                      height: "100%",
                      transition: "0.3s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* ============================================================
          RECENT ACTIVITY
      ============================================================ */}
      <Card
        style={{
          borderRadius: 24,
        }}
      >
        <SectionTitle>Aktivitas Terbaru</SectionTitle>

        <div
          style={{
            marginTop: 10,
          }}
        >
          {recentActivity.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,

                padding: "16px 0",

                borderBottom:
                  i < recentActivity.length - 1
                    ? `1px solid ${COLORS.border}`
                    : "none",
              }}
            >
              {/* TIMELINE DOT */}
              <div
                style={{
                  width: 12,
                  height: 12,

                  borderRadius: 999,

                  background: COLORS.accent,

                  boxShadow:
                    "0 0 0 6px rgba(205,76,126,0.10)",

                  flexShrink: 0,
                }}
              />

              {/* TIME */}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,

                  color: COLORS.textSec,

                  minWidth: 70,
                }}
              >
                {a.time}
              </span>

              {/* EVENT */}
              <span
                style={{
                  fontSize: 14,
                  color: COLORS.text,

                  lineHeight: 1.6,
                }}
              >
                {a.event}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}