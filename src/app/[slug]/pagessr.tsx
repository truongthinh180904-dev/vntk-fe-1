import BlogDetailClient from "./BlogDetailClient";

export const revalidate = 0;

async function getPostBySlug(slug: string) {
  const res = await fetch(
    `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`,
    { next: { revalidate: 3500 } }
  );
  const posts = await res.json();
  return posts?.[0] || null;
}

async function getRelatedPosts(categoryId: number) {
  const res = await fetch(
    `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=5&_embed=true`,
    { next: { revalidate: 600 } }
  );
  return await res.json();
}

/* ✅ Generate Metadata */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post)
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết không tồn tại hoặc đã bị xóa.",
    };

  const yoast = post.yoast_head_json || {};
  const title = yoast.title || post.title?.rendered || "Bài viết";
  const description =
    yoast.description ||
    post.excerpt?.rendered?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    "Khám phá bài viết mới nhất từ vietnam-tickets.com";

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://vietnam-tickets/static/imgad/2017/0322/logo_eva-620.png";

  const url = `https://vietnam-tickets.com/blog/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "vietnam-tickets.com",
      images: [{ url: image }],
      type: "article",
      publishedTime: post.date_gmt || post.date,
      modifiedTime: post.modified_gmt || post.modified,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ✅ SSR Page */
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const post = await getPostBySlug(params.slug);
  if (!post)
    return (
      <div className="container text-center py-20">
        <h1 className="text-2xl font-bold">Không tìm thấy bài viết</h1>
      </div>
    );

  const categoryId = post.categories?.[0];
  const relatedPosts = categoryId ? await getRelatedPosts(categoryId) : [];

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://vietnam-tickets/static/imgad/2017/0322/logo_eva-620.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vietnam-tickets.com/blog/${params.slug}`,
    },
    url: `https://vietnam-tickets.com/blog/${params.slug}`,
    headline: post.title.rendered.replace(/<[^>]+>/g, ""),
    description:
      post.excerpt?.rendered?.replace(/<[^>]+>/g, "") ||
      "Bài viết từ vietnam-tickets.com",
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    datePublished: post.date_gmt || post.date,
    dateModified: post.modified_gmt || post.modified,
    author: {
      "@type": "Person",
      name: "Vaness Booking",
      url: "https://vietnam-tickets.com",
    },
    publisher: {
      "@type": "Organization",
      name: "vietnam-tickets.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vietnam-tickets/static/imgad/2017/0322/logo_eva-620.png",
        width: 250,
        height: 60,
      },
    },
  };

  return (
    <>
      {/* ✅ JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ✅ Truyền toàn bộ dữ liệu cho client */}
      {/* <BlogDetailClient  slug={slug}  post={post} relatedPosts={relatedPosts} image={image} /> */}
    </>

    
  );
}
