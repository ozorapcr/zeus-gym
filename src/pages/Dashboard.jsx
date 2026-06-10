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
      event: `Anggota baru terdaftar: ${member.name}`,
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
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 240, marginTop: 12 }}>
            {periodBars.map((height, index) => (
              <div key={DAYS[index]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: index === 6 ? COLORS.accent : COLORS.textSec }}>
                  {height}
                </span>
                <div style={{
                  width: "100%",
                  borderRadius: 16,
                  background: index === 6
                    ? `linear-gradient(to top, ${COLORS.accent}, #e07ba3)`
                    : "#E9EDF2",
                  height: `${height}%`,
                  minHeight: 30,
                  transition: "0.3s ease",
                  boxShadow: index === 6 ? "0 10px 24px rgba(205,76,126,0.25)" : "none",
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSec }}>{DAYS[index]}</span>
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
            ["Premium", COLORS.orange],
            ["Basic", "#AAB2C0"],
          ].map(([label, color]) => {
            const pct = members.length ? Math.round(((planCounts[label] || 0) / members.length) * 100) : 0;
            return (
              <div key={label} style={{ marginBottom: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 999, background: color }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{label}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.textSec }}>{pct}%</span>
                </div>
                <div style={{ background: "#EEF2F6", borderRadius: 999, height: 10, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, background: color, borderRadius: 999, height: "100%", transition: "0.3s ease" }} />
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
        />
        <div style={{ color: COLORS.textSec, fontSize: 13, lineHeight: 1.6, paddingBottom: 18 }}>
          Data dashboard disesuaikan untuk periode terpilih agar admin bisa membandingkan tren operasional dengan cepat.
        </div>
      </Card>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
        marginBottom: 30,
      }}>
        <StatCard label="Total Anggota" value={members.length} sub="tersimpan di database" accent />
        <StatCard label="Anggota Aktif" value={activeMembers} sub={`dari ${members.length} anggota`} />
        <StatCard label="Pendapatan" value={`Rp ${(monthlyRevenue / 1000000).toFixed(1)}jt`} sub="transaksi sukses" />
        <StatCard label="Perlu Tindak Lanjut" value={expiringMembers} sub="hampir habis / kadaluarsa" />
      </div>

      <Card style={{ borderRadius: 24, marginBottom: 24 }}>
        <Tabs tabs={analyticTabs} value={activeTab} onValueChange={setActiveTab} />
      </Card>

      <Card style={{ borderRadius: 24 }}>
        <SectionTitle>Aktivitas Terbaru</SectionTitle>
        <div style={{ marginTop: 10 }}>
          {recentActivity.map((activity, index) => (
            <div key={`${activity.type}-${activity.time}-${index}`} style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "16px 0",
              borderBottom: index < recentActivity.length - 1 ? `1px solid ${COLORS.border}` : "none",
            }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: COLORS.accent,
                boxShadow: "0 0 0 6px rgba(205,76,126,0.10)",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSec, minWidth: 70 }}>
                {activity.time}
              </span>
              <span style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>
                {activity.event}
              </span>
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
                      background: "rgba(255,255,255,0.03)",
                      color: COLORS.accent,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: "8px 12px",
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
        </div>
      </Card>
    </div>
  );
}
