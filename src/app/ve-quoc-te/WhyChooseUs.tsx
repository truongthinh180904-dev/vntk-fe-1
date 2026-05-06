"use client";

import React from "react";
import styles from "./WhyChooseUs.module.css";
import { Users, Globe2, Send, Clock } from "lucide-react";

const WhyChooseUs: React.FC = () => {
  const items = [
    { icon: <Users size={28} />, number: "150K+", label: "Khách hàng" },
    { icon: <Globe2 size={28} />, number: "500+", label: "Điểm đến" },
    { icon: <Send size={28} />, number: "25+", label: "Đối tác hàng không" },
    { icon: <Clock size={28} />, number: "15+", label: "Năm kinh nghiệm" },
  ];

  return (
    <section className={`py-4 ${styles.sectionBg}`}>
      <div className=" text-center text-md-start"
      >
        {/* Tiêu đề */}

        {/* Thẻ thông tin */}
        <div className="row g-4 justify-content-center">
          {items.map((item, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className={styles.infoCard}>
                <div className={styles.iconBox}>{item.icon}</div>
                <div className={styles.infoText}>
                  <h5 className="fw-bold">{item.number}</h5>
                  <p>{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
