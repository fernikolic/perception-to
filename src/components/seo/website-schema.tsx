export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Perception",
    "alternateName": "Bitcoin Perception",
    "url": "https://perception.to",
    "description": "Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.",
    "publisher": {
      "@type": "Organization",
      "name": "Perception",
      "logo": {
        "@type": "ImageObject",
        "url": "https://perception.to/logos/Perception-logo-social-og.png",
        "width": 1200,
        "height": 630
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://perception.to/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}