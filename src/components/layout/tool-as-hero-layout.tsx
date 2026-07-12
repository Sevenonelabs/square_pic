"use client";

import { useCallback } from "react";
import { EditorCanvas } from "@/components/editor/canvas";
import { DropZone } from "@/components/editor/drop-zone";
import type { EditorState } from "@/lib/editor-renderer";
import { trackEvent } from "@/lib/analytics";

export interface ToolAsHeroLayoutProps {
  state: EditorState;
  onStateChange: (update: Partial<EditorState>) => void;
  headline: string;
  highlightWord?: string;
  microcopy?: string;
  badge?: string;
  colorSwatches: string[];
  downloadFilename?: string;
  downloadEventName?: string;
}

const MAX_SIZE_MB = 20;

export function ToolAsHeroLayout({
  state,
  onStateChange,
  headline,
  highlightWord,
  microcopy,
  badge,
  colorSwatches,
  downloadFilename = "squarepic-photo",
  downloadEventName = "editor-square-image",
}: ToolAsHeroLayoutProps) {
  const hasImage = state.image !== null;

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Invalid file type. Please upload an image.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`File is too large. Please upload an image under ${MAX_SIZE_MB} MB.`);
        return;
      }
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        onStateChange({ image: img });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        alert("Could not load the image. The file may be corrupted.");
      };
      img.src = url;
    },
    [onStateChange]
  );

  const handleDownload = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas || !state.image) return;
    trackEvent("download", downloadEventName);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `${downloadFilename}.png`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [state.image, downloadFilename, downloadEventName]);

  const renderHeadline = () => {
    if (!highlightWord) return headline;
    const idx = headline.indexOf(highlightWord);
    if (idx === -1) return headline;
    const before = headline.slice(0, idx);
    const after = headline.slice(idx + highlightWord.length);
    return (
      <>
        {before}
        <span className="relative inline-block">
          {highlightWord}
          <span className="absolute left-0 bottom-1 w-full h-1.5 bg-[var(--accent)] opacity-15 rounded-sm" />
        </span>
        {after}
      </>
    );
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 w-full max-md:px-3">
      <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-lg p-5 relative max-md:p-2">
        <div className="flex flex-row gap-5 w-full max-md:flex-col max-md:gap-3" style={{ maxWidth: 1360 }}>
          <div className="flex-1 flex items-center justify-center p-3 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-md border border-[rgba(255,255,255,0.10)] relative overflow-hidden min-h-[450px] max-md:min-h-[350px]">
            {!hasImage ? (
              <div className="flex flex-col items-center justify-center gap-5 w-full h-full text-center">
                {badge && (
                  <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-sm px-4 py-1.5 text-[0.68rem] text-[#06b6d4] font-semibold">
                    <span className="text-[#06b6d4] font-extrabold">✓</span> {badge}
                  </div>
                )}
                <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-2px] leading-[1.05] text-[#e6edf5] max-w-[600px]">
                  {renderHeadline()}
                </h1>
                {microcopy && (
                  <p className="text-[0.85rem] text-[#8d9aaa] max-w-[480px] font-medium leading-relaxed">
                    {microcopy}
                  </p>
                )}
                <div className="w-full max-w-[400px]">
                  <DropZone onFile={handleFile}>
                    <svg className="w-10 h-10 text-[var(--accent)] opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <button className="bg-[var(--accent)] text-black border-none px-5 py-2.5 rounded-md font-extrabold text-sm cursor-pointer transition-all duration-300 hover:brightness-110 shadow-[0_4px_16px_var(--accent-glow)]" type="button">
                      Upload Your Image
                    </button>
                  </DropZone>
                </div>
              </div>
            ) : (
              <EditorCanvas state={state} onStateChange={onStateChange} />
            )}
          </div>

          <aside className="flex flex-col gap-2 w-[310px] shrink-0 max-md:w-full">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Outer Border (Padding)</h3>
              <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                <span>Padding</span>
                <span>{state.paddingPercent}%</span>
              </div>
              <input
                type="range" min="0" max="40" value={state.paddingPercent}
                onChange={(e) => onStateChange({ paddingPercent: Number(e.target.value) })}
                className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none accent-[var(--accent)]"
              />
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Style</h3>
              <div className="flex gap-1 bg-[rgba(0,0,0,0.25)] p-[3px] rounded-sm border border-[rgba(255,255,255,0.06)]">
                {(["blur", "solid", "crop"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => onStateChange({ mode: m })}
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
                <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Blur Intensity</h3>
                <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                  <span>Blur</span>
                  <span>{state.blurAmount}px</span>
                </div>
                <input type="range" min="0" max="100" value={state.blurAmount}
                  onChange={(e) => onStateChange({ blurAmount: Number(e.target.value) })}
                  className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none" />
              </div>
            )}

            {state.mode === "solid" && (
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
                <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Background Color</h3>
                <div className="grid grid-cols-8 gap-1 mb-2.5">
                  {colorSwatches.map((c) => (
                    <button
                      key={c}
                      onClick={() => onStateChange({ backgroundColor: c })}
                      className="w-full aspect-square rounded-sm cursor-pointer border-2 transition-all hover:scale-110"
                      style={{
                        background: c,
                        borderColor: state.backgroundColor === c ? "var(--accent)" : "transparent",
                        boxShadow: state.backgroundColor === c ? "0 0 0 2px #07080b, 0 0 0 3px var(--accent)" : "none",
                      }}
                    />
                  ))}
                </div>
                <input type="color" value={state.backgroundColor}
                  onChange={(e) => onStateChange({ backgroundColor: e.target.value })}
                  className="w-full h-[30px] border border-[rgba(255,255,255,0.06)] rounded-sm bg-transparent cursor-pointer p-0.5" />
              </div>
            )}

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Adjustments</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Zoom</span>
                    <span>{state.imageScale}%</span>
                  </div>
                  <input type="range" min="50" max="200" value={state.imageScale}
                    onChange={(e) => onStateChange({ imageScale: Number(e.target.value) })}
                    className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Edge Radius</span>
                    <span>{state.cornerRadius}px</span>
                  </div>
                  <input type="range" min="0" max="100" value={state.cornerRadius}
                    onChange={(e) => onStateChange({ cornerRadius: Number(e.target.value) })}
                    className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none" />
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={!hasImage}
              className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-md font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_16px_var(--accent-glow)]"
            >
              Download Square Image
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
