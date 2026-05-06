"use client";

import Image from "next/image";
import { Plane } from "lucide-react";
import japanBanner from "../assets/img/home/Ve-may-bay-HN-di-manila.png"; // thay bằng đường dẫn ảnh của bạn

const HotFlightJapan = () => {
  const flights = [
    {
      id: 1,
      airline: "All Nippon Airways",
      from: "TP Hồ Chí Minh",
      to: "Sendai",
      price: "1.950.000đ",
      tag: "Phổ thông",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/All_Nippon_Airways_Logo.svg",
    },
    {
      id: 2,
      airline: "Asiana Airlines",
      from: "TP Hồ Chí Minh",
      to: "Sendai",
      price: "1.950.000đ",
      tag: "Phổ thông",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Asiana_Airlines_logo.svg",
    },
    {
      id: 3,
      airline: "All Nippon Airways",
      from: "Hà Nội",
      to: "Sendai",
      price: "1.950.000đ",
      tag: "Phổ thông",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/All_Nippon_Airways_Logo.svg",
    },
    {
      id: 4,
      airline: "EVA Air",
      from: "Hà Nội",
      to: "Sendai",
      price: "1.950.000đ",
      tag: "Phổ thông",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/EVA_Air_logo.svg",
    },
  ];

  return (
    <div className="container my-5">
      <h5 className="fw-bold text-danger mb-3">Vé máy bay HOT nhất tháng 4 này</h5>
      <div className="row g-4 align-items-stretch">
        {/* --- Left banner --- */}
        <div className="col-md-6">
          <div className="position-relative overflow-hidden rounded-4 shadow-sm">
            <Image
              src={japanBanner}
              alt="Nhật Bản"
              className="img-fluid w-100"
              style={{ objectFit: "cover", height: "100%" }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4 bg-overlay">
              <h5 className="fw-bold text-white mb-1" style={{ fontSize: "22px" }}>
                Rực rỡ mùa anh đào
              </h5>
              <h3 className="fw-bold text-uppercase text-light" style={{ fontSize: "32px" }}>
                NHẬT BẢN
              </h3>
            </div>
          </div>
        </div>

        {/* --- Right list --- */}
        <div className="col-md-6">
          <div className="p-4 rounded-4 shadow-sm flight-box">
            <h6 className="fw-bold text-white mb-3">Tất cả hãng bay đi SENDAI giá rẻ</h6>

            <div className="row g-3">
              {flights.map((flight) => (
                <div key={flight.id} className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 shadow-sm flight-item">
                    <div>
                      <div className="d-flex align-items-center mb-1">
                        <img
                          src={flight.logo}
                          alt={flight.airline}
                          width={20}
                          height={20}
                          className="me-2"
                        />
                        <small className="fw-semibold text-muted">{flight.airline}</small>
                      </div>
                      <h6 className="fw-bold mb-0 text-dark">
                        {flight.from} → {flight.to}
                      </h6>
                      <small className="text-secondary">{flight.tag}</small>
                    </div>
                    <div className="text-end">
                      <p className="fw-bold text-danger mb-1">Chỉ từ: {flight.price}</p>
                      <a
                        href="#"
                        className="text-decoration-none text-primary fw-semibold small"
                      >
                        Xem thêm &gt;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-3">
              <a
                href="#"
                className="btn btn-light text-primary fw-bold px-4 py-2 rounded-pill shadow-sm"
              >
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-overlay {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
        }
        .flight-box {
          background: linear-gradient(135deg, #ff6b81, #9b59b6);
          color: white;
        }
        .flight-item:hover {
          transform: translateY(-3px);
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default HotFlightJapan;
