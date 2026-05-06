import type { Metadata } from "next";
import Information from "@/app/components/dashboard/ViewHistoryList";


// 🧠 Cấu hình metadata cơ bản và tắt index
export const metadata: Metadata = {
  title: "Bài viết đã xem | Admin Panel",
  description: "Trang quản lý thông tin bài viết của người dùng vietnam tickets.",
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
