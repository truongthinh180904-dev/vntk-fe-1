"use client";
import { useState, useEffect } from "react";

const FlightPluginBlog = () => {
  // Mặc định ban đầu chỉ cao 150px để không đè lên link bên dưới
  const [iframeHeight, setIframeHeight] = useState("150px");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Nhận tín hiệu từ file HTML trong iframe gửi ra
      if (event.data.type === 'TOGGLE_FLIGHT_DROPDOWN') {
        setIframeHeight(event.data.isOpen ? "750px" : "150px");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ 
      height: iframeHeight, 
      transition: "height 0.3s ease-in-out", // Hiệu ứng co giãn mượt mà
      overflow: "visible" 
    }}>
      <iframe
        src="/flight-blg.html"
        title="Tìm kiếm chuyến bay"
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
      />
    </div>
  );
};

export default FlightPluginBlog;