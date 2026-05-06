"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plane } from "lucide-react";

import Breadcrumb from "./Breadcrumb";
// import PopularDestinations from "../components/home/PopularDestinations";
import BlogContent from "./blog/BlogContent.server";
import { saveViewHistory } from "../components/untils/viewHistory";

import banner_01 from "../assets/img/home/vemaybaynoidia/banner-promotion-01.webp";
import banner_03 from "../assets/img/home/vemaybaynoidia/banner-03.webp";
import banner_04 from "../assets/img/home/bg-banner.webp";
import dynamic from "next/dynamic";

const SearchBannerDesktop = dynamic(
  () => import("./blog/SearchBanner.desktop"),
  { ssr: false }
);

const PopularDestinations = dynamic(
  () => import("../components/home/PopularDestinations"),
  { 
    ssr: false, // Không render ở server để giảm dung lượng HTML ban đầu
    loading: () => <div className="p-5 text-center">Đang tải điểm đến...</div> 
  }
);
/* ===== Lazy load nặng ===== */




// function useIsDesktop() {
//   const [isDesktop, setIsDesktop] = useState(false);

//   useEffect(() => {
//     const check = () => setIsDesktop(window.innerWidth >= 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   return isDesktop;
// }



/* ===================== COMPONENT ===================== */

