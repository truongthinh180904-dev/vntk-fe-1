"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../ReadMore2.css";

/* FAQ lazy */
const FAQ = dynamic(() => import("../../components/home/FAQ"), {
  ssr: false,
});

export default function BlogContentClient({
  hasRest,
  faqs,
  pFaqs,
}: {
  hasRest: boolean;
  faqs?: any;
  pFaqs?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const faqRef = useRef<HTMLDivElement>(null);

  /* toggle CSS – KHÔNG render lại HTML */
  useEffect(() => {
    const el = document.getElementById("blog-rest");
    if (!el) return;

    el.classList.toggle("collapsed", !expanded);
    el.classList.toggle("expanded", expanded);

    if (expanded) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expanded]);

  /* FAQ lazy */
  useEffect(() => {
    if (!faqRef.current) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShowFAQ(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(faqRef.current);
    return () => obs.disconnect();
  }, []);

  /* group FAQ */
  const groupedFAQ = useMemo(() => {
    if (!faqs?.mainEntity) return {};
    return faqs.mainEntity.reduce((acc: any, q: any) => {
      const c = q.category || "Khác";
      acc[c] ||= [];
      acc[c].push({
        question: q.name,
        answer: q.acceptedAnswer?.text,
      });
      return acc;
    }, {});
  }, [faqs]);

  // if (!hasRest) return null;
  if (!hasRest) {
    return <div suppressHydrationWarning />;
  }

  useEffect(() => {
    if (expanded) return; // 👈 tránh re-apply khi mở bài

    const imgs = document.querySelectorAll<HTMLImageElement>(
      "#blog-rest.wp-content img"
    );

    imgs.forEach((img) => {
      if (!img.loading) img.loading = "lazy";
      if (!img.decoding) img.decoding = "async";
      img.removeAttribute("fetchpriority");
    });
  }, []);

  return (
    <>
      {!expanded && <div className="fade-bottom" />}

      <div className="readmore-wrapper">
        <button
          className="readmore-btn"
          onClick={() => setExpanded((s) => !s)}
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {pFaqs && (
        <div ref={faqRef} className="faq-wrapper mt-5">
          {showFAQ && <FAQ groups={groupedFAQ} />}
        </div>
      )}
    </>
  );
}
