"use client";

import {
  User,
  ChevronRight,
  Star,
  ShoppingBag,
  Search,
  MapPin,
  Bell,
  Heart,
  Gift,
  CreditCard,
  HelpCircle,
  Mail,
  MailCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "./UserAccountCard.css";
import Link from "next/link";
import type { Ticket } from "@/app/components/users/TicketTable";

export default function UserAccountCard() {
  const [user,setUser] =useState<any>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      // ✅ Fetch bookings từ localStorage
      useEffect(() => {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "null");
          const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    
          if (!user?.email) {
            setError("Vui lòng đăng nhập để xem thông tin đặt vé");
            setLoading(false);
            return;
          }
    
          // if (bookings.length === 0) {
          //   setError("Không có dữ liệu bookings 3");
          //   setLoading(false);
          //   return;
          // }
    
          const mappedTickets: Ticket[] = bookings.flatMap((booking: any) => {
            const bookingDate = new Date(booking.created_at).toLocaleString("vi-VN");
    
            return booking.flights.map((flight: any, idx: number) => {
              const seats =
                booking.detail?.list_pre_seat
                  ?.filter((s: any) => s.Leg === idx)
                  .map((s: any) => s.Code) || [];
    
              const baggages =
                booking.detail?.list_baggage
                  ?.filter((b: any) => b.Leg === idx)
                  .map((b: any) => b.Name) || [];
    
              return {
                id: booking.id,
                bookingId: booking.id,
                bookingDate,
                airline: flight.airline,
                airlineName: flight.airline_name,
                flightNumber: flight.flight_number,
                departure: flight.start_point,
                departureCity: flight.start_city,
                arrival: flight.end_point,
                arrivalCity: flight.end_city,
                startDate: new Date(flight.start_date).toLocaleString("vi-VN"),
                endDate: new Date(flight.end_date).toLocaleString("vi-VN"),
                seats,
                baggages,
                status: flight.status == "ok"
                ? "Đã xác nhận"
                : flight.status || "Đang xử lý...",

              } as Ticket;
            });
          });
    
          setTickets(mappedTickets);
        } catch (err) {
          console.error("Lỗi khi load dữ liệu:", err);
          setError("Không thể tải dữ liệu vé.");
        } finally {
          setLoading(false);
        }
      }, []);

  const sections = [
    {
      title: "Tài khoản & dịch vụ",
      items: [
        { 
          icon: <ShoppingBag size={20} color="#28a745" />, 
          title: "Thông tin đơn hàng", 
          desc: "Theo dõi hoàn tiền và quản lý chi tiết ngân hàng",
          link: "/user/thong-tin-don-hang"
        },
        { 
          icon: <HelpCircle size={20} color="#6c757d" />, 
          title: "Trợ giúp", 
          desc: "Nơi giải đáp mọi thắc mắc của bạn",
          link: "/tro-giup"
        },
      ],
    },

    {
      title: "Cá nhân hóa",
      items: [
        { 
          icon: <Search size={20} color="#3cbefc" />, 
          title: "Tra cứu vé máy bay", 
          desc: "Kiểm tra đặt chỗ và thông tin hành trình",
          color: "#3cbefc",
          link: "/user/tra-cuu-ve-may-bay"
        },
        { 
          icon: <MapPin size={20} color="#ff8c00" />, 
          title: "Tour du lịch đã chọn", 
          desc: "Quản lý tour yêu thích của bạn",
          color: "#ff8c00",
          link: "/user/tour-da-chon"
        },
        { 
          icon: <Bell size={20} color="#fbbc05" />, 
          title: "Thông báo giá vé", 
          desc: "Nhận thông báo khi giá giảm",
          color: "#fbbc05",
          link: "/user/thong-bao-gia-ve"
        },
        { 
          icon: <Heart size={20} color="#e74c3c" />, 
          title: "Tuyến bay yêu thích", 
          desc: "Theo dõi tuyến bay bạn quan tâm",
          color: "#e74c3c",
          link: "/user/tuyen-bay-yeu-thich"
        },
        { 
          icon: <Gift size={20} color="#34a853" />, 
          title: "Chương trình ưu đãi", 
          desc: "Khám phá ưu đãi dành riêng cho bạn",
          color: "#34a853",
          link: "/khuyen-mai"
        },
      ],
    },
  ];


  return (
    <div className="account-container py-2 px-2">
      {/* Header */}
     <div className="cardheader rounded" >
       <div className="header-card rounded-2 shadow-sm mb-3 p-3 d-flex align-items-center">
        <div
          className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
          style={{ width: 48, height: 48 }}
        >
          <User color="#3f8acd" size={26} />
        </div>
        <div>
          <h6 className="fw-bold mb-1 text-white ">{user?.name}</h6>
          <div style={{color:"#3f8acd", fontSize: "0.8rem" }}>
            <Link href="/user/thong-tin" className="fw-semibold text-white ">Xem hồ sơ của tôi</Link>
          </div>
        </div>     
      </div>
      
     </div>
     

      {/* Sections */}
    {sections.map((section, i) => (
      <div key={i} className="menu-section mb-3">
        <div className="list-group rounded-2 shadow-sm overflow-hidden">
          {section.items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="list-group-item d-flex align-items-center justify-content-between text-decoration-none"
            >
              <div className="d-flex align-items-start gap-3 text-start">
                {item.icon}
                <div>
                  <div className="fw-semibold text-dark">{item.title}</div>
                  <small className="text-muted d-block">{item.desc}</small>
                </div>
              </div>
              <ChevronRight size={18} color="#adb5bd" />
            </Link>
          ))}
        </div>
      </div>
    ))}
      {/* Footer */}
      <div className="text-center mt-4 text-muted" style={{ fontSize: "0.85rem" }}>
        🎁 Nhận ưu đãi đến <b>1.5 triệu</b> khi đặt vé ngay hôm nay!
      </div>
    </div>
  );
}
