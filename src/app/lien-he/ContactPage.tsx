"use client";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Form Liên Hệ */}
        <div className="col-lg-6 mb-4">
          <h2 className="mb-4">Liên hệ với chúng tôi</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Tiêu đề
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Nhập tiêu đề"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Nội dung
              </label>
              <textarea
                className="form-control"
                id="message"
                rows={5}
                placeholder="Nhập nội dung"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Gửi liên hệ
            </button>
          </form>
        </div>

        {/* Thông Tin Liên Hệ */}
        <div className="col-lg-6 mb-4">
          <h2 className="mb-4">Thông tin liên hệ</h2>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>Bạn cần gặp mặt trực tiếp:</strong> Có
            </li>
            <li className="mb-2">
              <strong>Địa chỉ:</strong> 69 Võ Thị Sáu, P.6, Q.3, TP. HCM
            </li>
            <li className="mb-2">
              <strong>Email:</strong> vietnamtickets16@gmail.com
            </li>
            <li className="mb-2">
              <strong>Điện thoại:</strong> 1900 3173 (028) 3936 2020
            </li>
          </ul>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="mt-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.689643021635!2d106.68808435!3d10.77892405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1764150405137!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <style jsx>{`
        h2 {
          color: #0d6efd;
        }
        form input,
        form textarea {
          border-radius: 8px;
        }
        form button {
          padding: 10px 0;
          font-size: 1rem;
        }
        ul li strong {
          color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
