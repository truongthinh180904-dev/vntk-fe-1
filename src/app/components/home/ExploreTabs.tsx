import React, { useState } from "react";
import FlightRouteLink from "../flightlink/FlightRouteLink";



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
   <div className="explore-section container-fluid py-5">
  <div className="container">
    {/* Tiêu đề */}
    <div className="text-center mb-5">
      <h1 className="section-title">Điểm đến phổ biến</h1>
    </div>

    {/* Tabs Navigation */}
    <div className="tabs-container">
      <div className="tabs-navigation">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`tab-button ${activeTab === idx ? "active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            <span className="tab-label">{tab.label}</span>
            <span className="tab-counter">{tab.routes.length}</span>
            {activeTab === idx && <div className="tab-indicator"></div>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <div className="destinations-grid">
          {tabs[activeTab].routes.map((route, idx) => (
            <FlightRouteLink
              from={route.from}
              to={route.to}
              tripType={tabs[activeTab].tripType}
              key={idx}
            >
              <div className="destination-card">
                <div className="card-header">
                  <span className="route-text">
                    {route.from} → {route.to}
                  </span>
                  <div className="flight-badge">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="trip-type">{tabs[activeTab].tripType}</span>
                  <span className="price-text">Từ 1.200.000₫</span>
                </div>
                <div className="card-hover-effect"></div>
              </div>
            </FlightRouteLink>
          ))}
        </div>
      </div>
    </div>
  </div>

  <style jsx>{`
    .explore-section {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      min-height: 100vh;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #2D4271 0%, #1e293b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    .title-decoration {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .decoration-line {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #2D4271, #3b82f6);
      border-radius: 2px;
    }

    .decoration-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3b82f6;
    }

    /* Tabs Navigation */
    .tabs-container {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .tabs-navigation {
      display: flex;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .tab-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: transparent;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      font-weight: 600;
      color: #64748b;
    }

    .tab-button:hover {
      background: rgba(255, 255, 255, 0.8);
      color: #2D4271;
      transform: translateY(-2px);
    }

    .tab-button.active {
      background: #ffffff;
      color: #2D4271;
      box-shadow: 0 4px 12px rgba(45, 66, 113, 0.15);
    }

    .tab-counter {
      background: #e2e8f0;
      color: #64748b;
      padding: 0.25rem 0.5rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .tab-button.active .tab-counter {
      background: linear-gradient(135deg, #2D4271, #3b82f6);
      color: #ffffff;
    }

    .tab-indicator {
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: linear-gradient(135deg, #2D4271, #3b82f6);
      border-radius: 50%;
    }

    /* Tab Content */
    .tab-content {
      padding: 2rem;
    }

    .destinations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .destination-card {
      position: relative;
      background: #ffffff;
      border: 1px solid #f1f5f9;
      border-radius: 16px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      max-height:120px
    }

    .destination-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(45, 66, 113, 0.15);
      border-color: #3b82f6;
    }

    .destination-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(59, 130, 246, 0.05), 
        transparent
      );
      transition: left 0.6s ease;
    }

    .destination-card:hover::before {
      left: 100%;
    }

    .card-header {
      display: flex;
      justify-content: between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .route-text {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.4;
      flex: 1;
    }

    .flight-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #ffffff;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .card-footer {
      display: flex;
      justify-content: between;
      align-items: center;
    }

    .trip-type {
      font-size: 0.875rem;
      color: #64748b;
      background: #f1f5f9;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 500;
    }

    .price-text {
      font-size: 0.875rem;
      font-weight: 700;
      color: #10b981;
      background: #ecfdf5;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
    }

    .card-hover-effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(16, 185, 129, 0.02));
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 16px;
    }

    .destination-card:hover .card-hover-effect {
      opacity: 1;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
      }

      .tabs-navigation {
        flex-wrap: wrap;
        gap: 0.25rem;
      }

      .tab-button {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }

      .destinations-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .tab-content {
        padding: 1.5rem 1rem;
      }

      .destination-card {
        padding: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .section-title {
        font-size: 1.75rem;
      }

      .card-header {
        flex-direction: column;
        gap: 0.5rem;
      }

      .card-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .explore-section {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      }

      .tabs-container {
        background: #1e293b;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      }

      .tabs-navigation {
        background: #334155;
        border-bottom-color: #475569;
      }

      .tab-button {
        color: #94a3b8;
      }

      .tab-button:hover {
        background: rgba(30, 41, 59, 0.8);
        color: #f1f5f9;
      }

      .tab-button.active {
        background: #334155;
        color: #f1f5f9;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .tab-counter {
        background: #475569;
        color: #94a3b8;
      }

      .destination-card {
        background: #334155;
        border-color: #475569;
      }

      .route-text {
        color: #f1f5f9;
      }

      .trip-type {
        background: #475569;
        color: #cbd5e1;
      }

      .price-text {
        background: #065f46;
        color: #6ee7b7;
      }
    }
  `}</style>
</div>
  );
};

export default ExploreTabs;