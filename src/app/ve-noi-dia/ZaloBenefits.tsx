"use client";

import { Phone, Send, PlaneTakeoff } from "lucide-react";
import banner from "../assets/img/home/bgvenoidia.webp";
import countryimg from "../assets/img/domestic/country.png";
import ConSult from "../components/modals/ConSult";
import { useState } from "react";

export default function FlightBookingBanner() {
    const [showModal, setShowModal] = useState(false);




  return (
    <>
  <div
      className="position-relative text-center text-dark"
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", //  Thêm dòng này
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay mờ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />

      {/* Nội dung */}
      <div
          className="position-relative rounded-4 shadow p-4 px-md-5"
          style={{
            maxWidth: "750px",
            backgroundColor: "rgba(255,255,255,0.2)", // ✅ nền trắng mờ 20%
            backdropFilter: "blur(8px)",               // ✅ làm mờ nền phía sau cho dễ đọc chữ
            zIndex: 2,
          }}
        >
        <p className="mb-1 small"  style={{ color: "rgb(250 252 255)"}}>
          Đi đến bất kỳ nơi đâu trên toàn thế giới cùng
        </p>
        <h4 className="fw-bold text-uppercase mb-2" style={{ color: "rgb(250 252 255)" }}>
          DỊCH VỤ ĐẶT VÉ MÁY BAY UY TÍN  VIETNAM TICKETS
        </h4>

        <div className="d-flex justify-content-center gap-2 my-2">
          <img src={countryimg.src} alt="US" style={{height:"20px"}}/>
          <span className="fw-semibold small" style={{ color: "rgb(250 252 255)"}}>+100 quốc gia khác</span>
        </div>

        <p className="fw-semibold mb-4" style={{ color: "rgb(10 41 68)"}}>
          Cam kết hỗ trợ khách hàng 24/7 - Giá vé minh bạch - Thanh toán linh hoạt
        </p>
        <div
          className="d-flex flex-md-row justify-content-center align-items-center gap-3 flex-wrap flex-md-nowrap"
          style={{ width: "100%" }}
        >
          <a
            href="tel:19003173"
            className="btn fw-bold d-flex align-items-center justify-content-center flex-grow-1"
            style={{
              backgroundColor: "#e91e63",
              color: "white",
              minWidth: "150px",
              height: "48px",
            }}
          >
            <Phone size={18} className="me-2" />
            1900 3173
          </a>

          <button
            className="btn fw-bold d-flex align-items-center justify-content-center flex-grow-1"
            style={{
              backgroundColor: "#0d47a1",
              color: "white",
              border: "none",
              minWidth: "150px",
              height: "48px",
            }}
              onClick={() => setShowModal(true)} // 👉 mở modal
          >
            <PlaneTakeoff size={18} className="me-2" />
            Đăng ký tư vấn
          </button>
        </div>

      </div>
    </div>
     <ConSult show={showModal} onClose={() => setShowModal(false)} />
    </>
  
  );
}
