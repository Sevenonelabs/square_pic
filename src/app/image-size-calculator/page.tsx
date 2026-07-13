"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";

const SITE = "https://www.squarepic.io";

const PLATFORMS = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "x-twitter", label: "X (Twitter)" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "pinterest", label: "Pinterest" },
  { key: "snapchat", label: "Snapchat" },
  { key: "twitch", label: "Twitch" },
  { key: "reddit", label: "Reddit" },
];

const ALL_TYPES: { platform: string; key: string; label: string; w: number; h: number }[] = [
  { platform: "instagram", key: "profile", label: "Profile Picture", w: 320, h: 320 },
  { platform: "instagram", key: "square", label: "Square Post", w: 1080, h: 1080 },
  { platform: "instagram", key: "portrait", label: "Portrait Post", w: 1080, h: 1350 },
  { platform: "instagram", key: "landscape", label: "Landscape Post", w: 1080, h: 566 },
  { platform: "instagram", key: "stories", label: "Stories/Reels", w: 1080, h: 1920 },
  { platform: "facebook", key: "profile", label: "Profile Picture", w: 320, h: 320 },
  { platform: "facebook", key: "square", label: "Square Post", w: 1080, h: 1080 },
  { platform: "facebook", key: "cover", label: "Cover Photo", w: 851, h: 315 },
  { platform: "facebook", key: "stories", label: "Stories", w: 1080, h: 1920 },
  { platform: "x-twitter", key: "profile", label: "Profile Picture", w: 400, h: 400 },
  { platform: "x-twitter", key: "square", label: "Square Post", w: 1080, h: 1080 },
  { platform: "x-twitter", key: "landscape", label: "Landscape Post", w: 1600, h: 900 },
  { platform: "x-twitter", key: "cover", label: "Cover Photo", w: 1500, h: 500 },
  { platform: "linkedin", key: "profile", label: "Profile Picture", w: 400, h: 400 },
  { platform: "linkedin", key: "square", label: "Square Post", w: 1200, h: 1200 },
  { platform: "linkedin", key: "landscape", label: "Landscape Post", w: 1200, h: 627 },
  { platform: "linkedin", key: "cover", label: "Cover Photo", w: 1128, h: 191 },
  { platform: "tiktok", key: "profile", label: "Profile Picture", w: 200, h: 200 },
  { platform: "tiktok", key: "portrait", label: "Video/Post", w: 1080, h: 1920 },
  { platform: "youtube", key: "thumbnail", label: "Video Thumbnail", w: 1280, h: 720 },
  { platform: "youtube", key: "channelArt", label: "Channel Art", w: 2560, h: 1440 },
  { platform: "youtube", key: "profile", label: "Profile Picture", w: 800, h: 800 },
  { platform: "pinterest", key: "pinStandard", label: "Standard Pin", w: 1000, h: 1500 },
  { platform: "pinterest", key: "pinSquare", label: "Square Pin", w: 1000, h: 1000 },
  { platform: "snapchat", key: "story", label: "Snap/Story", w: 1080, h: 1920 },
  { platform: "twitch", key: "profile", label: "Profile Picture", w: 300, h: 300 },
  { platform: "twitch", key: "banner", label: "Banner", w: 1200, h: 480 },
  { platform: "twitch", key: "offlineBanner", label: "Offline Banner", w: 1920, h: 1080 },
  { platform: "reddit", key: "profile", label: "Profile Picture", w: 256, h: 256 },
  { platform: "reddit", key: "postImage", label: "Post Image", w: 1200, h: 675 },
];

export default function ImageSizeCalculatorPage() {
  const [searchW, setSearchW] = useState("");
  const [searchH, setSearchH] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const w = parseInt(searchW, 10);
  const h = parseInt(searchH, 10);
  const hasValidInput = !isNaN(w) && !isNaN(h) && w > 0 && h > 0;

  const matches = hasValidInput
    ? ALL_TYPES.filter((t) => t.w === w && t.h === h)
    : [];

  const filteredTypes = selectedPlatform
    ? ALL_TYPES.filter((t) => t.platform === selectedPlatform)
    : ALL_TYPES;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Image Size Calculator", url: `${SITE}/image-size-calculator` },
      ]} />
      <WebAppSchema name="SquarePic - Image Size Calculator" url={`${SITE}/image-size-calculator`} description="Find the perfect image dimensions for any social media platform with our interactive size calculator." aggregateRating={{ ratingValue: "4.8", ratingCount: "45", bestRating: "5" }} />
      <div className="max-w-[800px] w-full mx-auto px-4 py-8">
      <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-2">Image Size Calculator</h1>
      <p className="text-[0.9rem] text-[#8d9aaa] mb-6 leading-relaxed">
        Enter your image dimensions or select a platform to find the perfect size for social media.
      </p>

      <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
        <h2 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-3">Search by Dimensions</h2>
        <div className="flex items-end gap-3 mb-2">
          <div className="flex-1">
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-[#576675] mb-1 block">Width (px)</label>
            <input
              type="number" min="1" max="10000" value={searchW}
              onChange={(e) => setSearchW(e.target.value)}
              placeholder="e.g. 1080"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-md px-3 py-2 text-[0.85rem] text-[#e6edf5] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <span className="text-[1.2rem] text-[#576675] pb-2">×</span>
          <div className="flex-1">
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-[#576675] mb-1 block">Height (px)</label>
            <input
              type="number" min="1" max="10000" value={searchH}
              onChange={(e) => setSearchH(e.target.value)}
              placeholder="e.g. 1080"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-md px-3 py-2 text-[0.85rem] text-[#e6edf5] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        {matches.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-[var(--accent)]/8 border border-[var(--accent)]/15 rounded-md">
            <p className="text-[0.78rem] text-[#e6edf5] font-semibold m-0">
              {w}×{h} matches:
            </p>
            {matches.map((m) => {
              const plat = PLATFORMS.find((p) => p.key === m.platform);
              return (
                <Link
                  key={`${m.platform}-${m.key}`}
                  href={`/resize/${m.platform}`}
                  className="block text-[0.75rem] text-[var(--accent)] no-underline hover:underline mt-1"
                >
                  {plat?.label || m.platform} -- {m.label} ({m.w}×{m.h})
                </Link>
              );
            })}
          </motion.div>
        )}

        {hasValidInput && matches.length === 0 && (
          <p className="text-[0.75rem] text-[#576675] mt-2">
            No exact match found for {w}×{h}. Try common sizes like 1080×1080, 1080×1920, or 1200×1200.
          </p>
        )}
      </div>

      <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
        <h2 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-3">Browse by Platform</h2>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {PLATFORMS.map((p) => (
            <button
              key={p.key}
              onClick={() => setSelectedPlatform(selectedPlatform === p.key ? null : p.key)}
              className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                selectedPlatform === p.key
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20"
                  : "bg-transparent text-[#576675] border-[rgba(255,255,255,0.06)] hover:text-[#8d9aaa]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selectedPlatform && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-1.5">
              {filteredTypes.map((t) => (
                <Link
                  key={`${t.platform}-${t.key}`}
                  href={`/resize/${t.platform}`}
                  className="flex items-center justify-between px-3 py-2 rounded-sm bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] no-underline transition-all hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)]"
                >
                  <span className="text-[0.78rem] text-[#e6edf5] font-semibold">{t.label}</span>
                  <span className="text-[0.72rem] text-[var(--accent)] font-bold">{t.w}×{t.h}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-center py-4">
        <Link href="/" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
          Resize Your Image Free
        </Link>
      </div>
    </div>
    </>
  );
}
