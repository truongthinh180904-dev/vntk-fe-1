import React from 'react';
import Link from "next/link";
import { ChevronRight, Home } from 'lucide-react';


// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }
interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}
interface Post {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
}

interface BreadcrumbProps {
  breadcrumb: Category[];
  post: Post | null;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb, post }) => {
  if (!breadcrumb || breadcrumb.length === 0 || !post) return null;

  return (
  <>
    <nav className="d-none d-md-block breadcrumb-nav">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link">
              <Home size={16} className="me-1" />
              Trang chủ
            </Link>
          </li>
          
          <li className="breadcrumb-separator">
            <ChevronRight size={14} />
          </li>
          
         {breadcrumb.map((cat: Category, i: number) => {
  // Danh sách các slug cần thêm tiền tố 'category/'
  const specialSlugs = ["blog", "cam-nang", "san-bay"];
  
  // Kiểm tra xem slug hiện tại có nằm trong danh sách đặc biệt không
  const isSpecial = specialSlugs.includes(cat.slug);
  
  // Tạo link: nếu đặc biệt thì thêm 'category/', nếu không thì để bình thường
  const finalHref = isSpecial ? `/category/${cat.slug}` : `/${cat.slug}`;

  return (
    <React.Fragment key={cat.id}>
      <li className="breadcrumb-item">
        <Link href={finalHref} className="breadcrumb-link">
          {cat.name}
        </Link>
      </li>
      
      {i < breadcrumb.length - 1 && (
        <li className="breadcrumb-separator">
          <ChevronRight size={14} />
        </li>
      )}
    </React.Fragment>
  );
})}
          
          <li className="breadcrumb-separator">
            <ChevronRight size={14} />
          </li>
          
          <li className="breadcrumb-item breadcrumb-current">
            <span 
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
              title={post.title.rendered.replace(/<[^>]*>/g, '')}
            />
          </li>
        </ol>
    </nav>
    <nav
      className="d-block d-md-none breadcrumb-nav"
      style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch", // ✅ Cuộn mượt trên iOS/Android
        whiteSpace: "nowrap",
        scrollbarWidth: "none", // ✅ Ẩn scrollbar trên Firefox
        msOverflowStyle: "none", // ✅ Ẩn scrollbar trên IE/Edge cũ
      }}
    >
      <ol
        className="breadcrumb-list d-flex align-items-center mb-0"
        style={{
          display: "inline-flex",      // ✅ Quan trọng để cuộn ngang hoạt động
          flexWrap: "nowrap",
          gap: "4px",
          listStyle: "none",
          padding: "12px 14px",
          margin: 0,
          minWidth: "max-content",     // ✅ Cho phép dài hơn container
        }}
      >
        <li className="breadcrumb-item">
          <Link href="/" className="breadcrumb-link d-flex align-items-center">
            <Home size={16} className="me-1" />
            Trang chủ
          </Link>
        </li>

        <li className="breadcrumb-separator">
          <ChevronRight size={14} />
        </li>

        {breadcrumb.map((cat: Category, i: number) => (
          <React.Fragment key={cat.id}>
            <li className="breadcrumb-item">
              <Link href={`${cat.slug}`} className="breadcrumb-link">
                {cat.name}
              </Link>
            </li>
            {i < breadcrumb.length - 1 && (
              <li className="breadcrumb-separator">
                <ChevronRight size={14} />
              </li>
            )}
          </React.Fragment>
        ))}

        <li className="breadcrumb-separator">
          <ChevronRight size={14} />
        </li>

        <li
          className="breadcrumb-item breadcrumb-current"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "650px",
          }}
        >
          <span
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            title={post.title.rendered.replace(/<[^>]*>/g, "")}
          />
        </li>
      </ol>

      {/* ✅ CSS nội tuyến để ẩn scrollbar hoàn toàn */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none; /* Ẩn scrollbar trên Chrome, Safari */
        }
      `}</style>
    </nav>


  </> 
  );
};

export default Breadcrumb;