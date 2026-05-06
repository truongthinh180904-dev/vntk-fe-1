// page.tsx
import { Metadata } from "next";
import Domestics from "./Domestics";

// ✅ Ảnh preview chính khi chia sẻ link (Zalo, Facebook, v.v.)
const previewImage =
  "https://cdn3657.cdn4s7.io.vn/media/ngan/ve-may-bay-bamboo-di-da-nang/ve-may-bay-bamboo-di-da-nang.jpg";


export const metadata: Metadata = {
  title: "Vé máy bay nội địa giá rẻ - Vietnam Airlines, VietJet, Bamboo | Vietnam Tickets",
  description:
    "Đặt vé máy bay nội địa giá rẻ tại Vietnam Tickets – Đại lý chính thức Vietnam Airlines, VietJet Air, Bamboo Airways. So sánh vé TP.HCM – Hà Nội, Đà Nẵng, Phú Quốc, Đà Lạt. Hỗ trợ 24/7.",

  keywords:
    "vé máy bay nội địa, vé máy bay giá rẻ, Vietnam Airlines, VietJet Air, Bamboo Airways, Vietnam Tickets",

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
    title: "Vé máy bay nội địa Vietnam Airlines, VietJet, Bamboo | Vietnam Tickets",
    description:
      "So sánh & đặt vé máy bay nội địa giá rẻ đi Hà Nội, Đà Nẵng, Phú Quốc, Đà Lạt… tại Vietnam Tickets. Đại lý uy tín – hỗ trợ 24/7.",
    url: "https://vietnam-tickets.com/ve-noi-dia",
    siteName: "Vietnam Tickets",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Vé máy bay nội địa Vietnam Tickets",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vé máy bay nội địa giá rẻ | Vietnam Tickets",
    description:
      "So sánh & đặt vé máy bay nội địa giá tốt từ TP.HCM, Hà Nội, Đà Nẵng, Phú Quốc tại Vietnam Tickets.",
    images: [previewImage],
  },

  alternates: {
    canonical: "https://vietnam-tickets.com/ve-noi-dia",
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
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "69 Võ Thị Sáu, P.6, Q.3",
        "addressLocality": "TP. Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 125
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Minh Anh"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 5,
            "bestRating": 5
          },
          "reviewBody":
            "Giá vé nội địa rất tốt, đặt vé TP.HCM - Hà Nội dễ dàng, nhận vé nhanh qua email."
        }
      ]
    },

    {
      "@type": "Service",
      "@id": "https://vietnam-tickets.com/ve-noi-dia#service",
      "name": "Dịch vụ đặt vé máy bay nội địa",
      "description":
        "Vietnam Tickets cung cấp dịch vụ đặt vé máy bay nội địa giá tốt từ các hãng Vietnam Airlines, VietJet Air, Bamboo Airways. So sánh chuyến bay TP.HCM, Hà Nội, Đà Nẵng, Phú Quốc, Huế, Đà Lạt nhanh chóng, hỗ trợ 24/7.",
      "url": "https://vietnam-tickets.com/ve-noi-dia",
      "image": previewImage,
      "provider": {
        "@id": "https://vietnam-tickets.com#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Việt Nam"
      },
      "serviceType": "Domestic Flight Booking",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tuyến bay nội địa phổ biến",
        "itemListElement": [
          { "@type": "Offer", "name": "TP. Hồ Chí Minh – Hà Nội" },
          { "@type": "Offer", "name": "TP. Hồ Chí Minh – Đà Nẵng" },
          { "@type": "Offer", "name": "TP. Hồ Chí Minh – Phú Quốc" },
          { "@type": "Offer", "name": "Hà Nội – TP. Hồ Chí Minh" }
        ]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://vietnam-tickets.com/ve-noi-dia"
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

      {/* ✅ Nội dung trang */}
      <Domestics />
    </>
  );
}
