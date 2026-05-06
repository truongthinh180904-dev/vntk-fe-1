"use client";

import { useState } from "react";
import NewsLatest from "../components/domestic/NewsLatest";
import NewsPromotion from "../components/domestic/NewsPromotion";
import NewsGuide from "../components/domestic/NewsGuide";
import NewsDiscovery from "../components/domestic/NewsDiscovery";
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demodanangImg from '../assets/img/home/vemaybaynoidia/danang.webp';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';
import FeaturedDestinations from "./FeaturedDestinations";

const NewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Vé quốc tế giá tốt tuần này");
  const categories = ["Vé quốc tế giá tốt tuần này", "Khuyến mãi", "Cẩm nang du lịch", "Khám phá"];

  const renderComponent = () => {
    switch (activeCategory) {
      case "Khám phá":
        return <NewsGuide  />;
      case "Khuyến mãi":
        return <NewsLatest />;
      case "Cẩm nang du lịch":
        return <NewsPromotion  />;  
      default:
        return <FeaturedDestinations />;
    }
  };

  return (
    <div className="container-fluid  position-relative" style={{background:
      "radial-gradient(ellipse 30% 26% at 80% 0, rgba(255, 233, 236, 0.6), transparent), radial-gradient(ellipse 30% 26% at bottom left, rgba(255, 233, 236, 0.6), transparent), #fcf9f6"}}>
      <section className="container" style={{ overflow: "hidden" }}>
        {/* --- Tabs --- */}
        <div
          className="d-flex d-none d-md-flex shadow-sm mt-2 rounded align-items-center justify-content-between mb-3"
          style={{
            height: "60px",
            padding: "0 20px",
            backgroundColor: "#fff",
          }}
        >
          <h5 className="fw-bold mb-0">Khám phá ưu đãi</h5>
        <div
          className="d-flex flex-wrap gap-2"
          style={{
            overflowX: "auto", // ✅ Cho phép trượt ngang trên mobile
            whiteSpace: "nowrap", // ✅ Giữ các nút trên cùng một hàng
            WebkitOverflowScrolling: "touch", // ✅ Cuộn mượt hơn trên iOS
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm fw-semibold px-3 py-2 rounded-pill me-2 ${
                activeCategory === cat
                  ? "btn-primary text-white"
                  : "btn-light text-dark"
              }`}
              style={{
                flexShrink: 0, // ✅ Ngăn nút bị co lại khi scroll
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        </div>

       {/* --- Tabs --- */}
      <div
        className="d-flex d-md-none flex-row shadow-sm mt-2 rounded mb-3 px-2 align-items-center"
        style={{
          backgroundColor: "#fff",
          height: "70px", // tổng chiều cao thanh
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {/* Tiêu đề cố định */}
        <h5
          className="fw-bold mb-0 me-3"
          style={{
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Lựa Chọn 
        </h5>

        {/* Các tab */}
        <div
          className="d-flex gap-2 flex-nowrap"
          style={{
            alignItems: "center",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`fw-semibold rounded-pill ${
                activeCategory === cat
                  ? "text-white"
                  : "text-dark"
              }`}
              style={{
                flexShrink: 0,
                height: "40px",
                lineHeight: "1",
                padding: "0 14px",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  activeCategory === cat ? "#0d6efd" : "#f1f1f1", // xanh đậm khi active
                border:
                  activeCategory === cat
                    ? "1px solid #0b5ed7"
                    : "1px solid #ddd",
                boxShadow:
                  activeCategory === cat
                    ? "0 0 4px rgba(13,110,253,0.5)"
                    : "none",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

        {/* --- Hiển thị component tương ứng --- */}
   
      </section>
           {renderComponent()}
    </div>
    
  );
};

export default NewsSection;
