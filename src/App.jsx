import { useEffect, useMemo, useState } from "react";
import { COLORS } from "./constants";
import { getSession, loadDatabase, login, logout, saveDatabase } from "./dataStore";
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
  const [form, setForm] = useState({ email: "admin@gymzeus.local", password: "admin123" });
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const result = login(form.email.trim(), form.password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    onLogin(result.session);
  };

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="brand-lockup">
          <div className="brand-mark">G</div>
          <div>
            <div className="brand-title">GYM<span>ZEUS</span></div>
            <div className="brand-subtitle">MANAGEMENT SYSTEM</div>
          </div>
        </div>

        <div className="login-copy">
          <h1>Masuk Admin</h1>
          <p>Kelola anggota, pembayaran, akses, dan laporan dari satu dashboard.</p>
        </div>

        <form onSubmit={submit} className="login-form">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((value) => ({ ...value, email: e.target.value }))}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((value) => ({ ...value, password: e.target.value }))}
          />
          {error && <div className="form-error">{error}</div>}
          <PrimaryButton type="submit" style={{ width: "100%" }}>Masuk</PrimaryButton>
        </form>
      </section>

      <section className="login-aside">
       
        
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => readRoute());
  const [session, setSession] = useState(() => getSession());
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

  const handleLogout = () => {
    logout();
    setSession(null);
    navigatePage("Dashboard");
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: COLORS.black,
      color: COLORS.text,
    }}>
      <Sidebar active={route.active} setActive={navigatePage} session={session} onLogout={handleLogout} />

      <main className="app-main">
        <div className="page-container">
          <PageComponent
            database={database}
            actions={dbActions}
            detailMemberId={route.memberId}
            onOpenMemberDetail={openMemberDetail}
            onCloseMemberDetail={closeMemberDetail}
          />
        </div>
      </main>
    </div>
  );
}
