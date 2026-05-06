"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import singapore from "../../assets/img/home/chuyenbayphobien/ve-may-bay-di-singapore-vietjet-air.jpg";
import hanquoc from "../../assets/img/home/chuyenbayphobien/ve-may-bay-di-han-quoc_1.jpg";
import nhatban from "../../assets/img/home/chuyenbayphobien/cau-hoi-lien-quan-ve-di-nhat-ban.jpg";
import my from "../../assets/img/home/chuyenbayphobien/ve-may-bay-di-my-hang-vietnam-airlines.jpg";
import canada from "../../assets/img/home/chuyenbayphobien/ve-may-bay-di-canada.jpg";
import trungquoc from "../../assets/img/home/chuyenbayphobien/ve-may-bay-di-trung-quoc-hang-eva-air (5).jpg";
import thailan from "../../assets/img/home/chuyenbayphobien/ve-may-bay-di-thai-lan-vietnam-airlines.jpg";
import hoatiet from "../../assets/img/home/hoatiet1.png";
import {
  CalendarCheck,
  PlaneTakeoff,
  Star,
  Clock,
  Plane,
} from "lucide-react";
import FlightDealLink from "../flightlink/FlightDealLink";

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

// 🔥 Data mẫu (thêm country để phân loại)
// Dữ liệu chuyến bay
const flights: Flight[] = [
  // 🇺🇸 Mỹ
  {
    id: 1,
    from: "TP Hồ Chí Minh",
    to: "Los Angeles",
    discount: 25,
    oldPrice: 18500000,
    newPrice: 13900000,
    rating: 9.3,
    reviews: 210,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-tphcm-di-los-angeles-1024x640.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(0),
    country: "Mỹ",
  },
  {
    id: 2,
    from: "Hà Nội",
    to: "New York",
    discount: 22,
    oldPrice: 19900000,
    newPrice: 15400000,
    rating: 9.1,
    reviews: 165,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-new-york-1024x614.jpg",
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(1),
    country: "Mỹ",
  },
  {
    id: 3,
    from: "Hà Nội",
    to: "San Francisco",
    discount: 20,
    oldPrice: 18200000,
    newPrice: 14600000,
    rating: 9.5,
    reviews: 98,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-tu-ha-noi-di-san-francisco-1024x640.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(2),
    country: "Mỹ",
  },
  {
    id: 4,
    from: "Đà Nẵng",
    to: "Seattle",
    discount: 18,
    oldPrice: 17800000,
    newPrice: 14500000,
    rating: 9.0,
    reviews: 122,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-da-nang-seattle-1024x640.jpg",
    timeAgo: "Cập nhật 5 giờ trước",
    date: getDynamicDate(3),
    country: "Mỹ",
  },

  // 🇨🇦 Canada
  {
    id: 5,
    from: "Hà Nội",
    to: "Toronto",
    discount: 21,
    oldPrice: 17800000,
    newPrice: 14000000,
    rating: 9.4,
    reviews: 189,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-toronto-1024x640.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(4),
    country: "Canada",
  },
  {
    id: 6,
    from: "Tp HCM",
    to: "Vancouver",
    discount: 19,
    oldPrice: 18500000,
    newPrice: 15000000,
    rating: 9.2,
    reviews: 134,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-tphcm-di-vancouver-1024x614.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(5),
    country: "Canada",
  },
  {
    id: 7,
    from: "TP Hồ Chí Minh",
    to: "Montreal",
    discount: 23,
    oldPrice: 18200000,
    newPrice: 13990000,
    rating: 9.6,
    reviews: 92,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tphcm-di-montreal-1024x640.jpg",
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(6),
    country: "Canada",
  },
  {
    id: 8,
    from: "Hà Nội",
    to: "Calgary",
    discount: 20,
    oldPrice: 17500000,
    newPrice: 14000000,
    rating: 9.3,
    reviews: 88,
    image: canada.src,
    timeAgo: "Cập nhật 6 giờ trước",
    date: getDynamicDate(7),
    country: "Canada",
  },

  // 🇨🇳 Trung Quốc
  {
    id: 9,
    from: "TP Hồ Chí Minh",
    to: "Bắc Kinh",
    discount: 18,
    oldPrice: 7500000,
    newPrice: 6100000,
    rating: 9.1,
    reviews: 200,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-bac-kinh-768x480.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(8),
    country: "Trung Quốc",
  },
  {
    id: 10,
    from: "Hà Nội",
    to: "Thượng Hải",
    discount: 22,
    oldPrice: 7200000,
    newPrice: 5600000,
    rating: 9.0,
    reviews: 156,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/gia-ve-may-bay-tu-ha-noi-di-thuong-hai-1024x640.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(9),
    country: "Trung Quốc",
  },
  {
    id: 11,
    from: "TP HCM",
    to: "Quảng Châu",
    discount: 19,
    oldPrice: 6800000,
    newPrice: 5500000,
    rating: 9.4,
    reviews: 87,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/gia-ve-may-bay-tphcm-quang-chau-1024x640.jpg",
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(0),
    country: "Trung Quốc",
  },
  {
    id: 12,
    from: "Hà Nội",
    to: "Thâm Quyến",
    discount: 20,
    oldPrice: 7000000,
    newPrice: 5600000,
    rating: 9.3,
    reviews: 120,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-tham-quyen-1024x640.jpg",
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(1),
    country: "Trung Quốc",
  },

  // 🇹🇭 Thái Lan
  {
    id: 13,
    from: "TP Hồ Chí Minh",
    to: "Bangkok",
    discount: 17,
    oldPrice: 2761387,
    newPrice: 2200000,
    rating: 9.2,
    reviews: 320,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-bangkok-1024x640.jpg",
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(2),
    country: "Thái Lan",
  },
  {
    id: 14,
    from: "Đà Nẵng",
    to: "Phuket",
    discount: 19,
    oldPrice: 3500000,
    newPrice: 2800000,
    rating: 9.1,
    reviews: 152,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-da-nang-di-phuket-1024x640.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(3),
    country: "Thái Lan",
  },
  {
    id: 15,
    from: "Nha Trang",
    to: "Chiang Mai",
    discount: 18,
    oldPrice: 3400000,
    newPrice: 2700000,
    rating: 9.0,
    reviews: 110,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-nha-trang-chiang-mai-1024x640.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(4),
    country: "Thái Lan",
  },
  {
    id: 16,
    from: "Hà Nội",
    to: "Krabi",
    discount: 21,
    oldPrice: 3600000,
    newPrice: 2850000,
    rating: 9.5,
    reviews: 87,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-krabi-1024x640.jpg",
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(5),
    country: "Thái Lan",
  },

  // 🇸🇬 Singapore
  {
    id: 17,
    from: "TP Hồ Chí Minh",
    to: "Singapore",
    discount: 20,
    oldPrice: 7144697,
    newPrice: 3500000,
    rating: 9.8,
    reviews: 68,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-singapore-1024x640.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(6),
    country: "Singapore",
  },
  {
    id: 18,
    from: "Đà Nẵng",
    to: "Singapore",
    discount: 19,
    oldPrice: 7200000,
    newPrice: 3600000,
    rating: 9.7,
    reviews: 122,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-da-nang-singapore-1024x640.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(7),
    country: "Singapore",
  },
  {
    id: 19,
    from: "TP Hồ Chí Minh",
    to: "Sentosa",
    discount: 18,
    oldPrice: 7300000,
    newPrice: 3650000,
    rating: 9.5,
    reviews: 98,
    image: singapore.src,
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(8),
    country: "Singapore",
  },
  {
    id: 20,
    from: "Hà Nội",
    to: "Singapore",
    discount: 22,
    oldPrice: 7400000,
    newPrice: 3700000,
    rating: 9.6,
    reviews: 76,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-di-singapore-1024x640.jpg",
    timeAgo: "Cập nhật 5 giờ trước",
    date: getDynamicDate(9),
    country: "Singapore",
  },

  // 🇰🇷 Hàn Quốc
  {
    id: 21,
    from: "TP Hồ Chí Minh",
    to: "Seoul",
    discount: 19,
    oldPrice: 8200000,
    newPrice: 6500000,
    rating: 9.6,
    reviews: 210,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-seoul-1024x640.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(0),
    country: "Hàn Quốc",
  },
  {
    id: 22,
    from: "Hà Nội",
    to: "Busan",
    discount: 20,
    oldPrice: 8100000,
    newPrice: 6400000,
    rating: 9.4,
    reviews: 132,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-busan-1024x640.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(1),
    country: "Hàn Quốc",
  },
  {
    id: 23,
    from: "TP Hồ Chí Minh",
    to: "Jeju",
    discount: 22,
    oldPrice: 8500000,
    newPrice: 6600000,
    rating: 9.7,
    reviews: 98,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-jeju-1024x640.jpg",
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(2),
    country: "Hàn Quốc",
  },
  {
    id: 24,
    from: "Hà Nội",
    to: "Incheon",
    discount: 18,
    oldPrice: 8000000,
    newPrice: 6550000,
    rating: 9.3,
    reviews: 84,
    image: hanquoc.src,
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(3),
    country: "Hàn Quốc",
  },

  // 🇯🇵 Nhật Bản
  {
    id: 25,
    from: "TP Hồ Chí Minh",
    to: "Tokyo",
    discount: 20,
    oldPrice: 8800000,
    newPrice: 6900000,
    rating: 9.8,
    reviews: 110,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hcm-tokyo-1024x640.jpg",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(4),
    country: "Nhật Bản",
  },
  {
    id: 26,
    from: "Hà Nội",
    to: "Osaka",
    discount: 22,
    oldPrice: 8900000,
    newPrice: 7000000,
    rating: 9.6,
    reviews: 134,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-osaka-1024x640.jpg",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(5),
    country: "Nhật Bản",
  },
  {
    id: 27,
    from: "TP Hồ Chí Minh",
    to: "Fukuoka",
    discount: 19,
    oldPrice: 8700000,
    newPrice: 6950000,
    rating: 9.4,
    reviews: 90,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-fukuoka-1024x640.jpg",
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(6),
    country: "Nhật Bản",
  },
  {
    id: 28,
    from: "Hà Nội",
    to: "Nagoya",
    discount: 21,
    oldPrice: 8600000,
    newPrice: 6850000,
    rating: 9.5,
    reviews: 85,
    image: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-nagoya-1024x640.jpg",
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(7),
    country: "Nhật Bản",
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function PopularFlights() {
  const countries = ["Hàn Quốc", "Singapore", "Trung Quốc", "Thái Lan",  "Nhật Bản","Mỹ", "Canada"];

  // 🔥 State: quốc gia được chọn (mặc định = "Việt Nam")
  const [selectedCountry, setSelectedCountry] = useState<string>("Hàn Quốc");

  // 🔥 Lọc flights theo quốc gia
  const filteredFlights = flights.filter(
    (flight) => flight.country === selectedCountry
  );

  // 1. Tạo state và useEffect
const [isMobile, setIsMobile] = useState(false);

// 2. Check kích thước màn hình trong useEffect
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  
  // Check ngay khi component mount
  checkMobile();
  
  // Listen resize event
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);


    const [loading, setLoading] = useState(true);
    const [loadingdemo, setLoadingdemo] = useState(false);
    useEffect(() => {
      setTimeout(() => setLoading(false), 2500); // 1.5s giả lập loading
    }, []);
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
          Chuyến Bay Phổ Biến Nhất
          </h1>
      </div>

      {/* Destination Tags */}
    <div
      className="d-flex justify-content-start gap-3 mb-4"
      style={{
        flexWrap: isMobile ? "nowrap" : "wrap",
        overflowX: isMobile ? "auto" : "visible",
        whiteSpace: isMobile ? "nowrap" : "normal",
        paddingBottom: isMobile ? "6px" : "0",
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
          }}
          onClick={() => setSelectedCountry(country)}
        >
          {country}
        </span>
      ))}
    </div>

      {/* Flights */}
    <div
      className="row g-4"
      style={{
        flexWrap: isMobile ? "nowrap" : "wrap",
        overflowX: isMobile ? "auto" : "visible",
        whiteSpace: isMobile ? "nowrap" : "normal",
        paddingBottom: isMobile ? "6px" : "0",
      }}
    >
      {loading ? (
        // Hiển thị skeleton khi đang load
        Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-2 col-md-6 col-lg-3">
            <div
              className="skeleton-card"
              style={{
                height: "320px",
                borderRadius: "10px",
                background:
                  "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
                backgroundSize: "200% 100%",
                animation: "skeleton-loading 1.4s ease infinite",
              }}
            ></div>
          </div>
        ))
      ) : filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => (
          <div key={flight.id} className="p-2 col-md-6 col-lg-3"
          >
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: "5px", overflow: "hidden" }}
            >
              <div className="position-relative ">
                <Card.Img
                  variant="top"
                  src={flight.image}
                  alt={`${flight.from} - ${flight.to}`}
                  className="image-container-4-card"
                />
                <div className="position-absolute m-3" style={{ top: "65%", left: "0px" }}>
                  <span
                    className="badge d-none fw-bold px-3 py-2"
                    style={{
                      backgroundColor: "rgb(52 152 219 / 0.9)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    <Clock size={14} className="me-1" />
                    {flight.timeAgo}
                  </span>
                </div>
              </div>

              <Card.Body className="p-4 d-flex flex-column">
                {/* Flight Info */}
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold" style={{ color: "#2D3748", fontSize: "16px" }}>
                      {flight.from}
                    </span>
                    <PlaneTakeoff size={22} color="#4A5568" />
                    <span className="fw-bold" style={{ color: "#2D3748", fontSize: "16px" }}>
                      {flight.to}
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <CalendarCheck size={16} color="#4299E1" className="me-1" />
                      <span style={{ color: "#4A5568", fontSize: "14px" }}>
                        {flight.date}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Star size={14} fill="#F6AD55" color="#F6AD55" className="me-1" />
                      <span style={{ color: "#4A5568", fontSize: "14px" }}>
                        {flight.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-baseline mb-2">
                    <span style={{ fontSize: "13px", color: "#718096" }}>Giá từ</span>
                    <div>
                      <span
                        className="fw-bold"
                        style={{
                          color: "#E53E3E",
                          fontSize: "18px",
                          marginRight: "15px",
                        }}
                      >
                        {formatPrice(flight.newPrice)}
                      </span>
                      <span style={{ fontSize: "12px", color: "#718096" }}>Deal hot</span>
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
                      backgroundColor: "rgb(24, 115, 207)",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "15px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Đặt Vé Ngay 
                  </Button>
                  </FlightDealLink>
                </div>
              </Card.Body>
            </Card>
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
