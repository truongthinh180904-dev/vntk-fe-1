import BlogDetailClientSSR from "./BlogDetailClient";
export const dynamic = "force-static";
export const revalidate = 3600;

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

/* ------------------ FETCH DATA FUNCTIONS ------------------ */
// async function getPostBySlug(slug: string) {
//   const res = await fetch(
//     `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`,
//     { next: { revalidate: 300 } }
//   );
//   if (!res.ok) {
//   console.error("❌ Fetch lỗi:", res.status, res.statusText);
// }
//   const posts = await res.json();
//   // console.log("📄 Posts result:", posts);
//   return posts?.[0] || null;
// }


// fetch data use slug old version (chưa có cache tag)
// async function getPostBySlug(slug: string) {
//   const url = `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`;

//   try {
//     // 🔥 Fetch mới + TAG
//     const res = await fetch(url, {
//       next: {
//         revalidate: 31526000, //thời gian cache 1 tuần 604800
//         tags: [`post-${slug}`],
//       },
//       cache: "force-cache",
//     });

//     if (!res.ok) throw new Error("Fetch new failed");

//     const posts = await res.json();
//     return posts?.[0] || null;

//   } catch (err) {
//     console.warn("⚠️ Fetch TAG fail → fallback cache cũ");

//     // 🛟 fallback cache cũ
//     const resFallback = await fetch(url, {
//       next: { revalidate: 200 },
//       cache: "force-cache",
//     });

//     if (!resFallback.ok) return null;

//     const posts = await resFallback.json();
//     return posts?.[0] || null;
//   }
// }


export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?per_page=50&_fields=slug",
      {
        next: { revalidate: 3600 },
        cache: "force-cache",
      }
    );

    if (!res.ok) return []; // Trả về mảng rỗng nếu lỗi để build không bị sập

    const posts = await res.json();
    
    // Kiểm tra an toàn
    if (!Array.isArray(posts)) return [];

    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Lỗi build tĩnh:", error);
    return [];
  }
}
// export async function generateStaticParams() {
//   const res = await fetch(
//     "https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?per_page=90&_fields=slug",
//      {
//       next: { revalidate: 3600 },
//       cache: "force-cache",
//     }
//   );

//   const posts = await res.json();

//   return posts.map((post: any) => ({
//     slug: post.slug,
//   }));
// }


