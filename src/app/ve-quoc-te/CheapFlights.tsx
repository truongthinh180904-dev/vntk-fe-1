"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightLeft, ChevronDown, ChevronRight, ChevronUp, Plane } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./CheapFlights.css"; // 🔹 CSS tách riêng

gsap.registerPlugin(ScrollTrigger);

interface FlightDeal {
  airline: string;
  from: string;
  to: string;
  dateRange: string;
  price: number;
  sale?: string;
  tripType: "khu-hoi" | "mot-chieu";
}

interface CheapFlightsProps {
  deals: FlightDeal[];
}

const CheapFlights: React.FC<CheapFlightsProps> = ({ deals }) => {
  const [tripType, setTripType] = useState<"khu-hoi" | "mot-chieu">("khu-hoi");
  const [filter, setFilter] = useState<"noi-dia" | "quoc-te" | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filteredDeals = deals.filter((deal) => deal.tripType === tripType);

  // --- IATA helper ---
  const getIata = (s: string): string => {
    const m = s.match(/\(([A-Za-z]{3})\)\s*$/);
    if (m) return m[1].toUpperCase();
    return s.slice(0, 3).toUpperCase();
  };

  const buildSearchUrl = (deal: FlightDeal) => {
    const fromCode = getIata(deal.from);
    const toCode = getIata(deal.to);
    return `/tim-kiem-chuyen-bay?dtcr=${fromCode}${toCode}20261020&dtcp=100`;
  };

  // --- Animate cards ---
  useEffect(() => {
    if (listRef.current) {
      ScrollTrigger.getById("cheapflights-trigger")?.kill();
      gsap.fromTo(
        listRef.current.querySelectorAll(".card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            id: "cheapflights-trigger",
            trigger: listRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [tripType, filter]);

  // --- Close dropdown on outside click ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




  return (
    <div className="container-fluid" style={{ backgroundColor: "#f0f8fb" }}>
      <div className="container py-4">
        <h1 className="fw-bold  promo-header">
          <Plane
          style={{ marginRight: "6px" }}
          size={35}
          color="#2d4f85"
          className="mb-3"/>
           Chuyến Bay Nội Địa Giá Tốt Nhất 
          </h1>

        {/* Bộ lọc */}
        <div className="d-flex align-items-center gap-3 p-2 mb-4">
         <div className="dropdown-custom" ref={dropdownRef}>
        <button
          className={`btn btn-sm p-2 btn-filter rounded-pill ${filter === "noi-dia" ? "active" : ""}`}
          onClick={() => setFilter("noi-dia")}
          style={{ marginRight: "10px" }}
        >
          Vé máy bay Nội Địa
        </button>

    {/* 👇 Bao riêng phần dropdown */}
    <div className="position-relative d-inline-block">
      <button
        className={`btn btn-sm p-2 btn-filter rounded-pill ${open ? "active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {tripType === "khu-hoi" ? "Khứ Hồi" : "Một Chiều"}
        <ChevronDown
          size={16}
          style={{
            marginLeft: "4px",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>

      {open && (
        <ul
          className="dropdown-menu-custom shadow rounded"
          style={{
            position: "absolute",
            top: "100%", // 👈 nằm ngay dưới nút
            left: 0,
            zIndex: 9999,
            background: "#fff",
            listStyle: "none",
            padding: "8px 0",
            margin: 0,
            minWidth: "120px",
          }}
        >
          <li>
            <button
              className="dropdown-item-custom w-100 text-start px-3 py-2"
              onClick={() => {
                setTripType("khu-hoi");
                setOpen(false);
              }}
            >
              Khứ Hồi
            </button>
          </li>
          <li>
            <button
              className="dropdown-item-custom w-100 text-start px-3 py-2"
              onClick={() => {
                setTripType("mot-chieu");
                setOpen(false);
              }}
            >
              Một Chiều
            </button>
          </li>
        </ul>
      )}
    </div>
  </div> 
   </div>
        {/* Danh sách vé */}
         <div
        className="row g-3"
        ref={listRef}
        style={{
          maxHeight: expanded ? "none" : "300px", // 🔥 ban đầu chỉ 300px
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {filteredDeals.map((deal, idx) => (
          <div key={idx} className="col-md-4 col-sm-6">
            <div className="card shadow-sm border-0 flight-ticket-card h-100">
              <div className="card-body position-relative d-flex justify-content-between align-items-center">
                {/* Sale ribbon */}
                {deal.sale && (
                  <div className="ribbon_venoidia">
                    <span style={{ fontSize: "10px" }}>Giảm {deal.sale}%</span>
                  </div>
                )}

                {/* Info */}
                <div className="flight-info">
                  <h6 className="airline-name mb-2"></h6>
                  <div className="flight-route mb-2 d-flex align-items-center">
                    <span>{deal.from}</span>
                    <ArrowRightLeft size={16} className="mx-2" />
                    <span>{deal.to}</span>
                  </div>
                  <div className="flight-date">{deal.dateRange}</div>
                  <div
                    className="ticket-type mb-1"
                    style={{ marginLeft: "5px" }}
                  >
                    {deal.tripType === "khu-hoi" ? "Khứ Hồi" : "Một Chiều"}
                  </div>
                </div>

                {/* Price + Xem thêm */}
                <div className="price-section text-end">
                  <div className="ticket-price mb-1">
                    {deal.price.toLocaleString("vi-VN")}₫
                  </div>

                  <a
                    href={buildSearchUrl(deal)}
                    className="btn-view-more-link"
                  >
                    Xem thêm <ChevronRight size={15} style={{ marginTop: "4px" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút Xem thêm / Thu gọn */}
      {filteredDeals.length > 6 && (
        <div className="text-center mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn btn-outline-primary rounded-pill px-4 py-2"
          >
            {expanded ? (
              <>
                Thu gọn <ChevronUp size={16} className="ms-1" />
              </>
            ) : (
              <>
                Xem thêm <ChevronRight size={16} className="ms-1" />
              </>
            )}
          </button>
        </div>
      )}

      </div>
    </div>
  );
};

export default CheapFlights;
