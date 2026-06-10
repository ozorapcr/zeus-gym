// ============================================================
//  pages/Laporan.jsx  —  Modern Analytics & Reports UI
// ============================================================

import { COLORS } from "../constants";

import {
  PageHeader,
  Card,
  SectionTitle,
} from "../components/UI";

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

/* ============================================================
   MONTHLY DATA
============================================================ */
const MONTH_DATA = [
  12, 18, 15, 22, 19, 24,
  21, 28, 18, 26, 23, 30,
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr",
  "Mei", "Jun", "Jul", "Agu",
  "Sep", "Okt", "Nov", "Des",
];

const MAX_VAL = Math.max(...MONTH_DATA);

/* ============================================================
   PACKAGE REVENUE
============================================================ */
const PACKAGE_REVENUE = [
  {
    name: "VIP",
    rev: "Rp 72jt",
    pct: 33,
    opacity: 1,
  },

  {
    name: "Premium",
    rev: "Rp 98jt",
    pct: 45,
    opacity: 0.75,
  },

  {
    name: "Basic",
    rev: "Rp 48jt",
    pct: 22,
    opacity: 0.45,
  },
];

/* ============================================================
   EXPORT LIST
============================================================ */
const EXPORTS = [
  {
    label: "Laporan Keuangan Bulanan",
    fmt: "PDF",
  },

  {
    label: "Daftar Anggota Aktif",
    fmt: "Excel",
  },

  {
    label: "Laporan Kunjungan",
    fmt: "PDF",
  },

  {
    label: "Ringkasan Pembayaran",
    fmt: "CSV",
  },
];

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Laporan() {
  return (
    <div>
      {/* ============================================================
          HEADER
      ============================================================ */}
      <PageHeader
        title="Laporan Real-time"
        subtitle="Laporan keuangan dan operasional diperbarui secara otomatis"
      />

      {/* ============================================================
          SUMMARY STATS - BENTUK KOTAK (W:245, H:162, Radius:15, Fill:#D9D9D9)
      ============================================================ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <StatCard
          label="Total Pendapatan"
          value="Rp 218jt"
          sub="Tahun 2025"
        />

        <StatCard
          label="Anggota Baru"
          value="248"
          sub="Tahun 2025"
        />

        <StatCard
          label="Tingkat Retensi"
          value="87%"
          sub="dari target 80%"
        />

        <StatCard
          label="Rata-rata Kunjungan"
          value="72/hari"
          sub="bulan ini"
        />
      </div>

      {/* ============================================================
          MONTHLY CHART
      ============================================================ */}
      <Card
        style={{
          marginBottom: 28,

          borderRadius: 28,

          padding: 30,
        }}
      >
        <SectionTitle>
          Pendapatan Bulanan
        </SectionTitle>

        <div
          style={{
            display: "flex",

            alignItems: "flex-end",

            gap: 10,

            height: 260,

            marginTop: 18,
          }}
        >
          {MONTH_DATA.map((v, i) => (
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
                  fontSize: 11,

                  color:
                    i === 11
                      ? COLORS.accent
                      : COLORS.textSec,

                  fontWeight:
                    i === 11 ? 700 : 500,
                }}
              >
                {v}jt
              </span>

              {/* BAR */}
              <div
                style={{
                  width: "100%",

                  borderRadius:
                    "14px 14px 6px 6px",

                  background:
                    i === 11
                      ? COLORS.accent
                      : "#EEF2F6",

                  height: `${
                    (v / MAX_VAL) * 100
                  }%`,

                  minHeight: 10,

                  transition: "0.3s ease",

                  boxShadow:
                    i === 11
                      ? "0 10px 24px rgba(205,76,126,0.20)"
                      : "none",
                }}
              />

              {/* MONTH */}
              <span
                style={{
                  fontSize: 11,

                  color:
                    i === 11
                      ? COLORS.text
                      : COLORS.textSec,

                  fontWeight:
                    i === 11 ? 700 : 500,
                }}
              >
                {MONTHS[i]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ============================================================
          BOTTOM GRID
      ============================================================ */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: 22,
        }}
      >
        {/* ============================================================
            PACKAGE REVENUE
        ============================================================ */}
        <Card
          style={{
            borderRadius: 28,

            padding: 30,
          }}
        >
          <SectionTitle>
            Pendapatan per Paket
          </SectionTitle>

          {PACKAGE_REVENUE.map(
            ({
              name,
              rev,
              pct,
              opacity,
            }) => (
              <div
                key={name}
                style={{
                  marginBottom: 24,
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,

                      fontWeight: 600,

                      color: COLORS.text,
                    }}
                  >
                    {name}
                  </span>

                  <span
                    style={{
                      fontSize: 14,

                      fontWeight: 700,

                      color:
                        COLORS.accent,
                    }}
                  >
                    {rev}
                  </span>
                </div>

                {/* PROGRESS */}
                <div
                  style={{
                    background: "#EEF2F6",

                    borderRadius: 999,

                    height: 12,

                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,

                      background:
                        COLORS.accent,

                      borderRadius: 999,

                      height: "100%",

                      opacity,

                      transition:
                        "0.3s ease",
                    }}
                  />
                </div>

                {/* FOOTER */}
                <div
                  style={{
                    fontSize: 12,

                    color:
                      COLORS.textSec,

                    marginTop: 8,

                    lineHeight: 1.5,
                  }}
                >
                  {pct}% dari total
                  pendapatan
                </div>
              </div>
            )
          )}
        </Card>

        {/* ============================================================
            EXPORT REPORTS
        ============================================================ */}
        <Card
          style={{
            borderRadius: 28,

            padding: 30,
          }}
        >
          <SectionTitle>
            Ekspor Laporan
          </SectionTitle>

          {EXPORTS.map(
            ({ label, fmt }) => (
              <div
                key={label}
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  padding: "14px 0",

                  borderBottom:
                    `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: 14,

                    color:
                      COLORS.text,

                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>

                <button
                  style={{
                    background:
                      "rgba(205,76,126,0.10)",

                    color:
                      COLORS.accent,

                    border: "none",

                    padding:
                      "10px 16px",

                    borderRadius: 14,

                    cursor: "pointer",

                    fontSize: 12,

                    fontWeight: 700,

                    transition:
                      "0.2s ease",
                  }}
                >
                  {fmt} ↓
                </button>
              </div>
            )
          )}

          {/* PERIOD */}
          <div
            style={{
              marginTop: 28,
            }}
          >
            <div
              style={{
                fontSize: 13,

                color:
                  COLORS.textSec,

                marginBottom: 14,

                fontWeight: 600,
              }}
            >
              Periode Laporan
            </div>

            <div
              style={{
                display: "flex",

                gap: 10,
              }}
            >
              {[
                "Mingguan",
                "Bulanan",
                "Tahunan",
              ].map((p) => (
                <button
                  key={p}
                  style={{
                    background:
                      p === "Bulanan"
                        ? COLORS.accent
                        : "#F4F6F8",

                    color:
                      p === "Bulanan"
                        ? "#FFFFFF"
                        : COLORS.textSec,

                    border: "none",

                    padding:
                      "11px 18px",

                    borderRadius: 16,

                    cursor: "pointer",

                    fontSize: 13,

                    fontWeight:
                      p === "Bulanan"
                        ? 700
                        : 500,

                    transition:
                      "0.2s ease",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}