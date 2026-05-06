import SearchBlog from "./SearchBlog";

export async function generateMetadata({ searchParams }: any) {
  const query = searchParams?.q || "";
  return {
    title: `Kết quả tìm kiếm: ${query}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page({ searchParams }: any) {
  return (
    <SearchBlog 
      query={searchParams?.q || ""} 
    />
  );
}