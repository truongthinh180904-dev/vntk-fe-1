// page.tsx
import { Metadata } from "next";
import Promotion from "./Promotion";

// ✅ Ảnh preview khi chia sẻ link (Facebook, Zalo, v.v.)
const previewImage =
  "https://cdn3657.cdn4s7.io.vn/media/gioi-thieu/banner-promotion/banner-promotion-2.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://vietnam-tickets.com"),

  title: "Khuyến mãi vé máy bay nội địa & quốc tế | Vietnam Tickets",
  description:
    "Cập nhật khuyến mãi vé máy bay mới nhất tại Vietnam Tickets ✈️ Săn vé giá rẻ nội địa & quốc tế, mã giảm giá, flash sale mỗi ngày. Đặt vé nhanh – giá tốt!",
    robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
  keywords: [
    "khuyến mãi vé máy bay",
    "vé máy bay giá rẻ",
    "flash sale vé máy bay",
    "ưu đãi vé nội địa",
    "ưu đãi vé quốc tế",
    "Vietnam Tickets",
  ],

  alternates: {
    canonical: "/khuyen-mai",
  },

  openGraph: {
    title: "Khuyến mãi vé máy bay HOT hôm nay | Vietnam Tickets",
    description:
      "Săn vé máy bay giá rẻ với ưu đãi & flash sale mới nhất từ Vietnam Tickets – Đại lý chính thức của Vietnam Airlines, VietJet, Bamboo, EVA Air.",
    url: "/khuyen-mai",
    siteName: "Vietnam Tickets",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Khuyến mãi vé máy bay Vietnam Tickets",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Khuyến mãi vé máy bay | Flash Sale & Mã Giảm Giá",
    description:
      "Vietnam Tickets cập nhật ưu đãi vé máy bay nội địa & quốc tế mỗi ngày. Đặt vé ngay để có giá tốt nhất!",
    images: [previewImage],
  },

  other: {
    "geo.region": "VN-SG",
    "geo.placename": "Ho Chi Minh City",
    "geo.position": "10.7828;106.7004",
    ICBM: "10.7828,106.7004",

    "business:contact_data:website": "https://vietnam-tickets.com",
    "business:contact_data:phone_number": "+8419003173",
    "business:contact_data:email": "vietnamtickets16@gmail.com",
    "business:registration_number": "0314558363",
    "business:founding_date": "2010",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://vietnam-tickets.com/khuyen-mai#webpage",
      "url": "https://vietnam-tickets.com/khuyen-mai",
      "name": "Khuyến mãi vé máy bay nội địa & quốc tế | Vietnam Tickets",
      "description":
        "Cập nhật khuyến mãi vé máy bay mới nhất tại Vietnam Tickets: mã giảm giá, flash sale nội địa & quốc tế, ưu đãi khách sạn và du lịch.",
      "inLanguage": "vi-VN",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": previewImage,
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vietnam Tickets",
        "url": "https://vietnam-tickets.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp",
        },
      },
    },

    {
      "@type": "OfferCatalog",
      "@id": "https://vietnam-tickets.com/khuyen-mai#offers",
      "name": "Chương trình khuyến mãi Vietnam Tickets",
      "url": "https://vietnam-tickets.com/khuyen-mai",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Ưu đãi khách hàng mới Vietnam Tickets",
          "description": "Giảm 50.000đ cho lần đặt vé đầu tiên trên ứng dụng Vietnam Tickets.",
          "url": "https://vietnam-tickets.com/khuyen-mai",
          "price": "50000",
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock",
          "validFrom": "2025-01-01",
        },
        {
          "@type": "Offer",
          "name": "Giảm 8% đặt khách sạn",
          "description": "Ưu đãi giảm 8% khi đặt khách sạn lần đầu trên Vietnam Tickets.",
          "url": "https://vietnam-tickets.com/khuyen-mai",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": "Flash Sale vé máy bay nội địa",
          "description":
            "Ưu đãi flash sale vé máy bay nội địa từ các hãng hàng không Việt Nam.",
          "url": "https://vietnam-tickets.com/khuyen-mai",
          "availability": "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          "name": "Ưu đãi vé máy bay quốc tế",
          "description":
            "Khuyến mãi vé máy bay quốc tế đi Nhật Bản, Hàn Quốc, Singapore, Thái Lan, Mỹ.",
          "url": "https://vietnam-tickets.com/khuyen-mai",
          "availability": "https://schema.org/InStock",
        },
      ],
    },
  ],
};


export default function Page() {
  return (
    <>
      {/* ✅ Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Nội dung trang khuyến mãi */}
      <Promotion />
    </>
  );
}
