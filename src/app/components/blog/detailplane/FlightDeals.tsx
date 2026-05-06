// FlightDeals.tsx
import { CalendarCheck, Plane, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FlightDealLink from "../../flightlink/FlightDealLink";

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
  return (
    <div className="container my-4">
      <h1
        className="mb-4 mt-5 fw-bold  title-responsive"
        style={{ color: "#2D4271" }}
      >
       vé máy bay {flights[0].from} đi {flights[0].to}
      </h1>

      {/* Tabs danh sách điểm đến */}
      <div className="mb-4 d-none overflow-auto">
        <div className="d-flex flex-nowrap pb-2" style={{ gap: "8px" }}>
          {cities.map((city) => (
            <button
              key={city}
              className={`btn custom-btn ${
                selectedCity === city ? "active-btn" : ""
              }`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Cards vé máy bay */}
      <div
        ref={sliderRef}
        className="row flex-md-wrap flex-nowrap overflow-auto"
        style={{ scrollSnapType: "x mandatory" }}
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
              <div
                className="card shadow-sm h-100 border-0"
                style={{ borderRadius: "2px", overflow: "hidden" }}
              >
                {/* Label MỘT CHIỀU */}
                <div
                  className="position-absolute top-0 start-0 px-2 py-1 small fw-bold"
                  style={{
                    backgroundColor: "rgb(0, 124, 232)",
                    color: "white",
                    borderBottomRightRadius: "0px",
                    zIndex: 1,
                    fontSize: "12px",
                  }}
                >
                  {flight.description}
                </div>

                {/* Ảnh */}
                <div style={{ height: "160px", overflow: "hidden" }}>
                  <img
                    src={flight.img}
                    className="card-img-top h-100 object-fit-cover"
                    alt={`${flight.from} - ${flight.to}`}
                    loading="lazy" 
                  />
                </div>

                {/* Nội dung */}
                <div className="card-body">
                  {/* Tuyến bay */}
                  <h6
                    className="card-title fw-bold mb-1"
                    style={{ color: "#2D4271", fontSize: "18px" }}
                  >
                    {flight.from} - {flight.to}
                  </h6>

                  {/* Ngày + Giá + Nút */}
                  <div className="justify-content-between align-items-center mt-2">
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
                      className="p-1 small mb-2"
                      style={{
                        backgroundColor: "#33C5FF1A",
                        color: "#4DAAF6",
                      }}
                    >
                      <div
                        className="card-text mb-1 text-muted small"
                        style={{ display: "flex", gap: "4px" }}
                      >
                        <CalendarCheck size={17} color="#4DAAF6" style={{marginTop:'6px',marginLeft:'2px'}} />
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "15px",
                            margin: 0,
                          }}
                        >
                          <span
                            style={{
                              marginRight: "10px",
                              marginTop: "5px",
                            }}
                          >
                            {flight.date}
                          </span>
                          <span style={{ display: "flex", gap: "4px" }}>
                            <Star size={15} stroke="orange" fill="orange" />
                            <Star size={15} stroke="orange" fill="orange" />
                            <Star size={15} stroke="orange" fill="orange" />
                            <Star size={15} stroke="orange" fill="orange" />
                            <Star size={15} stroke="orange" fill="orange" />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                   
                      {/* <div>
                        <div className="text-decoration-line-through text-muted small">
                          {flight.originalPrice.toLocaleString("vi-VN")} ₫
                        </div>
                        <div
                          className="fw-bold fs-5"
                          style={{ color: "rgb(24, 126, 208)" }}
                        >
                          {flight.price.toLocaleString("vi-VN")} ₫
                        </div>
                      </div> */}
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
