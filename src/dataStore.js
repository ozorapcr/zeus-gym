import { MEMBERS as DEFAULT_MEMBERS, TRANSACTIONS as DEFAULT_TRANSACTIONS } from "./constants";

const DB_KEY = "gympro.database.v2";
const AUTH_KEY = "gympro.session.v1";

const seedDatabase = {
  members: DEFAULT_MEMBERS,
  transactions: DEFAULT_TRANSACTIONS,
  accessLogs: [
    { id: "ACC001", time: "10:42", name: "Andi Pratama", method: "QR Code", status: "Masuk" },
    { id: "ACC002", time: "10:15", name: "Siti Rahayu", method: "ID Card", status: "Masuk" },
    { id: "ACC003", time: "09:58", name: "Budi Santoso", method: "QR Code", status: "Ditolak" },
    { id: "ACC004", time: "09:30", name: "Rizky Firmansyah", method: "QR Code", status: "Masuk" },
  ],
  feedback: [
    { id: "FDB001", name: "Andi P.", rating: 5, text: "Fasilitas lengkap dan trainer profesional.", date: "2 hari lalu" },
    { id: "FDB002", name: "Siti R.", rating: 4, text: "Gym bersih dan sistem QR masuk praktis.", date: "5 hari lalu" },
    { id: "FDB003", name: "Rizky F.", rating: 5, text: "Harga sesuai dengan kualitas.", date: "1 minggu lalu" },
  ],
};

export const adminUser = {
  name: "Admin Gymzeus",
  email: "admin@gymzeus.local",
  password: "admin123",
  role: "Administrator",
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadDatabase() {
  const current = readJson(DB_KEY, null);
  if (current) return current;
  writeJson(DB_KEY, seedDatabase);
  return seedDatabase;
}

export function saveDatabase(database) {
  writeJson(DB_KEY, database);
  return database;
}

export function createMemberId(members) {
  const highest = members.reduce((max, member) => {
    const numericId = Number(String(member.id).replace("GYM", ""));
    return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
  }, 0);
  return `GYM${String(highest + 1).padStart(3, "0")}`;
}

export function createInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "MB";
}

export function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next.toISOString().slice(0, 10);
}

export function getSession() {
  return readJson(AUTH_KEY, null);
}

export function login(email, password) {
  if (email === adminUser.email && password === adminUser.password) {
    const session = {
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      loginAt: new Date().toISOString(),
    };
    writeJson(AUTH_KEY, session);
    return { ok: true, session };
  }
  return { ok: false, message: "Email atau password salah." };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
