// utils/decodeEmoji.ts
import he from "he";

/**
 * Decode emoji / HTML entities trong text node, giữ nguyên HTML tags
 * @param html Chuỗi HTML input
 * @returns Chuỗi HTML đã decode emoji
 */
export function decodeEmojiInHTML(html: string): string {
  // Nếu server-side (Node), không có DOMParser → dùng regex đơn giản để decode text
  // Lưu ý: Cách này chỉ decode entities, giữ nguyên thẻ
  return html.replace(/>([^<]+)</g, (match, text) => {
    // text là nội dung giữa các thẻ
    const decoded = he.decode(text);
    return `>${decoded}<`;
  });
}
