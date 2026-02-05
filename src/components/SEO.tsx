import { Helmet } from 'react-helmet-async';
import portfolioData from '@/data/portfolio.json';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

const baseUrl = 'https://kishorkumarmahato.com.np';

export function SEO({
  title,
  description,
  image = '/og-image.png',
  url = '',
  type = 'website',
  publishedTime,
  author = portfolioData.personal.name,
}: SEOProps) {
  const siteTitle = portfolioData.personal.name;
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | ${portfolioData.personal.title}`;
  const fullDescription = description || 'Senior Full-Stack Developer specializing in Shopify, SaaS, and custom web applications. Building products that solve real problems.';
  const fullUrl = `${baseUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
