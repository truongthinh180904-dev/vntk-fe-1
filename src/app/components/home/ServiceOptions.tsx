"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Plane,
  Globe2,
  Tag,
  BookOpen,
  Gift,
  Mountain,
  Search,
  Loader2,
} from "lucide-react";
import styles from "./ServiceOptions.module.css";
import banner from "../../assets/img/home/banner.png";
import banner_06 from "../../assets/img/home/imgbanner06.png";
// import Searchmobile from "./Searchmobile";
import PromoHome from "./PromoHome";
import Link from "next/link";
import { useRouter } from "next/navigation";

import probanner from "../../assets/img/promotion/banner-promotion-2.png";
import probanner1 from "../../assets/img/promotion/banner-promotion-3.png";
import probanner2 from "../../assets/img/promotion/banner-promotion-4.png";
import probanner3 from "../../assets/img/promotion/banner-promotion-5.png";

const ServiceOptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("promo"); // "promo" hoặc "search"
  const services = [
    { icon: <Plane size={20} color="#fff" />, title: "Vé máy bay", discount: "-400k", bg: "#4CB4F8", link: "/tim-kiem-chuyen-bay" },
    { icon: <Globe2 size={20} color="#fff" />, title: "Vé quốc tế", discount: "-300k", bg: "#8B5CF6", link: "/ve-quoc-te" },
    { icon: <Mountain size={20} color="#fff" />, title: "Vé nội địa", discount: "-1tr", bg: "#F97316", link: "/ve-noi-dia" },
    { icon: <Tag size={20} color="#fff" />, title: "Khuyến mãi", discount: "-100k", bg: "#FACC15", link: "/khuyen-mai" },
    { icon: <BookOpen size={20} color="#fff" />, title: "Cẩm nang", discount: "", bg: "#22C55E", link: "/tin-tuc" },
  ];



  const slides = [
      probanner.src,
      probanner1.src,
      probanner2.src,
      probanner3.src  
    ];
  
    const [current, setCurrent] = useState(0);
  
    // Auto slide (3s)
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }, [current]);
  
    const nextSlide = () => {
      setCurrent((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    
  
    const [query, setQuery] = useState("");
    const [allFlights, setAllFlights] = useState<any[]>([]);
    const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isCheckingCache, setIsCheckingCache] = useState(true); // Trạng thái đợi cache

      
        // Biến này để khóa UI: Nếu mảng rỗng thì coi như đang đợi Header nạp
    const isWaitingData = allFlights.length === 0;
   // 1. Chỉ định nghĩa Key (phải khớp với section đã lưu)
    const CACHE_KEY = "flights_vntk_cache_v1";

    useEffect(() => {
      const checkCache = () => {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data } = JSON.parse(cached);
            if (data && Array.isArray(data) && data.length > 0) {
              setAllFlights(data);
              setIsCheckingCache(false);
              return true; // Đã có data
            }
          }
        } catch (err) {
          console.error("Lỗi đọc Cache:", err);
        }
        return false; // Chưa có data
      };

      // 1. Check lần đầu ngay khi vào trang
      const hasData = checkCache();
      
      // 2. Nếu chưa có, thiết lập vòng lặp kiểm tra (polling) cho đến khi Header nạp xong
      if (!hasData) {
        const interval = setInterval(() => {
          const success = checkCache();
          if (success) clearInterval(interval); // Có data rồi thì ngừng check
        }, 500); // Check mỗi 0.5 giây

        return () => clearInterval(interval);
      }
    }, []);
        
  const searchFlights = (value:any) => {
    setQuery(value);
  
    if (!value.trim()) {
      setFilteredFlights([]);
      setShowSuggestions(false);
      return;
    }
  
    const keyword = value.toLowerCase();
    const filtered = allFlights
      .filter(f => f.title.toLowerCase().includes(keyword))
      .slice(0, 6);
  
    setFilteredFlights(filtered);
    setShowSuggestions(filtered.length > 0);
  };
  
    const searchContainerRef = useRef<HTMLDivElement>(null);
    // Thay dropdownRef bằng searchContainerRef
   useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  
  
  
    const [user, setUser] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            console.error("Lỗi parse user localStorage");
          }
        }
      }
    }, []);
  
    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setOpen(false); // 👈 Đóng dropdown khi click ngoài vùng
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);
  
  const handleSearchSubmit = () => {
  if (query.trim()) {
    setShowSuggestions(false); // Đóng danh sách gợi ý
    // Điều hướng sang trang search với query string
    router.push(`/search?q=${encodeURIComponent(query.trim())}`); 
    
    // Thu bàn phím mobile lại cho thoáng màn hình
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  }
};

