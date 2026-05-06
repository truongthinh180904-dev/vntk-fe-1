// FlightDeals.tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, Plane, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FlightDealLink from "../../components/flightlink/FlightDealLink";


interface Flight {
  id: number;
  from: string;
  to: string;
  country:string;
  date: string;
  price: number;
  originalPrice:number;
  img: string;
  
}

interface FlightDealsProps {
  flights: Flight[];
  title: string;
}

const FlightDealsInternational: React.FC<FlightDealsProps> = ({ flights, title }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // ✅ Quản lý tab được chọn
  const [selectedCity, setSelectedCity] = useState<string>("Tất cả");

  gsap.registerPlugin(ScrollTrigger);
  

 const countries = [
  "Tất cả",
  "Thái Lan",
  "Hàn Quốc",
  "Nhật Bản",
  "Trung Quốc",
  "Pháp",
  "Đức",
  "Anh",
  "Mỹ",
  "Úc",
  "Qatar",
  "Malaysia",
  "Singapore",
];

  // ✅ Lọc flights theo tab
  const filteredFlights =
    selectedCity === "Tất cả"
      ? flights
      : flights.filter((f) => f.country === selectedCity);
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

  useEffect(() => {
  if (sliderRef.current) {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".card", // tự động scope trong sliderRef
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
          },
        }
      );
    }, sliderRef);

    return () => ctx.revert(); // chỉ cleanup hiệu ứng trong component này
  }
}, [selectedCity, currentPage]);



  return (
   <> 
    <div className="container-fluid  pb-lg-2">
      <div className="container my-2" >
       <h1 className="fw-bold promo-header mb-3">
                <Plane size={35} color="#2d4f85" className="mb-1 me-2" />
                Khám phá {title} cùng VietNam Tickets
              </h1>
        {/* Cards vé máy bay */}
        <div
          ref={sliderRef}
          className="row flex-md-wrap flex-nowrap overflow-auto"
          style={{scrollSnapType: "x mandatory", overflowY: "hidden", msOverflowStyle: "none"}} 
        >
          {currentFlights.length > 0 ? (
            currentFlights.map((flight) => (
              <div
                key={flight.id}
                className="col-md-3 col-10 mb-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <div
                  className="card shadow-sm h-100 border-0"
                  style={{ borderRadius: "2px", }}
                >
                  {/* Label MỘT CHIỀU */}
                  <div className="ribbon_home">
                  <span>Vé đi {flight.to}</span>
                </div>

                  {/* Ảnh */}
                  <div style={{ height: "160px",  }}>
                    <img
                      src={flight.img}
                      className="card-img-top h-100 object-fit-cover"
                      alt={`vé máy bay từ ${flight.from} đến ${flight.to}`}
                      style={{ objectFit: "cover" }}
                      loading="lazy" 
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="card-body">
                    {/* Tuyến bay */}
                    <h6
                      className="card-title fw-bold mb-1"
                      style={{ color: "#2D4271", fontSize: "17px" }}
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
                          style={{ display: "flex", gap: "2px" }}
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
                                marginTop: "4px",
                              }}
                            >
                              {flight.date}
                            </span>
                            <span style={{ display: "flex", gap: "2px" }}>
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
                      <FlightDealLink
                        from={flight.from}
                        to={flight.to}
                        price={flight.price}
                        tripType="mot-chieu"
                        dateRange={flight.date}
                      >
                          <button style={{width:'96px'}} className="btn p-2 fw-bold btn-primary btn-sm">
                            Xem ngay
                          </button>
                      </FlightDealLink>
                      <div>
                          <div className="text-decoration-line-through text-muted small">
                          {typeof flight.originalPrice === "number"
                            ? flight.originalPrice.toLocaleString("vi-VN")
                            : flight.originalPrice
                            ? Number(flight.originalPrice).toLocaleString("vi-VN")
                            : "—"} ₫
                          </div>
                          <div
                            className="fw-bold fs-5"
                            style={{ color: "rgb(24, 126, 208)" }}
                          >
                          {typeof flight.price === "number"
                            ? flight.price.toLocaleString("vi-VN")
                            : flight.price
                            ? Number(flight.price).toLocaleString("vi-VN")
                            : "Đang cập nhật"} ₫
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter(
                    (page) =>
                      page === 1 || // trang đầu
                      page === totalPages || // trang cuối
                      (page >= currentPage - 2 && page <= currentPage + 2) // 5 trang quanh currentPage
                  )
                  .map((page, idx, arr) => {
                    const prevPage = arr[idx - 1];
                    const showDots = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showDots && (
                          <li className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        )}
                        <li
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      </React.Fragment>
                    );
                  })}
              </ul>
            </nav>
          </div>
        )} */}
      </div>
    </div>
   </>
  );
};

export default FlightDealsInternational;
