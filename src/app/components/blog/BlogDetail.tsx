"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PlaneLoader from "../load/PlaneLoader";
import banner_01 from "../../assets/img/home/vemaybaynoidia/banner-01.png";
import banner_02 from "../../assets/img/home/vemaybaynoidia/banner-02.png";
import banner_03 from "../../assets/img/home/vemaybaynoidia/banner-03.png";
import banner_04 from "../../assets/img/home/bg-banner.jpg";
import axios from "axios";
import PlaneSearch from "../../ve-noi-dia/FlightSearch";
import SEOMetaHelper from "./SEOMetaHelper";
import Breadcrumb from "./Breadcrumb";
import "../../assets/styles/blog/BlogDetail.css";
import SEOSchemaHelper from "./SEOSchemaHelper";
import FeaturedPosts from "./FeaturedPosts";
import { getCache, setCache } from "./cache";

interface Post {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  categories?: number[];
  _embedded?: {
    "wp:featuredmedia"?: [{ source_url: string }];
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

const BlogDetail = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // ✅ Fix hydration: window chỉ chạy sau khi client render
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const visiblePosts = expanded ? relatedPosts : relatedPosts.slice(0, 2);
  const featuredImage =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/800x400?text=No+Image";

  const fetchBreadcrumb = async (catId: number): Promise<Category[]> => {
    try {
      const res = await axios.get<Category>(
        `https://api.anninhanthienlong.com/wp-json/wp/v2/categories/${catId}`
      );
      const cat = res.data;
      if (cat.parent && cat.parent !== 0) {
        const parentTrail = await fetchBreadcrumb(cat.parent);
        return [...parentTrail, cat];
      } else {
        return [cat];
      }
    } catch (error) {
      console.error("Lỗi khi lấy category:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const fetchData = async () => {
      const cacheKey = `post-${slug}`;
      const cached = getCache(cacheKey);

      if (cached) {
        setPost(cached.post);
        setBreadcrumb(cached.breadcrumb);
        setRelatedPosts(cached.related);
        setLoading(false);
        return;
      }

      try {
        const postRes = await axios.get<Post[]>(
          `https://api.anninhanthienlong.com/wp-json/wp/v2/posts`,
          { params: { slug, _embed: true } }
        );

        let post = null;
        let breadcrumb: Category[] = [];

        if (postRes.data.length > 0) {
          post = postRes.data[0];
          setPost(post);

          if (post.categories && post.categories.length > 0) {
            breadcrumb = await fetchBreadcrumb(post.categories[0]);
            setBreadcrumb(breadcrumb);
          }
        }

        const relatedRes = await axios.get<Post[]>(
          `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=3&per_page=5&_embed`
        );
        const related = relatedRes.data;
        setRelatedPosts(related);

        setCache(cacheKey, { post, breadcrumb, related });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 200);
    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div className="container py-5 px-3">
      <div className="about rounded shadow mb-4">
        {post && <Breadcrumb breadcrumb={breadcrumb} post={post} />}

        {post && currentUrl && (
          <>
            <SEOMetaHelper
              post={post}
              featuredImage={featuredImage}
              currentUrl={currentUrl}
            />
            <SEOSchemaHelper
              post={post}
              featuredImage={featuredImage}
              currentUrl={currentUrl}
              publisherName="Vietnam Tickets"
              publisherLogo="https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.png"
              publisherSameAs={[
                "https://www.facebook.com/vietnamtickets.com.vn/",
                "https://www.instagram.com/vietnamticketsvn/",
                "https://www.tiktok.com/@vietnamtickets0?lang=en",
                "https://linkedin.com/in/vietnamticket",
              ]}
            />
          </>
        )}

        <div
          className="containe blog-search text-white py-4"
          style={{
            backgroundImage: `url(${banner_04.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 99,
          }}
        >
          <PlaneSearch />
        </div>
      </div>

      {loading ? (
        <div
          className="d-flex flex-column align-items-center py-5"
          style={{ minHeight: 600 }}
        >
          <PlaneLoader />
        </div>
      ) : post ? (
        <div className="row gx-4">
          <div className="col-lg-8 mb-4">
            <div className="bg-white rounded shadow p-4 overflow-hidden">
              <h2
                className="fw-bold mb-3"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="text-muted small">
                {new Date(post.date).toLocaleDateString("vi-VN")}
              </p>
              <img
                src={featuredImage}
                className="img-fluid rounded mb-4"
                alt="Bài viết"
                loading="lazy"
              />
              <div
                className="overflow-auto no-copy"
                style={{ wordBreak: "break-word" }}
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div
            className="col-lg-4 d-none d-lg-block"
            style={{
              position: "sticky",
              top: "150px",
              alignSelf: "start",
              zIndex: 1,
            }}
          >
            <div className="bg-white rounded shadow p-3 mb-4">
              <div className="bg-light rounded shadow p-3">
                <h6 className="fw-bold mb-3">Tin tức về chặng bay</h6>
                {visiblePosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="d-flex mb-3 text-decoration-none"
                  >
                    <img
                      src={
                        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "https://via.placeholder.com/80"
                      }
                      alt={item.title.rendered}
                      className="rounded me-2"
                      style={{ width: 80, height: 60, objectFit: "cover" }}
                      loading="lazy"
                    />
                    <div className="small text-dark">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.title.rendered,
                        }}
                      />
                      <div className="text-muted">
                        {new Date(item.date).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </Link>
                ))}

                {relatedPosts.length > 3 && (
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Thu gọn" : "Xem thêm"}
                  </button>
                )}
              </div>

              <img
                src={banner_03.src}
                alt="Ưu đãi 1"
                className="img-fluid rounded mb-3"
                loading="lazy"
              />
              <img
                src={banner_01.src}
                alt="Ưu đãi 2"
                className="img-fluid rounded mb-3"
                loading="lazy"
              />
            </div>

            <div className="bg-white rounded shadow p-3 mb-4">
              <img
                src={banner_02.src}
                alt="Ưu đãi 3"
                className="img-fluid rounded mb-3"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Bài viết không tồn tại.</p>
      )}

      <FeaturedPosts />
    </div>
  );
};

export default BlogDetail;