export async function getPostBySlug(slug: string) {
  const url = `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`;

  try {
    // 🔥 Fetch mới + TAG
    const res = await fetch(url, {
      next: {
        revalidate: 31536000,
        tags: [`post-${slug}`],
      },
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Fetch new failed");

    const posts = await res.json();
    return posts?.[0] || null;

  } catch (err) {
    console.warn("⚠️ Fetch TAG fail → fallback cache cũ");

    // 🛟 fallback cache cũ
    const resFallback = await fetch(url, {
      next: { revalidate: 200 },
      cache: "force-cache",
    });

    if (!resFallback.ok) return null;

    const posts = await resFallback.json();
    return posts?.[0] || null;
  }
}


// export async function getPostBySlug(slug: string) {
//   const url = `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`;

//   const fetchPost = async (revalidateTime: number) => {
//     const res = await fetch(url, {
//       next: {
//         revalidate: revalidateTime,
//         tags: [`post-${slug}`],  
//       },
//       cache: "force-cache",
//     });
//     if (!res.ok) return null;
//     const posts = await res.json();
//     return posts?.[0] || null;
//   };

//   try {
//     let post = await fetchPost(31536000); 
//     if (!post) throw new Error("Not found");

//     const rawContent = post.content?.rendered || "";
//     const decoded = decodeEmojiInHTML(rawContent);
    
//     post.processedContent = optimizeHtmlImages(decoded);

//     return post;
//   } catch (err) {
//     console.warn("⚠️ Fetch lỗi, đang dùng fallback");
//     return await fetchPost(200);
//   }
// }



async function getRelatedPosts(categoryId: number) {
  if (!categoryId) return [];

  const res = await fetch(
    `https://admin.vietnam-tickets.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=5&_embed=true`,
    {
      next: { revalidate: 2800 },
      cache: "force-cache",
    }
  );

  if (!res.ok) return [];
  return res.json();
}


const categoryCache = new Map<number, Category>();

async function getBreadcrumb(catId: number): Promise<Category[]> {
  const trail: Category[] = [];
  let currentId: number | null = catId;

  while (currentId) {
    let cat: Category;

    const cached = categoryCache.get(currentId);
    if (cached) {
      cat = cached;
    } else {
      const res: Response = await fetch(
        `https://admin.vietnam-tickets.com/wp-json/wp/v2/categories/${currentId}`,
        {
          next: { revalidate: 226000  },
          cache: "force-cache",
        }
      );

      if (!res.ok) throw new Error("Lỗi fetch category");

      cat = (await res.json()) as Category;
      categoryCache.set(currentId, cat);
    }

    trail.unshift(cat);
    currentId = cat.parent && cat.parent !== 0 ? cat.parent : null;
  }

  return trail;
}



/* ------------------ METADATA GENERATION ------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  // if (!post) {
  //   return {
  //     title: "Không tìm thấy bài viết | Vietnam Tickets",
  //     description: "Bài viết không tồn tại hoặc đã bị xóa.",
  //     robots: { index: false, follow: false },
  //   };
  // }
  //playload nếu không tìm thấy bài viết
//   if (!post) {
//   const slug = params.slug.replaceAll("-", " ");

//   return {
//     title: `${slug} - Đang cập nhật | Vietnam Tickets`,
//     description: `Nội dung về ${slug} hiện đang được cập nhật. Vui lòng quay lại sau.`,
//   };
// }
 if (!post) {
    const slugpost = slug.replaceAll("-", " ");
    
    return {
      title: `${slugpost} - Đang cập nhật | Vietnam Tickets`,
      description: `Nội dung về ${slugpost} hiện đang được cập nhật. Vui lòng quay lại sau.`,
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }
  


  
  const yoast = post.yoast_head_json || {};

  // 🧹 Làm sạch entity
  function decodeHtmlEntities(str: string) {
    return str
      ?.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
      ?.replace(/&quot;/g, '"')
      ?.replace(/&apos;/g, "'")
      ?.replace(/&amp;/g, "&")
      ?.replace(/&lt;/g, "<")
      ?.replace(/&gt;/g, ">")
      ?.replace(/&nbsp;/g, " ")
      ?.replace(/&#8211;/g, "–")
      ?.replace(/&#8221;|&#8220;/g, '"')
      ?.trim();
  }

  // 🏷 Title & Desc
  const cleanTitle = decodeHtmlEntities(
    yoast.title ||
      post.title?.rendered?.replace(/<[^>]+>/g, "")?.trim() ||
      "Bài viết từ vietnam-tickets.com"
  );

  // const cleanDesc = decodeHtmlEntities(
  //   yoast.description ||
  //     post.excerpt?.rendered?.replace(/<[^>]+>/g, "")?.replace(/\s+/g, " ")?.slice(0, 160) ||
  //     "Vé máy bay giá rẻ, khuyến mãi và hướng dẫn du lịch từ vietnam-tickets.com."
  // );

  const DescNotCode = post?.meta?.description;

  const cleanDesc = DescNotCode?.trim()
  ? DescNotCode.trim()
  : decodeHtmlEntities(
      (yoast.description ||
        post.excerpt?.rendered?.replace(/<[^>]+>/g, "")?.replace(/\s+/g, " ")?.slice(0, 160)
      )?.trim() || 
      "Vé máy bay giá rẻ, khuyến mãi và hướng dẫn du lịch từ vietnam-tickets.com."
    );


  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url ||
    "https://vietnam-tickets.com/static/imgad/2017/0322/logo_eva-620-square.png";

  

  const url = `https://vietnam-tickets.com/${slug}`;
  const authorNameOldBlog = post._meta?.author || "";
  const authorName = authorNameOldBlog 
    || post.author_name
    || yoast.author 
    || "Biên tập viên Vietnam Tickets";
  const publishedTime = post.date_gmt || post.date;
  const modifiedTime = post.modified_gmt || post.modified;
  const siteName = "Vietnam Tickets";
  const logo = "https://vietnam-tickets.com/static/imgad/2017/0322/logo_eva-620-square.png";
 

  const keywordnotcode = post?.meta?.keyword?.trim();

    const keywordscode = keywordnotcode
      ? keywordnotcode
      : post.tags?.map((t: any) => t.name).join(", ") || "vé máy bay giá rẻ, vietnam tickets, du lịch";
   

  const sameAs = [
    "https://www.facebook.com/vietnamtickets.com.vn",
    "https://www.tiktok.com/@vietnamtickets_official",
    "https://www.youtube.com/@VietnamTickets_Official",
    "https://www.behance.net/vietnamtickets",
    "https://www.instagram.com/vietnam.tickets.global",
    "https://x.com/Vietnamticket",
    "https://www.pinterest.com/VietnamTickets1",
  ];

   function getImageMimeType(url: string) {
  const ext = url.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    default:
      return 'image/jpeg'; // fallback
  }
}

  return {
    title: `${cleanTitle}`,
    description: cleanDesc,

    // 🔎 Robots tạm thời tắt index 
    robots: {
      index: false,
      follow: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },

    // 🧭 Canonical URL
    alternates: {
      canonical: url,
      languages: {
        "vi-VN": url,
        "x-default": url,
      },
    },

    // 🌐 Open Graph
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      url,
      siteName,
      locale: "vi_VN",
      type: "article",
      images: [
        {
          url: image,
          "type": getImageMimeType(image),
          width: 1200,
          height: 630,
          alt: cleanTitle,
          secure_url: image,
        },
      ],
      article: {
        publishedTime,
        modifiedTime,
        authors: [authorName],
        publisher: "https://vietnam-tickets.com",
        section: post.categories?.[0]?.name || "Tin tức",
        tags: post.tags?.map((t: any) => t.name) || ["Vé máy bay", "Vietnam Tickets"],
      },
    },

    // 🐦 Twitter
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDesc,
      site: "@Vietnamticket",
      creator: "@Vietnamticket",
      images: [image],
      alt: cleanTitle,         // ← THÊM DÒNG NÀY (hoặc "Sân bay Regina YQR")
    },

  
    // 🏷 Meta keywords (phụ trợ, đặc biệt hiệu quả với Google VN)
    keywords: keywordscode,

    // 🧱 Metadata cơ sở
    metadataBase: new URL("https://vietnam-tickets.com"),
    icons: {
      icon: "/favicon.ico",
    },

  other: {
  'preconnect': [
        'https://admin.vietnam-tickets.com',
        'https://media.vietnam-tickets.com',
        'https://cdn3657.cdn4s7.io.vn'
      ],
      'dns-prefetch': [
        'https://admin.vietnam-tickets.com',
        'https://media.vietnam-tickets.com',
        'https://cdn3657.cdn4s7.io.vn'
      ],
    
    'preload': image, 
},
    
  };
}


/* ------------------ MAIN SSR PAGE ------------------ */
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // if (!post) {
  //   return (
  //     <div className="container text-center py-20">
  //       <h1 className="text-2xl font-bold">Không tìm thấy bài viết</h1>
  //     </div>
  //   );
  // }
 if (!post) {
  const title = slug.replaceAll("-", " ");

  return (
    <article className="container py-5">
      <div
        className="mx-auto text-center shadow-sm"
        style={{
          maxWidth: "720px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "40px 32px",
        }}
      >
        {/* Badge */}
        <div
          className="d-inline-block mb-3"
          style={{
            background: "#f1f3f5",
            color: "#495057",
            fontSize: "14px",
            padding: "6px 14px",
            borderRadius: "999px",
          }}
        >
          Nội dung đang cập nhật
        </div>

        {/* Title */}
        <h1
          className="fw-bold text-capitalize"
          style={{
            fontSize: "28px",
            lineHeight: "1.3",
            marginBottom: "16px",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "16px",
            color: "#6c757d",
            marginBottom: "12px",
          }}
        >
          Nội dung chi tiết về <strong>{title}</strong> hiện đang được đội ngũ
          Vietnam Tickets cập nhật nhằm mang đến thông tin chính xác và hữu ích
          nhất cho bạn.
        </p>

        <p
          style={{
            fontSize: "15px",
            color: "#6c757d",
          }}
        >
          Trong thời gian này, bạn có thể tham khảo các bài viết liên quan hoặc
          quay lại sau để xem đầy đủ thông tin.
        </p>

        {/* CTA */}
        <div className="mt-4">
          <a
            href="/"
            className="btn btn-primary px-4"
            style={{
              borderRadius: "999px",
            }}
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </article>
  );
}


  const categoryId = post.categories?.[0];
  const relatedPosts = categoryId ? await getRelatedPosts(categoryId) : [];
  const breadcrumb = categoryId ? await getBreadcrumb(categoryId) : [];
  
  const image =
     post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url ||
    "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp";
  
    // Giá của bài viết
const price = post?.meta?.price.trim();


// 🔤 Tiêu đề sạch (loại bỏ thẻ HTML và entity)
function decodeHtmlEntities(str: string) {
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…");
}

const cleanTitle = decodeHtmlEntities(
  post.title?.rendered?.replace(/<[^>]+>/g, "")?.trim() || "Bài viết từ vietnam-tickets.com"
);


//   const DescNotCode = post?.meta?.description;



// // Mô tả và nội dung sạch
// const cleanDesc = (() => {
//   const rawText = (post.excerpt?.rendered || "")
//     .replace(/<[^>]+>/g, "")
//     .replace(/&hellip;/g, "…")
//     .replace(/\[\.\.\.\]|\[\]|\.{3}$/g, "")
//     .replace(/\s+/g, " ")
//     .trim();

//   return decodeHtmlEntities(rawText).slice(0, 160);
// })();


// 🔧 Hàm decode HTML entities (version 2, tránh trùng tên)
function decodeHtmlEntitiesV2(str:any) {
  if (!str) return "";
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&#(\d+);/g, (m:any, code:any) => String.fromCharCode(code));
}



// 🧹 Clean nội dung HTML → text sạch (Version 2 + giới hạn 2400 từ)
function cleanHtmlToTextV2(html: string = "", limitWords: number = 2400) {
  if (!html) return "";

  // Bước 1: Xóa tag + làm sạch text
  let text = html
    // Xóa script & style
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")

    // Xóa shortcode WP [example]
    .replace(/\[.*?\]/g, "")

    // Xuống dòng hợp lý
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/div>/gi, "\n")

    // Xóa toàn bộ HTML tag
    .replace(/<[^>]+>/g, "")

    // Xử lý khoảng trắng
    .replace(/\n\s+\n/g, "\n\n")
    .replace(/\s+/g, " ")

    // Xóa ký tự rác
    .replace(/(&nbsp;|﻿)/g, " ")

    .trim();

  // Decode HTML entity
  text = decodeHtmlEntitiesV2(text);

  // ⭐ Giới hạn tối đa 2400 từ
  const words = text.split(" ");
  if (words.length > limitWords) {
    text = words.slice(0, limitWords).join(" ");
  }

  return text;
}



const rawFullContent = post.content?.rendered || "";
const fullContentCleaned = cleanHtmlToTextV2(rawFullContent, 400).trimStart();

const DescNotCode = post?.meta?.description;

// Mô tả và nội dung sạch
// const cleanDesc = DescNotCode
//   ? DescNotCode
//   : (() => {
//       const rawText = (post.excerpt?.rendered || "")
//         .replace(/<[^>]+>/g, "")
//         .replace(/&hellip;/g, "…")
//         .replace(/\[\.\.\.\]|\[\]|\.{3}$/g, "")
//         .replace(/\s+/g, " ")
//         .trim();

//       return decodeHtmlEntities(rawText).slice(0, 160);
//     })();

const cleanDesc = (() => {
  const text = DescNotCode || post.excerpt?.rendered || "";
  const rawText = text
    .replace(/<[^>]+>/g, "")    // bỏ HTML tag
    .replace(/&hellip;/g, "…")  // đổi ký tự …
    .replace(/\[\.\.\.\]|\[\]|\.{3}$/g, "")
    .replace(/\u00A0+/g, "")    // bỏ &nbsp;
    .replace(/\s+/g, " ")       // gom nhiều space thành 1
    .trim();                     // bỏ space dư đầu/cuối

  return decodeHtmlEntities(rawText).trimStart().slice(0, 160);
})();




const cleanContent = (post.content?.rendered || "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const wordCount = cleanContent ? cleanContent.split(" ").length : 0;


function convertOldDateToISO(oldDateString:any) {
  // Ví dụ đầu vào: "10:49 - 26/11/2026"
  if (!oldDateString) return "";

  const [timePart, datePart] = oldDateString.split(" - ");
  if (!timePart || !datePart) return "";

  const [hour, minute] = timePart.split(":");
  const [day, month, year] = datePart.split("/");

  // Format thành ISO
  return `${year}-${month}-${day}T${hour}:${minute}:00+07:00`;
}


const publishedblogold = post?.meta?.datePublished.trim();

let published; 

if (publishedblogold) {
  // Nếu có ngày cũ → convert sang ISO
  published = convertOldDateToISO(publishedblogold);
} else {
  // Không có → dùng ngày WP như cũ
  published = post.date_gmt
    ? new Date(post.date_gmt).toISOString().replace("Z", "+07:00")
    : new Date(post.date).toISOString().replace("Z", "+07:00");
}

// Ngày
// const publishedblogold = post?.meta?.datePublished;
// const published = post.date_gmt
//   ? new Date(post.date_gmt).toISOString().replace("Z", "+07:00")
//   : new Date(post.date).toISOString().replace("Z", "+07:00");

const modified = post.modified_gmt
  ? new Date(post.modified_gmt).toISOString().replace("Z", "+07:00")
  : new Date(post.modified).toISOString().replace("Z", "+07:00");

  // console.log("Published:", post.date_gmt);
  // const authorName =
  //   post._embedded?.author?.[0]?.name ||
  //   post.yoast_head_json?.author ||
  //   "Vaness Booking";

  //products id npm , sku 
  const productIdold = post.meta?.productID;

  // const authorNameOldBlog = post.meta?.author || "";

  // const authorName = authorNameOldBlog 
  //   || post._embedded?.author?.[0]?.name 
  //   || post.yoast_head_json?.author
  //   || "Vaness Booking";
  const authorNameOldBlog = post.meta?.author?.trim() || "";

  const authorName = (
    authorNameOldBlog 
    || post.author_name
    || post.yoast_head_json?.author
    || "Vaness Booking"
  ).trim();  // loại bỏ khoảng trắng đầu/cuối


const logoUrl =
  "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.webp";

const articleUrl = `https://vietnam-tickets.com/${slug}`;


const keywordnotcode = post?.meta?.keyword.trim();
const keywordsArticle = keywordnotcode
      ? keywordnotcode
      : breadcrumb?.map((b:any) => b.name).join(", ") || "Vé máy bay giá rẻ, vietnam-tickets.com";

let mainSchema = {};

if (price) {
  const titleLower = (cleanTitle || "").toLowerCase();

  const sanitizeId = (s: any) =>
    s
      ? "VMB-" +
        s
          .normalize("NFKD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase()
      : "vmb-default";

  const priceValidDate = new Date();
  priceValidDate.setDate(priceValidDate.getDate() + 90);
  const priceValidUntil = priceValidDate.toISOString().split("T")[0];

  const today = new Date().toISOString().split("T")[0];

  const baseId = productIdold ?? sanitizeId(cleanTitle);

  //schema old products 
  mainSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${articleUrl}#product`,

    "name": cleanTitle || "Vé máy bay từ Vietnam Tickets",
    "description": cleanDesc || "Vé máy bay giá rẻ, khuyến mãi và hướng dẫn đặt vé từ Vietnam Tickets.",
    "image": image ? [image] : [logoUrl],

    "sku": sanitizeId(cleanTitle)?.slice(0, 50) || "VMB-default",
    "productID": baseId,
    "mpn": baseId,

    "category": titleLower.includes("nội địa") || titleLower.includes("trong nước")
      ? "Vé máy bay nội địa"
      : "Vé máy bay quốc tế",

    "brand": {
      "@type": "Brand",
      "name": "Vietnam Tickets",
      "logo": "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.png",
      "url": "https://vietnam-tickets.com"
    },

    // "offers": {
    //   "@type": "Offer",
    //   "@id": `${articleUrl}#offer`,
    //   "url": articleUrl,
    //   "priceCurrency": "VND",
    //   "price": Number(price),
    //   "priceValidUntil": priceValidUntil,
    //   "availability": "https://schema.org/InStock",
    //   "itemCondition": "https://schema.org/NewCondition",
    //   "inventoryLevel": {
    //     "@type": "QuantitativeValue",
    //     "value": 50,          // số vé còn
    //     "unitCode": "C62"     // C62 = seat
    //   },
    //   "seller": {
    //     "@type": "Organization",
    //     "name": "Vietnam Tickets",
    //     "url": "https://vietnam-tickets.com"
    //   },
      
    // "hasMerchantReturnPolicy": {
    //     "@type": "MerchantReturnPolicy",
    //     "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted", 
    //     "applicableCountry": { "@type": "Country", "name": "VN" },
    //     "url": "https://vietnam-tickets.com/dieu-khoan-su-dung"
    //   },
    //   "additionalProperty": [
    //     { "@type": "PropertyValue", "name": "Giá USD tham khảo", "value": `~${Math.round(Number(price)/25400)} USD` },
    //     { "@type": "PropertyValue", "name": "Loại vé", "value": "Vé máy bay khứ hồi" }
    //   ]
    // },

    "offers": {
        "@type": "AggregateOffer",
        "@id": `${articleUrl}#offer`,
        "url": articleUrl,

        "priceCurrency": "VND",
        "lowPrice": 500000,
        "highPrice": Number(price),
        "offerCount": 50,

        "priceValidUntil": priceValidUntil,
        "availability": "https://schema.org/InStock",

        "seller": {
          "@type": "Organization",
          "name": "Vietnam Tickets",
          "url": "https://vietnam-tickets.com"
        }
      },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 5.0,
      "reviewCount": 2750,
      "bestRating": 5,
      "worstRating": 1
    },

    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": authorName || "Khách hàng Vietnam Tickets" },
        "datePublished": today,
        "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 },
        "reviewBody": "Dịch vụ đặt vé nhanh chóng, giá tốt nhất thị trường, hỗ trợ nhiệt tình 24/7.",
        "publisher": { "@type": "Organization", "name": "Vietnam Tickets" }
      }
    ],

    "isRelatedTo": relatedPosts?.length > 0
      ? relatedPosts.map((p: any) => ({
          "@type": "Product",
          "name": decodeHtmlEntities(p.title?.rendered?.replace(/<[^>]+>/g, "")?.trim() || ""),
          "url": p.link
        }))
      : [],

    "url": articleUrl,
    "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },

    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": articleUrl,
        "actionPlatform": ["https://schema.org/DesktopWebPlatform","https://schema.org/MobileWebPlatform"]
      }
    },

    "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".entry-title", ".price-box"] }
  };

  // --- Thêm sameAs / previousVersion nếu có biến truyền vào ---
  // if (sameAsUrl) mainSchema.sameAs = sameAsUrl;
  // if (previousVersion) mainSchema.previousVersion = previousVersion;

