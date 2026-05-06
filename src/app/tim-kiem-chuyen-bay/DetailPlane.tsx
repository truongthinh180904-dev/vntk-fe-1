"use client";

import React, { useState } from "react";
import FlightInfoPropsDetailCity from "../components/blog/detailplane/FlightInfoPropsDetailCity";
import FlightDealsOne from "../components/blog/detailplane/venoidia/FlightDealsWayOne"; 
import FlightDealsTwo from "../components/blog/detailplane/venoidia/FlightDealsWayTwo"; 
import FlightDealsSimilar from "../components/blog/detailplane/venoidia/FlightDealsWayTwoSimilar"; 
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demodanangImg from '../assets/img/home/vemaybaynoidia/danang.webp';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';

import imghaiphong from "../assets/img/country_img/ve-may-bay-hai-phong.jpg";
import imghue from "../assets/img/country_img/ve-may-bay-di-hue.jpg";
import imgphuquoc from "../assets/img/country_img/ve-may-bay-phu-quoc.jpg";
import imgnhatrang from "../assets/img/country_img/ve-may-bay-nha-trang.webp";
import imgquynhon from "../assets/img/country_img/ve-may-bay-quy-nhon.webp";
import imgtuyhoa from "../assets/img/country_img/ve-may-bay-tuy-hoa.png";
import imgthanhhoa from "../assets/img/country_img/ve-may-bay-thanh-hoa.jpg";
import imgcantho from "../assets/img/country_img/ve-may-bay-di-can-tho.jpg";
import imgvinh from "../assets/img/country_img/ve-may-bay-di-vinh.jpg";
import imgdonghoi from "../assets/img/country_img/ve-may-bay-di-dong-hoi.jpg";
import imgchulai from "../assets/img/country_img/ve-may-bay-di-chu-lai.jpg";
import imgpleiku from "../assets/img/country_img/ve-may-bay-di-pleiku.jpg";
import imgbuonmathuot from "../assets/img/country_img/ve-may-bay-di-buon-ma-thuoc.jpg";
import imgdalat from "../assets/img/country_img/ve-may-bay-di-da-lat.jpg";
import imgcamau from "../assets/img/country_img/ve-may-bay-di-ca-mau.jpg";
import imgrachgia from "../assets/img/country_img/ve-may-bay-di-rach-gia.webp";
import imgcondao from "../assets/img/country_img/ve-may-bay-di-con-dao.jpg";
import imgdienbien from "../assets/img/country_img/ve-may-bay-di-dien-bien.jpg";
import imgquangninh from "../assets/img/country_img/ve-may-bay-di-quang-ninh.jpg";
import { CreditCard, Headphones, House, Plane } from "lucide-react";
import NewsSection from "../ve-noi-dia/NewsSection";
import FeaturedPosts from "../components/home/FeaturedPosts";
import TravelInspiration from "../components/home/TravelInspiration";
import PopularDestinations from "../components/home/PopularDestinations";


// import FAQ from "../components/question/FAQ";
interface FlightInfo {
  from: string;
  to: string;
  dateStr:string;
  date: string;
  rawDate: { day: string; month: string; year: string };
}

interface DetailPlaneProps {
  wayOne: FlightInfo | null;
  wayTwo?: FlightInfo | null;
}
const DetailPlane: React.FC<DetailPlaneProps> = ({ wayOne, wayTwo }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);


// ================= VIỆT NAM AIRPORTS =================
const vnAirports: Record<
  string,
  { name: string; image: string | null }
> = {
    HAN: { name: "Hà Nội", image: demohanoiImg.src },
    SGN: { name: "Tp. Hồ Chí Minh", image: demotphcmImg.src },
    DAD: { name: "Đà Nẵng", image: demodanangImg.src },
    HPH: { name: "Hải Phòng", image: imghaiphong.src },
    HUI: { name: "Huế", image: imghue.src },
    PQC: { name: "Phú Quốc", image: imgphuquoc.src },
    CXR: { name: "Nha Trang", image: imgnhatrang.src },
    UIH: { name: "Quy Nhơn", image: imgquynhon.src },
    TBB: { name: "Tuy Hòa", image: imgtuyhoa.src },
    THD: { name: "Thanh Hóa", image: imgthanhhoa.src },
    VCA: { name: "Cần Thơ", image: imgcantho.src },
    VII: { name: "Vinh", image: imgvinh.src },
    VDH: { name: "Đồng Hới", image: imgdonghoi.src },
    VCL: { name: "Chu Lai", image: imgchulai.src },
    PXU: { name: "Pleiku", image: imgpleiku.src },
    BMV: { name: "Buôn Ma Thuột", image: imgbuonmathuot.src },
    DLI: { name: "Đà Lạt", image: imgdalat.src },
    CAH: { name: "Cà Mau", image: imgcamau.src },
    VKG: { name: "Rạch Giá", image: imgrachgia.src },
    VCS: { name: "Côn Đảo", image: imgcondao.src },
    DIN: { name: "Điện Biên", image: imgdienbien.src },
    VDO: { name: "Quảng Ninh", image: imgquangninh.src },

};

