"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  TicketCheck, 
  MapPin, 
  Heart, 
  Mail, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

export interface Ticket {
  id: number;
  bookingId: number;
  bookingDate: string;
  airline: string;
  airlineName: string;
  flightNumber: string;
  departure: string;
  departureCity: string;
  arrival: string;
  arrivalCity: string;
  startDate: string;
  endDate: string;
  seats: string[];
  baggages: string[];
  status: string;
}

export default function DashboardPage() {
    const [showModal, setShowModal] = useState<"donhang" | "ve" | "tour" | null>(null);

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
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
        //   setError("Không có dữ liệu bookings");
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

    const donHangHienTai = tickets.length ;

    const veXacNhan = tickets.filter(
      t => t.status.toLowerCase().includes("xác nhận")
    ).length;


  return (
    <div className="dashboard-container">
      <Sidebar />

    <div
      className="content p-4 shadow-sm"
      style={{
        background: "linear-gradient(145deg, #f9fbfd, #eef6fc)",
        fontFamily: "Be Vietnam Pro, sans-serif",
        color: "#0a3d62",
      }}
    >
     

     <div className="row g-4 mb-5">
  {/* Đơn hàng hiện tại */}
  <div className="col-md-4">
    <div
      className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between card-hover"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
        border: "1px solid #e0ecf9",
        boxShadow: "0 4px 15px rgba(0,123,255,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >
      
      <div>
        <div className="d-flex align-items-center mb-2">
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <ShoppingBag size={16} color="white" />
          </div>
          <h5 className="fw-semibold mb-0" style={{color: "#1e40af"}}>Đơn hàng hiện tại</h5>
        </div>
        <p style={{color: "#6b7280", fontSize: "0.9rem"}}>Theo dõi tiến trình đặt chỗ của bạn</p>
      </div>
      
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="d-flex align-items-center">
          <span
            className="fw-bold fs-4 d-flex align-items-center justify-content-center"
            style={{
              color: "#007bff",
              background: "linear-gradient(135deg, #e8f3ff 0%, #d4e7ff 100%)",
              borderRadius: "12px",
              padding: "8px 16px",
              minWidth: "60px",
              boxShadow: "0 2px 8px rgba(0,123,255,0.15)"
            }}
          >
           {donHangHienTai}
          </span>
        </div>
        
       <button
        className="btn fw-semibold d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px"
        }}
        onClick={() => router.push("/user/thong-tin-don-hang")}
      >
        Chi tiết
        <ChevronRight size={16} style={{ marginLeft: "6px" }} />
      </button>
      </div>
    </div>
  </div>

  {/* Vé đã xác nhận */}
  <div className="col-md-4">
    <div
      className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between card-hover"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f0fdff 100%)",
        border: "1px solid #e0f7fa",
        boxShadow: "0 4px 15px rgba(0,170,255,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div>
        <div className="d-flex align-items-center mb-2">
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #00aaff 0%, #0088cc 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <TicketCheck size={16} color="white" />
          </div>
          <h5 className="fw-semibold mb-0" style={{color: "#0e7490"}}>Vé đã xác nhận</h5>
        </div>
        <p style={{color: "#6b7280", fontSize: "0.9rem"}}>Các vé bạn đã đặt thành công</p>
      </div>
      
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="d-flex align-items-center">
          <span
            className="fw-bold fs-4 d-flex align-items-center justify-content-center gap-1"
            style={{
              color: "#00aaff",
              background: "linear-gradient(135deg, #e6faff 0%, #d1f2ff 100%)",
              borderRadius: "12px",
              padding: "8px 16px",
              minWidth: "60px",
              boxShadow: "0 2px 8px rgba(0,170,255,0.15)"
            }}
          >
            {veXacNhan}
          </span>
        </div>
        
        <button
          className="btn fw-semibold d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #00aaff 0%, #0088cc 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            boxShadow: "0 2px 8px rgba(0,170,255,0.3)"
          }}
          onClick={() => setShowModal("ve")}
        >
          Chi tiết
          <ChevronRight size={16} style={{marginLeft: "6px"}} />
        </button>
      </div>
    </div>
  </div>

  {/* Tour du lịch */}
  <div className="col-md-4">
    <div
      className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between card-hover"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f3fffd 100%)",
        border: "1px solid #e0faf4",
        boxShadow: "0 4px 15px rgba(0,153,204,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div>
        <div className="d-flex align-items-center mb-2">
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #0099cc 0%, #007799 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <MapPin size={16} color="white" />
          </div>
          <h5 className="fw-semibold mb-0" style={{color: "#0369a1"}}>Tour du lịch</h5>
        </div>
        <p style={{color: "#6b7280", fontSize: "0.9rem"}}>Các tour du lịch bạn đã tham gia</p>
      </div>
      
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="d-flex align-items-center">
          <span
            className="fw-bold fs-4 d-flex align-items-center justify-content-center"
            style={{
              color: "#0099cc",
              background: "linear-gradient(135deg, #e3f5ff 0%, #cceeff 100%)",
              borderRadius: "12px",
              padding: "8px 16px",
              minWidth: "60px",
              boxShadow: "0 2px 8px rgba(0,153,204,0.15)"
            }}
          >
            0
          </span>
        </div>
        
        <button
          className="btn fw-semibold d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #0099cc 0%, #007799 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px"
          }}
          onClick={() => setShowModal("tour")}
        >
          Khám phá
          <ChevronRight size={16} style={{marginLeft: "6px"}} />
        </button>
      </div>
    </div>
  </div>

  {/* Tuyến bay yêu thích */}
  <div className="col-md-4">
    <div
      className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between card-hover"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fffaf0 100%)",
        border: "1px solid #feebc8",
        boxShadow: "0 4px 15px rgba(245,158,11,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >
      
      <div>
        <div className="d-flex align-items-center mb-2">
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <Heart size={16} color="white" />
          </div>
          <h5 className="fw-semibold mb-0" style={{color: "#92400e"}}>Tuyến bay yêu thích</h5>
        </div>
        <p style={{color: "#6b7280", fontSize: "0.9rem"}}>Các tuyến bay bạn đã lưu lại</p>
      </div>
      
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="d-flex align-items-center">
          <span
            className="fw-bold fs-4 d-flex align-items-center justify-content-center"
            style={{
              color: "#f59e0b",
              background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
              borderRadius: "12px",
              padding: "8px 16px",
              minWidth: "60px",
              boxShadow: "0 2px 8px rgba(245,158,11,0.15)"
            }}
          >
            0
          </span>
        </div>
        
        <button
          className="btn fw-semibold d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px"
          }}
          // onClick={() => setShowModal("tuyentbay")}
        >
          Xem ngay
          <ChevronRight size={16} style={{marginLeft: "6px"}} />
        </button>
      </div>
    </div>
  </div>

  {/* Bật thông báo qua email */}
  <div className="col-md-4">
    <div
      className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between card-hover"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)",
        border: "1px solid #f3e8ff",
        boxShadow: "0 4px 15px rgba(168,85,247,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >     
      <div>
        <div className="d-flex align-items-center mb-2">
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <Mail size={16} color="white" />
          </div>
          <h5 className="fw-semibold mb-0" style={{color: "#7c3aed"}}>Thông báo email</h5>
        </div>
        <p style={{color: "#6b7280", fontSize: "0.9rem"}}>Nhận thông báo ưu đãi qua email</p>
      </div>
      
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="d-flex align-items-center">
          <div style={{
            width: "44px",
            height: "24px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: "12px",
            padding: "2px",
            position: "relative",
            boxShadow: "0 2px 4px rgba(16, 185, 129, 0.3)"
          }}>
            <div style={{
              width: "20px",
              height: "20px",
              background: "white",
              borderRadius: "50%",
              transform: "translateX(22px)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
            }}></div>
          </div>
          <span style={{marginLeft: "10px", color: "#10b981", fontSize: "0.875rem", fontWeight: "600"}}>
            Đã bật
          </span>
        </div>
        
        <button
          className="btn fw-semibold d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px"
          }}
          // onClick={() => setShowModal("thongbao")}
        >
          Cài đặt
          <Settings size={16} style={{marginLeft: "6px"}} />
        </button>
      </div>
    </div>
  </div>
</div>

       

      {/* Modal hiển thị */}
      {showModal && (
        <div
          className="fade show"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setShowModal(null)}
        >
          <div
            className="rounded-4 p-4"
            style={{
              background: "#fff",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              animation: "scaleUp 0.25s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="fw-semibold mb-3 text-center">
              {showModal === "donhang"
                ? "Chi tiết đơn hàng hiện tại"
                : showModal === "ve"
                ? "Chi tiết vé đã xác nhận"
                : "Chi tiết tour du lịch"}
            </h5>
            <p className="text-center" style={{ color: "#6b7280" }}>
              Hiện chưa có dữ liệu hiển thị.
            </p>
            <div className="text-center mt-4">
              <button
                className="btn btn-primary px-4"
                style={{
                  background: "linear-gradient(90deg, #007bff, #00aaff)",
                  border: "none",
                }}
                onClick={() => setShowModal(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hiệu ứng animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </div>

    </div>
  );
}