// Hàm bổ trợ để bắt sự kiện phím Enter/Go
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSearchSubmit();
  }
};

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const router = useRouter();
  return (
    <div  className={styles.mobileContainer}>
    <div className={styles.searchSection} ref={searchContainerRef}>
      <div className={styles.searchBar}>
      <div className="position-relative w-100" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          type="text"
          className={`${styles.inputField}`}
          // Đổi placeholder khi đang đợi
          placeholder={isWaitingData ? "Đang khởi tạo dữ liệu..." : "Nhập nội dung tìm kiếm..."}
          value={query}
          autoComplete="off"
          
          // KHÓA INPUT
          disabled={isWaitingData}
          
          onChange={(e) => searchFlights(e.target.value)}
          onKeyDown={handleKeyDown}
          
          // THÊM STYLE CẤM VÀO ĐÂY
          style={{ 
            cursor: isWaitingData ? "not-allowed" : "text", 
            backgroundColor: isWaitingData ? "#f5f5f5" : "#fff",
            opacity: isWaitingData ? 0.7 : 1,
            transition: "all 0.3s"
          }}
        />
      </div>

      <button  
        onClick={(e) => {
          e.preventDefault(); 
          if (!isWaitingData) handleSearchSubmit();
        }} 
        className={styles.filterButton}
        // KHÓA NÚT
        disabled={isWaitingData}
        style={{ 
          cursor: isWaitingData ? "not-allowed" : "pointer",
          opacity: isWaitingData ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '40px'
        }}
      >
        {/* NẾU ĐANG ĐỢI CACHE THÌ HIỆN ICON XOAY, XONG THÌ HIỆN SLIDERS */}
        {isWaitingData ? (
          <Loader2 size={18} className="animate-spin text-primary" />
        ) : (
          <Search size={18} color="#666" />
        )}
      </button>
    </div>


      </div>

      {/* 🔽 GỢI Ý TÌM KIẾM  */}
      {showSuggestions && (
        <div className={styles.suggestionBox}>
          {loading ? (
            <div className="p-2 text-center small text-muted">Đang tải dữ liệu...</div>
          ) : filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <Link
                key={flight.id}
                href={`/${flight.slug}`}
                className={styles.suggestionItem}
                onMouseDown={(e) => e.stopPropagation()} // giữ menu không đóng
              >
                <img
                  src={flight.img}
                  alt={flight.title}
                  className={styles.suggestionImage}
                />

                <div className="flex-grow-1">
                  <div
                    className={styles.suggestionTitle}
                    dangerouslySetInnerHTML={{ __html: flight.title }}
                  />
                  {flight.price && (
                    <div className={styles.suggestionPrice}>
                      {flight.price.toLocaleString("vi-VN")} ₫
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : query.trim() ? (
            <div className="p-2 text-muted small text-center">Không tìm thấy kết quả</div>
          ) : null}
        </div>
      )}
    </div>
      {/* 🎯 Lưới dịch vụ */}
      <div className={styles.servicesSection}>
      <div className={styles.serviceGrid}>
        {services.map((service, index) => (
          <Link
            href={service.link}
            key={index}
            className={styles.serviceCard}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.serviceContent}>
              {service.discount && (
                <span className={styles.discountTag}>{service.discount}</span>
              )}
              <div
                className={styles.iconContainer}
                style={{ backgroundColor: service.bg }}
              >
                {service.icon}
              </div>
              <span className={styles.serviceName}>{service.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>

      {/* 🎁 Banner khuyến mãi */}
      <div className={`${styles.promoSection} container`}>
        <div className={`${styles.promoCard} row align-items-center`}>
          {/* Cột trái: Nội dung khuyến mãi */}
        <div className="col-12 d-flex align-items-center gap-2 col-md-4 mb-3 mb-md-0">
          {/* <div className={`${styles.promoText} d-flex align-items-center gap-2`}>
            <h3 className={styles.promoTitle}>Giảm 99k</h3>
            <p className={`${styles.promoDescription} mb-0`}>
              Chương trình ưu đãi bạn mới
            </p>
          </div>
          <button className={styles.promoButton}>Đặt vé ngay</button> */}
        </div>


    {/* Cột phải: Slide hình ảnh */}
    <div className="col-12 col-md-8">
      <div className={styles.slideWrapper}>
        <div className="slide-container position-relative">
          <img
            src={slides[current]}
            alt={`Slide ${current + 1}`}
            className="slide-image w-100 rounded"
          />

          {/* Overlay mờ */}
          <div className="slide-overlay"></div>

          {/* Indicators */}
          <div className="slide-indicators position-absolute bottom-2 start-50 translate-middle-x d-flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`indicator ${current === i ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
          </div>
        </div>
     </div>
      {/* 🔘 Nhóm nút hành động */}
      <div>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionButton} ${styles.primaryButton} ${
            activeTab === "search" ? styles.active : ""
          }`}
       onClick={() => {
          setActiveTab("search"); 
          router.push("/tim-kiem-chuyen-bay"); 
        }}
        >
          <Search size={16} />
          <span>Tìm chuyến bay</span>
        </button>

      
       <button
        className={`${styles.actionButton} ${styles.secondaryButton} ${
          activeTab === "promo" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("promo")}
      >
        <Link href="/khuyen-mai" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center", gap: "4px" }}>
          <Gift size={16} />
          <span>Ưu đãi</span>
        </Link>
      </button>
            
      </div>

      {/* 🔄 Hiển thị nội dung tương ứng */}
      <div className="render-search mt-3">
        {activeTab === "search" ? <PromoHome /> : <PromoHome />}
      </div>
    </div>
    </div>
  );
};

export default ServiceOptions;