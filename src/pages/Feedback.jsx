
import { useState } from "react";
import { COLORS } from "../constants";
import { PageHeader, Card, SectionTitle } from "../components/UI";

/* Star rating picker */
function StarPicker({ value, onChange }) {
  const [hovered, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          style={{
            fontSize: 36, background: "none", border: "none",
            cursor: "pointer", padding: 0, lineHeight: 1,
            color: s <= (hovered || value) ? COLORS.accent : COLORS.border,
            transition: "color 0.12s",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* Thank-you screen */
function ThankYou({ onReset }) {
  return (
    <Card style={{ textAlign: "center", padding: "40px 28px" }}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>🙏</div>
      <div style={{ fontWeight: 800, color: COLORS.green, fontSize: 18, marginBottom: 8 }}>
        Terima Kasih!
      </div>
      <div style={{ color: COLORS.textSec, fontSize: 14, marginBottom: 24 }}>
        Feedback Anda sangat berarti bagi kami
      </div>
      <button
        onClick={onReset}
        style={{
          background: "transparent", color: COLORS.green,
          border: `1px solid ${COLORS.green}`, padding: "8px 20px",
          borderRadius: 8, cursor: "pointer", fontSize: 13,
        }}
      >
        Beri Feedback Lagi
      </button>
    </Card>
  );
}

export default function Feedback({ database, actions }) {
  const [rating,    setRating]    = useState(0);
  const [name,      setName]      = useState("");
  const [message,   setMessage]   = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    actions.updateDatabase((current) => ({
      ...current,
      feedback: [
        {
          id: `FDB${Date.now()}`,
          name: name.trim() || "Anonim",
          rating,
          text: message.trim() || "Tidak ada pesan tambahan.",
          date: "Baru saja",
        },
        ...current.feedback,
      ],
    }));
    setSubmitted(true);
  };
  const reviews = database.feedback;
  const avgRating = reviews.length
    ? reviews.reduce((total, item) => total + item.rating, 0) / reviews.length
    : 0;
  const ratingDist = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((item) => item.rating === star).length;
    return [star, reviews.length ? Math.round((count / reviews.length) * 100) : 0];
  });

  return (
    <div>
      <PageHeader
        title="Feedback & Ulasan"
        subtitle="Dengarkan suara anggota untuk terus berkembang"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>

        {/* ── Feedback Form ── */}
        {submitted ? (
          <ThankYou onReset={() => { setSubmitted(false); setRating(0); setName(""); setMessage(""); }} />
        ) : (
          <Card style={{ padding: 28 }}>
            <SectionTitle>Berikan Ulasan</SectionTitle>

            <div style={{ marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 12 }}>
                Rating Kepuasan
              </div>
              <StarPicker value={rating} onChange={setRating} />
              {rating > 0 && (
                <div style={{ fontSize: 12, color: COLORS.textSec, marginTop: 8 }}>
                  {["","Sangat Buruk","Buruk","Cukup","Bagus","Sangat Bagus"][rating]}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: COLORS.textSec, marginBottom: 6 }}>
                Nama (opsional)
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda..."
                style={{
                  width: "100%", background: COLORS.dark,
                  border: `1px solid ${COLORS.border}`, borderRadius: 8,
                  padding: "10px 14px", color: COLORS.text,
                  fontSize: 14, outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: COLORS.textSec, marginBottom: 6 }}>
                Pesan Feedback
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ceritakan pengalaman Anda di gym kami..."
                style={{
                  width: "100%", background: COLORS.dark,
                  border: `1px solid ${COLORS.border}`, borderRadius: 8,
                  padding: "10px 14px", color: COLORS.text,
                  fontSize: 14, outline: "none", resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              style={{
                width: "100%", background: rating > 0 ? COLORS.accent : "#333",
                color: rating > 0 ? COLORS.black : COLORS.textSec,
                border: "none", padding: 12, borderRadius: 8,
                fontWeight: 900, cursor: rating > 0 ? "pointer" : "not-allowed",
                fontSize: 14, transition: "all 0.2s",
              }}
            >
              KIRIM FEEDBACK
            </button>
          </Card>
        )}

        {/* ── Overall Rating ── */}
        <Card style={{ padding: 28 }}>
          <SectionTitle>Rating Keseluruhan</SectionTitle>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
            <span style={{
              fontSize: 56, fontWeight: 900, color: COLORS.accent, lineHeight: 1,
            }}>
              {avgRating.toFixed(1)}
            </span>
            <div>
              <div style={{ color: COLORS.accent, fontSize: 18, letterSpacing: 2 }}>★★★★★</div>
              <div style={{ fontSize: 12, color: COLORS.textSec }}>dari {reviews.length} ulasan</div>
            </div>
          </div>
          {ratingDist.map(([stars, pct]) => (
            <div key={stars} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: COLORS.textSec, minWidth: 12 }}>{stars}</span>
              <span style={{ color: COLORS.accent, fontSize: 10 }}>★</span>
              <div style={{ flex: 1, background: "#333", borderRadius: 4, height: 8 }}>
                <div style={{
                  width: `${pct}%`, background: COLORS.accent,
                  borderRadius: 4, height: "100%",
                  opacity: stars < 4 ? 0.35 : 1,
                }} />
              </div>
              <span style={{ fontSize: 12, color: COLORS.textSec, minWidth: 28 }}>{pct}%</span>
            </div>
          ))}
        </Card>
      </div>

      {/* ── Recent Reviews ── */}
      <Card>
        <SectionTitle>Ulasan Terbaru</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {reviews.slice(0, 6).map((r) => (
            <div key={r.id} style={{
              background: COLORS.dark, borderRadius: 10, padding: 18,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: COLORS.accent, color: COLORS.black,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 12,
                }}>
                  {r.name.split(" ")[0][0]}
                </div>
                <div style={{ color: COLORS.accent, fontSize: 14 }}>
                  {"★".repeat(r.rating)}
                </div>
              </div>
              <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 12, marginBottom: 6 }}>
                {r.name}
              </div>
              <div style={{ fontSize: 12, color: COLORS.textSec, lineHeight: 1.6, marginBottom: 10 }}>
                {r.text}
              </div>
              <div style={{ fontSize: 10, color: COLORS.muted }}>{r.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
