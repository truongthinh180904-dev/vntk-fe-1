"use client";

import { Phone, Send, PlaneTakeoff } from "lucide-react";
import banner from "../assets/img/home/bgvenoidia.jpg";

export default function FlightBookingBanner() {
  return (
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
          <img src="https://flagcdn.com/w20/us.png" alt="US" />
          <img src="https://flagcdn.com/w20/ca.png" alt="CA" />
          <img src="https://flagcdn.com/w20/kr.png" alt="KR" />
          <img src="https://flagcdn.com/w20/jp.png" alt="JP" />
          <span className="fw-semibold small" style={{ color: "rgb(250 252 255)"}}>+100 quốc gia khác</span>
        </div>

        <p className="fw-semibold mb-4" style={{ color: "rgb(10 41 68)"}}>
          Cam kết hỗ trợ khách hàng 24/7 - Giá vé minh bạch - Thanh toán linh hoạt
        </p>

        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
          <a
            href="tel:19003173"
            className="btn fw-bold px-4 py-2 d-flex align-items-center rounded-pill"
            style={{ backgroundColor: "#e91e63", color: "white" }}
          >
            <Phone size={18} className="me-2" />
            1900 3173
          </a>

          <button
            className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center rounded-pill"
            style={{
              backgroundColor: "#0d47a1",
              border: "none",
            }}
          >
            <PlaneTakeoff size={18} className="me-2" />
            Đăng ký tư vấn
          </button>
        </div>
      </div>
    </div>
  );
}
