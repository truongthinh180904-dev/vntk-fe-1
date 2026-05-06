import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, secret } = body;

  // 🔐 bảo mật
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  // 🔥 clear cache đúng bài
  revalidateTag(`post-${slug}`);

  return Response.json({
    revalidated: true,
    tag: `post-${slug}`,
    time: Date.now(),
  });
}
