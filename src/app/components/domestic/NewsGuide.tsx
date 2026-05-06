"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  slug: string;
  price: number;
  img: string;
  excerpt?: string;
  link?: string;
}

const NewsGuide: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState("Tất cả");

  const itemsPerPage = 4;

  // --- Fetch API ---
  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=48&per_page=12&_embed`
  //       );

  //       const data = response.data.map((post: any) => {
  //         const featuredImg =
  //           post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
  //           "https://via.placeholder.com/400x250?text=No+Image";

  //         return {
  //           id: post.id,
  //           from: post.excerpt?.rendered || "",
  //           to: post.title.rendered,
  //           slug: post.slug,
  //           date: post.modified,
  //           price: post.meta?.price
  //             ? Number(post.meta.price)
  //             : Math.floor(Math.random() * 10_000_000) + 1_000_000,
  //           img: featuredImg,
  //           excerpt: post.excerpt?.rendered || "",
  //           link: post.link,
  //         };
  //       });

  //       setFlights(data);
  //     } catch (err) {
  //       console.error("Lỗi fetch flights:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFlights();
  // }, []);

  useEffect(() => {
  const fetchFlights = async () => {
    setLoading(true);
    const cacheKey = "newpostdomestic";
    const cached = localStorage.getItem(cacheKey);
    const thirtyMinutes = 20 * 60 * 1000; // 30 phút 0 * 60 * 1000

    // Nếu có cache và chưa hết hạn → dùng cache
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < thirtyMinutes) {
        setFlights(parsed.data);
        setLoading(false);
        return;
      }
    }

    // Nếu không có cache hoặc hết hạn → fetch API
    try {
      const response = await axios.get(
        `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?categories=50&per_page=4&page=2&orderby=modified&order=desc&_embed`
      );

      const data = response.data.map((post: any) => {
        const featuredImg =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/400x250?text=No+Image";

        return {
          id: post.id,
          from: post.excerpt?.rendered || "",
          to: post.title.rendered,
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

      // Lưu cache với timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
    } catch (err) {
      console.error("Lỗi fetch flights:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFlights();
}, []);


  // --- Lọc theo thành phố ---
  const filteredFlights =
    selectedCity === "Tất cả"
      ? flights
      : flights.filter((f) => f.to === selectedCity);

  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFlights = filteredFlights.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity]);

  // reset ref mỗi lần render
  useEffect(() => {
    cardsRef.current = [];
  }, [currentFlights]);

  // --- GSAP animation ---
  useLayoutEffect(() => {
    if (cardsRef.current.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sliderRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }, sliderRef);

      return () => ctx.revert();
    }
  }, [currentPage, selectedCity]);

  return (
    <div className="container my-4">
     
      {loading ? (
        <p className="text-center text-muted">Đang tải dữ liệu...</p>
      ) : currentFlights.length === 0 ? (
        <p className="text-center text-muted">Không có chuyến bay nào.</p>
      ) : (
        <>
          <div
              ref={sliderRef}
              className="d-none d-md-flex row g-3"
              style={{ scrollSnapType: "x mandatory", overflowX: "auto", paddingBottom: "20px" }}
            >
          {currentFlights.map((flight, i) => (
            <div
              key={flight.id}
              className="col-lg-3 col-md-6 col-12"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className="rounded h-100"
                style={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.08)";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "160px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={flight.img}
                    alt={flight.to}
                    className="w-100 h-100"
                    style={{ transition: "transform 0.3s" }}
                  />
                </div>

                {/* Content */}
                <div
                  className="card-body d-flex flex-column justify-content-between"
                  style={{ padding: "12px" }}
                >
                  <h6
                    className="fw-bold mb-2 text-truncate"
                    style={{ fontSize: "1rem", color: "#2D4271" }}
                    title={flight.to}
                  >
                    {flight.to}
                  </h6>

                  <p
                    className="text-muted mb-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.85rem",
                      color: "#555",
                    }}
                    dangerouslySetInnerHTML={{ __html: flight.from }}
                  />

                  <div
                    className="d-flex justify-content-between align-items-center mt-auto"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      style={{
                        fontWeight: "900",
                        color: "#e74c3c",
                        fontSize: "1rem",
                        padding: "2px 6px",
                        borderRadius: "6px",
                      }}
                    >
                      {flight.price.toLocaleString("vi-VN")} VND
                    </span>

                    <Link href={`/${flight.slug}`}>
                      <button
                      className="btn btn-outline-primary"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                        }}
                      >
                        Xem ngay
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>

        <div
            ref={sliderRef}
            className="d-flex d-md-none d-flex flex-nowrap"
            style={{
              gap: "10px",
              padding: "10px 0",
              overflowX: "auto",           // cho phép vuốt ngang
              scrollSnapType: "x mandatory", 
              WebkitOverflowScrolling: "touch",
            }}
            >
          {currentFlights.map((flight, i) => (
            <div
              key={flight.id}
              className="col-lg-3 col-md-6 col-12"
               style={{
                  width: "75%",                 // 1.2 card hiển thị
                  scrollSnapAlign: "start",     // snap card khi vuốt
                }}
            >
              <div
                className="rounded h-100"
                style={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.08)";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "170px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={flight.img}
                    alt={flight.to}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", transition: "transform 0.3s" }}
                  />
                </div>

                {/* Content */}
                <div
                  className="card-body d-flex flex-column justify-content-between"
                  style={{ padding: "12px" }}
                >
                  <h6
                    className="fw-bold mb-2 text-truncate"
                    style={{ fontSize: "1rem", color: "#2D4271" }}
                    title={flight.to}
                  >
                    {flight.to}
                  </h6>

                  <p
                    className="text-muted mb-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.85rem",
                      color: "#555",
                    }}
                    dangerouslySetInnerHTML={{ __html: flight.from }}
                  />

                  <div
                    className="d-flex justify-content-between align-items-center mt-auto"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      style={{
                        fontWeight: "900",
                        color: "#e74c3c",
                        fontSize: "1rem",
                        padding: "2px 6px",
                        borderRadius: "6px",
                      }}
                    >
                      {flight.price.toLocaleString("vi-VN")} VND
                    </span>

                    <Link href={`/${flight.slug}`}>
                      <button
                      className="btn btn-outline-primary"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                        }}
                      >
                        Xem ngay 
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </>
      )}

      {/* --- Phân trang --- */}
      {/* {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                className={`btn btn-sm ${
                  page === currentPage ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      )} */}

      {/* --- Hover animation CSS --- */}
      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default NewsGuide;
