import { useEffect, useRef } from "react";
import { Plane } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import quocgia01 from "../../assets/img/domestic/ha-giang-vn.png";
import quocgia02 from "../../assets/img/home/quoc-gia-02.png";
import quocgia03 from "../../assets/img/international/hoa-ki.webp";
import quocgia04 from "../../assets/img/home/quoc-gia-04.png";
import quocgia05 from "../../assets/img/international/paris.jpg";
import EvaCardLink from '../../components/button/EvaCardLink';
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    title: "Hà Giang",
    subtitle: "Việt Nam",
    img: quocgia01.src,
    country: "Việt Nam",
    price: "Chỉ từ 215k/người",
    link: "/ve-noi-dia",
  },
  {
    title: "Seoul",
    subtitle: "Hàn Quốc",
    img: quocgia02.src,
    country: "Hàn Quốc",
    price: "Chỉ từ 215k/người",
    link: "/ve-may-bay-tu-tphcm-di-han-quoc",
  },
  {
    title: "New York",
    subtitle: "Hoa Kì",
    img: quocgia03.src,
    country: "Hoa Kì",
    price: "Chỉ từ 215k/người",
    link: "/ve-may-bay-di-bang-new-york",
  },
  {
    title: "Tokyo",
    subtitle: "Nhật Bản",
    img: quocgia04.src,
    country: "Nhật Bản",
    price: "Chỉ từ 215k/người",
    link: "/ve-may-bay-hcm-tokyo",
  },
  {
    title: "Paris",
    subtitle: "Pháp",
    img: quocgia05.src,
    country: "Pháp",
    price: "Chỉ từ 215k/người",
    link: "/ve-may-bay-sai-gon-di-phap",
  },
];


export default function WorldDestinations() {
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
    <div className="container-fluid p-4" style={{backgroundColor:'aliceblue'}}>
        {/* Desktop view */}
      <div className="container mt-2 d-none d-md-block">     
      <div
    className="row g-2 mt-3 mb-2 align-items-stretch"
    ref={containerRef}
  >
  {destinations.map((item, index) => (
    <div
      key={index}
      className={`col-12 col-md-${index === 0 ? 4 : 2} destination-card`}
    >
      <div className="position-relative h-100 rounded-3 overflow-hidden shadow">
        {/* LINK PHỦ FULL */}
        <Link
          href={item.link}
          aria-label={`Du lịch ${item.country}`}
          className="stretched-link"
        />

        {/* Badge quốc gia */}
        <div className="country-badge">
          {item.country}
        </div>

        {/* Background image */}
        <div
          className="h-100"
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
    </div>
  ))}
</div>


      </div>

      {/* Mobile view */}
      <div className=" mt-5 d-block d-md-none">
        <h1 className="fw-bold promo-header mb-3">
                
             Khám phá thế giới cùng  <br /> VietNam Tickets 
               </h1>
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