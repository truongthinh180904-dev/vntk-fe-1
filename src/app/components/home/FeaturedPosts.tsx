"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Bgbanner from '../../assets/img/home/bg_demone.webp'
import EvaCardLink from '../../components/button/EvaCardLink';

interface BlogPost {
  id: number;
  slug?: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: [
      {
        source_url: string;
      }
    ];
  };
}

const FeaturedPosts = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const postsPerSlide = 4;
  const currentSlide = useRef(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await axios.get<BlogPost[]>(
  //       "https://api.anninhanthienlong.com/wp-json/wp/v2/posts",
  //       {
  //         params: {
  //           categories: 50, // ID danh mục blog
  //           per_page: 4,
  //           _embed: true,
  //         },
  //       }
  //     );
  //     setPosts(response.data);
  //   } catch (error) {
  //     console.error("Lỗi fetch blog:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  //cache home feature posts
  useEffect(() => {
  const fetchPosts = async () => {
    const cacheKey = "featureposthome";
    const cached = localStorage.getItem(cacheKey);

    // Nếu có cache và chưa hết hạn 30 phút → dùng cache
    if (cached) {
      const parsed = JSON.parse(cached);
      const thirtyMinutes = 50 * 60 * 1000 ; // 30 phút * 60 * 1000
      if (Date.now() - parsed.timestamp < thirtyMinutes) {
        setPosts(parsed.data);
        return;
      }
    }

    // Nếu không có cache hoặc hết hạn → fetch API
    try {
     const response = await axios.get<BlogPost[]>(
      "https://admin.vietnam-tickets.com/wp-json/wp/v2/posts",
      {
        params: {
          categories: 54,          // ✅ ID danh mục bạn muốn lấy
          per_page: 4,
          orderby: "modified",
          order: "desc",
          _embed: true,
        },
      }
    );


      const data = response.data;

      setPosts(data);

      // Lưu vào localStorage với timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
    } catch (error) {
      console.error("Lỗi fetch blog:", error);
    }
  };

  fetchPosts();
}, []);


  const totalSlides = Math.ceil(posts.length / postsPerSlide);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      if (direction === "left" && currentSlide.current > 0) {
        currentSlide.current -= 1;
      } else if (direction === "right" && currentSlide.current < totalSlides - 1) {
        currentSlide.current += 1;
      }
      sliderRef.current.scrollTo({
        left: containerWidth * currentSlide.current,
        behavior: "smooth",
      });
    }
  };

  
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert("Vui lòng nhập số điện thoại!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://media.vietnam-tickets.com/api/consults", {
        phone,
      });
      alert(res.data.message || "Đăng ký thành công!");
      setPhone(""); // reset input
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // 🕒 Hàm tính thời gian đã đăng (ví dụ: "3 ngày trước", "2 giờ trước")
const formatTimeAgo = (dateString: string) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} năm trước`;
  if (months > 0) return `${months} tháng trước`;
  if (weeks > 0) return `${weeks} tuần trước`;
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return `Vừa xong`;
};


  return (
   <div className="position-relative" style={{ overflow: "hidden" }}>
      {/* --- Phần nền trên (ảnh bầu trời) --- */}
      <div
        className="position-relative d-block d-md-none"
        style={{
          height: "200px",
          backgroundImage: `url(${Bgbanner.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", //  Thêm dòng này
        }}
      >
        {/* hiệu ứng chuyển màu mượt sang nền trắng */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "20px",
            background: "white",
          }}
        >
          
        </div>
      </div>

      <div
        className="position-relative d-none d-md-block"
        style={{
          height: "250px",
          backgroundImage: `url(${Bgbanner.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", //  Thêm dòng này
        }}
      >
        {/* hiệu ứng chuyển màu mượt sang nền trắng */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "250px",
            borderTopLeftRadius:"0px",
            borderTopRightRadius:"0px",
            backgroundColor: "rgb(52 152 219 / 0.5)",
          }}
        >
            <h2 className="fw-bold text-center mt-5" style={{ color: "#ffffff" }}>
            Bài viết nổi bật nhất
          </h2>
        </div>
      </div>

      {/* --- Phần blog nằm giữa 2 nền --- */}
      <div
        className="container position-relative"
        style={{
          marginTop: "-125px",
          zIndex: 5,
        }}
      >
        <div
          // className="p-2"
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* --- Slider desktop --- */}
         <div className="d-none d-md-block position-relative">
              {/* Nút chuyển slide có thể đặt ở đây */}

              {/* Nội dung slide */}
              <div
                ref={sliderRef}
                className="d-flex flex-nowrap"
                style={{
                  overflow: "hidden",
                  scrollBehavior: "smooth",
                  padding: "20px 0", // Tạo không gian cho bóng đổ card không bị cắt
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                  const start = slideIndex * postsPerSlide;
                  const slidePosts = posts.slice(start, start + postsPerSlide);

                  return (
                    <div
                      key={`slide-${slideIndex}`}
                      className="d-flex flex-shrink-0 gap-4"
                      style={{ width: "100%", padding: "0 5px" }}
                    >
                      {slidePosts.map((post) => {
                        const image =
                          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                          "https://via.placeholder.com/300x150";

                        return (
                          <div
                            key={`post-${post.id}`}
                            style={{
                              width: "25%",
                              display: "flex",
                            }}
                          >
                            <div
                              className="card border-0 shadow-sm w-100"
                              style={{
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                display: "flex",
                                flexDirection: "column",
                                transition: "all 0.3s ease",
                                height: "100%", // Đảm bảo các card cao bằng nhau trong 1 hàng
                              }}
                              // Hiệu ứng hover nhẹ nhàng
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                              }}
                            >
                              <EvaCardLink href={`/${post.slug}`} >
                                
                                {/* 1. Phần Ảnh */}
                                <div style={{ width: "100%", overflow: "hidden" }}>
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt={post.title.rendered}
                                    className="image-container-4-card"
                                  />
                                </div>

                                {/* 2. Phần Nội dung (Card Body) */}
                                <div
                                  className="card-body"
                                  style={{
                                    padding: "1.25rem",
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  {/* Tiêu đề - Giới hạn 2 dòng */}
                                  <h5
                                    className="card-title mb-0"
                                    style={{
                                      fontSize: "1rem",
                                      color: "rgb(45, 66, 113)",
                                      fontWeight: "600",
                                      lineHeight: "1.4",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      minHeight: "2.8em",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                  ></h5>

                                  {/* Thời gian */}
                                  {/* <div
                                    className="text-muted"
                                    style={{
                                      fontSize: "0.8rem",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    <span>🕒</span> {formatTimeAgo(post.date)}
                                  </div> */}

                                  {/* Mô tả ngắn - Giới hạn 2 dòng */}
                                  <div
                                    className="text-secondary"
                                    style={{
                                      fontSize: "0.85rem",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      lineHeight: "1.5",
                                      marginTop: "auto", // Đẩy nội dung này xuống nếu cần
                                    }}
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                  ></div>
                                  
                                  {/* Nút giả hoặc Icon chỉ dẫn */}
                                  <div style={{ 
                                    textAlign: "right", 
                                    fontSize: "0.8rem", 
                                    color: "rgb(45, 66, 113)", 
                                    fontWeight: "bold",
                                    marginTop: "10px" 
                                  }}>
                                    Xem thêm ➔
                                  </div>
                                </div>
                              </EvaCardLink>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

          {/* --- Mobile view --- */}
          <div className="d-block d-md-none  mt-4"> 
            <h2 className="fw-bold text-center mt-2 mb-2" style={{ color: "#ffffff" }}>
              Bài viết nổi bật nhất
            </h2>
            <div
              className="overflow-auto d-flex flex-nowrap"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                gap: "1rem",
                scrollBehavior: "smooth",
              }}
            >
              {posts.map((post) => {
                const image =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "https://via.placeholder.com/300x150";
                return (
                  <div
                    key={`mobile-post-${post.id}`}
                    className="card border-0 shadow-sm"
                    style={{
                      minWidth: "85%",
                      scrollSnapAlign: "start",
                      cursor: "pointer",
                    }}
                  >
                    <EvaCardLink
                              href={`/${post.slug}`}
                            >
                      <img
                        loading="lazy"
                        src={image}
                        className="image-container-4-card"
                        alt={post.title.rendered}
                      />
                      <div className="card-body bg-white">
                        <h5
                          className="card-title mb-2 fw-bold"
                          style={{ fontSize: "1rem" }}
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        ></h5>
                        <h6 className="card-text text-muted mb-1">
                          {new Date(post.date).toLocaleDateString("vi-VN")}
                        </h6>
                        <div
                          className="card-text small text-secondary"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        ></div>
                      </div>
                   </EvaCardLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default FeaturedPosts;