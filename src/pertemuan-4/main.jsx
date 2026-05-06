import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ServiceList from "./ServiceList";
import ServiceTable from "./ServiceTable";
import ServiceSearchFilter from "./ServiceSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";
import "./tailwind.css";

function App() {
  const [role, setRole] = useState("guest");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-4 md:p-8">
      {/* HEADER & ROLE SWITCHER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 bg-gradient-to-r from-white/80 via-pink-50/70 to-rose-50/70 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/40">
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
            Service Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Manage and view your services easily</p>
        </div>

        <div className="flex bg-white/60 p-1 rounded-xl mt-4 md:mt-0 backdrop-blur">
          <button
            onClick={() => setRole("guest")}
            className={`px-6 py-2 rounded-lg transition-all ${
              role === "guest"
                ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow font-bold"
                : "text-gray-500"
            }`}
          >
            Guest View
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-6 py-2 rounded-lg transition-all ${
              role === "admin"
                ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow font-bold"
                : "text-gray-500"
            }`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* CONDITIONAL RENDERING */}
        {role === "guest" ? (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-pink-500 to-fuchsia-500 rounded-full"></span>
                Featured Services
              </h2>
              <ServiceList />
            </section>
            
            <section className="bg-gradient-to-r from-white/80 via-pink-50/70 to-rose-50/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/40">
              <h2 className="text-xl font-bold mb-4">Explore All Services</h2>
              <ServiceSearchFilter />
            </section>

            <ResponsiveDesign />
          </div>
        ) : (
          <section className="bg-gradient-to-r from-white/80 via-pink-50/70 to-rose-50/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 overflow-hidden">
            <div className="p-6 border-b border-white/30 bg-white/50">
              <h2 className="text-xl font-bold text-gray-800">Service Management</h2>
              <p className="text-sm text-gray-500">Filter, search, and manage service inventory</p>
            </div>
            {/* Tabel Admin */}
            <ServiceTable role="admin" />
          </section>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);