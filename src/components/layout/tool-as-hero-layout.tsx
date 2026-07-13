"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { EditorCanvas } from "@/components/editor/canvas";
import { DropZone } from "@/components/editor/drop-zone";
import type { EditorState } from "@/lib/editor-renderer";
import { trackEvent } from "@/lib/analytics";
import SOCIAL_PRESETS from "@/data/social-presets.json";

type ExportFormat = "png" | "jpeg" | "webp";

const FORMATS: { value: ExportFormat; label: string; ext: string; mime: string }[] = [
  { value: "png", label: "PNG", ext: "png", mime: "image/png" },
  { value: "jpeg", label: "JPEG", ext: "jpg", mime: "image/jpeg" },
  { value: "webp", label: "WebP", ext: "webp", mime: "image/webp" },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
const STYLE_MODES = ["blur", "solid", "crop"] as const;

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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
  const [uploading, setUploading] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png");
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);
  const estimateTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const captureEstimate = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) { setEstimatedSize(null); return; }
    const fmt = FORMATS.find((f) => f.value === exportFormat)!;
    canvas.toBlob((blob) => {
      if (blob) setEstimatedSize(blob.size);
    }, fmt.mime);
  }, [exportFormat]);

  useEffect(() => {
    clearTimeout(estimateTimer.current);
    estimateTimer.current = setTimeout(captureEstimate, 400);
  }, [state.image, state.paddingPercent, state.imageScale, state.cornerRadius, state.mode, state.blurAmount, state.backgroundColor, state.targetWidth, state.targetHeight, exportFormat, captureEstimate]);

  const presets = SOCIAL_PRESETS as Record<string, {
    label: string; description: string;
    types: Record<string, { label: string; w: number; h: number; aspect: string }>;
  }>;

  const activeTypes = socialPlatform ? presets[socialPlatform]?.types : null;

  const activePresetLabel = (() => {
    if (!state.targetWidth || !state.targetHeight) return null;
    for (const [pk, pv] of Object.entries(presets)) {
      for (const [tk, tv] of Object.entries(pv.types)) {
        if (tv.w === state.targetWidth && tv.h === state.targetHeight) return `${pv.label} - ${tv.label}`;
      }
    }
    return `${state.targetWidth}x${state.targetHeight}`;
  })();

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
      setUploading(true);
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setUploading(false);
        onStateChange({ image: img });
      };
      img.onerror = () => {
        setUploading(false);
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
    const fmt = FORMATS.find((f) => f.value === exportFormat)!;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `${downloadFilename}.${fmt.ext}`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    }, fmt.mime);
  }, [state.image, downloadFilename, downloadEventName, exportFormat]);

  const renderHeadline = () => {
    const nl = (s: string) => s.split("\n").map((p, i) => i ? [<br key={i} />, p] : p);
    if (!highlightWord) return nl(headline);
    const idx = headline.indexOf(highlightWord);
    if (idx === -1) return nl(headline);
    const before = headline.slice(0, idx);
    const after = headline.slice(idx + highlightWord.length);
    return (
      <>
        {nl(before)}
        <span className="relative inline-block">
          {highlightWord}
          <span className="absolute left-0 bottom-1 w-full h-1.5 bg-[var(--accent)] opacity-15 rounded-sm" />
        </span>
        {nl(after)}
      </>
    );
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 w-full">
      <motion.div
        initial={{ opacity: 0.99, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-4 md:p-5"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

        <div className="flex flex-row gap-4 md:gap-5 w-full max-md:flex-col max-md:gap-4" style={{ maxWidth: 1360 }}>
          <div className="flex-1 flex items-center justify-center p-4 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-lg border border-[rgba(255,255,255,0.10)] relative overflow-hidden min-h-[450px] max-md:min-h-[350px]">
            {!hasImage ? (
              <div className="flex flex-col items-center justify-center gap-5 w-full h-full text-center relative">
                {uploading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(3,4,6,0.85)]">
                    <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[0.75rem] text-[#8d9aaa] font-semibold">Loading image...</span>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0.99, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4"
                >
                  <h1 className="text-[clamp(1.1rem,2.2vw,1.76rem)] font-black tracking-[-2px] leading-[1.05] text-[#8d9aaa] max-w-[600px]">
                    {renderHeadline()}
                  </h1>
                  {microcopy && (
                    <p className="text-[0.85rem] text-[#8d9aaa] max-w-[480px] font-medium leading-relaxed">
                      {microcopy}
                    </p>
                  )}
                </motion.div>
                <div className="w-full max-w-[400px]">
                  <DropZone onFile={handleFile} compact />
                </div>
                {badge && (
                  <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.08em] uppercase text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-3 py-1 rounded-sm">
                    {badge}
                  </span>
                )}
              </div>
            ) : (
              <EditorCanvas state={state} onStateChange={onStateChange} />
            )}
          </div>

          <aside className="flex flex-col gap-3 w-[310px] shrink-0 max-md:w-full max-md:max-h-[400px] max-md:overflow-y-auto">
            {/* Padding */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5"
            >
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2">Outer Border (Padding)</h3>
              <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1.5">
                <span>Padding</span>
                <span>{state.paddingPercent}%</span>
              </div>
              <input
                type="range" min="0" max="40" value={state.paddingPercent}
                onChange={(e) => onStateChange({ paddingPercent: Number(e.target.value) })}
              />
            </motion.div>

            {/* Style + conditional sub-panel */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5"
            >
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2">Style</h3>
              <div className="flex gap-1 bg-[rgba(0,0,0,0.25)] p-[3px] rounded-md border border-[rgba(255,255,255,0.06)]">
                {STYLE_MODES.map((m) => (
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

              {state.mode === "blur" && (
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2">Blur Intensity</h3>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1.5">
                    <span>Blur</span>
                    <span>{state.blurAmount}px</span>
                  </div>
                  <input type="range" min="0" max="100" value={state.blurAmount}
                    onChange={(e) => onStateChange({ blurAmount: Number(e.target.value) })} />
                </div>
              )}

              {state.mode === "solid" && (
                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2">Background Color</h3>
                  <div className="grid grid-cols-8 gap-1.5 mb-2.5">
                    {colorSwatches.map((c) => (
                      <button
                        key={c}
                        onClick={() => onStateChange({ backgroundColor: c })}
                        className="w-full aspect-square rounded-md cursor-pointer border-2 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                        style={{
                          background: c,
                          borderColor: state.backgroundColor === c ? "var(--accent)" : "transparent",
                          boxShadow: state.backgroundColor === c
                            ? "0 0 0 2px #07080b, 0 0 0 3px var(--accent)"
                            : "0 0 0 1px rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>
                  <input type="color" value={state.backgroundColor}
                    onChange={(e) => onStateChange({ backgroundColor: e.target.value })} />
                </div>
              )}
            </motion.div>

            {/* Adjustments */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5"
            >
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Adjustments</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1.5">
                    <span>Zoom</span>
                    <span>{state.imageScale}%</span>
                  </div>
                  <input type="range" min="50" max="200" value={state.imageScale}
                    onChange={(e) => onStateChange({ imageScale: Number(e.target.value) })} />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1.5">
                    <span>Edge Radius</span>
                    <span>{state.cornerRadius}px</span>
                  </div>
                  <input type="range" min="0" max="100" value={state.cornerRadius}
                    onChange={(e) => onStateChange({ cornerRadius: Number(e.target.value) })} />
                </div>
              </div>
            </motion.div>

            {/* Social Size */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5"
            >
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2">Social Size</h3>
              {activePresetLabel && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.65rem] text-[var(--accent)] font-semibold truncate mr-2">{activePresetLabel}</span>
                  <button
                    onClick={() => { onStateChange({ targetWidth: 0, targetHeight: 0 }); setSocialPlatform(null); }}
                    className="text-[0.6rem] text-[#576675] font-bold uppercase tracking-wider hover:text-[#8d9aaa] transition-colors shrink-0"
                  >
                    Clear
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-1 mb-2">
                {Object.entries(presets).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setSocialPlatform(socialPlatform === key ? null : key)}
                    className={`text-[0.6rem] font-bold px-2 py-1 rounded-sm border transition-all ${
                      socialPlatform === key
                        ? "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20"
                        : "bg-transparent text-[#576675] border-[rgba(255,255,255,0.06)] hover:text-[#8d9aaa] hover:border-[rgba(255,255,255,0.10)]"
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
              {activeTypes && (
                <div className="flex flex-col gap-0.5">
                  {Object.entries(activeTypes).map(([tk, tv]) => {
                    const isActive = state.targetWidth === tv.w && state.targetHeight === tv.h;
                    return (
                      <button
                        key={tk}
                        onClick={() => { onStateChange({ targetWidth: tv.w, targetHeight: tv.h }); }}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-sm text-[0.65rem] font-semibold border transition-all ${
                          isActive
                            ? "bg-[var(--accent)]/8 text-[var(--accent)] border-[var(--accent)]/12"
                            : "bg-transparent text-[#8d9aaa] border-transparent hover:bg-[rgba(255,255,255,0.03)] hover:text-[#e6edf5]"
                        }`}
                      >
                        <span>{tv.label}</span>
                        <span className="text-[0.55rem] opacity-60">{tv.w}x{tv.h}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Export + Download */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5"
            >
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2">Export</h3>
              <div className="flex gap-1 mb-2">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setExportFormat(fmt.value)}
                    className={`flex-1 text-[0.6rem] font-bold px-1 py-1.5 rounded-sm border transition-all ${
                      exportFormat === fmt.value
                        ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa] hover:border-[rgba(255,255,255,0.10)]"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
              {hasImage && estimatedSize !== null && (
                <div className="text-[0.65rem] text-[#8d9aaa] text-center mb-2">
                  Est. size: <strong className="text-[var(--accent)]">{formatBytes(estimatedSize)}</strong>
                </div>
              )}

              <motion.button
                whileHover={hasImage ? { scale: 1.02 } : {}}
                whileTap={hasImage ? { scale: 0.97 } : {}}
                onClick={handleDownload}
                disabled={!hasImage}
                className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all duration-200 hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_20px_var(--accent-glow)]"
              >
                Download {exportFormat.toUpperCase()}
              </motion.button>
            </motion.div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
