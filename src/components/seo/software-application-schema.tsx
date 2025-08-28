export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Perception API",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free tier available with premium plans"
    },
    "description": "Real-time Bitcoin sentiment analysis API providing market intelligence and trend analysis",
    "url": "https://perception.to/api",
    "featureList": [
      "Real-time sentiment analysis",
      "Historical data access",
      "Multiple data sources",
      "RESTful API",
      "Webhook support",
      "Custom alerts",
      "Bulk data export"
    ],
    "screenshot": "https://perception.to/images/api-dashboard.png",
    "creator": {
      "@type": "Organization",
      "name": "Perception",
      "url": "https://perception.to"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    },
    "requirements": "API key required. Sign up at https://perception.to/pricing"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}