//   mainSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": `${articleUrl}#service`,

//   "name": cleanTitle || "Dịch vụ đặt vé máy bay Vietnam Tickets",
//   "description":
//     cleanDesc ||
//     "Dịch vụ đặt vé máy bay nội địa và quốc tế, vé điện tử, giá tốt, hỗ trợ 24/7 từ Vietnam Tickets.",

//   "image": image ? [image] : [logoUrl],

//   "provider": {
//     "@id": "https://vietnam-tickets.com#business",
//     "@type": "TravelAgency",
//     "name": "Vietnam Tickets",
//     "url": "https://vietnam-tickets.com",
//     "logo": "https://cdn3657.cdn4s7.io.vn/media/logo/logo-vietnam-tickets.png"
//   },

//   "areaServed": {
//     "@type": "Country",
//     "name": "VN"
//   },

//   "serviceType": titleLower.includes("nội địa") || titleLower.includes("trong nước")
//     ? "Dịch vụ đặt vé máy bay nội địa"
//     : "Dịch vụ đặt vé máy bay quốc tế",

//   "offers": {
//     "@type": "Offer",
//     "@id": `${articleUrl}#offer`,
//     "url": articleUrl,

//     "priceCurrency": "VND",
//     "price": Number(price),
//     "priceValidUntil": priceValidUntil,

