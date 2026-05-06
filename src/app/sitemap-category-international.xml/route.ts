import { NextResponse } from "next/server";

const CATEGORY_CHILDREN_API =
  "https://admin.vietnam-tickets.com/wp-json/custom-sitemap/v1/category-children/3";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  url: string;
  lastmod?: string;
}

export async function GET() {
  try {
    const res = await fetch(CATEGORY_CHILDREN_API, {
      next: { revalidate: 3600 }, // cache 1h
    });

    if (!res.ok) {
      throw new Error("Failed to fetch category sitemap");
    }

    const json = await res.json();
    const categories: CategoryItem[] = json.data || [];

    const urlsXml = categories
      .map(
        (cat) => `
  <url>
    <loc>${cat.url}</loc>
    <lastmod>${cat.lastmod ?? "2025-04-01T00:00:00+07:00"}</lastmod>
  </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-urlset.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    return new NextResponse("Sitemap category error", { status: 500 });
  }
}
