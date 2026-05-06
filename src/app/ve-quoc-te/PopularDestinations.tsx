"use client";
import { useState } from "react";
import styles from "./PopularDestinations.module.css";
import InfoBox from "./InfoBox";
import WhyChooseUs from "./WhyChooseUs";
import FlightDealLink from "../components/flightlink/FlightDealLink";
import { Plane, ThumbsUp } from "lucide-react";

const PopularDestinations = () => {
  const [activeTab, setActiveTab] = useState("countries");

  const tabs = [
    { key: "countries", label: "Các quốc gia phổ biến" },
    { key: "cities", label: "Thành phố nổi bật" },
    { key: "routes", label: "Tuyến bay quốc tế phổ biến" },
    { key: "airlines", label: "Hãng hàng không quốc tế hàng đầu" },
  ];

  // 🌍 Dữ liệu vé máy bay quốc tế (chuẩn hóa IATA)
  const tabData: Record<string, { label: string; from: string; to: string }[]> = {
    countries: [
      { label: "Vé máy bay đi Nhật Bản", from: "HAN", to: "NRT" },
      { label: "Vé máy bay đi Hàn Quốc", from: "SGN", to: "ICN" },
      { label: "Vé máy bay đi Thái Lan", from: "HAN", to: "BKK" },
      { label: "Vé máy bay đi Singapore", from: "DAD", to: "SIN" },
      { label: "Vé máy bay đi Malaysia", from: "SGN", to: "KUL" },
      { label: "Vé máy bay đi Trung Quốc", from: "SGN", to: "PEK" },
      { label: "Vé máy bay đi Úc", from: "HAN", to: "SYD" },
      { label: "Vé máy bay đi Pháp", from: "SGN", to: "CDG" },
      { label: "Vé máy bay đi Mỹ", from: "SGN", to: "LAX" },
      { label: "Vé máy bay đi Canada", from: "HAN", to: "YYZ" },
    ],
    cities: [
      { label: "Vé máy bay đi Tokyo", from: "HAN", to: "NRT" },
      { label: "Vé máy bay đi Seoul", from: "SGN", to: "ICN" },
      { label: "Vé máy bay đi Bangkok", from: "HAN", to: "BKK" },
      { label: "Vé máy bay đi Singapore", from: "SGN", to: "SIN" },
      { label: "Vé máy bay đi Kuala Lumpur", from: "DAD", to: "KUL" },
      { label: "Vé máy bay đi Paris", from: "HAN", to: "CDG" },
      { label: "Vé máy bay đi Sydney", from: "SGN", to: "SYD" },
      { label: "Vé máy bay đi Los Angeles", from: "HAN", to: "LAX" },
      { label: "Vé máy bay đi Toronto", from: "SGN", to: "YYZ" },
    ],
    routes: [
      { label: "Hà Nội ⇌ Tokyo", from: "HAN", to: "NRT" },
      { label: "TP.HCM ⇌ Seoul", from: "SGN", to: "ICN" },
      { label: "Đà Nẵng ⇌ Singapore", from: "DAD", to: "SIN" },
      { label: "Hà Nội ⇌ Bangkok", from: "HAN", to: "BKK" },
      { label: "TP.HCM ⇌ Kuala Lumpur", from: "SGN", to: "KUL" },
      { label: "Hà Nội ⇌ Paris", from: "HAN", to: "CDG" },
      { label: "TP.HCM ⇌ Sydney", from: "SGN", to: "SYD" },
      { label: "Hà Nội ⇌ Los Angeles", from: "HAN", to: "LAX" },
      { label: "TP.HCM ⇌ Toronto", from: "SGN", to: "YYZ" },
    ],
    airlines: [
      { label: "Vietnam Airlines", from: "HAN", to: "CDG" },
      { label: "Vietjet Air", from: "SGN", to: "ICN" },
      { label: "Bamboo Airways", from: "HAN", to: "NRT" },
      { label: "Singapore Airlines", from: "SGN", to: "SIN" },
      { label: "Thai Airways", from: "HAN", to: "BKK" },
      { label: "Malaysia Airlines", from: "SGN", to: "KUL" },
      { label: "Korean Air", from: "HAN", to: "ICN" },
      { label: "Japan Airlines", from: "SGN", to: "NRT" },
    ],
  };

  const fallbackContent = `
  <div class="product-description text-left">
    <p class="intro-text">
      <strong>VietNam Tickets</strong> - Đại lý vé máy bay quốc tế uy tín hàng đầu tại Việt Nam,
      mang đến hàng nghìn lựa chọn bay đến hơn 50 quốc gia trên toàn thế giới.
    </p>
    <p class="highlight-text">
      Chúng tôi cam kết <strong>giá vé cạnh tranh nhất</strong>, hỗ trợ <strong>24/7</strong> và 
      dịch vụ <strong>chăm sóc khách hàng chuyên nghiệp</strong>.
    </p>
    <p>
      Hệ thống <strong>tra cứu và so sánh vé thông minh</strong> giúp bạn dễ dàng tìm được hành trình lý tưởng 
      đến Nhật Bản, Hàn Quốc, Singapore, Châu Âu, Úc và Mỹ — nhanh chóng và tiện lợi.
    </p>
    <p>
      VietNam Tickets không chỉ cung cấp vé máy bay mà còn tư vấn hành trình, 
      gợi ý thời điểm bay tiết kiệm, và hỗ trợ thay đổi lịch trình linh hoạt.
    </p>
    <p><em>"Bay cùng VietNam Tickets – Chạm tới mọi điểm đến quốc tế"</em></p>
  </div>
`;

  return (
    <div className={`py-5 ${styles.sectionBg}`}>
      <div className="container">
         <div className="d-flex align-items-center">
          <ThumbsUp
            style={{ marginRight: "10px" }}
            size={32}
            color="#2d4f85"
            className="mb-1"
          />
          <h1 className="fw-bold promo-header mb-0">
           Tại sao nên chọn vé máy bay quốc tế tại VietNam Tickets
          </h1>
        </div>
        <WhyChooseUs />
        <InfoBox content={fallbackContent} />
      </div>

      <div className="container mt-4">
          <div className="d-flex align-items-center">
          <Plane
            style={{ marginRight: "10px" }}
            size={32}
            color="#2d4f85"
            className="mb-1"
          />
          <h1 className="fw-bold promo-header mb-0">
            Tuyến bay quốc tế tốt nhất cho bạn
          </h1>
        </div>  

        <p className="text-muted mt-2">Các tuyến bay quốc tế nổi bật với nhiều ưu đãi hấp dẫn</p>

        {/* Tabs */}
        <div className={`d-none d-md-flex flex-wrap gap-2 ${styles.customTabs}`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabs mobile */}
        <div
          className="d-flex d-md-none gap-2 px-2"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              style={{ flexShrink: 0 }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Nội dung */}
        <div className={`${styles.contentBox} mt-3`}>
          <div className="d-flex flex-wrap gap-3">
            {tabData[activeTab]?.map((item, i) => (
              <FlightDealLink
                key={i}
                from={item.from}
                to={item.to}
                price={2300000}
                tripType="mot-chieu"
                dateRange="15 - 20 thg 12"
                data-loader
              >
                {item.label}
              </FlightDealLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
