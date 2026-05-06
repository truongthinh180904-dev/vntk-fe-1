"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import probanner from "../assets/img/promotion/banner-promotion-2.png";
import probanner1 from "../assets/img/promotion/banner-promotion-3.png";
import probanner2 from "../assets/img/promotion/banner-promotion-4.png";
import probanner3 from "../assets/img/promotion/banner-promotion-5.png";

interface Banner {
  id: number;
  image: string;
  title: string;
  link: string;
}

const defaultBanners: Banner[] = [
  { id: 1, image: probanner.src, title: "Khám phá thế giới", link: "#" },
  { id: 2, image: probanner1.src, title: "Khám phá Thái Lan", link: "#" },
  { id: 3, image: probanner2.src, title: "Khám phá cùng Mastercard", link: "#" },
  { id: 4, image: probanner3.src, title: "Trải nghiệm Nhật Bản", link: "#" },
  { id: 5, image: probanner1.src, title: "Khám phá Singapore", link: "#" },
  { id: 6, image: probanner2.src, title: "Bay cùng ưu đãi đặc biệt", link: "#" },
];

export default function PromoBanner() {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleSlides = 4.2;

  // ✅ Gọi API để lấy banner thật
  // useEffect(() => {
  //   const fetchBanners = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/api/getdatainternational");
  //       const items = res.data?.data?.banner_main?.items || [];

  //       if (items.length > 0) {
  //         const mapped = items.map((b: any, i: number) => ({
  //           id: b.id || i + 1,
  //           image: `http://127.0.0.1:8000/storage/${b.image_path}`,
  //           title: b.title || `Banner ${i + 1}`,
  //           link: b.link || "#",
  //         }));
  //         setBanners(mapped);
  //       }
  //     } catch (error) {
  //       console.warn("⚠️ Lỗi tải banner, dùng banner mặc định:", error);
  //       setBanners(defaultBanners);
  //     }
  //   };

  //   fetchBanners();
  // }, []);

  useEffect(() => {
  const fetchBanners = async () => {
    const cacheKey = "bannerinternational1";
    const cached = localStorage.getItem(cacheKey);
    const twoDays = 2 * 24 * 60 * 60 * 1000; // 2 ngày

    // Nếu có cache và chưa hết hạn → dùng cache
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < twoDays) {
        setBanners(parsed.data);
        return;
      }
    }

    // Nếu không có cache hoặc hết hạn → fetch API
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/getdatainternational");
      const items = res.data?.data?.banner_main?.items || [];

      let mapped = items.map((b: any, i: number) => ({
        id: b.id || i + 1,
        image: `http://127.0.0.1:8000/storage/${b.image_path}`,
        title: b.title || `Banner ${i + 1}`,
        link: b.link || "#",
      }));

      if (mapped.length === 0) {
        mapped = defaultBanners;
      }

      setBanners(mapped);

      // Lưu cache với timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: mapped })
      );
    } catch (error) {
      console.warn("⚠️ Lỗi tải banner, dùng banner mặc định:", error);
      setBanners(defaultBanners); // fallback
    }
  };

  fetchBanners();
}, []);


  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % Math.max(banners.length - visibleSlides + 1, 1)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="position-relative container mt-4">
      {/* Slider container */}
      <div
        className="overflow-hidden position-relative d-none d-md-block"
        style={{
          borderRadius: "12px",
        }}
      >
        <div
          className="d-flex"
          style={{
            width: `${(banners.length / visibleSlides) * 100}%`,
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
            transition: "transform 1.2s ease-in-out",
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-shrink-0"
              style={{
                width: `${100 / visibleSlides}%`,
                padding: "0 6px",
              }}
            >
              <div className="card border-0 shadow-sm overflow-hidden rounded-3">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  width={600}
                  height={300}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  unoptimized // 👈 Giúp load ảnh local từ 127.0.0.1 không bị lỗi
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="d-flex justify-content-center mt-3">
        {Array.from({
          length: Math.max(banners.length - visibleSlides + 1, 1),
        }).map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`mx-1 rounded-circle ${
              i === currentIndex ? "bg-primary" : "bg-secondary"
            }`}
            style={{
              width: "10px",
              height: "10px",
              opacity: i === currentIndex ? 1 : 0.4,
              cursor: "pointer",
              transition: "opacity 0.3s ease",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