//     "availability": "https://schema.org/InStock",

//     // 🔑 Vé điện tử – không vận chuyển
//     "deliveryMethod": "https://schema.org/OnlineDelivery",

//     "seller": {
//       "@type": "Organization",
//       "name": "Vietnam Tickets",
//       "url": "https://vietnam-tickets.com"
//     },

//     "hasMerchantReturnPolicy": {
//       "@type": "MerchantReturnPolicy",
//       "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
//       "applicableCountry": { "@type": "Country", "name": "VN" },
//       "url": "https://vietnam-tickets.com/dieu-khoan-su-dung"
//     },

//     "additionalProperty": [
//       {
//         "@type": "PropertyValue",
//         "name": "Hình thức nhận vé",
//         "value": "Vé điện tử (Email / Zalo / SMS)"
//       },
//       {
//         "@type": "PropertyValue",
//         "name": "Loại dịch vụ",
//         "value": "Đặt vé máy bay"
//       }
//     ]
//   },

//   "potentialAction": {
//     "@type": "ReserveAction",
//     "target": {
//       "@type": "EntryPoint",
//       "urlTemplate": articleUrl,
//       "actionPlatform": [
//         "https://schema.org/DesktopWebPlatform",
//         "https://schema.org/MobileWebPlatform"
//       ]
//     }
//   },

