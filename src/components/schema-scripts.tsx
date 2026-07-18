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
  datePublished,
  dateModified,
}: {
  name: string;
  url: string;
  description: string;
  aggregateRating?: { ratingValue: string; ratingCount: string; bestRating: string };
  datePublished?: string;
  dateModified?: string;
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
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : { dateModified: "2026-07-13" }),
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
  authorUrl,
  type = "Article",
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  type?: "Article" | "BlogPosting";
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        headline: title,
        description,
        url,
        ...(imageUrl ? { image: imageUrl } : {}),
        datePublished,
        ...(dateModified ? { dateModified } : { dateModified: datePublished }),
        author: {
          "@type": "Person",
          name: authorName,
          ...(authorUrl ? { url: authorUrl } : {}),
        },
        publisher: {
          "@type": "Organization",
          name: "SquarePic",
          url: "https://www.squarepic.io",
          logo: { "@type": "ImageObject", url: "https://www.squarepic.io/images/logo-icon.svg" },
        },
      }}
    />
  );
}

export function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name,
        description,
        thumbnailUrl,
        contentUrl,
        uploadDate,
        ...(duration ? { duration } : {}),
      }}
    />
  );
}

export function FAQPageSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
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
        alternateName: "Square Pic - Free Square Image Tool",
        url: "https://www.squarepic.io",
        description: "Free online square image maker, image resizer, compressor, and converter. Privacy-first, no uploads, no signup.",
        logo: "https://www.squarepic.io/images/logo-icon.svg",
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

