// page.tsx
import { Metadata } from "next";
import Blogs from "./Blogs";

// ✅ Ảnh preview khi chia sẻ link (Facebook, Zalo, v.v.)
const previewImage =
  "https://cdn3657.cdn4s7.io.vn/media/kieu-trang/truoc-washington-thanh-pho-nao-la-thu-do-cua-my/truoc-washington-thanh-pho-nao-la-thu-do-cua-my.jpg";

// ✅ Metadata cho trang “Tin tức”
export const metadata: Metadata = {
  title: "Tin tức du lịch & vé máy bay mới nhất | Vietnam Tickets",
  description:
    "Cập nhật tin tức du lịch, kinh nghiệm bay, lịch bay quốc tế & nội địa, khuyến mãi vé máy bay và thông tin sân bay mới nhất từ Vietnam Tickets – đại lý vé máy bay uy tín tại Việt Nam.",
  keywords:
    "tin tức du lịch, tin tức vé máy bay, kinh nghiệm bay, lịch bay, khuyến mãi vé máy bay, Vietnam Tickets, vé máy bay quốc tế, vé máy bay nội địa",

  metadataBase: new URL("https://vietnam-tickets.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Tin tức du lịch & vé máy bay mới nhất | Vietnam Tickets",
    description:
      "Tổng hợp tin tức, blog du lịch, kinh nghiệm bay, lịch bay và khuyến mãi vé máy bay mới nhất từ Vietnam Tickets.",
    url: "https://vietnam-tickets.com/tin-tuc",
    siteName: "Vietnam Tickets",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Tin tức du lịch và vé máy bay Vietnam Tickets",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tin tức du lịch & vé máy bay mới nhất | Vietnam Tickets",
    description:
      "Theo dõi tin tức du lịch, kinh nghiệm bay, lịch bay và ưu đãi vé máy bay hấp dẫn từ Vietnam Tickets.",
    images: [previewImage],
  },

  alternates: {
    canonical: "https://vietnam-tickets.com/tin-tuc",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://vietnam-tickets.com/tin-tuc#blog",
  "url": "https://vietnam-tickets.com/tin-tuc",
  "name": "Tin tức Vietnam Tickets",
  "description":
    "Trang tin tức chính thức của Vietnam Tickets, cập nhật tin du lịch, lịch bay, khuyến mãi vé máy bay và kinh nghiệm bay hữu ích.",
  "publisher": {
    "@type": "Organization",
    "@id": "https://vietnam-tickets.com#organization",
    "name": "Vietnam Tickets",
    "url": "https://vietnam-tickets.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp"
    }
  },
  "image": previewImage,
  "inLanguage": "vi-VN",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://vietnam-tickets.com/tin-tuc"
  }
};

export default function Page() {
  return (
    <>
      {/* ✅ Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Nội dung trang Tin tức */}
      <Blogs />
    </>
  );
}