//   "url": articleUrl,

//   "mainEntityOfPage": {
//     "@type": "WebPage",
//     "@id": articleUrl
//   }
// };

}

else {
  // ✅ BLOGPOSTING SCHEMA TỐI ƯU SEO
  mainSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,

    // 🧱 Cấu trúc cơ bản
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,

     // ⭐ 1) Speakable thêm ngay sau URL
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": [
        "/html/head/title",
        "/html/body//h1"
      ]
    },
    
    // 📰 Nội dung
    "headline": cleanTitle || "Bài viết từ Vietnam Tickets",
    "description": cleanDesc || "Vé máy bay giá rẻ, chia sẻ kinh nghiệm và hướng dẫn đặt vé từ Vietnam Tickets.",

     // ⭐ 3) thumbnailUrl để ngay cạnh image (vị trí chuẩn Google)
   "thumbnailUrl": image || logoUrl,
    "image": {
      "@type": "ImageObject",
      "url": image || logoUrl,
      "width": 1200,
      "height": 630
    },

    // ⚡ Quan trọng nhất – dùng FULL nội dung bài viết
    "articleBody": fullContentCleaned || cleanDesc || "",

    "genre": "Hướng dẫn du lịch, vé máy bay quốc tế",

    // 📅 Ngày tháng & tác giả
    "datePublished": published,
    "dateModified": modified,

    "author": {
      "@type": "Person",
      "name": authorName || "Biên tập viên Vietnam Tickets",
      "url": "https://vietnam-tickets.com"
    },

    // 🏢 Publisher tối giản – không spam
    "publisher": {
      "@type": "Organization",
      "name": "Vietnam Tickets",
      "logo": {
        "@type": "ImageObject",
        "url": logoUrl,
        "width": 250,
        "height": 250
      }
    },

    // 🔎 Thông tin SEO
    "inLanguage": "vi",
    "articleSection": breadcrumb?.[breadcrumb.length - 1]?.name || "Tin tức",
    "keywords": keywordsArticle,
    "wordCount": wordCount || undefined,
    "isAccessibleForFree": true,

    "potentialAction": {
      "@type": "ReadAction",
      "target": [articleUrl]
    },

    // © Bản quyền
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Vietnam Tickets",
      "url": "https://vietnam-tickets.com"
    },
    "copyrightYear": new Date(published).getFullYear()
  };
}
// ✅ Breadcrumb Schema (dynamic)
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${articleUrl}#breadcrumb`,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://vietnam-tickets.com"
    },
    ...(breadcrumb || []).map((cat, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": cat.name,
      "item": `https://vietnam-tickets.com/${cat.slug.replace(/^\/+/, "")}`
    })),
    {
      "@type": "ListItem",
      "position": (breadcrumb?.length || 0) + 2,
      "name": cleanTitle || "Bài viết",
      "item": articleUrl
    }
  ]
};

