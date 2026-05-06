import React, { useEffect, useState } from "react";
import {
  User,
  ChevronRight,
  Star,
  ShoppingBag,
  Search,
  MapPin,
  Bell,
  Heart,
  Gift
} from "lucide-react";
import "./Sidebar.css"
import Link from "next/link";
export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const menuItems = [
  { icon: <ShoppingBag size={20} color="#3cbefc" />, text: "Thông tin đơn hàng" },
  { icon: <Search size={20} color="#3cbefc" />, text: "Tra cứu vé máy bay" },
  { icon: <MapPin size={20} color="#3cbefc" />, text: "Tour du lịch đã chọn" },
  { icon: <Bell size={20} color="#3cbefc" />, text: "Thông báo giá vé" },
  { icon: <Heart size={20} color="#3cbefc" />, text: "Tuyến bay yêu thích" },
  { icon: <Gift size={20} color="#3cbefc" />, text: "Chương trình ưu đãi" },
  ];
      useEffect(() => {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch {
              console.error("Lỗi parse user localStorage");
            }
          }
        }
      }, []);
    
  return (
    <div className="sidebar">
    <div
            className="header-users p-3 mb-2"
            style={{
              background: "linear-gradient(145deg, rgb(148 218 243), #e2f7ff, #f0fbff)",
              borderRadius:"12px",
              width: "100%",
            }}
             >
               {/* Tên + hạng */}
               <div
                 className="fw-bold text-dark mb-1 text-truncate"
                 style={{
                   fontSize: "18px",
                   color: "#333",
                   maxWidth: "100%",
                 }}
               >
                 {user?.name}
               </div>
               <div
                 className="text-muted small d-flex align-items-center"
                 style={{ gap: "4px", color: "gray" }}
               >
             <b style={{ color: "rgb(0,150,220)", fontSize: "13px" }}>{user?.email}</b>

               </div>
             </div>

       <ul className="list-unstyled mb-2" style={{ margin: 0 }}>
      {[
        { 
          icon: <User size={20} color="#0EA5E9" />, 
          text: "Thông tin của bạn",
          link: "/user/thong-tin"
        },
        { 
          icon: <ShoppingBag size={20} color="#F97316" />, 
          text: "Thông tin đơn hàng",
          link: "/user/thong-tin-don-hang"
        },
        { 
          icon: <Search size={20} color="#22C55E" />, 
          text: "Tra cứu vé máy bay",
          link: "/user/tra-cuu-ve-may-bay"
        },
        { 
          icon: <MapPin size={20} color="#8B5CF6" />, 
          text: "Tour du lịch đã chọn",
          link: "/user/tour-da-chon"
        },
        { 
          icon: <Bell size={20} color="#EAB308" />, 
          text: "Thông báo giá vé",
          link: "/user/thong-bao-gia-ve"
        },
        { 
          icon: <Heart size={20} color="#EF4444" />, 
          text: "Tuyến bay yêu thích",
          link: "/user/tuyen-bay-yeu-thich"
        },
        { 
          icon: <Gift size={20} color="#EC4899" />, 
          text: "Chương Trình Ưu Đãi",
          link: "/khuyen-mai"
        }
      ].map((item, idx) => (
        <Link 
          key={idx}
          href={item.link}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li
            className="dropdown-item-custom"
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              transition: "all 0.25s ease",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#333",
              fontWeight: 500,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.background = "#dff5ff"),
              (e.currentTarget.style.transform = "translateX(3px)"))
            }
            onMouseLeave={(e) =>
              ((e.currentTarget.style.background = "transparent"),
              (e.currentTarget.style.transform = "translateX(0)"))
            }
          >
            {item.icon} {item.text}
          </li>
        </Link>
      ))}
    </ul>

    </div>
  );
}
