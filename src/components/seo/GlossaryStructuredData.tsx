import { Helmet } from 'react-helmet-async';
import { GlossaryEntry } from '@/lib/payloadClient';

interface GlossaryStructuredDataProps {
  entries: GlossaryEntry[];
  baseUrl?: string;
}

export function GlossaryStructuredData({ entries, baseUrl = 'https://bitcoin-perception.com' }: GlossaryStructuredDataProps) {
  // Glossary structured data as a Glossary/DefinedTermSet
  const glossaryData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Strategic Intelligence Glossary",
    "description": "Comprehensive glossary of strategic intelligence, competitive analysis, and emerging finance terminology for leaders seeking competitive advantage",
    "url": `${baseUrl}/glossary`,
    "publisher": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl
    },
    "hasDefinedTerm": entries.slice(0, 20).map(entry => ({
      "@type": "DefinedTerm",
      "name": entry.title,
      "description": entry.description,
      "url": `${baseUrl}/glossary/${entry.slug}`,
      "inDefinedTermSet": `${baseUrl}/glossary`,
      "termCode": entry.slug,
      "category": entry.category
    })),
    "about": [
      {
        "@type": "Thing",
        "name": "Strategic Intelligence",
        "description": "Systematic collection and analysis of information for competitive advantage"
      },
      {
        "@type": "Thing", 
        "name": "Competitive Intelligence",
        "description": "Analysis of competitors and market conditions for strategic decision-making"
      },
      {
        "@type": "Thing",
        "name": "Emerging Finance",
        "description": "Innovation and evolution in financial services and markets"
      }
    ]
  };

  // Educational resource structured data
  const educationalData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Strategic Intelligence Glossary",
    "description": "Professional glossary covering strategic intelligence disciplines for emerging finance leaders",
    "url": `${baseUrl}/glossary`,
    "learningResourceType": "Glossary",
    "educationalLevel": "Professional",
    "audience": {
      "@type": "Audience",
      "audienceType": "Finance Professionals, Strategic Leaders, Business Executives"
    },
    "about": "Strategic Intelligence and Competitive Analysis",
    "provider": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl
    },
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  };

  // FAQ structured data for common intelligence questions
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is strategic intelligence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strategic intelligence is the systematic collection, analysis, and application of information to identify opportunities and competitive advantages 2-4 weeks before competitors. It encompasses eight core disciplines: opportunity intelligence, competitive intelligence, market timing, regulatory intelligence, partnership intelligence, geographic intelligence, sector intelligence, and strategic frameworks."
        }
      },
      {
        "@type": "Question",
        "name": "How is competitive intelligence different from market research?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Competitive intelligence goes beyond basic market research to include systematic competitor analysis, strategic move prediction, competitive positioning analysis, and early warning systems. It focuses on actionable insights for strategic decision-making rather than general market trends."
        }
      },
      {
        "@type": "Question", 
        "name": "What are the key intelligence disciplines for emerging finance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The eight key intelligence disciplines are: (1) Opportunity Intelligence - identifying market windows, (2) Competitive Intelligence - systematic competitor analysis, (3) Market Timing - perfect entry strategies, (4) Regulatory Intelligence - compliance advantages, (5) Partnership Intelligence - strategic alliances, (6) Geographic Intelligence - regional opportunities, (7) Sector Intelligence - vertical analysis, and (8) Strategic Frameworks - decision-making systems."
        }
      },
      {
        "@type": "Question",
        "name": "How can strategic intelligence provide competitive advantage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strategic intelligence provides competitive advantage by enabling organizations to identify opportunities and threats 2-4 weeks before competitors, make better-informed strategic decisions, optimize market timing, anticipate competitor moves, and position themselves advantageously in emerging markets."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Glossary structured data */}
      <script type="application/ld+json">
        {JSON.stringify(glossaryData, null, 2)}
      </script>
      
      {/* Educational resource structured data */}
      <script type="application/ld+json">
        {JSON.stringify(educationalData, null, 2)}
      </script>
      
      {/* FAQ structured data */}
      <script type="application/ld+json">
        {JSON.stringify(faqData, null, 2)}
      </script>

      {/* Glossary section meta tags */}
      <meta name="description" content="Master strategic intelligence terminology. Comprehensive glossary of competitive analysis, market intelligence, and emerging finance terms for leaders seeking competitive advantage." />
      <meta name="keywords" content="strategic intelligence glossary, competitive intelligence terms, market intelligence definitions, emerging finance terminology, strategic analysis dictionary" />
      
      {/* Open Graph meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Strategic Intelligence Glossary - Master the Language of Competitive Advantage" />
      <meta property="og:description" content="Comprehensive glossary for strategic intelligence, competitive analysis, and emerging finance terminology that gives leaders competitive advantage." />
      <meta property="og:url" content={`${baseUrl}/glossary`} />
      <meta property="og:site_name" content="Bitcoin Perception" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Strategic Intelligence Glossary - Master the Language of Competitive Advantage" />
      <meta name="twitter:description" content="Comprehensive glossary for strategic intelligence, competitive analysis, and emerging finance terminology that gives leaders competitive advantage." />
      <meta name="twitter:url" content={`${baseUrl}/glossary`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}/glossary`} />
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Helmet>
  );
}

export default GlossaryStructuredData;