"use client";

import { useState, useCallback } from "react";
import { EditorCanvas } from "@/components/editor/canvas";
import type { EditorState } from "@/lib/editor-renderer";
import { trackEvent } from "@/lib/analytics";

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
      {/* Landing / Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-sm px-4 py-1.5 text-[0.68rem] text-[#06b6d4] font-semibold mb-8">
          <span className="text-[#06b6d4] font-extrabold">✓</span> 100% Free &middot; No Signup &middot; Privacy-First
        </div>
        <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-black tracking-[-2.5px] leading-[1.05] text-[#e6edf5] mb-5">
          Make Any Image<br />
          <span className="relative inline-block">
            Perfectly Square
            <span className="absolute left-0 bottom-1 w-full h-1.5 bg-[var(--accent)] opacity-15 rounded-sm" />
          </span> Online
        </h1>
        <p className="text-[1.05rem] text-[#8d9aaa] leading-relaxed max-w-[540px] mb-8 font-medium">
          SquarePic is a free online square image maker and photo editor. Resize, crop, and convert your photos for Instagram, Facebook, X, LinkedIn, TikTok, YouTube, Pinterest, and more. Choose from blur backgrounds, solid color fills, or smart crop modes to create perfect square images without losing any part of your original photo. All editing happens locally in your browser with no uploads, no watermarks, and no signup required. Export in PNG, JPEG, or WebP format at full quality.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href="/edit"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-97 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Start Editing Free
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-sm bg-black/15 transition-transform duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
          <span className="text-[0.75rem] text-[#576675] font-medium">No account needed &middot; Works in your browser</span>
        </div>
      </section>

      {/* Editing Tool Section */}
      <section className="max-w-[1400px] mx-auto px-6 pb-20 w-full max-md:px-3">
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-lg p-5 relative max-md:p-2">
          <div className="flex flex-row gap-5 w-full max-md:flex-col max-md:gap-3" style={{ maxWidth: 1360 }}>
            <EditorCanvas state={state} onStateChange={update} />

            <aside className="flex flex-col gap-2 w-[310px] shrink-0 max-md:w-full">
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
      </section>
    </>
  );
}
