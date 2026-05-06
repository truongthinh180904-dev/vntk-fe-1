"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TicketTable from "../../components/users/TicketTable";
import SearchTab from "../../components/users/SearchTab";
import DashboardHeader from "../../components/users/DashboardHeader";
import BannerDefault from "../../assets/img/promotion/banner-promotion.jpg"; // bạn tạo file ảnh fallback này nha
import MenuHeader from "../../dashboard/MenuHeader"
import UserAccountCard from "./UserAccountCard";
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

export default function UserDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [history, setHistory] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;


  // 🔹 Fetch banner
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/backgroundshome/5");
        const imgPath = res?.data?.data?.image_path;
        setBanner(
          imgPath
            ? `http://127.0.0.1:8000/storage/${imgPath}`
            : BannerDefault.src
        );
      } catch (err) {
        console.warn("⚠️ Không tải được banner, dùng fallback");
        setBanner(BannerDefault.src);
      }
    };
    fetchBanner();
  }, []);

  // 🔹 Fetch bookings
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const bookingsDetail = JSON.parse(localStorage.getItem("bookingsDetail") || "[]");
  console.log("dữ liệu bookings",bookings);
    if (!user?.email) {
      setError("Vui lòng đăng nhập để xem thông tin đặt vé");
      setLoading(false);
      return;
    }

    // if (bookings.length === 0) {
    //   setError("Không có dữ liệu bookings 2");
    //   setLoading(false);
    //   // handleLogout();
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

    setTickets(mappedTickets.filter((t) => !t.status.includes("Hoàn thành")));
    setHistory(mappedTickets.filter((t) => t.status.includes("Hoàn thành")));
    setLoading(false);
  }, []);



  if (loading) return <div className="text-center mt-5">Đang tải...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;



  return (
    <>
       <div className="container-fluid d-none d-md-block dashboard-page py-4" style={{backgroundColor:"#48a2f1"}}>
       {/* 🔹 Header */}
      {/* <DashboardHeader activeTab={activeTab} user={user} onLogout={handleLogout} /> */}

      {/* 🔹 Banner */}
      <div className="dashboard-banner  overflow-hidden mb-4" style={{ position: "relative", height: "420px",borderRadius:"14px" }}>
      <MenuHeader />
      </div>
    </div>
  <div className="container-fluid d-block d-md-none dashboard-page py-2"  style={{backgroundColor:"aliceblue"}} >  
      <div className="overflow-hidden mb-4" style={{ minHeight: "300px", position: "relative",}}>
        <UserAccountCard />
      </div>
  </div>
   
    </>
 
  );
}
