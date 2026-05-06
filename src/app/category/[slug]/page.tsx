import CategoryPosts from "../../components/posts/CategoryPosts";

export default function Page({ params }: any) {
  return (
    <CategoryPosts
      categorySlug={params.slug}
    />
  );
}