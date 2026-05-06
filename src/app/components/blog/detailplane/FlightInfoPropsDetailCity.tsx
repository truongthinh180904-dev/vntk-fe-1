// src/components/FlightInfoProps.tsx
import React from "react";

interface FlightInfoProps {
  title: string;
  description: string;
  flightTime: string;
  fromAirport: { name: string; code: string };
  toAirport: { name: string; code: string };
  faqs: string[]; // danh sách câu hỏi
  imageUrl: string; // ảnh minh họa
}

const FlightInfoPropsDetailCity: React.FC<FlightInfoProps> = ({
  faqs,
  imageUrl,
}) => {
  return (
    <div className="container my-4">


      {/* FAQ + Image */}
      <div className="row g-4 mt-3">
        {/* FAQ */}
        <div className="col-md-8">
          <div className="card shadow-sm rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-dark text-center">Câu hỏi thường gặp</h5>
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, idx) => (
                  <div className="accordion-item" key={idx}>
                    <h2 className="accordion-header" id={`heading-${idx}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${idx}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${idx}`}
                      >
                        {faq}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${idx}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Nội dung trả lời cho: <strong>{faq}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="col-md-4">
          <div className="card shadow-sm rounded-4 overflow-hidden h-100">
            <img
              src={imageUrl}
              alt="flight-destination"
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover" }}
              loading="lazy"  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoPropsDetailCity;
