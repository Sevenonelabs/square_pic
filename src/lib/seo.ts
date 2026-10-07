import type { Metadata } from "next";
import { SITE_URL } from "./constants";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
};

// Next replaces nested metadata objects rather than merging their fields.
// Give each page complete social metadata so root images are never lost.
export function pageMetadata({
  title,
  description,
  path,
  image = "/og/og-home.png",
  article = false,
  publishedTime,
}: PageMetadata): Metadata {
  const socialTitle = `${title} | SquarePic`;
  const url = path === "/" ? new URL(SITE_URL).origin : new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: "SquarePic",
      locale: "en_US",
      type: article ? "article" : "website",
      ...(article && publishedTime ? { publishedTime } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: socialTitle }],
    },
  };
}
