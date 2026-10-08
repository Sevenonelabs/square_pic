"use client";
import { isImageFile, matchesImageFormat } from "@/lib/image-input";
import { useObjectUrls } from "@/lib/use-object-urls";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { encodeICO } from "@/lib/encoders";
import { formatBytes, loadImage } from "@/lib/compressor-utils";
import { canvasBlob, downloadImage, FORMAT_MIME, OUTPUT_FORMATS, verifyImageBlob, type OutputFormat } from "@/lib/image-export";
import { trackToolEvent } from "@/lib/analytics";
import { runConcurrent } from "@/lib/async-utils";

type Format = OutputFormat;

interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  src: string;
  imgElement: HTMLImageElement | null;
  targetFormat: Format;
  quality: number;
  status: "ready" | "converting" | "done" | "error";
  convertedBlob: Blob | null;
  error?: string;
}

const FORMAT_CATEGORIES: { label: string; formats: { value: string; label: string }[] }[] = [
  {
    label: "Image", formats: [
      { value: "jpeg", label: "JPEG" }, { value: "png", label: "PNG" }, { value: "webp", label: "WebP" },
      { value: "bmp", label: "BMP" }, { value: "avif", label: "AVIF" },
    ]
  },
  {
    label: "Legacy", formats: [
      { value: "gif", label: "GIF" }, { value: "ico", label: "ICO" }, { value: "tiff", label: "TIFF" },
    ]
  },
];

async function convertCore(img: HTMLImageElement, format: Format, quality: number): Promise<Blob> {
  const canvas = document.createElement("canvas");
  if (format === "ico") {
    const factor = Math.min(1, 256 / Math.max(img.naturalWidth, img.naturalHeight));
    canvas.width = Math.max(1, Math.round(img.naturalWidth * factor));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * factor));
  } else {
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image is too large for this browser.");
  if (format === "jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  if (format === "ico") {
    return verifyImageBlob(await encodeICO(await canvasBlob(canvas, "image/png"), canvas.width, canvas.height), FORMAT_MIME.ico);
  }
  return canvasBlob(canvas, FORMAT_MIME[format], quality);
}

async function convertFile(item: FileItem): Promise<Blob> {
  const img = item.imgElement ?? await loadImage(item.src);
  return convertCore(img, item.targetFormat, item.quality);
}

const MAX_CONCURRENCY = 4;

