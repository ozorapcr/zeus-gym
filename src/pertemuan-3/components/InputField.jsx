import { useState } from "react";
import InputField from "./components/InputField";

function App() {
  const [formData, setFormData] = useState({
    nama: "",
  });

  const errors = {
    nama: "",
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-pink-600 text-center mb-6">
          Form Input Nama
        </h1>

        <InputField
          label="Nama Lengkap"
          type="text"
          name="nama"
          value={formData.nama}
          placeholder="Masukkan nama lengkap"
          error={errors.nama}
        />
      </div>
    </div>
  );
}

export default App;