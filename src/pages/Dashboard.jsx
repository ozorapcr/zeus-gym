// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { COLORS } from "../constants";
import userAPI from "../services/userAPI";      // ← PERUBAHAN: tanpa {}
import authAPI from "../services/authAPI";      // ← PERUBAHAN: tanpa {}

export default function Dashboard({ database, actions, session }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const user = await authAPI.getUser();
        setCurrentUser(user);
        
        const allUsers = await userAPI.fetchUsers();
        setUsers(allUsers || []);
        
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const totalUsers = users.length;
  const totalFeedback = database?.feedback?.length || 0;
  const totalPayments = database?.payments?.length || 0;
  const totalRegistrations = database?.registrations?.length || 0;

  return (
    <div>
      <h1 style={{ color: "#FFFFFF", marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "#6B7280", marginBottom: 24 }}>
        Selamat datang, {session?.user?.user_metadata?.name || currentUser?.user_metadata?.name || "Admin"}!
      </p>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
        marginBottom: 28,
      }}>
        <div style={{
          background: "#121317",
          padding: 24,
          borderRadius: 16,
          border: "1px solid #2A2D35",
        }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>👥 Total Anggota</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>
            {loading ? "..." : totalUsers}
          </div>
        </div>
        
        <div style={{
          background: "#121317",
          padding: 24,
          borderRadius: 16,
          border: "1px solid #2A2D35",
        }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>⭐ Total Feedback</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>
            {totalFeedback}
          </div>
        </div>
        
        <div style={{
          background: "#121317",
          padding: 24,
          borderRadius: 16,
          border: "1px solid #2A2D35",
        }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>💳 Total Pembayaran</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>
            {totalPayments}
          </div>
        </div>
        
        <div style={{
          background: "#121317",
          padding: 24,
          borderRadius: 16,
          border: "1px solid #2A2D35",
        }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>📝 Total Registrasi</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>
            {totalRegistrations}
          </div>
        </div>
      </div>

      <div style={{
        background: "#121317",
        padding: 24,
        borderRadius: 16,
        border: "1px solid #2A2D35",
      }}>
        <h3 style={{ color: "#FFFFFF", marginBottom: 16 }}>Daftar Anggota</h3>
        
        {loading ? (
          <p style={{ color: "#6B7280" }}>Memuat data...</p>
        ) : users.length === 0 ? (
          <p style={{ color: "#6B7280" }}>Belum ada anggota terdaftar</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}>
              <thead>
                <tr style={{
                  textAlign: "left",
                  borderBottom: "1px solid #2A2D35",
                }}>
                  <th style={{ padding: "12px 16px", color: "#6B7280", fontWeight: 600 }}>Nama</th>
                  <th style={{ padding: "12px 16px", color: "#6B7280", fontWeight: 600 }}>Email</th>
                  <th style={{ padding: "12px 16px", color: "#6B7280", fontWeight: 600 }}>Role</th>
                  <th style={{ padding: "12px 16px", color: "#6B7280", fontWeight: 600 }}>Bergabung</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user, index) => (
                  <tr key={user.id || index} style={{
                    borderBottom: "1px solid #1A1B1E",
                  }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#FFFFFF" }}>
                      {user.user_metadata?.name || user.email || "Unknown"}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#6B7280" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        background: user.user_metadata?.role === "admin" 
                          ? "rgba(205,76,126,0.15)" 
                          : "rgba(52,199,89,0.15)",
                        color: user.user_metadata?.role === "admin" 
                          ? "#CD4C7E" 
                          : "#34C759",
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                      }}>
                        {user.user_metadata?.role || "User"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#6B7280", fontSize: 13 }}>
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}