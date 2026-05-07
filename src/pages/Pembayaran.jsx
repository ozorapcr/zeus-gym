// ============================================================
//  pages/Pembayaran.jsx  —  Modern Payment System UI
// ============================================================

import { useState } from "react";

import { COLORS } from "../constants";

import {
  PageHeader,
  Card,
  SectionTitle,
  Badge,
  Input,
} from "../components/UI";

/* ============================================================
   PAYMENT METHODS
============================================================ */
const PAYMENT_METHODS = [
  "Transfer",
  "QR Code",
  "E-Wallet",
  "Tunai",
  "Kartu Kredit",
];

/* ============================================================
   QR COMPONENT
============================================================ */
function FakeQR() {
  return (
    <div
      style={{
        background: "#FAFBFC",

        border: `1px solid ${COLORS.border}`,

        borderRadius: 24,

        padding: 24,

        textAlign: "center",

        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: 170,
          height: 170,

          background: "#FFFFFF",

          borderRadius: 24,

          margin: "0 auto 18px",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          boxShadow:
            "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(7, 1fr)",

            gap: 3,

            width: 120,
          }}
        >
          {Array.from(
            { length: 49 },
            (_, i) => (
              <div
                key={i}
                style={{
                  paddingBottom: "100%",

                  background:
                    (i +
                      Math.floor(i / 7)) %
                      2 ===
                    0
                      ? "#111"
                      : "#fff",
                }}
              />
            )
          )}
        </div>
      </div>

      <div
        style={{
          fontSize: 13,

          color: COLORS.textSec,

          fontWeight: 500,
        }}
      >
        Scan QR untuk melakukan pembayaran
      </div>
    </div>
  );
}

