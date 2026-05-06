"use client";

import React, { useState } from "react";

interface InfoBoxProps {
  content: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="py-3 mb-3">
      <div className="infobox-container">
        {/* Nội dung */}
        <div className="infobox-content">
          <div
            className={`infobox-text ${expanded ? "expanded" : "collapsed"}`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            
            {/* Gradient overlay */}
            {!expanded && (
              <div className="infobox-gradient" />
            )}
          </div>
        </div>

        {/* Nút xem thêm */}
        <div className="infobox-button-container">
          <button
            className={`infobox-button ${expanded ? "expanded" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            <span className="button-text">
              {expanded ? "Thu Gọn" : "Xem Thêm"}
            </span>
            <span className={`button-icon ${expanded ? "expanded" : ""}`}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d={expanded ? "M6 15L12 9L18 15" : "M6 9L12 15L18 9"} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
       
        .infobox-content {
          position: relative;
          margin-bottom: 1rem;
        }

        .infobox-text {
          line-height: 1.7;
          text-align: justify;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .infobox-text.collapsed {
          max-height: 100px;
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }

        .infobox-text.expanded {
          max-height: 350px;
          animation: expandAnimation 0.6s ease-out;
        }

        .infobox-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(255, 255, 255, 0.7) 30%,
            rgba(255, 255, 255, 0.4) 70%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
          border-radius: 0 0 12px 12px;
        }

        .infobox-button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.5rem;
        }

        .infobox-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          color: #1565c0;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(21, 101, 192, 0.15);
          position: relative;
          overflow: hidden;
        }

        .infobox-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent
          );
          transition: left 0.6s;
        }

        .infobox-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(21, 101, 192, 0.25);
          background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
        }

        .infobox-button:hover::before {
          left: 100%;
        }

        .infobox-button:active {
          transform: translateY(0);
        }

        .infobox-button.expanded {
          background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
          color: #c62828;
          box-shadow: 0 2px 8px rgba(198, 40, 40, 0.15);
        }

        .infobox-button.expanded:hover {
          background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
          box-shadow: 0 4px 16px rgba(198, 40, 40, 0.25);
        }

        .button-text {
          position: relative;
          z-index: 1;
        }

        .button-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .button-icon.expanded {
          transform: rotate(180deg);
        }

        /* Scrollbar styling cho nội dung mở rộng */
        .infobox-text.expanded::-webkit-scrollbar {
          width: 6px;
        }

        .infobox-text.expanded::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .infobox-text.expanded::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #bbdefb, #90caf9);
          border-radius: 3px;
        }

        .infobox-text.expanded::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #90caf9, #64b5f6);
        }

      `}</style>
    </div>
  );
};

export default InfoBox;