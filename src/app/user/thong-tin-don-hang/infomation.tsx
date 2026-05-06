"use client";

import { useEffect, useState } from "react";
import TicketTable from "@/app/components/users/TicketTable";
import type { Ticket } from "@/app/components/users/TicketTable";
import MenuHeader from "@/app/components/users/DashboardHeader";



export default function infomation() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      //   setError("Không có dữ liệu bookings 4");
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

  if (loading) return <div className="text-center py-5">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <>
     
        <div className="container" >
            {/* ✅ Component hiển thị vé */}
            <TicketTable
                data={tickets}
                selectedId={selectedTicketId}
                setSelectedId={setSelectedTicketId}
            />
        </div>
     
    </>
  );
}
