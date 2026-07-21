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
  { key: "whatsapp", label: "WhatsApp" },
  { key: "telegram", label: "Telegram" },
  { key: "discord", label: "Discord" },
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
  { platform: "whatsapp", key: "profile", label: "Profile Picture", w: 500, h: 500 },
  { platform: "whatsapp", key: "status", label: "Status Image", w: 1080, h: 1920 },
  { platform: "whatsapp", key: "businessCover", label: "Business Cover", w: 800, h: 800 },
  { platform: "telegram", key: "profile", label: "Profile Picture", w: 128, h: 128 },
  { platform: "discord", key: "serverIcon", label: "Server Icon", w: 512, h: 512 },
  { platform: "discord", key: "serverBanner", label: "Server Banner", w: 960, h: 540 },
  { platform: "discord", key: "serverSplash", label: "Server Splash", w: 1920, h: 1080 },
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
      <WebAppSchema name="SquarePic - Image Size Calculator" url={`${SITE}/image-size-calculator`} description="Find the perfect image dimensions for any social media platform with our interactive size calculator." />
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

      <section className="mb-10">
        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">Why Image Dimensions Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Consistent Brand Appearance</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              Each social media platform displays images at specific dimensions. Using non-standard sizes forces
              platforms to crop, stretch, or letterbox your images, resulting in an inconsistent brand appearance.
              A 1080x1080 square image displays perfectly across Instagram, Facebook, and LinkedIn feeds.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Faster Page Load Times</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              Uploading images at the exact display size eliminates unnecessary data. A 4000x3000 photo
              scaled down to 400x300 in the browser wastes bandwidth and slows page loads. Use the calculator
              above to find the exact dimensions for each platform, then resize to match.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Aspect Ratio Explained</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              Aspect ratio describes the proportional relationship between width and height (e.g., 1:1 for
              square, 16:9 for widescreen). Two images with different pixel dimensions can share the same
              aspect ratio. Use our calculator to find which platform presets match your image&apos;s aspect ratio.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Avoid Upscaling Issues</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              Starting with an image that is smaller than the target dimensions means the platform must
              upscale it, causing blurriness and pixelation. Always upload images at or above the platform&apos;s
              recommended resolution. Our dimension calculator shows you the minimum size for each media type.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">How to Use the Image Size Calculator</h2>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <ol className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-2">
            <li><strong className="text-[#e6edf5]">Search by dimensions:</strong> Enter your image&apos;s width and height in pixels. The calculator instantly checks if these dimensions match any standard social media image size.</li>
            <li><strong className="text-[#e6edf5]">Browse by platform:</strong> Select a platform from the buttons above to see all supported image sizes for that platform, from profile pictures to cover photos and post dimensions.</li>
            <li><strong className="text-[#e6edf5]">Click through to resize:</strong> Once you find your target dimensions, click any result to open SquarePic&apos;s resizer with the exact preset applied.</li>
            <li><strong className="text-[#e6edf5]">Common pairings:</strong> 1080x1080 (Instagram square), 1080x1920 (Instagram Stories), 1200x630 (Facebook link preview), 1280x720 (YouTube thumbnail) -- these are among the most frequently searched dimension pairs.</li>
          </ol>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">Common Image Dimension Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">What is the most common image size for social media?</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              1080 x 1080 pixels (1:1 square) is the most universally supported size. Instagram, Facebook, LinkedIn,
              and X/Twitter all display square images natively. It is the safest choice for cross-platform posting.
            </p>
          </div>
          <div>
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">How do I calculate aspect ratio from width and height?</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              Divide both width and height by their greatest common divisor. For example, 1920x1080 simplifies to
              16:9 (1920/120 = 16, 1080/120 = 9). Use this calculator to find which standard aspect ratio
              matches your image dimensions.
            </p>
          </div>
          <div>
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">What resolution is best for print vs web?</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              For web, 72 DPI is standard and 1920px on the longest side is sufficient for most displays.
              For print, 300 DPI is required. Use the dimensions above as a starting point and always verify
              with your specific platform&apos;s requirements before uploading.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center py-4">
        <Link href="/" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
          Resize Your Image Free
        </Link>
      </div>
    </div>
    </>
  );
}

