"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface EvaLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string; // Để bạn truyền class của Bootstrap/Tailwind từ ngoài vào
}

const EvaLink: React.FC<EvaLinkProps> = ({ href, children, className }) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRedirecting) return;

    setIsRedirecting(true);
    router.push(href);
  };

  return (
    <div 
      onClick={handleRedirect} 
      className={className} 
      style={{ 
        cursor: isRedirecting ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "inherit" // Thừa hưởng chiều cao từ cha
      }}
    >
      {isRedirecting ? (
        <div className="eva-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        children
      )}

      <style jsx>{`
        .eva-dots {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .eva-dots span {
          width: 6px;
          height: 6px;
          background-color: #158897; /* Màu xanh lục EVA */
          border-radius: 50%;
          display: inline-block;
          animation: eva-bounce 0.6s infinite alternate;
        }
        .eva-dots span:nth-child(2) { animation-delay: 0.2s; }
        .eva-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes eva-bounce {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-8px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default EvaLink;