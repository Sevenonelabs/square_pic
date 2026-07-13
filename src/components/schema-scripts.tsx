export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function WebAppSchema({
  name,
  url,
  description,
  aggregateRating,
}: {
  name: string;
  url: string;
  description: string;
  aggregateRating?: { ratingValue: string; ratingCount: string; bestRating: string };
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        url,
        description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-07-13",
        ...(aggregateRating ? { aggregateRating: { "@type": "AggregateRating", ...aggregateRating } } : {}),
      }}
    />
  );
}

export function HowToSchema({ steps }: { steps: { name: string; text: string; url?: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to ${steps[0]?.name?.toLowerCase() || "use SquarePic"}`,
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          ...(s.url ? { url: s.url } : {}),
        })),
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        ...(imageUrl ? { image: imageUrl } : {}),
        datePublished,
        ...(dateModified ? { dateModified } : { dateModified: datePublished }),
        author: {
          "@type": "Person",
          name: authorName,
        },
      }}
    />
  );
}

export function PersonSchema({
  name,
  jobTitle,
  url,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  url: string;
  sameAs?: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        jobTitle,
        url,
        ...(sameAs?.length ? { sameAs } : {}),
      }}
    />
  );
}

export function OrgSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SquarePic",
        alternateName: "Square Pic Square Image tool",
        url: "https://www.squarepic.io",
        description: "Free online square image maker and social media photo resizer.",
        logo: "https://www.squarepic.io/images/logo.png",
        sameAs: ["https://github.com/Sevenonelabs/square_pic"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "support@squarepic.io",
          contactType: "customer support",
        },
      }}
    />
  );
}
