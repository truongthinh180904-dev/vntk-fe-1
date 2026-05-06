"use client";

import { Clock, Lock, Plane } from "lucide-react";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import banner from "../assets/img/domestic/banner-hero-2.webp";
import axios from "axios";
import Link from "next/link";
import EvaButton from '../components/button/EvaButton';
interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  slug:string;
  price: number;
  img: string;
}

const FlightDealsNew: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      const cacheKey = "flightsCache30";
      const cached = localStorage.getItem(cacheKey);

      // Nếu có cache và chưa hết hạn 30 phút → dùng cache
      if (cached) {
        const parsed = JSON.parse(cached);
        const thirtyMinutes = 5 * 60 * 1000; // 30 phút * 60 * 1000
        if (Date.now() - parsed.timestamp < thirtyMinutes) {
          setFlights(parsed.data);
          setLoading(false);
          return;
        }
      }

      // Nếu không có cache hoặc hết hạn → fetch API
      try {
        const response = await axios.get(
          `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?categories=48&per_page=4&orderby=modified&order=desc&_embed`
        );

        const data = response.data.map((post: any) => {
          const featuredImg =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/400x250?text=No+Image";

          return {
            id: post.id,
            from: post.excerpt?.rendered || "",
            to: post.title?.rendered || "",
            slug: post.slug,
            date: post.modified,
            price: post.meta?.price
              ? Number(post.meta.price)
              : Math.floor(Math.random() * 10_000_000) + 1_000_000,
            img: featuredImg,
            excerpt: post.excerpt?.rendered || "",
            link: post.link,
          };
        });

        setFlights(data);

        // Lưu vào localStorage với timestamp
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data })
        );
      } catch (err) {
        console.error("Lỗi khi fetch bài viết theo danh mục:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);


  useLayoutEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, [flights]);

  return (
    <div
      className="container-fluid py-4"
      style={{
        background:
          "radial-gradient(ellipse 30% 26% at 80% 0, rgba(255, 233, 236, 0.6), transparent), radial-gradient(ellipse 30% 26% at bottom left, rgba(255, 233, 236, 0.6), transparent), #fcf9f6",
      }}
    >
      <div className="container">
        <h1 className="fw-bold promo-header mb-3">
          <Plane size={35} color="#2d4f85" className="mb-1 me-2" />
          Vé máy bay quốc tế nhiều ưu đãi nhất
        </h1>

        <div className="row gx-4">
          {/* Right banner */}
          <div className=" d-none d-md-block col-lg-3 col-md-12 mt-4 mt-lg-0">
            <div
              className="card border-0 shadow-sm text-white text-center d-flex justify-content-center"
              style={{
                borderRadius: "12px",
                height: "332px",
                backgroundImage: `url(${banner.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  borderRadius: "6px",
                }}
              ></div>
              <div className="position-relative p-4">
                <h5 className="fw-semibold mb-3" style={{ lineHeight: "1.6" }}>
                  Vé quốc tế giá ưu đãi tốt nhất
                </h5>
                <button
                  className="fw-bold btn btn-primary px-4 py-2"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 3px 10px rgba(255,255,255,0.3)",
                  }}
                >
                  Khám Phá Ngay
                </button>
              </div>
            </div>
          </div>

          {/* Left list */}
          <div className="col-lg-9 col-md-12">
            {loading ? (
              <div className="text-center py-5">Đang tải dữ liệu...</div>
            ) : (
              <div ref={sliderRef} className="row">
                {flights.slice(0, 4).map((flight, i) => (
                  <div
                    key={flight.id}
                    ref={(el) => {
                      if (el) cardsRef.current[i] = el;
                    }}
                    className="col-md-6 col-12 mx-auto mb-4"
                  >
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        padding: "10px",
                        height: "100%",
                      }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ height: "100%" }}
                      >
                        {/* Left */}
                        <div
                          className="d-flex flex-column align-items-center justify-content-center"
                          style={{
                            width: "45%",
                            borderRight: "1.5px dashed #dee2e6",
                            paddingRight: "5px",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={flight.img}
                            alt={`Vé máy bay đi ${flight.to}`}
                            className="img-fluid mb-2"
                            style={{
                              maxHeight: "80px",
                              objectFit: "contain",
                              borderRadius: "5px",
                            }}
                          />
                          <div className="text-center">
                            <span className="small text-muted">Giá chỉ từ</span>
                            <div
                              className="fw-bold"
                              style={{ color: "#e74c3c", fontSize: "1rem" }}
                            >
                              {flight.price.toLocaleString("vi-VN")} VND
                            </div>
                          </div>
                        </div>

                        {/* Right */}
                        <div
                          className="flex-grow-1 ps-3 d-flex flex-column justify-content-between"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                          }}
                        >
                          <div>
                            <h6
                              className="fw-bold mb-1"
                              style={{
                                color: "#2D4271",
                                fontSize: "1rem",
                                lineHeight: "1.4",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              title={flight.to}
                            >
                              {flight.to}
                            </h6>
                            <p
                              className="text-muted small mb-1"
                              style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: flight.from,
                                  }}
                              
                            >
                            </p>
                           <p
                        className="text-muted small mb-2"
                        style={{
                          fontSize: "0.85rem",
                          color: "#777",
                        }}
                      >
                      <Clock size={16} style={{color: "#777"}} className="mb-1" /> {new Date(flight.date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>

                          </div>

                          <div className="mt-auto">
                              <div
                                  className="btn btn-outline-primary btn-sm fw-semibold w-100"
                                  style={{
                                    borderRadius: "8px",
                                    fontSize: "0.85rem",
                                    borderStyle: "dashed",
                                  }}            
                                >
                              <EvaButton href={flight.slug}>
                               Xem thêm →
                              </EvaButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDealsNew;
