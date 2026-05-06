import ExpandableContent from "./ExpandableContent";

export default function BlogContent({ content }: { content: string }) {
    
  return (
    <div className="relative mb-5">
      {/* ✅ Nội dung được SSR đầy đủ */}
      <ExpandableContent content={content} />
    </div>
  );
}
