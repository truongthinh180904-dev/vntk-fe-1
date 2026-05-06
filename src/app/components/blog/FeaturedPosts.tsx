import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link"; 

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

  const fetchPosts = async () => {
    try {
      const response = await axios.get<BlogPost[]>(
        "https://api.anninhanthienlong.com/wp-json/wp/v2/posts",
        {
          params: {
            categories: 3, // ID danh mục blog
            per_page: 12,
            _embed: true,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Lỗi fetch blog:", error);
    }
  };

  useEffect(() => {
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

  return (
    <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
     
      {/* Slider */}
      <div className="container">
        <h4 className="mb-4 fw-bold">Có thể bạn thích</h4>
        <div className="d-none d-md-block position-relative">
          <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-3 z-3" style={{ gap: "50px" }}>
            <button
              className="btn btn-light shadow"
              style={{ borderRadius: "50%", opacity: 0.7, backdropFilter: "blur(5px)" }}
              onClick={() => scroll("left")}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="btn btn-light shadow"
              style={{ borderRadius: "50%", opacity: 0.7, backdropFilter: "blur(5px)" }}
              onClick={() => scroll("right")}
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div ref={sliderRef} className="d-flex flex-nowrap" style={{ overflow: "hidden", scrollBehavior: "smooth", height: "362px" }}>
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const start = slideIndex * postsPerSlide;
              const slidePosts = posts.slice(start, start + postsPerSlide);
              return (
                <div key={`slide-${slideIndex}`} className="d-flex flex-shrink-0 gap-4" style={{ width: "100%" }}>
                  {slidePosts.map((post) => {
                    const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/300x150";
                    return (
                      <div key={`post-${post.id}`} style={{ width: "25%", position: "relative" }}>
                        <div className="card border-0 shadow-sm position-relative overflow-visible">
                          <Link href={`/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img  loading="lazy"  src={image} className="card-img-top rounded" alt={post.title.rendered} style={{ objectFit: "cover", height: "200px" }} />
                            <div className="card-body bg-white position-absolute" style={{ bottom: 0, left: "50%", transform: "translate(-50%, 50%)", width: "90%", borderRadius: "10px", boxShadow: "0 6px 12px rgba(0,0,0,0.15)", zIndex: 99, padding: "1rem", fontSize: "0.9rem" }}>
                              <h5
                                className="card-title mb-2 fw-bold"
                                style={{
                                  fontSize: "1rem",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                              ></h5>

                              <h6 className="card-text text-muted mb-1">{new Date(post.date).toLocaleDateString("vi-VN")}</h6>
                              <div className="card-text small text-secondary" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile view */}
        <div className="d-block d-md-none px-3">
          <div className="overflow-auto d-flex flex-nowrap" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", gap: "1rem", scrollBehavior: "smooth" }}>
            {posts.map((post) => {
              const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/300x150";
              return (
                <div key={`mobile-post-${post.id}`} className="card border-0 shadow-sm" style={{ minWidth: "85%", scrollSnapAlign: "start", cursor: "pointer" }}>
                  <Link href={`/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img  loading="lazy" 
                      src={image}
                      className="card-img-top rounded"
                      alt={post.title.rendered}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body bg-white">
                      <h5
                        className="card-title mb-2 fw-bold"
                        style={{ fontSize: "1rem" }}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
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
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      ></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;