"use client";

import React, { useEffect, useState } from "react";
import banner_05 from "../assets/img/home/imgbanner05.png";
import banner_06 from "../assets/img/home/imgbanner06.png";
import bannerne from "../assets/img/home/banner.png";
import WhyChooseUs from "./WhyChooseUs";
interface BannerItem {
  id: number;
  title: string;
  img: string;
  link: string;
}

const SpecialDeals: React.FC = () => {
  const banners: BannerItem[] = [
    {
      id: 1,
      title: "Khám phá thế giới",
      img: "/banner1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Khám phá Thái Lan",
      img: "/banner2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Khám phá cùng Mastercard",
      img: "/banner3.jpg",
      link: "#",
    },
  ];
const slides = [
    banner_06.src,
    bannerne.src,
    banner_06.src,
    bannerne.src,
  ];

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
     style={{
      marginTop:"100px"
    }}
      className="container-fluid"
    >
         <div className="">
              <div className="container">
                <div className="row g-3">
                  {/* Banner bên trái */}
                  <div className="col-md-8">
                    <div className="banner-main">
                      <img
                        src={banner_05.src}
                        alt="Mega Sale"
                      />
                      <div className="banner-overlay"></div>
                    </div>
                  </div>

                  {/* Slide bên phải */}
                  <div className="col-md-4">
                    <div className="slide-container">
                      <img
                        src={slides[current]}
                        alt={`Slide ${current + 1}`}
                        className="slide-image"
                      />
                      
                      <div className="slide-overlay"></div>


                      {/* Indicators */}
                      <div className="slide-indicators">
                        {slides.map((_, i) => (
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
