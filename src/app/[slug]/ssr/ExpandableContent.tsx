"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.scrollHeight > 500) {
      setShowButton(true);
    }
  }, [content]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-copy"
        style={{
          wordBreak: "break-word",
          maxHeight: isExpanded ? "none" : "1395px",
          overflow: "hidden",
          transition: "max-height 0.6s ease",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      />

      {!isExpanded && showButton && (
        <div
          className="absolute bottom-0 left-0 w-full h-32"
          style={{
            background:
              "linear-gradient(to top, white, rgba(255,255,255,0.85), transparent)",
          }}
        />
      )}

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 px-4 py-2 border rounded-pill bg-white shadow-sm text-primary fw-medium d-flex align-items-center gap-2"
        >
          {isExpanded ? (
            <>
              Thu gọn <ChevronUp size={18} />
            </>
          ) : (
            <>
              Xem thêm <ChevronDown size={18} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
