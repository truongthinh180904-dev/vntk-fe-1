"use client";

import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Flag, Heart, ThumbsUp } from "lucide-react";
import paris from "../assets/img/international/paris.jpg";
import interntional_01 from "../assets/img/international/internation_01.jpg";
import interntional_02 from "../assets/img/international/internation_02.jpg";
import interntional_03 from "../assets/img/international/internation_03.jpg";
import interntional_04 from "../assets/img/international/internation_04.jpg";
import interntional_05 from "../assets/img/international/internation_05.jpg";
import interntional_06 from "../assets/img/international/internation_06.jpg";
import { gsap } from "gsap";
import Link from "next/link";


interface Place {
  id: number;
  city: string;
  name: string;
  img: string;
  rating: number;
  reviews: number;
  link: string; // 👈 thêm link
}

const places: Place[] = [
  {
    id: 1,
    city: "Pháp",
    name: "Viện bảo tàng Louvre",
    img: interntional_01.src,
    rating: 4.7,
    reviews: 2321,
    link: "/ve-may-bay-sai-gon-di-phap",
  },
  {
    id: 2,
    city: "Trung Quốc",
    name: "Vạn Lý Trường Thành",
    img: interntional_02.src,
    rating: 4.8,
    reviews: 5882,
    link: "/gia-ve-may-bay-tu-tphcm-di-trung-quoc",
  },
  {
    id: 3,
    city: "Philippines",
    name: "Venice Grand Canal",
    img: interntional_03.src,
    rating: 4.7,
    reviews: 8817,
    link: "/ve-may-bay-tu-sai-gon-di-philippines",
  },
  {
    id: 4,
    city: "Việt Nam",
    name: "Hang Rái, Ninh Thuận",
    img: interntional_04.src,
    rating: 4.8,
    reviews: 1086,
    link: "/da-nang",
  },
  {
    id: 5,
    city: "Pháp",
    name: "Tháp Eiffel",
    img: paris.src,
    rating: 4.9,
    reviews: 8342,
    link: "/ve-may-bay-sai-gon-di-phap",
  },
  {
    id: 6,
    city: "Rome, Ý",
    name: "Đấu trường La Mã",
    img: interntional_06.src,
    rating: 4.8,
    reviews: 9521,
    link: "/ve-may-bay-di-y-vietnam-airlines",
  },
  {
    id: 7,
    city: "Việt Nam",
    name: "Sa Pa",
    img: interntional_05.src,
    rating: 4.9,
    reviews: 7600,
    link: "/ve-may-bay-da-nang-di-sapa",
  },
];


const ITEMS_PER_VIEW_MOBILE = 3.5;

const ITEMS_PER_VIEW = 5.5;

