'use client';

import React, { useEffect, useState } from "react";
import { Calendar, Plane, ChevronLeft, ChevronRight, Search as SearchIcon } from "lucide-react";
import Head from "next/head";

import "./style.css";
import EvaCardLink from "../components/button/EvaCardLink";


interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
}

const CACHE_KEY = "flights_vntk_cache_v1";
const POSTS_PER_PAGE = 6;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Giải mã các thực thể HTML (ví dụ: &amp; thành &)
function decodeHtml(html: string) {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Loại bỏ tag HTML và giải mã nội dung để so sánh text thuần
function stripHtml(html: string) {
  if (!html) return "";
  const cleanText = html.replace(/<[^>]*>/g, "");
  return decodeHtml(cleanText);
}

export default function SearchBlog({ query }: { query: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Reset trang về 1 khi từ khóa tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

useEffect(() => {
  if (!query) {
    setLoading(false);
    return;
  }

 const performSearch = () => {
    setLoading(true);
    const keyword = query.toLowerCase().trim();
    const cached = localStorage.getItem(CACHE_KEY);

    if (!cached) {
      setPosts([]);
      setTotalPages(0);
      setLoading(false);
      return;
    }

    try {
      const { data } = JSON.parse(cached);
      const uniqueData = Array.from(
        new Map(data.map((item: any) => [item.id, item])).values()
      );

      // --- BẮT ĐẦU LOGIC MỚI ---
      
      // Bước 1: Tìm theo danh mục
      let filtered = uniqueData.filter((item: any) => {
        const categories = item.categories || []; 
        const categoryName = item.category_name || "";
        
        // Kiểm tra nếu keyword nằm trong mảng categories hoặc chuỗi category_name
        return Array.isArray(categories) 
          ? categories.some((cat: any) => cat.toLowerCase().includes(keyword))
          : categoryName.toLowerCase().includes(keyword);
      });

      // Bước 2: Nếu KHÔNG tìm thấy danh mục nào khớp, mới tìm theo tiêu đề/mô tả (Logic cũ)
      if (filtered.length === 0) {
        filtered = uniqueData.filter((item: any) => {
          const title = stripHtml(item.title || "").toLowerCase();
          const excerpt = stripHtml(item.excerpt || "").toLowerCase();
          const slug = (item.slug || "").toLowerCase();

          return (
            title.includes(keyword) ||
            excerpt.includes(keyword) ||
            slug.includes(keyword)
          );
        });
      }
      
      // --- KẾT THÚC LOGIC MỚI ---

      const start = (currentPage - 1) * POSTS_PER_PAGE;
      const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

      setPosts(
        paginated.map((p: any) => ({
          ...p,
          title: stripHtml(p.title),
          image: p.img,
          excerpt: stripHtml(p.excerpt) || "Xem chi tiết bài viết...",
        }))
      );

      setTotalPages(Math.ceil(filtered.length / POSTS_PER_PAGE));
    } catch (error) {
      console.error("Cache error:", error);
      setPosts([]);
      setTotalPages(0);
    }

    setLoading(false);
  };
  
  const timeoutId = setTimeout(performSearch, 100);
  return () => clearTimeout(timeoutId);
}, [query, currentPage]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="blogcategory">
        <div className="container py-5">
      <h1 
        className="fw-bold mb-4 d-flex align-items-center flex-wrap" // Thêm flex-wrap để tự xuống dòng khi hết chỗ
        style={{ 
          fontSize: "clamp(20px, 5vw, 32px)", // Tự động co giãn: min 20px, max 32px
          color: "#2c3e50",
          letterSpacing: "-0.5px",
          borderBottom: "2px solid #eee",
          paddingBottom: "15px",
          lineHeight: "1.3" // Thêm khoảng cách dòng cho mobile khi bị xuống hàng
        }}
      >
        <SearchIcon 
          className="me-2 me-md-3" // Mobile cách ít hơn (me-2), Desktop cách nhiều hơn (me-md-3)
          style={{ 
            width: "clamp(28px, 6vw, 40px)", // Icon cũng tự nhỏ lại theo màn hình
            height: "auto",
            color: "#0d6efd", 
            filter: "drop-shadow(0px 4px 6px rgba(13, 110, 253, 0.2))" 
          }} 
        />
        
        <span style={{ marginRight: "8px" }}>Kết quả tìm kiếm cho:</span>
        
        <span 
          className="text-primary" 
          style={{ 
            background: "linear-gradient(120deg, #0d6efd 0%, #00d2ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800",
            padding: "0 5px",
            wordBreak: "break-word", // Chống tràn màn hình nếu query quá dài
            display: "inline-block"
          }}
        >
          "{query}"
        </span>
      </h1>

          {loading ? (
            <div className="text-center py-5">Đang xử lý dữ liệu...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-5">
              <Plane size={50} className="text-muted mb-3" />
              <h4 className="fw-bold">Không tìm thấy bài viết nào phù hợp</h4>
              <p>Hãy thử nhập từ khóa khác hoặc kiểm tra lại chính tả.</p>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {posts.map((post) => (
                  <div key={post.id} className="col-lg-4 col-md-6">
                    <EvaCardLink href={`/${post.slug}`} className="text-decoration-none">
                      <div className="card h-100 border-0 shadow-sm hover-card">
                        <div className="image-container-promotion image-wrapper" style={{overflow: "hidden" }}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-100 h-100"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                            }}
                          />
                        </div>

                        <div className="card-body d-flex flex-column">
                          <h5 className="fw-bold mb-2 line-clamp-2" style={{ fontSize: "1.1rem" }}>
                            {post.title}
                          </h5>
                          <p className="small text-muted line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto d-flex align-items-center gap-2 pt-3 border-top">
                            <Calendar size={14} className="text-success" />
                            <span className="small text-muted">
                              {formatDate(post.date || new Date().toISOString())}
                            </span>
                          </div>
                        </div>
                      </div>
                    </EvaCardLink>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                  <button
                    className="btn btn-outline-success d-flex align-items-center"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => p - 1);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="px-3 py-1 bg-light rounded shadow-sm border">
                    <span className="fw-bold text-success">{currentPage}</span> / {totalPages}
                  </div>

                  <button
                    className="btn btn-outline-success d-flex align-items-center"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => p + 1);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}