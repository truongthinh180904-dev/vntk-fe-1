"use client";
import { useState } from "react";
import styles from "./PopularDestinations.module.css";
import FlightDealLink from "../flightlink/FlightDealLink"; // ✅ nhớ import đúng đường dẫn
import { Plane } from "lucide-react";

const PopularDestinations = () => {
  const [activeTab, setActiveTab] = useState("countries");

  const tabs = [
    { key: "countries", label: "Những đất nước phổ biến" },
    { key: "cities", label: "Các điểm đến của các chuyến bay phổ biến" },
    { key: "routes", label: "Đường bay phổ biến" },
    { key: "airlines", label: "Các hãng hàng không hàng đầu" },
  ];

  // ✅ Thêm dữ liệu from/to thực tế cho từng item
 const tabData: Record<
  string,
  { label: string; from: string; to: string }[]
> = {
  countries: [
    { label: "Vé máy bay đi Việt Nam", from: "NRT", to: "HAN" }, // Tokyo -> Hà Nội
    { label: "Vé máy bay đi Trung Quốc", from: "SGN", to: "PEK" }, // HCM -> Bắc Kinh
    { label: "Vé máy bay đi Nhật Bản", from: "HAN", to: "NRT" }, // Hà Nội -> Tokyo
    { label: "Vé máy bay đi Hàn Quốc", from: "SGN", to: "ICN" }, // HCM -> Seoul
    { label: "Vé máy bay đi Thái Lan", from: "HAN", to: "BKK" }, // Hà Nội -> Bangkok
    { label: "Vé máy bay đi Malaysia", from: "SGN", to: "KUL" }, // HCM -> Kuala Lumpur
    { label: "Vé máy bay đi Singapore", from: "DAD", to: "SIN" }, // Đà Nẵng -> Singapore
    { label: "Vé máy bay đi Campuchia", from: "SGN", to: "PNH" }, // HCM -> Phnom Penh (Campuchia)
    { label: "Vé máy bay đi Nga", from: "HAN", to: "SVO" }, // Hà Nội -> Moscow
    { label: "Vé máy bay đi Hoa Kỳ", from: "SGN", to: "LAX" }, // HCM -> Los Angeles
  ],
  cities: [
    { label: "Vé máy bay đi Hà Nội", from: "SGN", to: "HAN" },
    { label: "Vé máy bay đi TP. Hồ Chí Minh", from: "HAN", to: "SGN" },
    { label: "Vé máy bay đi Đà Nẵng", from: "HAN", to: "DAD" },
    { label: "Vé máy bay đi Nha Trang", from: "SGN", to: "CXR" },
    { label: "Vé máy bay đi Phú Quốc", from: "HAN", to: "PQC" },
    { label: "Vé máy bay đi Đà Lạt", from: "SGN", to: "DLI" },
  ],
  routes: [
    { label: "Hà Nội ⇌ TP.HCM", from: "HAN", to: "SGN" },
    { label: "Đà Nẵng ⇌ Nha Trang", from: "DAD", to: "CXR" },
    { label: "Hà Nội ⇌ Phú Quốc", from: "HAN", to: "PQC" },
    { label: "TP.HCM ⇌ Đà Lạt", from: "SGN", to: "DLI" },
    { label: "Hà Nội ⇌ Cần Thơ", from: "HAN", to: "VCA" },
  ],
  airlines: [
    { label: "Vietnam Airlines", from: "HAN", to: "SGN" },
    { label: "Vietjet Air", from: "SGN", to: "DAD" },
    { label: "Bamboo Airways", from: "HAN", to: "PQC" },
    { label: "Pacific Airlines", from: "SGN", to: "CXR" },
    { label: "Vietravel Airlines", from: "DAD", to: "HAN" },
  ],
};


  const fallbackContent = `
  <div class="product-description text-left">
    <p class="intro-text">
      <strong>VietNam Tickets</strong> - Đại lý vé máy bay uy tín hàng đầu tại Việt Nam, 
      đồng hành cùng hàng chục nghìn khách hàng trong suốt hành trình bay khắp năm châu.  
    </p>
    <p class="highlight-text">
      Cam kết <strong>hỗ trợ khách hàng 24/7</strong>, tư vấn tận tâm và chuyên nghiệp, 
      mang lại trải nghiệm đặt vé đơn giản và an toàn tuyệt đối.  
    </p>
    <p>
      Với hệ thống <strong>tra cứu và so sánh giá vé thông minh</strong>, VietNam Tickets 
      giúp bạn dễ dàng lựa chọn chuyến bay phù hợp từ hơn 50 hãng hàng không trong nước và quốc tế.  
    </p>
    <p>
      Không chỉ hỗ trợ đặt vé, chúng tôi còn cung cấp dịch vụ <strong>tư vấn hành trình</strong>, 
      gợi ý thời điểm bay tiết kiệm, và <strong>hỗ trợ thay đổi lịch trình nhanh chóng</strong>.  
    </p>
    <p><em>"Đặt vé dễ dàng – Bay đi muôn nơi"</em></p>
  </div>
`;

  return (
    <div className={`py-5 ${styles.sectionBg}`}>
     <div className="container">
       <h1 className="fw-bold promo-header d-flex align-items-center mb-0">
              <Plane style={{ marginRight: "10px" }} size={32} color="#2d4f85" className="mb-1" />
                Tuyến bay tốt nhất cho bạn
              </h1>
        <p className="text-muted mt-2">Tuyến bay nổi bật với nhiều ưu đãi hấp dẫn</p>

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

        {/* Tabs mobile (scroll ngang) */}
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

        {/* Nội dung theo tab */}
        <div className={`${styles.contentBox} mt-3`}>
          <div className="d-flex flex-wrap gap-3">
            {tabData[activeTab]?.map((item, i) => (
              <FlightDealLink
                key={i}
                from={item.from}
                to={item.to}
                price={2300000} // ✅ giữ nguyên giá cố định
                tripType="mot-chieu"
                dateRange="20 thg 12"
                data-loader
              >
                <span className={styles.destinationLink}>
                  {item.label}
                </span>
              </FlightDealLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
