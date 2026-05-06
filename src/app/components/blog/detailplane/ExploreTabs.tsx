import React, { useState } from "react";
import FlightRouteLink from "../../flightlink/FlightRouteLink";



const ExploreTabs: React.FC = () => {
const [activeTab, setActiveTab] = useState(0);

 interface FlightRoute {
  from: string;
  to: string;
}

interface TabItem {
  label: string;
  tripType: "khu-hoi" | "mot-chieu";
  routes: FlightRoute[];
}

const tabs: TabItem[] = [
  {
    label: "Các chặng bay nội địa hàng đầu",
    tripType: "khu-hoi", // nội địa = khứ hồi
    routes: [
        { from: "Hà Nội", to: "Sài Gòn" },
        { from: "Hà Nội", to: "Đà Nẵng" },
        { from: "Đà Nẵng", to: "Sài Gòn" },
        { from: "Hà Nội", to: "Đà Lạt" },
        { from: "Hà Nội", to: "Quy Nhơn" },
        { from: "Thanh Hóa", to: "Sài Gòn" },
        { from: "Hải Phòng", to: "Đà Nẵng" },
        { from: "Huế", to: "Hà Nội" },
        { from: "Đà Lạt", to: "Sài Gòn" },

        // 🔥 Bổ sung thêm nhiều chặng phổ biến
        { from: "Hà Nội", to: "Phú Quốc" },
        { from: "Hà Nội", to: "Cần Thơ" },
        { from: "Hà Nội", to: "Nha Trang" },
        { from: "Hà Nội", to: "Huế" },
        { from: "Hà Nội", to: "Hải Phòng" },

        { from: "Sài Gòn", to: "Phú Quốc" },
        { from: "Sài Gòn", to: "Nha Trang" },
        { from: "Sài Gòn", to: "Quy Nhơn" },
        { from: "Sài Gòn", to: "Đà Lạt" },
        { from: "Sài Gòn", to: "Huế" },
        { from: "Sài Gòn", to: "Thanh Hóa" },
        { from: "Sài Gòn", to: "Vinh" },

        { from: "Đà Nẵng", to: "Hải Phòng" },
        { from: "Đà Nẵng", to: "Thanh Hóa" },
        { from: "Đà Nẵng", to: "Vinh" },
        { from: "Đà Nẵng", to: "Cần Thơ" },

        { from: "Cần Thơ", to: "Phú Quốc" },
        { from: "Cần Thơ", to: "Đà Lạt" },
        { from: "Cần Thơ", to: "Hà Nội" },

        { from: "Phú Quốc", to: "Đà Nẵng" },
        { from: "Phú Quốc", to: "Thanh Hóa" },

        { from: "Hải Phòng", to: "Đà Lạt" },
        { from: "Hải Phòng", to: "Phú Quốc" },
    ],
  },
  {
    label: "Các chặng bay quốc tế hàng đầu",
    tripType: "mot-chieu", // quốc tế = một chiều
    routes: [
      //  Mỹ
      { from: "Hà Nội", to: "New York" },
      { from: "Hà Nội", to: "Los Angeles" },
      { from: "Hà Nội", to: "Chicago" },
      { from: "Hà Nội", to: "Miami" },

      { from: "Sài Gòn", to: "New York" },
      { from: "Sài Gòn", to: "Los Angeles" },
      { from: "Sài Gòn", to: "San Francisco" }, // bổ sung thêm chặng phổ biến

      //  Canada
      { from: "Hà Nội", to: "Toronto" },
      { from: "Hà Nội", to: "Montréal" },
      { from: "Sài Gòn", to: "Vancouver" },

      //  Châu Âu
      { from: "Hà Nội", to: "London" },
      { from: "Hà Nội", to: "Paris" },
      { from: "Hà Nội", to: "Frankfurt" },
      { from: "Sài Gòn", to: "Moscow" },

      //  Trung Đông
      { from: "Hà Nội", to: "Dubai" },
      { from: "Hà Nội", to: "Abu Dhabi" },
      { from: "Sài Gòn", to: "Doha" },

      //  Châu Á
      { from: "Hà Nội", to: "Tokyo" },
      { from: "Hà Nội", to: "Seoul" },
      { from: "Hà Nội", to: "Bangkok" },
      { from: "Sài Gòn", to: "Singapore" },
      { from: "Sài Gòn", to: "Hong Kong" },
      { from: "Sài Gòn", to: "Kuala Lumpur" },

      //  Úc
      { from: "Hà Nội", to: "Sydney" },
      { from: "Sài Gòn", to: "Melbourne" },

      //  Châu Phi
      { from: "Hà Nội", to: "Cairo" },
      { from: "Sài Gòn", to: "Johannesburg" },
    ],
  },
  {
    label: "Các chặng bay giá rẻ nhất",
    tripType: "khu-hoi", // giá rẻ = khứ hồi
    routes: [
      { from: "Hà Nội", to: "Phú Quốc" },
      { from: "Sài Gòn", to: "Đà Nẵng" },
      { from: "Hà Nội", to: "Nha Trang" },
      { from: "Sài Gòn", to: "Huế" },

      { from: "Đà Nẵng", to: "Hải Phòng" },
      { from: "Đà Nẵng", to: "Thanh Hóa" },
      { from: "Đà Nẵng", to: "Vinh" },
      { from: "Đà Nẵng", to: "Cần Thơ" },

      { from: "Cần Thơ", to: "Phú Quốc" },
      { from: "Cần Thơ", to: "Đà Lạt" },
      { from: "Cần Thơ", to: "Hà Nội" },

    ],
  },
];

  return (
    <div className="explore-tabs-container contaner-fluid">
        <h1 className="fw-bold ContentLeft title-responsive " style={{ color: "#2D4271",textAlign:'center'}}>Bạn muốn khám phá điều gì?</h1>
        {/* Tabs Navigation */}
        <div
          className="tabs-navigation d-flex flex-nowrap overflow-auto p-2"
          style={{ whiteSpace: "nowrap", scrollbarWidth: "none" }}
        >
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`tab-button ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              style={{ flex: "0 0 auto" }} // 👈 để tab không co giãn, kéo ngang
            >
              {tab.label}
              {activeTab === idx && <div className="tab-indicator"></div>}
            </button>
          ))}
        </div>

      {/* Tab Content */}
   <div className="tab-content">
  <div className="links-grid">
    {tabs[activeTab].routes.map((route, idx) => (
      <FlightRouteLink
      from={route.from}
      to={route.to}
      tripType={tabs[activeTab].tripType}
      key={idx}
      >
      <div className="link-card">
        <div className="card-content">
          <span className="link-text">
            Vé máy bay {route.from} {route.to}
          </span>
          <div className="arrow-icon">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      </FlightRouteLink>
    ))}
  </div>
</div>

    </div>
  );
};

export default ExploreTabs;