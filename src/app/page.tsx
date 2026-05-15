// page.tsx
import { Metadata } from "next";
import HomeClient from "./Home";

// ✅ Ảnh preview chính khi chia sẻ link (Zalo, Facebook, v.v.)
//demo 
const previewImage =
  "https://cdn3657.cdn4s7.io.vn/media/gioi-thieu/banner-promotion/banner-promotion-2.webp";


export const metadata: Metadata = {
  title: "Vé máy bay giá rẻ - Vietnam Tickets | Đại lý vé máy bay uy tín tại TP.HCM",
  description:
    "Vietnam Tickets - Đại lý vé máy bay nội địa và quốc tế uy tín tại TP. Hồ Chí Minh, hơn 15 năm kinh nghiệm. Hotline 1900 3173.",

  keywords:
    "vé máy bay giá rẻ, đại lý vé máy bay uy tín, Vietnam Tickets, vé máy bay nội địa, vé máy bay quốc tế",

  metadataBase: new URL("https://vietnam-tickets.com"),

  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //   },
  // },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "Vé máy bay giá rẻ - Vietnam Tickets | Đại lý vé máy bay uy tín tại TP.HCM",
    description:
      "Đặt vé máy bay nội địa và quốc tế giá tốt cùng Vietnam Tickets. Hơn 15 năm kinh nghiệm. Hotline 1900 3173.",
    url: "https://vietnam-tickets.com",
    siteName: "Vietnam Tickets",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Vé máy bay giá rẻ Vietnam Tickets",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vé máy bay giá rẻ - Vietnam Tickets",
    description:
      "Vietnam Tickets - Đại lý vé máy bay nội địa & quốc tế uy tín tại TP.HCM. Hotline 1900 3173.",
    images: [previewImage],
  },

  alternates: {
    canonical: "https://vietnam-tickets.com",
  },
};



const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://vietnam-tickets.com/#organization",
  "name": "Vietnam Tickets",
  "legalName": "Công ty TNHH Vietnam Tickets",
  "description":
    "Vietnam Tickets là đại lý vé máy bay nội địa và quốc tế uy tín tại TP. Hồ Chí Minh, hơn 15 năm kinh nghiệm, hỗ trợ khách hàng 24/7.",
  "url": "https://vietnam-tickets.com",
  "logo": "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp",
  "image": "https://cdn3657.cdn4s7.io.vn/media/gioi-thieu/banner-promotion/banner-promotion-2.webp",
  "telephone": "+8419003173",
  "email": "vietnamtickets16@gmail.com",
  "priceRange": "₫₫₫",
  "foundingDate": "2010",

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "69 Võ Thị Sáu, P.6, Q.3",
    "addressLocality": "Thành phố Hồ Chí Minh",
    "postalCode": "700000",
    "addressCountry": "VN"
  },

  "sameAs": [
    "https://facebook.com/vietnamtickets.com.vn",
    "https://x.com/Vietnamticket",
    "https://instagram.com/vietnam.tickets.global",
    "https://pinterest.com/VietnamTickets1",
    "https://www.youtube.com/@VietnamTickets_Official"
  ],

  "department": [
    {
      "@type": "LocalBusiness",
      "@id": "https://vietnam-tickets.com/#branch-q1",
      "name": "Vietnam Tickets - Chi nhánh Quận 1",
      "image": "https://cdn3657.cdn4s7.io.vn/media/gioi-thieu/banner-promotion/banner-promotion-2.webp",
      "telephone": "+842839362020",
      "priceRange": "₫₫₫",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "173 Nguyễn Thị Minh Khai, P. Phạm Ngũ Lão, Q.1",
        "addressLocality": "Thành phố Hồ Chí Minh",
        "postalCode": "700000",
        "addressCountry": "VN"
      }
    }
  ],

  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "2"
  },

  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "An Nguyễn"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody":
        "Vietnam Tickets hỗ trợ đặt vé nhanh, giá tốt và dịch vụ rất chuyên nghiệp."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Xuân Trang"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody":
        "Tôi rất hài lòng với dịch vụ và đội ngũ tư vấn của Vietnam Tickets."
    }
  ],

  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://vietnam-tickets.com/"
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

      {/* ✅ Nội dung trang */}
      <HomeClient />
    </>
  );
}
