"use client"; // ✅ thêm dòng này ở đầu

import ClientWrapper from "./ClientWrapper";
import danangImg from "../assets/img/domestic/da-nang.webp";
import hueImg from "../assets/img/domestic/hue.jpg";
import demohanoiImg from '../assets/img/home/vemaybaynoidia/hanoi.jpg';
import demodanangImg from '../assets/img/home/vemaybaynoidia/danang.webp';
import demotphcmImg from '../assets/img/home/vemaybaynoidia/TpHCM.jpg';

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
  { id: 1, from: "TP HCM", to: "Hà Nội", date: getDynamic(2), price: 1130000, originalPrice: 1500000, img: demohanoiImg.src },
  { id: 2, from: "Nha Trang", to: "Hà Nội", date: getDynamic(3), price: 1050000, originalPrice: 1400000, img: demohanoiImg.src },
  { id: 3, from: "Đà Nẵng", to: "Hà Nội", date: getDynamic(4), price: 870000, originalPrice: 1150000, img: demohanoiImg.src },
  { id: 4, from: "Hà Nội", to: "TP. Hồ Chí Minh", date: getDynamic(5), price: 1120000, originalPrice: 1480000, img: demotphcmImg.src },
  { id: 5, from: "Cần Thơ", to: "TP. Hồ Chí Minh", date: getDynamic(6), price: 920000, originalPrice: 1250000, img: demotphcmImg.src },
  { id: 6, from: "Huế", to: "TP. Hồ Chí Minh", date: getDynamic(7), price: 880000, originalPrice: 1150000, img: demotphcmImg.src },

  // --- ĐẾN ĐÀ NẴNG ---
  { id: 7, from: "TP. Hồ Chí Minh", to: "Đà Nẵng", date: getDynamic(8), price: 950000, originalPrice: 1200000, img: danangImg.src },
  { id: 8, from: "Hà Nội", to: "Đà Nẵng", date: getDynamic(9), price: 970000, originalPrice: 1250000, img: danangImg.src },
  { id: 9, from: "Huế", to: "Đà Nẵng", date: getDynamic(10), price: 670000, originalPrice: 850000, img: danangImg.src },

  // --- ĐẾN HUẾ ---
  { id: 10, from: "TP. Hồ Chí Minh", to: "Huế", date: getDynamic(11), price: 990000, originalPrice: 1300000, img: hueImg.src },
  { id: 11, from: "Hà Nội", to: "Huế", date: getDynamic(12), price: 890000, originalPrice: 1150000, img: hueImg.src },
  { id: 12, from: "Đà Nẵng", to: "Huế", date: getDynamic(13), price: 660000, originalPrice: 850000, img: hueImg.src },
];
 

  return <ClientWrapper sampleDeals={sampleDeals} flightsnew={flightsnew} />;
}
