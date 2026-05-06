"use client";

import { useEffect, useState } from "react";
import { getViewHistory, type HistoryItem } from "../components/untils/viewHistory";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { Clock } from "lucide-react";
import HeaderBar from "../components/users/HeaderBar";

export default function ViewHistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getViewHistory());
  }, []);

  if (!history.length) return null;

  return (
    <div className="container mt-3">
      <HeaderBar
        title="Khám phá hành trình của bạn"
        backLink="/user/dashboard"
      />

   <div className="row g-3 mt-4">
  {history.map((item) => (
    <div key={item.id} className="col-12 col-md-6">
      <Card
        className="border-0 h-100"
        style={{
          borderRadius: "5px",
          overflow: "hidden",
          background: "#fff",
          transition: "all 0.25s ease",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 12px 28px rgba(0,0,0,0.12)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 6px 18px rgba(0,0,0,0.06)")
        }
      >
        <div className="row g-0 align-items-stretch">
          {/* IMAGE */}
          <div className="col-5" style={{ overflow: "hidden" }}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "226px",
                  height: "140px",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            )}
          </div>

          {/* CONTENT */}
          <div className="col-7">
            <div
              style={{
                padding: "14px 16px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h6
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: "1.4",
                  marginBottom: "6px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </h6>

              <small
                style={{
                  color: "#6c757d",
                  fontSize: "13px",
                  marginBottom: "10px",
                }}
              >
                ⏱ {Math.floor((Date.now() - item.time) / 60000)} phút trước
              </small>

              <div style={{ marginTop: "auto" }}>
                <Link href={`/${item.slug}`} passHref>
                  <Button
                    size="sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #1873cf, #3498db)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "6px 16px",
                      fontWeight: 600,
                      fontSize: "13px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-1px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    Xem lại
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ))}
</div>


    </div>
  );
}
