"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, PencilLine, Rocket } from "lucide-react";
import React, { useState } from "react";

import thuysi from "../../assets/img/international/canada.webp";
import hanquoc from "../../assets/img/international/hanquoc.jpg";
import london from "../../assets/img/international/london.jpg";
import nhatban from "../../assets/img/international/nhatban.jpg";
import pari from "../../assets/img/international/pari.webp";
import sydney from "../../assets/img/international/sydney.jpg";
import thailand from "../../assets/img/international/thailand.jpg";
import trungquoc from "../../assets/img/international/trungquoc.jpg";
import canada from "../../assets/img/international/canada.webp";
import Link from "next/link";

interface Destination {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  link: string; // 👈 thêm link
}

const destinations: Destination[] = [
  {
    id: 1,
    title: "Khám phá",
    subtitle: "",
    img: nhatban.src,
    link: "/ve-may-bay-di-nagoya-nhat-ban",
  },
  {
    id: 2,
    title: "Thụy Sĩ",
    subtitle: "Chặng ngắn",
    img: thuysi.src,
    link: "/ve-may-bay-di-thuy-si",
  },
  {
    id: 3,
    title: "Hàn Quốc",
    subtitle: "Chặng trung bình",
    img: hanquoc.src,
    link: "/ve-may-bay-di-han-quoc-vietnam-airlines",
  },
  {
    id: 4,
    title: "Luân Đôn",
    subtitle: "Chặng dài",
    img: london.src,
    link: "/ve-may-bay-di-london",
  },
  {
    id: 5,
    title: "Thái Lan",
    subtitle: "Chặng ngắn",
    img: thailand.src,
    link: "/ve-may-bay-sai-gon-thai-lan",
  },
  {
    id: 6,
    title: "Trung Quốc",
    subtitle: "Chặng dài",
    img: trungquoc.src,
    link: "/gia-ve-may-bay-tu-tphcm-di-trung-quoc",
  },
  {
    id: 7,
    title: "Sydney",
    subtitle: "Chặng dài",
    img: sydney.src,
    link: "/ve-may-bay-da-nang-sydney",
  },
  {
    id: 8,
    title: "Pháp",
    subtitle: "Chặng dài",
    img: pari.src,
    link: "/ve-may-bay-di-paris",
  },
  {
    id: 9,
    title: "Canada",
    subtitle: "Chặng dài",
    img: canada.src,
    link: "/ve-may-bay-di-canada",
  },
  {
    id: 10,
    title: "Nhật Bản",
    subtitle: "Chặng dài",
    img: nhatban.src,
    link: "/ve-may-bay-di-nagoya-nhat-ban",
  },
];

// Chiều rộng 1 item (gồm margin)
const ITEM_WIDTH = 236; // 220 + 16px margin-right

const TravelInspiration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < destinations.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container my-5 position-relative">
      <h1 className="promo-header fw-bold mb-4">
        <Rocket style={{ marginRight: "10px" }} size={28} color="#2d4f85" className="mb-1" />
        Tìm cảm hứng cho chuyến đi tiếp theo của bạn
      </h1>

      <div className="position-relative overflow-hidden">
        <div
          className="d-flex transition-slide"
          style={{
            transform: `translateX(-${currentIndex * ITEM_WIDTH}px)`,
            transition: "transform 0.6s ease",
          }}
        >
         {destinations.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="position-relative rounded-3 overflow-hidden shadow-sm travel-card flex-shrink-0 text-decoration-none"
              style={{ width: "220px", height: "130px", marginRight: "16px" }}
            >
              <Image
                src={item.img}
                alt={`Vé máy bay đi ${item.title}`}
                width={220}
                height={130}
                className="object-fit-cover w-100 h-100"
              />

              {item.subtitle && (
                <span
                  className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded text-white small fw-semibold"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  {item.subtitle}
                </span>
              )}

              <h6
                className="position-absolute bottom-0 start-0 m-3 fw-bold text-white"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                {item.title}
              </h6>
            </Link>
          ))}

        </div>
      </div>

      {/* Nút trái */}
      {currentIndex > 0 && (
       <button
            className="btn btn-light rounded-circle shadow-sm position-absolute start-0 translate-middle-y"
            onClick={handlePrev}
            style={{
                width: 45,
                height: 45,
                top: "68%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            <ChevronLeft />
            </button>

      )}

      {/* Nút phải */}
      {currentIndex < destinations.length - 5 && (
        <button
          className="btn btn-light rounded-circle shadow-sm position-absolute end-0 translate-middle-y"
          onClick={handleNext}
          style={{ width: 45, height: 45, top:"68%" }}
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default TravelInspiration;
