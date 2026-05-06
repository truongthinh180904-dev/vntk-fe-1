"use client";

import { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Info, Send } from "lucide-react";
import Bgbanner from "../../assets/img/home/bg_demone.webp";

const API_URL = "https://media.vietnam-tickets.com/api/consults";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<"hanoi" | "hcm">("hanoi");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    tieude: "",
    message: "",
  });

  const offices = {
    hanoi: {
      name: "Trụ sở chính",
      address: "69 Võ Thị Sáu, P.6, Q.3, TP Hồ Chí Minh",
      phones: ["1900 3173", "(028) 3936 2020", "(028) 3925 9950"],
      email: "vietnamtickets16@gmail.com",
      feedback: "(028) 3936 2020",
      map: "https://www.google.com/maps?q=V%C3%A9+M%C3%A1y+Bay+%C4%90i+Canada,+69+V%C3%B5+Th%E1%BB%8B+S%C3%A1u,+Ph%C6%B0%E1%BB%9Dng+6,+Qu%E1%BA%ADn+3,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh&output=embed",
    },
    hcm: {
      name: "Chi nhánh",
      address: "173 Nguyễn Thị Minh Khai, P.Phạm Ngũ Lão, Q.1, TP.HCM",
      phones: ["1900 3173", "(028) 3936 2020", "(028) 3925 9950"],
      email: "vietnamtickets16@gmail.com",
      feedback: "(028) 3936 2020",
      map: "https://www.google.com/maps?q=173+Nguy%E1%BB%85n+Th%E1%BB%8B+Minh+Khai,+Qu%E1%BA%ADn+1,+TPHCM&output=embed",
    },
  };

  const activeOffice = offices[activeTab];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API_URL, {
        name: form.name,
        phone: form.phone,
        message: `Tiêu đề: ${form.tieude}\nNội dung: ${form.message}`,
      });

      alert("Gửi thông tin liên hệ thành công!");
      setForm({ name: "", phone: "", tieude: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative" style={{ overflow: "hidden" }}>
      {/* Banner map */}
      <div style={{ height: 350 }}>
        <iframe
          src={activeOffice.map}
          width="100%"
          height="100%"
          style={{ border: 0, pointerEvents: "none" }} // FIX mobile click
          loading="lazy"
        />
      </div>

      <div
        className="container-fluid position-relative"
        style={{ marginTop: -150, zIndex: 5 }}
      >
        <div className="container bg-white shadow-sm rounded-4 p-4 mb-4">
          <div className="row g-4">
            {/* LEFT */}
            <div className="col-md-7">
              <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "hanoi" ? "active fw-bold" : ""}`}
                    onClick={() => setActiveTab("hanoi")}
                  >
                    Trụ sở chính
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "hcm" ? "active fw-bold" : ""}`}
                    onClick={() => setActiveTab("hcm")}
                  >
                    Chi nhánh
                  </button>
                </li>
              </ul>

              <div className="p-3 bg-light rounded">
                <p className="fw-bold text-primary">{activeOffice.name}</p>
                <p><MapPin size={16} /> {activeOffice.address}</p>
                <p><Phone size={16} /> {activeOffice.phones.join(" - ")}</p>
                <p><Mail size={16} /> {activeOffice.email}</p>
                <p><Info size={16} /> {activeOffice.feedback}</p>
              </div>

              {/* <img
                src={Bgbanner.src}
                alt="banner"
                className="img-fluid rounded mt-3"
              /> */}
            </div>

            {/* RIGHT – FORM */}
            <div className="col-md-5">
              <form onSubmit={handleSubmit}>
                <h5 className="text-center text-primary fw-bold mb-3">
                  Tư vấn miễn phí
                </h5>

                <input
                  className="form-control mb-2"
                  name="name"
                  placeholder="Họ và tên"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-2"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-2"
                  name="tieude"
                  placeholder="Tiêu đề"
                  value={form.tieude}
                  onChange={handleChange}
                  required
                />

                <textarea
                  className="form-control mb-3"
                  name="message"
                  rows={3}
                  placeholder="Nội dung thắc mắc"
                  value={form.message}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Đang gửi..." : <><Send size={16} /> Tư vấn</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
