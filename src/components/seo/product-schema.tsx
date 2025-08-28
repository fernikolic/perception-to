interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
    priceValidUntil?: string;
  }[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function ProductSchema({
  name,
  description,
  image = 'https://perception.to/logos/Perception-logo-social-og.png',
  brand = 'Perception',
  offers = [],
  aggregateRating
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    ...(offers.length > 0 && {
      "offers": offers.map(offer => ({
        "@type": "Offer",
        "price": offer.price,
        "priceCurrency": offer.priceCurrency,
        "availability": offer.availability || "https://schema.org/InStock",
        ...(offer.priceValidUntil && { "priceValidUntil": offer.priceValidUntil })
      }))
    }),
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}