import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';


interface Category {
  id: number;
  name: string;
  slug: string;
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
  <nav className="breadcrumb-nav">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
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
              {/* <Link to={`/${cat.slug}`} className="breadcrumb-link"> */}
               <Link to={`/detailcatecory`} className="breadcrumb-link">
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
        
        <li className="breadcrumb-item breadcrumb-current">
          <span 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
            title={post.title.rendered.replace(/<[^>]*>/g, '')}
          />
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;