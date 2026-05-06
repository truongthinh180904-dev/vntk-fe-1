"use client";

import Image from "next/image";
import htv9 from "../../assets/img/home/logo_htv9.png";
import htv3 from "../../assets/img/home/VTV3_logo.png";
import Thanh_Niên_logo from "../../assets/img/home/1200px-Thanh_Niên_logo.png";
import logo_cafe from "../../assets/img/home/logo-cafe.png";
import VnExpress_logo from "../../assets/img/home/VnExpress_logo.png";
import baodantri from "../../assets/img/home/bao-dan-tri-logo.png";
import baonhandan from "../../assets/img/home/baonhandan.png";
import baovietnamnet from "../../assets/img/home/bao-viet-nam-net.png";
import topdailixuatsac from "../../assets/img/home/top-dai-ly-xuat-sac-cua-cac-hang-hang-khong.png";
import contynhieunhat from "../../assets/img/home/cong-ty-co-khach-dat-tour-truc tuyen-nhieu-nhat-nam.png";
import thuonghieuviet from "../../assets/img/home/thuong-hieu-viet.png";
import dichvuxuatsac from "../../assets/img/home/dch-vu-xuat-sac.png";
import { useRouter } from "next/navigation";
import { TicketCheck } from "lucide-react";

export default function MediaFeatures() {
  const features = [
    {
      id: "01",
      title: "Top đại lý xuất sắc nhất",
      desc: "Được công nhận là đối tác chiến lược tin cậy nhiều năm liền.",
      img: topdailixuatsac,
    },
    {
      id: "02",
      title: "Có doanh số tốt nhất",
      desc: "Liên tục nằm trong nhóm dẫn đầu về lượng khách đặt vé.",
      img: contynhieunhat,
    },
    {
      id: "03",
      title: "Thương hiệu Việt uy tín",
      desc: "Được nhiều khách hàng trong và ngoài nước tin tưởng lựa chọn.",
      img: thuonghieuviet,
    },
    {
      id: "04",
      title: "Dịch vụ xuất sắc của năm",
      desc: "Hỗ trợ tận tâm, mang lại trải nghiệm bay tốt nhất.",
      img: dichvuxuatsac,
    },
  ];

  const mediaLogos = [
    { src: htv9, alt: "HTV9" },
    { src: htv3, alt: "VTV3" },
    { src: Thanh_Niên_logo, alt: "Báo Thanh Niên" },
    { src: logo_cafe, alt: "CafeF" },
    { src: VnExpress_logo, alt: "VnExpress" },
    { src: baodantri, alt: "Báo Dân Trí" },
    { src: baonhandan, alt: "Báo Nhân Dân" },
    { src: baovietnamnet, alt: "Báo Việt Nam Net" },
  ];

    const router = useRouter();

  const handleBookNow = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // cộng 7 ngày

    // Format ddMMyyyy
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}${month}${year}`;

    // Ghép route + date
    const dtcr = `SGNHAN${formattedDate}`;
    const dtcp = "100"; // gắn cứng hoặc lấy từ data

    router.push(`/tim-kiem-chuyen-bay?dtcr=${dtcr}&dtcp=${dtcp}`);
  };


  return (
    <section className="container my-5 py-4">
      <div className="row align-items-stretch">
        {/* Bên trái: truyền thông */}
        <div className="col-lg-8 mb-5 mb-lg-0">
          <div className="sticky-top" style={{ top: '100px' }}>
            <h1 className="fw-bold promo-header d-flex align-items-center mb-2">
              <TicketCheck style={{ marginRight: "10px" }} size={35} color="#2d4f85"  />
             Thành Tựu Đạt Được Của Vietnam Tickets
            </h1>
            <p className="mb-4 text-muted">
              Chúng tôi tự hào được nhiều tờ báo và phương tiện truyền thông uy tín
              đưa tin, khẳng định chất lượng dịch vụ và sự tin tưởng từ khách hàng.
            </p>
            <div className="d-flex flex-wrap gap-4 align-items-center">
              {mediaLogos.map((logo, idx) => (
                <div key={idx} className="media-logo-wrapper">
                  <div className="media-logo">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      className="img-fluid"
                      style={{ 
                        objectFit: 'contain',
                        filter: 'grayscale(30%)',
                        opacity: 0.8,
                        transition: 'all 0.3s ease',
                        width: '100px',
                        height: '50px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
             <div className="d-flex gap-3 mt-5" style={{ maxWidth: "400px" }}>
              <button className="btn btn-primary w-50" onClick={handleBookNow} >Đặt vé ngay</button>
              <button className="btn btn-outline-primary w-50">Tư vấn</button>
            </div>
          </div>
        </div>

        {/* Bên phải: các tính năng */}
        <div className="col-lg-4">
          <div className="row g-4">
            {features.map((item, idx) => (
              <div
                className="col-12 col-sm-6"
                key={item.id}
              >
                <div className="feature-card h-100">
                  <div className="feature-content">
                    <h5 className="feature-title">{item.title}</h5>
                    <div className="feature-image">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={180}
                        height={120}
                        className="img-fluid"
                        style={{ 
                          objectFit: 'contain',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-card {
          position: relative;
          background: #fff;
          border-radius: 16px;
          padding: 2rem 1.5rem 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #2f6ae8, #1e40af);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(47, 106, 232, 0.15);
        }

        .feature-badge {
          position: absolute;
          top: -12px;
          left: 20px;
          background: linear-gradient(135deg, #2f6ae8, #1e40af);
          color: #fff;
          font-weight: bold;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(47, 106, 232, 0.3);
          z-index: 2;
        }

        .feature-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .feature-title {
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.4;
        }

        .feature-desc {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .feature-image {
          text-align: center;
          margin-top: auto;
        }

        .media-logo-wrapper {
          flex: 0 0 auto;
        }

        .media-logo {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1rem;
          background: #fff;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .media-logo:hover {
          box-shadow: 0 6px 20px rgba(47, 106, 232, 0.15);
          border-color: #2f6ae8;
          transform: translateY(-2px);
        }

        .media-logo:hover img {
          filter: grayscale(0%);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .feature-card {
            padding: 1.5rem 1rem 1rem;
          }
          
          .feature-title {
            font-size: 1rem;
          }
          
          .media-logo {
            padding: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}