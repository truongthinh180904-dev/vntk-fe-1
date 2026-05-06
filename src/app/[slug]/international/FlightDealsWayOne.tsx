// FlightDeals.tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, Plane, PlaneTakeoff, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FlightDealLink from "../../components/flightlink/venoidia/FlightDealLinkOne";


interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  price: number;
  originalPrice:number;
  description:string;
  img: string;
}

interface FlightDealsProps {
  flights: Flight[];
}

const FlightDeals: React.FC<FlightDealsProps> = ({ flights }) => {
  
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // ✅ Quản lý tab được chọn
  const [selectedCity, setSelectedCity] = useState<string>("Tất cả");
  gsap.registerPlugin(ScrollTrigger);
  const cities = [
    "Tất cả",
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Huế",
    "Phú Quốc",
    "Nha Trang",
    "Quy Nhơn",
    "Phú Yên",
    "Hải Phòng",
    "Cần Thơ",
  ];

  // ✅ Lọc flights theo tab
  const filteredFlights =
    selectedCity === "Tất cả"
      ? flights
      : flights.filter((f) => f.to === selectedCity);
// --- PHÂN TRANG ---
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  useEffect(() => {
  setCurrentPage(1); // reset khi đổi tab
}, [selectedCity]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFlights = filteredFlights.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // Hiệu ứng khi scroll xuống
useEffect(() => {
  if (sliderRef.current) {
    gsap.fromTo(
      sliderRef.current.querySelectorAll(".ticket-card"),
      {y: 50 },
      {
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 80%", // chạy khi tới 80% màn hình
        },
      }
    );
  }
}, [currentFlights]); // chạy lại khi đổi trang
// Hiệu ứng khi đổi tab
useEffect(() => {
  if (sliderRef.current) {
    gsap.fromTo(
      sliderRef.current.querySelectorAll(".ticket-card"),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 }
    );
  }
}, [selectedCity]);

  return (
    <div className="container-fluid">
      <div className="container">
        <h1
        className="mb-4 mt-5 fw-bold  title-responsive"
        style={{ color: "#2D4271" }}
      >
       <PlaneTakeoff  size={35} color="#2d4f85" /> Vé máy bay {flights[0].from} đi {flights[0].to}
      </h1>

     

      {/* Cards vé máy bay */}
      <div
        ref={sliderRef}
        className="row flex-md-wrap flex-nowrap overflow-auto"
        style={{ scrollSnapType: "x mandatory"}}
      >
        {currentFlights.length > 0 ? (
          currentFlights.map((flight) => (
            
         <div
              key={flight.id}
              className="col-md-3 col-10 mb-4"
              style={{ scrollSnapAlign: "start" }}
            >
            <FlightDealLink
              from={flight.from}
              to={flight.to}
              price={flight.price}
              tripType="mot-chieu"
              dateRange={flight.date}
            >
              <div className="ticket-card shadow-sm h-100">
                {/* Nội dung vé */}
                <div className="ticket-body">
                  <h6
                    className="fw-bold mb-2"
                    style={{ color: "#2D4271", fontSize: "17px" }}
                  >
                    {flight.from} - {flight.to}
                  </h6>

                  <div className="d-flex align-items-center mb-2">
                    <div
                      className="px-2 py-1 rounded d-flex align-items-center"
                      style={{
                        backgroundColor: "rgba(51, 197, 255, 0.15)",
                        fontSize: "0.75rem",
                      }}
                    >
                      <Plane size={17} color="#4DAAF6" />
                      <span className="ms-1 text-primary fw-semibold">9.0</span>
                    </div>
                    <span
                      className="ms-2"
                      style={{ fontSize: "0.8rem", color: "#666" }}
                    >
                      Tuyệt vời (20 lượt đánh giá)
                    </span>
                  </div>

                  <div
                    className="p-2 small mb-2"
                    style={{
                      backgroundColor: "#33C5FF1A",
                      color: "#4DAAF6",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ fontSize: "15px" }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <CalendarCheck size={17} color="#4DAAF6" />
                        {flight.date}
                      </span>
                      <span style={{ display: "flex", gap: "2px" }}>
                        <Star size={15} stroke="orange" fill="orange" />
                        <Star size={15} stroke="orange" fill="orange" />
                        <Star size={15} stroke="orange" fill="orange" />
                        <Star size={15} stroke="orange" fill="orange" />
                        <Star size={15} stroke="orange" fill="orange" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FlightDealLink>
          </div>       
          ))
        ) : (
          <p className="text-muted">Không có chuyến bay nào cho điểm đến này.</p>
        )}
      
      </div>
      </div>
         {/* {filteredFlights.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )} */}
    </div>
  );
};

export default FlightDeals;
