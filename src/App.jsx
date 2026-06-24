// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { COLORS } from "./constants";
import { loadDatabase, saveDatabase } from "./dataStore";
import Sidebar from "./components/Sidebar";
import { Input, PrimaryButton } from "./components/UI";
import Dashboard from "./pages/Dashboard";
import Registrasi from "./pages/Registrasi";
import Pembayaran from "./pages/Pembayaran";
import Keanggotaan from "./pages/Keanggotaan";
import Akses from "./pages/Akses";
import Laporan from "./pages/Laporan";
import Promosi from "./pages/Promosi";
import Feedback from "./pages/Feedback";
import Components from "./pages/Components";

import authAPI from "./services/authAPI";  // ← PERUBAHAN: tanpa {}

const PAGES = {
  Dashboard,
  Registrasi,
  Pembayaran,
  Keanggotaan,
  Akses,
  Laporan,
  Promosi,
  Feedback,
  Components,
};

const CUSTOMER_DETAIL_ROUTE = /^\/customers\/([^/]+)\/?$/i;

const PATH_ROUTES = {
  "/components": "Components",
};

function readRoute() {
  if (typeof window === "undefined") {
    return { active: "Dashboard", memberId: "" };
  }

  const match = window.location.pathname.match(CUSTOMER_DETAIL_ROUTE);
  if (match) {
    return {
      active: "Keanggotaan",
      memberId: decodeURIComponent(match[1]).toUpperCase(),
    };
  }

  const page = PATH_ROUTES[window.location.pathname.toLowerCase()];
  if (page) {
    return { active: page, memberId: "" };
  }

  return { active: "Dashboard", memberId: "" };
}

function pushPath(path) {
  if (typeof window === "undefined" || window.location.pathname === path) return;
  window.history.pushState(null, "", path);
}

function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ 
    email: "admin@gymzeus.local", 
    password: "admin123" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { user, session } = await authAPI.login(
        form.email.trim(),
        form.password
      );

      localStorage.setItem('sb-session', JSON.stringify(session));
      onLogin(session);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Email atau password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      background: "#0A0B0D",
    }}>
      <div style={{
        background: "#121317",
        padding: 48,
        borderRadius: 24,
        maxWidth: 420,
        width: "100%",
        border: "1px solid #2A2D35",
      }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#FFFFFF",
          }}>
            GYM<span style={{ color: "#CD4C7E" }}>ZEUS</span>
          </div>
          <div style={{
            fontSize: 13,
            color: "#6B7280",
            marginTop: 4,
          }}>
            MANAGEMENT SYSTEM
          </div>
        </div>

        <h2 style={{ color: "#FFFFFF", marginBottom: 8 }}>Masuk Admin</h2>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 24 }}>
          Kelola anggota, pembayaran, akses, dan laporan dari satu dashboard.
        </p>

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.12)",
            color: "#EF4444",
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 13,
            marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={loading}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={loading}
          />
          
          <PrimaryButton 
            type="submit" 
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => readRoute());
  const [session, setSession] = useState(() => {
    const savedSession = localStorage.getItem('sb-session');
    if (savedSession) {
      try {
        return JSON.parse(savedSession);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [database, setDatabase] = useState(() => loadDatabase());

  const PageComponent = PAGES[route.active];
  
  const dbActions = useMemo(() => ({
    updateDatabase(updater) {
      setDatabase((current) => {
        const next = typeof updater === "function" ? updater(current) : updater;
        saveDatabase(next);
        return next;
      });
    },
  }), []);

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (!session) {
    return <LoginScreen onLogin={setSession} />;
  }

  const navigatePage = (page) => {
    pushPath(page === "Components" ? "/components" : "/");
    setRoute({ active: page, memberId: "" });
  };

  const openMemberDetail = (memberId) => {
    const nextMemberId = String(memberId).toUpperCase();
    pushPath(`/customers/${encodeURIComponent(nextMemberId)}`);
    setRoute({ active: "Keanggotaan", memberId: nextMemberId });
  };

  const closeMemberDetail = () => {
    pushPath("/");
    setRoute({ active: "Keanggotaan", memberId: "" });
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem('sb-session');
    setSession(null);
    navigatePage("Dashboard");
  };

  if (!PageComponent) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        minHeight: "100vh",
        color: "#FFFFFF",
        background: "#0A0B0D",
      }}>
        <div>
          <h2>Halaman tidak ditemukan</h2>
          <p style={{ color: "#6B7280" }}>Page: {route.active}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: COLORS.black,
      color: COLORS.text,
    }}>
      <Sidebar 
        active={route.active} 
        setActive={navigatePage} 
        session={session} 
        onLogout={handleLogout} 
      />

      <main style={{
        flex: 1,
        padding: 32,
        background: "#0A0B0D",
        overflowY: "auto",
        minHeight: "100vh",
      }}>
        <div style={{
          maxWidth: 1440,
          margin: "0 auto",
        }}>
          <PageComponent
            database={database}
            actions={dbActions}
            detailMemberId={route.memberId}
            onOpenMemberDetail={openMemberDetail}
            onCloseMemberDetail={closeMemberDetail}
            session={session}
          />
        </div>
      </main>
    </div>
  );
}