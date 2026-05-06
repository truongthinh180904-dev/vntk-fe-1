import { useEffect, useRef } from "react";
import { MapPinCheckInside, Plane } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import quocgia01 from "../../assets/img/home/quoc-gia-01.png";
import quocgia02 from "../../assets/img/home/quoc-gia-02.png";
import quocgia03 from "../../assets/img/home/quoc-gia-03.png";
import quocgia04 from "../../assets/img/home/quoc-gia-04.png";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { title: "Vietnam", subtitle: "Việt Nam", img: quocgia01.src , country: "Việt Nam", price: "Chỉ từ 215k/người"},
  { title: "Seoul", subtitle: "Hàn Quốc", img: quocgia02.src , country: "Hàn Quốc", price: "Chỉ từ 215k/người" },
  { title: "Istanbul", subtitle: "Thổ Nhĩ Kỳ", img: quocgia03.src , country: "Thổ Nhĩ Kỳ", price: "Chỉ từ 215k/người" },
  { title: "Liverpool", subtitle: "Anh Quốc", img: quocgia04.src , country: "Anh Quốc", price: "Chỉ từ 215k/người" },
  { title: "Tokyo", subtitle: "Nhật Bản", img: quocgia04.src , country: "Nhật Bản", price: "Chỉ từ 215k/người" },
];

export default function NewsDiscovery() {
  const containerRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type

  useEffect(() => {
    const boxes = containerRef.current?.querySelectorAll(".destination-card") || [];

    boxes.forEach((box: Element, i: number) => { // Add type annotations for box and i
      gsap.fromTo(
        box,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.8,
          ease: "power3.out",
          delay: i * 0.5,
          scrollTrigger: {
            trigger: box,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
    <div className="container-fluid mt-2 mb-2 gap-10" style={{backgroundColor:'aliceblue'}}>
        {/* Desktop view */}
      <div className="container mt-2 d-none d-md-block">
        

        <div className="row g-2 mt-3 mb-2 align-items-stretch" ref={containerRef}>
          {destinations.map((item, index) => (
            <div
              key={index}
              className={`col-12 col-md-${index === 0 ? 4 : 2} destination-card`}
            >
              {/* Tên quốc gia nổi bật */}
              <div className="country-badge">
                {item.country}
              </div>
              <div
                className="position-relative rounded-3 shadow overflow-hidden h-100"
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "300px",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <div
                  className="position-absolute bottom-0 w-100 p-3 text-white"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  }}
                >
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    {item.title}
                  </p>
                  <p className="mb-0 opacity-75" style={{ fontSize: "12px" }}>
                    {item.subtitle}
                  </p>
                </div>
                <Plane
                  size={18}
                  color="#4DAAF6"
                  className="position-absolute top-0 end-0 m-3"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="container mt-5 d-block d-md-none">
        <h2 className="text-xl fw-semibold mb-3">
          Đi khắp thế giới cùng{" "}
          <span className="text-primary">VIETNAM TICKETS</span>
        </h2>
        <div
          className="slider-scroll d-flex gap-3 pb-2"
          style={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {destinations.map((item, index) => (
            <div
              key={index}
              className="rounded-3 shadow flex-shrink-0"
              style={{
                width: "250px",
                height: "300px",
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                scrollSnapAlign: "start",
                position: "relative",
              }}
            >
              <div
                className="position-absolute bottom-0 w-100 p-2 text-white"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >

              
              {/* Overlay hiển thị khi hover */}
              <div className="price-overlay">
                <p className="price-text">{item.price}</p>
              </div>

                <p className="mb-0" style={{ fontSize: "14px" }}>
                  {item.title}
                </p>
                <p className="mb-0 opacity-75" style={{ fontSize: "12px" }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}