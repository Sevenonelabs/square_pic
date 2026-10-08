"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { EditorCanvas, type EditorCanvasHandle } from "@/components/editor/canvas";
import { DropZone } from "@/components/editor/drop-zone";
import { getExportDimensions, MAX_EXPORT_EDGE, type EditorState } from "@/lib/editor-renderer";
import { trackEvent, trackToolEvent } from "@/lib/analytics";
import { isImageFile } from "@/lib/image-input";
import { downloadImage } from "@/lib/image-export";
import SOCIAL_PRESETS from "@/data/social-presets.json";

type ExportFormat = "png" | "jpeg" | "webp";

const FORMATS: { value: ExportFormat; label: string; ext: string; mime: string }[] = [
  { value: "png", label: "PNG", ext: "png", mime: "image/png" },
  { value: "jpeg", label: "JPEG", ext: "jpg", mime: "image/jpeg" },
  { value: "webp", label: "WebP", ext: "webp", mime: "image/webp" },
];

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
  initialPlatform?: string;
  showHeading?: boolean;
}

const MAX_SIZE_MB = 20;
const STYLE_MODES = ["blur", "solid", "transparent", "crop"] as const;
const STYLE_LABELS = { blur: "Blur", solid: "Solid", transparent: "Transparent", crop: "Crop" };

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
  initialPlatform,
  showHeading = true,
}: ToolAsHeroLayoutProps) {
  const Heading = showHeading ? "h1" : "h2";
  const toolName = initialPlatform ? "resizer" : "square";
  const { width: exportWidth, height: exportHeight, limited: exportLimited } = getExportDimensions(state);
  const hasImage = state.image !== null;
  const [uploading, setUploading] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState<string | null>(initialPlatform ?? null);
  const [selectedExportFormat, setExportFormat] = useState<ExportFormat>("png");
  const exportFormat = state.mode === "transparent" ? "png" : selectedExportFormat;
  const [squareEdge, setSquareEdge] = useState("");
  const validSquareEdge = /^\d+$/.test(squareEdge) && Number(squareEdge) >= 1 && Number(squareEdge) <= MAX_EXPORT_EDGE;
  const [exportModal, setExportModal] = useState<{ open: boolean; blob: Blob | null; url: string }>({ open: false, blob: null, url: "" });
  const [modalLoading, setModalLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [error, setError] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const editorRef = useRef<EditorCanvasHandle>(null);

  const presets = SOCIAL_PRESETS as Record<string, {
    label: string; description: string;
    types: Record<string, { label: string; w: number; h: number; aspect: string }>;
  }>;

  const activeTypes = socialPlatform ? presets[socialPlatform]?.types : null;

  const activePresetLabel = (() => {
    if (!state.targetWidth || !state.targetHeight) return null;
    const candidates = socialPlatform ? [presets[socialPlatform]] : Object.values(presets);
    for (const pv of candidates) {
      for (const [, tv] of Object.entries(pv.types)) {
        if (tv.w === state.targetWidth && tv.h === state.targetHeight) return `${pv.label} - ${tv.label}`;
      }
    }
    return `${state.targetWidth}x${state.targetHeight}`;
  })();

  const handleFile = useCallback(
    (file: File) => {
      if (!isImageFile(file)) {
        setError("Choose an image file, such as PNG, JPEG or WebP.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`This image exceeds ${MAX_SIZE_MB} MB. Choose a smaller image and try again.`);
        return;
      }
      setError(null);
      setUploading(true);
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setUploading(false);
        trackToolEvent("upload_accepted", toolName, undefined, { mode: state.mode, source: "upload" });
        onStateChange({ image: img });
      };
      img.onerror = () => {
        setUploading(false);
        URL.revokeObjectURL(url);
        trackToolEvent("processing_error", toolName);
        setError("This image could not be opened. Choose another image or save it as PNG or JPEG and try again.");
      };
      img.src = url;
    },
    [onStateChange, toolName, state.mode]
  );

  const handleTrySample = () => {
    setError(null);
    setUploading(true);
    const img = new Image();
    img.onload = () => {
      setUploading(false);
      trackToolEvent("upload_accepted", toolName, undefined, { mode: state.mode, source: "sample" });
      onStateChange({ image: img });
    };
    img.onerror = () => { setUploading(false); setError("The sample could not be opened. Upload your own image to try the editor."); };
    img.src = "/examples/portrait-source.webp";
  };

  const getFullBlob = useCallback(async (): Promise<Blob | null> => {
    if (!editorRef.current) return null;
    const fmt = FORMATS.find((f) => f.value === exportFormat)!;
    return editorRef.current.exportToBlob(fmt.mime);
  }, [exportFormat]);

  const handleOpenExportModal = useCallback(async () => {
    if (!editorRef.current || !state.image) return;
    setError(null);
    setModalLoading(true);
    try {
      const fmt = FORMATS.find((f) => f.value === exportFormat)!;
      const blob = await editorRef.current.exportToBlob(fmt.mime);
      if (!blob) throw new Error("Image preview failed");
      trackToolEvent("processing_success", toolName, exportFormat, { mode: state.mode });
      const url = URL.createObjectURL(blob);
      setExportModal({ open: true, blob, url });
    } catch {
      trackToolEvent("processing_error", toolName, exportFormat);
      setError("Image preview failed. Try another export format, then select Download & Share again.");
    } finally {
      setModalLoading(false);
    }
  }, [state.image, state.mode, exportFormat, toolName]);

  const handleDownload = useCallback(async () => {
    if (!state.image) return;
    try {
      const blob = exportModal.blob ?? await getFullBlob();
      if (!blob) throw new Error("Image export failed");
      downloadImage(blob, downloadFilename);
      trackToolEvent("download", toolName, exportFormat, { mode: state.mode });
    } catch {
      trackToolEvent("processing_error", toolName, exportFormat);
      setError("Download failed. Try another export format, then select Download & Share again.");
    }
    setExportModal({ open: false, blob: null, url: "" });
  }, [state.image, state.mode, downloadFilename, exportFormat, getFullBlob, toolName, exportModal.blob]);

  const handleShareNative = useCallback(async () => {
    setError(null);
    try {
      // The preview is prepared before the click, preserving native share's
      // user activation on Safari and other browsers that require it.
      const blob = exportModal.blob;
      if (!blob) throw new Error("Image export failed");
      const fmt = FORMATS.find((f) => f.value === exportFormat)!;
      const file = new File([blob], `${downloadFilename}.${fmt.ext}`, { type: blob.type });
      if (!navigator.share || !navigator.canShare?.({ files: [file] })) {
        setError("Your browser cannot share image files. Use Download to save the image, then attach it in your app.");
        return;
      }
      await navigator.share({ title: "SquarePic", files: [file] });
      trackEvent("share", `${downloadEventName}-native`);
      setExportModal({ open: false, blob: null, url: "" });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError("Sharing failed. Use Download to save the image, then attach it in your app.");
    }
  }, [exportModal.blob, exportFormat, downloadFilename, downloadEventName]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Link copied to clipboard");
      trackEvent("share", `${downloadEventName}-link`);
    } catch {
      setError("Could not copy the link. Copy the address from your browser instead.");
    }
  }, [downloadEventName]);

  const handleCopyImage = useCallback(async () => {
    try {
      if (!editorRef.current) return;
      // Clipboard image support is PNG. Pass the pending blob directly so
      // Safari retains the click's user activation while encoding finishes.
      const png = exportFormat === "png" && exportModal.blob
        ? exportModal.blob
        : editorRef.current.exportToBlob("image/png").then((blob) => {
          if (!blob) throw new Error("Image copy failed");
          return blob;
        });
      await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
      setToast("Image copied to clipboard — paste it anywhere");
      trackEvent("share", `${downloadEventName}-clipboard`);
    } catch {
      setError("Your browser could not copy this image. Use Download to save it instead.");
    }
  }, [exportFormat, downloadEventName, exportModal.blob]);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(toastTimer.current);
  }, [toast]);

  useEffect(() => {
    if (!hasImage) return;
    const frame = requestAnimationFrame(() => workspaceRef.current?.scrollIntoView({ block: "start", behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [hasImage]);

  useEffect(() => {
    const url = exportModal.url;
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [exportModal.url]);

  useEffect(() => {
    if (!exportModal.open) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const button = exportButtonRef.current;
    return () => { dialog?.close(); button?.focus({ preventScroll: true }); };
  }, [exportModal.open]);

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
    <section ref={workspaceRef} data-loaded={hasImage} className="image-editor-workspace max-w-[1100px] mx-auto px-3 md:px-4 w-full">
      {hasImage && <Heading className="sr-only">{headline}</Heading>}
      <motion.div
        initial={{ opacity: 0.99 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="editor-shell relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-[8px] md:p-3"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

        {error && !exportModal.open && (
          <div role="alert" className="editor-error mb-2 rounded-md border border-red-400/30 bg-red-400/10 p-2 text-sm text-red-200 flex items-start gap-2">
            <span className="flex-1">{error}</span>
            <button aria-label="Dismiss error" onClick={() => setError(null)} className="shrink-0 px-2">×</button>
          </div>
        )}
        <div className="editor-stage flex flex-row gap-2 md:gap-3 w-full max-md:flex-col max-md:gap-2">
          <div className="editor-preview flex-1 flex items-center justify-center p-2 md:p-3 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_75%),#030406] rounded-lg border border-[rgba(255,255,255,0.10)] relative overflow-hidden min-w-0 min-h-[420px] max-md:min-h-[380px]">
            {!hasImage ? (
              <div className="flex flex-col items-center justify-center gap-5 max-md:gap-2 w-full h-full text-center relative">
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
                  className="flex flex-col items-center gap-4 max-md:gap-2"
                >
                  <Heading className="text-[clamp(1.1rem,2.2vw,1.76rem)] font-black tracking-[-0.025em] leading-[1.05] text-[#8d9aaa] max-w-[600px]">
                    {renderHeadline()}
                  </Heading>
                  {microcopy && (
                    <p className="text-[0.85rem] max-md:text-xs text-[#8d9aaa] max-w-[480px] font-medium leading-relaxed">
                      {microcopy}
                    </p>
                  )}
                </motion.div>
                <div className="w-full max-w-[520px]">
                  <DropZone onFile={handleFile} compact />
                </div>
                <button onClick={handleTrySample} disabled={uploading} className="min-h-11 px-3 text-sm text-[var(--accent)] underline underline-offset-4 disabled:opacity-50">Try sample image</button>
                <p className="text-xs text-[#8d9aaa] max-w-[420px]">Your image stays in your browser. Website analytics and the referral widget make network requests. <a href="/privacy" className="underline">Privacy details</a>.</p>
                {badge && (
                  <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.08em] uppercase text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-3 py-1 rounded-sm">
                    {badge}
                  </span>
                )}
              </div>
            ) : (
              <EditorCanvas ref={editorRef} state={state} onStateChange={onStateChange} toolName={toolName} onError={setError} />
            )}
          </div>

          <aside className="editor-controls flex flex-col gap-1.5 w-[240px] xl:w-[260px] shrink-0 max-md:w-full">
            <div className="editor-settings tool-scrollbar flex flex-col gap-1.5" role="region" aria-label="Image settings" tabIndex={0}>
            {/* Style + conditional sub-panel */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Style</h3>
              <div className="grid grid-cols-2 max-md:grid-cols-4 max-[359px]:grid-cols-2 gap-1 bg-[rgba(0,0,0,0.25)] p-[3px] rounded-md border border-[rgba(255,255,255,0.06)]">
                {STYLE_MODES.map((m) => (
                  <button
                    key={m}
                    aria-pressed={state.mode === m}
                    onClick={() => onStateChange({ mode: m })}
                    className={`flex-1 bg-transparent border-none text-[0.62rem] font-semibold px-1.5 py-1 rounded-sm cursor-pointer transition-all ${
                      state.mode === m
                        ? "bg-[rgba(255,255,255,0.08)] text-white"
                        : "text-[#8d9aaa] hover:text-[#e6edf5]"
                    }`}
                  >
                    {STYLE_LABELS[m]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#8d9aaa] mt-2 leading-relaxed">
                {state.mode === "crop" ? "Centered crop fills the frame and trims edges. Check subjects near the edges." : state.mode === "transparent" ? "Keep the whole image with transparent padding at 100% zoom. PNG export preserves transparency." : `${STYLE_LABELS[state.mode]} keeps the whole image at 100% zoom. Higher zoom can trim edges.`}
              </p>

              {state.mode === "blur" && (
                <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Blur Intensity</h3>
                  <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Blur</span>
                    <span>{state.blurAmount}px</span>
                  </div>
                  <input aria-label="Blur intensity" type="range" min="0" max="100" value={state.blurAmount}
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
                        aria-label={`Background ${c}`}
                        aria-pressed={state.backgroundColor === c}
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
                  <input aria-label="Background color" type="color" value={state.backgroundColor}
                    onChange={(e) => onStateChange({ backgroundColor: e.target.value })} />
                </div>
              )}
            </motion.div>

            {!initialPlatform && (
              <div className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5">
                <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Square size</h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {[0, 1080, 1200].map((edge) => (
                    <button key={edge} aria-pressed={state.targetWidth === edge && state.targetHeight === edge}
                      onClick={() => { onStateChange({ targetWidth: edge, targetHeight: edge }); setSquareEdge(""); setSocialPlatform(null); }}
                      className="min-h-11 px-2 text-xs font-semibold rounded-sm border border-white/10 text-[#8d9aaa] aria-pressed:text-[var(--accent)] aria-pressed:border-[var(--accent)]/30">
                      {edge ? `${edge} × ${edge}` : "Original size"}
                    </button>
                  ))}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); if (validSquareEdge) { const edge = Number(squareEdge); onStateChange({ targetWidth: edge, targetHeight: edge }); setSocialPlatform(null); } }}>
                  <label htmlFor="square-edge" className="text-xs text-[#8d9aaa]">Custom square edge in pixels</label>
                  <div className="flex gap-1 mt-1">
                    <input id="square-edge" type="number" min="1" max={MAX_EXPORT_EDGE} step="1" inputMode="numeric"
                      value={squareEdge} placeholder={state.targetWidth === state.targetHeight && state.targetWidth > 0 ? String(state.targetWidth) : "800"}
                      onChange={(e) => setSquareEdge(e.target.value)} aria-describedby="square-edge-help" aria-invalid={squareEdge !== "" && !validSquareEdge}
                      className="min-w-0 w-full min-h-11 bg-black/20 border border-white/10 rounded-sm px-2 text-sm text-[#e6edf5]" />
                    <button type="submit" disabled={!validSquareEdge} className="min-h-11 px-3 text-xs font-bold text-[var(--accent)] border border-white/10 rounded-sm disabled:opacity-40">Apply</button>
                  </div>
                  <p id="square-edge-help" className={`text-xs mt-1 ${squareEdge && !validSquareEdge ? "text-red-200" : "text-[#8d9aaa]"}`}>
                    {squareEdge && !validSquareEdge ? "Enter a whole number from 1 to 4096. Your output size has not changed." : "1–4096 px per side. Apply to set equal width and height."}
                  </p>
                </form>
              </div>
            )}

            <div className="bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5">
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Outer Border (Padding)</h3>
              <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
                <span>Padding</span><span>{state.paddingPercent}%</span>
              </div>
              <input aria-label="Padding" type="range" min="0" max="40" value={state.paddingPercent}
                onChange={(e) => onStateChange({ paddingPercent: Number(e.target.value) })} />
            </div>

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
                  <input aria-label="Zoom" type="range" min="50" max="200" value={state.imageScale}
                    onChange={(e) => onStateChange({ imageScale: Number(e.target.value) })} />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[0.62rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Edge Radius</span>
                    <span>{state.cornerRadius}px</span>
                  </div>
                  <input aria-label="Edge radius" type="range" min="0" max="100" value={state.cornerRadius}
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
                    aria-pressed={socialPlatform === key}
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
                        aria-pressed={isActive}
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

            </div>
            <p className="text-[0.65rem] text-[#8d9aaa]">Scroll settings for {initialPlatform ? "styles and platform sizes" : "padding and platform sizes"}.</p>
            {/* Export stays outside the scrolling settings. */}
            <div className="editor-export shrink-0 bg-[rgba(255,255,255,0.005)] border border-[rgba(255,255,255,0.03)] rounded-lg p-2.5"
            >
              <h3 className="text-[0.55rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-1">Export</h3>
              {hasImage && <p className="text-xs text-[#8d9aaa] mb-2" role="status">Output: {exportWidth} x {exportHeight} px. {state.mode === "crop" ? "Crop trims the edges." : state.imageScale > 100 ? "Zoom above 100% may trim edges." : "Full image fits inside the background."} </p>}
              {hasImage && exportLimited && <p className="text-xs text-amber-200 mb-2">Output reduced to the 4096 px limit per side.</p>}
              <div className="flex gap-1 mb-1.5">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.value}
                    aria-pressed={exportFormat === fmt.value}
                    disabled={state.mode === "transparent" && fmt.value !== "png"}
                    onClick={() => setExportFormat(fmt.value)}
                    className={`flex-1 text-[0.55rem] font-bold px-1 py-1 rounded-sm border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
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
                ref={exportButtonRef}
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
            </div>
          </aside>
        </div>
      </motion.div>

      {exportModal.open && (
        <dialog ref={dialogRef} aria-labelledby="export-title"
          className="editor-dialog fixed z-50 p-0 bg-transparent text-inherit border-none w-[calc(100%_-_24px)] max-w-lg max-h-[90dvh]"
          onCancel={() => setExportModal({ open: false, blob: null, url: "" })}
          onClick={(e) => { if (e.target === e.currentTarget) setExportModal({ open: false, blob: null, url: "" }); }}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="tool-scrollbar bg-[#0a0e16] border border-[rgba(255,255,255,0.08)] rounded-xl max-w-lg w-full max-h-[90dvh] overflow-y-auto shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 id="export-title" className="text-[0.75rem] font-extrabold uppercase tracking-[0.1em] text-[#e6edf5]">Export</h3>
                <button
                  aria-label="Close export"
                  onClick={() => { setExportModal({ open: false, blob: null, url: "" }); }}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] w-7 h-7 rounded-md flex items-center justify-center cursor-pointer hover:text-[#e6edf5] transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              <div className="h-[min(35dvh,280px)] rounded-lg overflow-hidden bg-[#030406] border border-[rgba(255,255,255,0.06)] mb-3 flex items-center justify-center">
                {exportModal.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={exportModal.url} alt="Preview" className={`max-w-full max-h-full object-contain ${state.mode === "transparent" ? "transparency-grid" : ""}`} />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8"><svg className="animate-spin h-5 w-5 text-[var(--accent)]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg></div>
                )}
              </div>

              <div className="flex items-center justify-between text-[0.65rem] text-[#8d9aaa] mb-3">
                <span className="font-semibold">
                  {exportWidth}
                  &times;
                  {exportHeight} px
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

                <button onClick={handleShareNative}
                  className="w-full border border-white/10 rounded-lg py-2.5 text-sm font-semibold text-[#e6edf5] hover:bg-white/5">
                  Share image
                </button>
                <p className="text-xs text-[#8d9aaa]">Choose an app in your device’s share menu. If sharing is unavailable, download and attach the image.</p>
                {error && <p role="alert" className="rounded-md bg-red-400/10 p-2 text-sm text-red-200">{error}</p>}

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
        </dialog>
      )}

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e2328] border border-[rgba(255,255,255,0.1)] text-[#e6edf5] text-[0.7rem] font-semibold px-4 py-2 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] animate-fade-up">
          {toast}
        </div>
      )}
    </section>
  );
}
