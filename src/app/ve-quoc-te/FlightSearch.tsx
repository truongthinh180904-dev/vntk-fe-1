"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FlightPluginBlog from "./FlightPluginBlog";
import Banner from '../assets/img/home/bg_demone.webp'
import axios from "axios";

interface FlightDeal {
  id: number;
  airline: string;
  from: string;
  to: string;
  price: string;
  logo: string;
}

const FlightSearch: React.FC = () => {

const [data, setData] = useState<any>(null);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/getdatainternational");
//       // Kiểm tra dữ liệu có hợp lệ không
//       if (res?.data?.data && res.data.data.background) {
//         setData(res.data.data);
//       } else {
//         console.warn("⚠️ API trả về dữ liệu không hợp lệ, dùng fallback.");
//         setData({ background: { image_path: null } });
//       }
//     } catch (err) {
//       console.error("❌ Lỗi khi fetch dữ liệu trang domestic:", err);
//       setData({ background: { image_path: null } }); // fallback nếu lỗi
//     }
//   };

//   fetchData();
// }, []);

useEffect(() => {
  const fetchData = async () => {
    const cacheKey = "backgroundinternational";
    const cached = localStorage.getItem(cacheKey);
    const twoDays = 2 * 24 * 60 * 60 * 1000; // 2 ngày

    // Nếu có cache và chưa hết hạn → dùng cache
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < twoDays) {
        setData(parsed.data);
        return;
      }
    }

    // Nếu không có cache hoặc hết hạn → fetch API
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/getdatainternational");

      const validData = res?.data?.data && res.data.data.background
        ? res.data.data
        : { background: { image_path: null } };

      setData(validData);

      // Lưu cache với timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: validData })
      );
    } catch (err) {
      console.error("❌ Lỗi khi fetch dữ liệu trang international:", err);
      setData({ background: { image_path: null } }); // fallback nếu lỗi
    }
  };

  fetchData();
}, []);



  return (
    <div className="flight-section" 
    style={{
    position:'relative',
    height: "390px",
    width:'100%',
     backgroundImage: `url(${
      data?.background.image_path
        ? `http://127.0.0.1:8000/storage/${data.background.image_path}`
        : Banner.src
    })`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
 
    }}>
      {/* 🔹 Header + Search box */}
      <div className="container text-left text-white py-5">
        <div className="searchh-plugin" style={{position:'relative',zIndex:999}}>
              <FlightPluginBlog />
        </div>     
      </div>  
    </div>
  );
};

export default FlightSearch;
