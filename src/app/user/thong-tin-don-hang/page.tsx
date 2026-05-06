import type { Metadata } from "next";
import Information from "./infomation";

// 🧠 Cấu hình metadata cơ bản và tắt index
export const metadata: Metadata = {
  title: "Quản lý thông tin vé | Admin Panel",
  description: "Trang quản lý thông tin đặt vé nội bộ của admin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main style={{backgroundColor:"aliceblue", padding: "10px 0" }}>
      <Information />
    </main>
  );
}
