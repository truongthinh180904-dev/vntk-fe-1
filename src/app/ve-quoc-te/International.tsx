import FlightSearch from "./FlightSearch";
import './vequocte.css'
import PopularFlights from "./PopularFlights";
import FlightDealsNew from "./FlightDealsNew";
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import PopularDestinations from "./PopularDestinations";
import NewsSection from "./NewsSection";
import TravelInspiration from "./TravelInspiration";
import TravelSuggestion from "./TravelSuggestion";
import PromoBanner from "./PromoBanner";
import BlogInternaltion from "./BlogInternational";


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
  function getDynamicDate(offsetDays: number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${dayName}, ${date} Thg ${month}`;
}

const flightsnew = [
  // ===== 🇹🇭 Thái Lan =====
  { id: 1, from: "TP. Hồ Chí Minh", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(1), price: 2300000, originalPrice: 3000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-bangkok-1024x640.jpg" }, // Mảng a chỉ có Vinh/HN/ĐN đi Bangkok
  { id: 2, from: "Hà Nội", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(2), price: 2200000, originalPrice: 2950000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-bangkok-1024x667.jpg" },
  { id: 3, from: "Đà Nẵng", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(3), price: 2250000, originalPrice: 2980000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-da-nang-bangkok-1024x640.jpg" },
  { id: 4, from: "TP. Hồ Chí Minh", to: "Phuket", country: "Thái Lan", date: getDynamicDate(5), price: 2600000, originalPrice: 3300000, img: demohanoiImg.src },
  { id: 5, from: "Hà Nội", to: "Chiang Mai", country: "Thái Lan", date: getDynamicDate(6), price: 2500000, originalPrice: 3200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-da-nang-bangkok-1024x640.jpg" },
  { id: 6, from: "Đà Nẵng", to: "Phuket", country: "Thái Lan", date: getDynamicDate(8), price: 2550000, originalPrice: 3250000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-da-nang-di-phuket-1024x640.jpg" },

  // ===== 🇰🇷 Hàn Quốc =====
  { id: 7, from: "TP. Hồ Chí Minh", to: "Seoul", country: "Hàn Quốc", date: getDynamicDate(10), price: 5900000, originalPrice: 7200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-seoul-1024x640.jpg" },
  { id: 8, from: "Hà Nội", to: "Seoul", country: "Hàn Quốc", date: getDynamicDate(11), price: 5700000, originalPrice: 7100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-seoul-1024x597.jpg" },
  { id: 9, from: "Đà Nẵng", to: "Seoul", country: "Hàn Quốc", date: getDynamicDate(13), price: 5800000, originalPrice: 7150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-da-nang-seoul-1024x640.jpg" },
  { id: 10, from: "TP. Hồ Chí Minh", to: "Busan", country: "Hàn Quốc", date: getDynamicDate(14), price: 6000000, originalPrice: 7400000, img: demohanoiImg.src },
  { id: 11, from: "Hà Nội", to: "Jeju", country: "Hàn Quốc", date: getDynamicDate(15), price: 6100000, originalPrice: 7500000, img: demohanoiImg.src },
  { id: 12, from: "Đà Nẵng", to: "Busan", country: "Hàn Quốc", date: getDynamicDate(16), price: 6050000, originalPrice: 7450000, img: demohanoiImg.src },

  // ===== 🇯🇵 Nhật Bản =====
  { id: 13, from: "TP. Hồ Chí Minh", to: "Tokyo", country: "Nhật Bản", date: getDynamicDate(18), price: 9200000, originalPrice: 11000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hcm-tokyo-1024x640.jpg" },
  { id: 14, from: "Hà Nội", to: "Tokyo", country: "Nhật Bản", date: getDynamicDate(19), price: 9000000, originalPrice: 10800000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-tokyo.jpg" },
  { id: 15, from: "Đà Nẵng", to: "Tokyo", country: "Nhật Bản", date: getDynamicDate(20), price: 9100000, originalPrice: 10900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-tokyo.jpg" },
  { id: 16, from: "TP. Hồ Chí Minh", to: "Osaka", country: "Nhật Bản", date: getDynamicDate(21), price: 9300000, originalPrice: 11200000, img: demohanoiImg.src },
  { id: 17, from: "Hà Nội", to: "Nagoya", country: "Nhật Bản", date: getDynamicDate(22), price: 9400000, originalPrice: 11300000, img: demohanoiImg.src },
  { id: 18, from: "Đà Nẵng", to: "Osaka", country: "Nhật Bản", date: getDynamicDate(23), price: 9350000, originalPrice: 11250000, img: demohanoiImg.src },

  // ===== 🇨🇳 Trung Quốc =====
  { id: 19, from: "TP. Hồ Chí Minh", to: "Bắc Kinh", country: "Trung Quốc", date: getDynamicDate(24), price: 6600000, originalPrice: 8000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-bac-kinh-1024x640.jpg" },
  { id: 20, from: "Đà Nẵng", to: "Guangzhou", country: "Trung Quốc", date: getDynamicDate(25), price: 4200000, originalPrice: 5600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-di-quang-chau-1024x640.jpg" },
  { id: 21, from: "Hà Nội", to: "Thượng Hải", country: "Trung Quốc", date: getDynamicDate(26), price: 5800000, originalPrice: 7200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-thuong-hai-trung-quoc-1024x634.jpg" },
  { id: 22, from: "TP. Hồ Chí Minh", to: "Shanghai", country: "Trung Quốc", date: getDynamicDate(27), price: 6100000, originalPrice: 7600000, img: demohanoiImg.src },
  { id: 23, from: "Hà Nội", to: "Beijing", country: "Trung Quốc", date: getDynamicDate(28), price: 6400000, originalPrice: 7900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-bac-kinh-1024x640.jpg" },
  { id: 24, from: "Đà Nẵng", to: "Guangzhou", country: "Trung Quốc", date: getDynamicDate(29), price: 4300000, originalPrice: 5700000, img: demohanoiImg.src },

  // ===== 🇫🇷 Pháp =====
  { id: 25, from: "TP. Hồ Chí Minh", to: "Paris", country: "Pháp", date: getDynamicDate(30), price: 14800000, originalPrice: 18000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-paris-1024x640.jpg" },
  { id: 26, from: "Hà Nội", to: "Paris", country: "Pháp", date: getDynamicDate(31), price: 14500000, originalPrice: 17800000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-paris-1024x614.jpg" },
  { id: 27, from: "Đà Nẵng", to: "Paris", country: "Pháp", date: getDynamicDate(32), price: 14600000, originalPrice: 17900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-paris-1024x640.jpg" },
  { id: 28, from: "TP. Hồ Chí Minh", to: "Nice", country: "Pháp", date: getDynamicDate(33), price: 15000000, originalPrice: 18200000, img: demohanoiImg.src },
  { id: 29, from: "Hà Nội", to: "Lyon", country: "Pháp", date: getDynamicDate(34), price: 14900000, originalPrice: 18100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-lyon-1024x640.jpg" },
  { id: 30, from: "Đà Nẵng", to: "Marseille", country: "Pháp", date: getDynamicDate(35), price: 14700000, originalPrice: 18000000, img: demohanoiImg.src },

  // ===== 🇩🇪 Đức =====
  { id: 31, from: "TP. Hồ Chí Minh", to: "Frankfurt", country: "Đức", date: getDynamicDate(36), price: 14000000, originalPrice: 17000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-sai-gon-frankfurt-re-1024x640.jpg" },
  { id: 32, from: "Hà Nội", to: "Frankfurt", country: "Đức", date: getDynamicDate(37), price: 13700000, originalPrice: 16800000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-frankfurt-1024x614.jpg" },
  { id: 33, from: "TP. Hồ Chí Minh", to: "Munich", country: "Đức", date: getDynamicDate(38), price: 14100000, originalPrice: 17200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-tphcm-di-munich-re-1024x640.jpg" },

  // ===== 🇬🇧 Anh =====
  { id: 34, from: "TP. Hồ Chí Minh", to: "London", country: "Anh", date: getDynamicDate(39), price: 15200000, originalPrice: 18500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-london-hang-eva-air.jpg" },
  { id: 35, from: "Hà Nội", to: "London", country: "Anh", date: getDynamicDate(40), price: 15000000, originalPrice: 18300000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-londo-1024x640.jpg" },
  { id: 36, from: "Đà Nẵng", to: "London", country: "Anh", date: getDynamicDate(41), price: 15100000, originalPrice: 18400000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-london-1024x640.jpg" },

  // ===== 🇺🇸 Mỹ =====
  { id: 37, from: "TP. Hồ Chí Minh", to: "Los Angeles", country: "Mỹ", date: getDynamicDate(42), price: 17000000, originalPrice: 21000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-tphcm-di-los-angeles-1024x640.jpg" },
  { id: 38, from: "Hà Nội", to: "San Francisco", country: "Mỹ", date: getDynamicDate(43), price: 16800000, originalPrice: 20800000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-san-francisco-1-1024x640.jpg" },
  { id: 39, from: "Đà Nẵng", to: "New York", country: "Mỹ", date: getDynamicDate(44), price: 17200000, originalPrice: 21200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-di-new-york-1024x640.jpg" },

  // ===== 🇸🇬 Singapore =====
  { id: 40, from: "TP. Hồ Chí Minh", to: "Singapore", country: "Singapore", date: getDynamicDate(45), price: 2600000, originalPrice: 3500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-singapore-1024x640.jpg" },
  { id: 41, from: "Hà Nội", to: "Singapore", country: "Singapore", date: getDynamicDate(46), price: 2500000, originalPrice: 3400000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-di-singapore-1024x640.jpg" },
  { id: 42, from: "Đà Nẵng", to: "Singapore", country: "Singapore", date: getDynamicDate(47), price: 2550000, originalPrice: 3450000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-da-nang-singapore-1024x640.jpg" },
];

  return (
    <>
   <FlightSearch />
   <PromoBanner />
   <TravelInspiration />
   <TravelSuggestion />
   <PopularFlights />
   <FlightDealsNew flights={flightsnew} title="Deal hot - Vé máy bay nổi bật!" />
   <BlogInternaltion  />
   <NewsSection />
   <PopularDestinations />
   </>
  );
}
