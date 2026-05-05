// ============================================================
//  pages/Dashboard.jsx  —  Main overview / analytics page
// ============================================================
import { COLORS } from "../constants";
import { StatCard, Card, SectionTitle, PageHeader } from "../components/UI";

const BAR_DATA = [65, 80, 72, 90, 85, 78, 95];
const DAYS     = ["Sen","Sel","Rab","Kam","Jum","Sab","Min"];

export default function Dashboard({ database }) {
  const members = database.members;
  const transactions = database.transactions;
  const activeMembers = members.filter((m) => m.status === "Aktif").length;
  const expiringMembers = members.filter((m) => m.status !== "Aktif").length;
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
      event: `Pembayaran Rp ${trx.amount.toLocaleString("id-ID")} dari ${trx.member}`,
    })),
    ...members.slice(-2).map((member) => ({
      time: member.expiry,
      event: `Anggota terdaftar: ${member.name}`,
    })),
  ].reverse();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan operasional gym hari ini"
      />

      {/* Stat Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
        gap: 16, marginBottom: 32,
      }}>
        <StatCard label="Total Anggota"  value={members.length} sub="tersimpan di database" accent />
        <StatCard label="Anggota Aktif" value={activeMembers} sub={`dari ${members.length} anggota`} />
        <StatCard label="Pendapatan" value={`Rp ${(monthlyRevenue / 1000000).toFixed(1)}jt`} sub="transaksi sukses" />
        <StatCard label="Perlu Tindak Lanjut" value={expiringMembers} sub="hampir habis/kadaluarsa" />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>

        {/* Weekly bar chart */}
        <Card>
          <SectionTitle>Kunjungan Mingguan</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {BAR_DATA.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%",
                  background: i === 6 ? COLORS.accent : "#333",
                  borderRadius: "4px 4px 0 0",
                  height: `${h}%`,
                  transition: "height 0.3s",
                }} />
                <span style={{ fontSize: 10, color: COLORS.textSec }}>{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan distribution */}
        <Card>
          <SectionTitle>Distribusi Paket</SectionTitle>
          {[
            ["VIP", COLORS.accent],
            ["Premium", "#ff8800"],
            ["Basic", "#666"],
          ].map(([label, col]) => {
            const pct = members.length ? Math.round(((planCounts[label] || 0) / members.length) * 100) : 0;
            return (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: COLORS.textSec }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>{pct}%</span>
              </div>
              <div style={{ background: "#333", borderRadius: 4, height: 6 }}>
                <div style={{ width: `${pct}%`, background: col, borderRadius: 4, height: "100%" }} />
              </div>
            </div>
          );})}
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <SectionTitle>Aktivitas Terbaru</SectionTitle>
        {recentActivity.map((a, i) => (
          <div key={i} style={{
            display: "flex", gap: 16,
            padding: "10px 0",
            borderBottom: i < recentActivity.length - 1
              ? `1px solid ${COLORS.border}` : "none",
          }}>
            <span style={{ fontSize: 12, color: COLORS.textSec, minWidth: 45, fontFamily: "monospace" }}>
              {a.time}
            </span>
            <span style={{ fontSize: 13, color: COLORS.text }}>{a.event}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