// Tạo mảng 5 mảng con, mỗi mảng 6 sân bay
const airportGroups = [
  // Nhóm 1
  [
    vnAirports.HAN,
    vnAirports.SGN,
    vnAirports.DAD,
    vnAirports.HPH,
    vnAirports.CXR,
    vnAirports.PQC
  ],
  // Nhóm 2
  [
    vnAirports.HAN,
    vnAirports.SGN,
    vnAirports.HUI,
    vnAirports.VII,
    vnAirports.DLI,
    vnAirports.VCA
  ],
  // Nhóm 3
  [
    vnAirports.HAN,
    vnAirports.SGN,
    vnAirports.UIH,
    vnAirports.BMV,
    vnAirports.VDH,
    vnAirports.THD
  ],
  // Nhóm 4
  [
    vnAirports.HAN,
    vnAirports.SGN,
    vnAirports.VCL,
    vnAirports.PXU,
    vnAirports.VKG,
    vnAirports.TBB
  ],
  // Nhóm 5
  [
    vnAirports.HAN,
    vnAirports.SGN,
    vnAirports.DIN,
    vnAirports.VDO,
    vnAirports.CAH,
    vnAirports.VCS
  ]
];
// Hàm lấy thông tin địa điểm
const getPlaceInfo = (code: string | undefined) => {
  if (!code) return null;
  return vnAirports[code.toUpperCase()] || { name: code, image: null };
};

// Gom dữ liệu chuyến bay
const routes: any[] = [];

if (wayOne) {
  routes.push({
    ...wayOne,
    fromInfo: getPlaceInfo(wayOne.from),
    toInfo: getPlaceInfo(wayOne.to),
  });
}

