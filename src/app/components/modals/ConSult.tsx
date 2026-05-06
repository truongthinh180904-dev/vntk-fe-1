import React, { useState } from "react";
import "./style.css";
import Imgleft from "../../assets/img/modals/bannerpopup.png";
import axios from "axios";

interface TuVanModalProps {
  show: boolean;
  onClose: () => void;
}

const ConSult: React.FC<TuVanModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // trạng thái loading

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // bật loading
    try {
      const res = await axios.post("https://media.vietnam-tickets.com/api/consults", form);
      alert(res.data.message);
      setForm({ name: "", phone: "", message: "" }); // reset form sau khi gửi
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false); // tắt loading
    }
  };

  return (
    <div className="consult-modal-overlay" onClick={onClose}>
      <div
        className="consult-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="consult-modal-content">
          {/* Bên trái: banner */}
          <div
            className="consult-modal-left d-none d-md-block"
            style={{
              backgroundImage: `url(${Imgleft.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Bên phải: form */}
          <div className="consult-modal-right">
            <div className="consult-right-content">
              <div className="consult-modal-header">
                <h2 className="fw-bold">Tư vấn miễn phí</h2>
                <button
                  type="button"
                  className="consult-close-btn"
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>

              <form className="consult-form" onSubmit={handleSubmit}>
                <div className="consult-form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    className="consult-input"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="consult-form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    className="consult-input"
                    placeholder="0123456789"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="consult-form-group">
                  <label>Nội dung thắc mắc</label>
                  <textarea
                    name="message"
                    className="consult-input"
                    placeholder="Nhập nội dung bạn muốn tư vấn..."
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

               
                <button
                  type="submit"
                  className="consult-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConSult;
