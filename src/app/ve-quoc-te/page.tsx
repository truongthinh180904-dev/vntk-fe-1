// page.tsx
import { Metadata } from "next";
import International from "./International";
// ✅ Ảnh preview chính khi chia sẻ link (Zalo, Facebook, v.v.)
const previewImage =
  "https://cdn3657.cdn4s7.io.vn/media/kieu-trang/ve-may-bay-di-ubon-ratchathani/ve-may-bay-di-ubon-ratchathani.jpg";


export const metadata: Metadata = {
  title: "Vé máy bay quốc tế giá rẻ | Vietnam Tickets",

  description:
    "Đặt vé máy bay quốc tế giá tốt cùng Vietnam Tickets – đại lý uy tín các hãng Vietnam Airlines, Korean Air, Japan Airlines, EVA Air, Singapore Airlines. Vé đi Nhật Bản, Hàn Quốc, Mỹ, Singapore, Thái Lan, Trung Quốc. Hỗ trợ 24/7.",

  keywords:
    "vé máy bay quốc tế, vé máy bay giá rẻ, vé đi Nhật, vé đi Hàn, vé đi Mỹ, Vietnam Tickets",

  metadataBase: new URL("https://vietnam-tickets.com"),

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "Vé máy bay quốc tế giá rẻ | Vietnam Tickets",
    description:
      "Vietnam Tickets cung cấp vé máy bay quốc tế đi Nhật Bản, Hàn Quốc, Mỹ, Singapore, Trung Quốc... Đại lý uy tín – hỗ trợ 24/7.",
    url: "https://vietnam-tickets.com/ve-quoc-te",
    siteName: "Vietnam Tickets",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Vé máy bay quốc tế Vietnam Tickets",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vé máy bay quốc tế giá rẻ | Vietnam Tickets",
    description:
      "Đặt vé máy bay quốc tế đi Nhật, Hàn, Mỹ, Singapore, Trung Quốc cùng Vietnam Tickets. Đại lý uy tín – hỗ trợ 24/7.",
    images: [previewImage],
  },

  alternates: {
    canonical: "https://vietnam-tickets.com/ve-quoc-te",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://vietnam-tickets.com#organization",
      "name": "Vietnam Tickets",
      "url": "https://vietnam-tickets.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp"
      },
      "telephone": "+8419003173",
      "email": "vietnamtickets16@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "69 Võ Thị Sáu, P.6, Q.3",
        "addressLocality": "TP. Hồ Chí Minh",
        "addressCountry": "VN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5.0,
        "reviewCount": 198
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Thanh Huyền" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 5,
            "bestRating": 5
          },
          "reviewBody":
            "Tôi đặt vé đi Nhật Bản tại Vietnam Tickets, giá hợp lý và nhận vé điện tử rất nhanh."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Hoàng Nam" },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 5,
            "bestRating": 5
          },
          "reviewBody":
            "Dịch vụ đặt vé quốc tế chuyên nghiệp, tư vấn rõ ràng, hỗ trợ tận tình."
        }
      ]
    },

    {
      "@type": "Service",
      "@id": "https://vietnam-tickets.com/ve-quoc-te#service",
      "name": "Dịch vụ đặt vé máy bay quốc tế",
      "description":
        "Vietnam Tickets cung cấp dịch vụ đặt vé máy bay quốc tế giá tốt đi Nhật Bản, Hàn Quốc, Mỹ, Singapore, Trung Quốc, Thái Lan và nhiều quốc gia khác. Hỗ trợ tư vấn 24/7, vé điện tử nhanh chóng, thanh toán linh hoạt.",
      "url": "https://vietnam-tickets.com/ve-quoc-te",
      "image": "https://vietnam-tickets.com/images/ve-quoc-te.webp",
      "provider": {
        "@id": "https://vietnam-tickets.com#organization"
      },
      "areaServed": [
        { "@type": "Country", "name": "Nhật Bản" },
        { "@type": "Country", "name": "Hàn Quốc" },
        { "@type": "Country", "name": "Hoa Kỳ" },
        { "@type": "Country", "name": "Singapore" },
        { "@type": "Country", "name": "Trung Quốc" },
        { "@type": "Country", "name": "Thái Lan" },
        { "@type": "Country", "name": "Malaysia" }
      ],
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceLocation": {
          "@type": "Place",
          "name": "Online"
        }
      },
      "serviceType": "International Flight Booking",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://vietnam-tickets.com/ve-quoc-te"
      }
    }
  ]
};


export default function Page() {
  return (
    <>
      {/* ✅ Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <International />
    </>
  );
}
