"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FlightPluginBlog from "./FlightPluginBlog";
import Banner from '../assets/img/domestic/bg_demone.webp'

interface FlightDeal {
  id: number;
  airline: string;
  from: string;
  to: string;
  price: string;
  logo: string;
}

const FlightSearch: React.FC = () => {

  return (
 <div
  className="flight-section"
  style={{
    position: "relative",
    width: "100%",
    margin: "10px auto", // ✅ Tự căn giữa và cách đều 2 bên
    borderRadius: "20px",
    backgroundImage: `url(${Banner.src})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)", // nhẹ cho đẹp
  }}
>
    {/* <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)", 
    }}
  ></div> */}
      {/* 🔹 Header + Search box */}
      <div className="container text-left text-white">
        {/* <h2 className="fw-bold">
          ĐỊA ĐIỂM THAM QUAN, HOẠT ĐỘNG VÀ TRẢI NGHIỆM
        </h2>
        <p className="mb-4">
          Khám phá các hoạt động và địa điểm tham quan mới theo sở thích của du khách
        </p> */}
        {/* Search form */}
        <div
          className="searchh-plugin"
          style={{
            position: "relative",
            maxWidth: "1200px",  // ✅ Giới hạn chiều ngang
            width: "95%",        // ✅ Cho responsive, cách đều hai bên
            margin: "0 auto",    // ✅ Căn giữa theo chiều ngang
            zIndex: 999,
          }}
        >
          <FlightPluginBlog />
        </div>

       
        
      </div>

    
    </div>
  );
};

export default FlightSearch;