// ✅ LocalBusiness Schema (địa chỉ + giấy phép + liên hệ)
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://vietnam-tickets.com#business",
  "name": "Vietnam Tickets",
  "legalName": "Công ty Vietnam Tickets",
  "foundingDate": "2017",
  "founder": {
    "@type": "Person",
    "name": "Vietnam Tickets Team"
  },
  "identifier": "0314558363",
  "url": "https://vietnam-tickets.com",
  "logo": logoUrl,
  "image": logoUrl,
  "description": "Đại lý vé máy bay uy tín tại Việt Nam - Giá rẻ nhất, hỗ trợ 24/7, hoàn đổi linh hoạt.",
  "telephone": "+8419003173",
  "email": "vietnamtickets16@gmail.com",
  "priceRange": `₫500.000 - ₫${Number(price).toLocaleString("vi-VN")}`,

   "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2750",
    "bestRating": "5",
    "worstRating": "1"
  },

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "69 Võ Thị Sáu, Phường 6, Quận 3",
    "addressLocality": "Thành phố Hồ Chí Minh",
    "addressRegion": "TP.HCM",
    "postalCode": "700000",
    "addressCountry": "VN"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.7845048,
    "longitude": 106.6937861
  },

  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:30",
      "closes": "12:30"
    }
  ],

 "department": [
  {
    "@type": "TravelAgency",
    "name": "Trụ sở chính",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "69 Võ Thị Sáu, P.6, Q.3",
      "addressLocality": "Thành phố Hồ Chí Minh",
      "addressRegion": "TP.HCM",
      "postalCode": "700000",
      "addressCountry": "VN"
    },
    "telephone": "+8419003173",
    "email": "vietnamtickets16@gmail.com"
  },
  {
    "@type": "TravelAgency",
    "name": "Chi nhánh Q1",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "173 Nguyễn Thị Minh Khai, P. Phạm Ngũ Lão, Q.1",
      "addressLocality": "Thành phố Hồ Chí Minh",
      "addressRegion": "TP.HCM",
      "postalCode": "700000",
      "addressCountry": "VN"
    },
    "telephone": "+842839362020",
    "email": "vietnamtickets16@gmail.com"
  }
]
,
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+8419003173",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese", "English"]
    }
  ],

  "sameAs": [
    "https://facebook.com/vietnamtickets.com.vn",
    "https://x.com/Vietnamticket",
    "https://instagram.com/vietnam.tickets.global",
    "https://www.youtube.com/@VietnamTickets_Official",
    "https://pinterest.com/VietnamTickets1",
    "https://www.tiktok.com/@vietnamtickets_official"
  ]
};

