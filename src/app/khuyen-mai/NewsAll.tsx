import React, { useEffect, useState } from "react";
import Blog1 from "../assets/img/blog/Ve-ma-y-bay-i-Muang-Houne.jpg";
import Blog2 from "../assets/img/blog/Ve-ma-y-bay-i-Muang-Namo.jpg";
import Blog3 from "../assets/img/blog/ve-ma-y-bay-i-Bloomington-Minnesota.jpg";
import Blog4 from "../assets/img/blog/ve-ma-y-bay-i-O-Fallon-missouri.jpg";
import Blog5 from "../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
import Blog6 from "../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
import NewsHotFlights from "./NewsHotFlights"
import NewsAirportInfo from "./NewsAirportInfo"
import NewsTips from "./NewsTips"
import DomesticFlights from "../tin-tuc/DomesticFlights"
import banner_06 from "../assets/img/home/imgbanner06.png";
import banner from "../assets/img/home/banner.png";
import PromoCodes from "./PromoCodes";
import axios from "axios";
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



const NewsAll = () => {
 
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

  const CACHE_KEY = "news_session_1";
  const CACHE_DURATION = 5 * 60 * 1000; // 30 phút 


  // 📰 Fetch dữ liệu
useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Kiểm tra cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION) {
            setPosts(parsed.data);
            // console.log("✅ Lấy blog từ cache");
            return;
          }
        }

        // Fetch API
        const res = await axios.get(
              "https://admin.vietnam-tickets.com/wp-json/wp/v2/posts",
              {
                params: {
                  categories: 54,        // ID danh mục
                  per_page: 5,           // số bài mỗi trang
                  page: 2,               // trang số 3
                  orderby: "modified",   // sắp xếp theo ngày sửa
                  order: "desc",         // mới nhất trước
                  _embed: true,          // embed author, media, terms
                },
              }
            );

        if (Array.isArray(res.data)) {
          setPosts(res.data);

          // Lưu cache
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: res.data, timestamp: Date.now() })
          );
          // console.log("✅ Lấy blog từ API và lưu cache");
        }
      } catch (err) {
        console.error("❌ Lỗi khi fetch blog:", err);
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

  const [current, setCurrent] = useState(0);

  // Auto slide (3s)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
   <>
    <PromoCodes />
    <DomesticFlights />
    {/* <NewsHotFlights /> */}
    <NewsAirportInfo />
    <NewsTips />
   


     <div className="news-all container py-3">
        <h1 className="fw-bold mb-4 text-uppercase text-dark">Tin tức tiêu điểm</h1>

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
                  className="card-img-top news-main-img"
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
   </>
  );
};

export default NewsAll;
