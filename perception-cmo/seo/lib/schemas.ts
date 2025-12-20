// perception-cmo/seo/lib/schemas.ts
// Structured data schemas for Perception marketing site

// =============================================================================
// ORGANIZATION SCHEMA - Use on all pages
// =============================================================================
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Perception",
  "url": "https://perception.to",
  "logo": "https://perception.to/logos/Perception-logo-social-og.png",
  "description": "Crypto media intelligence platform for monitoring Bitcoin and cryptocurrency coverage across 250+ sources",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Fernando Nikolić",
    "jobTitle": "Founder",
    "description": "Former VP Marketing at Blockstream"
  },
  "sameAs": [
    "https://twitter.com/peraborat",
    "https://linkedin.com/company/perception-to"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@perception.to"
  }
};

// =============================================================================
// SOFTWARE APPLICATION SCHEMA - Use on homepage and features page
// =============================================================================
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Perception",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Crypto media intelligence platform that monitors Bitcoin and cryptocurrency coverage across 250+ sources. Track narratives, analyze sentiment, and generate intelligence reports.",
  "url": "https://perception.to",
  "screenshot": "https://perception.to/screenshots/perception-dashboard.png",
  "featureList": [
    "Monitor 250+ crypto media sources",
    "Real-time sentiment tracking",
    "Narrative analysis and trend detection",
    "AI-powered intelligence reports",
    "Full citation and source attribution",
    "Custom watchlists and alerts",
    "Spaces for organizing research",
    "Recipes for generating deliverables"
  ],
  "offers": {
    "@type": "Offer",
    "price": "99",
    "priceCurrency": "USD",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://perception.to/pricing"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Perception"
  }
};

// =============================================================================
// FAQ SCHEMA - Homepage FAQs
// =============================================================================
export const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Perception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perception is a crypto media intelligence platform that monitors Bitcoin and cryptocurrency coverage across 250+ sources. It helps PR teams, research analysts, and content creators track narratives, analyze sentiment, and generate intelligence reports with full citations."
      }
    },
    {
      "@type": "Question",
      "name": "How is Perception different from LunarCrush or Santiment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While LunarCrush and Santiment focus primarily on social media sentiment and on-chain data, Perception specializes in media intelligence across 250+ sources including legacy media (CNBC, Bloomberg, NYT), crypto-native outlets (CoinDesk, Cointelegraph, The Block), and social platforms. Perception is built for PR and communications workflows, not trading."
      }
    },
    {
      "@type": "Question",
      "name": "What sources does Perception monitor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perception monitors 250+ sources including traditional financial media (CNBC, Bloomberg, Reuters, Wall Street Journal), crypto-native publications (CoinDesk, Cointelegraph, The Block, Decrypt), social platforms (Twitter/X, Reddit), research reports, regulatory announcements, and industry newsletters."
      }
    },
    {
      "@type": "Question",
      "name": "Who is Perception built for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perception is built for crypto industry professionals including PR and communications teams, research analysts, business development teams, content creators, and anyone who needs to monitor crypto media coverage and narratives as part of their work."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Perception cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perception is currently in beta at $99/month with full access to all features. This includes monitoring of 250+ sources, sentiment tracking, narrative analysis, intelligence report generation, and unlimited usage of Spaces and Recipes."
      }
    },
    {
      "@type": "Question",
      "name": "Does Perception offer a free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Perception offers a free trial so you can experience the full platform before committing. Sign up at perception.to to get started."
      }
    },
    {
      "@type": "Question",
      "name": "What are Perception Recipes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recipes are AI-powered templates that generate specific deliverables like sector deep dives, executive briefings, PR pitch intelligence, and competitive analysis reports. Each Recipe pulls from your monitored sources and produces citation-backed intelligence."
      }
    },
    {
      "@type": "Question",
      "name": "What are Perception Spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spaces let you organize your research by saving articles, tracking specific entities (companies, people, topics), and building personalized intelligence feeds. Think of them as smart folders for your crypto media research."
      }
    }
  ]
};

// =============================================================================
// WEBSITE SCHEMA - Use on homepage
// =============================================================================
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Perception",
  "url": "https://perception.to",
  "description": "Crypto media intelligence platform",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://perception.to/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// =============================================================================
// BREADCRUMB SCHEMA GENERATOR
// =============================================================================
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// =============================================================================
// COMPARISON PAGE SCHEMA GENERATOR
// =============================================================================
export function generateComparisonSchema(
  product1: { name: string; description: string; url: string },
  product2: { name: string; description: string; url: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${product1.name} vs ${product2.name} Comparison`,
    "description": `Compare ${product1.name} and ${product2.name} for crypto intelligence and media monitoring.`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": product1.name,
            "description": product1.description,
            "url": product1.url
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "SoftwareApplication",
            "name": product2.name,
            "description": product2.description,
            "url": product2.url
          }
        }
      ]
    }
  };
}

// =============================================================================
// ARTICLE SCHEMA GENERATOR
// =============================================================================
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "image": article.imageUrl,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Perception",
      "logo": {
        "@type": "ImageObject",
        "url": "https://perception.to/logos/Perception-logo-social-og.png"
      }
    }
  };
}

// =============================================================================
// HELPER: Combine multiple schemas for a page
// =============================================================================
export function combineSchemas(...schemas: object[]) {
  return schemas;
}
