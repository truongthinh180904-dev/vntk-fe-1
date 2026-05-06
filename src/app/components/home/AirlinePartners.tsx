"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, TicketsPlane } from "lucide-react";
import Image from "next/image";

// logo import giữ nguyên chỗ bạn
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

type Airline = {
  name: string;
  logo: string;
};

const airlines: Airline[] = [
  { name: "Emirates", logo: emirates.src },
  { name: "Qatar Airways", logo: qatar.src },
  { name: "Singapore Airlines", logo: singapore.src },
  { name: "VietJet Air", logo: vj.src },
  { name: "Air Asia", logo: airasia.src },
  { name: "Pacific Airlines", logo: pacific.src },
  { name: "SilkAir", logo: silkair.src },
  { name: "Thai Airways", logo: thai.src },
  { name: "Vietnam Airlines", logo: vnal.src },
  { name: "Asiana Airlines", logo: asiana.src },
  { name: "Emirates", logo: emirates.src },
  { name: "Qatar Airways", logo: qatar.src },
  { name: "Singapore Airlines", logo: singapore.src },
  { name: "VietJet Air", logo: vj.src },
  { name: "Air Asia", logo: airasia.src },
  { name: "Pacific Airlines", logo: pacific.src },
  { name: "SilkAir", logo: silkair.src },
  { name: "Thai Airways", logo: thai.src },
  { name: "Vietnam Airlines", logo: vnal.src },
  { name: "Asiana Airlines", logo: asiana.src },
];

// chia thành các nhóm 10 (2 hàng x 5)
const chunkArray = (arr: Airline[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function AirlinePartners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const airlineGroups = chunkArray(airlines, 10); // mỗi group 10 logo

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container my-5">
     <h1 className="fw-bold promo-header d-flex align-items-center mb-4">
       <TicketsPlane style={{ marginRight: "10px" }} size={35} color="#2d4f85" className="mb-1" />
       Đối Tác Hàng Không Của Chúng Tôi
    </h1>
      <div>
  {/* Desktop version */}
  <div className="position-relative d-none d-md-block">
    {/* Nút điều hướng */}
    <button className="scroll-btn left" onClick={() => scroll("left")}>
      <ChevronLeft size={24} />
    </button>
    <button className="scroll-btn right" onClick={() => scroll("right")}>
      <ChevronRight size={24} />
    </button>

    {/* Slide group */}
    <div className="airline-slider-wrapper" ref={scrollRef}>
      {airlineGroups.map((group, idx) => (
        <div key={idx} className="airline-slide">
          {group.map((airline, i) => (
            <div key={i} className="airline-card">
              <Image
                src={airline.logo}
                alt={airline.name}
                width={160}
                height={80}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>

  {/* Mobile version */}
  <div className="d-block d-md-none">
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        gap: "12px",
        padding: "10px",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {airlines.map((airline, i) => (
        <div
          key={i}
          style={{
            flex: "0 0 auto",
            scrollSnapAlign: "center",
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "6px",
            background: "#fff",
            minWidth: "120px",
            textAlign: "center",
          }}
        >
          <Image
            src={airline.logo}
            alt={airline.name}
            width={100}
            height={60}
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  </div>
</div>

      
    </section>
  );
}
