import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Imports - Giữ nguyên đường dẫn của bạn
import chungnhan01 from "../../assets/img/home/chung-nhan01.png";
import chungnhan02 from "../../assets/img/home/bang-khen_1.png";
import chungnhan03 from "../../assets/img/home/top-dai-ly_01.png";
import chungnhan04 from "../../assets/img/home/top10_01.png";

import vnexpress from "../../assets/img/home/VnExpress_logo.png";
import cafef from "../../assets/img/home/logo-cafef.png";
import thanhnien from "../../assets/img/home/logo-doan-thanh-nien.png";
import vtv3 from "../../assets/img/home/logo-vtv3.png";
import htv9 from "../../assets/img/home/logo-htv9.png";
import kenh14 from "../../assets/img/home/kenh14-logo-2.png";

import airasia from "../../assets/img/home/airasia.png.png";
import bamboo from "../../assets/img/home/bamboo.png.png";
import emirates from "../../assets/img/home/emiratesair.png.png";
import qatar from "../../assets/img/home/quataair.png.png";
import singapore from "../../assets/img/home/singaporeair.png.png";
import asiana from "../../assets/img/home/asianair.png.png";
import cathay from "../../assets/img/home/cathay.png.png";
import pacific from "../../assets/img/home/pacificair.png.png";
import silkair from "../../assets/img/home/silkair.png.png";
import thai from "../../assets/img/home/thaiair.png.png";
import vnal from "../../assets/img/home/logo-vietnam-airline.png";
import vj from "../../assets/img/home/vietjet.png";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { img: chungnhan01, title: "Travelers’ Choice", subtitle: "Chứng nhận Travelers’ Choice từ TripAdvisor" },
  { img: chungnhan02, title: "Top công ty lữ hành", subtitle: "Công ty tổ chức đặt tour trực tuyến nhiều nhất" },
  { img: chungnhan03, title: "Top xuất sắc", subtitle: "Top đại lý xuất sắc nhất của các hãng hàng không" },
  { img: chungnhan04, title: "Top đại lý du lịch", subtitle: "Top đại lý du lịch được yêu thích nhất" },
];

const media = [
  { img: vnexpress, alt: "VNExpress" },
  { img: cafef, alt: "CafeF" },
  { img: thanhnien, alt: "Thanh Niên" },
  { img: vtv3, alt: "VTV3" },
  { img: htv9, alt: "HTV9" },
  { img: kenh14, alt: "Kenh14" },
];

const airlines = [
  { img: airasia, alt: "AirAsia" },
  { img: bamboo, alt: "Bamboo" },
  { img: emirates, alt: "Emirates" },
  { img: qatar, alt: "Qatar" },
  { img: singapore, alt: "Singapore Airlines" },
  { img: asiana, alt: "Asiana" },
  { img: cathay, alt: "Cathay" },
  { img: pacific, alt: "Pacific" },
  { img: silkair, alt: "Silkair" },
  { img: thai, alt: "Thai Airways" },
  { img: vnal, alt: "Vietnam Airlines" },
  { img: vj, alt: "VietJet" },
];

const AwardsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Khởi tạo matchMedia để tách biệt Mobile và PC
    const mm = gsap.matchMedia();
    const cards = containerRef.current?.querySelectorAll(".animate-on-scroll");

    if (!cards || cards.length === 0) return;

    // Chỉ chạy hiệu ứng khi màn hình >= 768px (PC/Tablet ngang)
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            delay: i * 0.1, // Delay nhỏ để tạo hiệu ứng gợn sóng (stagger)
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Mobile (< 768px): Tự động revert về trạng thái ban đầu (hiện hình)
    // Không cần viết thêm code gì ở đây, mm.revert() sẽ lo liệu.

    return () => mm.revert(); // Dọn dẹp animation khi component bị hủy
  }, []);

  return (
    <div className="awards-section py-5" style={{ color: "#2D4271" }} ref={containerRef}>
      <div className="container">
        <h4 className="text-center mb-5 fw-bold">THÀNH TỰU GIẢI THƯỞNG</h4>
        <div className="row text-center mb-5">
          {awards.map((item, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="box-shadow border rounded p-3 h-100 bg-white animate-on-scroll">
                {/* Fix: Bỏ .src nếu ảnh import trực tiếp */}
                <img loading="lazy" src={item.img.src} alt={item.title} className="mb-2" width="60" />
                <h6>{item.title}</h6>
                <p style={{ fontSize: "0.9rem" }}>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <h4 className="text-center mb-5 fw-bold" style={{ color: "#2D4271" }}>
          TRUYỀN THÔNG NÓI VỀ CHÚNG TÔI
        </h4>
        <div className="row justify-content-center mb-5">
          {media.map((item, i) => (
            <div className="col-6 col-sm-4 col-md-2 mb-4 d-flex justify-content-center" key={i}>
              <div className="logo-box animate-on-scroll">
                <img loading="lazy" src={item.img.src} alt={item.alt} style={{ maxHeight: "50px", maxWidth: "100%" }} />
              </div>
            </div>
          ))}
        </div>

        <h4 className="d-none d-md-block text-center mb-5 fw-bold" style={{ color: "#2D4271" }}>
          ĐỐI TÁC HÀNG KHÔNG CỦA VIETNAM TICKETS
        </h4>
        <h4 className="d-block d-md-none text-center mb-5 fw-bold" style={{ color: "#2D4271" }}>
          ĐỐI TÁC CỦA VIETNAM TICKETS
        </h4>
        <div className="row justify-content-center">
          {airlines.map((item, i) => (
            <div className="col-6 col-sm-4 col-md-2 mb-4 d-flex justify-content-center" key={i}>
              <div className="logo-box animate-on-scroll">
                <img loading="lazy" src={item.img.src} alt={item.alt} style={{ maxHeight: "50px", maxWidth: "100%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;