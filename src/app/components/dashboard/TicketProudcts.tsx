"use client";

import { useEffect, useState } from "react";
import { getViewHistory, type HistoryItem } from "../untils/viewHistory";
import Link from "next/link";
import { Card, Button } from "react-bootstrap"; // nếu bạn dùng react-bootstrap
import { Clock } from "lucide-react";
import HeaderBar from "../users/HeaderBar";
export default function ViewHistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getViewHistory());
  }, []);

  if (!history.length) return null;

  return (
    <div className="mt-2 container" >
    <HeaderBar title={"Khám phá hành trình của bạn"} backLink={"/user/dashboard"} />
      <div className="row g-3" style={{marginTop: "20px"}}>
        {history.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-3">
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: "5px", overflow: "hidden" }}
            >
              <div className="position-relative">
                {item.image && (
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.title}
                    className="flight-image-home"
                  />
                )}
                <div
                  className="position-absolute m-3"
                  style={{ top: "65%", left: "0px" }}
                >
                  <span
                    className="badge d-none fw-bold px-3 py-2"
                    style={{
                      backgroundColor: "rgb(52 152 219 / 0.9)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    <Clock size={14} className="me-1" />
                    {/* timeAgo có thể tính từ item.time */}
                    {Math.floor((Date.now() - item.time) / 60000)} phút trước
                  </span>
                </div>
              </div>

              <Card.Body className="p-3 d-flex flex-column">
                <div className="mb-3">
                  <h6 className="fw-bold">{item.title}</h6>
                </div>

                <div className="mt-auto">
                  <Link href={`/${item.slug}`} passHref>
                    <Button
                      className="w-100 py-2 fw-bold"
                      style={{
                        backgroundColor: "rgb(24, 115, 207)",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "15px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Xem lại bài viết
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
