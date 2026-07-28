"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { EditorCanvas, type EditorCanvasHandle } from "@/components/editor/canvas";
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
  const [exportModal, setExportModal] = useState<{ open: boolean; blob: Blob | null; url: string }>({ open: false, blob: null, url: "" });
  const [modalLoading, setModalLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const editorRef = useRef<EditorCanvasHandle>(null);

  const presets = SOCIAL_PRESETS as Record<string, {
    label: string; description: string;
    types: Record<string, { label: string; w: number; h: number; aspect: string }>;
  }>;

  const activeTypes = socialPlatform ? presets[socialPlatform]?.types : null;

  const activePresetLabel = (() => {
    if (!state.targetWidth || !state.targetHeight) return null;
    for (const [, pv] of Object.entries(presets)) {
      for (const [, tv] of Object.entries(pv.types)) {
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

  const getFullBlob = useCallback(async (): Promise<Blob | null> => {
    if (!editorRef.current) return null;
    const fmt = FORMATS.find((f) => f.value === exportFormat)!;
    return editorRef.current.exportToBlob(fmt.mime);
  }, [exportFormat]);

  const handleOpenExportModal = useCallback(async () => {
    if (!editorRef.current || !state.image) return;
    setModalLoading(true);
    const fmt = FORMATS.find((f) => f.value === exportFormat)!;
    const blob = await editorRef.current.exportToBlob(fmt.mime, 400);
    if (!blob) { setModalLoading(false); return; }
    const url = URL.createObjectURL(blob);
    setExportModal({ open: true, blob, url });
    setModalLoading(false);
  }, [state.image, exportFormat]);

  const handleDownload = useCallback(async () => {
    if (!state.image) return;
    trackEvent("download", downloadEventName);
    try {
      const fmt = FORMATS.find((f) => f.value === exportFormat)!;
      const blob = await getFullBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `${downloadFilename}.${fmt.ext}`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setToast("Download failed — please try again");
    }
    setExportModal({ open: false, blob: null, url: "" });
  }, [state.image, downloadFilename, downloadEventName, exportFormat, getFullBlob]);

  const handleShareNative = useCallback(async () => {
    try {
      const fmt = FORMATS.find((f) => f.value === exportFormat)!;
      const blob = await getFullBlob();
      if (!blob) return;
      const file = new File([blob], `${downloadFilename}.${fmt.ext}`, { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ title: "SquarePic", text: "Made with SquarePic", files: [file] });
          trackEvent("share", `${downloadEventName}-native`);
        } catch { /* user dismissed */ }
      } else {
        try {
          await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
          setToast("Image copied to clipboard — paste it anywhere");
        } catch {
          setToast("Your browser doesn't support sharing images directly. Try downloading instead.");
        }
      }
    } catch {
      setToast("Something went wrong. Try downloading instead.");
    }
    setExportModal({ open: false, blob: null, url: "" });
  }, [exportFormat, downloadFilename, downloadEventName, getFullBlob]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Link copied to clipboard");
      trackEvent("share", `${downloadEventName}-link`);
    } catch {
      setToast("Could not copy link");
    }
  }, [downloadEventName]);

  const handleCopyImage = useCallback(async () => {
    try {
      const blob = await getFullBlob();
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setToast("Image copied to clipboard — paste it anywhere");
      trackEvent("share", `${downloadEventName}-clipboard`);
    } catch {
      setToast("Could not copy image to clipboard");
    }
  }, [getFullBlob, downloadEventName]);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(toastTimer.current);
  }, [toast]);

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
    <section className="max-w-[1100px] mx-auto px-3 md:px-4 w-full">
      <motion.div
        initial={{ opacity: 0.99, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-[8px] md:p-3"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

        <div className="flex flex-row gap-2 md:gap-3 w-full max-md:flex-col max-md:gap-2">
          <div className="flex-1 flex items-center justify-center p-2 md:p-3 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-lg border border-[rgba(255,255,255,0.10)] relative overflow-hidden min-h-[300px] max-md:min-h-[240px]">
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
                <div className="w-full max-w-[520px]">
                  <DropZone onFile={handleFile} compact />
                </div>
                {badge && (
                  <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.08em] uppercase text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-3 py-1 rounded-sm">
                    {badge}
                  </span>
                )}
              </div>
            ) : (
              <EditorCanvas ref={editorRef} state={state} onStateChange={onStateChange} />
            )}
          </div>

          <aside className="flex flex-col gap-1.5 w-[240px] xl:w-[260px] shrink-0 max-md:w-full max-md:max-h-[260px] max-md:overflow-y-auto">
            {/* Padding */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Outer Border (Padding)</h3>
              <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
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
              className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Style</h3>
              <div className="flex gap-1 bg-[rgba(0,0,0,0.25)] p-[3px] rounded-md border border-[rgba(255,255,255,0.06)]">
                {STYLE_MODES.map((m) => (
                  <button
                    key={m}
                    onClick={() => onStateChange({ mode: m })}
                    className={`flex-1 bg-transparent border-none text-[0.62rem] font-semibold px-1.5 py-1 rounded-sm cursor-pointer transition-all ${
                      state.mode === m
                        ? "bg-[rgba(255,255,255,0.08)] text-white"
                        : "text-[#8d9aaa] hover:text-[#e6edf5]"
                    }`}
                  >
                    {m === "blur" ? "Blur" : m === "solid" ? "Solid" : "Crop"}
                  </button>
                ))}
              </div>

              {state.mode === "blur" && (
                <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Blur Intensity</h3>
                  <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Blur</span>
                    <span>{state.blurAmount}px</span>
                  </div>
                  <input type="range" min="0" max="100" value={state.blurAmount}
                    onChange={(e) => onStateChange({ blurAmount: Number(e.target.value) })} />
                </div>
              )}

              {state.mode === "solid" && (
                <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Background Color</h3>
                  <div className="grid grid-cols-6 gap-1 mb-1.5">
                    {colorSwatches.map((c) => (
                      <button
                        key={c}
                        onClick={() => onStateChange({ backgroundColor: c })}
                        className="w-full aspect-square rounded-sm cursor-pointer border-2 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.06)]"
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
              className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Adjustments</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Zoom</span>
                    <span>{state.imageScale}%</span>
                  </div>
                  <input type="range" min="50" max="200" value={state.imageScale}
                    onChange={(e) => onStateChange({ imageScale: Number(e.target.value) })} />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
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
              className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Social Size</h3>
              {activePresetLabel && (
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[0.6rem] text-[var(--accent)] font-semibold truncate mr-2">{activePresetLabel}</span>
                  <button
                    onClick={() => { onStateChange({ targetWidth: 0, targetHeight: 0 }); setSocialPlatform(null); }}
                    className="text-[0.55rem] text-[#576675] font-bold uppercase tracking-wider hover:text-[#8d9aaa] transition-colors shrink-0"
                  >
                    Clear
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-1 mb-1.5">
                {Object.entries(presets).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setSocialPlatform(socialPlatform === key ? null : key)}
                    className={`text-[0.55rem] font-bold px-1.5 py-0.5 rounded-sm border transition-all ${
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
                        className={`flex items-center justify-between px-1.5 py-1 rounded-sm text-[0.6rem] font-semibold border transition-all ${
                          isActive
                            ? "bg-[var(--accent)]/8 text-[var(--accent)] border-[var(--accent)]/12"
                            : "bg-transparent text-[#8d9aaa] border-transparent hover:bg-[rgba(255,255,255,0.03)] hover:text-[#e6edf5]"
                        }`}
                      >
                        <span>{tv.label}</span>
                        <span className="text-[0.5rem] opacity-60">{tv.w}x{tv.h}</span>
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
              className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Export</h3>
              <div className="flex gap-1 mb-1.5">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setExportFormat(fmt.value)}
                    className={`flex-1 text-[0.55rem] font-bold px-1 py-1 rounded-sm border transition-all ${
                      exportFormat === fmt.value
                        ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa] hover:border-[rgba(255,255,255,0.10)]"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleOpenExportModal}
                disabled={!hasImage || modalLoading}
                className="w-full bg-[var(--accent)] text-black border-none py-2 rounded-lg font-extrabold text-xs cursor-pointer transition-all duration-200 hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_20px_var(--accent-glow)]"
              >
                {modalLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Exporting...
                  </span>
                ) : "Download & Share"}
              </button>
            </motion.div>
          </aside>
        </div>
      </motion.div>

      {exportModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 md:p-6"
          onClick={() => { setExportModal({ open: false, blob: null, url: "" }); }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0e16] border border-[rgba(255,255,255,0.08)] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[0.75rem] font-extrabold uppercase tracking-[0.1em] text-[#e6edf5]">Export</h3>
                <button
                  onClick={() => { setExportModal({ open: false, blob: null, url: "" }); }}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] w-7 h-7 rounded-md flex items-center justify-center cursor-pointer hover:text-[#e6edf5] transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden bg-[#030406] border border-[rgba(255,255,255,0.06)] mb-3 flex items-center justify-center">
                {exportModal.url ? (
                  <img src={exportModal.url} alt="Preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8"><svg className="animate-spin h-5 w-5 text-[var(--accent)]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg></div>
                )}
              </div>

              <div className="flex items-center justify-between text-[0.65rem] text-[#8d9aaa] mb-3">
                <span className="font-semibold">
                  {state.targetWidth > 0 ? state.targetWidth : state.image?.width || 0}
                  &times;
                  {state.targetHeight > 0 ? state.targetHeight : state.image?.height || 0} px
                </span>
                <span className="font-semibold">{exportFormat.toUpperCase()}</span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleDownload}
                  className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 active:brightness-125 shadow-[0_4px_20px_var(--accent-glow)]"
                >
                  Download {exportFormat.toUpperCase()}
                </button>

                <div className="flex gap-1.5">
                  {[
                    { label: "Instagram", color: "#E4405F", icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 010 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" },
                    { label: "X", color: "#fff", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                    { label: "WhatsApp", color: "#25D366", icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
                    { label: "Telegram", color: "#0088cc", icon: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={handleShareNative}
                      title={`Share on ${s.label}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg py-2 cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.07)] active:brightness-125"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={s.color}><path d={s.icon} /></svg>
                      <span className="text-[0.55rem] font-bold text-[#8d9aaa] hidden md:inline">{s.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopyImage}
                  className="w-full bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:text-[#e6edf5] hover:border-[rgba(255,255,255,0.10)] flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  Copy Image
                </button>

                <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-lg px-3 py-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#576675" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                  <span className="flex-1 text-[0.6rem] text-[#576675] font-mono truncate" title={typeof window !== "undefined" ? window.location.href : "squarepic.io"}>
                    {typeof window !== "undefined" ? window.location.href : "squarepic.io"}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="text-[0.55rem] font-bold text-[var(--accent)] uppercase tracking-wider cursor-pointer hover:opacity-80 shrink-0"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e2328] border border-[rgba(255,255,255,0.1)] text-[#e6edf5] text-[0.7rem] font-semibold px-4 py-2 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] animate-fade-up">
          {toast}
        </div>
      )}
    </section>
  );
}
