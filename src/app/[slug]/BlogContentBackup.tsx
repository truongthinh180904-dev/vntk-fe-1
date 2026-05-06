"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronUp, Clock, User } from "lucide-react";
import { decodeEmojiInHTML } from "../components/untils/decodeEmoji";
// import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";

import "./ReadMore2.css";
import Image from "next/image";
interface BlogContentProps {
  content: string;
  faqs?: any;
  pFaqs?: string;
  timeDate?: [string, string]; // [author, isoDate]
  thumnailimg?: string | { src: string; alt?: string; width?: number; height?: number };
}

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}



function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}



const FAQ = dynamic(() => import("../components/home/FAQ"), {
  loading: () => null,
});

const BlogContent: React.FC<BlogContentProps> = ({pFaqs, faqs, content , timeDate,thumnailimg }) => {
  const [isExpandedContent, setIsExpandedContent] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const contentRef2 = useRef<HTMLDivElement | null>(null);
  // const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // const safeHTML = DOMPurify.sanitize(content);
  // const decodedContent = decodeEmojiInHTML(content);

  // const decodedContent = useMemo(() => {
  //   return lazyfyImages(decodeEmojiInHTML(content));
  // }, [content]);

  

  const decodedContent = useMemo(() => {
    const html = decodeEmojiInHTML(content);
    return html;
  }, [content]);

 const isMobile = useIsMobile();

const [renderAll, setRenderAll] = useState(!isMobile);

useEffect(() => {
  if (!isMobile) return;
  const id = requestIdleCallback(() => setRenderAll(true));
  return () => cancelIdleCallback(id);
}, [isMobile]);


  
  const [fixedPFaqs, setFixedPFaqs] = useState(pFaqs);



const [showFAQ, setShowFAQ] = useState(false);
const faqRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const obs = new IntersectionObserver(
    ([e]) => e.isIntersecting && setShowFAQ(true),
    { rootMargin: "200px" }
  );
  if (faqRef.current) obs.observe(faqRef.current);
  return () => obs.disconnect();
}, []);


//   useEffect(() => {
//     if (!contentRef2.current) return;

//     // Kiểm tra chiều cao nội dung
//     if (contentRef2.current.scrollHeight > 500) {
//       setShowToggleButton(true);
//     }
//     const timeout = setTimeout(() => {
//       if (contentRef2.current && contentRef2.current.scrollHeight > 500) {
//         setShowToggleButton(true);
//       }
//     }, 200);

//     return () => clearTimeout(timeout);
//   }, [content]);

//   useEffect(() => {
//   if (pFaqs) {
//     setFixedPFaqs(pFaqs);
//   }
// }, []); 
useEffect(() => {
  if (!contentRef2.current) return;
  const el = contentRef2.current;

  const observer = new ResizeObserver(() => {
    setShowToggleButton(el.scrollHeight > 500);
  });

  observer.observe(el);
  return () => observer.disconnect();
}, []);




  const author = timeDate?.[0] || "Admin";
  const dateStr = timeDate?.[1] || new Date().toISOString();
  // Format ngày theo định dạng DD/MM/YYYY hoặc bạn muốn khác
  const formattedDate = new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });


// Nếu là string thì parse
// if (typeof faqs === "string") {
//   try {
//     faqs = JSON.parse(faqs);
//   } catch (e) {
//     console.error("Không parse được _faq_schema:", e);
//     faqs = null;
//   }
// }
let demoFAQData: FAQItem[] = [];


// Convert schema → FAQItem[]
if (faqs && faqs.mainEntity && Array.isArray(faqs.mainEntity)) {
  demoFAQData = faqs.mainEntity.map((q: any) => ({
    category: q.category || "Khác",
    question: q.name || "",
    answer: q.acceptedAnswer?.text || ""
  }));
}

// ===== GOM NHÓM THEO CATEGORY =====
// const groupedFAQ: Record<string, FAQItem[]> = demoFAQData.reduce(
//   (acc, item) => {
//     if (!acc[item.category]) acc[item.category] = [];
//     acc[item.category].push(item);
//     return acc;
//   },
//   {} as Record<string, FAQItem[]>
// );
const groupedFAQ = useMemo(() => {
  if (!faqs) return {};

  let parsed = faqs;
  if (typeof faqs === "string") {
    try {
      parsed = JSON.parse(faqs);
    } catch {
      return {};
    }
  }

  if (!parsed.mainEntity) return {};

  return parsed.mainEntity.reduce((acc: any, q: any) => {
    const category = q.category || "Khác";
    if (!acc[category]) acc[category] = [];
    acc[category].push({
      category,
      question: q.name,
      answer: q.acceptedAnswer?.text,
    });
    return acc;
  }, {});
}, [faqs]);


// Khi mount component
useEffect(() => {
  const stored = localStorage.getItem("fixedPFaqs");
  const timestamp = localStorage.getItem("fixedPFaqs_ts");

  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  if (stored && timestamp && now - parseInt(timestamp) < fiveMinutes) {
    // Nếu còn trong 5 phút → giữ giá trị cũ
    setFixedPFaqs(stored);
  } else if (pFaqs) {
    // Nếu lần đầu hoặc quá 5 phút → set giá trị mới
    setFixedPFaqs(pFaqs);
    localStorage.setItem("fixedPFaqs", pFaqs);
    localStorage.setItem("fixedPFaqs_ts", now.toString());
  }
}, [pFaqs]);

// const [thumb, setThumb] = useState<string | null>(null);

// useEffect(() => {
//   if (!thumnailimg) return;

//   const src =
//     typeof thumnailimg === "string"
//       ? thumnailimg
//       : thumnailimg.src;

