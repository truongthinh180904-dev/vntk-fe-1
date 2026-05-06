import React, { useState } from "react";
import logo_airlines from '../../assets/img/home/logo/logo_airlines.png';
import viettravel from '../../assets/img/home/logo/viettravel.png';
import logo_bambo from '../../assets/img/home/logo/logo_bambo.png';
import logo_vietjet from '../../assets/img/home/logo/vietjet.jpg';

const DetailCategoryInternational: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2977432/pexels-photo-2977432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];

  interface FlightDeal {
    airline: string;
    airlineLogo: string;
    from: string;
    to: string;
    dateRange: string;
    price: number;
    tripType: "khu-hoi" | "mot-chieu"; // ✅ thêm field này
  }


  const airlinesData = [
    { name: "Vietravel Airlines", logo: viettravel.src  },
    { name: "VietJet Air", logo: logo_vietjet.src },
    { name: "Vietnam Airlines", logo: logo_airlines.src},
    { name: "Bamboo Airways", logo: logo_bambo.src },
  ];

  return (
    <div className="container-fluid">
      <div className="container my-4">
        {/* Banner */}
        <div className="row">
          <div className="col-md-8">
            <img  loading="lazy" 
              src={images[0]}
              alt="Jakarta"
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
              data-bs-toggle="modal"
              data-bs-target="#photoModal"
              onClick={() => setActiveIndex(0)}
            />
          </div>
          <div className="col-md-4 d-flex flex-column">
            <img  loading="lazy" 
              src={images[1]}
              alt="Jakarta view"
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "190px", objectFit: "cover", width: "100%" }}
              data-bs-toggle="modal"
              data-bs-target="#photoModal"
              onClick={() => setActiveIndex(1)}
            />
            <div className="position-relative">
              <img  loading="lazy" 
                src={images[2]}
                alt="Jakarta night"
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
                See All Photos
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mt-3 position-relative">
          <h2 className="fw-bold">Jakarta</h2>
          <p className="text-primary small mb-2">Châu Á / Indonesia / Jakarta</p>

          <div
            className="text-muted"
            style={{
              maxHeight: expanded ? "none" : "120px",
              overflow: "hidden",
              position: "relative"
            }}
          >
            Trải dài dọc bờ biển phía tây đảo Java, thành phố Jakarta trở thành điểm
            đến thu hút giới trẻ và du khách từ khắp nơi trên thế giới. Nằm trong
            vùng nhiệt đới gió mùa, thành phố này có khí hậu nóng và ẩm quanh năm.
            Nhưng đừng lo lắng, những cơn mưa rào thường kéo qua nhanh chóng, để lại
            bầu không khí trong lành và dễ chịu. Đây là nơi hội tụ nhiều nền văn hoá,
            với sự pha trộn hài hoà giữa truyền thống và hiện đại. Jakarta còn nổi
            tiếng với ẩm thực đường phố phong phú, khu mua sắm sầm uất, và đời sống
            về đêm sôi động…
            {!expanded && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50px",
                  background:
                    "linear-gradient(to top, white 60%, rgba(255,255,255,0))"
                }}
              />
            )}
          </div>

          <button
            className="btn btn-link text-primary fw-semibold p-0 mt-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Thu gọn" : "Read More"}
          </button>
        </div>

      
        <FlightInfo
          from="Hà Nội"
          to="TP HCM"
          price="1.103.455 VND"
          duration="2 giờ 0 phút"
          airlines={airlinesData}
        /> */}

        {/* Modal (Bootstrap) */}
        <div
          className="modal fade"
          id="photoModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Photos of Jakarta</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center">
                <img  loading="lazy" 
                  src={images[activeIndex]}
                  alt="Main"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "420px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <img  loading="lazy" 
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
                        cursor: "pointer"
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
      </div>
{/* components new */}
       </div>
  );
};

export default DetailCategoryInternational;
