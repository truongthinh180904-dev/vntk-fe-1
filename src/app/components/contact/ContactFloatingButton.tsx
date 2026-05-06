"use client";

import { useState } from "react";
import Image from "next/image";
import Iconimg from "../../assets/img/modals/demo.png";
import Zalo from "../../assets/img/modals/widget_icon_light_zalo.svg";
import Email from "../../assets/img/modals/email.webp";
import Call from "../../assets/img/modals/call-agent.webp";
import './style.css';
import { X } from "lucide-react";

export default function ContactFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="contact-floating">
      {/* Menu popup */}
      <div className={`contact-menu ${open ? "show" : ""}`}>
        <a href="/lien-he" className="contact-item">
          <div className="icon-circle email-bg">
            <Image src={Email} alt="Email" width={20} height={20} />
          </div>
          <span>Yêu cầu gọi lại</span>
        </a>
        {/* <a
          href="https://zalo.me/0911408966"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item"
        >
          <div className="icon-circle zalo-bg">
            <Image src={Zalo} alt="Zalo" width={20} height={20} />
          </div>
          <span>Zalo chat</span>
        </a> */}
        <a href="tel:19003173" className="contact-item">
          <div className="icon-circle phone-bg">
            <Image src={Call} alt="Call" width={20} height={20} />
          </div>
          <span>1900 3173</span>
        </a>
      </div>

      {/* Nút chính */}
   {/* Nút chính */}
      <div className="tooltip-wrapper">
        <button
          className={`contact-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Liên hệ"
        >
          {open ? (
            <span className="close-icon">
              <X size={28} />
            </span>
          ) : (
         <Image
              src="/demo.png"
              alt="Liên hệ"
              width={40}
              height={40}
            />

            // <img src={Icon.src} alt="Liên hệ" width={40} height={40} />
          )}
        </button>

        {/* Tooltip chỉ hiện khi chưa mở */}
        {!open && <span className="tooltip">Liên hệ</span>}
      </div>

    
    </div>
  );
}