const WebSite={
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://vietnam-tickets.com/#website",
  "url": "https://vietnam-tickets.com/",
  "name": "Vietnam Tickets",
  "alternateName": "VietnamTickets",
  "inLanguage": "vi-VN",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vietnam-tickets.com/tim-kiem?keyword={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

// Nếu _faq_schema là string thì parse
let faqs = post.meta._faq_schema;

  if (typeof faqs === "string") {
    try {
      faqs = JSON.parse(faqs);
    } catch (e) {
      console.error("Không parse được _faq_schema:", e);
      faqs = null;
    }
  }



// Tạo schema FAQPage nếu có dữ liệu
let faqSchema = null;
if (faqs && faqs.mainEntity && faqs.mainEntity.length > 0) {
  faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.mainEntity.map((q: any) => ({
      "@type": "Question",
      "name": q.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.acceptedAnswer?.text || ""
      }
    }))
  };
}

// console.log("faqSchema:", faqSchema);

// ✅ Gộp tất cả schema
const jsonLd = [mainSchema,WebSite, breadcrumbSchema, businessSchema];

// Nếu có FAQ thì push vào mảng
if (faqSchema) {
  jsonLd.push(faqSchema);
}

//  console.log("client-2",post?.auth_name);

// console.log("json faqs",faqSchema)
// Debug: kiểm tra dữ liệu FAQ
// console.log("schema demo", faqSchema);

// console.log(JSON.stringify(jsonLd, null, 2));
const timeDate: [string, string] = [authorName, published];


interface JsonLdObject {
  [key: string]: any;
}

interface JsonLdGraph {
  "@context": string;
  "@graph": JsonLdObject[];
}


const cleanedJsonLd: JsonLdObject[] = jsonLd.map(obj => {
  const { "@context": _, ...rest } = obj as JsonLdObject;
  return rest;
});



const jsonLdGraph: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": cleanedJsonLd
};

 
  return (
    <>
      {/* ✅ Schema JSON-LD chuẩn */}
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />


      {/* ✅ Truyền SSR data sang client */}
      <BlogDetailClientSSR
        slug={slug}
        breadcrumb={breadcrumb}
        post={post}
        relatedPosts={relatedPosts}
        timeDate={timeDate}
        thumnail={image}
      />
    </>
  );
}
