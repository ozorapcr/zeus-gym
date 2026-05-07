// ============================================================
//  constants.js  —  Shared colors, data & utilities
// ============================================================

export const COLORS = {
  /* ========================================================
     BASE COLORS
  ======================================================== */
  black: "#000000",

  /* ========================================================
     BACKGROUND
  ======================================================== */
  charcoal: "#F7F8FA",
  dark: "#EFF3F4",
  card: "#FFFFFF",

  /* ========================================================
     BORDER / MUTED
  ======================================================== */
  border: "#D9D9D9",
  muted: "#CCCCCC",

  /* ========================================================
     PRIMARY BRAND
  ======================================================== */
  accent: "#CD4C7E",
  accentDim: "#B13F6B",

  /* ========================================================
     STATUS COLORS
  ======================================================== */
  red: "#FF5A5A",
  green: "#34C759",
  orange: "#FF9E84",

  /* ========================================================
     TEXT
  ======================================================== */
  text: "#2D3345",
  textSec: "#6E376E",
};

/* ============================================================
   MEMBER DATA
============================================================ */
export const MEMBERS = [
  {
    id: "GYM001",
    name: "Andi Pratama",
    plan: "Premium",
    status: "Aktif",
    expiry: "2025-07-01",
    avatar: "AP",
  },

  {
    id: "GYM002",
    name: "Siti Rahayu",
    plan: "Basic",
    status: "Aktif",
    expiry: "2025-06-15",
    avatar: "SR",
  },

  {
    id: "GYM003",
    name: "Budi Santoso",
    plan: "VIP",
    status: "Hampir Habis",
    expiry: "2025-05-20",
    avatar: "BS",
  },

  {
    id: "GYM004",
    name: "Dewi Lestari",
    plan: "Basic",
    status: "Kadaluarsa",
    expiry: "2025-04-30",
    avatar: "DL",
  },

  {
    id: "GYM005",
    name: "Rizky Firmansyah",
    plan: "Premium",
    status: "Aktif",
    expiry: "2025-08-10",
    avatar: "RF",
  },
];

/* ============================================================
   TRANSACTION DATA
============================================================ */
export const TRANSACTIONS = [
  {
    id: "TRX001",
    member: "Andi Pratama",
    amount: 350000,
    method: "Transfer",
    date: "2025-05-04",
    status: "Sukses",
  },

  {
    id: "TRX002",
    member: "Siti Rahayu",
    amount: 200000,
    method: "QR Code",
    date: "2025-05-03",
    status: "Sukses",
  },

  {
    id: "TRX003",
    member: "Budi Santoso",
    amount: 600000,
    method: "E-Wallet",
    date: "2025-05-02",
    status: "Sukses",
  },

  {
    id: "TRX004",
    member: "Rizky Firmansyah",
    amount: 350000,
    method: "Transfer",
    date: "2025-05-01",
    status: "Pending",
  },
];

/* ============================================================
   NAVIGATION
============================================================ */
export const NAV_ITEMS = [
  "Dashboard",
  "Registrasi",
  "Pembayaran",
  "Keanggotaan",
  "Akses",
  "Laporan",
  "Promosi",
  "Feedback",
];

/* ============================================================
   MEMBERSHIP PLANS
============================================================ */
export const PLANS = [
  {
    id: "Basic",
    price: "Rp 200.000/bln",

    features: [
      "Akses Gym",
      "Loker Standar",
    ],
  },

  {
    id: "Premium",
    price: "Rp 350.000/bln",

    features: [
      "Akses Gym",
      "Kelas Grup",
      "Loker Premium",
    ],
  },

  {
    id: "VIP",
    price: "Rp 600.000/bln",

    features: [
      "Akses 24 Jam",
      "Personal Trainer",
      "Semua Fasilitas",
    ],
  },
];