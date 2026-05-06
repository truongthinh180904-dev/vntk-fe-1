import { useState } from "react";
import BookingDetailModal from "./BookingDetailModal";
import "./TicketTable.css";
import HeaderBar from "./HeaderBar";
import { Plane, X , MapPin, Calendar, Clock,Car, Building, DoorOpen, PlaneTakeoff } from 'lucide-react';
import ViewHistoryList from "../dashboard/ViewHistoryList";
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

interface TicketTableProps {
  data: Ticket[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

export default function TicketTable({
  data,
  selectedId,
  setSelectedId,
}: TicketTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  // 🧠 Hàm mở modal giữ nguyên
  const handleOpenDetail = (id: number) => {
    const bookingsDetail = JSON.parse(localStorage.getItem("bookingsDetail") || "[]");
    const found = bookingsDetail.find((b: any) => b.id === id);
    if (found) {
      setSelectedBooking(found);
    } else {
      alert("Không tìm thấy chi tiết đơn này trong localStorage!");
    }
  };


  const handleClose = () => setSelectedBooking(null);
  // Hàm format date và time từ startDate và endDate
  const formatDateTime = (dateString: string) => {
  // Xử lý định dạng "23:55:00 30/10/2026"
  const [timePart, datePart] = dateString.split(' ');
  const [hours, minutes, seconds] = timePart.split(':');
  const [day, month, year] = datePart.split('/');
  
  // Tạo date object (month - 1 vì JavaScript month bắt đầu từ 0)
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds));
  
  return {
    date: date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' }),
    time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    weekday: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
    fullDate: date
  };
};

// Hàm tính duration giữa startDate và endDate
const calculateDuration = (startDate: string, endDate: string) => {
  const start = formatDateTime(startDate).fullDate;
  const end = formatDateTime(endDate).fullDate;
  const diffMs = end.getTime() - start.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

  return (
    <>
    <div className="tickets-desktop d-none d-md-block">
        <HeaderBar title={"Thông tin đơn hàng"} backLink={"/user/dashboard"} />

      <div className="ticket-card fade-in">
        <div className="table-responsive">
          <table className="table modern-table align-middle">
            <thead>
              <tr>
                <th>Ngày đặt</th>
                <th>Mã CB</th>
                <th>Hãng</th>
                <th>Khởi hành</th>
                <th>Điểm đến</th>
                <th>Giờ đi</th>
                <th>Giờ đến</th>
                <th>Chi tiết</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className={selectedId === ticket.id ? "row-selected" : ""}
                    onClick={() => setSelectedId(ticket.id)}
                  >
                    <td>{ticket.bookingDate}</td>
                    <td>VNTK{ticket.id}</td>
                    <td>{ticket.airlineName}</td>
                    <td>{ticket.departureCity}</td>
                    <td>{ticket.arrivalCity}</td>
                    <td>{ticket.startDate}</td>
                    <td>{ticket.endDate}</td>

                    <td className="text-center">
                      <div className="ticket-actions">
                        <button
                          className="btn-view"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(ticket.id);
                          }}
                        >
                          Xem vé
                        </button>

