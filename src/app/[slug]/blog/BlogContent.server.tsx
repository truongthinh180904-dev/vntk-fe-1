import Image from "next/image";
import BlogContentClient from "./BlogContent.client";
import { Calendar, Clock, User } from "lucide-react";
import { cache } from "react";
import { optimizeHtmlImages } from "@/app/components/untils/optimizeHtmlImages";
import { decodeEmojiInHTML } from "@/app/components/untils/decodeEmoji";
interface BlogContentProps {
  content: string;
  faqs?: any;
  pFaqs?: string;
  timeDate?: [string, string];
  thumnailimg?: string | { src: string };
}

/* cache decode */
const decodeCached = cache((html: string) => decodeEmojiInHTML(html));

/* ===== helper cắt content KHÔNG VỠ HTML ===== */
// function splitHTML(html: string) {
//   // Danh sách các thẻ đóng an toàn để cắt
//   const safeTags = ["</p>","</table>", "</div>", "</ul>", " </ol>"];
  
//   // Tìm tất cả các điểm có thể cắt trong HTML
//   const positions: number[] = [];
  
//   safeTags.forEach(tag => {
//     let pos = html.indexOf(tag);
//     while (pos !== -1) {
//       positions.push(pos + tag.length);
//       pos = html.indexOf(tag, pos + 1);
//     }
//   });

//   // Sắp xếp các điểm cắt theo thứ tự xuất hiện trong văn bản
//   positions.sort((a, b) => a - b);

//   // Chọn điểm cắt ở "khối" thứ 4 hoặc thứ 5 để giữ độ dài vừa phải
//   // Nếu bài viết có ít hơn 4 khối nội dung, trả về toàn bộ
//   if (positions.length <= 4) {
//     return { intro: html, rest: "" };
//   }

//   // Lấy vị trí cắt tại thẻ đóng an toàn thứ 4
//   const cutPoint = positions[3]; 

//   const intro = html.substring(0, cutPoint);
//   const rest = html.substring(cutPoint);

//   return { intro, rest };
// }
function splitHTML(html: string) {
  // 1. Tìm tất cả các khoảng vị trí của các bảng (table) để né
  const tableRanges: { start: number; end: number }[] = [];
  const tableRegex = /<table[\s\S]*?<\/table>/gi;
  let match;
  while ((match = tableRegex.exec(html)) !== null) {
    tableRanges.push({ start: match.index, end: match.index + match[0].length });
  }

  // 2. Danh sách các thẻ đóng an toàn
  const safeTags = ["</p>", "</table>", "</div>", "</ul>", "</ol>"];
  const positions: number[] = [];

  safeTags.forEach((tag) => {
    let pos = html.indexOf(tag);
    while (pos !== -1) {
      const endPos = pos + tag.length;
      
      // KIỂM TRA: Vị trí này có nằm trong bất kỳ table nào không?
      const isInTable = tableRanges.some(
        (range) => endPos > range.start && endPos < range.end
      );

      if (!isInTable) {
        positions.push(endPos);
      }
      
      pos = html.indexOf(tag, pos + 1);
    }
  });

  // 3. Sắp xếp các điểm cắt theo thứ tự xuất hiện
  positions.sort((a, b) => a - b);

  // 4. Chọn điểm cắt (khối thứ 4)
  // Nếu bài viết ngắn quá, trả về toàn bộ
  if (positions.length <= 4) {
    return { intro: html, rest: "" };
  }

  const cutPoint = positions[3]; // Lấy sau khối an toàn thứ 4

  const intro = html.substring(0, cutPoint);
  const rest = html.substring(cutPoint);

  return { intro, rest };
}

export default function BlogContentServer({
  content,
  faqs,
  pFaqs,
  timeDate,
  thumnailimg,
}: BlogContentProps) {
  const decoded =
    content.length > 300 ? decodeCached(content) : content;

  // const optimizedHtml = optimizeHtmlImages(decoded);
  const { intro, rest } = splitHTML(decoded);

  //  const decoded =
  //   content.length > 300 ? content : content;

  // const optimizedHtml = optimizeHtmlImages(decoded);
  // const { intro, rest } = splitHTML(decoded);


  const author = timeDate?.[0] || "Admin";
  const dateStr = timeDate?.[1] || new Date().toISOString();
  // const formattedDate = Intl.DateTimeFormat("vi-VN").format(
  //   new Date(dateStr)
  // );

  const formattedDate = Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(new Date(dateStr));

  const thumb =
    typeof thumnailimg === "string"
      ? thumnailimg
      : thumnailimg?.src;

  return (
    <div className="position-relative mb-5">
      {/* ===== META ===== */}
      <div className="d-none d-md-flex mb-3 align-items-center flex-wrap gap-3 text-muted meta-bar">
        <span className="d-flex align-items-center">
          <User size={16} className="me-1" />
          Tác giả: {author}
        </span>
        <span className="d-flex align-items-center">
          <Calendar size={16} className="me-1" />
          Ngày đăng: {formattedDate}
        </span>
        <span className="d-flex align-items-center fst-italic">
          <Clock size={16} className="me-1" />
          Đọc ~5 phút
        </span>
      </div>

      {/* ===== THUMBNAIL (LCP) ===== */}
    {thumb && (
      <Image
        src={thumb}
        alt="Thumbnail"
        width={600} 
        height={375}
        priority={true}           // Bắt buộc để Next.js tạo preload tag
        fetchPriority="high"      // Ưu tiên tải cao nhất trong luồng mạng
        decoding="sync"           // Ép trình duyệt giải mã ảnh ngay lập tức (quan trọng!)
        quality={80}              // Tăng lên 80 để ảnh sắc nét, tránh việc nén quá mức gây chậm render
        loading="eager"           // Tải ngay lập tức, không chờ đợi
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 700px" 
        style={{
          width: "100%",
          height: "auto",
          contentVisibility: "auto", // Giúp trình duyệt quản lý render thông minh hơn
        }}
        className="mb-4"
      />
    )}


      {/* ===== INTRO (LCP HTML) ===== */}
      <div
        id="blog-intro"
        className="blog-detail"
        dangerouslySetInnerHTML={{ __html: intro }}
      />

      {/* ===== REST (SSR LUÔN – ẨN BẰNG CSS) ===== */}
      {rest && (
       <div
        id="blog-rest"
        className="blog-detail blog-rest wp-content collapsed"
        dangerouslySetInnerHTML={{ __html: rest || "" }}
      />

      )}

      {/* ===== CLIENT CONTROLLER ===== */}
      <BlogContentClient
        hasRest={!!rest}
        faqs={faqs}
        pFaqs={pFaqs}
      />
    </div>
  );
}
