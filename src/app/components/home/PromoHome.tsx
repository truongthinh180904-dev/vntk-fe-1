"use client";

import { Gift } from "lucide-react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
// import { Copy } from "react-feather";

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

  return (
  // Trong component
<section className="demo">
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
