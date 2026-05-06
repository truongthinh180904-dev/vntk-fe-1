"use client";
import React from "react";
import SimpleMetaTags from "./SimpleMetaTags";

interface Post {
  title: { rendered: string };
  content: { rendered: string };
}

interface SEOMetaProps {
  post: Post;
  featuredImage?: string;
  currentUrl?: string;
}

const SEOMetaHelper: React.FC<SEOMetaProps> = ({
  post,
  featuredImage = "https://via.placeholder.com/1200x750",
  currentUrl = typeof window !== "undefined" ? window.location.href : "",
}) => {
  // 🔹 Làm sạch HTML + entity -> plain text
  const cleanText = (html: string): string => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return (doc.documentElement.textContent || "").replace(/\s+/g, " ").trim();
  };

  // 🔹 Tạo description ngắn gọn (max 160 ký tự)
  const createDescription = (content: string) => {
    const plainText = cleanText(content);
    return plainText.length > 160 ? plainText.substring(0, 157) + "..." : plainText;
  };

  // 🔹 Keywords lấy từ title + thêm cụm phụ
  const createKeywords = (title: string): string => {
    const base = cleanText(title);
    const extra = ["vé máy bay giá rẻ", "khuyến mãi vé máy bay", "VietNam Tickets "];
    return [base, ...extra].join(", ");
  };

  const title = cleanText(post.title.rendered);
  const description = createDescription(post.content.rendered);
  const keywords = createKeywords(post.title.rendered);

  return (
    <SimpleMetaTags
      title={`${title} | VietNam Tickets `}
      description={description}
      image={featuredImage}
      url={currentUrl}
      keywords={keywords}
      ogType="article"
      twitterCard="summary_large_image"
      canonical={currentUrl}
    />
  );
};

export default SEOMetaHelper;
