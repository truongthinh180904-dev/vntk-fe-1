import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface GroupedFAQ {
  [category: string]: FAQItem[];
}

interface FAQProps {
  groups: GroupedFAQ;
}

const FAQ: React.FC<FAQProps> = ({ groups }) => {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="faqs-blogs">
      <div 
        className="p-0 rounded" 
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}
      >
        {/* Lặp category */}
        {Object.entries(groups).map(([category, items], groupIndex) => (
          <div key={groupIndex} className="mb-4">
            
            {/* TIÊU ĐỀ CATEGORY */}
            <h5 
              className="promo-header fw-bold mb-3"
              style={{
                color: "#1a365d",
                fontSize: "1.25rem",
                padding: "0.75rem 1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                borderLeft: "4px solid #3b82f6",
                marginBottom: "1rem"
              }}
            >
              {category}
            </h5>

            <div className="list-group">
              {items.map((item, index) => {
                const id = `${category}-${index}`;

                return (
                  <div 
                    key={id} 
                    className="border-bottom py-2"
                    style={{
                      border: "none",
                      marginBottom: "0.5rem",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      transition: "all 0.2s ease-in-out"
                    }}
                  >
                    {/* CÂU HỎI */}
                    <button
                      className="d-flex justify-content-between align-items-center w-100 btn btn-link text-start text-dark fw-semibold"
                      style={{ 
                        textDecoration: "none",
                        padding: "1rem 1.25rem",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#1e293b",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        transition: "all 0.2s ease"
                      }}
                      onClick={() => toggle(id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                        e.currentTarget.style.color = "#3b82f6";
                      }}
                      onMouseLeave={(e) => {
                        if (open !== id) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#1e293b";
                        }
                      }}
                    >
                      <span style={{ flex: 1, textAlign: "left" }}>
                        {item.question}
                      </span>
                      <span
                        style={{
                          transform: open === id ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.3s ease",
                          color: open === id ? "#3b82f6" : "#64748b",
                          marginLeft: "0.75rem"
                        }}
                      >
                        <ChevronDown size={18} />
                      </span>
                    </button>

                    {/* CÂU TRẢ LỜI */}
                    {open === id && (
                      <div 
                        className="mt-2 ps-3 text-muted" 
                        style={{ 
                          lineHeight: "1.6",
                          padding: "0 1.25rem 1.25rem",
                          color: "#475569",
                          fontSize: "0.9rem",
                          borderTop: "1px solid #f1f5f9",
                          marginTop: "0.5rem",
                          paddingTop: "1rem",
                          animation: "fadeIn 0.3s ease-in-out"
                        }}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Thêm style cho animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FAQ;