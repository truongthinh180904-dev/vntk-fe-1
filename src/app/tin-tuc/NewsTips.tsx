"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightDealLink from "../components/flightlink/FlightDealLink";
import banner from "../assets/img/domestic/banner-hero-10.jpg";
import Link from "next/link";

const NewsAirportInfo = () => {
  const [flights, setFlights] = useState<any[]>([]);

  // 🕒 Hàm format “x ngày trước”
  const formatTimeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    const days = Math.floor(diff / (3600 * 24));
    if (days > 365) return `${Math.floor(days / 365)} năm trước`;
    if (days > 30) return `${Math.floor(days / 30)} tháng trước`;
    if (days > 7) return `${Math.floor(days / 7)} tuần trước`;
    if (days > 0) return `${days} ngày trước`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours} giờ trước`;
    const minutes = Math.floor(diff / 60);
    if (minutes > 0) return `${minutes} phút trước`;
    return "Vừa xong";
  };

  // ✈️ Fallback dữ liệu mặc định
  const defaultFlights = [
    {
      id: 1,
      from: "TP.HCM",
      to: "Hà Nội",
      price: 1250000,
      date: "2026-10-12T00:00:00",
      img: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      from: "Đà Nẵng",
      to: "Phú Quốc",
      price: 1450000,
      date: "2026-10-13T00:00:00",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      from: "Hà Nội",
      to: "Nha Trang",
      price: 1300000,
      date: "2026-10-14T00:00:00",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=60",
    },
  ];

  // 📰 Fetch API (danh mục ID = 49)
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://api.anninhanthienlong.com/wp-json/wp/v2/posts",
  //         {
  //           params: {
  //             categories: 4,
  //             per_page: 3,
  //             _embed: true,
  //           },
  //         }
  //       );

  //       if (Array.isArray(res.data) && res.data.length > 0) {
  //         const mapped = res.data.map((post) => ({
  //           id: post.id,
  //           from: "Vé máy bay",
  //           to: post.title.rendered,
  //           price: Math.floor(Math.random() * 1_000_000) + 1_000_000,
  //           date: formatTimeAgo(post.modified),
  //           img:
  //             post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
  //             "https://via.placeholder.com/400x200?text=No+Image",
  //           link: post.link,
  //           slug: post.slug, // ✅ thêm dòng này
  //           excerpt: post.excerpt?.rendered || "", // 🔹 thêm dòng này
  //         }));
  //         setFlights(mapped);
  //       } else {
  //         // Nếu không có dữ liệu API
  //         setFlights(defaultFlights);
  //       }
  //     } catch (err) {
  //       console.error("Lỗi khi fetch blog:", err);
  //       setFlights(defaultFlights);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
  const CACHE_KEY = "news_session_5";
  const CACHE_DURATION = 3; // 30 phút 0 * 60 * 1000

  const fetchPosts = async () => {
    try {
      // ==== 1. Kiểm tra cache ====
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);

        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION) {
          setFlights(parsed.data);
          console.log("✅ Lấy flights category=4 từ cache");
          return;
        }
      }

      // ==== 2. Fetch API ====
     const res = await axios.get(
        "https://admin.vietnam-tickets.com/wp-json/wp/v2/posts",
        {
          params: {
            categories: 48,        // ID danh mục
            per_page: 3,           // số bài mỗi trang
            page: 1,               // trang số 3
            orderby: "modified",   // sắp xếp theo ngày sửa
            order: "desc",         // mới nhất trước
            _embed: true,          // embed author, media, terms
          },
        }
      );

      let mapped = [];

      if (Array.isArray(res.data) && res.data.length > 0) {
        mapped = res.data.map((post) => ({
          id: post.id,
          from: "Vé máy bay",
          to: post.title.rendered,
          price: Math.floor(Math.random() * 1_000_000) + 1_000_000,
          date: formatTimeAgo(post.modified),
          img:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/400x200?text=No+Image",
          link: post.link,
          slug: post.slug,
          excerpt: post.excerpt?.rendered || "",
        }));
      } else {
        mapped = defaultFlights;
      }

      setFlights(mapped);

      // ==== 3. Lưu cache ====
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: mapped,
          timestamp: Date.now(),
        })
      );

      console.log("✅ Lấy flights từ API category=4 và lưu cache");
    } catch (err) {
      console.error("❌ Lỗi khi fetch blog:", err);
      setFlights(defaultFlights);
    }
  };

  fetchPosts();
}, []);


  return (
    <>
      <div className="news-all py-3">
        <h1 className="fw-bold mb-4 text-uppercase text-dark">
          Vé máy bay quốc tế vừa cập nhật
        </h1>

        <div>
          <div
            className="row flex-md-wrap flex-nowrap overflow-auto"
            style={{
              paddingBottom: "20px",
              scrollSnapType: "x mandatory",
              overflowY: "hidden",
              msOverflowStyle: "none",
            }}
          >

        <div className="col-md-3 col-10 mb-4">
          <div
              className="card h-100 position-relative border-0 shadow-sm text-center text-white"
              style={{
                backgroundImage: `url(${banner.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                }}
              ></div>  
            <div
              className={`card-body position-relative d-flex flex-column justify-content-center align-items-center text-center transition-all`}
            >
              <h6
                className="fw-semibold mb-3"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  maxWidth: "90%",
                }}
              >
                Khám phá nhiều ưu đãi hấp dẫn cho các chuyến bay nội địa tại{" "}
              </h6>

              <button
                className="fw-bold"
                style={{
                  backgroundColor: "rgb(40, 128, 252)",
                  color: " rgba(255, 255, 255)",
                  border: "none",
                  padding: "10px 30px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.backgroundColor = "blue";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "rgb(40, 128, 252)";
                }}
              >
                Khám Phá Ngay
              </button>
            </div>
            </div>
            </div>
            {flights.length > 0 ? (
              flights.map((flight) => (
                <div key={flight.id} className="col-md-3 col-10 mb-4">
                  <div
                    className="card shadow-sm h-100 border-0"
                    style={{ borderRadius: "6px" }}
                  >
                    <div className="d-none d-md-block" style={{ height: "170px", overflow: "hidden" }}>
                      <img
                        src={flight.img}
                        className="card-img-top h-100 object-fit-cover"
                        alt={flight.to}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                     <div className="d-block d-md-none" style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src={flight.img}
                        className="card-img-top h-100 object-fit-cover"
                        alt={flight.to}
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="card-body">
                      <p className="text-muted small mb-1">
                        🕒 {flight.date || "Vừa đăng"}
                      </p>
                      <h6
                        className="card-title fw-bold mb-1"
                        style={{
                          color: "#2D4271",
                          fontSize: "14px",
                          borderBottom: "1px dashed #ccc",
                          paddingBottom: "6px",
                        }}
                        dangerouslySetInnerHTML={{ __html: flight.to }}
                      ></h6>
                      <div
                        style={{
                          paddingBottom: "6px",
                        }}
                      >
                        <p
                          className="text-muted small"
                          style={{
                            lineHeight: "1.5",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "13px",
                            marginBottom: "0", // tránh khoảng cách giữa p và border
                          }}
                          dangerouslySetInnerHTML={{ __html: flight.excerpt }}
                        ></p>
                      </div>


                      <div className="d-flex mt-2 justify-content-center align-items-end gap-2">
                      <Link
                          href={`/${flight.slug}`}
                          className="text-decoration-none text-dark"
                        >
                          <button
                            style={{ width: "220px" }}
                            className="btn p-2 fw-bold btn-primary btn-sm"
                          >
                            Xem ngay
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Không có dữ liệu nào.</p>
            )}

          
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsAirportInfo;
