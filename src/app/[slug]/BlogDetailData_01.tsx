"use client";

import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
import PlaneLoader from "../components/load/PlaneLoader";
import banner_01 from "../assets/img/home/vemaybaynoidia/banner-01.png";
import banner_02 from "../assets/img/home/vemaybaynoidia/banner-02.png";
import banner_03 from "../assets/img/home/vemaybaynoidia/banner-03.png";
import banner_04 from "../assets/img/home/bg-banner.jpg";
import axios from "axios";
import PlaneSearch from "./FlightPluginBlog";
import Breadcrumb from './Breadcrumb';
import { useParams } from "next/navigation";
import Link from "next/link";
import BlogContent from "./BlogContentBackup";
import BlogDetailClient from "./BlogDetailClient";

import tphcmImg from "../assets/img/domestic/Tp-HCM.jpg";
import hanoiImg from "../assets/img/domestic/hanoi.jpg";
import danangImg from "../assets/img/domestic/da-nang.webp";
import hueImg from "../assets/img/domestic/hue.jpg";
import phuquocImg from "../assets/img/domestic/phu-quoc.jpg";
import nhatrangImg from "../assets/img/domestic/nha-trang.jpg";
import quynhonImg from "../assets/img/domestic/quy-nhon.jpg";
import phuyenImg from "../assets/img/domestic/phu-yen.jpg";
import haiphongImg from "../assets/img/domestic/hai-phong.jpg";
import canthoImg from "../assets/img/domestic/can-tho.jpg";




import imgnewyork from "../assets/img/country_img/ve-may-bay-di-new-york.jpg";
import imgtokyo from "../assets/img/country_img/ve-may-bay-di-Tokyo.jpg";
import imgseoul from "../assets/img/country_img/ve-may-bay-di-seoul.webp";
import imgbangkok from "../assets/img/country_img/ve-may-bay-di-bangkok.webp";
import imgkl from "../assets/img/country_img/ve-may-bay-di-kuala_lumpur.jpg";
import imgsingapore from "../assets/img/country_img/ve-may-bay-di-singapore.jpg";
import imglondon from "../assets/img/country_img/ve-may-bay-di-london.jpg";
import imgparis from "../assets/img/country_img/ve-may-bay-di-paris.jpg";
import imgfrankfurt from "../assets/img/country_img/ve-may-bay-di-Frankfurt.jpg";
import imgsydney from "../assets/img/country_img/ve-may-bay-di-sysney.jpg";
import imgbeijing from "../assets/img/country_img/ve-may-bay-di-Bac kinh.jpg";
import imgdubai from "../assets/img/country_img/ve-may-bay-Dubai.png";
import FlightDealsInternational from "./international/FlightDealsInternational";
import FlightDealsWayOne from "./international/FlightDealsWayOne";
import { Plane } from "lucide-react";
import PopularDestinations from "../components/home/PopularDestinations";
import DetailCategoryInternational from "../components/blog/DetailCategoryInternational";

