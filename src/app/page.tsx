"use client";

import { useState, useCallback } from "react";
import { ToolAsHeroLayout } from "@/components/layout/tool-as-hero-layout";
import type { EditorState } from "@/lib/editor-renderer";

const DEFAULTS = {
  blur: 20, padding: 10, scale: 100, radius: 0, color: "#F0F5FA",
};

const COLOR_SWATCHES = [
  "#1E2328", "#787D82", "#F0F5FA", "#F0CDB4", "#B49B5A", "#F02328",
  "#F07D28", "#F0F528", "#1EF528", "#50C3FA", "#1E23FA", "#8C23FA",
  "#F055C8", "#782328", "#B4B928", "#1E2382",
];

const TOOLS = [
  { href: "/converter", label: "Image Converter", desc: "JPG, PNG, WebP, AVIF", icon: "M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.5 15" },
  { href: "/compressor", label: "Image Compressor", desc: "Reduce file size, batch", icon: "M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" },
  { href: "/resize", label: "Social Media Resizer", desc: "Instagram, Facebook, X, TikTok", icon: "M2 2h20v20H2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" },
  { href: "/cropper", label: "Photo Cropper", desc: "Free-form & preset ratios", icon: "M6.13 1L6 16a2 2 0 0 0 2 2h15M1 6.13L16 6a2 2 0 0 1 2 2v15" },
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
      <ToolAsHeroLayout
        state={state}
        onStateChange={update}
        headline="Make Any Image Perfectly Square Online"
        highlightWord="Perfectly Square"
        badge="100% Free · No Signup · Privacy-First"
        microcopy="All editing happens locally in your browser with no uploads, no watermarks, and no signup required. Export in PNG, JPEG, or WebP format at full quality."
        colorSwatches={COLOR_SWATCHES}
      />

      <section className="max-w-[1400px] mx-auto px-6 pb-16 w-full max-md:px-3">
        <div className="text-center mb-6">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5]">
            More Free Photo Tools
          </h2>
          <p className="text-[0.75rem] text-[#8d9aaa] font-medium mt-0.5">
            Crop, convert, compress &amp; resize — all in your browser.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
          {TOOLS.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-3 bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-sm bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] group-hover:border-[var(--accent)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tool.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[0.78rem] font-extrabold text-[#e6edf5] m-0 truncate group-hover:text-[var(--accent)] transition-colors">
                  {tool.label}
                </h3>
                <p className="text-[0.65rem] text-[#8d9aaa] m-0 truncate leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
