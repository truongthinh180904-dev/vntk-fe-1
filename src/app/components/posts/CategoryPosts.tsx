'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, Clock, Plane, PlaneTakeoff } from "lucide-react";
import "./style.css";
import EvaCardLink from "../button/EvaCardLink";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
}

interface Props {
  categorySlug: string;
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  function decodeHtml(html: string) {
    if (typeof window === "undefined") return html;
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function stripHtml(html: string) {
    return decodeHtml(html.replace(/<[^>]*>/g, ""));
  }

const CategoryPosts: React.FC<Props> = ({ categorySlug }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6; // Đặt mỗi trang 6 bài theo ý fen

  // Hàm chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang khi sang trang mới
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      // Cache key giờ bao gồm cả số trang để tránh nhầm lẫn
      const cacheKey = `categoryPosts_${categorySlug}_page_${currentPage}`;
      // ... (Phần logic cache fen có thể giữ hoặc bỏ tùy ý, nhưng khuyến khích bỏ cache khi có phân trang để data luôn mới)

      try {
        // 1️⃣ Lấy category ID
        const catRes = await axios.get("https://admin.vietnam-tickets.com/wp-json/wp/v2/categories", {
          params: { slug: categorySlug },
        });

        if (!catRes.data.length) {
          setPosts([]);
          setLoading(false);
          return;
        }

        const categoryId = catRes.data[0].id;
        setCategoryName(catRes.data[0].name);

        // 2️⃣ Fetch bài viết với trang hiện tại
        const res = await axios.get("https://admin.vietnam-tickets.com/wp-json/wp/v2/posts", {
          params: {
            categories: categoryId,
            per_page: postsPerPage,
            page: currentPage,
            orderby: "date",
            order: "desc",
            _embed: true,
          },
        });

        // Lấy tổng số trang từ Header của WP API
        const totalPagesFromHeader = parseInt(res.headers["x-wp-totalpages"] || "1");
        setTotalPages(totalPagesFromHeader);

        const data: Post[] = res.data.map((post: any) => ({
          id: post.id,
          slug: post.slug,
          title: stripHtml(post.title?.rendered || ""),
          excerpt: stripHtml(post.excerpt?.rendered || ""),
          date: post.modified,
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/600x400",
        }));

        setPosts(data);
      } catch (err) {
        console.error("Lỗi khi fetch bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug, currentPage]); // Chạy lại khi slug hoặc trang thay đổi

  return (
  <div className="blogcategory">
      <div className="container py-5">
       <h1 
  className="fw-bold mb-4 d-flex align-items-center flex-wrap" 
  style={{ 
    fontSize: "clamp(22px, 5vw, 32px)", 
    color: "#1a202c",
    letterSpacing: "-0.5px",
    borderBottom: "2px solid #0d6efd20",
    paddingBottom: "15px"
  }}
>
  <PlaneTakeoff 
    size={32} 
    className="me-2 text-primary" 
    style={{ filter: "drop-shadow(0px 4px 6px rgba(13, 110, 253, 0.2))" }}
  /> 
  <span className="text-muted fw-normal me-2">Danh mục:</span>
  <span 
    style={{ 
      background: "linear-gradient(120deg, #0d6efd 0%, #00d2ff 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {categoryName}
  </span>
</h1>

        {loading ? (
          <div className="loading-text text-center py-5">Đang tải những bài viết mới nhất...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-5">
             <Plane size={50} className="text-primary mb-3" />
             <h4 className="fw-bold mb-2">Danh mục này chưa có bài viết</h4>
             {/* ... (Phần Button Về trang chủ giữ nguyên) */}
          </div>
        ) : (
          <>
            <div className="row g-4">
              {posts.map((post) => (
                <div key={post.id} className="col-lg-4 col-md-6">
                  <EvaCardLink href={`/${post.slug}`} className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="image-container-promotion image-wrapper">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-100 h-100 post-image"
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="fw-bold mb-2 post-title line-clamp-2">{post.title}</h5>
                        <p className="post-excerpt line-clamp-3">{post.excerpt}</p>
                        <div className="post-meta d-flex align-items-center gap-2 mt-auto">
                          <Calendar size={14} className="text-primary" />
                          <span className="small">{formatDate(post.date)}</span>
                        </div>
                      </div>
                    </div>
                  </EvaCardLink>
                </div>
              ))}
            </div>

          {/* PHẦN PHÂN TRANG VIP */}
{totalPages > 1 && (
  <div className="d-flex justify-content-center align-items-center gap-2 mt-5 flex-wrap">
    {/* Nút Back */}
    <button 
      className="btn shadow-sm d-flex align-items-center justify-content-center"
      style={{ 
        width: "40px", height: "40px", borderRadius: "10px", 
        backgroundColor: currentPage === 1 ? "#f8f9fa" : "#fff",
        border: "1px solid #dee2e6", color: "#333"
      }}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <ChevronLeft size={18} />
    </button>

    {/* Hiển thị số trang thông minh */}
    {[...Array(totalPages)].map((_, index) => {
      const pageNum = index + 1;
      // Chỉ hiển thị trang đầu, trang cuối, và xung quanh trang hiện tại 1 đơn vị
      if (
        pageNum === 1 || 
        pageNum === totalPages || 
        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
      ) {
        return (
          <button
            key={pageNum}
            className="btn shadow-sm fw-bold"
            style={{
              width: "40px", height: "40px", borderRadius: "10px",
              backgroundColor: currentPage === pageNum ? "#0d6efd" : "#fff",
              color: currentPage === pageNum ? "#fff" : "#333",
              border: currentPage === pageNum ? "none" : "1px solid #dee2e6",
              transition: "all 0.2s ease"
            }}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      }
      // Hiển thị dấu "..."
      if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
        return <span key={pageNum} className="text-muted">...</span>;
      }
      return null;
    })}

    {/* Nút Next */}
    <button 
      className="btn shadow-sm d-flex align-items-center justify-content-center"
      style={{ 
        width: "40px", height: "40px", borderRadius: "10px", 
        backgroundColor: currentPage === totalPages ? "#f8f9fa" : "#fff",
        border: "1px solid #dee2e6", color: "#333"
      }}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <ChevronRight size={18} />
    </button>
  </div>
)}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPosts;