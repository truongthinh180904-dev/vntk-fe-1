  import React, { useEffect, useRef, useState } from "react";
  import Blog1 from "../assets/img/blog/Ve-ma-y-bay-i-Muang-Houne.jpg";
  import Blog2 from "../assets/img/blog/Ve-ma-y-bay-i-Muang-Namo.jpg";
  import Blog3 from "../assets/img/blog/ve-ma-y-bay-i-Bloomington-Minnesota.jpg";
  import Blog4 from "../assets/img/blog/ve-ma-y-bay-i-O-Fallon-missouri.jpg";
  import Blog5 from "../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
  import Blog6 from "../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
  import FlightDealLink from "../components/flightlink/FlightDealLink";
  import banner from "../assets/img/domestic/banner-hero-10.jpg"
  import blogcard from '../assets/img/international/Ve-ma-y-bay-i-Muang-Namo.jpg';
  import axios from "axios";
  import Link from "next/link";
  import { Clock } from "lucide-react";


  interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  slug:string;
  price: number;
  img: string;
}
  const NewsAirportInfo = () => {

      const sliderRef = useRef<HTMLDivElement | null>(null);
      const cardsRef = useRef<HTMLDivElement[]>([]);
      const [flights, setFlights] = useState<Flight[]>([]);
      const [loading, setLoading] = useState(true);
    
      const currentFlights = [
    {
      id: 1,
      from: "TP.HCM",
      to: "Hà Nội",
      price: 1250000,
      date: "12/10 - 18/10",
      img: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      from: "Đà Nẵng",
      to: "Phú Quốc",
      price: 1450000,
      date: "13/10 - 20/10",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      from: "Hà Nội",
      to: "Nha Trang",
      price: 1300000,
      date: "14/10 - 21/10",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=60",
    },
 
  ];

  const flightDeals = [
    {
      id: 1,
      from: "TPHCM",
      to: "Cincinnati",
      date: "10th 10, 2026",
      price: 8520000,
      img: blogcard.src,
    },
    {
      id: 2,
      from: "TPHCM",
      to: "Saravane",
      date: "10th 10, 2026",
      price: 1976000,
      img: blogcard.src,
    },
    {
      id: 3,
      from: "TPHCM",
      to: "Salavan",
      date: "10th 10, 2026",
      price: 2055000,
      img: blogcard.src,
    },
    {
      id: 4,
      from: "Hà Nội",
      to: "Aberdeen",
      date: "09th 10, 2026",
      price: 9594000,
      img: blogcard.src,
    }
  ];
   


  
  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     setLoading(true);
  //     try {
  //       // 🔹 Không dùng _fields, để _embed hoạt động đầy đủ
  //       const response = await axios.get(
  //         `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=48&per_page=4&_embed`
  //       );
  
  //       const data = response.data.map((post: any) => {
  //         const featuredImg =
  //           post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
  //           "https://via.placeholder.com/400x250?text=No+Image";
  
  //         return {
  //           id: post.id,
  //           from: post.excerpt.rendered, // hoặc post.excerpt.rendered nếu bạn muốn
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
  //       console.error("Lỗi khi fetch bài viết theo danh mục:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchFlights();
  // }, []);
  
useEffect(() => {
  const CACHE_KEY = "promotion_session_1";
  const CACHE_DURATION = 30 * 60 * 1000; // 30 phút 

  const fetchFlights = async () => {
    setLoading(true);

    try {
      // ==== 1. Kiểm tra cache ====
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);

        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION) {
          setFlights(parsed.data);
          // console.log("✅ Lấy promotion flights từ cache");
          setLoading(false);
          return;
        }
      }

      // ==== 2. Fetch API ====
      const response = await axios.get(
        `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?categories=48&per_page=4&page=2&orderby=modified&order=desc&_embed`
      );

      const data = response.data.map((post: any) => {
        const featuredImg =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/400x250?text=No+Image";

        return {
          id: post.id,
          from: post.excerpt.rendered,
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

      // ==== 3. Lưu cache ====
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );

      // console.log("✅ Lấy promotion flights từ API và lưu cache");
    } catch (err) {
      console.error("❌ Lỗi khi fetch bài viết theo danh mục:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFlights();
}, []);




    return (
     <>
      <div className="news-all py-3">
        <h1 className="fw-bold mb-4 text-uppercase text-dark">Ưu đãi vé máy bay quốc tế</h1>     
        <div>
            <div>
            <div
              // ref={sliderRef}
              className="row flex-md-wrap flex-nowrap overflow-auto"
              style={{paddingBottom:"20px", scrollSnapType: "x mandatory", overflowY: "hidden", msOverflowStyle: "none"}} 
            >         
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
                            <span className="small text-muted">Giá chỉ từ </span>
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
                               {new Date(flight.date).toLocaleDateString("vi-VN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                            </p>
                          </div>

                          <div className="mt-auto">
                              <Link
                                  href={`/${flight.slug}`}
                                  className="btn btn-outline-primary btn-sm fw-semibold w-100"
                              style={{
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                borderStyle: "dashed",
                              }}
                                >
                              Xem thêm →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


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
            </div>
          </div>
        </div>
      </div>
     </>
    );
  };
  
  export default NewsAirportInfo;
  
  
  
  
  
