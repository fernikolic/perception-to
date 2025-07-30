import { Helmet } from 'react-helmet-async';
import { LearnArticle } from '@/lib/payloadClient';

interface LearnSectionStructuredDataProps {
  articles: LearnArticle[];
  baseUrl?: string;
}

export function LearnSectionStructuredData({ articles, baseUrl = 'https://bitcoin-perception.com' }: LearnSectionStructuredDataProps) {
  // Educational organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Bitcoin Perception Intelligence Academy",
    "description": "Strategic intelligence training for emerging finance leaders",
    "url": `${baseUrl}/learn`,
    "parentOrganization": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl
    },
    "educationalCredentialAwarded": "Strategic Intelligence Certification",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Intelligence Training Catalog",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Opportunity Intelligence Mastery",
          "description": "Learn to identify opportunities 2-4 weeks before competitors",
          "courseMode": "online",
          "educationalLevel": "Professional"
        },
        {
          "@type": "Course", 
          "name": "Competitive Intelligence Systems",
          "description": "Build systematic competitive analysis capabilities",
          "courseMode": "online",
          "educationalLevel": "Professional"
        },
        {
          "@type": "Course",
          "name": "Strategic Market Timing",
          "description": "Master perfect market entry timing strategies",
          "courseMode": "online", 
          "educationalLevel": "Advanced"
        }
      ]
    }
  };

  // Learning resource collection
  const collectionData = {
    "@context": "https://schema.org",
    "@type": "Collection",
    "name": "Strategic Intelligence Library",
    "description": "Comprehensive collection of strategic intelligence resources for emerging finance leaders",
    "url": `${baseUrl}/learn`,
    "mainEntity": articles.slice(0, 10).map(article => ({
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "url": `${baseUrl}/learn/${article.slug}`,
      "datePublished": article.publishedAt,
      "genre": "Strategic Intelligence",
      "educationalLevel": article.difficulty === 'beginner' ? 'Beginner' : 
                         article.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
      "timeRequired": article.readTime ? `PT${article.readTime}M` : undefined
    })),
    "numberOfItems": articles.length,
    "about": {
      "@type": "Thing",
      "name": "Emerging Finance Intelligence",
      "description": "Strategic intelligence disciplines for competitive advantage in emerging finance markets"
    }
  };

  // FAQ structured data for common intelligence questions
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is strategic intelligence in emerging finance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strategic intelligence in emerging finance involves systematic collection, analysis, and application of market information to identify opportunities and competitive advantages 2-4 weeks before competitors. It encompasses eight core disciplines: opportunity intelligence, competitive intelligence, market timing, regulatory intelligence, partnership intelligence, geographic intelligence, sector intelligence, and strategic frameworks."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to master strategic intelligence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our structured learning paths range from 2-4 hours for foundational concepts to advanced mastery over several weeks. Most professionals see immediate improvements in decision-making within the first learning path completion, with full strategic intelligence capabilities developing over 3-6 months of consistent application."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Bitcoin Perception's intelligence training unique?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Our training focuses specifically on emerging finance markets with proven frameworks that help leaders identify opportunities 2-4 weeks before competitors. We combine traditional intelligence methodologies with cutting-edge analysis techniques tailored for the fast-moving emerging finance sector."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Educational organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData, null, 2)}
      </script>
      
      {/* Collection structured data */}
      <script type="application/ld+json">
        {JSON.stringify(collectionData, null, 2)}
      </script>
      
      {/* FAQ structured data */}
      <script type="application/ld+json">
        {JSON.stringify(faqData, null, 2)}
      </script>

      {/* Learn section meta tags */}
      <meta name="description" content="Master strategic intelligence for emerging finance. Learn the eight intelligence disciplines that give leaders competitive advantage: opportunity intelligence, competitive intelligence, market timing, and more." />
      <meta name="keywords" content="strategic intelligence, emerging finance, competitive intelligence, opportunity intelligence, market timing, regulatory intelligence, partnership intelligence" />
      
      {/* Open Graph meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Strategic Intelligence Mastery for Emerging Finance Leaders" />
      <meta property="og:description" content="Master the intelligence disciplines that give emerging finance leaders competitive advantage. Turn market signals into strategic opportunities." />
      <meta property="og:url" content={`${baseUrl}/learn`} />
      <meta property="og:site_name" content="Bitcoin Perception" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Strategic Intelligence Mastery for Emerging Finance Leaders" />
      <meta name="twitter:description" content="Master the intelligence disciplines that give emerging finance leaders competitive advantage. Turn market signals into strategic opportunities." />
      <meta name="twitter:url" content={`${baseUrl}/learn`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}/learn`} />
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Helmet>
  );
}

export default LearnSectionStructuredData;