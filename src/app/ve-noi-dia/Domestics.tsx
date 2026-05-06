import FlightSearch from "./FlightSearch";
import SpecialDeals from "./SpecialDeals";
import './venoidia.css'
import DomesticFlights from './DomesticFlights'
import WhyChooseUs from "./WhyChooseUs";
import PopularFlights from "./PopularFlights";
import CheapFlights from "./CheapFlights";
import FeaturedDestinations from "./FeaturedDestinations";
import FlightDealsNew from "./FlightDealsNew";
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demodanangImg from '../assets/img/home/vemaybaynoidia/danang.webp';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';
import PopularDestinations from "./PopularDestinations";
import NewsSection from "./NewsSection";
import ZaloBenefits from "./ZaloBenefits";
import InfoBox from "./InfoBox";
import FlightSearchnew from "./FlightSearchDemo";
import danangImg from "../assets/img/domestic/da-nang.webp";
import hueImg from "../assets/img/domestic/hue.jpg";



interface FlightDeal {
  airline: string;
  from: string;
  to: string;
  dateRange: string;
  sale?:string;
  price: number;
  tripType: "khu-hoi" | "mot-chieu"; // ✅ thêm field này
}
export default async function Page() {
  

function getDynamic(offsetDays:number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${dayName}, ${date} Thg ${month}`;
}


  // --- Hàm xử lý ngày ---
function getDynamicDate(offsetDays: number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${date} Thg ${month}`;
}

function getDynamicDateRange(offsetDays: number, rangeDays: number = 5) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + offsetDays + 14);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + rangeDays);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const monthStart = startDate.getMonth() + 1;
  const monthEnd = endDate.getMonth() + 1;

  // Nếu khác tháng, hiển thị đủ tháng
  if (monthStart !== monthEnd) {
    return `${startDay} Thg ${monthStart} - ${endDay} Thg ${monthEnd}`;
  }
  return `${startDay} - ${endDay} Thg ${monthStart}`;
}

  // --- Mảng chuyến bay ---
const sampleDeals: FlightDeal[] = [
  // --- Một chiều (10 chuyến) ---
  {
    airline: "Vietnam Airlines",
    from: "TP HCM",
    to: "Hà Nội",
    dateRange: getDynamicDate(2),
    price: 1530000,
    sale: "20",
    tripType: "mot-chieu",
  },
  {
    airline: "VietJet Air",
    from: "TP HCM",
    to: "Đà Nẵng",
    dateRange: getDynamicDate(2),
    price: 1120000,
    tripType: "mot-chieu",
  },
  {
    airline: "Bamboo Airways",
    from: "Hà Nội",
    to: "TP HCM",
    dateRange: getDynamicDate(3),
    price: 1750000,
    tripType: "mot-chieu",
  },
  {
    airline: "Vietravel Airlines",
    from: "Hà Nội",
    to: "Đà Nẵng",
    dateRange: getDynamicDate(4),
    price: 1040000,
    tripType: "mot-chieu",
  },
  {
    airline: "Vietnam Airlines",
    from: "TP HCM",
    to: "Phú Quốc",
    dateRange: getDynamicDate(5),
    price: 1320000,
    sale: "20",
    tripType: "mot-chieu",
  },
  {
    airline: "VietJet Air",
    from: "Hà Nội",
    to: "Phú Quốc",
    dateRange: getDynamicDate(6),
    price: 1250000,
    tripType: "mot-chieu",
  },
  {
    airline: "Bamboo Airways",
    from: "TP HCM",
    to: "Huế (HUI)",
    dateRange: getDynamicDate(7),
    price: 960000,
    tripType: "mot-chieu",
  },
  {
    airline: "Vietnam Airlines",
    from: "Hà Nội",
    to: "Nha Trang",
    dateRange: getDynamicDate(8),
    price: 1420000,
    sale: "20",
    tripType: "mot-chieu",
  },
  {
    airline: "Vietravel Airlines",
    from: "TP HCM",
    to: "Đà Lạt",
    dateRange: getDynamicDate(9),
    price: 910000,
    tripType: "mot-chieu",
  },
  {
    airline: "VietJet Air",
    from: "Hà Nội",
    to: "Cần Thơ",
    dateRange: getDynamicDate(10),
    price: 1350000,
    tripType: "mot-chieu",
  },

  // --- Khứ hồi (10 chuyến) ---
  {
    airline: "Vietnam Airlines",
    from: "TP HCM",
    to: "Đà Nẵng",
    dateRange: getDynamicDateRange(11),
    price: 2120000,
    tripType: "khu-hoi",
  },
  {
    airline: "VietJet Air",
    from: "Hà Nội",
    to: "TP HCM",
    dateRange: getDynamicDateRange(12),
    price: 2310000,
    tripType: "khu-hoi",
  },
  {
    airline: "Bamboo Airways",
    from: "TP HCM",
    to: "Phú Quốc",
    dateRange: getDynamicDateRange(13),
    price: 2050000,
    tripType: "khu-hoi",
  },
  {
    airline: "Vietnam Airlines",
    from: "Hà Nội",
    to: "Đà Nẵng",
    dateRange: getDynamicDateRange(14),
    price: 1940000,
    tripType: "khu-hoi",
  },
  {
    airline: "Vietravel Airlines",
    from: "TP HCM",
    to: "Huế",
    dateRange: getDynamicDateRange(15),
    price: 1830000,
    tripType: "khu-hoi",
  },
  {
    airline: "Vietnam Airlines",
    from: "Hà Nội",
    to: "Phú Quốc",
    dateRange: getDynamicDateRange(16),
    price: 2250000,
    tripType: "khu-hoi",
  },
  {
    airline: "VietJet Air",
    from: "TP HCM",
    to: "Nha Trang",
    dateRange: getDynamicDateRange(17),
    price: 1720000,
    tripType: "khu-hoi",
  },
  {
    airline: "Bamboo Airways",
    from: "Hà Nội",
    to: "Đà Lạt",
    dateRange: getDynamicDateRange(18),
    price: 1610000,
    sale: "20",
    tripType: "khu-hoi",
  },
  {
    airline: "Vietnam Airlines",
    from: "TP HCM",
    to: "Cần Thơ",
    dateRange: getDynamicDateRange(19),
    price: 1890000,
    tripType: "khu-hoi",
  },
  {
    airline: "Vietravel Airlines",
    from: "Hà Nội",
    to: "Hải Phòng",
    dateRange: getDynamicDateRange(20),
    price: 1550000,
    sale: "20",
    tripType: "khu-hoi",
  },
];

