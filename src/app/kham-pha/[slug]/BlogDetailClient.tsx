"use client";

import { useEffect, useState } from "react";

interface BlogDetailClientProps {
  slug: string;
  post: any;
  relatedPosts: any[];
  image: string;
}

export default function BlogDetailClient({
  slug,
  post,
  relatedPosts,
  image,
}: BlogDetailClientProps) {
  const [content, setContent] = useState(post?.content?.rendered || "");
  const [loading, setLoading] = useState(false);

  // 🧠 Nếu bạn muốn refetch khi slug thay đổi
  useEffect(() => {
    if (!post && slug) {
      setLoading(true);
      fetch(`https://api.anninhanthienlong.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data?.[0]?.content?.rendered || "");
        })
        .finally(() => setLoading(false));
    }
  }, [slug, post]);

  return (
    <div className="container py-8">
      {/* 🔹 Tiêu đề bài viết */}
      <h1
        className="text-3xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: post?.title?.rendered || "Không có tiêu đề" }}
      />

      {/* 🔹 Ảnh đại diện */}
      {image && (
        <div className="mb-6">
          <img
            src={image}
            alt={post?.title?.rendered || ""}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      )}

      {/* 🔹 Nội dung bài viết */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: loading ? "<p>Đang tải...</p>" : content }}
      />

      {/* 🔹 Bài viết liên quan */}
      {relatedPosts?.length > 0 && (
        <section className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Bài viết liên quan</h2>
          <ul className="space-y-3">
            {relatedPosts.map((item) => (
              <li key={item.id} className="border-b pb-3">
                <a
                  href={`/blog/${item.slug}`}
                  className="text-blue-600 hover:underline"
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
