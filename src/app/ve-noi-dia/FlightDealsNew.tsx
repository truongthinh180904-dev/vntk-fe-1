// FlightDeals.tsx
"use client";

import { Plane, Rocket } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import FlightDealLink from "../components/flightlink/FlightDealLink";
import banner from "../assets/img/domestic/banner-hero-1.jpg";
import { gsap } from "gsap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  price: number;
  originalPrice: number;
  img: string;
}

interface FlightDealsProps {
  flights: Flight[];
  title: string;
}

const FlightDealsNew: React.FC<FlightDealsProps> = ({ flights, title }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string>("Tất cả");
  const [loading, setLoading] = useState(true);

  const cities = ["Tất cả", "TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế"];

  // ✅ Lọc flights theo tab
  const filteredFlights =
    selectedCity === "Tất cả"
      ? flights
      : flights.filter((f) => f.to === selectedCity);

  // --- PHÂN TRANG ---
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFlights = filteredFlights.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Khi đổi tab thì reset trang & loading ---
  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCity]);

  // --- Loading khi lần đầu load trang ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

 // --- GSAP animation cho card khi load xong --- 
useLayoutEffect(() => {
  if (!loading && cardsRef.current.length > 0) {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8, // chậm, mượt
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 80%", // chạy khi section vào 80% viewport
            toggleActions: "play none none none", // chỉ chạy 1 lần
          },
        }
      );
    }, sliderRef);

    return () => ctx.revert();
  }
}, [loading, selectedCity, currentPage]);


  // --- Reset refs khi flights đổi ---
  useEffect(() => {
    cardsRef.current = [];
  }, [currentFlights]);

  return (
    <div
      className="container-fluid"
      style={{
        padding: "18px",
        background:
          "radial-gradient(ellipse 30% 26% at 80% 0, rgba(255, 233, 236, 0.6), transparent), radial-gradient(ellipse 30% 26% at bottom left, rgba(255, 233, 236, 0.6), transparent), #fcf9f6",
      }}
    >
      <div className="container">
        {/* --- Tiêu đề --- */}
        <h1 className="fw-bold promo-header">
          <Rocket
            style={{ marginRight: "6px" }}
            size={35}
            color="#2d4f85"
            className="mb-1"
          />
          Vé nội địa nhiều ưu đãi nhất 
        </h1>

        {/* --- Tabs chọn thành phố --- */}
        <div className="overflow-auto">
          <div
            className="city-buttons-container"
            style={{ marginTop: "5px", marginBottom: "22px" }}
          >
            {cities.map((city) => (
              <button
                key={city}
                className={`city-button ${
                  selectedCity === city ? "city-button--active" : ""
                }`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* --- Cards --- */}
        <div
          ref={sliderRef}
          className="row flex-md-wrap flex-nowrap overflow-auto"
          style={{
            paddingBottom: "20px",
            scrollSnapType: "x mandatory",
            overflowY: "hidden",
            msOverflowStyle: "none",
          }}
        >
          {/* --- Skeleton khi loading --- */}
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="col-md-3 col-10 mb-4">
                  <Skeleton height={200} borderRadius={8} />
                  <Skeleton count={3} style={{ marginTop: "10px" }} />
                </div>
              ))
          ) : currentFlights.length > 0 ? (
            currentFlights.map((flight, index) => (
              <div
                key={flight.id}
                className="col-md-3 col-10 mb-4"
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <div
                  className="card shadow-sm h-100 border-0"
                  style={{ borderRadius: "6px" }}
                >
               

                  {/* Ảnh */}
                  <div className="image-container-4-card" style={{ overflow: "hidden" }}>
                    <img
                      src={flight.img}
                      className="card-img-top h-100 object-fit-cover"
                      alt={`vé máy bay từ ${flight.from} đến ${flight.to}`}
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="card-body">
                    <h6
                      className="card-title fw-bold mb-1"
                      style={{ color: "#2D4271", fontSize: "18px" }}
                    >
                      {flight.from} - {flight.to}
                    </h6>

                    <div className="mt-2">
                      <div className="d-flex align-items-center mb-2">
                        <div
                          className="px-2 py-1 rounded d-flex align-items-center"
                          style={{
                            backgroundColor: "rgba(51, 197, 255, 0.15)",
                            fontSize: "0.75rem",
                          }}
                        >
                          <Plane size={17} color="#4DAAF6" />
                          <span className="ms-1 text-primary fw-semibold">
                            9.0
                          </span>
                        </div>
                        <span
                          className="ms-2"
                          style={{ fontSize: "0.8rem", color: "#666" }}
                        >
                          Tuyệt vời (20 lượt đánh giá)
                        </span>
                      </div>

                      <div className="small mb-2">
                        <div className="card-text mb-1  d-flex align-items-center gap-1">
                          <span
                           style={{ fontSize: "1rem", color: "#666" }}
                          >
                            Vé máy bay từ {flight.from} đến {flight.to} {" "}
                             <span
                           style={{fontWeight:"bold" ,fontSize: "1rem", color: "rgb(29, 120, 247)" }}
                          >{flight.date}</span>
                          </span>
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
                          <button
                            style={{ width: "96px" }}
                            className="btn p-2 fw-bold btn-primary btn-sm"
                          >
                            Xem ngay
                          </button>
                        </FlightDealLink>

                        <div>
                          <div className="text-decoration-line-through text-muted small">
                            {flight.originalPrice?.toLocaleString("vi-VN") ||
                              "—"}{" "}
                            ₫
                          </div>
                          <div
                            className="fw-bold fs-5"
                            style={{ color: "rgb(24, 126, 208)" }}
                          >
                            {flight.price?.toLocaleString("vi-VN") ||
                              "Đang cập nhật"}{" "}
                            ₫
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">
              Không có chuyến bay nào cho điểm đến này.
            </p>
          )}

          {/* --- Card cuối cùng: banner --- */}
          {!loading && (
            <div className="col-md-3 col-10 mb-4">
              <div
                className="card h-100 position-relative border-0 shadow-sm text-center text-white"
                style={{
                  backgroundImage: `url(https://media.vietnam-tickets.com/img/upload/banner-hero-1.d40d310d.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
                ></div>
                <div className="card-body position-relative d-flex flex-column justify-content-center align-items-center text-center transition-all">
                  <h6
                    className="fw-semibold mb-3"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.6",
                      maxWidth: "90%",
                    }}
                  >
                    Khám phá nhiều ưu đãi hấp dẫn cho các chuyến bay nội địa tại
                    {" "}
                  </h6>

                  <Link href="/khuyen-mai" passHref>
                    <button
                      className="fw-bold"
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#007bff",
                        border: "none",
                        padding: "10px 30px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(255, 255, 255, 0.3)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        outline: "none",
                        display: "inline-block" // Đảm bảo button hiển thị chuẩn trong Link
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.backgroundColor = "#ffffff";
                      }}
                    >
                      Khám Phá Ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightDealsNew;
