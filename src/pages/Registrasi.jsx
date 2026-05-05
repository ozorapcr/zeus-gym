// ============================================================
//  pages/Registrasi.jsx  —  Digital member registration
// ============================================================
import { useState } from "react";
import { COLORS, PLANS } from "../constants";
import { PageHeader, PrimaryButton, Input, Textarea } from "../components/UI";
import { addMonths, createInitials, createMemberId } from "../dataStore";

const INITIAL_FORM = { nama: "", email: "", hp: "", plan: "Basic", alamat: "" };

/* Success screen shown after submission */
function SuccessScreen({ memberId, onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: COLORS.accent, color: COLORS.black,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36, fontWeight: 900, margin: "0 auto 20px",
      }}>
        ✓
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.accent, marginBottom: 8 }}>
        Registrasi Berhasil!
      </div>
      <div style={{ color: COLORS.textSec, marginBottom: 6, fontSize: 14 }}>
        Data anggota telah tersimpan ke database.
      </div>
      <div style={{ color: COLORS.textSec, marginBottom: 28, fontSize: 14 }}>
        ID Anggota:{" "}
        <strong style={{ color: COLORS.text, fontFamily: "monospace" }}>
          {memberId}
        </strong>
      </div>
      <PrimaryButton onClick={onReset}>Daftarkan Anggota Lain</PrimaryButton>
    </div>
  );
}

export default function Registrasi({ database, actions }) {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [submitted, setSubmit]  = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const submit = () => {
    if (!form.nama.trim() || !form.hp.trim()) return;
    const id = createMemberId(database.members);
    const newMember = {
      id,
      name: form.nama.trim(),
      email: form.email.trim(),
      phone: form.hp.trim(),
      address: form.alamat.trim(),
      plan: form.plan,
      status: "Aktif",
      expiry: addMonths(new Date(), 1),
      avatar: createInitials(form.nama),
    };
    actions.updateDatabase((current) => ({
      ...current,
      members: [...current.members, newMember],
    }));
    setSubmit(id);
  };

  if (submitted) {
    return <SuccessScreen memberId={submitted} onReset={() => { setForm(INITIAL_FORM); setSubmit(null); }} />;
  }

  return (
    <div>
      <PageHeader
        title="Registrasi Digital"
        subtitle="Daftarkan anggota baru secara digital — data tersimpan otomatis ke database"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* ── Left: Personal Data Form ── */}
        <div style={{
          background: COLORS.card, border: `1px solid ${COLORS.border}`,
          borderRadius: 12, padding: 28,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: COLORS.textSec,
            letterSpacing: 1, marginBottom: 20, textTransform: "uppercase",
          }}>
            Data Pribadi
          </div>

          <Input label="Nama Lengkap" type="text"     value={form.nama}  onChange={set("nama")}  placeholder="Masukkan nama lengkap" />
          <Input label="Email"        type="email"    value={form.email} onChange={set("email")} placeholder="email@contoh.com" />
          <Input label="No. HP"       type="tel"      value={form.hp}    onChange={set("hp")}    placeholder="+62 812 xxxx xxxx" />
          <Textarea label="Alamat"    rows={3}        value={form.alamat} onChange={set("alamat")} placeholder="Alamat lengkap..." />
        </div>

        {/* ── Right: Plan Selection ── */}
        <div>
          <div style={{
            fontSize: 13, fontWeight: 700, color: COLORS.textSec,
            letterSpacing: 1, marginBottom: 16, textTransform: "uppercase",
          }}>
            Pilih Paket
          </div>

          {PLANS.map((p) => (
            <div
              key={p.id}
              onClick={() => setForm((f) => ({ ...f, plan: p.id }))}
              style={{
                background: form.plan === p.id ? "#1a1f00" : COLORS.card,
                border: `2px solid ${form.plan === p.id ? COLORS.accent : COLORS.border}`,
                borderRadius: 12, padding: 20, marginBottom: 12,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 8,
              }}>
                <span style={{ fontWeight: 800, color: COLORS.text, fontSize: 16 }}>{p.id}</span>
                <span style={{ fontWeight: 800, color: COLORS.accent, fontSize: 14 }}>{p.price}</span>
              </div>
              {p.features.map((f) => (
                <div key={f} style={{ fontSize: 12, color: COLORS.textSec, padding: "2px 0" }}>
                  • {f}
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={submit}
            style={{
              width: "100%", background: COLORS.accent, color: COLORS.black,
              border: "none", padding: 14, borderRadius: 10,
              fontWeight: 900, cursor: "pointer", fontSize: 15, marginTop: 8,
            }}
          >
            DAFTARKAN ANGGOTA
          </button>
        </div>
      </div>
    </div>
  );
}
