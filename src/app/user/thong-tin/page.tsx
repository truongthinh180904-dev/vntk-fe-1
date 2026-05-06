import type { Metadata } from "next";
import Information from "@/app/components/users/UserProfile";


// 🧠 Cấu hình metadata cơ bản và tắt index
export const metadata: Metadata = {
  title: "Thông tin người dùng | Admin Panel",
  description: "Trang quản lý thông tin người dùng tại vietnam tickets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main style={{backgroundColor:"aliceblue", padding: "20px 0" }}>
      <Information />
    </main>
  );
}