export default function BlogDetailClient({
  slug,
  post,
  relatedPosts,
  breadcrumb,
  timeDate,
  thumnail,
}: any) {

  const [expanded, setExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {

    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const run = () => setShowSearch(true);


    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run);
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(run, 1200);
      return () => clearTimeout(t);
    }
  }, []);
  // const isDesktop = useIsDesktop();
  /* ===== Save history (OK) ===== */
  useEffect(() => {
    if (post) saveViewHistory(post);
  }, [post]);

  /* ===== visible posts memo ===== */
  const visiblePosts = useMemo(() => {
    return expanded ? relatedPosts : relatedPosts.slice(0, 2);
  }, [expanded, relatedPosts]);

  if (!post) return null;

  /* ================= MAIN CONTENT ================= */

  const mainContent = (
    <BlogContent
      {...(Number(post.meta?.price) > 0 ? { thumnailimg: thumnail } : {})}
      pFaqs={post?.meta._faq_position}
      faqs={post?.meta._faq_schema}
      content={post.content.rendered}
      timeDate={timeDate}
    />
  );


  /* ================= RETURN ================= */

  return (
    <div className="container-fluid mt-2" style={{ backgroundColor: "#f0f8ff" }}>
      <div>

        <Breadcrumb breadcrumb={breadcrumb} post={post} />

        {/* <div className="d-none d-md-block">
          {isDesktop && <SearchBannerDesktop />}
        </div> */}

    {/* Container bao ngoài */}
      <div 
        className="d-none d-md-block" 
        style={{ 
          minHeight: '150px', 
          position: 'relative',
          zIndex: 10 // Đảm bảo toàn bộ khu vực search nằm trên nội dung blog bên dưới
        }}
      > 
        <div 
          className="blog-search text-white py-4 mb-4 position-relative" 
          style={{ 
            minHeight: '150px',
            /* QUAN TRỌNG: Không được để overflow: hidden ở đây */
          }}
        >
          <Image
            src={banner_04}
            alt="Tìm vé máy bay giá rẻ"
            fill
            sizes="100vw"
            loading="lazy"
            fetchPriority="low"
            style={{ objectFit: "cover", zIndex: -1 }} // Cho ảnh nền xuống dưới cùng
          />
          
          {showSearch && <SearchBannerDesktop />} 
        </div>
      </div>
              
                
        <div className="row gx-3 blogmargintop">

          {/* MAIN */}
          <div className="col-lg-8 mb-4">
            <div className="bg-white rounded shadow p-3 overflow-hidden">
              {mainContent}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4">
          <div>
              {/* ===== PROMO ===== */}
              {post.meta?.price?.trim() && (
              <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                padding: "16px",
                marginBottom: "12px",
                border: "1px dashed #ccc",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#e3f2fd",
                  color: "#007bff",
                  padding: "4px 10px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                <Plane size={16} style={{ marginRight: "6px" }} />
                Giá vé ưu đãi tại VietNam Tickets
              </div>

              <div
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  border: "1px dashed #999",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 680,
                  fontSize: "16px",
                  letterSpacing: "0.5px",
                  color: "#e91e63",
                  backgroundColor: "#fff8f9",
                }}
              >
                <span>
                  {Number(post.meta.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>

                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#007bff",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      Number(post.meta.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    )
                  }
                >
                  VND
                </button>
              </div>

              <div
                className="mt-2"
                style={{ fontSize: "15px", lineHeight: "1.6", color: "#333" }}
              >
                <strong>Giảm 200.000đ</strong> khi đặt vé khứ hồi,
                <br />
                lên đến <strong>1.800.000đ/Đơn hàng</strong>
              </div>

              <div
                style={{
                  marginTop: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  color: "#666",
                }}
              >
                <span>Giá chưa bao gồm thuế và dịch vụ</span>
              </div>
            </div>

              )}
          </div>
            {/* ===== BANNER ===== */}
            <div className="bg-white rounded shadow p-3 mb-4">
              <Image
                src={banner_03}
                alt=""
                className="img-fluid rounded mb-3"
                width={800}
                height={400}
                // loading="lazy"
              />

              <Image
                src={banner_01}
                alt=""
                className="img-fluid rounded"
                width={800}
                height={400}
                // loading="lazy"
              />
            </div>

            {/* ===== RELATED POSTS ===== */}
            <div className="bg-light rounded shadow p-3">

              <h2 className="footer-title fw-bold mb-3">Tin tức về vé máy bay</h2>

              {visiblePosts.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/${item.slug}`}
                  className="d-flex mb-3 text-decoration-none"
                >
                  <Image
                    width={100}
                    height={60}
                    loading="lazy"
                    src={
                      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "https://via.placeholder.com/100x60"
                    }
                    alt={item.title.rendered}
                    className="rounded me-2"
                    style={{ objectFit: "cover" }}
                  />

                  <div className="small text-dark">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                    <div className="text-muted">
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </div>
                  </div>

                </Link>
              ))}

              {relatedPosts.length > 3 && (
                <button
                  className="btn btn-link p-0"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </div>


            {/* ===== KHỐI MÀU XANH + HÌNH THỨC ĐẶT VÉ (GIỮ NGUYÊN) ===== */}
              <div style={{ marginTop: "20px" }}>
                {/* 🔹 Khối màu xanh */}
                <div
                  style={{
                    background: "linear-gradient(90deg, #0048FF, #00C2FF)",
                    borderRadius: "10px",
                    color: "#fff",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h6 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>
                    Bạn đã tìm thấy chuyến bay? Vậy bây giờ hãy tìm khách sạn nào
                  </h6>
                  <p style={{ fontSize: "14px", marginBottom: "16px" }}>
                    Nhận kết quả từ tất cả các trang web khách sạn hàng đầu ngay trên
                    Vietnam Tickets
                  </p>
                  <button
                    style={{
                      background: "linear-gradient(90deg, #FFD54F, #FFB300)",
                      border: "none",
                      color: "#000",
                      fontWeight: 600,
                      padding: "10px 24px",
                      borderRadius: "30px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                    }}
                  >
                    Khám phá các khách sạn
                  </button>
                </div>

                {/* 🔹 Hình thức đặt vé */}
                <div style={{ marginTop: "24px" }}>
                  <h6
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                      marginBottom: "12px",
                      color: "#000",
                    }}
                  >
                    Hình thức đặt vé
                  </h6>

                  {[
                    {
                      color: "#FF9800",
                      title: "Đặt vé online",
                      desc: "Tìm kiếm vé nhanh nhất với giá rẻ và tiện lợi nhất",
                    },
                    {
                      color: "#2196F3",
                      title: "Đến văn phòng",
                      desc: "Số 69 Võ Thị Sáu, Phường 6, Quận 3, TP HCM",
                    },
                    {
                      color: "#4CAF50",
                      title: "Gọi trực tiếp",
                      desc: "Gọi ngay số 1900 3173 – Tư vấn miễn phí",
                    },
                    {
                      color: "#9C27B0",
                      title: "Chat đặt vé",
                      desc: "Trò chuyện trực tiếp qua bộ chat ở góc phải",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        padding: "10px 14px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "stretch",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          backgroundColor: item.color,
                          borderRadius: "3px",
                        }}
                      ></div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#000",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: "14px", color: "#555" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      
        <PopularDestinations />
      </div>
    </div>
  );
}
