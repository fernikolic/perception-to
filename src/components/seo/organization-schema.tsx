export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Perception",
    "alternateName": "Bitcoin Perception",
    "url": "https://perception.to",
    "logo": "https://perception.to/logos/Perception-logo-social-og.png",
    "sameAs": [
      "https://twitter.com/perception",
      "https://linkedin.com/company/perception",
      "https://github.com/perception"
    ],
    "description": "Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@perception.to",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "offers": {
      "@type": "Offer",
      "name": "Bitcoin Sentiment Analysis",
      "description": "Real-time Bitcoin sentiment analysis and market intelligence platform",
      "category": "Financial Technology",
      "url": "https://perception.to/pricing"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}