// ============================================================
//  pages/Laporan.jsx  —  Real-time financial & operational reports
// ============================================================
import { COLORS } from "../constants";
import { PageHeader, StatCard, Card, SectionTitle } from "../components/UI";

const MONTH_DATA = [12, 18, 15, 22, 19, 24, 21, 28, 18, 26, 23, 30];
const MONTHS     = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const MAX_VAL    = Math.max(...MONTH_DATA);

const PACKAGE_REVENUE = [
  { name: "VIP",     rev: "Rp 72jt",  pct: 33, opacity: 1.0 },
  { name: "Premium", rev: "Rp 98jt",  pct: 45, opacity: 0.7 },
  { name: "Basic",   rev: "Rp 48jt",  pct: 22, opacity: 0.4 },
];

const EXPORTS = [
  { label: "Laporan Keuangan Bulanan", fmt: "PDF"   },
  { label: "Daftar Anggota Aktif",     fmt: "Excel" },
  { label: "Laporan Kunjungan",        fmt: "PDF"   },
  { label: "Ringkasan Pembayaran",     fmt: "CSV"   },
];

export default function Laporan() {
  return (
    <div>
      <PageHeader
        title="Laporan Real-time"
        subtitle="Laporan keuangan dan operasional diperbarui secara otomatis"
      />

      {/* Summary Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
        gap: 16, marginBottom: 24,
      }}>
        <StatCard label="Total Pendapatan"    value="Rp 218jt"  sub="Tahun 2025"       accent />
        <StatCard label="Anggota Baru"        value="248"       sub="Tahun 2025" />
        <StatCard label="Tingkat Retensi"     value="87%"       sub="dari target 80%" />
        <StatCard label="Rata-rata Kunjungan" value="72/hari"   sub="bulan ini" />
      </div>

      {/* Monthly Revenue Bar Chart */}
      <Card style={{ marginBottom: 24 }}>
        <SectionTitle>Pendapatan Bulanan (Juta Rupiah)</SectionTitle>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
          {MONTH_DATA.map((v, i) => (
            <div key={i} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 9, color: COLORS.textSec }}>{v}jt</span>
              <div style={{
                width: "100%", borderRadius: "3px 3px 0 0",
                background: i === 4 ? COLORS.accent : "#333",
                height: `${(v / MAX_VAL) * 100}%`, minHeight: 4,
                transition: "height 0.3s",
              }} />
              <span style={{ fontSize: 9, color: COLORS.textSec }}>{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Revenue by Package */}
        <Card>
          <SectionTitle>Pendapatan per Paket</SectionTitle>
          {PACKAGE_REVENUE.map(({ name, rev, pct, opacity }) => (
            <div key={name} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: COLORS.text }}>{name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent }}>{rev}</span>
              </div>
              <div style={{ background: "#333", borderRadius: 4, height: 8 }}>
                <div style={{
                  width: `${pct}%`, background: COLORS.accent,
                  borderRadius: 4, height: "100%", opacity,
                }} />
              </div>
              <div style={{ fontSize: 11, color: COLORS.textSec, marginTop: 4 }}>
                {pct}% dari total pendapatan
              </div>
            </div>
          ))}
        </Card>

        {/* Export Reports */}
        <Card>
          <SectionTitle>Ekspor Laporan</SectionTitle>
          {EXPORTS.map(({ label, fmt }) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "12px 0",
              borderBottom: `1px solid ${COLORS.border}`,
            }}>
              <span style={{ fontSize: 13, color: COLORS.text }}>{label}</span>
              <button style={{
                background: "transparent", color: COLORS.accent,
                border: `1px solid ${COLORS.accent}`, padding: "5px 12px",
                borderRadius: 6, cursor: "pointer",
                fontSize: 11, fontWeight: 700,
              }}>
                {fmt} ↓
              </button>
            </div>
          ))}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 12 }}>
              Periode Laporan
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Mingguan","Bulanan","Tahunan"].map((p) => (
                <button key={p} style={{
                  background: p === "Bulanan" ? COLORS.accent : COLORS.dark,
                  color:      p === "Bulanan" ? COLORS.black  : COLORS.textSec,
                  border: `1px solid ${COLORS.border}`,
                  padding: "7px 14px", borderRadius: 8,
                  cursor: "pointer", fontSize: 12,
                  fontWeight: p === "Bulanan" ? 800 : 400,
                }}>
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