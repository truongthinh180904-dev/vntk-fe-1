import { NextResponse } from "next/server";

export async function GET() {
  const urls = [
    {
      loc: "https://vietnam-tickets.com/blog",
      lastmod: "2025-04-10T08:19:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/cam-nang",
      lastmod: "2022-07-29T15:07:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/tin-tuc-khach-san",
      lastmod: "2025-03-13T15:45:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/ve-noi-bat",
      lastmod: "2025-03-27T16:30:00+07:00",
    },
    {
      loc: "https://vietnam-tickets.com/san-bay",
      lastmod: "2025-04-01T00:00:00+07:00",
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