interface Post {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  meta?:any;
  link: string;
  categories?: number[];
  _embedded?: {
    "wp:featuredmedia"?: [{ source_url: string }];
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

interface BlogDetailProps {
  slug: string;
  postSsr:any;
  relatedPostSsr: any[];
  imageSsr: string;
}


// interface RelatedPostProps {
//   relatedPosts: any[];
// }

const BlogDetail = ({ slug , postSsr, relatedPostSsr, imageSsr }: BlogDetailProps) => {
  // Bây giờ slug được truyền từ cha xuống
  console.log("Slug từ props:", slug);
  // const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState<Category[]>([]);
  const [expanded, setExpanded]   = useState(false);
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");


  // Giới hạn số lượng hiển thị ban đầu
  const visiblePosts = expanded ? relatedPosts : relatedPosts.slice(0, 2);

  const featuredImage =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/800x400?text=No+Image";

    
  // 🔹 Hàm lấy breadcrumb category
  const fetchBreadcrumb = async (catId: number): Promise<Category[]> => {
    try {
      const res = await axios.get<Category>(
        `https://api.anninhanthienlong.com/wp-json/wp/v2/categories/${catId}`
      );
      const cat = res.data;

      if (cat.parent && cat.parent !== 0) {
        const parentTrail = await fetchBreadcrumb(cat.parent);
        return [...parentTrail, cat];
      } else {
        return [cat];
      }
    } catch (error) {
      console.error("Lỗi khi lấy category:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

  const fetchData = async () => {
  const cacheKey = `post-${slug}`;

  try {
    // 🔹 Lấy bài viết
    const postRes = await axios.get<Post[]>(
      `https://api.anninhanthienlong.com/wp-json/wp/v2/posts`,
      { params: { slug: slug, _embed: true } }
    );

    let post = null;
    let breadcrumb: Category[] = [];
    if (postRes.data.length > 0) {
      post = postRes.data[0];
      setPost(post);
      if (post.categories && post.categories.length > 0) {
        breadcrumb = await fetchBreadcrumb(post.categories[0]);
        setBreadcrumb(breadcrumb);
      }
    } else {
      setPost(null);
    }

    // 🔹 Lấy bài viết liên quan
    const relatedRes = await axios.get<Post[]>(
      `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=3&per_page=5&_embed`
    );
    const related = relatedRes.data;
    setRelatedPosts(related);

    // ✅ Lưu cache
    // setCache(cacheKey, { post, breadcrumb, related });

  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
  } finally {
    setLoading(false);
  }
};


    // const fetchData = async () => {
    //   try {
    //     // Lấy bài viết
    //     const postRes = await axios.get<Post[]>(
    //       `https://api.anninhanthienlong.com/wp-json/wp/v2/posts`,
    //       { params: { slug: slug, _embed: true } }
    //     );
        
    //     if (postRes.data.length > 0) {
    //       const p = postRes.data[0];
    //       setPost(p);

    //       // Lấy breadcrumb từ category đầu tiên
    //       if (p.categories && p.categories.length > 0) {
    //         const trail = await fetchBreadcrumb(p.categories[0]);
    //         setBreadcrumb(trail);
    //       }
    //     } else {
    //       setPost(null);
    //     }

    //     // Lấy bài viết liên quan
    //     const relatedRes = await axios.get<Post[]>(
    //       `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=3&per_page=5&_embed`
    //     );
    //     setRelatedPosts(relatedRes.data);
    //   } catch (err) {
    //     console.error("Lỗi khi lấy dữ liệu:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Thêm delay để tránh flash loading
    const timer = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(timer);
  }, [slug]);



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



const [flightsqt, setFlightsQt] = useState<any[]>([]);
const [domesticData, setDomesticData]= useState<any[]>([]);

useEffect(() => {
  const getDynamicDate = (offsetDays:number) => {
    const today = new Date();
    today.setDate(today.getDate() + offsetDays + 14);
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dayName = days[today.getDay()];
    const date = today.getDate();
    const month = today.getMonth() + 1;
    return `${dayName}, ${date} Thg ${month}`;
  };
  const flightsqt = [
    // ===== Thái Lan =====
    { id: 1, from: "TP. Hồ Chí Minh", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(0), price: 2200000, originalPrice: 3000000, img: imgbangkok.src },
    { id: 2, from: "Hà Nội", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(1), price: 2100000, originalPrice: 2900000, img: imgbangkok.src },
    { id: 3, from: "Đà Nẵng", to: "Bangkok", country: "Thái Lan", date: getDynamicDate(2), price: 2150000, originalPrice: 2950000, img: imgbangkok.src },
    { id: 4, from: "TP. Hồ Chí Minh", to: "Phuket", country: "Thái Lan", date: getDynamicDate(3), price: 2500000, originalPrice: 3200000, img: imgbangkok.src },
    { id: 5, from: "Hà Nội", to: "Chiang Mai", country: "Thái Lan", date: getDynamicDate(4), price: 2400000, originalPrice: 3100000, img: imgbangkok.src },

    // ===== Hàn Quốc =====
    { id: 6, from: "TP. Hồ Chí Minh", to: "Seoul", country: "Hàn Quốc", date: getDynamicDate(5), price: 5800000, originalPrice: 7200000, img: imgseoul.src },
    { id: 7, from: "Hà Nội", to: "Busan", country: "Hàn Quốc", date: getDynamicDate(6), price: 5900000, originalPrice: 7300000, img: imgseoul.src },
    { id: 8, from: "Đà Nẵng", to: "Jeju", country: "Hàn Quốc", date: getDynamicDate(7), price: 6000000, originalPrice: 7500000, img: imgseoul.src },

    // ===== Nhật Bản =====
    { id: 9, from: "TP. Hồ Chí Minh", to: "Tokyo", country: "Nhật Bản", date: getDynamicDate(8), price: 8900000, originalPrice: 11000000, img: imgtokyo.src },
    { id: 10, from: "Hà Nội", to: "Osaka", country: "Nhật Bản", date: getDynamicDate(9), price: 9000000, originalPrice: 11200000, img: imgtokyo.src },
    { id: 11, from: "Đà Nẵng", to: "Nagoya", country: "Nhật Bản", date: getDynamicDate(10), price: 9100000, originalPrice: 11300000, img: imgtokyo.src },

    // ===== Trung Quốc =====
    { id: 12, from: "TP. Hồ Chí Minh", to: "Beijing", country: "Trung Quốc", date: getDynamicDate(11), price: 6500000, originalPrice: 8000000, img: imgbeijing.src },
    { id: 13, from: "Hà Nội", to: "Guangzhou", country: "Trung Quốc", date: getDynamicDate(12), price: 4000000, originalPrice: 5500000, img: imgbeijing.src },
    { id: 14, from: "Đà Nẵng", to: "Shanghai", country: "Trung Quốc", date: getDynamicDate(13), price: 5700000, originalPrice: 7200000, img: imgbeijing.src },
    { id: 39, from: "Đà Nẵng", to: "Shanghai", country: "Trung Quốc", date: getDynamicDate(13), price: 5700000, originalPrice: 7200000, img: imgbeijing.src },


    // ===== Pháp =====
    { id: 15, from: "TP. Hồ Chí Minh", to: "Paris", country: "Pháp", date: getDynamicDate(14), price: 14500000, originalPrice: 18000000, img: imgparis.src },
    { id: 16, from: "Hà Nội", to: "Lyon", country: "Pháp", date: getDynamicDate(15), price: 14600000, originalPrice: 18000000, img: imgparis.src },
    { id: 17, from: "Đà Nẵng", to: "Nice", country: "Pháp", date: getDynamicDate(16), price: 14800000, originalPrice: 18200000, img: imgparis.src },

    // ===== Đức =====
    { id: 18, from: "TP. Hồ Chí Minh", to: "Frankfurt", country: "Đức", date: getDynamicDate(17), price: 13800000, originalPrice: 17000000, img: imgfrankfurt.src },
    { id: 19, from: "Hà Nội", to: "Berlin", country: "Đức", date: getDynamicDate(18), price: 14200000, originalPrice: 17400000, img: imgfrankfurt.src },
    { id: 20, from: "Đà Nẵng", to: "Munich", country: "Đức", date: getDynamicDate(19), price: 14000000, originalPrice: 17200000, img: imgfrankfurt.src },

    // ===== Anh =====
    { id: 21, from: "TP. Hồ Chí Minh", to: "London", country: "Anh", date: getDynamicDate(20), price: 15000000, originalPrice: 18500000, img: imglondon.src },
    { id: 22, from: "Hà Nội", to: "Manchester", country: "Anh", date: getDynamicDate(21), price: 15100000, originalPrice: 18600000, img: imglondon.src },
    { id: 23, from: "Đà Nẵng", to: "Birmingham", country: "Anh", date: getDynamicDate(22), price: 15000000, originalPrice: 18400000, img: imglondon.src },

    // ===== Mỹ =====
    { id: 24, from: "TP. Hồ Chí Minh", to: "Los Angeles", country: "Mỹ", date: getDynamicDate(23), price: 16800000, originalPrice: 21000000, img: imgnewyork.src },
    { id: 25, from: "Hà Nội", to: "New York", country: "Mỹ", date: getDynamicDate(24), price: 17000000, originalPrice: 21200000, img: imgnewyork.src },
    { id: 26, from: "Đà Nẵng", to: "San Francisco", country: "Mỹ", date: getDynamicDate(25), price: 16500000, originalPrice: 20800000, img: imgnewyork.src },

    // ===== Úc =====
    { id: 27, from: "TP. Hồ Chí Minh", to: "Sydney", country: "Úc", date: getDynamicDate(26), price: 12500000, originalPrice: 15000000, img: imgsydney.src },
    { id: 28, from: "Hà Nội", to: "Melbourne", country: "Úc", date: getDynamicDate(27), price: 12600000, originalPrice: 15100000, img: imgsydney.src },
    { id: 29, from: "Đà Nẵng", to: "Perth", country: "Úc", date: getDynamicDate(28), price: 12400000, originalPrice: 14900000, img: imgsydney.src },

    // ===== Qatar =====
    { id: 30, from: "TP. Hồ Chí Minh", to: "Doha", country: "Qatar", date: getDynamicDate(29), price: 10500000, originalPrice: 13000000, img: imgdubai.src },
    { id: 31, from: "Hà Nội", to: "Doha", country: "Qatar", date: getDynamicDate(30), price: 10400000, originalPrice: 13000000, img: imgdubai.src },
    { id: 32, from: "Đà Nẵng", to: "Doha", country: "Qatar", date: getDynamicDate(31), price: 10350000, originalPrice: 12950000, img: imgdubai.src },

    // ===== Malaysia =====
    { id: 33, from: "TP. Hồ Chí Minh", to: "Kuala Lumpur", country: "Malaysia", date: getDynamicDate(32), price: 2200000, originalPrice: 3200000, img: imgkl.src },
    { id: 34, from: "Hà Nội", to: "Penang", country: "Malaysia", date: getDynamicDate(33), price: 2300000, originalPrice: 3300000, img: imgkl.src },
    { id: 35, from: "Đà Nẵng", to: "Langkawi", country: "Malaysia", date: getDynamicDate(34), price: 2250000, originalPrice: 3250000, img: imgkl.src },

    // ===== Singapore =====
    { id: 36, from: "TP. Hồ Chí Minh", to: "Singapore", country: "Singapore", date: getDynamicDate(35), price: 2500000, originalPrice: 3500000, img: imgsingapore.src },
    { id: 37, from: "Hà Nội", to: "Singapore", country: "Singapore", date: getDynamicDate(36), price: 2480000, originalPrice: 3480000, img: imgsingapore.src },
    { id: 38, from: "Đà Nẵng", to: "Singapore", country: "Singapore", date: getDynamicDate(37), price: 2460000, originalPrice: 3460000, img: imgsingapore.src },
  ];
  const flightsnew = [
    // ĐẾN HÀ NỘI
    { id: 1, from: "TP. Hồ Chí Minh", to: "Hà Nội", date: getDynamicDate(1), price: 1150000, originalPrice: 1450000, img: hanoiImg.src },
    { id: 2, from: "Đà Nẵng", to: "Hà Nội", date: getDynamicDate(3), price: 850000, originalPrice: 1050000, img: hanoiImg.src },
    { id: 3, from: "Huế", to: "Hà Nội", date: getDynamicDate(5), price: 870000, originalPrice: 1100000, img: hanoiImg.src },
    { id: 4, from: "Phú Quốc", to: "Hà Nội", date: getDynamicDate(7), price: 1350000, originalPrice: 1600000, img: hanoiImg.src },

    // ĐẾN TP. HỒ CHÍ MINH
    { id: 5, from: "Hà Nội", to: "TP. Hồ Chí Minh", date: getDynamicDate(2), price: 1150000, originalPrice: 1500000, img: tphcmImg.src },
    { id: 6, from: "Đà Nẵng", to: "TP. Hồ Chí Minh", date: getDynamicDate(4), price: 890000, originalPrice: 1100000, img: tphcmImg.src },
    { id: 7, from: "Huế", to: "TP. Hồ Chí Minh", date: getDynamicDate(6), price: 980000, originalPrice: 1200000, img: tphcmImg.src },
    { id: 8, from: "Cần Thơ", to: "TP. Hồ Chí Minh", date: getDynamicDate(8), price: 650000, originalPrice: 850000, img: tphcmImg.src },

    // ĐẾN ĐÀ NẴNG
    { id: 9, from: "TP. Hồ Chí Minh", to: "Đà Nẵng", date: getDynamicDate(3), price: 950000, originalPrice: 1200000, img: danangImg.src },
    { id: 10, from: "Hà Nội", to: "Đà Nẵng", date: getDynamicDate(5), price: 950000, originalPrice: 1200000, img: danangImg.src },
    { id: 11, from: "Huế", to: "Đà Nẵng", date: getDynamicDate(9), price: 650000, originalPrice: 850000, img: danangImg.src },
    { id: 12, from: "Phú Yên", to: "Đà Nẵng", date: getDynamicDate(11), price: 830000, originalPrice: 1050000, img: danangImg.src },

    // ĐẾN HUẾ
    { id: 13, from: "TP. Hồ Chí Minh", to: "Huế", date: getDynamicDate(4), price: 980000, originalPrice: 1250000, img: hueImg.src },
    { id: 14, from: "Hà Nội", to: "Huế", date: getDynamicDate(6), price: 870000, originalPrice: 1100000, img: hueImg.src },
    { id: 15, from: "Đà Nẵng", to: "Huế", date: getDynamicDate(10), price: 650000, originalPrice: 850000, img: hueImg.src },
    { id: 16, from: "Nha Trang", to: "Huế", date: getDynamicDate(12), price: 890000, originalPrice: 1100000, img: hueImg.src },

    // ĐẾN PHÚ QUỐC
    { id: 17, from: "TP. Hồ Chí Minh", to: "Phú Quốc", date: getDynamicDate(3), price: 750000, originalPrice: 950000, img: phuquocImg.src },
    { id: 18, from: "Đà Nẵng", to: "Phú Quốc", date: getDynamicDate(5), price: 950000, originalPrice: 1200000, img: phuquocImg.src },
    { id: 19, from: "Hải Phòng", to: "Phú Quốc", date: getDynamicDate(8), price: 1350000, originalPrice: 1600000, img: phuquocImg.src },
    { id: 20, from: "Cần Thơ", to: "Phú Quốc", date: getDynamicDate(10), price: 720000, originalPrice: 900000, img: phuquocImg.src },

    // ĐẾN NHA TRANG
    { id: 21, from: "TP. Hồ Chí Minh", to: "Nha Trang", date: getDynamicDate(2), price: 850000, originalPrice: 1100000, img: nhatrangImg.src },
    { id: 22, from: "Hà Nội", to: "Nha Trang", date: getDynamicDate(4), price: 1250000, originalPrice: 1600000, img: nhatrangImg.src },
    { id: 23, from: "Huế", to: "Nha Trang", date: getDynamicDate(7), price: 820000, originalPrice: 1050000, img: nhatrangImg.src },
    { id: 24, from: "Quy Nhơn", to: "Nha Trang", date: getDynamicDate(9), price: 750000, originalPrice: 950000, img: nhatrangImg.src },

    // ĐẾN QUY NHƠN
    { id: 25, from: "TP. Hồ Chí Minh", to: "Quy Nhơn", date: getDynamicDate(1), price: 900000, originalPrice: 1150000, img: quynhonImg.src },
    { id: 26, from: "Hà Nội", to: "Quy Nhơn", date: getDynamicDate(5), price: 1050000, originalPrice: 1300000, img: quynhonImg.src },
    { id: 27, from: "Phú Yên", to: "Quy Nhơn", date: getDynamicDate(9), price: 690000, originalPrice: 900000, img: quynhonImg.src },
    { id: 28, from: "Đà Nẵng", to: "Quy Nhơn", date: getDynamicDate(11), price: 700000, originalPrice: 900000, img: quynhonImg.src },

    // ĐẾN PHÚ YÊN
    { id: 29, from: "TP. Hồ Chí Minh", to: "Phú Yên", date: getDynamicDate(3), price: 870000, originalPrice: 1100000, img: phuyenImg.src },
    { id: 30, from: "Hà Nội", to: "Phú Yên", date: getDynamicDate(5), price: 1200000, originalPrice: 1450000, img: phuyenImg.src },
    { id: 31, from: "Đà Nẵng", to: "Phú Yên", date: getDynamicDate(9), price: 830000, originalPrice: 1050000, img: phuyenImg.src },
    { id: 32, from: "Quy Nhơn", to: "Phú Yên", date: getDynamicDate(11), price: 690000, originalPrice: 900000, img: phuyenImg.src },

    // ĐẾN HẢI PHÒNG
    { id: 33, from: "TP. Hồ Chí Minh", to: "Hải Phòng", date: getDynamicDate(2), price: 1180000, originalPrice: 1450000, img: haiphongImg.src },
    { id: 34, from: "Đà Nẵng", to: "Hải Phòng", date: getDynamicDate(6), price: 970000, originalPrice: 1150000, img: haiphongImg.src },
    { id: 35, from: "Huế", to: "Hải Phòng", date: getDynamicDate(9), price: 950000, originalPrice: 1200000, img: haiphongImg.src },
    { id: 36, from: "Phú Quốc", to: "Hải Phòng", date: getDynamicDate(11), price: 1380000, originalPrice: 1650000, img: haiphongImg.src },

    // ĐẾN CẦN THƠ
    { id: 37, from: "TP. Hồ Chí Minh", to: "Cần Thơ", date: getDynamicDate(3), price: 600000, originalPrice: 800000, img: canthoImg.src },
    { id: 38, from: "Hà Nội", to: "Cần Thơ", date: getDynamicDate(5), price: 1300000, originalPrice: 1600000, img: canthoImg.src },
    { id: 39, from: "Đà Nẵng", to: "Cần Thơ", date: getDynamicDate(8), price: 950000, originalPrice: 1150000, img: canthoImg.src },
    { id: 40, from: "Phú Quốc", to: "Cần Thơ", date: getDynamicDate(10), price: 720000, originalPrice: 900000, img: canthoImg.src },

    // ĐẾN Kiên Giang
    { id: 41, from: "TP. Hồ Chí Minh", to: "Kiên Giang", date: getDynamicDate(3), price: 600000, originalPrice: 800000, img: canthoImg.src },
    { id: 42, from: "Hà Nội", to: "Kiên Giang", date: getDynamicDate(5), price: 1300000, originalPrice: 1600000, img: canthoImg.src },
    { id: 43, from: "Đà Nẵng", to: "Kiên Giang", date: getDynamicDate(8), price: 950000, originalPrice: 1150000, img: canthoImg.src },
    { id: 44, from: "Phú Quốc", to: "Kiên Giang", date: getDynamicDate(10), price: 720000, originalPrice: 900000, img: canthoImg.src },
  ];
  setFlightsQt(flightsqt);
  setDomesticData(flightsnew);
}, []);

//international
const [filteredFlights, setFilteredFlights] = useState<any[]>([]); // mảng global lọc theo quốc gia
const [filteredInternational, setFilteredInternational] = useState<any[]>([]); // mảng global lọc theo quốc gia

//domestic 
const [filteredFlightsDomestic, setFilteredFlightsDomestic] = useState<any[]>([]); // mảng global lọc theo quốc gia
const [DomesticWayOne, setDomesticWayOne] = useState<any[]>([]); // mảng global lọc theo quốc gia

useEffect(() => {
  if (breadcrumb.length > 0) {
    const first = breadcrumb[0]?.name;
    const second = breadcrumb[1]?.name;
    if (first === "Vé quốc tế") {
      setActiveTab("international");
      // nếu có flightsqt và có tên nước thì lọc theo country
      if (second && flightsqt.length > 0) {
        const matchedFlights = flightsqt.filter(
          (flight) =>
            flight.country?.toLowerCase().trim() === second.toLowerCase().trim()
        );
        setFilteredFlights(matchedFlights);
        if (
          matchedFlights.length > 0 &&
          post?.meta?.iataFrom &&
          post?.meta?.iataTo &&
          post?.meta?.fromName &&
          post?.meta?.toName
        ) {
          // Hàm tạo ngày động (bạn đã có sẵn)
          function getDynamicDate(offsetDays: number) {
            const today = new Date();
            today.setDate(today.getDate() + offsetDays + 14);
            const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            const dayName = days[today.getDay()];
            const date = today.getDate();
            const month = today.getMonth() + 1;
            return `${dayName}, ${date} Thg ${month}`;
          }

    // Tạo mảng 4 item demo
    const flightsDemo = [
      {
        id: 1,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(2),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 2,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(3),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 3,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(4),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 4,
        from: post.meta.toName,
        to: post.meta.fromName, // chiều ngược lại
        date: getDynamicDate(5),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
    ];

    // Cập nhật state hiển thị mảng này
    setFilteredInternational(flightsDemo);
    // setDomesticData(flightsDemo);
  }
      } //không có breakcrum 2 
      else{
          const matchedFlights = flightsqt.filter(
          (flight) =>
            flight.to?.toLowerCase().trim() === post?.meta?.toName.toLowerCase().trim()
        );
        

        setFilteredFlights(matchedFlights);
        if (
          matchedFlights.length > 0 &&
          post?.meta?.fromName &&
          post?.meta?.toName
        ) {
          // Hàm tạo ngày động (bạn đã có sẵn)
          function getDynamicDate(offsetDays: number) {
            const today = new Date();
            today.setDate(today.getDate() + offsetDays + 14);
            const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            const dayName = days[today.getDay()];
            const date = today.getDate();
            const month = today.getMonth() + 1;
            return `${dayName}, ${date} Thg ${month}`;
          }

    // Tạo mảng 4 item demo
    const flightsDemo = [
      {
        id: 1,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(2),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 2,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(3),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 3,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(4),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 4,
        from: post.meta.toName,
        to: post.meta.fromName, // chiều ngược lại
        date: getDynamicDate(5),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
    ];
        console.log("post?.meta?.fromName",flightsDemo);
    // Cập nhật state hiển thị mảng này
    setFilteredInternational(flightsDemo);
    // setDomesticData(flightsDemo);
  }
      }
    } else if (first === "Vé nội địa") {
      setActiveTab("domestic");
      let matchedFlights: any[] = [];
      if(second)
      {
           matchedFlights = domesticData.filter(
          (flight) =>
            flight.to?.toLowerCase().trim() === post?.meta?.toName.toLowerCase().trim()
        );
      }
      else
      {
          matchedFlights = domesticData.filter(
          (flight) =>
            flight.to?.toLowerCase().trim() === post?.meta?.toName.toLowerCase().trim()
        );
      }
      
        setFilteredFlightsDomestic(matchedFlights);
        if (
          matchedFlights.length > 0 &&
          // post?.meta?.iataFrom &&
          // post?.meta?.iataTo &&
          post?.meta?.fromName &&
          post?.meta?.toName
        ) {
          // Hàm tạo ngày động (bạn đã có sẵn)
          function getDynamicDate(offsetDays: number) {
            const today = new Date();
            today.setDate(today.getDate() + offsetDays + 14);
            const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            const dayName = days[today.getDay()];
            const date = today.getDate();
            const month = today.getMonth() + 1;
            return `${dayName}, ${date} Thg ${month}`;
          }

    // Tạo mảng 4 item demo
    const flightsDemo = [
      {
        id: 1,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(2),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 2,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(3),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 3,
        from: post.meta.fromName,
        to: post.meta.toName,
        date: getDynamicDate(4),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
      {
        id: 4,
        from: post.meta.toName,
        to: post.meta.fromName, // chiều ngược lại
        date: getDynamicDate(5),
        price: 1470000,
        originalPrice: 1800000,
        img: "demo_img",
      },
    ];

    // Cập nhật state hiển thị mảng này
    setDomesticWayOne(flightsDemo);
    // setDomesticData(flightsDemo);
  }


      setFilteredFlights([]); // reset nếu không cần lọc quốc tế
    } else {
      console.log("vé khuyến mãi hoặc chương trình tin tức");
      setFilteredFlights([]);
    }
  }
}, [breadcrumb, flightsqt]);


    //lọc dữ liệu theo tên vé nội địa


  const renderFlightDeals = () => {
    // if (activeTab === "domestic") {
    //   return <FlightDeals flights={flightsnew} title="Vé máy bay nội địa giá tốt nhất!" />;
    // }
    if (activeTab === "international" && filteredInternational.length > 0 && filteredFlights.length > 0) {
      return (
     <>
 
     <FlightDealsWayOne flights={filteredInternational} />
     <FlightDealsInternational
      flights={filteredFlights}
      title={breadcrumb[1]?.name || "Vé quốc tế"}
    />
 
  </>
);
    }
    else  if (activeTab === "domestic" && filteredFlightsDomestic.length > 0 && DomesticWayOne.length > 0) 
    {
      return (
          <>
          <FlightDealsWayOne flights={DomesticWayOne} />
          <FlightDealsInternational
            flights={filteredFlightsDomestic}
            title={breadcrumb[1]?.name || "Vé quốc tế"}
          />
      
        </>
)
    }

  };

  
  return (
    <div className="container-fluid" style={{ backgroundColor: "rgb(240, 248, 255)" }} >
      
      <div className="container py-5 px-3">
        
      {loading ? (
        <div className="d-flex flex-column align-items-center py-5" style={{ minHeight: 600 }}>
          <PlaneLoader />
         </div>
      ) : post ? (
          <>
          <div className="about rounded shadow mb-4">     
          {post && <Breadcrumb breadcrumb={breadcrumb} post={post} />} 
        <div
          className="container blog-search text-white py-4"
          style={{
            backgroundImage: `url(${banner_04.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 99,
          }}
        >
          <PlaneSearch />
        </div>
       
      </div>
        <div className="container-search-mobile row gx-4">
          <div className="col-lg-8 mb-4">
            <div className="bg-white rounded shadow p-4 overflow-hidden">
              {/* <h2
                className="fw-bold mb-3"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="text-muted small">
                {new Date(post.date).toLocaleDateString("vi-VN")}
              </p> */}
            
             {/* <div
              className="overflow-auto no-copy"
              style={{ wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()} // chặn chuột phải
            /> */}
            {/* <BlogContent content={post.content.rendered} /> */}
               {/* <BlogDetailClient  slug={slug}  post={postSsr} relatedPosts={relatedPostSsr} image={imageSsr} /> */}
            </div>
          </div> 
          <div
            className="col-lg-4 "
            // style={{
            //   position: "sticky",
            //   top: "150px",
            //   alignSelf: "start",
            //   zIndex: 1,
            // }}
          >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              padding: "16px",
              marginBottom: "12px",
              border: "1px dashed #ccc",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#e3f2fd",
                color: "#007bff",
                padding: "4px 10px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "10px",
              }}
            >
              <Plane size={16} style={{ marginRight: "6px" }} />
              Giá vé ưu đãi tại VietNam Tickets 
            </div>
          {/* Mã khuyến mãi */}
          {post.meta?.price && (
            <div
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                border: "1px dashed #999",
                borderRadius: "8px",
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "16px",
                letterSpacing: "0.5px",
                color: "#e91e63",
                backgroundColor: "#fff8f9",
              }}
            >
              <span>
                {Number(post.meta.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>

              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() =>
                  navigator.clipboard.writeText(
                    Number(post.meta.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  )
                }
              >
                VND
              </button>
            </div>
          )}

            
            {/* Nội dung */}
            <div className="mt-2" style={{ fontSize: "15px", lineHeight: "1.6", color: "#333" }}>
              <strong>Giảm 200.000đ</strong> khi đặt vé khứ hồi,<br />
              lên đến <strong>1.800.000đ/Đơn hàng</strong><br />
            </div>

            {/* Ngày & Điều kiện */}
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "13px",
                color: "#666",
              }}
            >
              <span>Giá chưa bao gồm thuế và dịch vụ</span>
              {/* <a href="#" style={{ color: "#007bff", textDecoration: "none", fontWeight: 500 }}>
                Điều kiện
              </a> */}
            </div>

           
          </div>

            <div className="bg-white rounded shadow p-3 mb-4">
           
              <img
                src={banner_03.src}
                alt="Ưu đãi 1"
                className="img-fluid rounded mb-3"
                 loading="lazy" 
              />
              <img
                src={banner_01.src}
                alt="Ưu đãi 2"
                className="img-fluid rounded mb-3"
                 loading="lazy" 
              />
            </div>
            {/* <div className="bg-white rounded shadow p-3 mb-4">
              <img
                src={banner_02.src}
                alt="Ưu đãi 3"
                className="img-fluid rounded mb-3"
                loading="lazy" 
              />
            </div> */}
            <div className="bg-light rounded shadow p-3 ">
                    <h6 className="fw-bold mb-3">Tin tức về vé máy bay</h6>
                    {visiblePosts.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.slug}`}
                        className="d-flex mb-3 text-decoration-none"
                      >
                        <img
                          src={
                            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                            "https://via.placeholder.com/80"
                          }
                          alt={item.title.rendered}
                          className="rounded me-2"
                          style={{ width: 80, height: 60, objectFit: "cover" }}
                          loading="lazy"
                        />
                        <div className="small text-dark">
                          <div
                            dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                          />
                          <div className="text-muted">
                            {new Date(item.date).toLocaleDateString("vi-VN")}
                          </div>
                        </div>
                      </Link>
                    ))}

                    {/* Nút toggle */}
                    {relatedPosts.length > 3 && (
                      <button
                        className="btn btn-link p-0 mt-2"
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? "Thu gọn" : "Xem thêm"}
                      </button>
                    )}
                  
            </div>
           <div style={{ marginTop: "20px" }}>
                {/* 🔹 Phần khối màu xanh */}
                <div
                  style={{
                    background: "linear-gradient(90deg, #0048FF, #00C2FF)",
                    borderRadius: "10px",
                    color: "#fff",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h6 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>
                    Bạn đã tìm thấy chuyến bay? Vậy bây giờ hãy tìm khách sạn nào
                  </h6>
                  <p style={{ fontSize: "14px", marginBottom: "16px" }}>
                    Nhận kết quả từ tất cả các trang web khách sạn hàng đầu ngay trên Vietnam Tickets
                  </p>
                  <button
                    style={{
                      background: "linear-gradient(90deg, #FFD54F, #FFB300)",
                      border: "none",
                      color: "#000",
                      fontWeight: 600,
                      padding: "10px 24px",
                      borderRadius: "30px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                    }}
                  >
                    Khám phá các khách sạn
                  </button>
                </div>

                {/* 🔹 Phần “Hình thức đặt vé” */}
                <div style={{ marginTop: "24px" }}>
                  <h6
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                      marginBottom: "12px",
                      color: "#000",
                    }}
                  >
                    Hình thức đặt vé
                  </h6>

                  {[
                    {
                      color: "#FF9800",
                      title: "Đặt vé online",
                      desc: "Tìm kiếm vé nhanh nhất với giá rẻ và tiện lợi nhất",
                    },
                    {
                      color: "#2196F3",
                      title: "Đến văn phòng",
                      desc: "Số 69 Võ Thị Sáu, Phường 6, Quận 3, TP HCM",
                    },
                    {
                      color: "#4CAF50",
                      title: "Gọi trực tiếp",
                      desc: "Gọi ngay số 1900 3173 – Tư vấn miễn phí",
                    },
                    {
                      color: "#9C27B0",
                      title: "Chat đặt vé",
                      desc: "Trò chuyện trực tiếp qua bộ chat ở góc phải",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        padding: "10px 14px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "stretch", // ✅ để thanh màu cao full
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          backgroundColor: item.color,
                          borderRadius: "3px",
                        }}
                      ></div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#000",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: "14px", color: "#555" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

          </div>
          {renderFlightDeals()}
          <PopularDestinations />
        </div>
          </>
      ) : (
        <p>Bài viết không tồn tại.</p>
      )}

      {/* <FeaturedPosts /> */}
    </div>
    </div>
  );
};

export default BlogDetail;