import { BadgeQuestionMark, ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container container">
      <div className="faq-header">
       <h1 className="fw-bold promo-header d-flex align-items-center mb-2">
            <BadgeQuestionMark style={{ marginRight: "10px" }} size={35} color="#2d4f85"  />
            Câu hỏi thường gặp
             </h1>
      </div>
      
      <div className="faq-list">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            {/* Câu hỏi */}
            <button
              className="faq-question"
              onClick={() => toggle(index)}
            >
              <span className="question-text">
                <span className="question-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.question}
              </span>
              <span className="question-icon">
                <ChevronDown size={20} />
              </span>
            </button>

            {/* Câu trả lời */}
            <div className="faq-answer">
              <div className="answer-content">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;