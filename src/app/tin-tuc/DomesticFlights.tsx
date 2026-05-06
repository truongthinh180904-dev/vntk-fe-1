"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demodanangImg from '../assets/img/home/vemaybaynoidia/danang.webp';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';
import danangImg from "../assets/img/domestic/da-nang.webp";
import hueImg from "../assets/img/domestic/hue.jpg";
import dalatImg from "../assets/img/country_img/ve-may-bay-di-da-lat.jpg";
import phuquocImg from "../assets/img/domestic/phu-quoc.jpg";
import hoatiet from "../assets/img/home/hoatiet1.png"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import gsap from "gsap"; // ⚡ thêm ở đầu file
import {
  CalendarCheck,
  PlaneTakeoff,
  Star,
  Clock,
  Plane,
} from "lucide-react";
import FlightDealLink from "../components/flightlink/FlightDealLink";

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

// 🔥 Data mẫu (thêm country để phân loại)
// Hàm sinh ngày có định dạng "T3, 22 Thg10"
function getDynamicDate(offsetDays: number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;
  return `${dayName}, ${date} Thg ${month}`;
}
const flights = [
  // --- ĐẾN HÀ NỘI ---
  {
    id: 1,
    from: "TP. Hồ Chí Minh",
    to: "Hà Nội",
    date: getDynamicDate(2),
    discount: 25,
    oldPrice: 1500000,
    newPrice: 1130000,
    rating: 9.2,
    reviews: 230,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-ha-noi.jpg",
  },
  {
    id: 2,
    from: "Vinh",
    to: "Hà Nội",
    date: getDynamicDate(3),
    discount: 20,
    oldPrice: 1400000,
    newPrice: 1050000,
    rating: 9.0,
    reviews: 180,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-vinh-ha-noi-1024x640.jpg", // Mảng a không có chặng Nha Trang -> Hà Nội
  },
  {
    id: 3,
    from: "Đà Nẵng",
    to: "Hà Nội",
    date: getDynamicDate(4),
    discount: 24,
    oldPrice: 1150000,
    newPrice: 870000,
    rating: 9.3,
    reviews: 210,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-hai-phong-1024x640.jpg",
  },
  {
    id: 4,
    from: "Huế",
    to: "Hà Nội",
    date: getDynamicDate(5),
    discount: 22,
    oldPrice: 1250000,
    newPrice: 950000,
    rating: 9.1,
    reviews: 198,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-hue-ha-noi-1024x640.jpg",
  },

  // --- ĐẾN ĐÀ NẴNG ---
  {
    id: 5,
    from: "TP. Hồ Chí Minh",
    to: "Đà Nẵng",
    date: getDynamicDate(6),
    discount: 21,
    oldPrice: 1200000,
    newPrice: 940000,
    rating: 9.5,
    reviews: 260,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-da-nang-1024x614.jpg",
  },
  {
    id: 6,
    from: "Hà Nội",
    to: "Đà Nẵng",
    date: getDynamicDate(7),
    discount: 22,
    oldPrice: 1250000,
    newPrice: 970000,
    rating: 9.4,
    reviews: 245,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-da-nang-1-1024x640.jpg",
  },
  {
    id: 7,
    from: "Huế",
    to: "Đà Nẵng",
    date: getDynamicDate(8),
    discount: 21,
    oldPrice: 850000,
    newPrice: 670000,
    rating: 9.0,
    reviews: 115,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-da-nang-1024x640.jpg",
  },
  {
    id: 8,
    from: "Phú Quốc",
    to: "Đà Nẵng",
    date: getDynamicDate(9),
    discount: 20,
    oldPrice: 1100000,
    newPrice: 880000,
    rating: 9.3,
    reviews: 195,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-phu-quoc-da-nang-1024x640.jpg", 
  },

  // --- ĐẾN HUẾ ---
  {
    id: 9,
    from: "TP. Hồ Chí Minh",
    to: "Huế",
    date: getDynamicDate(10),
    discount: 24,
    oldPrice: 1300000,
    newPrice: 990000,
    rating: 9.4,
    reviews: 220,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-hue-1024x640.jpg",
  },
  {
    id: 10,
    from: "Hà Nội",
    to: "Huế",
    date: getDynamicDate(11),
    discount: 22,
    oldPrice: 1150000,
    newPrice: 890000,
    rating: 9.0,
    reviews: 160,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-hue.jpg",
  },
  {
    id: 11,
    from: "Đà Nẵng",
    to: "Huế",
    date: getDynamicDate(12),
    discount: 18,
    oldPrice: 850000,
    newPrice: 660000,
    rating: 8.9,
    reviews: 105,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-da-nang-1024x640.jpg",
  },
  {
    id: 12,
    from: "Cần Thơ",
    to: "Huế",
    date: getDynamicDate(13),
    discount: 22,
    oldPrice: 1350000,
    newPrice: 1050000,
    rating: 9.2,
    reviews: 175,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-can-tho-hue-1024x640.jpg", // Mảng a không có chặng Cần Thơ -> Huế
  },

  // --- ĐẾN PHÚ QUỐC ---
  {
    id: 13,
    from: "TP. Hồ Chí Minh",
    to: "Phú Quốc",
    date: getDynamicDate(14),
    discount: 25,
    oldPrice: 1050000,
    newPrice: 790000,
    rating: 9.6,
    reviews: 330,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/gia-ve-may-bay-sai-gon-phu-quoc-vietjet.jpg",
  },
  {
    id: 14,
    from: "Hà Nội",
    to: "Phú Quốc",
    date: getDynamicDate(15),
    discount: 21,
    oldPrice: 1750000,
    newPrice: 1380000,
    rating: 9.4,
    reviews: 310,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-phu-quoc-1024x640.jpg",
  },
  {
    id: 15,
    from: "Đà Nẵng",
    to: "Phú Quốc",
    date: getDynamicDate(16),
    discount: 23,
    oldPrice: 1450000,
    newPrice: 1120000,
    rating: 9.3,
    reviews: 185,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-di-phu-quoc-1024x640.jpg",
  },
  {
    id: 16,
    from: "Cần Thơ",
    to: "Phú Quốc",
    date: getDynamicDate(17),
    discount: 24,
    oldPrice: 950000,
    newPrice: 720000,
    rating: 9.5,
    reviews: 250,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-can-tho-phu-quoc-1.jpg",
  },

  // --- ĐẾN ĐÀ LẠT ---
  // --- ĐẾN TP. HỒ CHÍ MINH ---
  {
    id: 17,
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    date: getDynamicDate(18),
    discount: 21,
    oldPrice: 1100000,
    newPrice: 820000,
    rating: 9.3,
    reviews: 195,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-sai-gon.jpg",
  },
  {
    id: 18,
    from: "Huế",
    to: "TP. Hồ Chí Minh",
    date: getDynamicDate(19),
    discount: 22,
    oldPrice: 1700000,
    newPrice: 1340000,
    rating: 9.2,
    reviews: 260,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-sai-gon-1024x640.jpg",
  },
  {
    id: 19,
    from: "Vinh",
    to: "TP. Hồ Chí Minh",
    date: getDynamicDate(20),
    discount: 23,
    oldPrice: 1250000,
    newPrice: 960000,
    rating: 9.0,
    reviews: 188,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-vinh-sai-gon-1024x640.jpg",
  },
  {
    id: 20,
    from: "Cần Thơ",
    to: "TP. Hồ Chí Minh",
    date: getDynamicDate(21),
    discount: 22,
    oldPrice: 1150000,
    newPrice: 880000,
    rating: 9.1,
    reviews: 204,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-can-tho-1024x640.jpg", 
  },

];



