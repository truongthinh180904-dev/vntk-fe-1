"use client";

import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import logovnal from "../assets/img/domestic/viet-nam-airlines-logo-circle.png";
import logovietjet from "../assets/img/domestic/vietjet-airlines-logo-circle.png";
import hoatiet from "../assets/img/home/hoatiet1.png"

import {
  CalendarCheck,
  Star,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
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
  timeAgo: string;
  airlineLogo:string;
  airlineName:string;
  date: string;
  country: string; // 🔥 thêm để lọc theo quốc gia
}

// 🔥 Data mẫu (thêm country để phân loại)
function getDynamicDate(offsetDays: number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${dayName}, ${date} Thg ${month}`;
}

const flights: Flight[] = [
  {
    id: 1,
    from: "TP Hồ Chí Minh",
    to: "Bangkok",
    discount: 15,
    oldPrice: 3600000,
    newPrice: 3060000,
    rating: 8.5,
    reviews: 87,
    airlineLogo: logovietjet.src,
    airlineName: "VietJet Airlines",
    timeAgo: "Cập nhật 2 giờ trước",
    date: getDynamicDate(2),
    country: "Việt Nam → Thái Lan",
  },
  {
    id: 2,
    from: "Hà Nội",
    to: "Singapore",
    discount: 18,
    oldPrice: 5200000,
    newPrice: 4260000,
    rating: 8.8,
    reviews: 104,
    airlineLogo: logovnal.src,
    airlineName: "Vietnam Airlines",
    timeAgo: "Cập nhật 5 giờ trước",
    date: getDynamicDate(5),
    country: "Việt Nam → Singapore",
  },
  {
    id: 3,
    from: "TP Hồ Chí Minh",
    to: "Seoul (Hàn Quốc)",
    discount: 22,
    oldPrice: 11500000,
    newPrice: 8970000,
    rating: 9.1,
    reviews: 132,
    airlineLogo: logovnal.src,
    airlineName: "Vietnam Airlines",
    timeAgo: "Cập nhật 3 giờ trước",
    date: getDynamicDate(9),
    country: "Việt Nam → Hàn Quốc",
  },
  {
    id: 4,
    from: "Hà Nội",
    to: "Tokyo (Nhật Bản)",
    discount: 17,
    oldPrice: 14200000,
    newPrice: 11786000,
    rating: 9.3,
    reviews: 76,
    airlineLogo: logovnal.src,
    airlineName: "Vietnam Airlines",
    timeAgo: "Cập nhật 1 giờ trước",
    date: getDynamicDate(12),
    country: "Việt Nam → Nhật Bản",
  },
  {
    id: 5,
    from: "TP Hồ Chí Minh",
    to: "Sydney (Úc)",
    discount: 25,
    oldPrice: 23800000,
    newPrice: 17850000,
    rating: 9.0,
    reviews: 64,
    airlineLogo: logovnal.src,
    airlineName: "Vietnam Airlines",
    timeAgo: "Cập nhật 4 giờ trước",
    date: getDynamicDate(15),
    country: "Việt Nam → Úc",
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function PopularFlights() {
  const [selectedCountry, setSelectedCountry] = useState("Việt Nam");
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Lọc chuyến bay theo quốc gia
  const filteredFlights = flights.filter((f) => f.country === selectedCountry);

  // ✅ Giới hạn trượt tối đa = tổng chuyến - số card hiển thị
  const maxIndex = Math.max(flights.length - 4, 0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  
  return (
   <div className="container-fluid position-relative">
     <section 
      className="container d-none d-md-block my-4 " 
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

      {/* Flights */}
     {/* ✅ SLIDER POPULAR FLIGHTS */}
      <div className="position-relative mt-4">
        <div
          className="d-flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease",
            width: `${flights.length * 20}%`, // tổng chiều rộng
            gap: "10px", // thêm dòng này
            paddingBottom:"5px",
            paddingTop:"5px"
       
          }}
          
        >
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div
                key={flight.id}
                style={{ flex: "0 0 25%", maxWidth: "25%" }}
              >
                <Card
                  className="h-100  shadow-sm border-0"
                  style={{
                    borderRadius: "5px",
                    overflow: "hidden",
                    backgroundColor: flight.id === 1 ? "aliceblue" : "white",
                  }}                >
                  <Card.Body className=" d-flex flex-column ">
                  <div className="mb-2">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      {/* Logo hãng hàng không bên trái */}
                      <div className="d-flex align-items-center">
                        <img
                          src={flight.airlineLogo}
                          alt={flight.airlineName}
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "contain",
                            marginRight: "10px",
                          }}
                        />
                        {/* Tên hãng hàng không */}
                        <h6 className="mb-0 fw-bold">{flight.airlineName}</h6>
                      </div>
                    </div>
                  </div>
                    <div className="mb-2">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="fw-bold"
                          style={{ color: "#2D3748", fontSize: "14px" }}
                        >
                          {flight.from}
                        </span>
                        <svg
                          fill="#2D3748"
                          width="16px"
                          height="16px"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M520 200c30.9 0 56 25.1 56 56s-25.1 56-56 56l-127.3 0-159.2 173.6c-6.1 6.6-14.6 10.4-23.6 10.4l-43.7 0c-10.9 0-18.6-10.7-15.2-21.1l54.3-162.9-99.7 0-52.8 66c-3 3.8-7.6 6-12.5 6l-19.8 0c-10.4 0-18-9.8-15.5-19.9L32 256 5 147.9C2.4 137.8 10.1 128 20.5 128l19.8 0c4.9 0 9.5 2.2 12.5 6l52.8 66 99.7 0-54.3-162.9C147.6 26.7 155.3 16 166.2 16l43.7 0c9 0 17.5 3.8 23.6 10.4L392.7 200 520 200z" />
                        </svg>
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

                    <div className="mt-auto">
                    <div className="d-flex align-items-center mb-2" style={{ gap: "15px" }}>
                    <span style={{ fontSize: "16px", color: "#718096" }}>Chỉ từ</span>

                    <span
                      className="fw-bold"
                      style={{
                        color: "rgb(3, 58, 176)",
                        fontSize: "18px",
                      }}
                    >
                      {formatPrice(flight.newPrice)}
                    </span>

                 
                  </div>
                  <FlightDealLink
                    from={flight.from}
                    to={flight.to}
                    price={flight.newPrice}
                    tripType="mot-chieu"
                    dateRange={flight.date}
                    airlines = {flight.airlineName=='Vietnam Airlines' ? 'VN' : flight.airlineName=='VietJet Airlines' ? 'VJ' :''}
                    data-loader
                    >
                    <a className="btn-view-more-link d-flex align-items-center">
                      Xem thêm <ChevronRight size={15} style={{ marginTop: "2px", marginLeft: "4px" }} />
                    </a>
                    </FlightDealLink>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-muted">Không có chuyến bay.</p>
          )}
        </div>

        {/* Nút điều hướng */}
        {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="btn p-2 btn-lights position-absolute"
          style={{
            top: "80%",
            left: "-15px",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // ✅ căn giữa icon
          }}
        >
          <span style={{ color: "#4299E1", fontSize: "20px" }}>
            <ArrowLeft className="mb-1" />
          </span>
        </button>

        )}
        <button
          onClick={nextSlide}
          className="btn btn-lights position-absolute"
          style={{
            top: "80%",
            right: "-20px",
            transform: "translateY(-50%)",
            width: "60px",
            height: "40px",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: "20px",color:"#4299E1" }}>
            <ArrowRight className="mb-1" />
            </span> 
        </button>
      </div>

    </section>

    <section 
      className="container d-block d-md-none my-4 " 
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

      {/* Flights */}
     {/* ✅ SLIDER POPULAR FLIGHTS */}
      <div className="position-relative mt-4">
       <div
        className="d-flex"   
        style={{
          gap: "10px",
          paddingBottom: "5px",
          paddingTop: "5px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        
        }}
      >
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div
                key={flight.id}
                style={{
                  flex: "0 0 75%",
                  scrollSnapAlign: "start",
                }}
              >
                <Card
                  className="h-100  shadow-sm border-0"
                  style={{
                    borderRadius: "5px",
                    overflow: "hidden",
                    backgroundColor: flight.id === 1 ? "aliceblue" : "white",
                  }}                >
                  <Card.Body className=" d-flex flex-column ">
                  <div className="mb-2">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      {/* Logo hãng hàng không bên trái */}
                      <div className="d-flex align-items-center">
                        <img
                          src={flight.airlineLogo}
                          alt={flight.airlineName}
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "contain",
                            marginRight: "10px",
                          }}
                        />
                        {/* Tên hãng hàng không */}
                        <h6 className="mb-0 fw-bold">{flight.airlineName}</h6>
                      </div>
                    </div>
                  </div>
                    <div className="mb-2">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="fw-bold"
                          style={{ color: "#2D3748", fontSize: "14px" }}
                        >
                          {flight.from}
                        </span>
                        <svg
                          fill="#2D3748"
                          width="16px"
                          height="16px"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M520 200c30.9 0 56 25.1 56 56s-25.1 56-56 56l-127.3 0-159.2 173.6c-6.1 6.6-14.6 10.4-23.6 10.4l-43.7 0c-10.9 0-18.6-10.7-15.2-21.1l54.3-162.9-99.7 0-52.8 66c-3 3.8-7.6 6-12.5 6l-19.8 0c-10.4 0-18-9.8-15.5-19.9L32 256 5 147.9C2.4 137.8 10.1 128 20.5 128l19.8 0c4.9 0 9.5 2.2 12.5 6l52.8 66 99.7 0-54.3-162.9C147.6 26.7 155.3 16 166.2 16l43.7 0c9 0 17.5 3.8 23.6 10.4L392.7 200 520 200z" />
                        </svg>
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

                    <div className="mt-auto">
                    <div className="d-flex align-items-center mb-2" style={{ gap: "15px" }}>
                    <span style={{ fontSize: "16px", color: "#718096" }}>Chỉ từ</span>

                    <span
                      className="fw-bold"
                      style={{
                        color: "rgb(3, 58, 176)",
                        fontSize: "18px",
                      }}
                    >
                      {formatPrice(flight.newPrice)}
                    </span>

                 
                  </div>
                  <FlightDealLink
                    from={flight.from}
                    to={flight.to}
                    price={flight.newPrice}
                    tripType="mot-chieu"
                    dateRange={flight.date}
                    airlines = {flight.airlineName=='Vietnam Airlines' ? 'VN' : flight.airlineName=='VietJet Airlines' ? 'VJ' :''}
                    data-loader
                    >
                    <a className="btn-view-more-link d-flex align-items-center">
                      Xem thêm <ChevronRight size={15} style={{ marginTop: "2px", marginLeft: "4px" }} />
                    </a>
                    </FlightDealLink>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-muted">Không có chuyến bay.</p>
          )}
        </div>
      </div>
    </section>
   </div>
  );
}
