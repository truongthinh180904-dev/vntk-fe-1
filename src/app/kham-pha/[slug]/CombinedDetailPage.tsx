"use client";

import React, { useState } from "react";
import logo_airlines from "../../assets/img/home/logo/logo_airlines.png";
import viettravel from "../../assets/img/home/logo/viettravel.png";
import logo_bambo from "../../assets/img/home/logo/logo_bambo.png";
import logo_vietjet from "../../assets/img/home/logo/vietjet.jpg";

interface CombinedDetailProps {
  slug: string;
  post: any;
  image: string[]; // 3 ảnh từ meta
}

const CombinedDetailPageNew: React.FC<CombinedDetailProps> = ({
  slug,
  post,
  image,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const content = post?.content?.rendered || "";
  const title = post?.title?.rendered || "Không có tiêu đề";

  // ✅ Ảnh meta hoặc fallback
  const images =
    image && image.length > 0
      ? image
      : [
          post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://vietnam-tickets/static/imgad/2017/0322/logo_eva-620.png",
        ];

  const airlinesData = [
    { name: "Vietravel Airlines", logo: viettravel.src },
    { name: "VietJet Air", logo: logo_vietjet.src },
    { name: "Vietnam Airlines", logo: logo_airlines.src },
    { name: "Bamboo Airways", logo: logo_bambo.src },
  ];

  return (
    <div className="container-fluid">
      <div className="container my-4">
        {/* 🔹 Banner 3 ảnh */}
        <div className="row">
          <div className="col-md-8">
            <img
              loading="lazy"
              src={images[0]}
              alt={title}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
              data-bs-toggle="modal"
              data-bs-target="#photoModal"
              onClick={() => setActiveIndex(0)}
            />
          </div>

          <div className="col-md-4 d-flex flex-column">
            {images[1] && (
              <img
                loading="lazy"
                src={images[1]}
                alt="Ảnh phụ 1"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "190px", objectFit: "cover", width: "100%" }}
                data-bs-toggle="modal"
                data-bs-target="#photoModal"
                onClick={() => setActiveIndex(1)}
              />
            )}
            {images[2] && (
              <div className="position-relative">
                <img
                  loading="lazy"
                  src={images[2]}
                  alt="Ảnh phụ 2"
                  className="img-fluid rounded"
                  style={{ maxHeight: "190px", objectFit: "cover", width: "100%" }}
                  data-bs-toggle="modal"
                  data-bs-target="#photoModal"
                  onClick={() => setActiveIndex(2)}
                />
                <button
                  className="btn btn-dark position-absolute bottom-0 end-0 m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#photoModal"
                  onClick={() => setActiveIndex(0)}
                >
                  Xem tất cả ảnh
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Tiêu đề + nội dung thu gọn */}
        <div className="mt-3 position-relative">
          <div
            className="text-muted"
            style={{
              maxHeight: expanded ? "none" : "250px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: content || "<p>Không có nội dung</p>",
              }}
            />
            {!expanded && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background:
                    "linear-gradient(to top, white 70%, rgba(255,255,255,0))",
                }}
              />
            )}
          </div>

          <button
            className="btn btn-link text-primary fw-semibold p-0 mt-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Thu gọn" : "Đọc thêm"}
          </button>
        </div>

        {/* 🔹 Modal xem ảnh */}
        <div
          className="modal fade"
          id="photoModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center">
                <img
                  loading="lazy"
                  src={images[activeIndex]}
                  alt="Main"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "420px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <img
                      loading="lazy"
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      className={`rounded ${
                        i === activeIndex ? "border border-primary" : ""
                      }`}
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  {activeIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Hãng bay phổ biến */}
        <div className="mt-5 border-top pt-4">
          <h3 className="fw-semibold mb-3">Hãng bay phổ biến</h3>
          <div className="d-flex flex-wrap gap-4">
            {airlinesData.map((a, i) => (
              <div key={i} className="text-center">
                <img
                  src={a.logo}
                  alt={a.name}
                  style={{ height: "50px", objectFit: "contain" }}
                />
                <p className="mt-2 small">{a.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedDetailPageNew;
