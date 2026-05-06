"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, Plane, Star } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FlightDealLink from "../components/flightlink/FlightDealLink";
import Link from "next/link";


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
  "Anh",
  "Mỹ",
  "Pháp",
  "Đức",
  "Thái Lan",
  "Hàn Quốc",
  "Nhật Bản",
  "Trung Quốc",
  "Singapore",
];

  // ✅ Lọc flights theo tab
  const filteredFlights =
    selectedCity === "Tất cả"
      ? flights
      : flights.filter((f) => f.country === selectedCity);
// --- PHÂN TRANG ---
  const itemsPerPage = 3;
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
   <div className="container mt-5" id="productCollection">
     <h1 className="fw-bold promo-header mt-2  mb-3">
        <Plane size={35} color="#2d4f85" className="mb-1 me-2" />
        Vé máy bay quốc tế giá tốt nhất
      </h1>
      <div className="overflow-auto">
       <div className="country-buttons-container" style={{marginTop: "5px"}}>
          {countries.map((country) => (
            <button
              key={country}
              className={`country-button ${
                selectedCity === country ? "country-button--active" : ""
              }`}
              onClick={() => setSelectedCity(country)}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </div>
   <div className="container-fluid  pb-lg-2">
     <div className="container my-4" >

      {/* Cards vé máy bay */}
      <div
        ref={sliderRef}
        className="row flex-md-wrap flex-nowrap overflow-auto"
        style={{paddingBottom:"20px", scrollSnapType: "x mandatory", overflowY: "hidden", msOverflowStyle: "none"}} 
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
              
                {/* <div className="ribbon_home">
                <span>Vé máy bay quốc tế</span>
              </div> */}

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
                              marginTop: "4px",
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
          <div className="col-lg-3 col-md-12 mt-4 mt-lg-0">
            <div
              className="card border-0 shadow-sm  text-white text-center d-flex justify-content-center"
              style={{
                borderRadius: "5px",
                height: "350px",
                backgroundImage: `url(https://media.vietnam-tickets.com/img/upload/banner-hero-1.d40d310d.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  borderRadius: "6px",
                }}
              ></div>
              <div className="position-relative p-4">
                <h5 className="fw-semibold mb-3" style={{ lineHeight: "1.2" }}>
                  Khám phá nhiều ưu đãi hấp dẫn cho các chuyến bay quốc tế
                </h5>
                <Link href="/khuyen-mai" passHref>
                <button
                  className="fw-bold btn btn-primary px-4 py-2"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 3px 10px rgba(255,255,255,0.3)",
                  }}
                >
                  Khám Phá Ngay
                </button>
                </Link>
              </div>
            </div>
          </div>

      </div>
    </div>
   </div>
   </>
  );
};

export default FlightDealsInternational;
