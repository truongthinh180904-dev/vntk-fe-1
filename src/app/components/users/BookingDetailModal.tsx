import React from "react";
import "./BookingDetailModal.css";

interface Flight {
  start_city: string;
  start_point: string;
  end_city: string;
  end_point: string;
  start_date: string;
  airline_name: string;
  flight_number: string;
}

interface FareItem {
  Route: string;
  ListFarePax: { PaxName: string; TotalFare: string }[];
}

interface DetailData {
  id?: number;
  guest_name?: string;
  guest_phone?: string;
  guest_email?: string;
  guest_address?: string;
  created_at?: string;
  flights?: Flight[];
  list_baggage?: { Route: string; Name: string; PassengerName: string; Price: number }[];
  list_service?: { Route: string; Name: string; PassengerName: string; Price: number }[];
  list_pre_seat?: { Route: string; Code: string; PassengerName: string; Price: number }[];
  list_fare?: FareItem[];
  total_fare?: string;
  baggage_price?: string;
  service_price?: string;
  seat_price?: string;
  total_price?: number;
}

interface Props {
  booking: DetailData;
  onClose: () => void;
}

const BookingDetailModal: React.FC<Props> = ({ booking, onClose }) => {
  if (!booking) return null;
  const detail = booking;
  const toNum = (v: any) =>
  Number(String(v ?? "0").replace(/[^\d.-]/g, "")); // bỏ ký tự không phải số
  return (
    <div className="modal-overlay">
      <div className="modal-dialog-custom">
        <div className="modal-content-custom">
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src="https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp"
              alt="Vietnam Tickets"
              className="modal-logo"
            />
          </div>

          <h2 className="modal-title">
            CHI TIẾT ĐƠN ĐẶT VÉ #VNTK{detail.id}
          </h2>

          {/* Thông tin khách */}
          <div className="customer-info">
            <p><b>Tên khách:</b> {detail.guest_name}</p>
            <p><b>SĐT:</b> {detail.guest_phone}</p>
            <p><b>Email:</b> {detail.guest_email}</p>
            <p><b>Địa chỉ:</b> {detail.guest_address}</p>
            <p><b>Ngày tạo:</b> {new Date(detail.created_at ?? "").toLocaleString("vi-VN")}</p>
          </div>

          {/* Chặng bay */}
          {detail.flights && detail.flights.length > 0 ? (
            detail.flights.map((flight, idx) => {
              const route = `${flight.start_point}-${flight.end_point}`;
              const routeBaggage = detail.list_baggage?.filter(b => b.Route === route) || [];
              const routeService = detail.list_service?.filter(s => s.Route === route) || [];
              const routeSeat = detail.list_pre_seat?.filter(seat => seat.Route === route) || [];
              const routeFare = detail.list_fare?.filter(f => f.Route === route) || [];

              return (
                <div key={idx} className="flight-section">
                  <h4 className="flight-title">
                    Chặng {idx + 1}: {flight.start_city} → {flight.end_city}
                  </h4>

                  <table className="table table-bordered text-sm mb-3">
                    <tbody>
                      <tr><th>Đi từ</th><td>{flight.start_city} ({flight.start_point})</td></tr>
                      <tr><th>Đến</th><td>{flight.end_city} ({flight.end_point})</td></tr>
                      <tr><th>Ngày giờ xuất phát</th><td>{new Date(flight.start_date).toLocaleString("vi-VN")}</td></tr>
                      <tr><th>Hãng hàng không</th><td>{flight.airline_name} ({flight.flight_number})</td></tr>
                    </tbody>
                  </table>

                  {/* Các mục chi tiết */}
                  <div className="sub-section">
                    <h5>Ghế ngồi</h5>
                    {routeSeat.length > 0 ? (
                      <ul>{routeSeat.map((s, i) => (
                        <li key={i}>{s.Code} - {s.PassengerName} ({s.Price.toLocaleString("vi-VN")} VND)</li>
                      ))}</ul>
                    ) : <p>Không có</p>}
                  </div>

                  <div className="sub-section">
                    <h5>Hành lý</h5>
                    {routeBaggage.length > 0 ? (
                      <ul>{routeBaggage.map((b, i) => (
                        <li key={i}>{b.Name} - {b.PassengerName} ({b.Price.toLocaleString("vi-VN")} VND)</li>
                      ))}</ul>
                    ) : <p>Không có</p>}
                  </div>

                  <div className="sub-section">
                    <h5>Dịch vụ</h5>
                    {routeService.length > 0 ? (
                      <ul>{routeService.map((s, i) => (
                        <li key={i}>{s.Name} - {s.PassengerName} ({s.Price.toLocaleString("vi-VN")} VND)</li>
                      ))}</ul>
                    ) : <p>Không có</p>}
                  </div>

                  <div className="sub-section">
                    <h5>Chi tiết vé</h5>
                    {routeFare.length > 0 ? (
                      <ul>{routeFare.map((fare, i) => (
                        <li key={i}>
                          {fare.ListFarePax.map((pax, j) => (
                            <div key={j}>
                              {pax.PaxName}: {Number(pax.TotalFare.replace(/,/g, "")).toLocaleString("vi-VN")} VND / vé
                            </div>
                          ))}
                        </li>
                      ))}</ul>
                    ) : <p>Không có</p>}
                  </div>
                </div>
              );
            })
          ) : (
            <p><em>Chưa có thông tin chuyến bay</em></p>
          )}

          {/* Tổng kết */}
          <div className="summary-section">
            <h4>Tổng kết</h4>
            <table className="table table-bordered text-sm">
              <tbody>
                <tr><th>Giá vé</th><td className="text-end">
                {(
                    toNum(detail.total_fare ?? detail.total_price) -
                    (toNum(detail.baggage_price) +
                      toNum(detail.service_price) +
                      toNum(detail.seat_price))
                  ).toLocaleString("vi-VN")}{" "}
                  VND

                  </td></tr>
                <tr><th>Phí hành lý</th><td className="text-end">{(detail.baggage_price ?? 0).toLocaleString("vi-VN")} VND</td></tr>
                <tr><th>Phí dịch vụ</th><td className="text-end">{(detail.service_price ?? 0).toLocaleString("vi-VN")} VND</td></tr>
                <tr><th>Phí ghế ngồi</th><td className="text-end">{(detail.seat_price ?? 0).toLocaleString("vi-VN")} VND</td></tr>
                <tr className="fw-bold"><th>Tổng cộng</th><td className="text-end">{(detail.total_fare ?? detail.total_price ?? 0).toLocaleString("vi-VN")} VND</td></tr>
              </tbody>
            </table>
          </div>

          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
