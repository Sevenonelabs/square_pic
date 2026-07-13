"use client";

import { useState, useCallback } from "react";
import { EditorCanvas } from "@/components/editor/canvas";
import type { EditorState } from "@/lib/editor-renderer";
import { trackEvent } from "@/lib/analytics";
import { JsonLd } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

const DEFAULTS = {
  blur: 20, padding: 10, scale: 100, radius: 0, color: "#F0F5FA",
};

const COLOR_SWATCHES = [
  "#1E2328", "#787D82", "#F0F5FA", "#F0CDB4", "#B49B5A", "#F02328",
  "#F07D28", "#F0F528", "#1EF528", "#50C3FA", "#1E23FA", "#8C23FA",
  "#F055C8", "#782328", "#B4B928", "#1E2382",
];

export default function EditPage() {
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
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://squarepic.io" },
          { "@type": "ListItem", position: 2, name: "Square Image Tool", item: "https://squarepic.io/edit" },
        ],
      }} />
      <div className="max-w-[1400px] mx-auto px-6 py-4 max-md:px-3 max-md:py-2">
      <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-lg p-5 relative max-md:p-2">
        <div className="flex flex-row gap-5 w-full max-md:flex-col max-md:gap-3" style={{ maxWidth: 1360 }}>
          <EditorCanvas state={state} onStateChange={update} />

          <aside className="flex flex-col gap-2 w-[310px] shrink-0 max-md:w-full">
            {/* Control cards */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">
                Outer Border (Padding)
              </h3>
              <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                <span>Padding</span>
                <span>{state.paddingPercent}%</span>
              </div>
              <input
                type="range" min="0" max="40" value={state.paddingPercent}
                onChange={(e) => update({ paddingPercent: Number(e.target.value) })}
                className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none accent-[var(--accent)]"
              />
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Style</h3>
              <div className="flex gap-1 bg-[rgba(0,0,0,0.25)] p-[3px] rounded-sm border border-[rgba(255,255,255,0.06)]">
                {(["blur", "solid", "crop"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => update({ mode: m })}
                    className={`flex-1 bg-transparent border-none text-[0.68rem] font-semibold px-2 py-1.5 rounded-sm cursor-pointer transition-all ${
                      state.mode === m
                        ? "bg-[rgba(255,255,255,0.08)] text-white"
                        : "text-[#8d9aaa] hover:text-[#e6edf5]"
                    }`}
                  >
                    {m === "blur" ? "Dynamic Blur" : m === "solid" ? "Solid" : "Smart Crop"}
                  </button>
                ))}
              </div>
            </div>

            {state.mode === "blur" && (
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
                <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">
                  Blur Intensity
                </h3>
                <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                  <span>Blur</span>
                  <span>{state.blurAmount}px</span>
                </div>
                <input
                  type="range" min="0" max="100" value={state.blurAmount}
                  onChange={(e) => update({ blurAmount: Number(e.target.value) })}
                  className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none"
                />
              </div>
            )}

            {state.mode === "solid" && (
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
                <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">
                  Background Color
                </h3>
                <div className="grid grid-cols-8 gap-1 mb-2.5">
                  {COLOR_SWATCHES.map((c) => (
                    <button
                      key={c}
                      onClick={() => update({ backgroundColor: c })}
                      className="w-full aspect-square rounded-sm cursor-pointer border-2 transition-all hover:scale-110"
                      style={{
                        background: c,
                        borderColor: state.backgroundColor === c ? "var(--accent)" : "transparent",
                        boxShadow: state.backgroundColor === c ? "0 0 0 2px #07080b, 0 0 0 3px var(--accent)" : "none",
                      }}
                    />
                  ))}
                </div>
                <input
                  type="color" value={state.backgroundColor}
                  onChange={(e) => update({ backgroundColor: e.target.value })}
                  className="w-full h-[30px] border border-[rgba(255,255,255,0.06)] rounded-sm bg-transparent cursor-pointer p-0.5"
                />
              </div>
            )}

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">
                Adjustments
              </h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Zoom</span>
                    <span>{state.imageScale}%</span>
                  </div>
                  <input type="range" min="50" max="200" value={state.imageScale}
                    onChange={(e) => update({ imageScale: Number(e.target.value) })}
                    className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Edge Radius</span>
                    <span>{state.cornerRadius}px</span>
                  </div>
                  <input type="range" min="0" max="100" value={state.cornerRadius}
                    onChange={(e) => update({ cornerRadius: Number(e.target.value) })}
                    className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none" />
                </div>
              </div>
            </div>

            {/* Simple download button */}
            <button
              onClick={() => {
                const canvas = document.querySelector("canvas");
                if (!canvas || !state.image) return;
                trackEvent("download", "editor-square-image");
                canvas.toBlob((blob) => {
                  if (!blob) return;
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.download = "squarepic-photo.png";
                  a.href = url;
                  a.click();
                  URL.revokeObjectURL(url);
                }, "image/png");
              }}
              disabled={!state.image}
              className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-md font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_16px_var(--accent-glow)]"
            >
              Download Square Image
            </button>
          </aside>
        </div>
      </div>
    </div>

      <ToolLinks />

      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How to Make a Square Image for Social Media
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Making a square image online is essential for social media profiles, posts, and thumbnails.
            Most cameras and phones shoot in rectangular formats, so converting to a perfect square requires
            the right tool and technique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Dynamic Blur Background", desc: "The most popular choice. Extends your image with a blurred copy of itself to fill the square. The blur gradient blends naturally, making it look like a intentional design choice rather than a filler." },
            { title: "Solid Color Fill", desc: "Adds a solid color background around your image. Choose from preset swatches or pick any custom color. Works great for product photos, brand assets, and minimalist aesthetics." },
            { title: "Smart Crop", desc: "Automatically crops the center of your image into a perfect square. No background needed -- ideal when your subject is centered and you want maximum visibility." },
            { title: "Social Media Presets", desc: "Select your platform from the presets panel and instantly resize to the exact dimensions required. Covers Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, and more." },
          ].map((c) => (
            <div key={c.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Social Media Square Image Dimensions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Platform</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Square Post</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Profile Picture</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Story / Reel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plat: "Instagram", post: "1080x1080", prof: "320x320", story: "1080x1920" },
                  { plat: "Facebook", post: "1200x1200", prof: "180x180", story: "1080x1920" },
                  { plat: "X / Twitter", post: "1200x1200", prof: "400x400", story: "--" },
                  { plat: "LinkedIn", post: "1200x1200", prof: "400x400", story: "--" },
                  { plat: "TikTok", post: "1080x1080", prof: "200x200", story: "1080x1920" },
                  { plat: "YouTube", post: "1280x1280", prof: "800x800", story: "--" },
                  { plat: "Pinterest", post: "1000x1000", prof: "165x165", story: "--" },
                ].map((r) => (
                  <tr key={r.plat} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-3">{r.plat}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.post}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.prof}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.story}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Pro Tips for Square Images</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Use Dynamic Blur when your image has a busy background that cannot be cropped cleanly -- the blur creates a seamless extension.</li>
              <li>For brand consistency, use Solid Color fill with your brand color as the background.</li>
              <li>Keep 10–15% padding around your subject when using blur backgrounds to prevent important content from touching the edge.</li>
              <li>Square profile pictures should have the subject centered and filling at least 70% of the frame for recognizability at small sizes.</li>
              <li>Export as PNG for sharp text and logos; use JPEG or WebP for photographs to keep file sizes manageable.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Why Make Images Square?</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Consistent feed aesthetic:</strong> Square images create a uniform grid on Instagram and other platforms that display thumbnails in a gallery.</li>
              <li><strong className="text-[#e6edf5]">Better engagement:</strong> Square images take up more visual space on mobile feeds than landscape images, increasing scroll-stopping power.</li>
              <li><strong className="text-[#e6edf5]">Universal compatibility:</strong> Squares work everywhere -- no awkward cropping or letterboxing when shared across platforms.</li>
              <li><strong className="text-[#e6edf5]">Professional appearance:</strong> Consistently sized square images make your profile look curated and professional.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

