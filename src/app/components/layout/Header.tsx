"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from '../../assets/img/home/logo-vietnam-tickets.webp'
import slogan from '../../assets/img/home/layout-01.png'
import vi from '../../assets/img/home/vi.png'
import support from '../../assets/img/home/ellipse-1.png'
import { useRouter } from "next/navigation";
import icon_plane from '../../assets/img/home/icon-plane.png'
import {
  CircleUserRound,
  Search,
  Home,
  Plane,
  Newspaper,
  Tag,
  HelpCircle,
  PhoneCall,
  Wallet,
  Globe,
  AppWindow,
  LogOut,
  UserCog, 
  Gift,
  ShoppingBag,
  MapPin,
  X,
  Clock,
  Loader2
} from "lucide-react";
import axios from "axios";
import Image from "next/image";

// Helper: Chuyển tiếng Việt có dấu thành không dấu để search chuẩn hơn
const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function Header() {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("");
  const [allFlights, setAllFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isInitialLoading = loading && allFlights.length === 0;

  const CACHE_KEY = "flights_vntk_cache_v1";
  const CACHE_TTL = 2400 * 60 * 60 * 1000; // 24 giờ
  const BASE_CUSTOM_API = "https://admin.vietnam-tickets.com/wp-json/custom/v1/all-flights";
  const CHECK_VERSION_API = "https://admin.vietnam-tickets.com/wp-json/custom/v1/check-version";

  useEffect(() => {
    const loadFlights = async () => {
      try {
        // --- BƯỚC 1: CHECK CACHE ---
        const versionRes = await axios.get(CHECK_VERSION_API);
        const serverLastUpdate = versionRes.data.timestamp;
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (timestamp > serverLastUpdate && (Date.now() - timestamp < CACHE_TTL)) {
            setAllFlights(data);
            setProgress(100); // Đã có cache thì progress 100%
            return;
          }
        }

        // --- BƯỚC 2: FETCH TRANG 1 ---
        setLoading(true);
        const firstRes = await axios.get(BASE_CUSTOM_API, { params: { per_page: 500, page: 1 } });
        const { data: firstPageData, total_pages: totalPages } = firstRes.data;
        
        setAllFlights(firstPageData); 
        let temporaryData = [...firstPageData];
        
        // Cập nhật tiến trình sau trang 1
        setProgress(Math.round((1 / totalPages) * 100));

        // --- BƯỚC 3: TẢI CÁC TRANG CÒN LẠI ---
        if (totalPages > 1) {
          let completedPages = 1;
          const fetchPromises = [];

          for (let p = 2; p <= Math.min(totalPages, 50); p++) {
            const pRequest = axios.get(BASE_CUSTOM_API, { 
              params: { per_page: 500, page: p } 
            }).then(res => {
              if (res.data && res.data.data) {
                temporaryData = [...temporaryData, ...res.data.data];
                completedPages++;
                
                // ĐỒNG BỘ: Cập nhật cả dữ liệu và tiến trình %
                setProgress(Math.round((completedPages / totalPages) * 100));
                setAllFlights([...temporaryData]); 
              }
            });
            fetchPromises.push(pRequest);
          }
          await Promise.all(fetchPromises);
        }

        // --- BƯỚC 4: LƯU CACHE ---
        const uniqueFlights = Array.from(new Map(temporaryData.map(item => [item.id, item])).values());
        setAllFlights(uniqueFlights);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: uniqueFlights, timestamp: Date.now() }));
        setProgress(100);

      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setLoading(false);
      }
    };
    loadFlights();
  }, []);


  const searchFlights = (value: any) => {
  setQuery(value);

  if (!value.trim()) {
    setFilteredFlights([]);
    setShowSuggestions(false);
    return;
  }

  const keyword = value.toLowerCase();

  // 1. Thử lọc theo Danh mục trước
  // Giả sử dữ liệu bài viết có trường categories (mảng) hoặc category_name (chuỗi)
  let filtered = allFlights.filter(f => {
    const categories = f.categories || []; // Nếu là mảng
    const catName = f.category_name || ""; // Nếu là chuỗi đơn
    
    return typeof categories === 'object' 
      ? categories.some((c: any) => c.toLowerCase().includes(keyword))
      : catName.toLowerCase().includes(keyword);
  });

  // 2. Nếu không có kết quả danh mục, mới lọc theo Tiêu đề (Logic cũ)
  if (filtered.length === 0) {
    filtered = allFlights.filter(f => 
      f.title.toLowerCase().includes(keyword)
    );
  }

  const limitedResult = filtered.slice(0, 6);
  setFilteredFlights(limitedResult);
  setShowSuggestions(limitedResult.length > 0);
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
      // Nếu đang loading mà chưa có dữ liệu nào thì không cho chạy
      if (loading && allFlights.length === 0) return;

      if (query.trim()) {
        setShowSuggestions(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    };

    // Hàm bắt phím Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearchSubmit();
      }
    };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <header className="sticky-top" style={{zIndex:9999}}>
      {/* 🔹 Thanh topbar */}
      <div className="text-white d-none d-md-block" style={{backgroundColor:'rgb(3, 58, 176)',}}> 
      <div className="container d-flex justify-content-between align-items-center" style={{padding:'3px', borderRadius:'38px'}}>
        
        {/* Bên trái: Logo + Slogan + Search */}
        <div className="d-flex align-items-center flex-grow-1">
          <Link href="/" onClick={(e) => e.stopPropagation()} className="d-flex align-items-center text-white me-3" style={{paddingLeft:'5px'}}>  
           <Image
              src={slogan.src}
              alt="Viet Nam Tickets"
              width={245}
              height={50}
              priority
              fetchPriority="high"
            />
          </Link>
          
       <div
          className="position-relative"
          style={{ maxWidth: "230px", flex: 1 }}
          ref={searchContainerRef}  // ← Gắn ref vào đây
          onClick={(e) => {
            e.stopPropagation();   // ⬅ ngăn click lan lên cha
          }}
        >
      <div className="position-relative d-flex align-items-center">
      <input
        type="text"
        className={`form-control rounded-pill ps-3 pe-5 ${progress < 100 ? "bg-light text-muted" : ""}`}
        // Hiển thị phần trăm ngay trong placeholder để khách biết đang tải
        placeholder={progress < 100 ? `Đang tải dữ liệu (${progress}%)...` : "Nhập nội dung cần tìm..."}
        value={query}
        autoComplete="off"
        
        // CHỈ CHO NHẬP KHI ĐÃ TẢI XONG 100%
        disabled={progress < 100}
        
        onKeyDown={handleKeyDown}
        onChange={(e) => searchFlights(e.target.value)}
        style={{ 
          fontSize: '14px', 
          height: '36px', 
          transition: 'all 0.3s',
          cursor: progress < 100 ? 'not-allowed' : 'text' 
        }}
      />

      <div className="position-absolute end-0 me-3 d-flex align-items-center">
        {/* Nếu chưa xong 100% thì hiện icon xoay, xong rồi hiện kính lúp */}
        {progress < 100 ? (
          <Loader2 size={18} className="text-primary animate-spin" style={{animation: 'spin 1s linear infinite'}} />
        ) : (
          <Search size={18} className="text-muted cursor-pointer" onClick={handleSearchSubmit} />
        )}
      </div>

      {/* THANH TIẾN TRÌNH (Progress Bar) CHẠY DƯỚI CHÂN INPUT */}
      {progress > 0 && progress < 100 && (
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '0', 
            left: '15px', 
            right: '15px',
            height: '4px', 
            background: '#0d6efd', // Màu xanh thương hiệu của bạn
            width: `${progress}%`, 
            transition: 'width 0.4s ease',
            borderRadius: '2px'
          }} 
        />
      )}
    </div>
          {showSuggestions && (
            <div
              className="position-absolute bg-white border shadow-sm rounded-3 mt-1"
              style={{
                width: "350px",
                left: "50%",
                transform: "translateX(-50%)",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 99999,
              }}
             onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
                setFilteredFlights([]);
                setShowSuggestions(false);
              }}


            >
            {/* HEADER CỐ ĐỊNH */}
              <div
                className="d-flex justify-content-between align-items-center px-2 py-1"
                style={{
                  position: "sticky",
                  top: 0,
                  background: "white",
                  borderBottom: "1px solid #eee",
                  zIndex: 10,
                }}
              >
                <span className="small text-muted">Kết quả tìm kiếm</span>

                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSuggestions(false);
                  }}
                >
                  <X color="rgb(3, 58, 176)" size={22} />
                </div>
              </div>



              {loading ? (
                <div className="p-2 text-center small text-muted">
                  Đang tải dữ liệu...
                </div>
              ) : filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                 
                 <Link
                  key={flight.id}
                  href={`/${flight.slug}`}
                  className="d-flex align-items-center text-dark text-decoration-none p-2 hover-bg-light transition-all"
                  style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {/* Khung chứa ảnh cố định 80x60px */}
                  <div
                    className="me-3 rounded overflow-hidden flex-shrink-0"
                    style={{ 
                      width: "80px", 
                      height: "60px", 
                      position: "relative" 
                    }}
                  >
                    <img
                      src={flight.img}
                      alt={flight.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <div
                      className="fw-semibold text-truncate"
                      style={{ fontSize: "0.85rem", maxWidth: "220px" }}
                      dangerouslySetInnerHTML={{ __html: flight.title }}
                    />
                    {flight.price && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "0.85rem", fontWeight: 600 }}
                      >
                        {flight.price.toLocaleString("vi-VN")} ₫
                      </div>
                    )}
                  </div>
                </Link>
              
                ))
              ) : query.trim() ? (
                <div className="p-2 small text-muted text-center">
                  Không tìm thấy kết quả
                </div>
              ) : null}
            </div>
          )}
        </div>

        </div>

        {/* Bên phải: Login, Ngôn ngữ, Hotline, Đặt vé */}
        <div className="d-flex align-items-center">
              {user ? (
            // ✅ Nếu có user
        <div className="position-relative">
      {/* Nút user */}
      <div
        className="d-flex align-items-center text-white me-3"
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={() => setOpen(!open)}
      >
        {user.avatar ? (
          // ✅ Nếu có avatar thì hiển thị ảnh
        <Image
          src={user?.avatar || "/default-avatar.png"}
          alt={user?.name || "user"}
          className="rounded-circle me-2"
          style={{
            width: "30px",
            height: "30px",
            objectFit: "cover",
            border: "2px solid #fff",
          }}
          key={user?.avatar} // 🔥 quan trọng: ép React reload lại hình khi URL thay đổi
        />

        ) : (
          // ❌ Nếu chưa có avatar thì hiện icon mặc định
          <CircleUserRound
            className="me-2"
            color="rgb(90, 200, 255)" // xanh biển pastel
            size={24}
          />
        )}

        <span
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          {user.name?.length <= 8 ? `Xin chào, ${user.name}` : user.name}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="position-absolute start-0 mt-2 shadow-lg rounded-4 p-3"
          ref={userDropdownRef} 
          style={{
            backgroundColor:"white",
            minWidth: "320px",
            zIndex: 1000,
            border: "1px solid rgba(120,200,255,0.4)",
            boxShadow: "0 4px 10px rgba(120,200,255,0.3)",
            animation: "fadeIn 0.25s ease",
          }}
        >
        <div
            className="header-users rounded-4 p-3 mb-2"
            style={{
              background: "linear-gradient(145deg, rgb(148 218 243), #e2f7ff, #f0fbff)",
              borderBottom: "1px solid rgba(100,190,255,0.3)",
              width: "100%",
            }}
          >
            {/* Tên + hạng */}
            <div
              className="fw-bold text-dark mb-1 text-truncate"
              style={{
                fontSize: "16px",
                color: "#333",
                maxWidth: "100%",
              }}
            >
              {user.name}
            </div>
            <div
              className="text-muted small d-flex align-items-center"
              style={{ gap: "4px", color: "gray" }}
            >
              
              <b style={{ color: "rgb(0,150,220)" }}>{user.email}</b>
            </div>
          </div>


          <hr className="my-2" style={{ borderColor: "rgba(100,190,255,0.3)" }} />

          {/* Danh sách */}
            <ul className="list-unstyled mb-2" style={{ margin: 0 }}>
          {[
            { 
              icon: <UserCog size={20} color="#0EA5E9" />, 
              text: "Trang quản trị",
              link: "/user/dashboard",
            },
            { 
              icon: <ShoppingBag size={16} color="#F97316" />, 
              text: "Thông tin đơn hàng",
              link: "/user/thong-tin-don-hang"
            },
            { 
              icon: <Search size={16} color="#22C55E" />, 
              text: "Tra cứu vé máy bay",
              link: "/user/tra-cuu-ve-may-bay"
            },
            { 
              icon: <Clock size={16} color="rgb(255, 214, 125)" />, 
              text: "Bài viết đã xem",
              link: "/user/lich-su-xem-bai-viet"
            },
            { 
              icon: <MapPin size={16} color="#8B5CF6" />, 
              text: "Tour du lịch đã chọn",
              link: "/user/tour-da-chon"
            },
            { 
              icon: <Gift size={16} color="#EC4899" />, 
              text: "Khuyến mãi",
              link: "/khuyen-mai"
            }
          ].map((item, idx) => (
            <Link 
              key={idx} 
              href={item.link} 
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li
                className="dropdown-item-custom"
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#333",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget.style.background = "#dff5ff"),
                  (e.currentTarget.style.transform = "translateX(3px)"))
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget.style.background = "transparent"),
                  (e.currentTarget.style.transform = "translateX(0)"))
                }
                onClick={() => setOpen(false)}

              >
                {item.icon} {item.text}
              </li>
            </Link>
          ))}
        </ul>


          <hr className="my-2" style={{ borderColor: "rgba(100,190,255,0.3)" }} />

          {/* Nút đăng xuất */}
          <button
            className="btn w-100 rounded-pill py-1 fw-bold"
            style={{
              border: "1px solid #00aaff",
              color: "#0077cc",
              background: "white",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00aaff";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "#0077cc";
            }}
            onClick={handleLogout}
          >
            <LogOut size={16} className="me-1" /> Đăng xuất
          </button>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
          ) : (
            // ❌ Nếu chưa đăng nhập
            <>
              <CircleUserRound className="me-2" color="rgb(255, 214, 125)" />
              <Link
                href="/dang-nhap"
                className="text-white me-2"
                style={{ textDecoration: "none" }}
              >
                Đăng nhập
              </Link>
              <span className="text-white me-2">|</span>
              <Link
                href="/dang-nhap"
                className="text-white me-2"
                style={{ textDecoration: "none" }}
              >
                Đăng ký
              </Link>
            </>
          )}


          {/* Ngôn ngữ */}
          <div className="me-3">
            <Image src={vi.src} alt="AirBookings" height={20} width={20} className="me-2" />
            <span className="me-1">VI</span>
          </div>

        <div className="d-flex align-items-center p-2 rounded-pill  ">
          {/* Hotline */}
          <div className="d-flex align-items-center me-3 rounded-pill px-2 border border-white">
            <Image
              src={support.src} // thay hình avatar support của bạn
              alt="Hotline"
              className="rounded-circle me-2"
              width={30}
              height={30}
              style={{objectFit: "cover" }}
            />
            <div className="text-start">
              <small className="d-block" style={{color:'rgb(255, 255, 255)',fontSize:'12px'}}>Hỗ trợ 24/7</small>
              <div className="fw-bold" style={{color:'rgb(255, 214, 125)'}}>1900 3173</div>
            </div>
          </div>

          {/* Button đặt vé */}
          <Link
            href="/dat-ve"
            className="btn btn-warning fw-bold d-flex align-items-center rounded-pill px-3"
            style={{padding:'5px',color:'rgb(3, 58, 176)'}}
          >
            <Image src={icon_plane.src} alt="Đặt vé" height={35}  width={35} className="me-2" />
            Đặt vé máy bay
          </Link>
        </div>
        </div>
      </div>
      </div>
    {/* 🔹 Navbar mobile */}
      <nav className="navbar  d-block d-md-none  bg-white shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
         <Link href="/"  className="navbar-brand d-flex align-items-center">
        <Image
          src={logo.src}
          alt="Viet Nam Tickets"
          width={180}
          height={44}
          priority
          fetchPriority="high"
        />


            {/* <Image src={logo.src} alt="VietNam Tickets" height={50} width={180} className="me-2" /> */}
         </Link>

          {/* Hamburger */}
          <div
            className={`hamburger is-md ${isOpen ? "is-active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>
      </nav>

    {/* 🔹 Navbar  data-loader*/}
      <nav className="navbar d-none d-md-block navbar-expand-lg bg-white">
      <div className="container"> {/* Logo */}
         <Link  href="/" className="navbar-brand d-flex align-items-center">
            {/* <Image src={logo.src} alt="Logo Việt Nam Tickets" height={50} width={180} className="me-2" /> */}
            <Image
            src={logo.src}
            alt="VietNam Tickets"
            width={180}
            height={44}
            className="me-2"
          />

         </Link> {/* Toggle button (hamburger) */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button> {/* Menu */} 
          <div className="collapse navbar-collapse" id="mainNavbar" style={{marginLeft:'5rem'}}>
            <ul className="navbar-nav ms-2" >
              <li className="nav-item">
                <Link href="/" className="nav-link" prefetch={true} style={{justifyContent:'left',color:'#1f2022', fontSize: '1.2rem' ,fontWeight: '500'}}> Trang chủ  </Link>
              </li>
              <li className="nav-item dropdown">
                <Link href="/ve-noi-dia" className="nav-link" prefetch={true} role="button" style={{justifyContent:'left',color:'#1f2022', fontSize: '1.2rem' ,fontWeight: '500'}}> Vé máy bay nội địa </Link>
              </li>
              <li className="nav-item dropdown">
                <Link  href="/ve-quoc-te" className="nav-link" prefetch={true} role="button" style={{justifyContent:'left',color:'#1f2022', fontSize: '1.2rem' ,fontWeight: '500'}}> Vé máy bay quốc tế </Link>
              </li>
              <li className="nav-item">
                <Link  href="/tin-tuc" className="nav-link" prefetch={true} style={{justifyContent:'left',color:'#1f2022', fontSize: '1.2rem' ,fontWeight: '500'}}> Tin tức </Link>
              </li>
              <li className="nav-item">
                <Link  href="/khuyen-mai" className="nav-link" prefetch={true} style={{justifyContent:'left',color:'#1f2022', fontSize: '1.2rem' ,fontWeight: '500'}}> Khuyến mãi </Link>
              </li>
               <li className="nav-item">
                <Link  href="/lien-he" className="nav-link" prefetch={true} style={{justifyContent:'left',color:'#1f2022', fontSize: '1.2rem' ,fontWeight: '500'}}> Liên hệ </Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>


       <div className={`offcanvas-menu-custom ${isOpen ? "open" : ""}`}>
        <div className="menu-header-custom d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            {/* <Image src={logo.src} alt="VietNam Tickets" height={50} width={180} className="me-2" /> */}
            <Image
              src={logo.src}
              alt="VietNam Tickets"
              width={180}
              height={44}
              className="me-2"
            />
         </Link>
        </div>

        <ul className="list-unstyled px-4 py-3 mb-0">
          <li>
            <Link href="/" prefetch={true}  className="nav-link-custom" onClick={() => setIsOpen(false)}>
              <Home size={18} /> Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href="/ve-noi-dia"
              className="nav-link-custom"
              onClick={() => setIsOpen(false)}
              
            >
              <Plane size={18} /> Vé máy bay nội địa
            </Link>
          </li>
          <li>
            <Link
              href="/ve-quoc-te"
              className="nav-link-custom"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              
            >
              <Globe size={18} /> Vé máy bay quốc tế
            </Link>
          </li>
          <li>
            <Link
              href="/tin-tuc"
              className="nav-link-custom"
              onClick={() => setIsOpen(false)}
              prefetch={true}
            >
              <Newspaper size={18} /> Tin tức
            </Link>
          </li>
          <li>
            <Link
              href="/khuyen-mai"
              className="nav-link-custom text-danger fw-bold"
              onClick={() => setIsOpen(false)}
              prefetch={true}
            >
              <Tag size={18} /> Khuyến mãi
            </Link>
          </li>

         <li> <hr /> </li> 

          <li>
            <Link href="/lien-he"  onClick={() => setIsOpen(false)} className="nav-link-custom">
              <PhoneCall size={18} /> Hỗ trợ khách hàng
            </Link>
          </li>
          {/* <li>
            <Link href="#" className="nav-link-custom">
              <HelpCircle size={18} /> Trợ giúp
            </Link>
          </li> */}
          {/* <li>
            <Link href="#" className="nav-link-custom">
              <Wallet size={18} /> Tiền tệ:{" "}
              <span className="ms-auto text-secondary">VND</span>
            </Link>
          </li> */}
          <li>
            <Link href="#" className="nav-link-custom">
              <AppWindow size={18} /> Ngôn ngữ:{" "}
              <span className="ms-auto text-secondary">Tiếng Việt</span>
            </Link>
          </li>

          <li>
              <div className="d-flex align-items-center">
              {user ? (
            // ✅ Nếu có user
          <div className="position-relative">

            {/* Nút user */}
            <div
              className="d-flex align-items-center me-3"
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
              onClick={() => setOpen(!open)}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || "user"}
                  className="rounded-circle me-2"
                  style={{
                    width: "32px",
                    height: "32px",
                    objectFit: "cover",
                    border: "2px solid #e5f6ff",
                  }}
                  key={user.avatar}
                />
              ) : (
                <CircleUserRound
                  className="me-2"
                  color="#4bb7ff"
                  size={26}
                />
              )}

              <Link href="/user/dashboard"  onClick={() => setIsOpen(false)}>
                <span
                  style={{
                    color: "#333",
                    fontWeight: 600,
                    fontSize: "15px",
                    cursor: "pointer"
                  }}
                >
                  {user.name?.length <= 8 ? `Xin chào, ${user.name}` : user.name}
                </span>
              </Link>
            </div>

            {/* Animation */}
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-5px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
          ) : (
            // ❌ Nếu chưa đăng nhập
            <>
              <CircleUserRound className="me-2" color="rgb(255, 214, 125)" />
              <Link
                href="/dang-nhap"
                className="text-dark me-2"
                style={{ textDecoration: "none" }}
              >
                Đăng nhập
              </Link>
              <span className="text-dark me-2">|</span>
              <Link
                href="/dang-nhap"
                className="text-dark me-2"
                style={{ textDecoration: "none" }}
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
          </li>
        </ul>        
      </div>
    </header>
  );
}
