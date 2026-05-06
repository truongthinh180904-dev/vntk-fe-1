"use client";

interface FlightDetailProps {
  dtcr?: string | null;
  dtcp?: string | null;
  dtcs?: string | null;
}

const FlightDetail = ({ dtcr, dtcp, dtcs }: FlightDetailProps) => {
  const iframeSrc = `/detail-flight.html?dtcr=${dtcr ?? ""}&dtcp=${dtcp ?? ""}&dtcs=${dtcs ?? ""}`;

  return (
    <div  style={{ height: "100vh", overflow: "hidden", WebkitOverflowScrolling: "touch" }}>
      <iframe
        src={iframeSrc}
        title="Chi tiết chuyến bay"
        width="100%"
        height="100%"
        style={{ 
            border: "none",
            width: "1px", // Mẹo nhỏ cho iOS iframe
            minWidth: "100%"
        }}
        scrolling="yes" // Đổi thành yes nếu bên trong iframe dài hơn màn hình
      />
    </div>
  );
};

export default FlightDetail;
