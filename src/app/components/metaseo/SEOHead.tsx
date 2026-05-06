import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

export default function SEOHead({ title, description, url, image }: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
