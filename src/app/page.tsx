"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ToolAsHeroLayout } from "@/components/layout/tool-as-hero-layout";
import { ToolLinks } from "@/components/layout/tool-links";
import { JsonLd } from "@/components/schema-scripts";
import type { EditorState } from "@/lib/editor-renderer";

const DEFAULTS = {
  blur: 20, padding: 10, scale: 100, radius: 0, color: "#F0F5FA",
};

const COLOR_SWATCHES = [
  "#1E2328", "#787D82", "#F0F5FA", "#F0CDB4", "#B49B5A", "#F02328",
  "#F07D28", "#F0F528", "#1EF528", "#50C3FA", "#1E23FA", "#8C23FA",
  "#F055C8", "#782328", "#B4B928", "#1E2382",
];

export default function Home() {
  const [state, setState] = useState<EditorState>({
    image: null,
    mode: "blur",
    blurAmount: DEFAULTS.blur,
    paddingPercent: DEFAULTS.padding,
    imageScale: DEFAULTS.scale,
    cornerRadius: DEFAULTS.radius,
    backgroundColor: DEFAULTS.color,
    targetWidth: 0,
    targetHeight: 0,
  });

  const update = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SquarePic",
        url: "https://www.squarepic.io",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SquarePic",
        url: "https://www.squarepic.io",
        description: "Free online image editing toolkit. Square image maker, image resizer, compressor, converter, and cropper. Privacy-first, no uploads.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-08-14",
      }} />
      <ToolAsHeroLayout
        state={state}
        onStateChange={update}
        headline="Make an Image Square Online — Free Square Image Maker"
        highlightWord="Square Image Maker"
        microcopy="Turn any photo into a perfect square for Instagram, LinkedIn, Facebook, and more — without cropping out what matters. Pick Dynamic Blur, Solid Fill, or Smart Crop. Free, no signup, and 100% private: your image never leaves your device."
        colorSwatches={COLOR_SWATCHES}
      />

      <ToolLinks />

      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            Make Any Photo Square in Seconds
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Making an image square is essential for social media profiles, feed posts, and thumbnails. Unlike
            cropping, which cuts parts of your photo away, SquarePic makes an image square online by extending
            it with a blurred background, a solid color, or an automatic smart crop — so your full image stays
            visible. Use it as a free square image maker for Instagram, a photo resizer for any platform, or a
            quick way to keep an entire feed looking consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { step: "1", title: "Upload Your Image", desc: "Select any image from your device. SquarePic supports JPEG, PNG, WebP, and more. Files up to 20 MB." },
            { step: "2", title: "Choose Your Style", desc: "Pick Dynamic Blur for a soft gradient background, Solid Fill for a clean color match, or Smart Crop to fill the square automatically." },
            { step: "3", title: "Download & Share", desc: "Export your square image as PNG, JPEG, or WebP. Ready to upload to Instagram, LinkedIn, Facebook, or any platform." },
          ].map((c) => (
            <div key={c.step} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 text-center">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[var(--accent)]/10 text-[var(--accent)] text-[0.85rem] font-extrabold mb-3">{c.step}</span>
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.78rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Three Ways to Make a Square Image</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Dynamic Blur:</strong> Adds a blurred extension of your photo as the background. Creates a soft, professional look that Instagram influencers use for cohesive feeds.</li>
              <li><strong className="text-[#e6edf5]">Solid Fill:</strong> Adds a solid color background. Choose from preset colors or pick any custom color. Best for product photos and clean branding.</li>
              <li><strong className="text-[#e6edf5]">Smart Crop:</strong> Automatically crops the image to a square while keeping the most important content centered. No background extension needed.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Best Uses for Square Images</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Instagram feed & posts:</strong> Square 1080x1080 posts display cleanly in the feed, grid, and profile — no surprise cropping on any device.</li>
              <li><strong className="text-[#e6edf5]">Profile pictures:</strong> Every social platform uses a square avatar. Make yours perfectly proportioned and centered.</li>
              <li><strong className="text-[#e6edf5]">LinkedIn & Facebook posts:</strong> Square images render fully in feeds on desktop and mobile, keeping your brand consistent.</li>
              <li><strong className="text-[#e6edf5]">E-commerce product photos:</strong> Amazon and Shopify both recommend square product images for clean, uniform listings.</li>
              <li><strong className="text-[#e6edf5]">Website thumbnails & favicons:</strong> Square thumbnails create tidy grid layouts, and favicons and app icons must be perfectly square.</li>
              <li><strong className="text-[#e6edf5]">Quote graphics & branded content:</strong> One square format keeps your entire feed or grid looking cohesive.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Social Media Square Size Quick Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Platform</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Profile Picture</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Square Post (1:1)</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Best Format</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plat: "Instagram", prof: "320x320", post: "1080x1080", fmt: "JPEG / PNG" },
                  { plat: "Facebook", prof: "320x320", post: "1080x1080", fmt: "JPEG" },
                  { plat: "LinkedIn", prof: "400x400", post: "1200x1200", fmt: "JPEG / PNG" },
                  { plat: "X (Twitter)", prof: "400x400", post: "1080x1080", fmt: "JPEG" },
                  { plat: "TikTok", prof: "200x200", post: "1080x1080", fmt: "JPEG" },
                  { plat: "YouTube", prof: "800x800", post: "1280x720", fmt: "JPEG / PNG" },
                  { plat: "Pinterest", prof: "200x200", post: "1000x1500", fmt: "JPEG / PNG" },
                  { plat: "Snapchat", prof: "200x200", post: "1080x1920", fmt: "JPEG" },
                  { plat: "WhatsApp", prof: "500x500", post: "1080x1920", fmt: "JPEG" },
                  { plat: "Discord", prof: "512x512", post: "960x540", fmt: "JPEG / PNG" },
                ].map((r) => (
                  <tr key={r.plat} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-3">{r.plat}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.prof}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.post}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Why Make Images Square?</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              Square images (1:1 aspect ratio) are the most universally supported format across social media platforms.
              Unlike landscape or portrait images that get cropped differently on each platform, square images display
              consistently everywhere. Profile pictures are always square (even when displayed as circles), feed thumbnails
              are cropped to squares, and link previews often default to square aspect ratios. Using a dedicated square
              image maker ensures your photos look exactly as intended on every platform. Whether you need a
              quick square pic for your profile, a resizer tool for product images, or a full social media photo
              editor for your brand, SquarePic handles it all in one place.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Square Image Best Practices</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Center your main subject — square cropping removes edges, not the middle.</li>
              <li>Use high resolution source images (at least 1080x1080) for sharp results.</li>
              <li>Match the blur background color to your brand palette for consistent social media aesthetics.</li>
              <li>Add padding to prevent important content from touching the edges.</li>
              <li>Preview your square image at actual size before posting to check readability.</li>
              <li>Use the same square format across all profile pictures for brand consistency.</li>
              <li>Check how your square image reads at thumbnail size — most posts are first seen small in a feed.</li>
              <li>SquarePic also resizes, crops, compresses, and converts images — use the platform presets to prep any photo in seconds.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Private & Secure — No Uploads</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            SquarePic processes every image locally in your browser using HTML5 Canvas. Your photos never leave your device.
            No uploads, no servers, no data storage. This means you can edit sensitive images with complete privacy.
          </p>
        </div>

        <p className="text-[0.7rem] text-[#576675] text-center mt-8">Last updated: August 2026</p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mt-8">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Resize Images for Every Platform</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/resize/instagram", label: "Instagram" },
              { href: "/resize/facebook", label: "Facebook" },
              { href: "/resize/x-twitter", label: "X (Twitter)" },
              { href: "/resize/linkedin", label: "LinkedIn" },
              { href: "/resize/tiktok", label: "TikTok" },
              { href: "/resize/youtube", label: "YouTube" },
              { href: "/resize/pinterest", label: "Pinterest" },
              { href: "/resize/snapchat", label: "Snapchat" },
              { href: "/resize/whatsapp", label: "WhatsApp" },
              { href: "/resize/twitch", label: "Twitch" },
              { href: "/resize/reddit", label: "Reddit" },
              { href: "/resize/telegram", label: "Telegram" },
              { href: "/resize/discord", label: "Discord" },
            ].map((platform) => (
              <Link
                key={platform.href}
                href={platform.href}
                className="text-[0.68rem] font-semibold text-[#8d9aaa] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-sm no-underline hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all"
              >
                {platform.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mt-4">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Convert Between Image Formats</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/converter/png-to-jpg", label: "PNG to JPG" },
              { href: "/converter/jpg-to-png", label: "JPG to PNG" },
              { href: "/converter/png-to-webp", label: "PNG to WebP" },
              { href: "/converter/jpg-to-webp", label: "JPG to WebP" },
              { href: "/converter/webp-to-png", label: "WebP to PNG" },
              { href: "/converter/png-to-avif", label: "PNG to AVIF" },
            ].map((format) => (
              <Link
                key={format.href}
                href={format.href}
                className="text-[0.68rem] font-semibold text-[#8d9aaa] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-sm no-underline hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all"
              >
                {format.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[0.75rem] text-[#8d9aaa] text-center">
            Learn more: <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Social Media Image Sizes 2026</Link> · <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">Instagram Square Image Maker</Link> · <Link href="/resize/whatsapp" className="text-[var(--accent)] no-underline hover:underline">WhatsApp Image Resizer</Link> · <Link href="/resize/linkedin" className="text-[var(--accent)] no-underline hover:underline">LinkedIn Image Resizer</Link> · <Link href="/guides/instagram-reels-stories-guide" className="text-[var(--accent)] no-underline hover:underline">Reels & Stories Guide</Link>
          </p>
        </div>
      </section>
    </>
  );
}

