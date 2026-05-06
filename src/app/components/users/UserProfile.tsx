"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import HeaderBar from "./HeaderBar";

interface User {
  name: string;
  phone: string;
  email: string;
  google_id?: string | null;
  avatar?: string | null;
  email_verification_token?: string | null;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          console.error("Lỗi parse user localStorage");
        }
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="container py-4 text-center">
        <div className="text-muted">Đang tải thông tin người dùng...</div>
      </div>
    );
  }

  const isVerified = user.email_verification_token === null;

  return (
    <div className="container" style={{ maxWidth: 500 }}>
    <HeaderBar title={"Thông tin người dùng"} backLink={"/user/dashboard"} />
      <div className="bg-white shadow-sm mt-4 rounded-4 p-4 d-flex flex-column align-items-center text-center" style={{border:"1px solid rgb(23 138 239)"}}>
        {/* Avatar */}
        <div className="mb-3">
          {user.google_id && user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              width={90}
              height={90}
              className="rounded-circle border"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center border"
              style={{ width: 90, height: 90, fontSize: 34, fontWeight: 600 }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* User info */}
        <h5 className="fw-bold mb-1">{user.name}</h5>
        <div className="text-muted small mb-2">{user.email}</div>

        {/* Verification status */}
        {isVerified ? (
          <Badge bg="success" pill>
            ✔ Đã xác thực
          </Badge>
        ) : (
          <Badge bg="warning" pill>
            ✖ Chưa kích hoạt tài khoản
          </Badge>
        )}
      </div>

      {/* Details section */}
      <div className="bg-white mt-3 shadow-sm rounded-4 p-3 mt-3">
        <h6 className="fw-bold mb-3">Thông tin cá nhân</h6>

        <div className="d-flex justify-content-between py-2 border-bottom">
          <span className="text-muted">Họ & Tên</span>
          <span className="fw-semibold">{user.name}</span>
        </div>

        <div className="d-flex justify-content-between py-2 border-bottom">
          <span className="text-muted">Số điện thoại</span>
          <span className="fw-semibold">{user.phone || "Chưa có"}</span>
        </div>

        <div className="d-flex justify-content-between py-2 border-bottom">
          <span className="text-muted">Email</span>
          <span className="fw-semibold">{user.email}</span>
        </div>

        <div className="d-flex justify-content-between py-2">
          <span className="text-muted">Phương thức đăng nhập</span>
          <span className="fw-semibold">
            {user.google_id ? "Google" : "Email & Password"}
          </span>
        </div>
      </div>
    </div>
  );
}
