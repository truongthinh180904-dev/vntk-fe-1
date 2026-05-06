"use client";
import { useState, useEffect } from "react";

const FlightPluginBlog = () => {
  const [height, setHeight] = useState("150px"); // Chiều cao mặc định khi chưa mở dropdown

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TOGGLE_FLIGHT_DROPDOWN') {
        // Nếu mở dropdown thì tăng height lên để chứa, nếu đóng thì thu nhỏ lại
        setHeight(event.data.isOpen ? "750px" : "150px");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: height, // Height thay đổi linh hoạt ở đây
        transition: "height 0.2s ease", // Hiệu ứng mượt mà
        position: "relative",
        zIndex: 10
      }}
    >
      <iframe
        src="/flight-search-header-menu.html"
        title="Tìm kiếm chuyến bay"
        width="100%"
        height="100%"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
      />
    </div>
  );
};

export default FlightPluginBlog;