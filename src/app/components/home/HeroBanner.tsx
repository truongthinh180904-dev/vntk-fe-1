"use client";


import PluginSearh from "../plugin/SearchHome";
import banner from "../../assets/img/home/banner.webp";
import banner_01 from "../../assets/img/home/imgbanner01.png";
import banner_02 from "../../assets/img/home/imgbanner02.png";
import banner_03 from "../../assets/img/home/imgbanner03.png";
import banner_04 from "../../assets/img/home/imgbanner04.png";
import banner_05 from "../../assets/img/home/imgbanner05.webp";
import banner_06 from "../../assets/img/home/imgbanner06.png";
import probanner from "../../assets/img/promotion/banner-promotion-2.png";
import probanner1 from "../../assets/img/promotion/banner-promotion-3.png";
import probanner2 from "../../assets/img/promotion/banner-promotion-4.png";
import probanner3 from "../../assets/img/promotion/banner-promotion-5.png";
import { useEffect, useState } from "react";
import ServiceOptions from "./ServiceOptions";

interface HeroBannerProps {
    banners: any[];
    background?: {
    image_path: string;
    alt?: string;
  } | null;
}

export default function HeroBanner({ background , banners  }: HeroBannerProps) {
   const slides = [
    banner_06.src,
    probanner.src,
    probanner1.src,
    probanner2.src,
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
  const backgroundUrl =
  background?.image_path
    ? `http://127.0.0.1:8000/storage/${background.image_path}`
    : banner?.src || "/images/default-bg.jpg";

    
    const leftBanner =
    banners?.find((b) => b.id === 1)?.image_path
      ? `http://127.0.0.1:8000/storage/${banners.find((b) => b.id === 1)?.image_path}`
      : banner_05.src;

    const rightSlides =
      banners && banners.length > 0
        ? banners
            .filter((b) => b.id !== 1)
            .map((b) => `http://127.0.0.1:8000/storage/${b.image_path}`)
        : [probanner.src, probanner1.src, probanner2.src, probanner3.src];

  // Thêm state để theo dõi xem có phải màn hình Desktop không
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
      // Hàm kiểm tra độ rộng màn hình
      const checkIsDesktop = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      // Chạy lần đầu khi load trang
      checkIsDesktop();

      // Lắng nghe sự kiện resize màn hình
      window.addEventListener("resize", checkIsDesktop);
      return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <>
      {/* Banner chính */}
      <section className="d-none d-md-block" style={{ position: "relative" }}>
        <div
          className="container-fluid banner_home d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 20,
          }}
        >
       
        </div>

        {/* Search box */}
        {isDesktop && (
        <div
          className="position-absolute w-100 d-flex justify-content-center"
          style={{
            top:"2%",
            bottom: "20%",
            left:"-10px",
            zIndex: 999,
          }}
        >
          <div className="container">
            <PluginSearh />
          </div>
        </div>
        )}
        {/* Thông tin giới thiệu */}
        <div
          className="container position-absolute start-50 translate-middle-x"
          style={{
            bottom: "-55px",
            zIndex: 100,
          }}
        >
          <div className="bg-light rounded shadow-sm py-3 px-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
            {/* Item 1 */}
            <div className="d-flex align-items-center gap-2">
              <img src={banner_01.src} alt="Kinh nghiệm" width={40} height={40} />
              <div>
                <p className="mb-0 small text-danger fw-bold">
                  Với 15 năm kinh nghiệm
                </p>
                <span className="badge bg-primary">TẠO DỰNG LÒNG TIN</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="d-flex align-items-center gap-2">
              <img src={banner_02.src} alt="Uy tín" width={40} height={40} />
              <p className="mb-0 small fw-bold">Uy tín đặt lên hàng đầu</p>
            </div>

            {/* Item 3 */}
            <div className="d-flex align-items-center gap-2">
              <img src={banner_03.src} alt="Giá hợp lý" width={40} height={40} />
              <p className="mb-0 small fw-bold">Luôn cung cấp mức giá hợp lý</p>
            </div>

            {/* Item 4 */}
            <div className="d-flex align-items-center gap-2">
              <img src={banner_04.src} alt="Khách hàng" width={40} height={40} />
              <p className="mb-0 small fw-bold">
                99% Khách hàng hài lòng
              </p>
            </div>
          </div>
        </div>
      </section>
      <ServiceOptions />

      {/* Phần dưới (banner + carousel) */}
      <div className="d-none d-md-block banner-sales-container">
      <div className="container">
        <div className="row g-3">
          {/* Banner bên trái */}
          <div className="col-md-8">
            <div className="banner-main">
              <img
                src={leftBanner}
                alt="Mega Sale"
              />
              <div className="banner-overlay"></div>
            </div>
          </div>

        <div className="col-md-4 d-none d-md-block">
            <div className="slide-container-pc">
             <img
              src={rightSlides[current]}
              alt={`Slide ${current + 1}`}
              className="slide-image-pc"
              
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
          {/* Slide bên phải */}
          <div className="col-md-4 d-block d-md-none">
            <div className="slide-container">
             <img
              src={rightSlides[current]}
              alt={`Slide ${current + 1}`}
              className="slide-image"
              style={{
                border: "4px solid #fff",
                borderRadius: "10px",
              }}
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
    </>
  );
}
