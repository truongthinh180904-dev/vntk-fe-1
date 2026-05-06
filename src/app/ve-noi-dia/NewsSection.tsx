"use client";

import { useState } from "react";
import NewsLatest from "../components/domestic/NewsLatest";
import NewsPromotion from "../components/domestic/NewsPromotion";
import NewsGuide from "../components/domestic/NewsGuide";
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';
import FeaturedDestinations from "./FeaturedDestinations";

const NewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Tin mới nhất");
  const flightsnew = [
      { id: 1, from: "TP HCM", to: "Hà Nội", date: "28 thg 10", price: 1081699, originalPrice: 1500000, img: demohanoiImg.src },
      { id: 2, from: "Nha Trang", to: "Hà Nội", date: "28 thg 10", price: 1081699, originalPrice: 1450000, img: demohanoiImg.src },
      { id: 3, from: "Đà Nẵng", to: "Hà Nội", date: "6 thg 12", price: 755593, originalPrice: 1000000, img: demohanoiImg.src },
      { id: 4, from: "Hà Nội", to: "TP. Hồ Chí Minh", date: "28 thg 10", price: 1081699, originalPrice: 1500000, img: demotphcmImg.src },
      { id: 5, from: "Cần Thơ", to: "TP. Hồ Chí Minh", date: "28 thg 10", price: 1081699, originalPrice: 1400000, img: demotphcmImg.src },
      { id: 6, from: "Huế", to: "TP. Hồ Chí Minh", date: "27 thg 10", price: 800993, originalPrice: 1100000, img: demotphcmImg.src },
    ];
  const categories = ["Tin mới nhất", "Khuyến mãi", "Cẩm nang du lịch", "Khám phá"];

  const renderComponent = () => {
    switch (activeCategory) {
      case "Khuyến mãi":
        return <NewsGuide />;
      case "Cẩm nang du lịch":
        return <NewsPromotion />;
      case "Khám phá":
        return <FeaturedDestinations />;
      default:
        return <NewsLatest />;
    }
  };

  return (
    <div className="container-fluid mt-2  position-relative" style={{background:
      "radial-gradient(ellipse 30% 26% at 80% 0, rgba(255, 233, 236, 0.6), transparent), radial-gradient(ellipse 30% 26% at bottom left, rgba(255, 233, 236, 0.6), transparent), #fcf9f6"}}>
      <section className="container" style={{ overflow: "hidden" }}>
        {/* --- Tabs --- */}
        <div
          className="d-flex d-none mt-5 d-md-flex shadow-sm mt-2 rounded align-items-center justify-content-between mb-3"
          style={{
            height: "60px",
            padding: "0 20px",
            backgroundColor: "#fff",
          }}
        >
          <h5 className="fw-bold mb-0">Lựa Chọn</h5>
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
          className="d-flex d-md-none  flex-column shadow-sm mt-3 rounded mb-3"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            className="d-flex d-none d-md-flex  align-items-center justify-content-between px-3"
            style={{
              height: "60px",
            }}
          >
            <h5 className="fw-bold mb-0">Lựa Chọn</h5>
          </div>

          <div
            className="category-scroll d-flex gap-2 px-3 pb-2 pt-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm fw-semibold px-3 py-2 rounded-pill ${
                  activeCategory === cat
                    ? "btn-primary text-white"
                    : "btn-light text-dark"
                }`}
                style={{
                  flexShrink: 0,
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