const TravelSuggestion = () => {
  const [index, setIndex] = useState(0);
  const [indexmobile, setIndexMobile] = useState(0);

  const handleNext = () => {
    if (index + ITEMS_PER_VIEW < places.length) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };


  const handleNextMobile = () => {
    if (indexmobile + ITEMS_PER_VIEW_MOBILE < places.length) setIndexMobile(indexmobile + 1);
  };

  const handlePrevMobile = () => {
    if (indexmobile > 0) setIndexMobile(indexmobile - 1);
  };
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.children;
    gsap.fromTo(
      cards,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.5, ease: "power2.out" }
    );
  }, []);

    
  return (
    <div className="container my-5 position-relative">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
         <div className="d-flex align-items-center">
          <Flag 
            style={{ marginRight: "10px" }}
            size={32}
            color="#2d4f85"
            className="mb-1"
          />
          <h1 className="fw-bold promo-header mb-0">
           Địa điểm có thể bạn sẽ thích
          </h1>
        </div>
        <a href="#" className="text-decoration-none fw-semibold small text-primary">
          Xem thêm →
        </a>
      </div>

      {/* Slide pc */}
      <div className="d-none d-md-block overflow-hidden  position-relative">
        <div
          className="d-flex smooth-slide"
          style={{
            transform: `translateX(-${index * (100 / ITEMS_PER_VIEW)}%)`,
            transition: "transform 0.6s ease",
            width: `${(places.length / ITEMS_PER_VIEW) * 100}%`,
            gap: "16px", // ✅ khoảng cách giữa các card
          }}
          ref={containerRef}
        >
         {places.map((place) => (
            <Link
              key={place.id}
              href={place.link}
              className="travel-card position-relative flex-shrink-0 rounded-3 overflow-hidden text-decoration-none"
              style={{
                width: `calc((100% / ${ITEMS_PER_VIEW}) - 16px)`,
                height: "320px",
              }}
            >
              {/* Ảnh full */}
              <Image
                src={place.img}
                alt={`Vé máy bay đi ${place.city} – ${place.name}`}
                fill
                className="object-fit-cover"
              />

              {/* Overlay nội dung */}
              <div className="travel-overlay d-flex flex-column justify-content-end text-white p-3">
                <div className="mb-1 small text-warning fw-semibold">
                  Vietnam Tickets
                </div>

                <h6 className="fw-bold mb-1">{place.name}</h6>

                <small className="text-light">
                  {place.city} • ⭐ {place.rating}/5 (
                  {place.reviews.toLocaleString("vi-VN")})
                </small>
              </div>

              {/* Icon yêu thích (không điều hướng) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="btn btn-light p-1 rounded-circle position-absolute top-0 end-0 m-2 shadow-sm"
              >
                <Heart color="pink" size={22} />
              </button>
            </Link>
          ))}

        </div>

        {/* Nút trái */}
        {index > 0 && (
          <button
            className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y"
            onClick={handlePrev}
            style={{ width: 46, height: 46 }}
          >
            <ArrowLeft />
          </button>
        )}

        {/* Nút phải */}
        {index + ITEMS_PER_VIEW < places.length && (
          <button
            className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y"
            onClick={handleNext}
            style={{ width: 46, height: 46 }}
          >
            <ArrowRight  />
          </button>
        )}
      </div>

       {/* Slide mobile */}
      <div className="d-block d-md-none overflow-auto position-relative">
        <div
          className="d-flex smooth-slide"
          style={{
            gap: "16px",
            padding: "10px 0",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {places.map((place) => (
            <Link
              key={place.id}
              href={place.link}
              className="travel-card position-relative flex-shrink-0 rounded-3 overflow-hidden text-decoration-none"
              style={{ width: "75%", height: "320px", scrollSnapAlign: "start" }}
            >
              {/* Ảnh full */}
              <Image
                src={place.img}
                alt={`Vé máy bay đi ${place.city} – ${place.name}`}
                fill
                className="object-fit-cover"
              />

              {/* Overlay nội dung */}
              <div className="travel-overlay d-flex flex-column justify-content-end text-white p-3">
                <div className="mb-1 small text-warning fw-semibold">
                  Trip.Best
                </div>

                <h6 className="fw-bold mb-1">{place.name}</h6>

                <small className="text-light">
                  {place.city} • ⭐ {place.rating}/5 (
                  {place.reviews.toLocaleString("vi-VN")} đánh giá)
                </small>
              </div>

              {/* Icon yêu thích – không điều hướng */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="btn btn-light p-1 rounded-circle position-absolute top-0 end-0 m-2 shadow-sm"
                aria-label="Yêu thích"
              >
                <Heart color="pink" size={22} />
              </button>
            </Link>
          ))}
        </div>
        {/* {indexmobile > 0 && (
          <button
            className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y"
            onClick={handlePrevMobile}
            style={{ width: 46, height: 46 }}
          >
            <ArrowLeft />
          </button>
        )}

 
        {indexmobile + ITEMS_PER_VIEW < places.length && (
          <button
            className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y"
            onClick={handleNextMobile}
            style={{ width: 46, height: 46 }}
          >
            <ArrowRight  />
          </button>
        )} */}
      </div>
      
    </div>
  );
};

export default TravelSuggestion;
