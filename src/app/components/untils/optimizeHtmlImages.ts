// utils/optimizeHtmlImages.ts
// export function optimizeHtmlImages(html: string) {
//   let imgCount = 0; 

//   return html.replace(
//     /<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi,
//     (match, before, src, after) => {
//       if (!src.includes("ik.imagekit.io")) return match;
//       if (src.includes("tr=")) return match;

//       imgCount++;
      
    
//       const isFirstImage = imgCount === 1;
//       const loadingStrategy = isFirstImage ? 'fetchpriority="high"' : 'loading="lazy"';
//       const decodingStrategy = 'decoding="async"';

//       const optimizedSrc = `${src}?tr=w-800,f-auto,q-80`;

//       return `<img ${before} 
//         src="${optimizedSrc}" 
//         srcset="${src}?tr=w-480,f-auto,q-80 480w, ${src}?tr=w-768,f-auto,q-80 768w, ${optimizedSrc} 800w"
//         sizes="(max-width: 480px) 90vw, (max-width: 768px) 100vw, 800px"
//         ${loadingStrategy}
//         ${decodingStrategy}
//         ${after} />`;
//     }
//   );
// }


export function optimizeHtmlImages(
  html: string,
  options?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    quality?: number;
  }
) {
  const {
    mobile = 480,
    tablet = 768,
    desktop = 800,
    quality = 80,
  } = options || {};

  return html.replace(
    /<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi,
    (match, before, src, after) => {
      // Chỉ xử lý ImageKit
      if (!src.includes("ik.imagekit.io")) return match;

      // Nếu đã có tr= thì bỏ qua
      if (src.includes("tr=")) return match;

      const optimizedSrc = `${src}?tr=w-${desktop},f-auto,q-${quality}`;
      return `
      <img
        ${before}
        src="${optimizedSrc}"
        srcset="
          ${src}?tr=w-${mobile},f-auto,q-${quality} ${mobile}w,
          ${src}?tr=w-${tablet},f-auto,q-${quality} ${tablet}w,
          ${optimizedSrc} ${desktop}w
        "
        sizes="(max-width: 480px) 90vw, (max-width: 768px) 100vw, 1200px"
        loading="lazy"
        decoding="async"
        ${after}
      />`;
          }
        );
      }