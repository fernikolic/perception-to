import { Helmet } from 'react-helmet-async';
import { LearnArticle } from '@/lib/payloadClient';

interface ArticleStructuredDataProps {
  article: LearnArticle;
  baseUrl?: string;
}

export function ArticleStructuredData({ article, baseUrl = 'https://bitcoin-perception.com' }: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.metaDescription,
    "articleSection": article.category,
    "wordCount": article.content ? Math.round(article.content.length / 5) : undefined,
    "timeRequired": article.readTime ? `PT${article.readTime}M` : undefined,
    "audience": {
      "@type": "Audience",
      "audienceType": "Emerging Finance Leaders"
    },
    "about": {
      "@type": "Thing",
      "name": "Emerging Finance Intelligence",
      "description": "Strategic intelligence and competitive advantage for emerging finance markets"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/learn/${article.slug}`
    },
    "author": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 512,
        "height": 512
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "keywords": [
      article.keywordFocus,
      ...(Array.isArray(article.tags) ? article.tags : [])
    ].filter(Boolean).join(', '),
    "genre": "Strategic Intelligence",
    "educationalLevel": article.difficulty === 'beginner' ? 'Beginner' : 
                      article.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    "learningResourceType": "Article"
  };

  // Add course/learning path data if available
  const learningPathData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${article.category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Intelligence Mastery`,
    "description": `Comprehensive learning path for ${article.category} in emerging finance`,
    "provider": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl
    },
    "courseMode": "online",
    "educationalLevel": article.difficulty === 'beginner' ? 'Beginner' : 
                       article.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    "teaches": article.keywordFocus,
    "audience": {
      "@type": "Audience",
      "audienceType": "Finance Professionals, Executives, Strategic Leaders"
    }
  };

  return (
    <Helmet>
      {/* Article structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
      
      {/* Learning path structured data */}
      <script type="application/ld+json">
        {JSON.stringify(learningPathData, null, 2)}
      </script>

      {/* Open Graph meta tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.excerpt || article.metaDescription} />
      <meta property="og:url" content={`${baseUrl}/learn/${article.slug}`} />
      <meta property="og:site_name" content="Bitcoin Perception" />
      <meta property="article:section" content={article.category} />
      <meta property="article:published_time" content={article.publishedAt} />
      <meta property="article:modified_time" content={article.updatedAt || article.publishedAt} />
      {Array.isArray(article.tags) && article.tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.excerpt || article.metaDescription} />
      <meta name="twitter:url" content={`${baseUrl}/learn/${article.slug}`} />

      {/* Additional SEO meta tags */}
      <meta name="description" content={article.metaDescription || article.excerpt} />
      <meta name="keywords" content={[article.keywordFocus, ...(Array.isArray(article.tags) ? article.tags : [])].filter(Boolean).join(', ')} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}/learn/${article.slug}`} />
      
      {/* Reading time estimation */}
      {article.readTime && (
        <meta name="twitter:label1" content="Reading time" />
      )}
      {article.readTime && (
        <meta name="twitter:data1" content={`${article.readTime} minutes`} />
      )}
      
      {/* Difficulty level */}
      {article.difficulty && (
        <meta name="twitter:label2" content="Level" />
      )}
      {article.difficulty && (
        <meta name="twitter:data2" content={article.difficulty.charAt(0).toUpperCase() + article.difficulty.slice(1)} />
      )}
    </Helmet>
  );
}

export default ArticleStructuredData;