"use client";

import { useEffect, useState } from "react";
import "./blog.css";
import NewsAll from "./NewsAll";
import NewsHotFlights from "./NewsHotFlights";
import NewsAirportInfo from "./NewsAirportInfo";
import NewsTips from "./NewsTips";
import BannerNewall from "../assets/img/blog/doc-tin-tuc-nhan-khuyen-mai.jpg"
import axios from "axios";

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "hot":
        return <NewsHotFlights />;
      case "airport":
        return <NewsAirportInfo />;
      case "tips":
        return <NewsTips />;
      default:
        return <NewsAll />;
    }
  };



  
const [data, setData] = useState<any>(null);

const CACHE_KEY = "bg_news";
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 ngày = 2*24*60*60*1000 ms

useEffect(() => {
    const fetchData = async () => {
      try {
        // Kiểm tra localStorage
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          const now = new Date().getTime();

          // Nếu cache còn hạn
          if (parsed.timestamp && now - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            return;
          }
        }

        // Fetch API nếu chưa có cache hoặc hết hạn
        const res = await axios.get("http://127.0.0.1:8000/api/backgroundshome/4");
        const imagePath = res?.data?.data?.image_path;

        const newData = {
          background: { image_path: imagePath || null },
        };

        setData(newData);

        // Lưu vào localStorage kèm timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: newData, timestamp: new Date().getTime() })
        );
      } catch (err) {
        setData({ background: { image_path: null } });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container news-container py-4">
      {/* Banner */}
        <div
        className="news-banner rounded-4 overflow-hidden mb-4"
        style={{
          height: "220px", // có thể đổi tùy ý
          position: "relative",
        }}
      >
        <img
          src={
            data?.background?.image_path
              ? `http://127.0.0.1:8000/storage/${data.background.image_path}` // ✅ Nếu API có dữ liệu
              : BannerNewall.src // ⚙️ Fallback mặc định
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
      <ul className="d-none d-md-flex nav nav-tabs justify-content-center  news-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả tin tức
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "hot" ? "active" : ""}`}
            onClick={() => setActiveTab("hot")}
          >
            Vé máy nổi bật tại Vietnam Tickets
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "airport" ? "active" : ""}`}
            onClick={() => setActiveTab("airport")}
          >
            Thông tin về sân bay
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tips" ? "active" : ""}`}
            onClick={() => setActiveTab("tips")}
          >
            Bỏ túi kinh nghiệm bay
          </button>
        </li>
      </ul>

      <ul className="nav nav-tabs d-flex d-md-none news-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả tin tức
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "hot" ? "active" : ""}`}
            onClick={() => setActiveTab("hot")}
          >
            Vé máy nổi bật tại Vietnam Tickets
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "airport" ? "active" : ""}`}
            onClick={() => setActiveTab("airport")}
          >
            Thông tin về sân bay
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tips" ? "active" : ""}`}
            onClick={() => setActiveTab("tips")}
          >
            Bỏ túi kinh nghiệm bay
          </button>
        </li>
      </ul>
     

      {/* Tab content */}
      <div className="tab-content mt-3">{renderContent()}</div>
    </div>
  );
};

export default NewsSection;