const flightsnew = [
  // --- ĐẾN HÀ NỘI ---
  { id: 1, from: "TP. Hồ Chí Minh", to: "Hà Nội", date: getDynamic(2), price: 1130000, originalPrice: 1500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-ha-noi.jpg" },
  { id: 2, from: "Nha Trang", to: "Hà Nội", date: getDynamic(3), price: 1050000, originalPrice: 1400000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-nha-trang-ha-noi-1024x640.jpg" }, // Mảng a không có chặng này, giữ nguyên demo
  { id: 3, from: "Đà Nẵng", to: "Hà Nội", date: getDynamic(4), price: 870000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-hai-phong-1024x640.jpg" },

  // --- ĐẾN TP. HỒ CHÍ MINH ---
  { id: 4, from: "Hà Nội", to: "TP. Hồ Chí Minh", date: getDynamic(5), price: 1120000, originalPrice: 1480000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-sai-gon.jpg" },
  { id: 5, from: "Nha Trang", to: "TP. Hồ Chí Minh", date: getDynamic(6), price: 920000, originalPrice: 1250000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-nha-trang-sai-gon.jpg" }, // Mảng a không có chặng này, giữ nguyên demo
  { id: 6, from: "Huế", to: "TP. Hồ Chí Minh", date: getDynamic(7), price: 880000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-sai-gon-1024x640.jpg" },

  // --- ĐẾN ĐÀ NẴNG ---
  { id: 7, from: "TP. Hồ Chí Minh", to: "Đà Nẵng", date: getDynamic(8), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-da-nang-1024x614.jpg" },
  { id: 8, from: "Hà Nội", to: "Đà Nẵng", date: getDynamic(9), price: 970000, originalPrice: 1250000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-da-nang-1-1024x640.jpg" },
  { id: 9, from: "Huế", to: "Đà Nẵng", date: getDynamic(10), price: 670000, originalPrice: 850000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-da-nang-1024x640.jpg" },

  // --- ĐẾN HUẾ ---
  { id: 10, from: "TP. Hồ Chí Minh", to: "Huế", date: getDynamic(11), price: 990000, originalPrice: 1300000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-hue-1024x640.jpg" },
  { id: 11, from: "Hà Nội", to: "Huế", date: getDynamic(12), price: 890000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-hue.jpg" },
  { id: 12, from: "Đà Nẵng", to: "Huế", date: getDynamic(13), price: 660000, originalPrice: 850000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-da-nang-1024x640.jpg" },

  // --- PHẦN BÙ VÀO (ĐỂ ĐẢM BẢO TỐI THIỂU 3 ITEM/ĐỊA ĐIỂM) ---
  
  // ĐẾN PHÚ QUỐC
  { id: 13, from: "TP. Hồ Chí Minh", to: "Phú Quốc", date: getDynamic(3), price: 750000, originalPrice: 950000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/gia-ve-may-bay-sai-gon-phu-quoc-vietjet.jpg" },
  { id: 14, from: "Đà Nẵng", to: "Phú Quốc", date: getDynamic(5), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-di-phu-quoc-1024x640.jpg" },
  { id: 15, from: "Hà Nội", to: "Phú Quốc", date: getDynamic(8), price: 1350000, originalPrice: 1600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-phu-quoc-1024x640.jpg" },

  // ĐẾN NHA TRANG
  { id: 16, from: "TP. Hồ Chí Minh", to: "Nha Trang", date: getDynamic(2), price: 850000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-nha-trang.jpg" },
  { id: 17, from: "Hà Nội", to: "Nha Trang", date: getDynamic(4), price: 1250000, originalPrice: 1600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-gia-re-ha-noi-nha-trang-1024x512.jpg" },
  { id: 18, from: "Đà Nẵng", to: "Nha Trang", date: getDynamic(7), price: 820000, originalPrice: 1050000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-da-nang-di-nha-trang.jpg" },

  // ĐẾN QUY NHƠN
  { id: 19, from: "TP. Hồ Chí Minh", to: "Quy Nhơn", date: getDynamic(1), price: 900000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-quy-nhon-1024x640.jpg" },
  { id: 20, from: "Cần Thơ", to: "Quy Nhơn", date: getDynamic(9), price: 690000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-can-tho-quy-nhon-1024x640.jpg" },
  { id: 21, from: "Đà Nẵng", to: "Quy Nhơn", date: getDynamic(11), price: 700000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-quy-nhon-1024x640.jpg" },
];
 
 
  return (
    <>
   <FlightSearchnew />
   <SpecialDeals />
   <PopularFlights />
   <DomesticFlights />
   <CheapFlights deals={sampleDeals}/>
   <FlightDealsNew flights={flightsnew} title="Deal hot - Vé máy bay nổi bật!" />
   <ZaloBenefits />
   <NewsSection />
   {/* <FlightSearchnew /> */}
   <PopularDestinations />

   </>
  );
}
