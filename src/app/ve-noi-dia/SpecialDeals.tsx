"use client";

import React, { useEffect, useState } from "react";
import banner_05 from "../assets/img/home/imgbanner05.png";
import probanner from "../assets/img/promotion/banner-promotion-2.png";
import probanner1 from "../assets/img/promotion/banner-promotion-3.png";
import probanner2 from "../assets/img/promotion/banner-promotion-4.png";
import probanner3 from "../assets/img/promotion/banner-promotion-5.png";

const SpecialDeals: React.FC = () => {
const [bannerData, setBannerData] = useState<any[]>([]);


useEffect(() => {
  const fetchBanner = async () => {
    const cacheKey = "domesticDatabanner";
    const cached = localStorage.getItem(cacheKey);
    const twoDays = 2 * 24 * 60 * 60 * 1000; // 2 ngày

    // Nếu có cache và chưa hết hạn → dùng cache
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < twoDays) {
        setBannerData(parsed.data);
        return;
      }
    }

    // Nếu không có cache hoặc hết hạn → fetch API
    try {
      const res = await fetch("http://127.0.0.1:8000/api/getdatadomestic");
      if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);

      const json = await res.json();

      const items =
        json?.data?.banner_session_01?.items && Array.isArray(json.data.banner_session_01.items)
          ? json.data.banner_session_01.items
          : [];

      setBannerData(items);

      // Lưu cache với timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: items })
      );
    } catch (error) {
      console.error("❌ Lỗi khi fetch banner:", error);
      setBannerData([]); // fallback
    }
  };

  fetchBanner();
}, []);

// ✅ Tách banner trái (id = 1)
const leftBanner =
  bannerData?.find((b) => b.id === 1)?.image_path
    ? `http://127.0.0.1:8000/storage/${bannerData.find((b) => b.id === 1)?.image_path}`
    : banner_05.src;

// ✅ Tách các banner phải (id ≠ 1)
const rightSlides =
  bannerData && bannerData.length > 0
    ? bannerData
        .filter((b) => b.id !== 1)
        .map((b) =>
          b?.image_path
            ? `http://127.0.0.1:8000/storage/${b.image_path}`
            : probanner.src // fallback từng item nếu có lỗi nhỏ
        )
    : [probanner.src, probanner1.src, probanner2.src, probanner3.src];

// ✅ Gán slides an toàn
const slides = rightSlides;

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


  return (
    <section
    //  style={{
    //   marginTop:"20px"
    // }}
      className="container-fluid mt-4 margin-top-mobile"
    >
         <div className="">
              <div className="container">
                <div className="row g-3">
                  {/* Banner bên trái */}
                  <div className="col-md-8 d-none d-md-block">
                    <div className="banner-main">
                      <img
                        src={leftBanner}
                        alt="Mega Sale"
                      />
                      <div className="banner-overlay"></div>
                    </div>
                  </div>

                  {/* Slide bên phải */}
                  <div className="col-md-4">
                    <div className="slide-container">
                      <img
                        src={rightSlides[current]}
                        alt={`Slide ${current + 1}`}
                        className="slide-image"
                      />
                      
                      <div className="slide-overlay"></div>


                      {/* Indicators */}
                      <div className="slide-indicators">
                        {rightSlides.map((_, i) => (
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
   
    </section>
  );
};

export default SpecialDeals;
