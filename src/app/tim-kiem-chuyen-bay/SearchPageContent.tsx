"use client";

import { useRef, useEffect, useState  } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import FlightDetail from "../components/plugin/FlightDetail"; 
import DetailPlane from "./DetailPlane";
import DetailPlane_International from "./DetailPlane_International";
import Bgbanner from "../assets/img/domestic/banner-hero-5.jpg";

// Component chính
export default function SearchPageContent() {
  // Banner (ảnh trong /public/img/home/)
  const banners = [
    ["/img/home/banner_header_01.webp", "/img/home/banner_header_02.webp", "/img/home/banner_header_03.jpg"],
    ["/img/home/banner_header_02.webp", "/img/home/banner_header_03.jpg", "/img/home/banner_header_01.webp"],
    ["/img/home/banner_header_03.jpg", "/img/home/banner_header_01.webp", "/img/home/banner_header_02.webp"],
  ];

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const currentSlide = useRef(0);
  const totalSlides = banners.length;

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const containerWidth = sliderRef.current.clientWidth;

    if (direction === "left") {
      currentSlide.current =
        currentSlide.current === 0 ? totalSlides - 1 : currentSlide.current - 1;
    } else {
      currentSlide.current =
        currentSlide.current === totalSlides - 1 ? 0 : currentSlide.current + 1;
    }

    sliderRef.current.scrollTo({
      left: containerWidth * currentSlide.current,
      behavior: "smooth",
    });
  };

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Lấy query params trong Next.js
  const searchParams = useSearchParams();
  const dtcr = searchParams.get("dtcr") || "";
  const dtcp = searchParams.get("dtcp") || "";
  const dtcs = searchParams.get("dtcs") || "";

  // Expand logic
  const [expandedHeight, setExpandedHeight] = useState(500);
  const [expandCount, setExpandCount] = useState(0);
  const [showToggle, setShowToggle] = useState(false);
  const [skip, setSkip] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setShowToggle(contentHeight > 500);
    }
  }, []);

  const handleSeeMore = () => {
    if (expandCount < 2) {
      setExpandedHeight(expandedHeight + 500);
      setExpandCount(expandCount + 1);
    }
  };

  const handleSkip = () => {
    setSkip(true);
  };

  // Danh sách sân bay VN
  const vnAirports: Record<string, string> = {
    HAN: "Hà Nội",
    SGN: "Hồ Chí Minh",
    DAD: "Đà Nẵng",
    HPH: "Hải Phòng",
    HUI: "Huế",
    PQC: "Phú Quốc",
    CXR: "Nha Trang",
    UIH: "Quy Nhơn",
    TBB: "Tuy Hòa",
    THD: "Thanh Hóa",
    VCA: "Cần Thơ",
    VII: "Vinh",
    VDH: "Đồng Hới",
    VCL: "Chu Lai",
    PXU: "Pleiku",
    BMV: "Buôn Ma Thuột",
    DLI: "Đà Lạt",
    CAH: "Cà Mau",
    VKG: "Rạch Giá",
    VCS: "Côn Đảo",
    DIN: "Điện Biên",
    VDO: "Quảng Ninh",
  };

  // Hàm parse chuyến bay
  function parseFlightCode(code: string) {
    if (!code || code.length < 10) return null;

    const from = code.substring(0, 3);
    const to = code.substring(3, 6);
    const dateStr = code.substring(6, 14);

    const day = dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const year = dateStr.substring(4);

    return {
      from,
      to,
      dateStr,
      date: `${day}/${month}/${year}`,
      rawDate: { day, month, year },
    };
  }

  // Check nội địa
  const isNoiDia = (fromCode: string | undefined, toCode: string | undefined) => {
    if (!fromCode || !toCode) return false;
    return (
      Object.keys(vnAirports).includes(fromCode.toUpperCase()) &&
      Object.keys(vnAirports).includes(toCode.toUpperCase())
    );
  };

  // Parse chuyến bay
  let wayOne: any = null;
  let wayTwo: any = null;

  if (dtcr) {
    const parts = dtcr.split("-");
    wayOne = parseFlightCode(parts[0]);
    if (parts.length > 1) {
      wayTwo = parseFlightCode(parts[1]);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Banner section */}
    <div
  className="text-white py-4"
  style={{
    position: "relative",
    height: "320px",
    backgroundImage: `url(${Bgbanner.src})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    overflow: "hidden",
  }}
>
  {/* Overlay xanh blur */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0, 100, 200, 0.4)", // xanh mờ overlay
      backdropFilter: "blur(4px)", // làm mờ ảnh nền
      zIndex: 1,
    }}
  ></div>

  {/* Nội dung chữ nằm TRÊN overlay */}
  <div
    className="container text-left mt-2"
    style={{
      position: "relative", // giúp chữ nằm trên overlay
      zIndex: 2,
      top: "5%",
    }}
  >
    <h2 className="fw-bold title_h2 mb-2">
      Tìm kiếm vé máy bay giá rẻ và đa dạng khung giờ bay
    </h2>
    <p className="mb-5 description_p">
      So sánh và tìm kiếm vé máy bay giá rẻ với nhiều khung giờ linh hoạt. Đặt vé dễ dàng,
      nhiều hãng bay nội địa & quốc tế, hỗ trợ 24/7.
    </p>
  </div>
</div>


      {/* Danh sách chuyến bay */}
      <div
        className="container search-page shadow-lg p-2 mb-5"
        style={{
          maxHeight: "1200px",
          overflowY: "auto",
          backgroundColor: "white",
          borderRadius: "15px",
          position: "relative",
          zIndex: 90,
        }}
      >
        <div
          ref={contentRef}
          style={{
            maxHeight: skip ? "none" : `${expandedHeight}px`,
            overflowY: "auto",
            transition: "max-height 0.3s ease",
          }}
        >
          <FlightDetail dtcr={dtcr} dtcp={dtcp} dtcs={dtcs} />
        </div>

        {showToggle && !skip && (
          <div className="text-center mt-2 d-flex justify-content-center gap-2">
            {expandCount < 2 && (
              <button className="btn btn-primary btn-sm" onClick={handleSeeMore}>
                Xem thêm
              </button>
            )}
            <button className="btn btn-secondary btn-sm" onClick={handleSkip}>
              Bỏ qua
            </button>
          </div>
        )}
      </div>

      {/* Nội địa / Quốc tế */}
      {wayOne &&
        (isNoiDia(wayOne.from, wayOne.to) ? (
          <DetailPlane wayOne={wayOne} wayTwo={wayTwo} />
        ) : (
          <DetailPlane_International wayOne={wayOne} wayTwo={wayTwo} />
        ))}
    </div>
  );
}
