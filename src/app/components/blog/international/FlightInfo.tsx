import React from "react";
import { MapPin } from "lucide-react";

interface Airline {
  name: string;
  logo: string;
}

interface FlightInfoProps {
  from: string;
  to: string;
  price: string;
  duration: string;
  airlines: Airline[];
}

const FlightInfo: React.FC<FlightInfoProps> = ({ from, to, price, duration, airlines }) => {
  return (
    <section className="container my-5">
      {/* Title */}
      <div className="mb-3">
        <h5 className="fw-bold d-flex align-items-center">
          <MapPin className="text-danger me-2" size={22} />
          Chuyến bay thẳng từ {from} đến {to}
        </h5>
        <p className="text-muted mb-1">
          Hãng hàng không khai thác chặng bay từ {from} đến {to}, với giá chỉ từ{" "}
          <span className="fw-semibold text-dark">{price}</span>
        </p>
        <p className="text-muted">
          Hãy lựa chọn hãng hàng không yêu thích của bạn cho chặng bay từ {from} đến {to}.
          Với những hãng không bay thẳng, bạn có thể đến {to} trong {duration}.
        </p>
      </div>

      {/* Airlines */}
      <div className="d-flex flex-wrap gap-4 align-items-center">
        {airlines.map((airline, index) => (
          <div key={index} className="text-center">
            <img
              src={airline.logo}
              alt={airline.name}
              className="img-fluid mb-2"
              style={{ maxHeight: "40px" }}
              loading="lazy" 
            />
            <div className="small text-muted">{airline.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlightInfo;