                        <span
                          className={`status-badge ${
                            ticket.status.includes("xác nhận")
                              ? "status-success"
                              : ticket.status.includes("Đang")
                              ? "status-warning"
                              : "status-default"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center text-muted py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
     <div className="tickets-mobile d-block d-md-none">
      <HeaderBar title={"Thông tin đơn hàng"} backLink={"/user/dashboard"} />

     <div className="tickets-mobile " style={{ margin: "0 auto" }}>
      {/* ====== UI1: Card hiển thị tuyến chặng (mobile) ====== */}
 

   <div className="mb-3 ">
      {data.map((ticket) => {
       const startDateTime = formatDateTime(ticket.startDate);
        const endDateTime = formatDateTime(ticket.endDate);
        const duration = calculateDuration(ticket.startDate, ticket.endDate);


    return (
    <div
      key={`route-${ticket.id}`}
      className={`ticket-route-card mb-3 p-3 rounded-4 border ${
        selectedId === ticket.id ? 'border-primary border-2' : 'border-light'
      }`}
      onClick={() => setSelectedId(selectedId === ticket.id ? null : ticket.id)}
      role="button"
    >
  {/* Airline Header */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div className="d-flex align-items-center">
      <div className="airline-icon rounded-circle me-2">
        <Plane size={16} className="text-white" />
      </div>
      <div>
        <div className="fw-bold text-dark">{ticket.airlineName || ticket.airline}</div>
        <div className="text-muted small">Flight {ticket.flightNumber}</div>
      </div>
    </div>
    <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
      <Clock size={14} className="me-1" />
      {duration}
    </div>
  </div>

  {/* Route Information */}
  <div className="d-flex justify-content-between align-items-center mb-3 position-relative py-2">
    {/* Bên trái - Điểm đi */}
    <div className="text-start z-2 bg-white ps-2">
      <div className="fw-bold fs-4 text-dark">{ticket.departure}</div>
      <div className="d-flex align-items-center text-muted small mt-1">
        <MapPin size={14} className="me-1" />
        {ticket.departureCity}
      </div>
    </div>

    {/* Phần giữa với dotted line và icon */}
    <div className="position-absolute start-0 end-0 d-flex justify-content-center z-1">
      <div className="bg-white p-2 position-relative z-3">
        <PlaneTakeoff size={28} className="text-primary" />
      </div>
    </div>

    {/* Bên phải - Điểm đến */}
    <div className="text-end z-2 bg-white pe-2">
      <div className="fw-bold fs-4 text-dark">{ticket.arrival}</div>
      <div className="d-flex align-items-center justify-content-end text-muted small mt-1">
        <MapPin size={14} className="me-1" />
        {ticket.arrivalCity}
      </div>
    </div>
  </div>

  {/* Date and Time - Hiển thị khi được chọn với hiệu ứng */}
  <div className={`date-time-section ${selectedId === ticket.id ? 'expanded' : 'collapsed'}`}>
    <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light">
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center text-muted small mb-1">
          <Calendar size={14} className="me-1" />
          Khởi hành
        </div>
        <div className="fw-bold text-dark">{startDateTime.weekday}, {startDateTime.date}</div>
        <div className="text-muted small">{startDateTime.time}</div>
      </div>
      
      <div className="vr mx-2" style={{ height: '40px' }}></div>
      
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center text-muted small mb-1">
          <Calendar size={14} className="me-1" />
          Đến nơi
        </div>
        <div className="fw-bold text-dark">{endDateTime.weekday}, {endDateTime.date}</div>
        <div className="text-muted small">{endDateTime.time}</div>
      </div>
    </div>
  </div>

  {/* Flight Details - Sử dụng dữ liệu thực tế từ API */}
  <div className={`flight-details-section`}>
    <div className="info-green d-flex justify-content-between text-white p-3 rounded-3"
      style={{ backgroundColor: '#1a237e' }}>
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center small mb-1 opacity-75">
        <Plane size={14} className="me-1" />
          Mã chuyến
        </div>
        <div className="fw-bold">VNTK{ticket.id}</div>
      </div>
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center small mb-1 opacity-75">
          <Building size={14} className="me-1" />
          Thao tác
        </div>
        <div className="fw-bold badge bg-white text-primary bg-opacity-100 px-3 py-2 rounded"
         onClick={(e) => {
                            e.stopPropagation(); // tránh trigger onClick row
                            handleOpenDetail(ticket.id); // mở modal chi tiết
                          }}>Xem thêm</div>
                  </div>
                  <div className="text-center">
                    <div className="d-flex align-items-center justify-content-center small mb-1 opacity-75">
                      <DoorOpen size={14} className="me-1" />
                      Trạng thái
                    </div>
                    <div className="fw-bold">{ticket.status}</div>
                  </div>
                </div>
              </div>
            </div>
        );
      })}
    </div>

      {/* ====== Modal chi tiết (mở khi selectedBooking != null) ====== */}
      {selectedBooking && (
        <div className="modal-backdrop-custom" onClick={handleClose}>
          <div
            className="ticket-detail-modal p-3 rounded-3"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "94%", maxWidth: 420 }}
          >
            <button className="btn-close-modal" onClick={handleClose}>
              <X />
            </button>

            <div className="text-center mb-2">
              <div className="fw-bold text-success">{selectedBooking.airlineName}</div>
              <div className="small text-muted">{selectedBooking.bookingCode}</div>
            </div>

            <div className="d-flex justify-content-between align-items-center my-2">
              <div>
                <div className="fw-bold fs-5">{selectedBooking.departureCityCode}</div>
                <div className="small text-muted">{selectedBooking.departureCity}</div>
              </div>

              <div>
                <Plane />
              </div>

              <div className="text-end">
                <div className="fw-bold fs-5">{selectedBooking.arrivalCityCode}</div>
                <div className="small text-muted">{selectedBooking.arrivalCity}</div>
              </div>
            </div>

            <div className="row g-2 my-2">
              <div className="col-6">
                <div className="small text-muted">Boarding</div>
                <div className="fw-bold">{selectedBooking.startDate}</div>
              </div>
              <div className="col-6 text-end">
                <div className="small text-muted">Arrival</div>
                <div className="fw-bold">{selectedBooking.endDate}</div>
              </div>
             </div>

            {/* Trạng thái (thay QR) */}
            <button className="btn btn-warning w-100 mt-3 fw-bold">
              {selectedBooking.status}
            </button>

            <div className="bg-success text-white rounded-3 px-3 py-2 mt-3 d-flex justify-content-between">
              <div>
                <div className="small">Seats</div>
                <div className="fw-bold">{selectedBooking.seat}</div>
              </div>

              <div>
                <div className="small">Terminal</div>
                <div className="fw-bold">{selectedBooking.terminal}</div>
              </div>

              <div>
                <div className="small">Gate</div>
                <div className="fw-bold">{selectedBooking.gate}</div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>

    {/* <ViewHistoryList /> */}

    </>
  );
}
