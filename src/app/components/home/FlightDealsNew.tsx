// FlightDeals.tsx
"use client";

import { CalendarCheck, Plane, Star } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import FlightDealLink from "../flightlink/FlightDealLink";
import { HashLoader } from "react-spinners";
import tphcmImg from "../../assets/img/domestic/Tp-HCM.jpg";
import hanoiImg from "../../assets/img/domestic/hanoi.jpg";
import danangImg from "../../assets/img/domestic/da-nang.webp";
import hueImg from "../../assets/img/domestic/hue.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string>("Tất cả");
  const [loading, setLoading] = useState(false);

 
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Hàm sinh ngày có định dạng "T3, 22 Thg10"
function getDynamicDate(offsetDays:number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${dayName}, ${date} Thg ${month}`;
}
const flightsnew = [
  // ĐẾN HÀ NỘI
  { id: 1, from: "TP. Hồ Chí Minh", to: "Hà Nội", date: getDynamicDate(1), price: 1150000, originalPrice: 1450000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-ha-noi.jpg" },
  // ĐẾN TP. HỒ CHÍ MIN
  { id: 2, from: "Hà Nội", to: "TP. Hồ Chí Minh", date: getDynamicDate(2), price: 1150000, originalPrice: 1500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-sai-gon.jpg" },
  // ĐẾN ĐÀ NẴNG
  { id: 3, from: "TP. Hồ Chí Minh", to: "Đà Nẵng", date: getDynamicDate(3), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-da-nang-1024x614.jpg" },
  // ĐẾN HUẾ
  { id: 4, from: "Huế ", to: "Hà Nội", date: getDynamicDate(4), price: 980000, originalPrice: 1250000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-sai-gon-1024x640.jpg" },
];


  const cities = [
    "Tất cả",
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Huế",
  ];

  // ✅ Lọc flights theo tab
  const filteredFlights =
    selectedCity === "Tất cả"
      ? flightsnew
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

  // reset ref mỗi lần render lại flights
  useEffect(() => {
    cardsRef.current = [];


    
  }, [currentFlights]);

useLayoutEffect(() => {
  if (cardsRef.current.length === 0) return;

  const isMobile = window.innerWidth < 768; // <768px = mobile
  const ctx = gsap.context(() => {
    if (isMobile) {
      // 💡 Animation nhẹ cho mobile
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power1.out",
        }
      );
    } else {
      // 💡 Animation có ScrollTrigger cho PC
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, sliderRef);

  return () => ctx.revert();
}, [selectedCity, currentPage]);


   const handleSelectCountry = (city:any) => {
    setSelectedCity(city);
    setLoading(true);
    // Giả lập delay 1s để hiện spinner
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
  <div className="container-fluid" >
      <div className="container  ">
      {/* Tabs danh sách điểm đến */}
      {/* style={{backgroundImage: `url(${banner.src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"  }} */}
      <div className="overflow-auto ">
        <div className="city-buttons-container" style={{marginTop: "26px",marginBottom: "22px"}}>
          {cities.map((city) => (
            <button
              key={city}
              className={`city-button ${
                selectedCity === city ? "city-button--active" : ""
              }`}
              
              onClick={() => handleSelectCountry(city)}
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
        style={{
          paddingBottom: "20px",
          scrollSnapType: "x mandatory",
          overflowY: "hidden",
          msOverflowStyle: "none",
        }}
      >
        {loading ? (
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ minHeight: "220px" }}
          >
            <HashLoader color="#007bff" size={50} />
          </div>
        ) : currentFlights.length > 0 ? (
          currentFlights.map((flight, index) => (
            <div
              key={flight.id || index}
              className="col-md-3 col-10 mb-4"
              style={{ scrollSnapAlign: "start" }}
              ref={(el) => {
                if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
              }}
            >
              <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "8px" }}>
                {/* Label Deal Hot */}
                <div
                  className="position-absolute top-0 start-0 px-2 py-1 small fw-bold"
                  style={{
                    backgroundColor: "rgba(52, 152, 219, 0.9)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    borderBottomRightRadius: "8px",
                    zIndex: 1,
                  }}
                >
                  🔥 Deal Hot hôm nay
                </div>

                {/* Ảnh */}
                <div style={{ height: "160px", overflow: "hidden" }}>
                  <img
                    src={flight.img}
                    className="card-img-top h-100 w-100"
                    alt={`Vé máy bay từ ${flight.from} đến ${flight.to}`}
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

                  {/* Đánh giá + Ngày + Nút */}
                  <div className="justify-content-between align-items-center mt-2">
                    {/* Đánh giá */}
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
                      <span className="ms-2" style={{ fontSize: "0.8rem", color: "#666" }}>
                        Tuyệt vời (20 lượt đánh giá)
                      </span>
                    </div>

                    {/* Ngày và sao */}
                    <div
                      className="p-1 small mb-2"
                      style={{ backgroundColor: "#33C5FF1A", color: "#4DAAF6" }}
                    >
                      <div
                        className="card-text mb-1 text-muted small"
                        style={{ display: "flex", gap: "4px" }}
                      >
                        <CalendarCheck
                          size={17}
                          color="#4DAAF6"
                          style={{ marginTop: "6px", marginLeft: "2px" }}
                        />
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "15px",
                            margin: 0,
                            width: "100%",
                          }}
                        >
                          <span style={{ marginTop: "4px" }}>{flight.date}</span>
                          <span style={{ display: "flex", gap: "4px" }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={15} stroke="orange" fill="orange" />
                            ))}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Giá & Nút Xem ngay */}
                    <div className="d-flex justify-content-between align-items-end">
                      <FlightDealLink
                        from={flight.from}
                        to={flight.to}
                        price={flight.price}
                        tripType="mot-chieu"
                        dateRange={flight.date}
                        data-loader
                      >
                        <button data-loader className="btn p-2 fw-bold btn-primary btn-sm" style={{ width: "96px" }}>
                          Xem ngay
                        </button>
                      </FlightDealLink>

                      <div className="text-end">
                        <div className="text-decoration-line-through text-muted small">
                          {typeof flight.originalPrice === "number"
                            ? flight.originalPrice.toLocaleString("vi-VN")
                            : flight.originalPrice
                            ? Number(flight.originalPrice).toLocaleString("vi-VN")
                            : "—"}{" "}
                          ₫
                        </div>
                        <div className="fw-bold fs-5" style={{ color: "rgb(24, 126, 208)" }}>
                          {typeof flight.price === "number"
                            ? flight.price.toLocaleString("vi-VN")
                            : flight.price
                            ? Number(flight.price).toLocaleString("vi-VN")
                            : "Đang cập nhật"}{" "}
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
          <p className="text-muted">Không có chuyến bay nào cho điểm đến này.</p>
        )}
      </div>

    </div>
  </div>
  );
};

export default FlightDealsNew;
// 