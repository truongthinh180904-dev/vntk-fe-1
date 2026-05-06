import { NextResponse } from "next/server";

export async function GET() {
  const urls = [
    {
      loc: "https://vietnam-tickets.com/",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/san-pham",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/tin-tuc",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/lien-he",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/yeu-thich",
      lastmod: "2024-10-16T10:47:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/ve-noi-dia",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/ve-quoc-te",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/khuyen-mai",
      lastmod: "2025-12-21T00:00:00+07:00",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-urlset.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
