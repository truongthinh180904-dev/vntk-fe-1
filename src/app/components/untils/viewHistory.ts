export interface HistoryItem {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  time: number;
}

export function saveViewHistory(post: any) {
  if (typeof window === "undefined") return;

  const key = "view_history";
  const oldData: HistoryItem[] = JSON.parse(localStorage.getItem(key) || "[]");

  const filtered = oldData.filter((p) => p.id !== post.id);

  const newData: HistoryItem[] = [
    {
      id: post.id,
      title: post.title?.rendered,
      slug: post.slug,
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      time: Date.now(),
    },
    ...filtered,
  ].slice(0, 10);

  localStorage.setItem(key, JSON.stringify(newData));
}

export function getViewHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("view_history") || "[]");
}
