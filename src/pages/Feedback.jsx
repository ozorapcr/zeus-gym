// ============================================================
//  pages/Feedback.jsx  —  Modern Feedback & Review UI
// ============================================================

import { useState } from "react";
import { COLORS } from "../constants";
import {
  PageHeader,
  Card,
  SectionTitle,
} from "../components/UI";

/* ============================================================
   STAR PICKER
============================================================ */
function StarPicker({ value, onChange }) {
  const [hovered, setHover] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
      }}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          style={{
            fontSize: 42,

            background: "none",
            border: "none",

            cursor: "pointer",

            padding: 0,

            lineHeight: 1,

            color:
              s <= (hovered || value)
                ? COLORS.accent
                : "#E3E6EB",

            transition: "0.2s ease",

            transform:
              s <= (hovered || value)
                ? "scale(1.05)"
                : "scale(1)",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   THANK YOU SCREEN
============================================================ */
function ThankYou({ onReset }) {
  return (
    <Card
      style={{
        textAlign: "center",
        padding: "50px 30px",
        borderRadius: 28,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,

          borderRadius: 28,

          background: "rgba(52,199,89,0.12)",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: 50,

          margin: "0 auto 24px",
        }}
      >
        🙏
      </div>

      <div
        style={{
          fontWeight: 800,
          color: COLORS.green,
          fontSize: 24,
          marginBottom: 10,
        }}
      >
        Terima Kasih!
      </div>

      <div
        style={{
          color: COLORS.textSec,
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 30,
        }}
      >
        Feedback Anda sangat berarti
        <br />
        untuk perkembangan gym kami
      </div>

      <button
        onClick={onReset}
        style={{
          background: "rgba(52,199,89,0.10)",

          color: COLORS.green,

          border: "none",

          padding: "12px 22px",

          borderRadius: 16,

          cursor: "pointer",

          fontSize: 14,
          fontWeight: 700,
        }}
      >
        Beri Feedback Lagi
      </button>
    </Card>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Feedback({
  database,
  actions,
}) {
  const [rating, setRating] = useState(0);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;

    actions.updateDatabase((current) => ({
      ...current,

      feedback: [
        {
          id: `FDB${Date.now()}`,

          name: name.trim() || "Anonim",

          rating,

          text:
            message.trim() ||
            "Tidak ada pesan tambahan.",

          date: "Baru saja",
        },

        ...current.feedback,
      ],
    }));

    setSubmitted(true);
  };

  const reviews = database.feedback;

  const avgRating = reviews.length
    ? reviews.reduce(
        (total, item) => total + item.rating,
        0
      ) / reviews.length
    : 0;

  const ratingDist = [5, 4, 3, 2, 1].map(
    (star) => {
      const count = reviews.filter(
        (item) => item.rating === star
      ).length;

      return [
        star,

        reviews.length
          ? Math.round(
              (count / reviews.length) * 100
            )
          : 0,
      ];
    }
  );

  return (
    <div>
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}
      <PageHeader
        title="Feedback & Ulasan"
        subtitle="Dengarkan suara anggota untuk terus berkembang"
      />

      {/* ============================================================
          TOP GRID
      ============================================================ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* ============================================================
            FORM
        ============================================================ */}
        {submitted ? (
          <ThankYou
            onReset={() => {
              setSubmitted(false);
              setRating(0);
              setName("");
              setMessage("");
            }}
          />
        ) : (
          <Card
            style={{
              padding: 32,
              borderRadius: 28,
            }}
          >
            <SectionTitle>
              Berikan Ulasan
            </SectionTitle>

            {/* RATING */}
            <div
              style={{
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.textSec,
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                Rating Kepuasan
              </div>

              <StarPicker
                value={rating}
                onChange={setRating}
              />

              {rating > 0 && (
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.textSec,
                    marginTop: 12,
                    fontWeight: 600,
                  }}
                >
                  {
                    [
                      "",
                      "Sangat Buruk",
                      "Buruk",
                      "Cukup",
                      "Bagus",
                      "Sangat Bagus",
                    ][rating]
                  }
                </div>
              )}
            </div>

            {/* NAME */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",

                  fontSize: 13,

                  color: COLORS.textSec,

                  marginBottom: 8,

                  fontWeight: 500,
                }}
              >
                Nama (opsional)
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Nama Anda..."
                style={{
                  width: "100%",

                  background: "#FFFFFF",

                  border: `1px solid ${COLORS.border}`,

                  borderRadius: 16,

                  padding: "14px 16px",

                  color: COLORS.text,

                  fontSize: 14,

                  outline: "none",

                  boxSizing: "border-box",

                  transition: "0.2s ease",
                }}
              />
            </div>

            {/* MESSAGE */}
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",

                  fontSize: 13,

                  color: COLORS.textSec,

                  marginBottom: 8,

                  fontWeight: 500,
                }}
              >
                Pesan Feedback
              </label>

              <textarea
                rows={5}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Ceritakan pengalaman Anda di gym kami..."
                style={{
                  width: "100%",

                  background: "#FFFFFF",

                  border: `1px solid ${COLORS.border}`,

                  borderRadius: 16,

                  padding: "14px 16px",

                  color: COLORS.text,

                  fontSize: 14,

                  outline: "none",

                  resize: "vertical",

                  boxSizing: "border-box",

                  lineHeight: 1.7,
                }}
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              style={{
                width: "100%",

                background:
                  rating > 0
                    ? COLORS.accent
                    : "#E4E7EC",

                color:
                  rating > 0
                    ? "#FFFFFF"
                    : COLORS.textSec,

                border: "none",

                padding: "15px",

                borderRadius: 18,

                fontWeight: 700,

                cursor:
                  rating > 0
                    ? "pointer"
                    : "not-allowed",

                fontSize: 14,

                transition: "0.2s ease",

                boxShadow:
                  rating > 0
                    ? "0 10px 24px rgba(205,76,126,0.22)"
                    : "none",
              }}
            >
              KIRIM FEEDBACK
            </button>
          </Card>
        )}

        {/* ============================================================
            OVERALL RATING
        ============================================================ */}
        <Card
          style={{
            padding: 32,
            borderRadius: 28,
          }}
        >
          <SectionTitle>
            Rating Keseluruhan
          </SectionTitle>

          {/* SCORE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",

              gap: 18,

              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontSize: 72,

                fontWeight: 800,

                color: COLORS.accent,

                lineHeight: 1,
              }}
            >
              {avgRating.toFixed(1)}
            </span>

            <div>
              <div
                style={{
                  color: COLORS.accent,

                  fontSize: 22,

                  letterSpacing: 2,
                }}
              >
                ★★★★★
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: COLORS.textSec,
                  marginTop: 6,
                }}
              >
                dari {reviews.length} ulasan
              </div>
            </div>
          </div>

          {/* DISTRIBUTION */}
          {ratingDist.map(([stars, pct]) => (
            <div
              key={stars}
              style={{
                display: "flex",
                alignItems: "center",

                gap: 12,

                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: COLORS.textSec,
                  minWidth: 14,
                  fontWeight: 600,
                }}
              >
                {stars}
              </span>

              <span
                style={{
                  color: COLORS.accent,
                  fontSize: 12,
                }}
              >
                ★
              </span>

              <div
                style={{
                  flex: 1,

                  background: "#EEF2F6",

                  borderRadius: 999,

                  height: 10,

                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,

                    background:
                      stars >= 4
                        ? COLORS.accent
                        : "#D5DAE1",

                    borderRadius: 999,

                    height: "100%",

                    transition: "0.3s ease",
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: 12,
                  color: COLORS.textSec,
                  minWidth: 36,
                  textAlign: "right",
                }}
              >
                {pct}%
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* ============================================================
          REVIEWS
      ============================================================ */}
      <Card
        style={{
          borderRadius: 28,
        }}
      >
        <SectionTitle>
          Ulasan Terbaru
        </SectionTitle>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px,1fr))",

            gap: 18,
          }}
        >
          {reviews.slice(0, 6).map((r) => (
            <div
              key={r.id}
              style={{
                background: "#FAFBFC",

                border: `1px solid ${COLORS.border}`,

                borderRadius: 22,

                padding: 22,

                transition: "0.2s ease",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  marginBottom: 16,
                }}
              >
                {/* AVATAR */}
                <div
                  style={{
                    width: 44,
                    height: 44,

                    borderRadius: 16,

                    background:
                      "rgba(205,76,126,0.12)",

                    color: COLORS.accent,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    fontWeight: 700,

                    fontSize: 14,
                  }}
                >
                  {r.name
                    .split(" ")[0][0]
                    .toUpperCase()}
                </div>

                {/* STARS */}
                <div
                  style={{
                    color: COLORS.accent,
                    fontSize: 15,
                    letterSpacing: 1,
                  }}
                >
                  {"★".repeat(r.rating)}
                </div>
              </div>

              {/* NAME */}
              <div
                style={{
                  fontWeight: 700,
                  color: COLORS.text,
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                {r.name}
              </div>

              {/* MESSAGE */}
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.textSec,

                  lineHeight: 1.8,

                  marginBottom: 14,
                }}
              >
                {r.text}
              </div>

              {/* DATE */}
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.muted,
                }}
              >
                {r.date}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}