"use client";

import Image from "next/image";
import quocgia01 from "../../assets/img/home/quoc-gia-01.png";
import quocgia02 from "../../assets/img/home/quoc-gia-02.png";
import quocgia03 from "../../assets/img/home/quoc-gia-03.png";
import quocgia04 from "../../assets/img/home/quoc-gia-04.png";
import { MapPinCheckInside, Plane } from "lucide-react";

type Destination = {
  name: string;
  image: string;
  country: string;
  price: string;
};

const destinations: Destination[] = [
  {
    name: "Mường Thanh",
    image: quocgia01.src,
    country: "Hàn Quốc",
    price: "Chỉ từ 215k/người",
  },
  {
    name: "Vinpearl",
    image: quocgia02.src,
    country: "Nhật Bản",
    price: "Chỉ từ 825k/người",
  },
  {
    name: "Accor",
    image: quocgia03.src,
    country: "Thái Lan",
    price: "Chỉ từ 925k/người",
  },
  {
    name: "Movenpick",
    image: quocgia04.src,
    country: "Singapore",
    price:  "Chỉ từ 1025k/người",
  }, {
    name: "Movenpick",
    image: quocgia04.src,
    country: "Singapore",
    price:  "Chỉ từ 1025k/người",
  }
];

export default function TravelDestinations() {
  return (
    <section className="travel-destinations">
      <div className="container">
      <h1 className="fw-bold text-white  promo-header d-flex align-items-center mb-0">
          <MapPinCheckInside style={{ marginRight: "5px" }} size={35} color="#f5f9ffff" className="mb-1" />
          Điểm Đến Nổi Bật
      </h1>

        {/* Grid với 5 card cố định */}
        <div className="destinations-grid">
          {destinations.map((dest, idx) => (
            <div key={idx} className="destination-card">
              <img
                src={dest.image}
                alt={dest.name}
                style={{ width: "100%", height: "350px" }}
                className="destination-image"
              />
              
              {/* Tên quốc gia nổi bật */}
              <div className="country-badge">
                {dest.country}
              </div>
              
              {/* Overlay hiển thị khi hover */}
              <div className="price-overlay">
                <p className="price-text">{dest.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}