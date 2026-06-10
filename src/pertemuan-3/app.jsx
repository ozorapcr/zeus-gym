import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

function App() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    kelas: "",
    jadwal: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateNama = () => {
    const nama = formData.nama.trim();
    if (!nama) return "Nama wajib diisi";
    if (nama.length < 3) return "Nama minimal 3 karakter";
    if (/\d/.test(nama)) return "Nama tidak boleh mengandung angka";
    return "";
  };

  const validateEmail = () => {
    const email = formData.email.trim();
    if (!email) return "Email wajib diisi";
    if (!email.includes("@")) return "Email harus mengandung @";
    if (!email.includes(".")) return "Email harus valid";
    return "";
  };

  const validateNoHp = () => {
    const noHp = formData.noHp.trim();
    if (!noHp) return "Nomor HP wajib diisi";
    if (!/^\d+$/.test(noHp)) return "Nomor HP hanya boleh angka";
    if (noHp.length < 10 || noHp.length > 13)
      return "Nomor HP harus 10-13 digit";
    return "";
  };

  const validateKelas = () => {
    if (!formData.kelas) return "Silakan pilih kelas memasak";
    return "";
  };

  const validateJadwal = () => {
    if (!formData.jadwal) return "Silakan pilih jadwal kelas";
    return "";
  };

  const errors = {
    nama: validateNama(),
    email: validateEmail(),
    noHp: validateNoHp(),
    kelas: validateKelas(),
    jadwal: validateJadwal(),
  };

  const isFormValid = Object.values(errors).every((error) => error === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-2xl border border-pink-200">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-2">
          Form Pendaftaran Kursus Memasak
        </h1>
        <p className="text-center text-pink-400 mb-8">
          Isi data berikut untuk mendaftar kelas memasak sesuai minatmu 💗
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Nama Lengkap"
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            error={errors.nama}
          />

          <InputField
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            error={errors.email}
          />

          <InputField
            label="Nomor HP"
            type="text"
            name="noHp"
            value={formData.noHp}
            onChange={handleChange}
            placeholder="Masukkan nomor HP"
            error={errors.noHp}
          />

          <SelectField
            label="Pilih Kelas Memasak"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            options={[
              "Kelas Masakan Tradisional",
              "Kelas Dessert",
              "Kelas Bakery",
              "Kelas Minuman Kekinian",
            ]}
            error={errors.kelas}
          />

          <SelectField
            label="Pilih Jadwal"
            name="jadwal"
            value={formData.jadwal}
            onChange={handleChange}
            options={["Senin", "Rabu", "Jumat", "Sabtu"]}
            error={errors.jadwal}
          />

          {isFormValid && (
            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-md hover:shadow-lg"
            >
              Submit Pendaftaran
            </button>
          )}
        </form>

        {submittedData && (
          <div className="mt-8 bg-pink-50 border border-pink-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Pendaftaran Berhasil 🎀
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Nama:</strong> {submittedData.nama}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>No HP:</strong> {submittedData.noHp}</p>
              <p><strong>Kelas:</strong> {submittedData.kelas}</p>
              <p><strong>Jadwal:</strong> {submittedData.jadwal}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;