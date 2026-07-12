import type { Metadata } from "next";
import presets from "@/data/social-presets.json";
import { PLATFORM_ICONS } from "@/data/social-icons";
import { BreadcrumbSchema } from "@/components/schema-scripts";
import { ResizeTool } from "./resize-tool";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Square Pic – Social Media Resizer - Resize Images for Any Platform",
  description: "Resize your images for Instagram, Facebook, X, TikTok, LinkedIn, and more. Add padding, blur backgrounds, rounded corners — all in your browser, free.",
  openGraph: { title: "Square Pic – Social Media Resizer | SquarePic" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function ResizeHubPage() {
  const entries = Object.entries(presets);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Social Media Resizer", url: `${SITE}/resize` }]} />
      <ResizeTool />

      <div className="max-w-[920px] w-full mx-auto px-5 py-8">
        <div className="text-center mb-8 p-8 bg-gradient-to-br from-[rgba(6,182,212,0.04)] to-[rgba(139,92,246,0.04)] border border-[rgba(6,182,212,0.08)] rounded-lg">
          <h2 className="text-[1.5rem] font-extrabold tracking-tight mb-2">Social Media Image Sizes: The Complete Guide</h2>
          <p className="text-[0.85rem] text-[#8d9aaa] max-w-[600px] mx-auto leading-relaxed">
            Find the exact pixel dimensions for every social media platform. Click any platform to see all its image sizes with detailed descriptions and pro tips.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          </svg>
          <span className="text-[1rem] font-extrabold text-[#e6edf5]">Platform Image Size Guides</span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mb-8">
          {entries.map(([key, platform]) => (
            <a
              key={key}
              href={`/resize/${key}`}
              className="flex items-center gap-2.5 p-3.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[var(--accent)]">
                <path d={PLATFORM_ICONS[key] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
              </svg>
              <div>
                <span className="text-[0.78rem] font-bold text-[#e6edf5]">{platform.label}</span>
                <small className="text-[0.62rem] text-[#576675] block mt-0.5">{Object.keys(platform.types).length} sizes</small>
              </div>
            </a>
          ))}
        </div>
      </div>

      <ToolLinks current="/resize" />
    </>
  );
}
