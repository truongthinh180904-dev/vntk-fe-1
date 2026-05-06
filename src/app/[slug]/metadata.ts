import type { Metadata } from "next";

async function getPost(slug: string) {
  const res = await fetch(
    `https://api.anninhanthienlong.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`
  );
  const posts = await res.json();
  return posts?.[0] || null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post)
    return {
      title: "Không tìm thấy bài viết",
      description: "Trang bạn tìm không tồn tại.",
    };

  const seo = post.yoast_head_json || {};
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-og.jpg";
  const title =
    seo.title || post.title.rendered.replace(/<\/?[^>]+(>|$)/g, "");
  const description =
    seo.description ||
    post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: featuredImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImage],
    },
  };
}
