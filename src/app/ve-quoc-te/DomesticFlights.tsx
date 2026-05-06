"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import banner_01 from "../assets/img/home/Ve-may-bay-di-Karratha.png";
import banner_02 from "../assets/img/home/Ve-may-bay-HL-ve-VN.png";
import banner_03 from "../assets/img/home/Ve-may-bay-HN-di-manila.png";
import banner_04 from "../assets/img/home/Ve-may-bay-di-kuala-lumpur.png";
import hoatiet from "../assets/img/home/hoatiet1.png"

import {
  CalendarCheck,
  PlaneTakeoff,
  Star,
  Clock,
  Plane,
} from "lucide-react";

interface Flight {
  id: number;
  from: string;
  to: string;
  discount: number;
  oldPrice: number;
  newPrice: number;
  rating: number;
  reviews: number;
  image: string;
  timeAgo: string;
  date: string;
  country: string; // 🔥 thêm để lọc theo quốc gia
}


function getDynamicDate(offsetDays:number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${dayName}, ${date} Thg ${month}`;
}

// 🔥 Data mẫu (thêm country để phân loại)
const flights: Flight[] = [
  {
    id: 1,
    from: "TP Hồ Chí Minh",
    to: "Hà Nội",
    discount: 25,
    oldPrice: 2400000,
    newPrice: 1790000,
    rating: 9.1,
    reviews: 210,
    image: banner_01.src,
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(1),
    country: "Việt Nam",
  },
  {
    id: 2,
    from: "TP Hồ Chí Minh",
    to: "Bangkok",
    discount: 18,
    oldPrice: 2700000,
    newPrice: 2200000,
    rating: 9.3,
    reviews: 320,
    image: banner_02.src,
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(2),
    country: "Thái Lan",
  },
  {
    id: 3,
    from: "TP Hồ Chí Minh",
    to: "Singapore",
    discount: 22,
    oldPrice: 4500000,
    newPrice: 3500000,
    rating: 9.7,
    reviews: 145,
    image: banner_03.src,
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(3),
    country: "Singapore",
  },
  {
    id: 4,
    from: "TP Hồ Chí Minh",
    to: "Seoul",
    discount: 20,
    oldPrice: 5600000,
    newPrice: 4500000,
    rating: 9.8,
    reviews: 198,
    image: banner_04.src,
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(4),
    country: "Hàn Quốc",
  },
  {
    id: 5,
    from: "TP Hồ Chí Minh",
    to: "Hà Nội",
    discount: 24,
    oldPrice: 2350000,
    newPrice: 1788000,
    rating: 9.0,
    reviews: 152,
    image: banner_01.src,
    timeAgo: "Cập nhật 5 giờ trước",
    date: getDynamicDate(5),
    country: "Việt Nam",
  },
  {
    id: 6,
    from: "TP Hồ Chí Minh",
    to: "Bangkok",
    discount: 19,
    oldPrice: 2720000,
    newPrice: 2200000,
    rating: 9.2,
    reviews: 320,
    image: banner_02.src,
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(6),
    country: "Thái Lan",
  },
  {
    id: 7,
    from: "TP Hồ Chí Minh",
    to: "Singapore",
    discount: 20,
    oldPrice: 4400000,
    newPrice: 3500000,
    rating: 9.8,
    reviews: 68,
    image: banner_03.src,
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(7),
    country: "Singapore",
  },
  {
    id: 8,
    from: "TP Hồ Chí Minh",
    to: "Seoul",
    discount: 21,
    oldPrice: 5700000,
    newPrice: 4500000,
    rating: 9.6,
    reviews: 210,
    image: banner_04.src,
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(8),
    country: "Hàn Quốc",
  },
  {
    id: 9,
    from: "TP Hồ Chí Minh",
    to: "Hà Nội",
    discount: 23,
    oldPrice: 2400000,
    newPrice: 1850000,
    rating: 9.0,
    reviews: 188,
    image: banner_01.src,
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(9),
    country: "Việt Nam",
  },
  {
    id: 10,
    from: "TP Hồ Chí Minh",
    to: "Bangkok",
    discount: 18,
    oldPrice: 2700000,
    newPrice: 2200000,
    rating: 9.3,
    reviews: 290,
    image: banner_02.src,
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(10),
    country: "Thái Lan",
  },
  {
    id: 11,
    from: "TP Hồ Chí Minh",
    to: "Singapore",
    discount: 21,
    oldPrice: 4600000,
    newPrice: 3600000,
    rating: 9.7,
    reviews: 130,
    image: banner_03.src,
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(11),
    country: "Singapore",
  },
  {
    id: 12,
    from: "TP Hồ Chí Minh",
    to: "Seoul",
    discount: 19,
    oldPrice: 5600000,
    newPrice: 4500000,
    rating: 9.8,
    reviews: 230,
    image: banner_04.src,
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(12),
    country: "Hàn Quốc",
  },
  {
    id: 13,
    from: "TP Hồ Chí Minh",
    to: "Hà Nội",
    discount: 26,
    oldPrice: 2500000,
    newPrice: 1850000,
    rating: 9.0,
    reviews: 160,
    image: banner_01.src,
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(13),
    country: "Việt Nam",
  },
  {
    id: 14,
    from: "TP Hồ Chí Minh",
    to: "Bangkok",
    discount: 20,
    oldPrice: 2800000,
    newPrice: 2240000,
    rating: 9.3,
    reviews: 320,
    image: banner_02.src,
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(14),
    country: "Thái Lan",
  },
  {
    id: 15,
    from: "TP Hồ Chí Minh",
    to: "Singapore",
    discount: 23,
    oldPrice: 4600000,
    newPrice: 3500000,
    rating: 9.8,
    reviews: 68,
    image: banner_03.src,
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(15),
    country: "Singapore",
  },
  {
    id: 16,
    from: "TP Hồ Chí Minh",
    to: "Seoul",
    discount: 20,
    oldPrice: 5600000,
    newPrice: 4500000,
    rating: 9.6,
    reviews: 210,
    image: banner_04.src,
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(16),
    country: "Hàn Quốc",
  },
];


function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function PopularFlights() {
  const countries = ["Việt Nam", "Thái Lan", "Singapore", "Hàn Quốc", "Nhật Bản"];

  // 🔥 State: quốc gia được chọn (mặc định = "Việt Nam")
  const [selectedCountry, setSelectedCountry] = useState<string>("Việt Nam");

  // 🔥 Lọc flights theo quốc gia
  const filteredFlights = flights.filter(
    (flight) => flight.country === selectedCountry
  );

  return (
   <div className="container-fluid p-2 position-relative">
     <section 
      className="container my-4 " 
      style={{ overflow: "hidden" }}
    >
      {/* Họa tiết trên góc phải */}
      <img 
        src={hoatiet.src}
        alt="Decor Top Right"
        className="position-absolute"
        style={{ 
          top: "-50px", 
          right: "0px", 
          width: "320px", 
          opacity: 0.8, 
          pointerEvents: "none" 
        }} 
      />

      {/* Họa tiết dưới góc trái */}
      <img 
        src={hoatiet.src}
        alt="Decor Bottom Left"
        className="position-absolute"
        style={{ 
          bottom: "-90px", 
          left: "-50px", 
          width: "280px", 
          opacity: 0.8, 
          pointerEvents: "none" 
        }} 
      />
      <div className="text-left">
        <h1 className="fw-bold  promo-header">
          <PlaneTakeoff  
          style={{ marginRight: "6px" }}
          size={35}
          color="#2d4f85"
          className="mb-3"/>
          Chuyến Bay Nội Địa Phổ Biến
          </h1>
      </div>

      {/* Destination Tags */}
      <div className="d-flex justify-content-left flex-wrap gap-3 mb-4">
        {countries.map((country) => (
          <span
            key={country}
            className="px-3 py-2 rounded-pill"
            style={{
              backgroundColor:
                selectedCountry === country ? "rgb(7, 112, 205)" : "#E2E8F0",
              color: selectedCountry === country ? "white" : "#4A5568",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onClick={() => setSelectedCountry(country)}
          >
            {country}
          </span>
        ))}
      </div>

      {/* Flights */}
      <div className="row g-4">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
          <div key={flight.id} className="p-2 col-md-6 col-lg-3">
            <div
              className="shadow-sm position-relative"
              style={{
                height:'320px',
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease",
              }}
            >
              {/* ẢNH NỀN */}
              <div
                style={{
                  height: "160px",
                  backgroundImage: `url(${flight.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  className="position-absolute top-0 start-0 px-2 py-1 fw-bold"
                  style={{
                    backgroundColor: "rgba(231, 76, 60, 0.9)",
                    color: "#fff",
                    borderBottomRightRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  -{flight.discount}%
                </div>

              </div>

              {/* KHỐI NỘI DUNG (trên nền trắng có shadow) */}
             <div className="position-relative mx-3" style={{ marginTop: "-5px", zIndex: 2 }}>
              {/* Phần nền màu phía dưới */}
              <div
                style={{
                  backgroundColor: "#F7FAFC", // màu nền dưới (xám nhạt)
                  height: "40px", // chiều cao nền dưới
                  borderRadius: "0 0 10px 10px",
                }}
              ></div>

              {/* Phần nổi phía trên */}
              <div
                className="position-absolute top-0 start-0 end-0"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "15px",
                  transform: "translateY(-5%)", // đẩy phần trắng trồi lên
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span
                        className="fw-bold"
                        style={{ color: "#2D3748", fontSize: "14px" }}
                      >
                        {flight.from}
                      </span>
                      <PlaneTakeoff size={16} color="#4A5568" />
                      <span
                        className="fw-bold"
                        style={{ color: "#2D3748", fontSize: "14px" }}
                      >
                        {flight.to}
                      </span>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <CalendarCheck
                          size={16}
                          color="#4299E1"
                          className="me-1"
                        />
                        <span style={{ color: "#4A5568", fontSize: "14px" }}>
                          {flight.date}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Star
                          size={14}
                          fill="#F6AD55"
                          color="#F6AD55"
                          className="me-1"
                        />
                        <span style={{ color: "#4A5568", fontSize: "14px" }}>
                          {flight.rating}
                        </span>
                      </div>
                    </div>
                  </div>


                <div className="d-flex justify-content-between align-items-baseline mb-2">
                  <span style={{ fontSize: "13px", color: "#718096" }}>Giá từ</span>
                  <div>
                    <span
                      className="fw-bold"
                      style={{
                        color: "#E53E3E",
                        fontSize: "18px",
                        marginRight: "8px",
                      }}
                    >
                      {formatPrice(flight.newPrice)}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#718096",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatPrice(flight.oldPrice)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-100 py-2 fw-bold"
                  style={{
                    backgroundColor: "#1873CF",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                  }}
                >
                  Đặt Ngay
                </Button>
              </div>
            </div>

            </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Không có chuyến bay cho {selectedCountry}</p>
        )}
      </div>
    </section>
   </div>
  );
}
