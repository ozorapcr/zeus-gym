function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label className="block mb-2 font-semibold text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-orange-300"
        }`}
      >
        <option value="">-- Pilih --</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}

export default SelectField;