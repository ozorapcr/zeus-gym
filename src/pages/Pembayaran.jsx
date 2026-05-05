// ============================================================
//  pages/Pembayaran.jsx  —  Multi-method payment system
// ============================================================
import { useState } from "react";
import { COLORS } from "../constants";
import { PageHeader, Card, SectionTitle, Badge, Input } from "../components/UI";

const PAYMENT_METHODS = ["Transfer", "QR Code", "E-Wallet", "Tunai", "Kartu Kredit"];

/* Fake QR pattern using a grid of squares */
function FakeQR() {
  return (
    <div style={{
      background: COLORS.dark, borderRadius: 10,
      padding: 20, textAlign: "center", marginBottom: 16,
    }}>
      <div style={{
        width: 120, height: 120, background: "#fff",
        borderRadius: 8, margin: "0 auto 12px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2, width: 98,
        }}>
          {Array.from({ length: 49 }, (_, i) => (
            <div
              key={i}
              style={{
                paddingBottom: "100%",
                background: (i + Math.floor(i / 7)) % 2 === 0 ? "#000" : "#fff",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ fontSize: 12, color: COLORS.textSec }}>Scan QR untuk bayar</div>
    </div>
  );
}

/* Success notification */
function SuccessToast({ transaction, onClose }) {
  return (
    <div style={{
      background: "#001a0d", border: `1px solid ${COLORS.green}`,
      borderRadius: 12, padding: 20,
      display: "flex", gap: 16, alignItems: "center", marginTop: 16,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: COLORS.green, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 20, color: COLORS.black, flexShrink: 0,
      }}>
        ✓
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, color: COLORS.green, fontSize: 15 }}>
          Pembayaran Berhasil!
        </div>
        <div style={{ fontSize: 12, color: COLORS.textSec }}>
          {transaction.id} - Rp {transaction.amount.toLocaleString("id-ID")} via {transaction.method}
        </div>
      </div>
      <button onClick={onClose} style={{
        background: "transparent", border: "none",
        color: COLORS.textSec, cursor: "pointer", fontSize: 18,
      }}>×</button>
    </div>
  );
}

export default function Pembayaran({ database, actions }) {
  const [method,  setMethod]  = useState("Transfer");
  const [memberId, setMemberId] = useState(database.members[0]?.id || "");
  const [amount, setAmount] = useState(350000);
  const [success, setSuccess] = useState(null);

  const selectedMember = database.members.find((member) => member.id === memberId);
  const processPayment = () => {
    if (!selectedMember || Number(amount) <= 0) return;
    const transaction = {
      id: `TRX${String(database.transactions.length + 1).padStart(3, "0")}`,
      member: selectedMember.name,
      memberId: selectedMember.id,
      amount: Number(amount),
      method,
      date: new Date().toISOString().slice(0, 10),
      status: "Sukses",
    };
    actions.updateDatabase((current) => ({
      ...current,
      transactions: [transaction, ...current.transactions],
    }));
    setSuccess(transaction);
  };

  return (
    <div>
      <PageHeader
        title="Sistem Pembayaran"
        subtitle="Multi-metode pembayaran dengan pencatatan otomatis"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>

        {/* ── Left: Payment Form ── */}
        <div>
          <Card style={{ marginBottom: success ? 0 : 0 }}>
            <SectionTitle>Form Pembayaran</SectionTitle>

            {/* Member field */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: COLORS.textSec, marginBottom: 6 }}>
                ID / Nama Anggota
              </label>
              <select
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                style={{
                  width: "100%", background: COLORS.dark,
                  border: `1px solid ${COLORS.border}`, borderRadius: 8,
                  padding: "10px 14px", color: COLORS.text,
                  fontSize: 14, outline: "none", boxSizing: "border-box",
                }}
              >
                {database.members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.id} - {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount field */}
            <Input
              label="Jumlah Pembayaran (Rp)"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ color: COLORS.accent, fontSize: 20, fontWeight: 800, fontFamily: "monospace" }}
            />

            {/* Method selector */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block", fontSize: 12,
                color: COLORS.textSec, marginBottom: 10,
              }}>
                Metode Pembayaran
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    style={{
                      background: method === m ? COLORS.accent : COLORS.dark,
                      color:      method === m ? COLORS.black  : COLORS.textSec,
                      border: `1px solid ${method === m ? COLORS.accent : COLORS.border}`,
                      padding: "8px 16px", borderRadius: 8,
                      cursor: "pointer", fontSize: 13,
                      fontWeight: method === m ? 800 : 400,
                      transition: "all 0.15s",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* QR preview */}
            {method === "QR Code" && <FakeQR />}

            <button
              onClick={processPayment}
              style={{
                width: "100%", background: COLORS.accent, color: COLORS.black,
                border: "none", padding: 14, borderRadius: 10,
                fontWeight: 900, cursor: "pointer", fontSize: 15,
              }}
            >
              PROSES PEMBAYARAN
            </button>
          </Card>

          {success && (
            <SuccessToast transaction={success} onClose={() => setSuccess(null)} />
          )}
        </div>

        {/* ── Right: Recent Transactions ── */}
        <Card>
          <SectionTitle>Transaksi Terbaru</SectionTitle>
          {database.transactions.map((t) => (
            <div key={t.id} style={{ padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
                  {t.member}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, fontFamily: "monospace" }}>
                  Rp {t.amount.toLocaleString("id-ID")}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: COLORS.textSec }}>
                  {t.method} · {t.date}
                </span>
                <Badge color={t.status === "Sukses" ? "green" : "orange"}>
                  {t.status}
                </Badge>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