/* ============================================================
   SUCCESS TOAST
============================================================ */
function SuccessToast({
  transaction,
  onClose,
}) {
  return (
    <div
      style={{
        background:
          "rgba(52,199,89,0.10)",

        border:
          `1px solid rgba(52,199,89,0.20)`,

        borderRadius: 24,

        padding: 22,

        display: "flex",

        gap: 18,

        alignItems: "center",

        marginTop: 18,
      }}
    >
      {/* ICON */}
      <div
        style={{
          width: 52,
          height: 52,

          borderRadius: 18,

          background: COLORS.green,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          fontWeight: 800,

          fontSize: 22,

          color: "#FFFFFF",

          flexShrink: 0,
        }}
      >
        ✓
      </div>

      {/* TEXT */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 800,

            color: COLORS.green,

            fontSize: 16,

            marginBottom: 6,
          }}
        >
          Pembayaran Berhasil!
        </div>

        <div
          style={{
            fontSize: 13,

            color: COLORS.textSec,

            lineHeight: 1.6,
          }}
        >
          {transaction.id} • Rp{" "}
          {transaction.amount.toLocaleString(
            "id-ID"
          )}{" "}
          via {transaction.method}
        </div>
      </div>

      {/* CLOSE */}
      <button
        onClick={onClose}
        style={{
          background: "transparent",

          border: "none",

          color: COLORS.textSec,

          cursor: "pointer",

          fontSize: 22,
        }}
      >
        ×
      </button>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Pembayaran({
  database,
  actions,
}) {
  const [method, setMethod] =
    useState("Transfer");

  const [memberId, setMemberId] =
    useState(
      database.members[0]?.id || ""
    );

  const [amount, setAmount] =
    useState(350000);

  const [success, setSuccess] =
    useState(null);

  /* ============================================================
     SELECTED MEMBER
  ============================================================ */
  const selectedMember =
    database.members.find(
      (member) =>
        member.id === memberId
    );

  /* ============================================================
     PROCESS PAYMENT
  ============================================================ */
  const processPayment = () => {
    if (
      !selectedMember ||
      Number(amount) <= 0
    )
      return;

    const transaction = {
      id: `TRX${String(
        database.transactions.length +
          1
      ).padStart(3, "0")}`,

      member: selectedMember.name,

      memberId: selectedMember.id,

      amount: Number(amount),

      method,

      date: new Date()
        .toISOString()
        .slice(0, 10),

      status: "Sukses",
    };

    actions.updateDatabase(
      (current) => ({
        ...current,

        transactions: [
          transaction,

          ...current.transactions,
        ],
      })
    );

    setSuccess(transaction);
  };

  return (
    <div>
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}
      <PageHeader
        title="Sistem Pembayaran"
        subtitle="Multi-metode pembayaran dengan pencatatan otomatis"
      />

      {/* ============================================================
          GRID LAYOUT
      ============================================================ */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1.2fr 1fr",

          gap: 24,
        }}
      >
        {/* ============================================================
            LEFT PANEL
        ============================================================ */}
        <div>
          <Card
            style={{
              borderRadius: 30,

              padding: 32,
            }}
          >
            <SectionTitle>
              Form Pembayaran
            </SectionTitle>

            {/* ============================================================
                MEMBER
            ============================================================ */}
            <div
              style={{
                marginBottom: 18,
              }}
            >
              <label
                style={{
                  display: "block",

                  fontSize: 13,

                  color:
                    COLORS.textSec,

                  marginBottom: 8,

                  fontWeight: 500,
                }}
              >
                ID / Nama Anggota
              </label>

              <select
                value={memberId}
                onChange={(e) =>
                  setMemberId(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",

                  background:
                    "#FFFFFF",

                  border:
                    `1px solid ${COLORS.border}`,

                  borderRadius: 18,

                  padding:
                    "14px 16px",

                  color:
                    COLORS.text,

                  fontSize: 14,

                  outline: "none",

                  boxSizing:
                    "border-box",
                }}
              >
                {database.members.map(
                  (member) => (
                    <option
                      key={member.id}
                      value={member.id}
                    >
                      {member.id} •{" "}
                      {member.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* ============================================================
                AMOUNT
            ============================================================ */}
            <Input
              label="Jumlah Pembayaran (Rp)"
              type="number"
              min="0"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              style={{
                background: "#FFFFFF",

                color:
                  COLORS.accent,

                fontSize: 28,

                fontWeight: 800,

                borderRadius: 18,

                fontFamily:
                  "Inter, sans-serif",
              }}
            />

            {/* ============================================================
                METHODS
            ============================================================ */}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <label
                style={{
                  display: "block",

                  fontSize: 13,

                  color:
                    COLORS.textSec,

                  marginBottom: 12,

                  fontWeight: 500,
                }}
              >
                Metode Pembayaran
              </label>

              <div
                style={{
                  display: "flex",

                  flexWrap: "wrap",

                  gap: 10,
                }}
              >
                {PAYMENT_METHODS.map(
                  (m) => (
                    <button
                      key={m}
                      onClick={() =>
                        setMethod(m)
                      }
                      style={{
                        background:
                          method === m
                            ? COLORS.accent
                            : "#F4F6F8",

                        color:
                          method === m
                            ? "#FFFFFF"
                            : COLORS.textSec,

                        border: "none",

                        padding:
                          "11px 18px",

                        borderRadius: 16,

                        cursor: "pointer",

                        fontSize: 13,

                        fontWeight:
                          method === m
                            ? 700
                            : 500,

                        transition:
                          "0.2s ease",

                        boxShadow:
                          method === m
                            ? "0 10px 24px rgba(205,76,126,0.20)"
                            : "none",
                      }}
                    >
                      {m}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* ============================================================
                QR
            ============================================================ */}
            {method === "QR Code" && (
              <FakeQR />
            )}

            {/* ============================================================
                BUTTON
            ============================================================ */}
            <button
              onClick={processPayment}
              style={{
                width: "100%",

                background:
                  COLORS.accent,

                color: "#FFFFFF",

                border: "none",

                padding: 16,

                borderRadius: 20,

                fontWeight: 700,

                cursor: "pointer",

                fontSize: 15,

                transition:
                  "0.2s ease",

                boxShadow:
                  "0 10px 24px rgba(205,76,126,0.22)",
              }}
            >
              PROSES PEMBAYARAN
            </button>
          </Card>

          {/* ============================================================
              SUCCESS
          ============================================================ */}
          {success && (
            <SuccessToast
              transaction={success}
              onClose={() =>
                setSuccess(null)
              }
            />
          )}
        </div>

        {/* ============================================================
            RIGHT PANEL
        ============================================================ */}
        <Card
          style={{
            borderRadius: 30,

            padding: 30,
          }}
        >
          <SectionTitle>
            Transaksi Terbaru
          </SectionTitle>

          {database.transactions.map(
            (t) => (
              <div
                key={t.id}
                style={{
                  padding: "16px 0",

                  borderBottom:
                    `1px solid ${COLORS.border}`,
                }}
              >
                {/* TOP */}
                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,

                      fontWeight: 700,

                      color:
                        COLORS.text,
                    }}
                  >
                    {t.member}
                  </span>

                  <span
                    style={{
                      fontSize: 15,

                      fontWeight: 800,

                      color:
                        COLORS.accent,
                    }}
                  >
                    Rp{" "}
                    {t.amount.toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>

                {/* BOTTOM */}
                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,

                      color:
                        COLORS.textSec,
                    }}
                  >
                    {t.method} •{" "}
                    {t.date}
                  </span>

                  <Badge
                    color={
                      t.status ===
                      "Sukses"
                        ? "green"
                        : "orange"
                    }
                  >
                    {t.status}
                  </Badge>
                </div>
              </div>
            )
          )}
        </Card>
      </div>
    </div>
  );
}