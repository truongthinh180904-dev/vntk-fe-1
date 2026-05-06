"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const GoogleAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const errorParam = params.get("error");

    if (errorParam) {
      toast.error("Email đã được đăng ký");
      setTimeout(() => {
        router.push("/"); 
      }, 1500);
      setLoading(false);
      return;
    }

    if (token) {
      const loginWithGoogle = async () => {
        try {
          const response = await axios.post(
            "https://media.vietnam-tickets.com/api/auth/google/token",
            { token }
          );

          const { token: jwt, user, bookings, bookingsDetail } = response.data;

          console.log("✅ Google login data:", response.data);

          if (typeof window !== "undefined") {
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("bookings", JSON.stringify(bookings));
            localStorage.setItem(
              "bookingsDetail",
              JSON.stringify(bookingsDetail)
            );
          }

      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        router.push("/");
        setTimeout(() => window.location.reload(), 1500);
      }, 2000);
        } catch (err: any) { 
          console.error("❌ Lỗi xác thực Google:", err);
          // setError(
          //   err.response?.data?.message ||
          //     "Lỗi xác thực Google. Vui lòng thử lại."
          // );
          toast.error( 
              "Lỗi xác thực Google. Vui lòng thử lại.");

        } finally {
          setLoading(false);
        }
      };

      loginWithGoogle();
    } else {
      setError("Thiếu token, vui lòng thử lại.");
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>⏳ Đang xử lý đăng nhập Google...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return null;
};

export default GoogleAuth;
