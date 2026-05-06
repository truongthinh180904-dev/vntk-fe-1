"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // icon loading
import "../../styles/login.css";
import { toast } from "react-toastify";
const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      if (cleanedValue.length <= 10) {
        setFormData({ ...formData, [name]: cleanedValue });
        if (cleanedValue.length === 10) {
          setPhoneError("");
        } else {
          setPhoneError("Số điện thoại phải có đúng 10 chữ số");
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Đăng nhập
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://media.vietnam-tickets.com/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user, bookings, bookingsDetail } = response.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("bookings", JSON.stringify(bookings));
        localStorage.setItem("bookingsDetail", JSON.stringify(bookingsDetail));
        localStorage.setItem("login_time", Date.now().toString());
      }

      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Đăng nhập thất bại. Vui lòng kiểm tra email nếu bạn chưa xác thực tài khoản."
      );  
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPhoneError("");
    setLoading(true);

    if (formData.phone.length !== 10) {
      setPhoneError("Số điện thoại phải có đúng 10 chữ số");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://media.vietnam-tickets.com/api/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

       toast.success("Vui lòng kiểm tra email để xác nhận tài khoản");
      router.push("/dang-nhap");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Đăng ký thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Đăng nhập Google
  const handleGoogleLogin = () => {
    window.location.href = "https://media.vietnam-tickets.com/api/auth/google/redirect";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card p-4 rounded shadow-lg">
        <div className="title-text d-flex justify-content-center">
          <div className="title fw-bold">
            {isLogin ? "Đăng nhập" : "Đăng kí"}
          </div>
        </div>

        <div className="slide-controls position-relative my-4">
          <input
            type="radio"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
            hidden
          />
          <input
            type="radio"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
            hidden
          />
          <label
            htmlFor="login"
            className={`slide login ${isLogin ? "active" : ""}`}
          >
            Đăng nhập
          </label>
          <label
            htmlFor="signup"
            className={`slide signup ${!isLogin ? "active" : ""}`}
          >
            Đăng kí
          </label>
          <div
            className="slider-tab"
            style={{ left: isLogin ? "0%" : "50%" }}
          ></div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {!isLogin && phoneError && (
          <div className="alert alert-danger">{phoneError}</div>
        )}

        <div className="form-container">
          <div
            className="form-inner"
            style={{
              transform: `translateX(${isLogin ? "0%" : "-50%"})`,
            }}
          >
            {/* Login Form */}
            <form className="login form_auth" onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder=" email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder=" mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      style={{ marginRight: 6 }}
                      className="spin"
                    />
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>

              {/* Divider */}
              <div
                style={{
                  textAlign: "center",
                  margin: "20px 0",
                  position: "relative",
                  color: "#888",
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    background: "#fff",
                    padding: "0 10px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  hoặc
                </span>
                <div
                  style={{
                    height: "1px",
                    background: "#ddd",
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    zIndex: 0,
                  }}
                ></div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "10px 16px",
                  border: "1px solid #dadce0",
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                  color: "#555",
                  fontWeight: 500,
                  fontSize: "15px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  style={{ width: "20px", height: "20px" }}
                />
                Đăng nhập bằng Google
              </button>

              <div className="text-center mt-3 signup-link">
                Bạn chưa có tài khoản?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}
                >
                  Đăng kí ngay
                </a>
              </div>
            </form>

            {/* Signup Form */}
            <form className="signup form_auth" onSubmit={handleSignup}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder=" họ và tên"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder=" email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder=" số điện thoại"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Số điện thoại phải có đúng 10 chữ số"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder=" mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng kí"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
