import React from "react";
import Blog1 from "../assets/img/blog/Ve-ma-y-bay-i-Muang-Houne.jpg";
import Blog2 from "../assets/img/blog/Ve-ma-y-bay-i-Muang-Namo.jpg";
import Blog3 from "../assets/img/blog/ve-ma-y-bay-i-Bloomington-Minnesota.jpg";
import Blog4 from "../assets/img/blog/ve-ma-y-bay-i-O-Fallon-missouri.jpg";
import Blog5 from "../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
import Blog6 from "../assets/img/blog/ve-ma-y-bay-i-Phine.jpg";
import FlightDealLink from "../components/flightlink/FlightDealLink";
import DomesticFlights from "./DomesticFlights";

const NewsAll = () => {
  const currentFlights = [
    {
      id: 1,
      from: "TP.HCM",
      to: "Hà Nội",
      price: 1250000,
      date: "12/10 - 18/10",
      img: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      from: "Đà Nẵng",
      to: "Phú Quốc",
      price: 1450000,
      date: "13/10 - 20/10",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      from: "Hà Nội",
      to: "Nha Trang",
      price: 1300000,
      date: "14/10 - 21/10",
      img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      from: "TP.HCM",
      to: "Đà Lạt",
      price: 950000,
      date: "15/10 - 22/10",
      img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <>
   
    <div className="d-none news-all container py-3">
      <h1 className="fw-bold mb-4 text-uppercase text-dark">Vé máy bay nổi bật</h1>
      <div className=" g-4">
       <div
        // ref={sliderRef}
        className="row flex-md-wrap flex-nowrap overflow-auto"
        style={{paddingBottom:"20px", scrollSnapType: "x mandatory", overflowY: "hidden", msOverflowStyle: "none"}} 
      >
        {currentFlights.length > 0 ? (
        currentFlights.map((flight, index) => (
          <div key={flight.id} className="col-md-3 col-10 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "6px" }}>
             

        {/* Ảnh */}
        <div style={{ height: "160px", overflow: "hidden" }}>
          <img
            src={flight.img}
            className="card-img-top h-100 object-fit-cover"
            alt={`vé máy bay từ ${flight.from} đến ${flight.to}`}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Nội dung */}
        <div className="card-body">
          <h6 className="card-title fw-bold mb-1" style={{ 
             color: "#2D4271",
             fontSize: "14px",
             borderBottom: "1px dashed #ccc", 
             paddingBottom: "6px",
              }}>
             Ưu đãi cho khách hàng mỗi ngày nhận deal vàng bật ngữa
          </h6>

          <div className="mt-2">
            <div className="d-flex align-items-center mb-2">
              <span  style={{fontWeight:'bold',fontSize: "0.7rem", color: "#666" }}>
              Nhập mã XUATNGOAI giảm 10% tối đa 800k cho giao dịch vé máy bay nội địa
              </span>
            </div>


          <div className="d-flex justify-content-center align-items-end gap-2">
          <FlightDealLink
            from={flight.from}
            to={flight.to}
            price={flight.price}
            tripType="mot-chieu"
            dateRange={flight.date}
          >
            <button style={{width:"220px"}} className="btn p-2 fw-bold btn-outline-primary btn-sm">
              Xem thêm 
            </button>
          </FlightDealLink>
        </div>

          </div>
        </div>
      </div>
    </div>
      ))
    ) : (
      <p className="text-muted">Không có chuyến bay nào cho điểm đến này.</p>
    )}
      </div>
      </div>
    </div>
      <DomesticFlights />
    </>
  );
};

export default NewsAll;
