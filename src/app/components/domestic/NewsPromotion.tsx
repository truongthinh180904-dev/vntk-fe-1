// FlightDeals.tsx
"use client";

import { CalendarCheck, Plane, Star, TextAlignStart } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import FlightDealLink from "../../components/flightlink/FlightDealLink";
import banner from "../../assets/img/domestic/banner-hero-1.jpg"
import { gsap } from "gsap";
import axios from "axios";
import banner_06 from "../../assets/img/home/imgbanner06.png";
import Blog1 from "../../assets/img/blog/Ve-ma-y-bay-i-Muang-Houne.jpg";
import Blog2 from "../../assets/img/blog/Ve-ma-y-bay-i-Muang-Namo.jpg";
import Blog3 from "../../assets/img/blog/ve-ma-y-bay-i-Bloomington-Minnesota.jpg";
import Blog4 from "../../assets/img/blog/ve-ma-y-bay-i-O-Fallon-missouri.jpg";
import Blog5 from "../../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
import Link from "next/link";

interface BlogPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: any;
  content?: { rendered: string };
}


const NewsPromotion = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // 🕒 Format “x ngày trước”
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

  // 📰 Fetch dữ liệu
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://api.anninhanthienlong.com/wp-json/wp/v2/posts",
  //         {
  //           params: {
  //             categories: 4, // 🔹 ID danh mục
  //             per_page: 5,
  //             _embed: true,
  //           },
  //         }
  //       );
  //       if (Array.isArray(res.data)) setPosts(res.data);
  //     } catch (err) {
  //       console.error("Lỗi khi fetch blog:", err);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
  const fetchPosts = async () => {
    const cacheKey = "postdomestic";
    const cached = localStorage.getItem(cacheKey);
    const thirtyMinutes = 30 * 60 * 1000; // 30 phút

    // Nếu có cache và chưa hết hạn → dùng cache
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < thirtyMinutes) {
        setPosts(parsed.data);
        return;
      }
    }

    // Nếu không có cache hoặc hết hạn → fetch API
    try {
      const res = await axios.get(
        "https://admin.vietnam-tickets.com/wp-json/wp/v2/posts",
        {
          params: {
            categories: 54,        // ✅ ID danh mục
            per_page: 5,
            orderby: "modified",
            order: "desc",
            _embed: true,          // ✅ để lấy ảnh đại diện
          },
        }
      );

      const data = Array.isArray(res.data) ? res.data : [];

      setPosts(data);

      // Lưu cache với timestamp
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
    } catch (err) {
      console.error("Lỗi khi fetch blog:", err);
    }
  };

  fetchPosts();
}, []);


  // 🏆 Bài viết nổi bật (bài đầu tiên)
  const highlightPost =
    posts.length > 0
      ? {
          img:
            posts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            posts[0].content?.rendered.match(/<img.*?src="(.*?)"/)?.[1] ||
            Blog1.src,
          title: posts[0].title.rendered,
          time: formatTimeAgo(posts[0].date),
          desc:
            posts[0].excerpt.rendered.replace(/<[^>]*>?/gm, "").slice(0, 120) +
            "...",
          slug: posts[0].slug,
        }
      : {
          img: Blog1.src,
          title: "Sân bay Wellington (WLG): Cửa ngõ đến thủ đô New Zealand",
          time: "23 Giờ Trước",
          desc: "Sân bay Wellington (WLG) là cửa ngõ hàng không chính kết nối thủ đô New Zealand với các điểm đến nội địa và quốc tế...",
          slug: "san-bay-wellington",
        };

  // 🗞️ Các bài còn lại (bên phải)
  const sidePosts =
    posts.length > 1
      ? posts.slice(1, 5).map((p) => ({
          img:
            p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            p.content?.rendered.match(/<img.*?src="(.*?)"/)?.[1] ||
            Blog5.src,
          title: p.title.rendered,
          time: formatTimeAgo(p.date),
          slug: p.slug,
        }))
      : [
          {
            img: Blog2.src,
            title: "Du lịch Hawaii – Những trải nghiệm không thể bỏ lỡ",
            time: "01 Ngày Trước",
            slug: "du-lich-hawaii",
          },
          {
            img: Blog3.src,
            title:
              "Tham quan nước Mỹ – Review chi tiết các điểm tham quan nổi bật",
            time: "01 Ngày Trước",
            slug: "tham-quan-nuoc-my",
          },
          {
            img: Blog4.src,
            title: "Tìm hiểu Romania cách Việt Nam bao nhiêu km?",
            time: "01 Ngày Trước",
            slug: "romania-cach-viet-nam-bao-nhieu-km",
          },
          {
            img: Blog5.src,
            title: "Khám phá Phine – Thành phố cổ kính miền Nam nước Lào",
            time: "01 Ngày Trước",
            slug: "phine-lao",
          },
        ];


   const slides = [
    banner_06.src,
    banner.src,
    banner_06.src,
    banner.src,
  ];

  return (
  <div className="container py-3">
          <div className="row g-4">
            {/* Bài viết nổi bật bên trái */}
            <div className="col-lg-7">
              <Link
                href={`/${highlightPost.slug}`}
                className="text-decoration-none text-dark"
              >
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  <img
                    src={highlightPost.img}
                    className=" news-main-img"
                    alt={highlightPost.title}
                    style={{ width: "auto" }}
                  />
                  <div className="card-body">
                    <p className="text-primary small fw-bold mb-1">
                      BLOG <span className="text-muted">{highlightPost.time}</span>
                    </p>
                    <h6
                      className="fw-bold"
                      dangerouslySetInnerHTML={{ __html: highlightPost.title }}
                    />
                    <p
                      className="text-muted small mb-0"
                      dangerouslySetInnerHTML={{ __html: highlightPost.desc }}
                    />
                  </div>
                </div>
              </Link>
            </div>
  
            {/* Danh sách bài bên phải */}
            <div className="col-lg-5 d-flex flex-column gap-3">
              {sidePosts.map((post, idx) => (
                <Link
                  href={`/${post.slug}`}
                  key={idx}
                  className="text-decoration-none text-dark"
                >
                  <div className="d-flex align-items-center gap-3 news-side-item border-bottom pb-2">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="news-side-img rounded-3"
                    />
                    <div>
                      <p className="text-primary small fw-bold mb-1">
                        BLOG <span className="text-muted">{post.time}</span>
                      </p>
                      <h6
                        className="fw-semibold small news-side-title"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
  );
};

export default NewsPromotion;
