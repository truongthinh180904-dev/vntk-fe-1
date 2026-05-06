"use client";

import HeroBanner from './components/home/HeroBanner';
import PromoCodes from './components/home/PromoCodes';
import PopularFlights from './components/home/PopularFlights';
import './components/home/home.css';
import { useEffect, useState } from 'react';
import FlightDeals from './components/home/FlightDeals';
import FlightDealsNew from './components/home/FlightDealsNew';
import FlightDealsInternational from './components/home/FlightDealsInternational';
import PartnerDeals from './components/home/PartnerDeals';
import { Plane } from 'lucide-react';
import Testimonials from './components/home/Testimonials';
import FeaturedPosts from './components/home/FeaturedPosts';
import AwardsSection from './components/home/AwardsSection';
import WorldDestinations from './components/home/WorldDestinations';
import PopularDestinations from './components/home/PopularDestinations';
import PromoBanner from './components/home/PromoBanner';
import BlogInternational from './ve-quoc-te/BlogInternational';
import blogcard from './assets/img/international/Ve-ma-y-bay-i-Muang-Namo.jpg';
import TravelInspiration from './components/home/TravelInspiration';

import tphcmImg from "./assets/img/domestic/Tp-HCM.jpg";
import hanoiImg from "./assets/img/domestic/hanoi.jpg";
import danangImg from "./assets/img/domestic/da-nang.webp";
import hueImg from "./assets/img/domestic/hue.jpg";
import phuquocImg from "./assets/img/domestic/phu-quoc.jpg";
import nhatrangImg from "./assets/img/domestic/nha-trang.jpg";
import quynhonImg from "./assets/img/domestic/quy-nhon.jpg";
import phuyenImg from "./assets/img/domestic/phu-yen.jpg";
import haiphongImg from "./assets/img/domestic/hai-phong.jpg";
import canthoImg from "./assets/img/domestic/can-tho.jpg";




import imgnewyork from "./assets/img/country_img/ve-may-bay-di-new-york.jpg";
import imgtokyo from "./assets/img/country_img/ve-may-bay-di-Tokyo.jpg";
import imgseoul from "./assets/img/country_img/ve-may-bay-di-seoul.webp";
import imgbangkok from "./assets/img/country_img/ve-may-bay-di-bangkok.webp";
import imgkl from "./assets/img/country_img/ve-may-bay-di-kuala_lumpur.jpg";
import imgsingapore from "./assets/img/country_img/ve-may-bay-di-singapore.jpg";
import imglondon from "./assets/img/country_img/ve-may-bay-di-london.jpg";
import imgparis from "./assets/img/country_img/ve-may-bay-di-paris.jpg";
import imgfrankfurt from "./assets/img/country_img/ve-may-bay-di-Frankfurt.jpg";
import imgsydney from "./assets/img/country_img/ve-may-bay-di-sysney.jpg";
import imgbeijing from "./assets/img/country_img/ve-may-bay-di-Bac kinh.jpg";
import imgdubai from "./assets/img/country_img/ve-may-bay-Dubai.png";

import axios from 'axios';
import { Metadata } from 'next';


interface FlightDeal {
  airline: string;
  from: string;
  to: string;
  dateRange: string;
  sale?:string;
  price: number;
  tripType: "khu-hoi" | "mot-chieu"; // ✅ thêm field này
}




