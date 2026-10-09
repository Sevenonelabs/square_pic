import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const STATIC_PAGES = [
  { path: "", priority: 1.0, freq: "weekly" as const, modified: "2026-10-08" },
  { path: "/compressor", priority: 0.9, freq: "weekly" as const, modified: "2026-10-08" },
  { path: "/converter", priority: 0.9, freq: "weekly" as const, modified: "2026-10-08" },
  { path: "/cropper", priority: 0.9, freq: "weekly" as const, modified: "2026-10-08" },
  { path: "/upscaler", priority: 0.9, freq: "weekly" as const, modified: "2026-10-08" },
  { path: "/guides", priority: 0.7, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/square-image-size", priority: 0.8, freq: "monthly" as const, modified: "2026-10-09" },
  { path: "/guides/how-to-enlarge-a-photo", priority: 0.8, freq: "monthly" as const, modified: "2026-10-09" },
  { path: "/guides/make-image-square-without-cropping", priority: 0.8, freq: "monthly" as const, modified: "2026-10-08" },
  { path: "/guides/social-media-image-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/instagram-feed-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/instagram-reels-stories-guide", priority: 0.8, freq: "weekly" as const, modified: "2026-10-08" },
  { path: "/guides/linkedin-image-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/youtube-banner-thumbnail-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/tiktok-image-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/facebook-image-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/pinterest-image-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/guides/discord-image-sizes-2026", priority: 0.8, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/image-size-calculator", priority: 0.7, freq: "weekly" as const, modified: "2026-10-09" },
  { path: "/about", priority: 0.5, freq: "monthly" as const, modified: "2026-10-07" },
  { path: "/author/sevenonelabs", priority: 0.4, freq: "monthly" as const, modified: "2026-10-07" },
  { path: "/faq", priority: 0.5, freq: "monthly" as const, modified: "2026-10-08" },
  { path: "/support", priority: 0.4, freq: "monthly" as const, modified: "2026-10-07" },
  { path: "/privacy", priority: 0.3, freq: "monthly" as const, modified: "2026-10-07" },
  { path: "/terms", priority: 0.3, freq: "monthly" as const, modified: "2026-10-07" },
];

const FORMAT_PAIRS = [
  "png-to-jpg", "jpg-to-png", "png-to-webp", "jpg-to-webp",
  "webp-to-png", "webp-to-jpg", "png-to-gif", "jpg-to-gif",
  "png-to-ico", "jpg-to-ico", "png-to-avif", "jpg-to-avif",
  "webp-to-gif", "webp-to-avif",
];

const SLUG_MAP: Record<string, string> = {
  instagram: "instagram", facebook: "facebook", "x-twitter": "x-twitter",
  linkedin: "linkedin", tiktok: "tiktok", youtube: "youtube",
  pinterest: "pinterest", snapchat: "snapchat", whatsapp: "whatsapp",
  twitch: "twitch", reddit: "reddit", telegram: "telegram", discord: "discord",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL;

  const staticEntries = STATIC_PAGES.map((p) => ({
    url: p.path ? new URL(p.path, siteUrl).href : new URL(siteUrl).origin,
    lastModified: p.modified,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const platformEntries = Object.entries(SLUG_MAP).map(([slug]) => ({
    url: `${siteUrl}/resize/${slug}`,
    lastModified: "2026-10-08",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const formatEntries = FORMAT_PAIRS.map((pair) => ({
    url: `${siteUrl}/converter/${pair}`,
    lastModified: "2026-10-08",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const editions2027 = STATIC_PAGES.filter((page) => page.path.endsWith("-2026")).map((page) => ({
    url: `${siteUrl}${page.path.replace(/-2026$/, "-2027")}`,
    lastModified: "2026-10-09",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...editions2027, ...platformEntries, ...formatEntries];
}
