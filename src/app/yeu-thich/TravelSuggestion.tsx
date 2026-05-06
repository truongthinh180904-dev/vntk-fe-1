"use client";

import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Flag, Heart, PlaneTakeoff, ThumbsUp } from "lucide-react";
import paris from "../assets/img/international/paris.jpg";
import interntional_01 from "../assets/img/international/internation_01.jpg";
import interntional_02 from "../assets/img/international/internation_02.jpg";
import interntional_03 from "../assets/img/international/internation_03.jpg";
import interntional_04 from "../assets/img/international/internation_04.jpg";
import interntional_05 from "../assets/img/international/internation_05.jpg";
import interntional_06 from "../assets/img/international/internation_06.jpg";
import { gsap } from "gsap";


interface Place {
  id: number;
  city: string;
  name: string;
  img: string;
  rating: number;
  reviews: number;
}

const places: Place[] = [
  { id: 1, city: "Milan", name: "Nhà thờ chính tòa Milano", img: interntional_01.src, rating: 4.7, reviews: 2321 },
  { id: 2, city: "Bắc Kinh", name: "Universal Beijing Resort", img: interntional_02.src, rating: 4.8, reviews: 51882 },
  { id: 3, city: "Paris", name: "Viện bảo tàng Louvre", img: interntional_03.src, rating: 4.7, reviews: 8817 },
  { id: 4, city: "Vatican", name: "Bảo tàng Vatican", img: interntional_04.src, rating: 4.8, reviews: 1086 },
  { id: 5, city: "Tokyo", name: "Tháp Tokyo Skytree", img: interntional_05.src, rating: 4.9, reviews: 7600 },
  { id: 6, city: "Seoul", name: "Tháp Namsan Seoul", img: interntional_06.src, rating: 4.8, reviews: 9521 },
  { id: 7, city: "Singapore", name: "Gardens by the Bay", img: paris.src, rating: 4.9, reviews: 8342 },
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
    <div className="conainer-fluid" style={{backgroundColor:"aliceblue", padding: "20px 0" }}>
      <div className="container position-relative" style={{backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"}}>
      {/* Header */}
      <div className="d-none d-md-flex d-flex justify-content-between align-items-center mb-3">
         <div className="d-flex align-items-center">
          <PlaneTakeoff
            style={{ marginRight: "10px" }}
            size={32}
            color="#2d4f85"
            className=" mb-1"
          />
          <h1 className="fw-bold promo-header mb-0">
           Điểm đến yêu thích của bạn
          </h1>
        </div>
       <a
        href="#"
        className="inline-flex items-center gap-2 text-primary fw-semibold small text-decoration-none"
      >
        <span style={{marginRight:"2px"}}>Xem thêm</span>
        <ArrowRight size={16} />
      </a>

      </div>
       <div className="d-flex d-md-none d-flex justify-content-between align-items-center mb-3">
         <div className="d-flex align-items-center">
          <PlaneTakeoff
            style={{ marginRight: "10px" }}
            size={32}
            color="#2d4f85"
            className=" mb-1"
          />
          <h1 className="fw-bold promo-header mb-0">
           Điểm đến yêu thích
          </h1>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-primary fw-semibold small text-decoration-none"
        >
          <span style={{marginRight:"2px"}}>Xem thêm</span>
          <ArrowRight size={16} />
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
            <div
              key={place.id}
              className="travel-card position-relative flex-shrink-0 rounded-3 overflow-hidden"
              style={{
                width: `calc((100% / ${ITEMS_PER_VIEW}) - 16px)`, // ✅ fix chính: trừ khoảng cách gap
                height: "320px",
              }}
            >
              {/* Ảnh full */}
              <Image src={place.img} alt={place.name} fill className="object-fit-cover" />

              {/* Overlay nội dung */}
              <div className="travel-overlay d-flex flex-column justify-content-end text-white p-3">
                <div className="mb-1 small text-warning fw-semibold">VietNam Tickets</div>
                <h6 className="fw-bold mb-1">{place.name}</h6>
                <small className="text-light">
                  {place.city} • ⭐ {place.rating}/5 ({place.reviews.toLocaleString("vi-VN")} đánh giá)
                </small>
              </div>

              {/* Icon yêu thích */}
             
                <Heart color="pink" size={25} className="btn btn-light p-1 rounded-circle position-absolute top-0 end-0 m-2 shadow-sm" />

            </div>
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
            <div
              key={place.id}
              className="travel-card position-relative flex-shrink-0 rounded-3 overflow-hidden"
               style={{ width: "75%", height: "320px", scrollSnapAlign: "start" }}
            >
              {/* Ảnh full */}
              <Image src={place.img} alt={place.name} fill className="object-fit-cover" />

              {/* Overlay nội dung */}
              <div className="travel-overlay d-flex flex-column justify-content-end text-white p-3">
                <div className="mb-1 small text-warning fw-semibold">Trip.Best</div>
                <h6 className="fw-bold mb-1">{place.name}</h6>
                <small className="text-light">
                  {place.city} • ⭐ {place.rating}/5 ({place.reviews.toLocaleString("vi-VN")} đánh giá)
                </small>
              </div>

              {/* Icon yêu thích */}
             
                <Heart color="pink" size={25} className="btn btn-light p-1 rounded-circle position-absolute top-0 end-0 m-2 shadow-sm" />

            </div>
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
    </div>
  );
};

export default TravelSuggestion;