if (wayTwo) {
  routes.push({
    ...wayTwo,
    fromInfo: getPlaceInfo(wayTwo.from),
    toInfo: getPlaceInfo(wayTwo.to),
  });
}
  const images = [
    "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2977432/pexels-photo-2977432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];



// Hàm format ngày (dd/MM/yyyy)
const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, "0")}/${
    (date.getMonth() + 1).toString().padStart(2, "0")
  }/${date.getFullYear()}`;
};

// Parse string dd/MM/yyyy => Date
function parseDDMMYYYY(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

let flights: any[] = [];
let flights1: any[] = [];

if (wayOne) {
  const today = new Date();
  const oneWeek = new Date();
  oneWeek.setDate(today.getDate() + 7);

  const twoWeeks = new Date();
  twoWeeks.setDate(today.getDate() + 14);

  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  // ✅ Ngày user chọn (nếu có trong wayOne.date)
  let userDate: Date | null = null;
  if (wayOne.date) {
    userDate = parseDDMMYYYY(wayOne.date);
  }

  // Gom danh sách ngày (đi)
  const dates = [today, oneWeek, twoWeeks, nextMonth];
  if (userDate) {
    const isDuplicate = dates.some(
      (d) => formatDate(d) === formatDate(userDate as Date)
    );
    if (!isDuplicate) {
      dates.unshift(userDate);
    }
  }

  flights = dates.map((d, idx) => ({
    id: idx + 1,
    from: getPlaceInfo(wayOne.from)?.name || wayOne.from,
    to: getPlaceInfo(wayOne.to)?.name || wayOne.to,
    date: formatDate(d),
    price: 100,
    originalPrice: 100,
    description: `Giá tốt nhất ngày ${formatDate(d)}`,
    img: getPlaceInfo(wayOne.to)?.image || null,
  }));
}
// ✅ Sinh danh sách chuyến khứ hồi
if (wayOne) {
  let returnDate: Date | null = null;

  if (wayTwo && wayTwo.date) {
    // Nếu có ngày của wayTwo thì dùng
    returnDate = parseDDMMYYYY(wayTwo.date);
  } else if (wayOne.date) {
    // Nếu không có wayTwo thì fallback sang ngày của wayOne
    returnDate = parseDDMMYYYY(wayOne.date);
  }

  if (returnDate) {
    // Sinh thêm các mốc ngày
    const oneWeek = new Date(returnDate);
    oneWeek.setDate(returnDate.getDate() + 7);

    const twoWeeks = new Date(returnDate);
    twoWeeks.setDate(returnDate.getDate() + 14);

    const threeWeeks = new Date(returnDate);
    threeWeeks.setDate(returnDate.getDate() + 21);

    const nextMonth = new Date(returnDate);
    nextMonth.setMonth(returnDate.getMonth() + 1);

    const returnDates = [returnDate, oneWeek, twoWeeks, threeWeeks, nextMonth];

    flights1 = returnDates.map((d, idx) => ({
      id: idx + 1,
      from: getPlaceInfo(wayOne.to)?.name || wayOne.to, // đảo ngược
      to: getPlaceInfo(wayOne.from)?.name || wayOne.from,
      date: formatDate(d),
      price: 120,
      originalPrice: 120,
      description: `Giá tốt nhất ngày ${formatDate(d)}`,
      img: getPlaceInfo(wayOne.from)?.image || null,
    }));
  }
}
// ✅ Descriptions random cho đẹp SEO
const descriptions = [
  "Giá tốt nhất",
];

// ✅ Hàm random
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ✅ Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

let flights2: any[] = [];

if (wayOne) {
  // Chọn 1 nhóm random trong 5 nhóm
  const randomGroup = getRandomItem(airportGroups);

  // Lấy code điểm đến
  const toCode = wayOne.to;
  const fromCode = wayOne.to;

  // Nhóm sử dụng, ưu tiên giữ lại city "to"
  let groupToUse = randomGroup;
  if (randomGroup.some((city) => city === vnAirports[toCode])) {
    groupToUse = [
      vnAirports[toCode],
      ...randomGroup.filter((c) => c !== vnAirports[toCode]),
    ];
  }

  // ✅ Lọc bỏ city trùng với from/to
  const filteredCities = groupToUse.filter(
    (c) =>
      c?.name !== getPlaceInfo(toCode)?.name
  );

  // ✅ Shuffle, loại bỏ duplicate bằng Set, chọn 5 item
  const selectedCities = Array.from(
    new Set(shuffleArray(filteredCities))
  ).slice(0, 5);

  // ✅ Sinh flights3
  flights2 = selectedCities.map((city, idx) => ({
    id: idx + 1,
    from: getPlaceInfo(fromCode)?.name || fromCode,
    to: city?.name,
    date: formatDate(new Date(Date.now() + idx * 86400000)), // ngày tăng dần
    price: 90 + idx * 10,
    originalPrice: 120 + idx * 10,
    description: getRandomItem(descriptions),
    img: city?.image,
  }));
}

  return (
    <div className="container-fluid"  >
      <div className="container my-4" >
        {/* Info */}
       <div className="mt-3 position-relative">
        {wayOne && flights && (
          <>
     <ol
      className="breadcrumb breadcrumb-scroll"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap", // 🔥 Không cho xuống hàng
          overflowX: "auto", // 🔥 Cho phép cuộn ngang
          whiteSpace: "nowrap",
          gap: "8px", // 🔥 Thêm khoảng cách giữa các item

          color: "#4b86cf",
          padding: "10px 15px",
          background: "rgb(93 139 243)",
          borderRadius: "10px",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
          fontSize: "0.95rem",
          msOverflowStyle: "none",
          scrollbarWidth: "none", // ẩn scrollbar Firefox
          WebkitOverflowScrolling: "touch", // cuộn mượt iOS
        }}
  >
  {/* Trang chủ */}
  <li
    className="breadcrumb-item d-flex align-items-center"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    <House
      size={18}
      style={{
        color: "rgba(255, 255, 255, 0.9)",
        marginBottom: "2px",
      }}
    />
    <a
      href="/"
      className="breadcrumb-link"
      style={{
        color: "rgba(255, 255, 255, 0.9)",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "rgba(255,255,255,1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
      }
    >
      Trang chủ
    </a>
  </li>


  {/* Vé nội địa */}
  <li
    className="breadcrumb-item"
    style={{
      marginLeft: "10px",
    }}
  >
    <a
      href="/ve-noi-dia"
      className="breadcrumb-link"
      style={{
        color: "rgba(255, 255, 255, 0.85)",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "rgba(255,255,255,1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
      }
    >
      Vé nội địa
    </a>
  </li>

  {/* Vé cụ thể */}
  <li
    className="breadcrumb-item active"
    style={{
      color: "rgba(255, 255, 255, 1)",
      fontWeight: 600,
      marginLeft: "10px",
    }}
    aria-current="page"
  >
    Vé máy bay {flights[0].from} đi {flights[0].to}
  </li>
</ol>

          </>
        )}
      </div>
        {/* Modal (Bootstrap) */}
        <div
          className="modal fade"
          id="photoModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Photos of Jakarta</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center">
                <img  loading="lazy" 
                  src={images[activeIndex]}
                  alt="Main"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "420px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <img  loading="lazy" 
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      className={`rounded ${
                        i === activeIndex ? "border border-primary" : ""
                      }`}
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        cursor: "pointer"
                      }}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  {activeIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    {routes.length > 0 && (
      <>
      <FlightDealsOne flights={flights} /> 

      <FlightDealsTwo flights={flights1} />

      <FlightDealsSimilar flights={flights2} />
      <div className="mt-3 container position-relative" >
        {wayOne && flights && (
          <>
          <h2 className="fw-bold mt-5 text-heading"> Vé máy bay {flights[0].from} đi {flights[0].to} </h2> {/* Breadcrumb */} <nav aria-label="breadcrumb"> 
            </nav>        {/* Mô tả tuyến bay */}
          <div
            className="mt-3 description-wrapper"
            style={{
              maxHeight: expanded ? "none" : "120px",
              overflow: "hidden",
              position: "relative",
              transition: "max-height 0.3s ease",
              lineHeight: "1.8"
            }}
        >
       <p className="description">
        Đặt vé máy bay từ <strong>{flights[0].from}</strong> đi <strong>{flights[0].to}</strong> 
        {" "}cùng  <strong>VietNam Tickets </strong> để trải nghiệm dịch vụ bay chất lượng, nhanh chóng và thuận tiện.
        Đây là một trong những tuyến bay nội địa quan trọng, kết nối hai trung tâm du lịch – kinh tế lớn của Việt Nam.  
        Hành khách lựa chọn chặng bay này không chỉ bởi nhu cầu công tác, mà còn để tận hưởng kỳ nghỉ, thăm người thân 
        hay tham gia các sự kiện đặc biệt.  
        <br /><br />
        Khi đặt vé, bạn sẽ có nhiều sự lựa chọn về hãng hàng không, khung giờ bay, hạng vé và mức giá phù hợp với nhu cầu. 
        Ngoài ra, Viet Nam Tickets thường xuyên cập nhật các chương trình khuyến mãi hấp dẫn, 
        giúp bạn tiết kiệm chi phí nhưng vẫn đảm bảo chất lượng dịch vụ hàng đầu.
      </p>
        {!expanded && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "25px",
              background:
                "linear-gradient(to top, white 60%, rgba(255,255,255,0))"
            }}
          />
        )}
      </div>
        {/* Nút toggle */}
      <button
        className="btn btn-link toggle-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Thu gọn" : "Xem thêm"}
      </button>

      {/* Các chính sách & ưu điểm */}
    <div
  className="row mt-4 mb-5"
  style={{
    padding: "20px",
    borderRadius: "10px",
  }}
>
  {/* Cột 1 */}
  <div className="col-md-4 mb-3 mb-md-0">
    <div
      className="feature-card h-100"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <Plane className="feature-icon" size={28} color="#007bff" />
        <h6 className="fw-bold mb-0" style={{ fontSize: "15px" }}>
          Linh hoạt thay đổi
        </h6>
      </div>
      <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
        Bạn có thể dễ dàng hủy hoặc đổi chuyến khi kế hoạch thay đổi.
      </p>
    </div>
  </div>

  {/* Cột 2 */}
  <div className="col-md-4 mb-3 mb-md-0">
    <div
      className="feature-card h-100"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <CreditCard className="feature-icon" size={28} color="#007bff" />
        <h6 className="fw-bold mb-0" style={{ fontSize: "15px" }}>
          Thanh toán đa dạng
        </h6>
      </div>
      <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
        Hỗ trợ nhiều phương thức thanh toán tiện lợi và an toàn.
      </p>
    </div>
  </div>

  {/* Cột 3 */}
  <div className="col-md-4">
    <div
      className="feature-card h-100"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <Headphones className="feature-icon" size={28} color="#007bff" />
        <h6 className="fw-bold mb-0" style={{ fontSize: "15px" }}>
          Hỗ trợ 24/7
        </h6>
      </div>
      <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
        Đội ngũ VietNam Ticketsluôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.
      </p>
    </div>
  </div>
    </div>
    <FeaturedPosts />
    {/* <ContactSection /> */}
    <TravelInspiration />
     <PopularDestinations />
  
    </>
    
  )}
    </div>
      </>
  )}
      </div>
  );
};

export default DetailPlane;
