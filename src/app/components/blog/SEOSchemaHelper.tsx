"use client";
import React, { useEffect } from "react";

interface Term {
  taxonomy: string;
  name: string;
}

interface Post {
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
  modified: string;
  _embedded?: {
    "wp:featuredmedia"?: [{ source_url: string }];
    "author"?: [{ name: string; link: string }];
    "wp:term"?: Term[][];
  };
  categories?: number[];
  tags?: number[];
}

interface SEOSchemaHelperProps {
  post: Post;
  featuredImage?: string;
  currentUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  publisherSameAs?: string[];
}

const SEOSchemaHelper: React.FC<SEOSchemaHelperProps> = ({
  post,
  featuredImage = "https://via.placeholder.com/1200x750",
  currentUrl = typeof window !== "undefined" ? window.location.href : "",
  publisherName = "Vietnam Tickets",
  publisherLogo = "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.png",
  publisherSameAs = [
    "https://www.facebook.com/vietnamtickets.com.vn/",
    "https://www.instagram.com/vietnamticketsvn/",
    "https://www.tiktok.com/@vietnamtickets0?lang=en",
    "https://linkedin.com/in/vietnamticket",
  ],
}) => {
  // 🔹 Xóa HTML + decode entity thành plain text
  const cleanText = (html: string): string => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    const decoded = doc.documentElement.textContent || "";
    return decoded.replace(/\s+/g, " ").trim();
  };

  const createSchema = () => {
    const authorName = post._embedded?.author?.[0]?.name || "admin";
    const authorUrl =
      post._embedded?.author?.[0]?.link ||
      "https://api.anninhanthienlong.com/author/admin/";

    // description ngắn gọn
    const description = post.excerpt?.rendered
      ? cleanText(post.excerpt.rendered).substring(0, 160)
      : cleanText(post.content.rendered).substring(0, 160);

    // toàn bộ plain text cho articleBody
    const articleBody = cleanText(post.content.rendered);

    // ✅ keywords = title.rendered (plain text)
    const keywords = cleanText(post.title.rendered);

    // categories lấy tên từ _embedded
    const articleSection =
      post._embedded?.["wp:term"]
        ?.flat()
        .filter((term) => term.taxonomy === "category")
        .map((term) => term.name)
        .join(", ") || "";

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl,
      },
      headline: post.title.rendered,
      description,
      image: {
        "@type": "ImageObject",
        url: featuredImage,
        width: 1200,
        height: 750,
      },
      author: {
        "@type": "Person",
        name: authorName,
        url: authorUrl,
      },
      publisher: {
        "@type": "Organization",
        name: publisherName,
        logo: {
          "@type": "ImageObject",
          url: publisherLogo,
          width: 500,
          height: 200,
        },
        sameAs: publisherSameAs,
      },
      url: currentUrl,
      datePublished: post.date,
      dateModified: post.modified || new Date().toISOString(),
      articleSection,
      keywords, // ✅ lấy từ title
      wordCount: articleBody.split(/\s+/).length,
      articleBody,
      inLanguage: "vi-VN",
      isPartOf: {
        "@type": "WebSite",
        name: publisherName,
        url: currentUrl.split("/").slice(0, 3).join("/"),
      },
    };
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "json-ld-article";
    script.text = JSON.stringify(createSchema());
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("json-ld-article");
      if (existing) existing.remove();
    };
  }, [post, featuredImage, currentUrl]);

  return null;
};

export default SEOSchemaHelper;
