import React, { useEffect } from 'react';

interface SimpleMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string;
  ogType?: string;        
  twitterCard?: string;   
  canonical?: string;     
}

const SimpleMetaTags: React.FC<SimpleMetaTagsProps> = ({
  title,
  description,
  image,
  url,
  keywords
}) => {
  useEffect(() => {
    // Cleanup: Xóa các <style> trống trong <head>
    document.querySelectorAll("style").forEach(styleTag => {
      if (!styleTag.textContent?.trim()) {
        styleTag.remove();
      }
    });

    // Cập nhật title
    document.title = title;
    
    // Meta description
    updateMetaTag('name', 'description', description);
    
    // Keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }
    
    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image || '');
    updateMetaTag('property', 'og:url', url || '');
    updateMetaTag('property', 'og:type', 'article');
    
    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image || '');
    
    // Canonical
    if (url) {
      updateLinkTag('canonical', url);
    }

  }, [title, description, image, url, keywords]);

  // Cập nhật hoặc tạo meta tag
  const updateMetaTag = (attrName: string, attrValue: string, content: string) => {
    if (!content) return;
    const selector = `meta[${attrName}="${attrValue}"]`;
    let metaTag = document.querySelector(selector);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(attrName, attrValue);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };

  // Cập nhật hoặc tạo link (ví dụ canonical)
  const updateLinkTag = (relValue: string, href: string) => {
    let linkTag = document.querySelector(`link[rel="${relValue}"]`);
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.setAttribute('rel', relValue);
      document.head.appendChild(linkTag);
    }
    linkTag.setAttribute('href', href);
  };

  return null;
};

export default SimpleMetaTags;