//   setThumb(src);
// }, [thumnailimg]);

const thumb = useMemo(() => {
  if (!thumnailimg) return null;
  return typeof thumnailimg === "string"
    ? thumnailimg
    : thumnailimg.src;
}, [thumnailimg]);

const BlogHTML = React.memo(({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
});


  return (
    <>
    <div className="position-relative mb-5">
     
      {/* Nội dung bài viết */}
      <div
        className="d-none d-md-flex mb-3 align-items-center flex-wrap gap-3 text-muted"
        style={{
          fontSize: "0.9rem",
          background: "#f9f9fb",
          borderRadius: "12px",
          padding: "8px 14px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        {/* Tác giả */}
        <span
          className="d-flex align-items-center"
          style={{
            color: "#6c757d",
            transition: "color 0.2s",
          }}
        >
         <User size={16} className="me-1" />
         Tác giả : {author}
        </span>

       

        {/* Ngày đăng */}
        <span
          className="d-flex align-items-center"
          style={{
            color: "#6c757d",
            transition: "color 0.2s",
          }}
        >
          <Calendar size={16} className="me-1" />
          Ngày đăng : {formattedDate}
        </span>

         {/* Đọc trong 5 phút */}
        <span
          className="align-items-center"
          style={{
            color: "#6c757d",
            fontStyle: "italic",
            transition: "color 0.2s",
          }}
        >
          <Clock size={16} className="me-1" />
         Thời gian : Đọc trong 5 phút
        </span>
      </div>


    <div
      className="d-flex d-md-none mb-3 align-items-center flex-wrap gap-3 text-muted"
      style={{
        fontSize: "0.9rem",
        background: "#f9f9fb",
        borderRadius: "12px",
        padding: "8px 14px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      

      {/* Tác giả */}
      <span
        className="d-flex align-items-center"
        style={{
          color: "#6c757d",
          transition: "color 0.2s",
        }}
      >
        <User size={16} className="me-1" />
        Tác giả : {author}
      </span>

      

      {/* Ngày đăng */}
      <span
        className="d-flex align-items-center"
        style={{
          color: "#6c757d",
          transition: "color 0.2s",
        }}
      >
        <Calendar size={16} className="me-1" />
          {formattedDate}
      </span>

        {/* Đọc trong 5 phút */}
      <span
        className="align-items-center"
        style={{
          color: "#6c757d",
          fontStyle: "italic",
          transition: "color 0.2s",
        }}
      >
        <Clock size={16} className="me-1" />
        Thời gian : Đọc trong 5 phút
      </span>
    </div>   
    <div
        ref={contentRef2}
        className="blog-detail"
        style={{
          wordBreak: "break-word",
          maxHeight: !isMobile && !isExpandedContent ? "1395px" : "none",
          overflowY: !isMobile ? "auto" : "visible",
          // maxHeight: isExpandedContent ? "none" : "1395px",
          transition: "max-height 0.6s ease",
          overflowX: "hidden", // ✅ khóa ngang
        }}
      >
        
      {/* FAQ Top */}
      {fixedPFaqs === "top" && (
        <div ref={faqRef} className="faq-wrapper faq-top">
          {showFAQ && <FAQ groups={groupedFAQ} />}
        </div>
      )}

   
     {thumb && (
      <Image
        src={thumb}
        alt="Thumbnail"
        width={1200}
        height={630}
        priority={!isMobile}
        fetchPriority={!isMobile ? "high" : "auto"}
        sizes="(max-width: 768px) 100vw, 1200px"
        className="img-fluid mb-4"
      />


      )}

      {/* Nội dung blog */}
      <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
      {/* <BlogHTML
        html={
          renderAll
            ? decodedContent
            : decodedContent.slice(0, 4500)
        }
      /> */}

      {/* <BlogHTML
      html={
        renderPart === "above"
          ? decodedContent.slice(0, 6000) // trên fold
          : decodedContent
      }
    /> */}



      {/* FAQ Bottom */}
     {fixedPFaqs === "bottom" && (
          <div ref={faqRef} className="faq-wrapper faq-bottom">
            {showFAQ && <FAQ groups={groupedFAQ} />}
          </div>
        )}


        
      </div>

      {/* Hiệu ứng mờ khi chưa mở */}
      {!isExpandedContent && showToggleButton && !isMobile && (
        <div
          className="position-absolute bottom-0 start-0 w-100"
          style={{
            height: "140px",
            background:
              "linear-gradient(to top, white, rgba(255,255,255,0.85), transparent)",
            pointerEvents: "none",
          }}
        ></div>
      )}

      {/* Nút nổi “Xem thêm / Thu gọn” */}
      {showToggleButton && !isMobile && (
        <div
          className="position-absolute start-50 translate-middle-x"
          style={{
            bottom: isExpandedContent ? "-3rem" : "1rem",
            zIndex: 10,
          }}
        >
         <button
          className={`btn ${isExpandedContent ? "btn-primary" : "btn-primary"} border shadow-sm d-flex align-items-center gap-2 px-4 py-2`}
          onClick={() => setIsExpandedContent(!isExpandedContent)}
          style={{
            fontWeight: 500,
            transition: "all 0.3s ease",
            fontSize: "15px",
            color: isExpandedContent ? "#ffffff" : "#ffffff", // trắng khi thu gọn, xanh khi xem thêm
          }}
        >
          {isExpandedContent ? (
            <>
              Thu gọn <ChevronUp size={18} />
            </>
          ) : (
            <>
              Xem thêm <ChevronDown size={18} />
            </>
          )}
        </button>

        </div>
      )}
    </div>
    </>
  );
};

export default BlogContent;  