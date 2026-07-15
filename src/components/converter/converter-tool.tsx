"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { encodeGIF, encodeICO, encodeTIFF } from "@/lib/encoders";
import { formatBytes } from "@/lib/compressor-utils";

type Format = "jpeg" | "png" | "webp" | "bmp" | "gif" | "ico" | "avif" | "tiff";

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
}

const FORMAT_CATEGORIES: { label: string; formats: { value: Format; label: string }[] }[] = [
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

const ALL_FORMATS = FORMAT_CATEGORIES.flatMap((c) => c.formats);

function getMime(fmt: Format): string {
  const map: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp", bmp: "image/bmp", gif: "image/gif", ico: "image/x-icon", avif: "image/avif", tiff: "image/tiff" };
  return map[fmt];
}

function getExt(fmt: Format): string {
  const map: Record<string, string> = { jpeg: "jpg", png: "png", webp: "webp", bmp: "bmp", gif: "gif", ico: "ico", avif: "avif", tiff: "tiff" };
  return map[fmt];
}

async function convertFile(item: FileItem): Promise<Blob> {
  if (!item.imgElement) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => { item.imgElement = img; resolve(); };
      img.src = item.src;
    });
  }

  const img = item.imgElement!;
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;

  if (item.targetFormat === "gif") {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gifData = encodeGIF(imageData);
    return new Blob([gifData as BlobPart], { type: "image/gif" });
  }

  if (item.targetFormat === "ico") {
    const s = 256;
    const temp = document.createElement("canvas");
    temp.width = s; temp.height = s;
    const tCtx = temp.getContext("2d")!;
    tCtx.drawImage(img, 0, 0, s, s);
    const pngBlob = await new Promise<Blob>((resolve) => temp.toBlob((b) => resolve(b!), "image/png"));
    return await encodeICO(pngBlob);
  }

  if (item.targetFormat === "tiff") {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return encodeTIFF(imageData);
  }

  if (item.targetFormat === "jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);

  const mime = getMime(item.targetFormat);
  const quality = mime === "image/png" || mime === "image/bmp" ? undefined : item.quality;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Conversion failed"));
    }, mime, quality);
  });
}

