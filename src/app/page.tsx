"use client";

import { useState, useCallback } from "react";
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
        url: "https://squarepic.io",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://squarepic.io/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SquarePic",
        alternateName: "Square Pic - Square Image Tool",
        url: "https://squarepic.io",
        description: "Free online square image maker and social media photo resizer. No uploads, no signup.",
        logo: "https://squarepic.io/images/logo.png",
        sameAs: ["https://github.com/Sevenonelabs/square_pic"],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SquarePic",
        url: "https://squarepic.io",
        description: "Free online image editing toolkit. Square image maker, image resizer, compressor, converter, and cropper. Privacy-first, no uploads.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-07-13",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "127", bestRating: "5" },
      }} />
      <ToolAsHeroLayout
        state={state}
        onStateChange={update}
        headline={"Square Pic - Social Media Resizer"}
        highlightWord="Perfectly Square"
        badge="100% Free · No Signup · Privacy-First"
        colorSwatches={COLOR_SWATCHES}
      />

      <ToolLinks />

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-12">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How SquarePic Works
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Making a perfect square image for social media takes just three steps. No signup, no uploads,
            no watermarks -- all processing stays in your browser.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { step: "01", title: "Upload Your Photo", desc: "Drag and drop any image -- JPG, PNG, WebP -- up to 20 MB. SquarePic works entirely in your browser, so your file never leaves your device." },
            { step: "02", title: "Choose Your Style", desc: "Pick from Dynamic Blur, Solid Color, or Smart Crop to fill the square. Adjust padding, zoom, and corner radius until it looks perfect." },
            { step: "03", title: "Download & Share", desc: "Export your square image as PNG, JPEG, or WebP at the exact dimensions you need. Ready for Instagram, LinkedIn, Twitter, and more." },
          ].map((s) => (
            <div key={s.step} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">{s.step}</span>
              <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mt-2 mb-1.5">{s.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-[900px] mx-auto mb-16">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] text-center mb-3">
            Why Choose SquarePic
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed text-center max-w-[600px] mx-auto mb-8">
            Thousands of creators and marketers use SquarePic daily to prepare images for social media.
            Here is what makes it different.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "100% Free, No Signup", desc: "No accounts, no trials, no credit cards. Every feature is unlocked immediately and always will be." },
              { title: "Privacy-First Processing", desc: "Your images never leave your device. All processing happens locally via HTML5 Canvas -- zero server uploads." },
              { title: "No Watermarks", desc: "Your downloads are clean. We never add watermarks, overlays, or branding to your images." },
              { title: "Multiple Export Formats", desc: "Download as PNG, JPEG, or WebP. Choose the format that works best for your platform." },
              { title: "Social Media Presets", desc: "Built-in dimensions for Instagram, X/Twitter, LinkedIn, TikTok, YouTube, and 13+ platforms." },
              { title: "Open Source", desc: "Built in public by SevenOneLabs. Contribute, review the code, or self-host on GitHub." },
            ].map((f) => (
              <div key={f.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">{f.title}</h3>
                <p className="text-[0.78rem] text-[#8d9aaa] leading-relaxed m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[900px] mx-auto mb-8">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] text-center mb-3">
            SquarePic vs Other Image Editors
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed text-center max-w-[600px] mx-auto mb-8">
            See how SquarePic stacks up against the most popular image editing tools on the market.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-3 pr-4">Feature</th>
                  <th className="text-center font-bold text-[var(--accent)] py-3 px-3">SquarePic</th>
                  <th className="text-center font-bold text-[#8d9aaa] py-3 px-3">Canva</th>
                  <th className="text-center font-bold text-[#8d9aaa] py-3 px-3">iLoveIMG</th>
                  <th className="text-center font-bold text-[#8d9aaa] py-3 pl-3">TinyPNG</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: "Price", sp: "Free", c: "Freemium ($)", i: "Freemium ($)", t: "Freemium ($)" },
                  { feat: "Signup Required", sp: "No", c: "Yes", i: "No", t: "No" },
                  { feat: "Client-Side Only", sp: "Yes", c: "No", i: "No", t: "No" },
                  { feat: "No Watermark", sp: "Yes", c: "No (free tier)", i: "Yes", t: "N/A" },
                  { feat: "Square Mode", sp: "Yes", c: "Yes", i: "Yes", t: "No" },
                  { feat: "Blur Background", sp: "Yes", c: "Yes (Pro)", i: "No", t: "No" },
                  { feat: "Smart Crop", sp: "Yes", c: "Yes", i: "Yes", t: "No" },
                  { feat: "Export PNG/JPEG/WebP", sp: "Yes", c: "Yes", i: "Yes", t: "WebP only" },
                  { feat: "Social Presets", sp: "Yes (13+)", c: "Yes", i: "No", t: "No" },
                  { feat: "Batch Processing", sp: "Coming", c: "Yes", i: "Yes", t: "Yes" },
                  { feat: "Open Source", sp: "Yes", c: "No", i: "No", t: "No" },
                ].map((row) => (
                  <tr key={row.feat} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="text-[#e6edf5] font-semibold py-2.5 pr-4">{row.feat}</td>
                    <td className="text-center text-[var(--accent)] font-bold py-2.5 px-3">{row.sp}</td>
                    <td className="text-center text-[#576675] py-2.5 px-3">{row.c}</td>
                    <td className="text-center text-[#576675] py-2.5 px-3">{row.i}</td>
                    <td className="text-center text-[#576675] py-2.5 pl-3">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "SquarePic - Free Square Image Maker",
        url: "https://squarepic.io",
        description: "Free online square image maker with blur backgrounds, solid fills, and smart crop. Privacy-first, no uploads, no signup.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-07-13",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "127",
          bestRating: "5",
        },
      }} />
    </>
  );
}

