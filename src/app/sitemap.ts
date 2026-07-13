import type { MetadataRoute } from "next";
import presets from "@/data/social-presets.json";

const STATIC_PAGES = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "/edit", priority: 0.9, freq: "weekly" as const },
  { path: "/compressor", priority: 0.9, freq: "weekly" as const },
  { path: "/converter", priority: 0.9, freq: "weekly" as const },
  { path: "/cropper", priority: 0.9, freq: "weekly" as const },
  // /resize now redirects to /
  { path: "/about", priority: 0.5, freq: "monthly" as const },
  { path: "/faq", priority: 0.5, freq: "monthly" as const },
  { path: "/support", priority: 0.4, freq: "monthly" as const },
  { path: "/privacy", priority: 0.3, freq: "monthly" as const },
  { path: "/terms", priority: 0.3, freq: "monthly" as const },
  { path: "/guides", priority: 0.7, freq: "weekly" as const },
  { path: "/guides/social-media-image-sizes-2026", priority: 0.8, freq: "weekly" as const },
  { path: "/blog", priority: 0.7, freq: "weekly" as const },
  { path: "/blog/how-to-square-image-for-any-platform", priority: 0.6, freq: "monthly" as const },
  { path: "/blog/privacy-first-image-editing", priority: 0.6, freq: "monthly" as const },
  { path: "/blog/category", priority: 0.4, freq: "monthly" as const },
  { path: "/blog/category/how-to", priority: 0.4, freq: "monthly" as const },
  { path: "/blog/category/privacy", priority: 0.4, freq: "monthly" as const },
  { path: "/blog/category/social-media-sizes", priority: 0.4, freq: "monthly" as const },
  { path: "/blog/category/image-formats", priority: 0.4, freq: "monthly" as const },
  { path: "/compare", priority: 0.5, freq: "monthly" as const },
  { path: "/compare/squarepic-vs-iloveimg", priority: 0.6, freq: "monthly" as const },
  { path: "/compare/squarepic-vs-tinypng", priority: 0.6, freq: "monthly" as const },
  { path: "/compare/squarepic-vs-canva", priority: 0.6, freq: "monthly" as const },
  { path: "/research", priority: 0.5, freq: "monthly" as const },
  { path: "/research/image-compression-benchmarks", priority: 0.7, freq: "monthly" as const },
  { path: "/image-size-calculator", priority: 0.8, freq: "weekly" as const },
];

const SLUG_MAP: Record<string, string> = {
  instagram: "instagram", facebook: "facebook", "x-twitter": "x-twitter",
  linkedin: "linkedin", tiktok: "tiktok", youtube: "youtube",
  pinterest: "pinterest", snapchat: "snapchat", whatsapp: "whatsapp",
  twitch: "twitch", reddit: "reddit", telegram: "telegram", discord: "discord",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || "https://www.squarepic.io";
  const today = new Date().toISOString().split("T")[0];

  const staticEntries = STATIC_PAGES.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: today,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const platformEntries = Object.entries(SLUG_MAP).map(([slug]) => ({
    url: `${siteUrl}/resize/${slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const formatPairs = [
    "png-to-jpg", "jpg-to-png", "png-to-webp", "jpg-to-webp",
    "webp-to-png", "webp-to-jpg", "png-to-gif", "jpg-to-gif",
    "png-to-ico", "jpg-to-ico", "png-to-avif", "jpg-to-avif",
  ];

  const formatEntries = formatPairs.map((pair) => ({
    url: `${siteUrl}/converter/${pair}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...platformEntries, ...formatEntries];
}
