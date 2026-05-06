"use client";
import { useState } from "react";
import styles from "./PopularDestinations.module.css";
import InfoBox from "./InfoBox";
import WhyChooseUs from "./WhyChooseUs";
import { PencilLine, Plane } from "lucide-react";

const PopularDestinations = () => {
  const [activeTab, setActiveTab] = useState("countries");

  const tabs = [
    { key: "countries", label: "Những đất nước phổ biến" },
    { key: "cities", label: "Các điểm đến của các chuyến bay phổ biến" },
    { key: "routes", label: "Đường bay phổ biến" },
    { key: "airlines", label: "Các hãng hàng không hàng đầu" },
  ];

  // 🔹 Nội dung theo từng tab
  const tabData: Record<string, string[]> = {
    countries: [
      "Vé máy bay đi Việt Nam",
      "Vé máy bay đi Trung Quốc",
      "Vé máy bay đi Nhật Bản",
      "Vé máy bay đi Hàn Quốc",
      "Vé máy bay đi Thái Lan",
      "Vé máy bay đi Malaysia",
      "Vé máy bay đi Singapore",
      "Vé máy bay đi Campuchia",
      "Vé máy bay đi Nga",
      "Vé máy bay đi Hoa Kỳ",
    ],
    cities: [
      "Vé máy bay đi Hà Nội",
      "Vé máy bay đi TP. Hồ Chí Minh",
      "Vé máy bay đi Đà Nẵng",
      "Vé máy bay đi Nha Trang",
      "Vé máy bay đi Phú Quốc",
      "Vé máy bay đi Đà Lạt",
    ],
    routes: [
      "Hà Nội ⇌ TP.HCM",
      "Đà Nẵng ⇌ Nha Trang",
      "Hà Nội ⇌ Phú Quốc",
      "TP.HCM ⇌ Đà Lạt",
      "Hà Nội ⇌ Cần Thơ",
    ],
    airlines: [
      "Vietnam Airlines",
      "Vietjet Air",
      "Bamboo Airways",
      "Pacific Airlines",
      "Vietravel Airlines",
    ],
    airports: [
      "Sân bay Nội Bài (HAN)",
      "Sân bay Tân Sơn Nhất (SGN)",
      "Sân bay Đà Nẵng (DAD)",
      "Sân bay Cam Ranh (CXR)",
      "Sân bay Phú Quốc (PQC)",
    ],
    status: [
      "VN210 - Đang cất cánh",
      "VJ611 - Đã hạ cánh",
      "QH1520 - Đang làm thủ tục",
      "VN159 - Hoãn chuyến",
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
      Giá vé luôn được cập nhật minh bạch, kèm nhiều ưu đãi hấp dẫn theo mùa và chương trình khuyến mãi đặc biệt.  
    </p>

    <p>
      Không chỉ hỗ trợ đặt vé, chúng tôi còn cung cấp dịch vụ <strong>tư vấn hành trình</strong>, 
      gợi ý thời điểm bay tiết kiệm, và <strong>hỗ trợ thay đổi lịch trình nhanh chóng</strong> khi khách hàng cần.  
      Tất cả đều hướng đến mục tiêu đem lại sự an tâm và tiện lợi tối đa cho bạn.  
    </p>

    <p>
      <em>"Đặt vé dễ dàng – Bay đi muôn nơi"</em> chính là sứ mệnh mà VietNam Tickets luôn theo đuổi, 
      để mỗi chuyến đi của bạn không chỉ là di chuyển mà còn là một trải nghiệm thoải mái và đáng nhớ.  
    </p>
  </div>
`;
  return (
    <div className={`py-5 ${styles.sectionBg}`}>
      <div className="container">
        <h1 className="fw-bold promo-header d-flex align-items-center mb-0">
            <PencilLine style={{ marginRight: "10px" }} size={35} color="#2d4f85" className="mb-1" />
      Tại sao nên chọn vé máy bay nội địa tại VietNam Tickets
        </h1>
      <WhyChooseUs />
       <InfoBox
          content={fallbackContent}
        />
      </div>
      <div className="container">
        <h1 className="fw-bold promo-header d-flex align-items-center mb-0">
        <Plane style={{ marginRight: "10px" }} size={32} color="#2d4f85" className="mb-1" />
          Tuyến bay tốt nhất cho bạn
        </h1>
        <p className="text-muted mt-2">
         Tuyến bay nổi bật với nhiều ưu đãi hấp dẫn
        </p>

        {/* Tabs */}
        <div
          className={`d-none d-md-flex flex-wrap gap-2 ${styles.customTabs}`}
        >
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

        {/* Tabs mobile — scroll ngang */}
        <div
          className="d-flex d-md-none gap-2 px-2"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch", // cuộn mượt iOS
            scrollbarWidth: "none", // ẩn thanh cuộn Firefox
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              style={{
                flexShrink: 0, // không bị co khi scroll
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* ẩn thanh cuộn trên Chrome/Safari */
          }
        `}</style>

                
              


        {/* Nội dung đổi theo tab */}
        <div className={`${styles.contentBox} mt-3`}>
          <div className="d-flex flex-wrap gap-3">
            {tabData[activeTab].map((item, i) => (
              <span key={i}  className={styles.destinationLink}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
