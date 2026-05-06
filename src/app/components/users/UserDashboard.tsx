"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircleChevronRight,
  History,
  TicketCheck,
  Search,
  Menu,
  User,
  Mail,
  Phone,
  LogOut,
} from "lucide-react";
import logo from "../../assets/img/home/logo-vietnam-tickets.webp";
import "../../styles/users.css";

interface Ticket {
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
  const [activeTab, setActiveTab] = useState<"tickets" | "history" | "search">("tickets");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "https://media.vietnam-tickets.com/api/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("bookings");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    if (!user || !user.email) {
      setError("Vui lòng đăng nhập để xem thông tin đặt vé");
      setLoading(false);
      return;
    }

    if (bookings.length === 0) {
      setError("Không có dữ liệu bookings 1");
      setLoading(false);
      handleLogout();
      return;
    }

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
          id: flight.id,
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






  const renderTicketTable = (data: Ticket[]) => (
    <div className="table-responsive custom-table-responsive fade-in">
      <table className="table table-hover align-middle table-bordered custom-table">
        <thead className="table-light" style={{ whiteSpace: "nowrap" }}>
          <tr>
            <th>Ngày đặt vé</th>
            <th>Mã CB</th>
            <th>Hãng</th>
            <th>Khởi hành</th>
            <th>Điểm đến</th>
            <th>Giờ đi</th>
            <th>Giờ đến</th>
            <th>Hành lý</th>
            <th>Ghế ngồi</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((ticket) => (
              <tr
                key={ticket.id}
                className={selectedTicketId === ticket.id ? "table-primary" : ""}
                onClick={() => setSelectedTicketId(ticket.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{ticket.bookingDate}</td>
                <td>{ticket.flightNumber}</td>
                <td>{ticket.airlineName}</td>
                <td>
                  {ticket.departureCity} ({ticket.departure})
                </td>
                <td>
                  {ticket.arrivalCity} ({ticket.arrival})
                </td>
                <td>{ticket.startDate}</td>
                <td>{ticket.endDate}</td>
                <td>{ticket.baggages.join(", ") || "Không có"}</td>
                <td>{ticket.seats.join(", ") || "Không có"}</td>
                <td>
                  <span
                    className={`badge ${
                      ticket.status.includes("xác nhận")
                        ? "bg-success"
                        : ticket.status.includes("Chờ")
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center text-muted">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderSearchTab = () => {
    const filtered = searchInput
      ? [...tickets, ...history].filter((t) =>
          t.flightNumber.toLowerCase().includes(searchInput.toLowerCase())
        )
      : [];

    return (
      <div className="fade-in">
        <div className="mb-4">
          <div className="input-group search-box mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mã chuyến bay"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        {searchInput ? (
          renderTicketTable(filtered)
        ) : (
          <div className="text-center text-muted">Vui lòng nhập mã chuyến bay để tra cứu</div>
        )}
      </div>
    );
  };

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container-fluid dashboard-container">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-2 sidebar d-none d-md-block shadow-sm">
          <div className="text-center mb-4">
            <a href="/">
              <img src={logo.src} alt="Logo" className="sidebar-logo" />
            </a>
          </div>
          <ul className="nav flex-column sidebar-menu">
            <li>
              <button
                className={`sidebar-btn ${activeTab === "tickets" ? "active" : ""}`}
                onClick={() => setActiveTab("tickets")}
              >
                <TicketCheck size={18} /> Vé đã đặt
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                <History size={18} /> Lịch sử
              </button>
            </li>
            <li>
              <button
                className={`sidebar-btn ${activeTab === "search" ? "active" : ""}`}
                onClick={() => setActiveTab("search")}
              >
                <Search size={18} /> Tra cứu
              </button>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <div className="col-md-10 p-4 content-area">
          <div className="dashboard-header">
            <h4 className="dashboard-title">
              {activeTab === "tickets" ? (
                <>
                  <CircleChevronRight size={20} /> Vé đã đặt
                </>
              ) : activeTab === "history" ? (
                <>
                  <History size={20} /> Lịch sử đặt vé
                </>
              ) : (
                <>
                  <Search size={20} /> Tra cứu vé
                </>
              )}
            </h4>
            {user && (
              <div className="user-info">
                <span>
                  <User size={16} /> {user.name}
                </span>
                <span>
                  <Mail size={16} /> {user.email}
                </span>
                <span>
                  <Phone size={16} /> {user.phone}
                </span>
              </div>
            )}
            {/* <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              <LogOut size={16} /> Đăng xuất
            </button> */}
          </div>

          {activeTab === "tickets" && renderTicketTable(tickets)}
          {activeTab === "history" && renderTicketTable(history)}
          {activeTab === "search" && renderSearchTab()}
        </div>
      </div>
    </div>
  );
}