export default function HomePage() {

   

// Hàm sinh ngày có định dạng "T3, 22 Thg10"
function getDynamicDate(offsetDays:number) {
  const today = new Date();
  today.setDate(today.getDate() + offsetDays + 14);

  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const month = today.getMonth() + 1;

  return `${dayName}, ${date} Thg ${month}`;
}
const flightsnew = [
  // ĐẾN HÀ NỘI
  { id: 1, from: "TP. Hồ Chí Minh", to: "Hà Nội", date: getDynamicDate(1), price: 1150000, originalPrice: 1450000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-ha-noi.jpg"},
  { id: 2, from: "Đà Nẵng", to: "Hà Nội", date: getDynamicDate(3), price: 850000, originalPrice: 1050000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-hai-phong-1024x640.jpg" },
  { id: 3, from: "Huế", to: "Hà Nội", date: getDynamicDate(5), price: 870000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-hue-ha-noi-1024x640.jpg" },
  { id: 4, from: "Phú Quốc", to: "Hà Nội", date: getDynamicDate(7), price: 1350000, originalPrice: 1600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-phu-quoc-ha-noi-1024x640.jpg" },

  // ĐẾN TP. HỒ CHÍ MINH
  { id: 5, from: "Hà Nội", to: "TP. Hồ Chí Minh", date: getDynamicDate(2), price: 1150000, originalPrice: 1500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-sai-gon.jpg" },
  { id: 6, from: "Seattle", to: "TP. Hồ Chí Minh", date: getDynamicDate(4), price: 890000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-seattle-ve-tphcm-1024x640.jpg" },
  { id: 7, from: "Huế", to: "TP. Hồ Chí Minh", date: getDynamicDate(6), price: 980000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-sai-gon-1024x640.jpg" },
  { id: 8, from: "Sydney", to: "TP. Hồ Chí Minh", date: getDynamicDate(8), price: 650000, originalPrice: 850000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-sydney-ve-sai-gon-1024x640.jpg" },

  // ĐẾN ĐÀ NẴNG
  { id: 9, from: "TP. Hồ Chí Minh", to: "Đà Nẵng", date: getDynamicDate(3), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-da-nang-1024x614.jpg" },
  { id: 10, from: "Hà Nội", to: "Đà Nẵng", date: getDynamicDate(5), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-da-nang-1-1024x640.jpg" },
  { id: 11, from: "Huế", to: "Đà Nẵng", date: getDynamicDate(9), price: 650000, originalPrice: 850000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-da-nang-1024x640.jpg" },
  { id: 12, from: "Phú Quốc", to: "Đà Nẵng", date: getDynamicDate(11), price: 830000, originalPrice: 1050000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-phu-quoc-da-nang-1024x640.jpg" },

  // ĐẾN HUẾ
  { id: 13, from: "TP. Hồ Chí Minh", to: "Huế", date: getDynamicDate(4), price: 980000, originalPrice: 1250000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-hue-1024x640.jpg" },
  { id: 14, from: "Hà Nội", to: "Huế", date: getDynamicDate(6), price: 870000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-hue.jpg" },
  { id: 15, from: "Đà Nẵng", to: "Huế", date: getDynamicDate(10), price: 650000, originalPrice: 850000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hue-da-nang-1024x640.jpg" },
  { id: 16, from: "Vinh", to: "Huế", date: getDynamicDate(12), price: 890000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-vinh-hue-1024x640.jpg" },

  // ĐẾN PHÚ QUỐC
  { id: 17, from: "TP. Hồ Chí Minh", to: "Phú Quốc", date: getDynamicDate(3), price: 750000, originalPrice: 950000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/gia-ve-may-bay-sai-gon-phu-quoc-vietjet.jpg" },
  { id: 18, from: "Đà Nẵng", to: "Phú Quốc", date: getDynamicDate(5), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-di-phu-quoc-1024x640.jpg" },
  { id: 19, from: "Hà Nội", to: "Phú Quốc", date: getDynamicDate(8), price: 1350000, originalPrice: 1600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-phu-quoc-1024x640.jpg" },
  { id: 20, from: "Cần Thơ", to: "Phú Quốc", date: getDynamicDate(10), price: 720000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-can-tho-phu-quoc-1.jpg" },

  // ĐẾN NHA TRANG
  { id: 21, from: "TP. Hồ Chí Minh", to: "Nha Trang", date: getDynamicDate(2), price: 850000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-nha-trang.jpg" },
  { id: 22, from: "Hà Nội", to: "Nha Trang", date: getDynamicDate(4), price: 1250000, originalPrice: 1600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-gia-re-ha-noi-nha-trang-1024x512.jpg" },
  { id: 23, from: "Đà Nẵng", to: "Nha Trang", date: getDynamicDate(7), price: 820000, originalPrice: 1050000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-da-nang-di-nha-trang.jpg" },
  { id: 24, from: "Vinh", to: "Nha Trang", date: getDynamicDate(9), price: 750000, originalPrice: 950000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-vinh-nha-trang-1024x640.jpg" },

  // ĐẾN QUY NHƠN
  { id: 25, from: "TP. Hồ Chí Minh", to: "Quy Nhơn", date: getDynamicDate(1), price: 900000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-quy-nhon-1024x640.jpg" },
  { id: 26, from: "Hải Phòng", to: "Quy Nhơn", date: getDynamicDate(5), price: 1050000, originalPrice: 1300000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-hai-phong-quy-nhon-1024x640.jpg" },
  { id: 27, from: "Cần Thơ", to: "Quy Nhơn", date: getDynamicDate(9), price: 690000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-can-tho-quy-nhon-1024x640.jpg" },
  { id: 28, from: "Đà Nẵng", to: "Quy Nhơn", date: getDynamicDate(11), price: 700000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-quy-nhon-1024x640.jpg" },

  // ĐẾN PHÚ YÊN
  { id: 29, from: "TP. Hồ Chí Minh", to: "Phú Yên", date: getDynamicDate(3), price: 870000, originalPrice: 1100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-phu-yen-1024x640.jpg" },
  { id: 30, from: "Hà Nội", to: "Phú Yên", date: getDynamicDate(5), price: 1200000, originalPrice: 1450000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-ha-noi-phu-yen.jpg" },
  { id: 31, from: "Đà Nẵng", to: "Phú Yên", date: getDynamicDate(9), price: 830000, originalPrice: 1050000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-phu-yen-1024x640.jpg" },
  { id: 32, from: "Đà Lạt", to: "Phú Yên", date: getDynamicDate(11), price: 690000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-lat-phu-yen-1024x640.jpg" },

  // ĐẾN HẢI PHÒNG
  { id: 33, from: "TP. Hồ Chí Minh", to: "Hải Phòng", date: getDynamicDate(2), price: 1180000, originalPrice: 1450000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-hai-phong-1.jpg" },
  { id: 34, from: "Đà Nẵng", to: "Hải Phòng", date: getDynamicDate(6), price: 970000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-hai-phong-1-1024x640.jpg" },
  { id: 35, from: "Hà Nội", to: "Hải Phòng", date: getDynamicDate(9), price: 950000, originalPrice: 1200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-hai-phong-1024x640.jpg" },
  { id: 36, from: "Phú Quốc", to: "Hải Phòng", date: getDynamicDate(11), price: 1380000, originalPrice: 1650000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-phu-quoc-hai-phong-1024x640.jpg" },

  // ĐẾN CẦN THƠ
  { id: 37, from: "TP. Hồ Chí Minh", to: "Cần Thơ", date: getDynamicDate(3), price: 600000, originalPrice: 800000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-can-tho-1024x640.jpg" },
  { id: 38, from: "Nha Trang", to: "Cần Thơ", date: getDynamicDate(5), price: 1300000, originalPrice: 1600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-nha-trang-can-tho-1024x640.jpg" },
  { id: 39, from: "Đà Nẵng", to: "Cần Thơ", date: getDynamicDate(8), price: 950000, originalPrice: 1150000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-can-tho-1024x640.jpg" },
  { id: 40, from: "Phú Quốc", to: "Cần Thơ", date: getDynamicDate(10), price: 720000, originalPrice: 900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-phu-quoc-can-tho-1024x640.jpg" },
];


const flightsqt = [
  // ===== Thái Lan =====
  { id: 1, from: "Vinh", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(0), price: 2200000, originalPrice: 3000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-vinh-di-bangkok-1024x640.jpg" },
  { id: 2, from: "Hà Nội", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(1), price: 2100000, originalPrice: 2900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-bangkok-1024x667.jpg" },
  { id: 3, from: "Đà Nẵng", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(2), price: 2150000, originalPrice: 2950000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-da-nang-bangkok-1024x640.jpg" },
  { id: 4, from: "Đà Nẵng", to: "Phuket", country: "Thái Lan", date: getDynamicDate(3), price: 2500000, originalPrice: 3200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-da-nang-di-phuket-1024x640.jpg" },
  { id: 5, from: "Hà Nội", to: "Chiang Mai", country: "Thái Lan", date: getDynamicDate(4), price: 2400000, originalPrice: 3100000, img: imgbangkok.src },

  // ===== Hàn Quốc =====
  { id: 6, from: "Hà Nội", to: "Seoul", country: "Hàn Quốc", date: getDynamicDate(5), price: 5800000, originalPrice: 7200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-seoul-1024x597.jpg" },
  { id: 7, from: "TP. Hồ Chí Minh", to: "Seoul", country: "Hàn Quốc", date: getDynamicDate(5), price: 5800000, originalPrice: 7200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-seoul-1024x640.jpg" },
  { id: 8, from: "Hà Nội", to: "Busan", country: "Hàn Quốc", date: getDynamicDate(6), price: 5900000, originalPrice: 7300000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-busan-1024x640.jpg" },
  { id: 9, from: "Đà Nẵng", to: "Jeju", country: "Hàn Quốc", date: getDynamicDate(7), price: 6000000, originalPrice: 7500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-jeju-1024x640.jpg" },

  // ===== Nhật Bản =====
  { id: 10, from: "TP. Hồ Chí Minh", to: "Tokyo", country: "Nhật Bản", date: getDynamicDate(8), price: 8900000, originalPrice: 11000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-hcm-tokyo-1024x640.jpg" },
  { id: 11, from: "Hà Nội", to: "Tokyo", country: "Nhật Bản", date: getDynamicDate(8), price: 8900000, originalPrice: 11000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-tokyo.jpg" },
  { id: 12, from: "Hà Nội", to: "Osaka", country: "Nhật Bản", date: getDynamicDate(9), price: 9000000, originalPrice: 11200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-osaka-1024x640.jpg" },
  { id: 13, from: "Đà Nẵng", to: "Nagoya", country: "Nhật Bản", date: getDynamicDate(10), price: 9100000, originalPrice: 11300000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-nagoya-1024x640.jpg"},

  // ===== Trung Quốc =====
  { id: 14, from: "TP. Hồ Chí Minh", to: "Bắc Kinh", country: "Trung Quốc", date: getDynamicDate(11), price: 6500000, originalPrice: 8000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-bac-kinh-1024x640.jpg" },
  { id: 15, from: "Hà Nội", to: "Bắc Kinh", country: "Trung Quốc", date: getDynamicDate(12), price: 4000000, originalPrice: 5500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-bac-kinh-1024x640.jpg"},
  { id: 16, from: "Đà Nẵng", to: "Thượng Hải", country: "Trung Quốc", date: getDynamicDate(13), price: 5700000, originalPrice: 7200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-thuong-hai-trung-quoc-1024x634.jpg" },
  { id: 17, from: "Tp. Hồ Chí Minh", to: "Trùng Khánh", country: "Trung Quốc", date: getDynamicDate(13), price: 5700000, originalPrice: 7200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-sai-gon-di-trung-khanh-1024x640.jpg" },

  // ===== Pháp =====
  { id: 18, from: "TP. Hồ Chí Minh", to: "Paris", country: "Pháp", date: getDynamicDate(14), price: 14500000, originalPrice: 18000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-sai-gon-paris-1024x640.jpg" },
  { id: 19, from: "Hà Nội", to: "Paris", country: "Pháp", date: getDynamicDate(14), price: 14500000, originalPrice: 18000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-paris-1024x614.jpg" },
  { id: 20, from: "Hà Nội", to: "Lyon", country: "Pháp", date: getDynamicDate(15), price: 14600000, originalPrice: 18000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-lyon-1024x640.jpg" },
  { id: 21, from: "Đà Nẵng", to: "Bordeaux", country: "Pháp", date: getDynamicDate(16), price: 14800000, originalPrice: 18200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-bordeaux-1024x640.jpg"},

  // ===== Đức =====
  { id: 22, from: "TP. Hồ Chí Minh", to: "Frankfurt", country: "Đức", date: getDynamicDate(17), price: 13800000, originalPrice: 17000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-sai-gon-frankfurt-re-1024x640.jpg" },
  { id: 23, from: "Hà Nội", to: "Berlin", country: "Đức", date: getDynamicDate(18), price: 14200000, originalPrice: 17400000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-ha-noi-berlin_1.jpg" },
  { id: 24, from: "TP. Hồ Chí Minh", to: "Berlin", country: "Đức", date: getDynamicDate(18), price: 1480000, originalPrice: 17400000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tphcm-di-berlin-1024x640.jpg" },
  { id: 25, from: "Hà Nội", to: "Munich", country: "Đức", date: getDynamicDate(19), price: 14000000, originalPrice: 17200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-munich-1024x640.jpg" },

  // ===== Anh =====
  { id: 26, from: "TP. Hồ Chí Minh", to: "London", country: "Anh", date: getDynamicDate(20), price: 15000000, originalPrice: 18500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-london-hang-eva-air.jpg"},
  { id: 27, from: "Hà Nội", to: "London", country: "Anh", date: getDynamicDate(21), price: 15100000, originalPrice: 18600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-londo-1024x640.jpg" },
  { id: 28, from: "Hà Nội", to: "Manchester", country: "Anh", date: getDynamicDate(21), price: 15100000, originalPrice: 18600000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-manchester-new-hampshire-1024x640.jpg" },
  { id: 29, from: "Đà Nẵng", to: "Birmingham", country: "Anh", date: getDynamicDate(22), price: 15000000, originalPrice: 18400000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-birmingham-alabama-1024x640.jpg" },

  // ===== Mỹ =====
  { id: 30, from: "TP. Hồ Chí Minh", to: "Washington", country: "Mỹ", date: getDynamicDate(24), price: 17000000, originalPrice: 21200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-tu-tphcm-di-washington-1024x640.jpg" },
  { id: 31, from: "Hà Nội", to: "Los Angeles", country: "Mỹ", date: getDynamicDate(23), price: 16800000, originalPrice: 21000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-ha-noi-di-los-angeles-1024x640.jpg" },
  { id: 32, from: "Đà Nẵng", to: "New York", country: "Mỹ", date: getDynamicDate(24), price: 17000000, originalPrice: 21200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-di-new-york-1024x640.jpg" },
  { id: 33, from: "Hà Nội", to: "San Francisco", country: "Mỹ", date: getDynamicDate(25), price: 16500000, originalPrice: 20800000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-san-francisco-1-1024x640.jpg" },

  // ===== Úc =====
  { id: 34, from: "TP. Hồ Chí Minh", to: "Sydney", country: "Úc", date: getDynamicDate(26), price: 12500000, originalPrice: 15000000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-sydney-gia-re-1024x640.jpg" },
  { id: 35, from: "Đà Nẵng", to: "Sydney", country: "Úc", date: getDynamicDate(28), price: 12400000, originalPrice: 14900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-da-nang-sydney-1024x640.jpg" },
  { id: 36, from: "Hà Nội", to: "Melbourne", country: "Úc", date: getDynamicDate(27), price: 12600000, originalPrice: 15100000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-tu-ha-noi-di-melbourne-1024x640.jpg" },
  { id: 37, from: "Đà Nẵng", to: "Perth", country: "Úc", date: getDynamicDate(28), price: 12400000, originalPrice: 14900000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-perth-1024x640.jpg" },

  // ===== Malaysia =====
  { id: 38, from: "Hà Nội", to: "Kuala Lumpur", country: "Malaysia", date: getDynamicDate(32), price: 2200000, originalPrice: 3200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-di-kuala-lumpur-1024x640.jpg" },
  { id: 39, from: "TP. Hồ Chí Minh", to: "Kuala Lumpur", country: "Malaysia", date: getDynamicDate(32), price: 2200000, originalPrice: 3200000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-kuala-lumpur-1024x640.jpg" },
  { id: 40, from: "Hà Nội", to: "Penang", country: "Malaysia", date: getDynamicDate(33), price: 2300000, originalPrice: 3300000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-penang-1024x640.jpg" },
  { id: 41, from: "Đà Nẵng", to: "Johor Bahru", country: "Malaysia", date: getDynamicDate(34), price: 2250000, originalPrice: 3250000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-di-johor-bahru.jpg" },

  // ===== Singapore =====
  { id: 42, from: "TP. Hồ Chí Minh", to: "Singapore", country: "Singapore", date: getDynamicDate(35), price: 2500000, originalPrice: 3500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-sai-gon-singapore-1024x640.jpg" },
  { id: 43, from: "Hà Nội", to: "Singapore", country: "Singapore", date: getDynamicDate(36), price: 2480000, originalPrice: 3480000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2025/12/ve-may-bay-ha-noi-di-singapore-1024x640.jpg" },
  { id: 44, from: "Đà Nẵng", to: "Singapore", country: "Singapore", date: getDynamicDate(37), price: 2460000, originalPrice: 3460000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/03/ve-may-bay-da-nang-singapore-1024x640.jpg" },
  { id: 45, from: "TP. Hồ Chí Minh", to: "Singapore", country: "Singapore", date: getDynamicDate(35), price: 2500000, originalPrice: 3500000, img: "https://admin.vietnam-tickets.com/wp-content/uploads/2026/01/ve-may-bay-di-singapore-vietjet-air-1.jpg" },
];



  const [activeTab, setActiveTab] = useState<"hot" | "domestic" | "international">("hot");

  const renderFlightDeals = () => {
    if (activeTab === "hot") {
      return <FlightDealsNew flights={flightsnew} title="Deal hot - Vé máy bay nổi bật!" />;
    }
    if (activeTab === "domestic") {
      return <FlightDeals flights={flightsnew} title="Vé máy bay nội địa giá tốt nhất!" />;
    }
    if (activeTab === "international") {
      return <FlightDealsInternational flights={flightsqt} title="Tìm thấy các chuyến bay quốc tế phù hợp nhất" />;
    }
  };


const [data, setData] = useState<any>(null);

// useEffect(() => {
//   // ✅ Nếu đã có dữ liệu thì không gọi lại API nữa
//   if (data) return;

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/getdatahome");
//       setData(res.data.data);
//     } catch (err) {
//       console.error("Lỗi khi fetch dữ liệu trang chủ:", err);
//       // 👉 fallback khi API lỗi
//       setData({
//         banner_main: { items: [] },
//         banner_session_01: { items: [] },
//         background: null,
//       });
//     }
//   };

//   fetchData();
// }, [data]); 


const CACHE_KEY = "bgandsession1home";
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 2 ngày (ms)


useEffect(() => {
  const fetchData = async () => {
    try {
      // -----------------------------
      // ⭐ 1. KIỂM TRA LOCAL STORAGE
      // -----------------------------
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);

        // Kiểm tra thời gian hết hạn cache
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          // console.log("🔥 Dùng dữ liệu cache localStorage");
          setData(parsed.data);
          return; // Không gọi API nữa
        }
      }

      // -----------------------------
      // ⭐ 2. GỌI API KHI CACHE HẾT HẠN
      // -----------------------------
      // console.log("🌐 Gọi API lấy dữ liệu mới...");
      const res = await axios.get(
        "http://127.0.0.1:8000/api/getdatahome"
      );

      const newData = res.data.data;
      setData(newData);

      // Lưu lại vào localStorage + timestamp
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: newData,
        })
      );

    } catch (err) {
      console.error("Lỗi khi fetch:", err);

      // fallback
      setData({
        banner_main: { items: [] },
        banner_session_01: { items: [] },
        background: null,
      });
    }
  };

  // Đừng gọi nữa nếu state đã có data
  if (!data) {
    fetchData();
  }
}, [data]);

  return (
    <>
      <HeroBanner  background={data?.background} banners={data?.banner_main.items} />
      {/* <PromoBanner   /> */}
      <PromoCodes />
      <PopularFlights />
      <div className="container mt-5 d-flex d-none d-md-flex justify-content-between align-items-center">
        {/* Tiêu đề */}
        <h1 className="fw-bold promo-header d-flex align-items-center mb-0">
          <Plane style={{ marginRight: "5px" }} size={35} color="#2d4f85" className="d-none d-md-block mb-1" />
          Vé Máy Bay Giá Rẻ Nhất 
        </h1>
            <br />
          {/* Button nhóm */}
        <div className="d-flex gap-2">
          <div
            className="tab-buttons-container d-flex"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none", // ẩn thanh scroll trên Firefox
              msOverflowStyle: "none", // ẩn thanh scroll trên IE/Edge
            }}
          >
            {/* Ẩn thanh scroll trên Chrome/Safari */}
            <style>
              {`
                .tab-buttons-container::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>

            <button
              className={`tab-button ${activeTab === "hot" ? "tab-button--active" : "tab-button--inactive"}`}
              onClick={() => setActiveTab("hot")}
              style={{ display: "inline-block", minWidth: "120px" }}
            >
              🔥 Deal hot
            </button>

            <button
              className={`tab-button ${activeTab === "domestic" ? "tab-button--active" : "tab-button--inactive"}`}
              onClick={() => setActiveTab("domestic")}
              style={{ display: "inline-block", minWidth: "120px" }}
            >
              Vé nội địa
            </button>

            <button
              className={`tab-button ${activeTab === "international" ? "tab-button--active" : "tab-button--inactive"}`}
              onClick={() => setActiveTab("international")}
              style={{ display: "inline-block", minWidth: "120px" }}
            >
              Vé quốc tế
            </button>
          </div>
        </div>
      </div>
      {/* Mobile*/}
        <div className="container d-block d-md-none mt-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <h1 className="fw-bold promo-header d-flex align-items-center mb-3 mb-md-0">
              <Plane
                style={{ marginRight: "5px" }}
                size={35}
                color="#2d4f85"
                className=" mb-1"
              />
              Vé Máy Bay Giá Rẻ Nhất  
            </h1>

            {/* Button nhóm */}
            <div className="d-flex gap-2 w-100 w-md-auto">
              <div
                className="tab-buttons-container d-flex w-100"
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none", // ẩn thanh scroll trên Firefox
                  msOverflowStyle: "none", // ẩn thanh scroll trên IE/Edge
                }}
              >
                {/* Ẩn thanh scroll trên Chrome/Safari */}
                <style>
                  {`
                    .tab-buttons-container::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>

                <button
                  className={`tab-button ${activeTab === "hot" ? "tab-button--active" : "tab-button--inactive"}`}
                  onClick={() => setActiveTab("hot")}
                  style={{ display: "inline-block", minWidth: "120px" }}
                >
                  🔥 Deal hot
                </button>

                <button
                  className={`tab-button ${activeTab === "domestic" ? "tab-button--active" : "tab-button--inactive"}`}
                  onClick={() => setActiveTab("domestic")}
                  style={{ display: "inline-block", minWidth: "120px" }}
                >
                  Vé nội địa
                </button>

                <button
                  className={`tab-button ${activeTab === "international" ? "tab-button--active" : "tab-button--inactive"}`}
                  onClick={() => setActiveTab("international")}
                  style={{ display: "inline-block", minWidth: "120px" }}
                >
                  Vé quốc tế
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Render đúng component theo tab */}
      {renderFlightDeals()}
       <PartnerDeals />
       <WorldDestinations />
       <BlogInternational   />
       <AwardsSection />
       <Testimonials />
       <FeaturedPosts />
       <TravelInspiration />
       <PopularDestinations />
    </>
  );
}
