import {
  CircleChevronRight,
  History,
  Search,
  User,
  Mail,
  Phone,
  LogOut,
} from "lucide-react";

interface DashboardHeaderProps {
  activeTab: "tickets" | "history" | "search";
  user: any;
  onLogout: () => void;
}

export default function DashboardHeader({

}: DashboardHeaderProps) {
  const titleMap = {
    tickets: { icon: <CircleChevronRight size={20} />, label: "Vé hiện tại của bạn" },
    history: { icon: <History size={20} />, label: "Lịch sử đặt vé" },
    search: { icon: <Search size={20} />, label: "Tra cứu vé" },
  };

  const { icon, label } = titleMap[activeTab];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom: "20px",
      }}
    >
      <h4
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px",
          fontWeight: 600,
          color: "#1f2937",
          margin: 0,
        }}
      >
        {icon} {label}
      </h4>

      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "14px",
            color: "#374151",
            background: "#f9fafb",
            padding: "8px 16px",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <User size={16} color="#4b5563" /> {user.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Mail size={16} color="#4b5563" /> {user.email}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Phone size={16} color="#4b5563" /> {user.phone}
          </div>
          <button
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.background = "#dc2626")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.background = "#ef4444")
            }
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
