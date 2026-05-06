"use client";

import Image from "next/image";
import Link from "next/link";
import "./FeaturedDestinations.css";
import img1 from "../assets/img/domestic/miennam_08.jpg";
import img2 from "../assets/img/domestic/kham-pha-nha-trang.jpg";
import img3 from "../assets/img/domestic/Tp-HCM.jpg";
import img4 from "../assets/img/domestic/mientrung_02.jpg";
import img5 from "../assets/img/domestic/mientrung_03.jpg";
import img6 from "../assets/img/domestic/hanoi.jpg";
import img7 from "../assets/img/domestic/ha-giang.jpg";
import img8 from "../assets/img/domestic/img_mb_4.png";


interface Destination {
  id: number;
  name: string;
  price: string;
  image: string;
  link: string;        // 👈 thêm link
  spanRows?: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Miền Tây Nam Bộ",
    price: "215k/người",
    image: img1.src,
    link: "/ve-may-bay-di-can-tho",
    spanRows: 2,
  },
  {
    id: 2,
    name: "Nha Trang",
    price: "825k/người",
    image: img2.src,
    link: "/ve-may-bay-di-nha-trang",
  },
  {
    id: 3,
    name: "Tp. Hồ Chí Minh",
    price: "320k/người",
    image: img3.src,
    link: "/tp-ho-chi-minh",
  },
  {
    id: 4,
    name: "Huế",
    price: "620k/người",
    image: img4.src,
    link: "/ve-may-bay-di-hue",
    spanRows: 2,
  },
  {
    id: 5,
    name: "Đà Nẵng",
    price: "1.000k/người",
    image: img5.src,
    link: "/da-nang",
  },
  {
    id: 6,
    name: "Hà Nội",
    price: "580k/người",
    image: img6.src,
    link: "/ha-noi",
  },
  {
    id: 7,
    name: "Hà Giang",
    price: "1.000k/người",
    image: img7.src,
    link: "/ha-giang",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="featured-container container mb-2">
      <div className="featured-grid">
        {destinations.map((d) => (
          <Link
            key={d.id}
            href={d.link}
            className={`featured-card ${d.spanRows === 2 ? "span-2" : ""}`}
          >
            <Image
              src={d.image}
              alt={`Vé máy bay đi ${d.name} giá rẻ`}
              fill
              className="featured-bg"
              priority
            />

            <div className="featured-overlay" />

            <div
              className="featured-logo"
              style={{ fontWeight: "bold", fontSize: "14px" }}
            >
              <span>{d.name}</span>
            </div>

            <div className="featured-price">
              <span>Chỉ từ {d.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
