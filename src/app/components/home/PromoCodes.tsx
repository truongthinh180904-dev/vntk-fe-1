"use client";

import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
// import { Copy } from "react-feather";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Promo {
  id: number;
  title: string;
  description: string;
  code: string;
  active: boolean;
}

const promos: Promo[] = [
  {
    id: 1,
    title: "Giảm ngay 50K",
    description: "Áp dụng cho lần đặt đầu tiên trên ứng dụng VietNam Tickets",
    code: "VNTKBANMOI",
    active: true,
  },
  {
    id: 2,
    title: "8% giảm giá Khách sạn",
    description: "Áp dụng cho lần đặt đầu tiên trên ứng dụng VietNam Tickets",
    code: "VNTKBANMOI",
    active: true,
  },
  {
    id: 3,
    title: "8% giảm Hoạt động Du lịch",
    description: "Áp dụng cho lần đặt đầu tiên trên ứng dụng VietNam Tickets",
    code: "VNTKBANMOI",
    active: false,
  },
];

export default function PromoCodes() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (code: string, id: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  useEffect(() => {
    // Khởi tạo matchMedia
    let mm = gsap.matchMedia();

    // Chỉ chạy hiệu ứng khi chiều rộng màn hình từ 768px trở lên (Desktop/Tablet ngang)
    mm.add("(min-width: 768px)", () => {
      
      gsap.utils.toArray(".promo-card").forEach((card: any, index: number) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    });

    // Cleanup: Khi component unmount sẽ tự động loại bỏ các hiệu ứng
    return () => mm.revert();
  }, []);
  
  return (
  // Trong component
<section className="container d-none d-md-block my-2">
  <h1 className="mb-2 fw-bold promo-header">
    <Gift style={{marginRight:'5px'}} size={35} color="#2d4f85" className="mb-3" />Mã Ưu Đãi Tặng Bạn Mới
  </h1>
  <div className="row g-3">
    {promos.map((promo) => (
      <div key={promo.id} className="col-md-4">
        <Card className="h-100 promo-card">
          <Card.Body className="d-flex flex-column">
            <div className="mb-3">
              <div className="promo-divider"></div>
            </div>
            <h6 className="fw-bold text-dark mb-2 promo-title">
              {promo.title}
            </h6>
            <p className="small text-muted mb-3 flex-grow-1">{promo.description}</p>
            <div className="d-flex align-items-center">
              <code className="bg-light px-3 py-2 rounded flex-grow-1 border promo-code">
                {promo.code}
              </code>
              <Button
                variant="primary"
                size="sm"
                className="ms-2 d-flex align-items-center copy-btn"
                onClick={() => handleCopy(promo.code, promo.id)}
                style={{padding:'8px'}}
              >
                {copiedId === promo.id ? "Đã sao chép" : "Sao chép"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
</section>
  );
}
