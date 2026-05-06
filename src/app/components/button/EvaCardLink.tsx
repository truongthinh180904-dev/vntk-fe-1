"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PlaneLoader.module.css";

interface EvaCardLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const EvaCardLink: React.FC<EvaCardLinkProps> = ({ href, children, className }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Nếu click vào các nút khác bên trong card (ví dụ nút gọi điện) thì không chạy load này
    if ((e.target as HTMLElement).closest('button')) return;

    setIsNavigating(true);
    router.push(href);
  };

  return (
    <div 
      onClick={handleCardClick} 
      className={`position-relative ${className}`}
      style={{ cursor: "pointer" }}
    >
      {/* Nội dung card thực tế */}
      <div style={{ visibility: isNavigating ? "hidden" : "visible", opacity: isNavigating ? 0 : 1 }}>
        {children}
      </div>

      {/* Lớp phủ Loading Máy bay */}
      {isNavigating && (
        <div className={styles.cardOverlay}>
          <div className={styles.loaderContainer}>
            <div className={styles.plane}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M552 264C582.9 264 608 289.1 608 320C608 350.9 582.9 376 552 376L424.7 376L265.5 549.6C259.4 556.2 250.9 560 241.9 560L198.2 560C187.3 560 179.6 549.3 183 538.9L237.3 376L137.6 376L84.8 442C81.8 445.8 77.2 448 72.3 448L52.5 448C42.1 448 34.5 438.2 37 428.1L64 320L37 211.9C34.4 201.8 42.1 192 52.5 192L72.3 192C77.2 192 81.8 194.2 84.8 198L137.6 264L237.3 264L183 101.1C179.6 90.7 187.3 80 198.2 80L241.9 80C250.9 80 259.4 83.8 265.5 90.4L424.7 264L552 264z"/>
              </svg>
            </div>
            <div className={styles.loadingWrapper}>
              <div className={styles.loader}></div>
            </div>
            <span className={styles.loadingText}>Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaCardLink;