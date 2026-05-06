import { NextResponse } from "next/server";

const API_URL =
  "https://admin.vietnam-tickets.com/wp-json/custom-sitemap/v1/category/239";

interface ArticleItem {
  id: number;
  url: string;
  lastmod: string;
  title: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ArticleItem[];
}

async function fetchAllItems(): Promise<ArticleItem[]> {
  let page = 1;
  let totalPages = 1;
  const allItems: ArticleItem[] = [];

  while (page <= totalPages) {
    const res = await fetch(`${API_URL}?page=${page}`, {
      next: { revalidate: 3600 }, // cache 1 giờ
    });

    if (!res.ok) {
      throw new Error(`Fetch failed at page ${page}`);
    }

    const json: ApiResponse = await res.json();

    totalPages = json.total_pages;
    allItems.push(...json.data);

    page++;
  }

  return allItems;
}

export async function GET() {
  try {
    const items = await fetchAllItems();

    const urlsXml = items
      .map(
        (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
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
    return new NextResponse("Sitemap error", { status: 500 });
  }
}
