import type { Metadata } from "next";
import Information from "@/app/components/dashboard/ViewHistoryList";


// 🧠 Cấu hình metadata cơ bản và tắt index
export const metadata: Metadata = {
  title: "Trang sản phẩm vé máy bay | Viet Nam Tickets",
  description: "Vé máy bay đa dạng nhiều loại giá tốt từ các hãng hàng không hàng đầu.",
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
