"use client";

import { useState, useRef, useCallback } from "react";
import { encodeGIF, encodeICO, encodeTIFF } from "@/lib/encoders";
import { formatBytes, truncateMiddle } from "@/lib/compressor-utils";

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

const FORMAT_OPTIONS: { label: string; formats: { value: Format; label: string }[] }[] = [
  { label: "Image", formats: [
    { value: "jpeg", label: "JPEG" }, { value: "png", label: "PNG" }, { value: "webp", label: "WebP" },
    { value: "bmp", label: "BMP" }, { value: "avif", label: "AVIF" },
  ]},
  { label: "Legacy", formats: [
    { value: "gif", label: "GIF" }, { value: "ico", label: "ICO" }, { value: "tiff", label: "TIFF" },
  ]},
];

function getMime(fmt: Format): string {
  const map: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp", bmp: "image/bmp", gif: "image/gif", ico: "image/x-icon", avif: "image/avif", tiff: "image/tiff" };
  return map[fmt];
}

function getExt(fmt: Format): string {
  const map: Record<string, string> = { jpeg: "jpg", png: "png", webp: "webp", bmp: "bmp", gif: "gif", ico: "ico", avif: "avif", tiff: "tiff" };
  return map[fmt];
}

async function convertFile(
  item: FileItem,
  onProgress?: () => void
): Promise<Blob> {
  if (!item.imgElement) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => { item.imgElement = img; resolve(); };
      img.src = item.src;
    });
  }
  onProgress?.();

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
    // Resize to 256x256 for ICO
    const s = 256;
    const temp = document.createElement("canvas");
    temp.width = s;
    temp.height = s;
    const tCtx = temp.getContext("2d")!;
    tCtx.drawImage(img, 0, 0, s, s);
    const pngBlob = await new Promise<Blob>((resolve) =>
      temp.toBlob((b) => resolve(b!), "image/png")
    );
    return await encodeICO(pngBlob);
  }

  if (item.targetFormat === "tiff") {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return encodeTIFF(imageData);
  }

  // Standard formats
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
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    const newItems: FileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith("image/")) continue;
      const id = Math.random().toString(36).substring(2, 11);
      const src = URL.createObjectURL(file);
      const item: FileItem = {
        id, file, name: file.name, size: file.size, src,
        imgElement: null, targetFormat: "webp", quality: 0.8, status: "ready", convertedBlob: null,
      };
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
        const blob = await convertFile(item, () => setFiles((p) => [...p]));
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

  const anyDone = files.some((f) => f.status === "done");

  return (
    <div className="max-w-[960px] w-full mx-auto px-5 py-6">
      <div className="text-center mb-6 p-6 bg-gradient-to-br from-[rgba(6,182,212,0.04)] to-[rgba(139,92,246,0.04)] border border-[rgba(6,182,212,0.08)] rounded-lg">
        <h1 className="text-[1.65rem] font-extrabold tracking-tight mb-1">Free Image Converter</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] max-w-[600px] mx-auto leading-relaxed">
          Convert images between formats including JPEG, PNG, WebP, BMP, GIF, ICO, AVIF, and TIFF.
        </p>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all mb-4 ${
          files.length > 0 ? "border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.15)]" : "border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.08)] hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-glow)]"
        }`}
      >
        <svg aria-hidden="true" className="w-12 h-12 mx-auto mb-4 text-[var(--accent)] opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h3 className="text-[1.2rem] font-bold mb-1">Drop images here or click to browse</h3>
        <p className="text-[0.85rem] text-[#8d9aaa] mb-0">Supports all common image formats</p>
        <input ref={inputRef} type="file" hidden multiple accept="image/*" onChange={(e) => e.target.files && addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 transition-all hover:bg-[rgba(255,255,255,0.04)] flex-wrap">
              <img src={item.src} className="w-11 h-11 rounded-md object-cover bg-black/30 border border-[rgba(255,255,255,0.06)]" alt={item.name} />
              <div className="flex-1 min-w-[150px]">
                <div className="text-[0.82rem] font-bold text-[#e6edf5] truncate max-w-[250px]">{item.name}</div>
                <div className="flex items-center gap-2 text-[0.68rem] text-[#8d9aaa]">{formatBytes(item.size)}</div>
              </div>
              <div className="flex items-center gap-2 relative">
                <button onClick={() => setOpenPopover(openPopover === item.id ? null : item.id)}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] text-[#e6edf5] font-bold rounded-sm px-3 py-1 text-[0.68rem] cursor-pointer flex items-center gap-1 min-w-[72px] transition-all hover:bg-[rgba(255,255,255,0.09)]"
                >
                  {item.targetFormat.toUpperCase()}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                </button>

                <button onClick={() => {
                  if (item.targetFormat === "jpeg" || item.targetFormat === "webp" || item.targetFormat === "avif") {
                    const q = prompt("Quality (0.1 - 1.0):", String(item.quality));
                    if (q) updateItem(item.id, { quality: Math.max(0.1, Math.min(1, parseFloat(q))) });
                  }
                }} className="bg-transparent border-none text-[#8d9aaa] cursor-pointer p-1.5 rounded-sm transition-all hover:text-[var(--accent)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </button>

                <button onClick={() => removeFile(item.id)} className="bg-transparent border-none text-[#8d9aaa] cursor-pointer p-1.5 rounded-sm transition-all hover:text-[#f43f5e]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>

              {item.status === "converting" && <span className="text-[0.65rem] font-bold text-[var(--accent)]">Converting...</span>}
              {item.status === "done" && <span className="text-[0.65rem] font-bold text-[#10b981]">Done</span>}
              {item.status === "error" && <span className="text-[0.65rem] font-bold text-[#f43f5e]">Error</span>}

              {/* Format popover */}
              {openPopover === item.id && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenPopover(null)} />
                  <div ref={popoverRef} className="absolute z-50 top-full mt-1 right-0 w-[320px] bg-[rgba(10,14,22,0.98)] border border-[rgba(255,255,255,0.12)] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-[25px] overflow-hidden">
                    <div className="flex h-[200px]">
                      <div className="w-[90px] border-r border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.15)] p-1.5 flex flex-col gap-1">
                        {FORMAT_OPTIONS.map((cat) => (
                          <div key={cat.label} className="text-[0.6rem] font-bold text-[#8d9aaa] px-2 py-1 uppercase tracking-wide">{cat.label}</div>
                        ))}
                      </div>
                      <div className="flex-1 p-3 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-1">
                          {FORMAT_OPTIONS.flatMap((cat) => cat.formats).map((fmt) => (
                            <button key={fmt.value} onClick={() => { updateItem(item.id, { targetFormat: fmt.value }); setOpenPopover(null); }}
                              className={`text-[0.68rem] font-bold px-2 py-1.5 rounded-sm border cursor-pointer text-center transition-all ${
                                item.targetFormat === fmt.value
                                  ? "bg-[rgba(6,182,212,0.10)] border-[var(--accent)] text-[var(--accent)]"
                                  : "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.06)] text-[#e6edf5] hover:bg-[var(--accent)] hover:text-black"
                              }`}
                            >{fmt.label}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="text-[0.72rem] text-[#8d9aaa] font-semibold">{files.length} file{files.length !== 1 ? "s" : ""}</span>
            <div className="flex gap-2">
              <button onClick={() => inputRef.current?.click()}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.72rem] font-semibold cursor-pointer hover:text-[#e6edf5]">
                + Select Images
              </button>
              <button onClick={clearAll}
                className="bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.72rem] font-semibold cursor-pointer hover:text-[#f43f5e]">
                Clear All
              </button>
              <button onClick={startConversion} disabled={converting}
                className="bg-[var(--accent)] text-black px-4 py-1.5 rounded-md text-[0.72rem] font-extrabold cursor-pointer transition-all hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_12px_var(--accent-glow)]">
                {converting ? "Converting..." : "Convert All"}
              </button>
              {anyDone && (
                <button onClick={() => {
                  files.filter((f) => f.status === "done" && f.convertedBlob).forEach((item) => {
                    const ext = getExt(item.targetFormat);
                    const name = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
                    const url = URL.createObjectURL(item.convertedBlob!);
                    const a = document.createElement("a");
                    a.download = `${name}.${ext}`;
                    a.href = url;
                    a.click();
                    URL.revokeObjectURL(url);
                  });
                }}
                  className="bg-[var(--accent)] text-black px-4 py-1.5 rounded-md text-[0.72rem] font-extrabold cursor-pointer hover:brightness-110 active:brightness-125 shadow-[0_4px_12px_var(--accent-glow)]">
                  Download All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
