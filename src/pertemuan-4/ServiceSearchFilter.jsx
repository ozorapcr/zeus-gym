import { useState } from "react";
import serviceData from "./services.json";

export default function ServiceTable({ role }) {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    category: "",
    price: ""
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const filtered = serviceData.filter((item) => {
    const search = dataForm.searchTerm.toLowerCase();
    const matchSearch =
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);

    const matchCategory = dataForm.category
      ? item.category === dataForm.category
      : true;

    const matchPrice =
      dataForm.price === "low"
        ? item.price < 3000000
        : dataForm.price === "high"
        ? item.price >= 3000000
        : true;

    return matchSearch && matchCategory && matchPrice;
  });

  const categories = [...new Set(serviceData.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
          Service Explorer
        </h1>
        <p className="text-gray-500 text-sm">Find the best services easily</p>
      </div>

      {/* FILTER */}
      <div className="backdrop-blur-lg bg-gradient-to-r from-white/70 via-pink-50/60 to-rose-50/60 border border-white/40 shadow-lg rounded-2xl p-4 flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          name="searchTerm"
          placeholder="🔍 Search service..."
          onChange={handleChange}
          className="flex-1 min-w-[220px] px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        <select
          name="category"
          onChange={handleChange}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400"
        >
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <select
          name="price"
          onChange={handleChange}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400"
        >
          <option value="">All Prices</option>
          <option value="low">Below Rp 3jt</option>
          <option value="high">Above Rp 3jt</option>
        </select>

        <div className="ml-auto text-sm text-gray-500">
          {filtered.length} results
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl shadow-xl border border-white/40 bg-gradient-to-r from-white/80 via-pink-50/70 to-rose-50/70 backdrop-blur-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-xs uppercase">
              <th className="p-4">ID</th>
              <th className="p-4">Service</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Provider</th>
              <th className="p-4 text-center">Rating</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition hover:scale-[1.01] hover:bg-pink-50 ${
                    index % 2 === 0 ? "bg-white/60" : "bg-white/30"
                  }`}
                >
                  <td className="p-4 text-gray-400">#{item.id}</td>

                  <td className="p-4">
                    <div className="font-semibold text-gray-800">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">
                      {item.description}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700">
                      {item.category}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-gray-700">
                    Rp {item.price.toLocaleString()}
                  </td>

                  <td className="p-4 text-gray-600">
                    {item.details.provider}
                  </td>

                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 text-xs font-semibold">
                      ⭐ {item.details.rating}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-400 italic">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== PINK SOFT VERSION: ServiceSearchFilter =====
export function ServiceSearchFilter() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    category: "",
    price: ""
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  };

  const filtered = serviceData.filter((item) => {
    const search = dataForm.searchTerm.toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);

    const matchCategory = dataForm.category
      ? item.category === dataForm.category
      : true;

    const matchPrice =
      dataForm.price === "low"
        ? item.price < 3000000
        : dataForm.price === "high"
        ? item.price >= 3000000
        : true;

    return matchSearch && matchCategory && matchPrice;
  });

  const categories = [
    ...new Set(serviceData.map((item) => item.category))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-8">
      {/* SEARCH */}
      <input
        type="text"
        name="searchTerm"
        placeholder="🔍 Search..."
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-xl border border-gray-200 mb-4 focus:ring-2 focus:ring-pink-400 outline-none"
      />

      {/* FILTER */}
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <select
          name="category"
          onChange={handleChange}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400"
        >
          <option value="">All Category</option>
          {categories.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        <select
          name="price"
          onChange={handleChange}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400"
        >
          <option value="">All Price</option>
          <option value="low">Murah</option>
          <option value="high">Mahal</option>
        </select>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/80 via-pink-50/70 to-rose-50/70 backdrop-blur-lg shadow-lg border border-white/40 hover:scale-[1.03] transition"
          >
            <img
              src={item.image}
              className="w-full h-40 object-cover hover:scale-105 transition"
            />

            <div className="p-4">
              <h2 className="font-semibold text-gray-800">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>

              <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 font-bold mt-2">
                Rp {item.price.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                ⭐ {item.details.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}