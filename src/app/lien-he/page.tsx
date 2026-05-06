import type { Metadata } from "next";
import Information from "@/app/components/home/ContactSection";


// 🧠 Cấu hình metadata cơ bản và tắt index
export const metadata: Metadata = {
  title: "Thông tin liên hệ Việt Nam Tickets",
  description: "Liên hệ với Việt Nam Tickets để được hỗ trợ nhanh chóng và hiệu quả.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main>
      <Information />
    </main>
  );
}