function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function PopularFlights() {

 const countries = [
  "Hà Nội",
  "Đà Nẵng",
  "Huế",
  "Phú Quốc",
  "Đà Lạt",
];
  const [selectedCountry, setSelectedCountry] = useState<string>("Hà Nội");
  const [loading, setLoading] = useState(true);
// 🔁 Lọc chuyến bay theo quốc gia
  const filteredFlights = flights.filter(
    (flight) => flight.to === selectedCountry
  );

  // ✅ Hàm giả lập loading (2 giây)
  const triggerLoading = () => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  };

  // 🟢 Chạy lần đầu khi component mount
  useEffect(() => {
    triggerLoading();
  }, []);

  // 🟢 Khi đổi quốc gia → load lại skeleton
  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    triggerLoading();
  };

  return (
   <div className="news-all container-fluid p-2 position-relative">
     <section 
      className=" my-4 " 
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
       <h1 className="fw-bold mb-4 text-uppercase text-dark">
          Chuyến bay nội địa giá tốt
        </h1>

      {/* Destination Tags */}
     <div
        className="d-flex justify-content-start flex-nowrap gap-3 mb-4 overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {countries.map((country) => (
          <span
            key={country}
            className="px-3 py-2 rounded-pill flex-shrink-0"
            style={{
              backgroundColor:
                selectedCountry === country ? "rgb(7, 112, 205)" : "#E2E8F0",
              color: selectedCountry === country ? "white" : "#4A5568",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onClick={() => handleSelectCountry(country)}
          >
            {country}
          </span>
        ))}
      </div>


      {/* Flights */}
    <div className="row g-4 d-none d-md-flex">
      {loading ? (
        // 🩶 Khi loading -> hiển thị skeleton 4 card giả
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="p-2 col-md-6 col-lg-3">
              <div
                className="shadow-sm position-relative"
                style={{
                  height: "320px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  padding: "12px",
                }}
              >
                <Skeleton height={160} borderRadius={10} />
                <div className="mt-3">
                  <Skeleton width={`60%`} height={20} />
                  <Skeleton width={`40%`} height={20} />
                </div>
                <div className="mt-3">
                  <Skeleton width={`80%`} height={20} />
                  <Skeleton height={35} borderRadius={8} />
                </div>
              </div>
            </div>
          ))
      ) : filteredFlights.length > 0 ? (
        filteredFlights.map((flight: any) => (
          <div key={flight.id} className="p-2 col-md-6 col-lg-3">
            <div
              className="shadow-sm position-relative"
              style={{
                height: "320px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s ease",
              }}
            >
              {/* Ảnh nền */}
              <div
                style={{
                  height: "160px",
                  backgroundImage: `url(${flight.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                {/* <div
                  className="position-absolute top-0 start-0 px-2 py-1 fw-bold"
                  style={{
                    backgroundColor: "rgba(231, 76, 60, 0.9)",
                    color: "#fff",
                    borderBottomRightRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  -{flight.discount}%
                </div> */}
              </div>

              {/* Nội dung */}
              <div className="position-relative mx-3">
                <div
                  style={{
                    backgroundColor: "#F7FAFC",
                    height: "40px",
                    borderRadius: "0 0 10px 10px",
                  }}
                ></div>

                <div
                  className="position-absolute top-0 start-0 end-0"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "15px",
                    transform: "translateY(-5%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Route info */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="fw-bold" style={{ color: "#2D3748", fontSize: "14px" }}>
                        {flight.from}
                      </span>
                      <PlaneTakeoff size={16} color="#4A5568" />
                      <span className="fw-bold" style={{ color: "#2D3748", fontSize: "14px" }}>
                        {flight.to}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <CalendarCheck size={16} color="#4299E1" className="me-1" />
                        <span style={{ color: "#4A5568", fontSize: "14px" }}>{flight.date}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Star size={14} fill="#F6AD55" color="#F6AD55" className="me-1" />
                        <span style={{ color: "#4A5568", fontSize: "14px" }}>{flight.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Giá */}
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
                <FlightDealLink
                from={flight.from}
                to={flight.to}
                price={flight.newPrice}
                tripType="mot-chieu"
                dateRange={flight.date}
                data-loader
                >
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
                  </FlightDealLink>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">Không có chuyến bay cho {selectedCountry}</p>
      )}
    </div>
      <div
  className="row g-4  d-flex d-md-none flex-md-wrap flex-nowrap overflow-x-auto"
  style={{
    WebkitOverflowScrolling: "touch",
    scrollSnapType: "x mandatory",
  }}
>
  {filteredFlights.length > 0 ? (
    filteredFlights.map((flight) => (
      <div
        key={flight.id}
        className="p-2 col-md-6 col-lg-3 flex-shrink-0"
        style={{
          width: "85%", // Hiển thị khoảng 1.5 khối trên mobile
          maxWidth: "320px",
          scrollSnapAlign: "start",
        }}
      >
        <div
          className="shadow-sm position-relative"
          style={{
            height: "320px",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#f8f9fa",
            transition: "transform 0.3s ease",
          }}
        >
          {/* === ẢNH NỀN === */}
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

          {/* === KHỐI NỘI DUNG === */}
          <div className="position-relative mx-3" style={{ marginTop: "-5px", zIndex: 2 }}>
            <div
              style={{
                backgroundColor: "#F7FAFC",
                height: "40px",
                borderRadius: "0 0 10px 10px",
              }}
            ></div>

            <div
              className="position-absolute top-0 start-0 end-0"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "15px",
                transform: "translateY(-5%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-bold" style={{ color: "#2D3748", fontSize: "14px" }}>
                    {flight.from}
                  </span>
                  <PlaneTakeoff size={16} color="#4A5568" />
                  <span className="fw-bold" style={{ color: "#2D3748", fontSize: "14px" }}>
                    {flight.to}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <CalendarCheck size={16} color="#4299E1" className="me-1" />
                    <span style={{ color: "#4A5568", fontSize: "14px" }}>{flight.date}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Star size={14} fill="#F6AD55" color="#F6AD55" className="me-1" />
                    <span style={{ color: "#4A5568", fontSize: "14px" }}>{flight.rating}</span>
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
            <FlightDealLink
                  from={flight.from}
                  to={flight.to}
                  price={flight.newPrice}
                  tripType="mot-chieu"
                  dateRange={flight.date}
                  data-loader
                >
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
              </FlightDealLink>
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
