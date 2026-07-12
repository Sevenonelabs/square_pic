import type { MetadataRoute } from "next";
import presets from "@/data/social-presets.json";

const STATIC_PAGES = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "/edit", priority: 0.9, freq: "weekly" as const },
  { path: "/compressor", priority: 0.9, freq: "weekly" as const },
  { path: "/converter", priority: 0.9, freq: "weekly" as const },
  { path: "/cropper", priority: 0.9, freq: "weekly" as const },
  { path: "/resize", priority: 0.9, freq: "weekly" as const },
  { path: "/about", priority: 0.5, freq: "monthly" as const },
  { path: "/faq", priority: 0.5, freq: "monthly" as const },
  { path: "/support", priority: 0.4, freq: "monthly" as const },
  { path: "/privacy", priority: 0.3, freq: "monthly" as const },
  { path: "/terms", priority: 0.3, freq: "monthly" as const },
];

const SLUG_MAP: Record<string, string> = {
  instagram: "instagram", facebook: "facebook", "x-twitter": "x-twitter",
  linkedin: "linkedin", tiktok: "tiktok", youtube: "youtube",
  pinterest: "pinterest", snapchat: "snapchat", whatsapp: "whatsapp",
  twitch: "twitch", reddit: "reddit", telegram: "telegram", discord: "discord",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || "https://squarepic-next.vercel.app";
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

  return [...staticEntries, ...platformEntries];
}
