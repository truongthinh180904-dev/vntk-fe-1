"use client";

import { useEffect, useState } from "react";
import NewsAll from "./NewsAll";
import DomesticFlights from "../tin-tuc/DomesticFlights";
import NewsAirportInfo from "./NewsAirportInfo";
import NewsTips from "./NewsTips";
import BannerNewall from "../assets/img/promotion/banner-promotion.jpg"
import axios from "axios";

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "hot":
        return <DomesticFlights />;
      case "airport":
        return <NewsAirportInfo />;
      case "tips":
        return <NewsTips />;
      default:
        return <NewsAll />;
    }
  };

  const [data, setData] = useState<any>(null);
  useEffect(() => {
  const CACHE_KEY = "bg_promtions";
  const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 ngày

  const fetchData = async () => {
    try {
      // Kiểm tra cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION) {
          setData(parsed.data);
          console.log("✅ Lấy dữ liệu từ cache");
          return;
        }
      }

      // Fetch API
      const res = await axios.get("http://127.0.0.1:8000/api/backgroundshome/5");
      const imagePath = res?.data?.data?.image_path;

      const newData = {
        background: { image_path: imagePath || null },
      };

      setData(newData);

      // Lưu cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: newData, timestamp: Date.now() })
      );
      console.log("✅ Lấy dữ liệu từ API và lưu cache");
    } catch (err) {
      console.error("❌ Lỗi khi fetch dữ liệu:", err);
      setData({ background: { image_path: null } });
    }
  };

  fetchData();
}, []);


  return (
    <div className="container news-container py-4">
      {/* Banner */}
        <div
        className="news-banner d-none d-md-block overflow-hidden mb-4"
        style={{
          height: "280px", // có thể đổi tùy ý
          position: "relative",
        }}
      >
        <img
         src={
            data?.background?.image_path
              ? `http://127.0.0.1:8000/storage/${data.background.image_path}` // ✅ Nếu API có dữ liệu
              : BannerNewall.src // Fallback mặc định
          }
          alt="Khuyến mãi vé máy bay"
          className="w-100 h-100"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>


      {/* Tabs */}
      <ul className="nav nav-tabs d-none d-md-flex fw-bold justify-content-center news-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Khuyến mãi mới nhất
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "hot" ? "active" : ""}`}
            onClick={() => setActiveTab("hot")}
          >
           Ưu đãi vé máy bay nội địa 
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "airport" ? "active" : ""}`}
            onClick={() => setActiveTab("airport")}
          >
            Ưu đãi vé máy bay quốc tế
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tips" ? "active" : ""}`}
            onClick={() => setActiveTab("tips")}
          >
          Flash sale giảm giá
          </button>
        </li>
      </ul>
    <ul className="nav nav-tabs d-flex d-md-none news-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Khuyến mãi mới nhất
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div className="tab-content mt-3">{renderContent()}</div>
    </div>
  );
};

export default NewsSection;
