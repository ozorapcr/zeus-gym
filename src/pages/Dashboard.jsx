import { useMemo, useState } from "react";
import { COLORS } from "../constants";
import {
  Card,
  Dialog,
  PageHeader,
  SectionTitle,
  SelectField,
  StatCard,
  Tabs,
} from "../components/UI";

const BAR_DATA = [65, 80, 72, 90, 85, 78, 95];
const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const PERIOD_OPTIONS = [
  { value: "minggu-ini", label: "Minggu ini" },
  { value: "bulan-ini", label: "Bulan ini" },
  { value: "kuartal-ini", label: "Kuartal ini" },
];
const PERIOD_MULTIPLIER = {
  "minggu-ini": 1,
  "bulan-ini": 1.18,
  "kuartal-ini": 1.34,
};

export default function Dashboard({ database }) {
  const [period, setPeriod] = useState("minggu-ini");
  const [activeTab, setActiveTab] = useState("kunjungan");
  const [selectedActivity, setSelectedActivity] = useState(null);
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
  const periodBars = useMemo(() => (
    BAR_DATA.map((value) => Math.min(100, Math.round(value * PERIOD_MULTIPLIER[period])))
  ), [period]);
  const recentActivity = [
    ...transactions.slice(-2).map((trx) => ({
      time: trx.date,
      event: `Pembayaran Rp ${trx.amount.toLocaleString("id-ID")} dari ${trx.member}`,
      type: "Pembayaran",
      detail: `Transaksi ${trx.status.toLowerCase()} senilai Rp ${trx.amount.toLocaleString("id-ID")}.`,
    })),
    ...members.slice(-2).map((member) => ({
      time: member.expiry,
      event: `Anggota terdaftar: ${member.name}`,
      type: "Keanggotaan",
      detail: `${member.name} memakai paket ${member.plan} dengan status ${member.status}.`,
    })),
  ].reverse();
  const analyticTabs = [
    {
      value: "kunjungan",
      label: "Kunjungan",
      content: (
        <div>
          <SectionTitle>Kunjungan Mingguan</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {periodBars.map((height, index) => (
              <div key={DAYS[index]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%",
                  background: index === 6 ? COLORS.accent : "#333",
                  borderRadius: "4px 4px 0 0",
                  height: `${height}%`,
                  transition: "height 0.3s",
                }} />
                <span style={{ fontSize: 10, color: COLORS.textSec }}>{DAYS[index]}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      value: "paket",
      label: "Paket",
      content: (
        <div>
          <SectionTitle>Distribusi Paket</SectionTitle>
          {[
            ["VIP", COLORS.accent],
            ["Premium", "#ff8800"],
            ["Basic", "#666"],
          ].map(([label, color]) => {
            const pct = members.length ? Math.round(((planCounts[label] || 0) / members.length) * 100) : 0;
            return (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: COLORS.textSec }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>{pct}%</span>
                </div>
                <div style={{ background: "#333", borderRadius: 4, height: 6 }}>
                  <div style={{ width: `${pct}%`, background: color, borderRadius: 4, height: "100%" }} />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan operasional gym hari ini"
      />

      <Card style={{
        marginBottom: 24,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 18,
        alignItems: "end",
      }}>
        <SelectField
          label="Filter Periode"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          options={PERIOD_OPTIONS}
          style={{ marginBottom: 0 }}
        />
        <div style={{ color: COLORS.textSec, fontSize: 13, lineHeight: 1.6 }}>
          Data dashboard disesuaikan untuk periode terpilih agar admin bisa membandingkan tren operasional dengan cepat.
        </div>
      </Card>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
        gap: 16, marginBottom: 32,
      }}>
        <StatCard label="Total Anggota" value={members.length} sub="tersimpan di database" accent />
        <StatCard label="Anggota Aktif" value={activeMembers} sub={`dari ${members.length} anggota`} />
        <StatCard label="Pendapatan" value={`Rp ${(monthlyRevenue / 1000000).toFixed(1)}jt`} sub="transaksi sukses" />
        <StatCard label="Perlu Tindak Lanjut" value={expiringMembers} sub="hampir habis/kadaluarsa" />
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Tabs tabs={analyticTabs} value={activeTab} onValueChange={setActiveTab} />
      </Card>

      <Card>
        <SectionTitle>Aktivitas Terbaru</SectionTitle>
        {recentActivity.map((activity, index) => (
          <div key={`${activity.type}-${activity.time}-${index}`} style={{
            display: "flex", gap: 16,
            padding: "10px 0",
            alignItems: "center",
            borderBottom: index < recentActivity.length - 1
              ? `1px solid ${COLORS.border}` : "none",
          }}>
            <span style={{ fontSize: 12, color: COLORS.textSec, minWidth: 75, fontFamily: "monospace" }}>
              {activity.time}
            </span>
            <span style={{ fontSize: 13, color: COLORS.text }}>{activity.event}</span>
            <Dialog
              open={selectedActivity === index}
              onOpenChange={(open) => setSelectedActivity(open ? index : null)}
              title={activity.type}
              description={activity.time}
              trigger={(
                <button
                  type="button"
                  style={{
                    marginLeft: "auto",
                    background: COLORS.dark,
                    color: COLORS.accent,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 6,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  Detail
                </button>
              )}
            >
              <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6 }}>
                {activity.event}
              </div>
              <div style={{ color: COLORS.textSec, fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>
                {activity.detail}
              </div>
            </Dialog>
          </div>
        ))}
      </Card>
    </div>
  );
}
