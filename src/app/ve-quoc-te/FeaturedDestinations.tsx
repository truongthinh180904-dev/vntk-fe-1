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

import interntional_01 from "../assets/img/international/internation_01.jpg";
import interntional_02 from "../assets/img/international/nhatban.jpg";
import interntional_03 from "../assets/img/international/thuysi.jpg";
import interntional_04 from "../assets/img/international/sydney.jpg";
import interntional_05 from "../assets/img/international/hanquoc.jpg";
import interntional_06 from "../assets/img/international/canada.webp";
import interntional_07 from "../assets/img/domestic/bgdomestic6.jpg";
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
    name: "Viện bảo tàng Louvre",
    price: "215 USD/người",
    image: interntional_01.src,
    link: "/ve-may-bay-di-paris",
    spanRows: 2,
  },
  {
    id: 2,
    name: "Nhật Bản",
    price: "315 USD/người",
    image: interntional_02.src,
    link: "/ve-may-bay-di-nagoya-nhat-ban",
  },
  {
    id: 3,
    name: "Thụy Sĩ",
    price: "215 USD/người",
    image: interntional_03.src,
    link: "/ve-may-bay-di-thuy-si",
  },
  {
    id: 4,
    name: "Sydney",
    price: "215 USD/người",
    image: interntional_04.src,
    link: "/ve-may-bay-da-nang-sydney",
    spanRows: 2,
  },
  {
    id: 5,
    name: "Hàn Quốc",
    price: "320 USD/người",
    image: interntional_05.src,
    link: "/ve-may-bay-di-han-quoc-vietnam-airlines",
  },
  {
    id: 6,
    name: "London",
    price: "215 USD/người",
    image: interntional_07.src,
    link: "/ve-may-bay-di-london",
  },
  {
    id: 7,
    name: "Canada",
    price: "200 USD/người",
    image: interntional_06.src,
    link: "/ve-may-bay-di-canada",
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
