import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  meta?: Array<{
    property: string;
    content: string;
  }>;
  twitterCard?: string;
  twitterSite?: string;
  publishedTime?: string;
  author?: string;
}

export default function SEO({ 
  title = "Horrible Bitcoin Takes",
  description = "A curated collection of the most misguided predictions and commentary about Bitcoin from media outlets and financial experts.",
  image = `${window.location.origin}/images/social-graph.png`,
  type = "website",
  meta = [],
  twitterCard = "summary_large_image",
  twitterSite = "@bitcoinperception",
  publishedTime,
  author
}: SEOProps) {
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content="Bitcoin Perception" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional meta tags */}
      {meta.map(({ property, content }) => (
        <meta key={property} property={property} content={content} />
      ))}
    </Helmet>
  );
}