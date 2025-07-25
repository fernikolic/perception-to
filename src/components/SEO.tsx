import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  keywords?: string[];
  prevPage?: string;
  nextPage?: string;
  children?: React.ReactNode;
}

export default function SEO({
  title = 'Perception - Bitcoin Trend Analysis & Market Sentiment',
  description = 'Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.',
  image = '/logos/Perception Logo.svg',
  url = 'https://perception.to/learn',
  type = 'website',
  article,
  keywords = ['Bitcoin', 'market trends', 'sentiment analysis', 'market intelligence'],
  prevPage,
  nextPage,
  children,
}: SEOProps) {
  // Format title with site name if it doesn't already include it
  const formattedTitle = title.includes('Perception') 
    ? title 
    : `${title} | Perception`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Article Specific Meta (if type is article) */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={`tag-${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Pagination links for SEO */}
      {prevPage && <link rel="prev" href={prevPage} />}
      {nextPage && <link rel="next" href={nextPage} />}
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />
      
      {/* Allow additional elements to be injected */}
      {children}
    </Helmet>
  );
} 