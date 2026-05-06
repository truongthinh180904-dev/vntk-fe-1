  import React, { useEffect, useRef, useState } from "react";
  import Blog1 from "../../assets/img/blog/Ve-ma-y-bay-i-Muang-Houne.jpg";
  import Blog2 from "../../assets/img/blog/Ve-ma-y-bay-i-Muang-Namo.jpg";
  import Blog3 from "../../assets/img/blog/ve-ma-y-bay-i-Bloomington-Minnesota.jpg";
  import Blog4 from "../../assets/img/blog/ve-ma-y-bay-i-O-Fallon-missouri.jpg";
  import Blog5 from "../../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
  import Blog6 from "../../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
  import FlightDealLink from "../flightlink/FlightDealLink";
  import banner from "../../assets/img/domestic/banner-hero-10.jpg"
  import blogcard from '../../assets/img/international/Ve-ma-y-bay-i-Muang-Namo.jpg';
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
  


  
  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     setLoading(true);
  //     try {
  //       // 🔹 Không dùng _fields, để _embed hoạt động đầy đủ
  //       const response = await axios.get(
  //         `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=50&per_page=4&_embed`
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
  const fetchFlights = async () => {
    setLoading(true);
    const cacheKey = "domesticpromotion";
    const cached = localStorage.getItem(cacheKey);
    const thirtyMinutes = 30 * 60 * 1000; // 30 phút

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
        `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=50&per_page=4&_embed`
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
      console.error("Lỗi khi fetch bài viết theo danh mục:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFlights();
}, []);





    return (
     <>
      <div className="container py-3">   
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
  
  
  
  
  
