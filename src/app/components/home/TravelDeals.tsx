"use client";
import Image from "next/image";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import travel01 from "../../assets/img/home/travel1.jpg";
import travel02 from "../../assets/img/home/travel2.jpg";
import travel03 from "../../assets/img/home/travel3.jpg";
import travel04 from "../../assets/img/home/travel4.jpg";
import travel05 from "../../assets/img/home/travel5.jpg";
import travel06 from "../../assets/img/home/travel6.jpg";
import travel07 from "../../assets/img/home/travel7.jpg";
import travel08 from "../../assets/img/home/travel8.jpg";

interface Deal {
  id: number;
  title: string;
  image: string;
}

const vietnamToWorld: Deal[] = [
  { id: 1, title: "BOUNXAI", image: travel01.src },
  { id: 2, title: "BOUALAPHA", image: travel02.src },
  { id: 3, title: "THAKHEK", image: travel03.src },
  { id: 4, title: "KENNER", image: travel04.src },
];

const worldToVietnam: Deal[] = [
  { id: 5, title: "LOS ANGELES - TPHCM", image: travel05.src },
  { id: 6, title: "LOS ANGELES - HÀ NỘI", image: travel06.src },
  { id: 7, title: "MỸ - ĐÀ NẴNG", image: travel07.src },
  { id: 8, title: "MỸ - TPHCM", image: travel08.src },
];

export default function TravelDeals() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  const handleNext = (type: "vietnam" | "world") => {
    if (type === "vietnam") {
      setIndex1((prev) => (prev + 1) % vietnamToWorld.length);
    } else {
      setIndex2((prev) => (prev + 1) % worldToVietnam.length);
    }
  };

  const handlePrev = (type: "vietnam" | "world") => {
    if (type === "vietnam") {
      setIndex1((prev) => (prev === 0 ? vietnamToWorld.length - 1 : prev - 1));
    } else {
      setIndex2((prev) => (prev === 0 ? worldToVietnam.length - 1 : prev - 1));
    }
  };

  const renderDeals = (deals: Deal[], currentIndex: number) => {
  const visibleDeals = [];
  for (let i = 0; i < 4; i++) {
    visibleDeals.push(deals[(currentIndex + i) % deals.length]);
  }


    return (
     <Row className="g-3 justify-content-center">
      {visibleDeals.map((deal) => (
        <Col key={deal.id} xs={12} sm={6} md={3}>
          <div
            className="travel-card"
            style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Image */}
            <Image
              src={deal.image}
              alt={deal.title}
              width={300}
              height={200}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "10px",
              }}
            />

            {/* Overlay + text */}
            <div className="travel-overlay">
              <span className="travel-text">{deal.title}</span>
            </div>
          </div>
        </Col>
      ))}
    </Row>
    );
  };

  return (
    <div className="container-fluid py-5" style={{ background: "#fff" }}>
      <div className="container">
        {/* Section 1 */}
      <div className="mb-5">
        <h3 className="fw-bold text-center mb-4">
          Vé máy bay Việt Nam đi quốc tế
        </h3>
        <div className="d-flex align-items-center justify-content-between">
          <Button
            variant="light"
            className="rounded-circle shadow-sm"
            onClick={() => handlePrev("vietnam")}
          >
            ‹
          </Button>
          <div className="flex-grow-1 px-3">{renderDeals(vietnamToWorld, index1)}</div>
          <Button
            variant="light"
            className="rounded-circle shadow-sm"
            onClick={() => handleNext("vietnam")}
          >
            ›
          </Button>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <h3 className="fw-bold text-center mb-4">
          Vé máy bay quốc tế về Việt Nam
        </h3>
        <div className="d-flex align-items-center justify-content-between">
          <Button
            variant="light"
            className="rounded-circle shadow-sm"
            onClick={() => handlePrev("world")}
          >
            ‹
          </Button>
          <div className="flex-grow-1 px-3">{renderDeals(worldToVietnam, index2)}</div>
          <Button
            variant="light"
            className="rounded-circle shadow-sm"
            onClick={() => handleNext("world")}
          >
            ›
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
