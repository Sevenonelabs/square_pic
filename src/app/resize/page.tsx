import type { Metadata } from "next";
import presets from "@/data/social-presets.json";
import { BreadcrumbSchema } from "@/components/schema-scripts";
import { ResizeTool } from "./resize-tool";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Square Pic – Social Media Resizer - Resize Images for Any Platform",
  description: "Resize your images for Instagram, Facebook, X, TikTok, LinkedIn, and more. Add padding, blur backgrounds, rounded corners — all in your browser, free.",
  openGraph: { title: "Square Pic – Social Media Resizer | SquarePic" },
};

const SITE = "https://squarepic-next.vercel.app";

const ICONS: Record<string, string> = {
  instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m.4 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m5-1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  twitter: "M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z",
};

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
                <path d={ICONS[key] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
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