export function ConverterTool({ initialFormat = "webp", inputFormat, showHeading = true }: { initialFormat?: Format; inputFormat?: string; showHeading?: boolean }) {
  const { create: createUrl, revoke: revokeUrl, clear: clearUrls, has: hasUrl } = useObjectUrls();
  const versions = useRef(new Map<string, number>());
  const running = useRef(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [openFormatId, setOpenFormatId] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    setNotice("");
    const newItems: FileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!isImageFile(file)) { setNotice("Choose image files, such as PNG, JPEG or WebP."); continue; }
      if (file.size > 30 * 1024 * 1024) { setNotice("Choose images no larger than 30 MB per file."); continue; }
      if (inputFormat && !matchesImageFormat(file, inputFormat)) { setNotice(`Choose a ${inputFormat.toUpperCase()} image for this conversion.`); continue; }
      trackToolEvent("upload_accepted", "converter");
      const id = Math.random().toString(36).substring(2, 11);
      const src = createUrl(file);
      versions.current.set(id, 0);
      newItems.push({ id, file, name: file.name, size: file.size, src, imgElement: null, targetFormat: initialFormat, quality: 0.8, status: "ready", convertedBlob: null });
    }
    if (newItems.length > 0) setFiles((p) => [...p, ...newItems]);
  }, [initialFormat, inputFormat, createUrl]);

  const updateItem = useCallback((id: string, update: Partial<FileItem>) => {
    if (update.targetFormat || update.quality !== undefined) versions.current.set(id, (versions.current.get(id) ?? 0) + 1);
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...(update.targetFormat || update.quality !== undefined ? { status: "ready" as const, convertedBlob: null, error: undefined } : {}), ...update } : f)));
  }, []);

  const removeFile = useCallback((id: string) => {
    versions.current.delete(id);
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) revokeUrl(item.src);
      return prev.filter((f) => f.id !== id);
    });
    setOpenFormatId((open) => open === id ? null : open);
  }, [revokeUrl]);

  const startConversion = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setConverting(true);
    setOpenFormatId(null);
    const pending = files.filter((f) => f.status !== "done").map((item) => ({ item, version: versions.current.get(item.id) }));

    try {
      await runConcurrent(pending, async ({ item, version }) => {
        const isCurrent = () => hasUrl(item.src) && versions.current.get(item.id) === version;
        if (!isCurrent()) return;
        updateItem(item.id, { status: "converting", error: undefined });
        try {
          const blob = await convertFile(item);
          if (!isCurrent()) return;
          trackToolEvent("processing_success", "converter", item.targetFormat);
          updateItem(item.id, { status: "done", convertedBlob: blob });
        } catch (error) {
          if (!isCurrent()) return;
          trackToolEvent("processing_error", "converter", item.targetFormat);
          updateItem(item.id, { status: "error", error: error instanceof Error ? error.message : "Conversion failed." });
        }
      }, MAX_CONCURRENCY);
    } finally {
      running.current = false;
      setConverting(false);
    }
  }, [files, updateItem, hasUrl]);

  const clearAll = useCallback(() => {
    clearUrls();
    versions.current.clear();
    setOpenFormatId(null);
    setFiles([]);
  }, [clearUrls]);

  const downloadFile = useCallback((item: FileItem) => {
    if (!item.convertedBlob) return;
    const name = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
    downloadImage(item.convertedBlob, name);
    trackToolEvent("download", "converter", item.targetFormat);
  }, []);

  const downloadAll = useCallback(() => {
    files.filter((f) => f.status === "done" && f.convertedBlob).forEach(downloadFile);
  }, [files, downloadFile]);

  const anyDone = files.some((f) => f.status === "done");

  return (
    <div className="max-w-[960px] w-full mx-auto px-5 py-6">
      <motion.div
        initial={{ opacity: 0.99 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-6 mb-6"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
        {showHeading && <h1 className="text-[1.65rem] font-extrabold tracking-tight mb-1">Free Image Converter for JPG, PNG, WebP & ICO</h1>}
        <p className="text-[0.95rem] text-[#8d9aaa] max-w-[600px] leading-relaxed">
          Export JPEG, PNG, WebP or a single-size ICO. JPEG fills transparency with white. ICO fits within 256 pixels without stretching. Other exports keep source dimensions.
        </p>
      </motion.div>

      <p className="text-sm text-[#8d9aaa] mb-4" role="status">AVIF, BMP, GIF and TIFF output are unavailable while their encoders are being repaired. Animated inputs export their first frame. {notice}</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-xl p-6 sm:p-16 text-center cursor-pointer transition-all mb-4 min-h-[280px] flex flex-col items-center justify-center ${
          files.length > 0
            ? "border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.15)]"
            : "border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.015)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5"
        }`}
      >
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
          <svg aria-hidden="true" className="w-6 h-6 text-[var(--accent)] opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h3 className="text-[1.3rem] font-bold mb-2">Drop images here or click to browse</h3>
        <p className="text-[0.9rem] text-[#8d9aaa] mb-0">Supports all common image formats</p>
        <input ref={inputRef} type="file" hidden multiple accept="image/*" onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
      </motion.div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {files.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 transition-all hover:bg-[rgba(255,255,255,0.04)] flex-wrap relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} className="w-12 h-12 rounded-md object-cover bg-black/30 border border-[rgba(255,255,255,0.06)] shrink-0" alt={item.name} />
              <div className="flex-1 min-w-0 basis-[120px]">
                <div className="text-[0.875rem] font-bold text-[#e6edf5] truncate max-w-[200px]">{item.name}</div>
                <div className="flex items-center gap-2 text-[0.875rem] text-[#8d9aaa]">{formatBytes(item.size)}</div>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                <div className="relative">
                  <button
                    disabled={converting}
                    onClick={() => setOpenFormatId(openFormatId === item.id ? null : item.id)}
                    className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#e6edf5] font-bold rounded-md px-3 py-1.5 text-[0.875rem] cursor-pointer flex items-center gap-1.5 min-w-[72px] transition-all hover:bg-[rgba(255,255,255,0.09)]"
                  >
                    {item.targetFormat.toUpperCase()}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>

                  {openFormatId === item.id && (
                    <>
                      <div className="fixed inset-0 z-40"
                    onClick={() => setOpenFormatId(null)} />
                      <div ref={formatRef} className="absolute z-50 top-full mt-1.5 right-0 w-[220px] bg-[rgba(10,14,22,0.98)] border border-[rgba(255,255,255,0.12)] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-[25px] p-2 overflow-hidden">
                        {FORMAT_CATEGORIES.map((cat) => (
                          <div key={cat.label}>
                            <div className="text-[0.875rem] font-bold text-[#8d9aaa] uppercase tracking-[0.1em] px-2 py-1.5">{cat.label}</div>
                            <div className="grid grid-cols-2 gap-1 mb-1">
                              {cat.formats.map((fmt) => (
                                <button
                                  key={fmt.value}
                                  disabled={!OUTPUT_FORMATS.includes(fmt.value as Format)}
                                  title={!OUTPUT_FORMATS.includes(fmt.value as Format) ? "Encoder unavailable" : undefined}
                                  onClick={() => { updateItem(item.id, { targetFormat: fmt.value as Format }); setOpenFormatId(null); }}
                                  className={`text-[0.875rem] font-bold px-2 py-1.5 rounded-md border cursor-pointer text-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                                    item.targetFormat === fmt.value
                                      ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                                      : "bg-[rgba(255,255,255,0.04)] border-transparent text-[#e6edf5] hover:bg-[rgba(255,255,255,0.08)]"
                                  }`}
                                >{fmt.label}</button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {(item.targetFormat === "jpeg" || item.targetFormat === "webp") && (
                  <div className="flex items-center gap-1.5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)] rounded-md px-2 py-1">
                    <span className="text-[0.875rem] text-[#8d9aaa] font-bold uppercase tracking-wide">Q</span>
                    <input
                      aria-label="Output quality" disabled={converting} type="range" min={10} max={100} value={Math.round(item.quality * 100)}
                      onChange={(e) => updateItem(item.id, { quality: Number(e.target.value) / 100 })}
                      className="w-16 h-[2px] appearance-none bg-[rgba(255,255,255,0.08)] outline-none"
                    />
                    <span className="text-[0.875rem] text-[#8d9aaa] font-semibold w-7 text-right">{Math.round(item.quality * 100)}%</span>
                  </div>
                )}

                <button onClick={() => removeFile(item.id)} className="bg-transparent border-none text-[#8d9aaa] cursor-pointer p-1.5 rounded-sm transition-all hover:text-[#f43f5e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === "converting" && (
                  <div className="flex items-center gap-1.5 text-[0.875rem] font-bold text-[var(--accent)]">
                    <div className="w-3.5 h-3.5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                    Converting...
                  </div>
                )}
                {item.status === "done" && <span className="text-[0.875rem] font-bold text-[#10b981]">Done</span>}
                {item.status === "error" && <span className="text-[0.875rem] font-bold text-[#f43f5e]" role="alert">{item.error || "Conversion failed"}</span>}
                {item.status === "done" && (
                  <button onClick={() => downloadFile(item)}
                    className="bg-[var(--accent)] text-black px-3 py-1 rounded-md text-[0.875rem] font-extrabold cursor-pointer transition-all hover:brightness-110 shadow-[0_2px_8px_var(--accent-glow)]"
                  >
                    Download
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-[0.875rem] text-[#8d9aaa] font-semibold">{files.length} file{files.length !== 1 ? "s" : ""}</span>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => inputRef.current?.click()}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.875rem] font-semibold cursor-pointer hover:text-[#e6edf5]">
                + Select Images
              </button>
              {anyDone && (
                <button onClick={downloadAll}
                  className="bg-[var(--accent)] text-black px-4 py-1.5 rounded-md text-[0.875rem] font-extrabold cursor-pointer hover:brightness-110 active:brightness-125 shadow-[0_4px_12px_var(--accent-glow)]">
                  Download All
                </button>
              )}
              <button onClick={clearAll}
                className="bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.875rem] font-semibold cursor-pointer hover:text-[#f43f5e]">
                Clear All
              </button>
              <button onClick={startConversion} disabled={converting}
                className="bg-[var(--accent)] text-black px-4 py-1.5 rounded-md text-[0.875rem] font-extrabold cursor-pointer transition-all hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_12px_var(--accent-glow)]">
                {converting ? "Converting..." : "Convert All"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