export function ConverterTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [openFormatId, setOpenFormatId] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    const newItems: FileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith("image/")) continue;
      const id = Math.random().toString(36).substring(2, 11);
      const src = URL.createObjectURL(file);
      const item: FileItem = { id, file, name: file.name, size: file.size, src, imgElement: null, targetFormat: "webp", quality: 0.8, status: "ready", convertedBlob: null };
      const img = new Image();
      img.onload = () => { item.imgElement = img; setFiles((p) => [...p]); };
      img.src = src;
      newItems.push(item);
    }
    setFiles((p) => [...p, ...newItems]);
  }, []);

  const updateItem = useCallback((id: string, update: Partial<FileItem>) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...update } : f)));
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) URL.revokeObjectURL(item.src);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const startConversion = useCallback(async () => {
    setConverting(true);
    for (const item of files) {
      if (item.status === "done") continue;
      updateItem(item.id, { status: "converting" });
      try {
        const blob = await convertFile(item);
        updateItem(item.id, { status: "done", convertedBlob: blob });
      } catch {
        updateItem(item.id, { status: "error" });
      }
    }
    setConverting(false);
  }, [files, updateItem]);

  const clearAll = useCallback(() => {
    files.forEach((f) => URL.revokeObjectURL(f.src));
    setFiles([]);
  }, [files]);

  const downloadFile = useCallback((item: FileItem) => {
    if (!item.convertedBlob) return;
    const ext = getExt(item.targetFormat);
    const name = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
    const url = URL.createObjectURL(item.convertedBlob);
    const a = document.createElement("a");
    a.download = `${name}.${ext}`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadAll = useCallback(() => {
    files.filter((f) => f.status === "done" && f.convertedBlob).forEach(downloadFile);
  }, [files, downloadFile]);

  const anyDone = files.some((f) => f.status === "done");

  return (
    <div className="max-w-[960px] w-full mx-auto px-5 py-6">
      <motion.div
        initial={{ opacity: 0.99, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-6 mb-6"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
        <h1 className="text-[1.65rem] font-extrabold tracking-tight mb-1">Free Image Converter</h1>
        <p className="text-[0.95rem] text-[#8d9aaa] max-w-[600px] leading-relaxed">
          Convert images between formats including JPEG, PNG, WebP, BMP, GIF, ICO, AVIF, and TIFF.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all mb-4 min-h-[280px] flex flex-col items-center justify-center ${
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
        <input ref={inputRef} type="file" hidden multiple accept="image/*" onChange={(e) => e.target.files && addFiles(e.target.files)} />
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
              <img src={item.src} className="w-12 h-12 rounded-md object-cover bg-black/30 border border-[rgba(255,255,255,0.06)] shrink-0" alt={item.name} />
              <div className="flex-1 min-w-[120px]">
                <div className="text-[0.82rem] font-bold text-[#e6edf5] truncate max-w-[200px]">{item.name}</div>
                <div className="flex items-center gap-2 text-[0.68rem] text-[#8d9aaa]">{formatBytes(item.size)}</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setOpenFormatId(openFormatId === item.id ? null : item.id)}
                    className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#e6edf5] font-bold rounded-md px-3 py-1.5 text-[0.68rem] cursor-pointer flex items-center gap-1.5 min-w-[72px] transition-all hover:bg-[rgba(255,255,255,0.09)]"
                  >
                    {item.targetFormat.toUpperCase()}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>

                  {openFormatId === item.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenFormatId(null)} />
                      <div ref={formatRef} className="absolute z-50 top-full mt-1.5 right-0 w-[220px] bg-[rgba(10,14,22,0.98)] border border-[rgba(255,255,255,0.12)] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-[25px] p-2 overflow-hidden">
                        {FORMAT_CATEGORIES.map((cat) => (
                          <div key={cat.label}>
                            <div className="text-[0.55rem] font-bold text-[#576675] uppercase tracking-[0.1em] px-2 py-1.5">{cat.label}</div>
                            <div className="grid grid-cols-2 gap-1 mb-1">
                              {cat.formats.map((fmt) => (
                                <button
                                  key={fmt.value}
                                  onClick={() => { updateItem(item.id, { targetFormat: fmt.value }); setOpenFormatId(null); }}
                                  className={`text-[0.65rem] font-bold px-2 py-1.5 rounded-md border cursor-pointer text-center transition-all ${
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

                {(item.targetFormat === "jpeg" || item.targetFormat === "webp" || item.targetFormat === "avif") && (
                  <div className="flex items-center gap-1.5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.06)] rounded-md px-2 py-1">
                    <span className="text-[0.55rem] text-[#576675] font-bold uppercase tracking-wide">Q</span>
                    <input
                      type="range" min={10} max={100} value={Math.round(item.quality * 100)}
                      onChange={(e) => updateItem(item.id, { quality: Number(e.target.value) / 100 })}
                      className="w-16 h-[2px] appearance-none bg-[rgba(255,255,255,0.08)] outline-none"
                    />
                    <span className="text-[0.6rem] text-[#8d9aaa] font-semibold w-7 text-right">{Math.round(item.quality * 100)}%</span>
                  </div>
                )}

                <button onClick={() => removeFile(item.id)} className="bg-transparent border-none text-[#8d9aaa] cursor-pointer p-1.5 rounded-sm transition-all hover:text-[#f43f5e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === "converting" && (
                  <div className="flex items-center gap-1.5 text-[0.65rem] font-bold text-[var(--accent)]">
                    <div className="w-3.5 h-3.5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                    Converting...
                  </div>
                )}
                {item.status === "done" && <span className="text-[0.65rem] font-bold text-[#10b981]">Done</span>}
                {item.status === "error" && <span className="text-[0.65rem] font-bold text-[#f43f5e]">Error</span>}
                {item.status === "done" && (
                  <button onClick={() => downloadFile(item)}
                    className="bg-[var(--accent)] text-black px-3 py-1 rounded-md text-[0.6rem] font-extrabold cursor-pointer transition-all hover:brightness-110 shadow-[0_2px_8px_var(--accent-glow)]"
                  >
                    Download
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="text-[0.72rem] text-[#8d9aaa] font-semibold">{files.length} file{files.length !== 1 ? "s" : ""}</span>
            <div className="flex gap-2">
              <button onClick={() => inputRef.current?.click()}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.72rem] font-semibold cursor-pointer hover:text-[#e6edf5]">
                + Select Images
              </button>
              {anyDone && (
                <button onClick={downloadAll}
                  className="bg-[var(--accent)] text-black px-4 py-1.5 rounded-md text-[0.72rem] font-extrabold cursor-pointer hover:brightness-110 active:brightness-125 shadow-[0_4px_12px_var(--accent-glow)]">
                  Download All
                </button>
              )}
              <button onClick={clearAll}
                className="bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.72rem] font-semibold cursor-pointer hover:text-[#f43f5e]">
                Clear All
              </button>
              <button onClick={startConversion} disabled={converting}
                className="bg-[var(--accent)] text-black px-4 py-1.5 rounded-md text-[0.72rem] font-extrabold cursor-pointer transition-all hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_12px_var(--accent-glow)]">
                {converting ? "Converting..." : "Convert All"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
