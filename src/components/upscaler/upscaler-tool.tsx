"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { upscaleImage, type UpscaleResult } from "@/lib/upscaler-utils";

const SCALES = [2, 3, 4];
type DisplayMode = "original" | "upscaled" | "compare";

export function UpscalerTool() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [scale, setScale] = useState(2);
  const [sharpen, setSharpen] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<UpscaleResult | null>(null);
  const [resultDataUrl, setResultDataUrl] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("original");
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [expFormat, setExpFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [expQuality, setExpQuality] = useState(92);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const startDrag = useCallback(() => setDragging(true), []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      handleSliderMove(cx);
    };
    const onUp = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };
  }, [dragging, handleSliderMove]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    setFileSize(file.size);
    setResult(null);
    setResultDataUrl("");
    setDisplayMode("original");
    setError("");
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleUpscale = useCallback(async () => {
    if (!image) return;
    setProcessing(true);
    setError("");
    try {
      const r = await upscaleImage(image, scale, sharpen);
      setResult(r);
      const dataUrl = r.canvas.toDataURL();
      setResultDataUrl(dataUrl);
      setDisplayMode("compare");
      setSliderPos(50);
    } catch {
      setError("Upscaling failed. The image may be too large or your browser doesn't support the required Canvas operations.");
    }
    setProcessing(false);
  }, [image, scale, sharpen]);

  const handleExport = useCallback(() => {
    if (!result) return;
    const { canvas } = result;
    const mime = `image/${expFormat === "jpeg" ? "jpeg" : expFormat}`;
    const quality = expFormat === "png" ? undefined : expQuality / 100;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const base = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
      a.download = `${base}_${scale}x.${expFormat === "jpeg" ? "jpg" : expFormat}`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    }, mime, quality);
  }, [result, expFormat, expQuality, fileName, scale]);

  const reset = useCallback(() => {
    setImage(null);
    setResult(null);
    setResultDataUrl("");
    setFileName("");
    setFileSize(0);
    setError("");
    setDisplayMode("original");
  }, []);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5 py-6">
      <motion.div
        initial={{ opacity: 0.99, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-6 mb-6"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
        <h1 className="text-[1.65rem] font-extrabold tracking-tight mb-1">Free HD Image Upscaler</h1>
        <p className="text-[0.95rem] text-[#8d9aaa] max-w-[600px] leading-relaxed">Upscale images 2x, 3x, or 4x with high-quality bicubic interpolation and smart sharpening. All processing is done locally in your browser.</p>
      </motion.div>

      {!image ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          className="border-2 border-dashed border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.015)] rounded-xl p-20 text-center cursor-pointer transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 min-h-[320px] flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            <svg aria-hidden="true" className="w-6 h-6 text-[var(--accent)] opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <h3 className="text-[1.3rem] font-bold mb-2">Drop an image or click to browse</h3>
          <p className="text-[0.8rem] text-[#8d9aaa]">PNG, JPEG, WebP, BMP, GIF, TIFF — up to 30 MB</p>
          <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-3 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-[700px]"
          >
            <div className="relative bg-[#0a0c12] border border-[rgba(255,255,255,0.10)] rounded-xl overflow-hidden p-1">
              {processing ? (
                <div className="flex items-center justify-center h-[320px]">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-[var(--accent)]" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-[0.8rem] text-[#8d9aaa] font-medium">Upscaling {scale}&times;...</span>
                  </div>
                </div>
              ) : displayMode === "compare" && resultDataUrl ? (
                <div
                  ref={sliderRef}
                  className="relative overflow-hidden cursor-ew-resize select-none"
                  style={{ aspectRatio: `${image.naturalWidth} / ${image.naturalHeight}`, maxHeight: 500, userSelect: "none", WebkitUserSelect: "none" }}
                  onMouseDown={startDrag}
                  onTouchStart={startDrag}
                >
                  <img
                    src={image.src}
                    alt="Original"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ objectFit: "contain", imageRendering: "pixelated", userSelect: "none", WebkitUserSelect: "none" }}
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img
                      src={resultDataUrl}
                      alt="Upscaled"
                      className="w-full h-full pointer-events-none"
                      style={{ objectFit: "contain", userSelect: "none", WebkitUserSelect: "none" }}
                      draggable={false}
                    />
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] pointer-events-none z-10"
                    style={{ left: `${sliderPos}%` }}
                  />
                  <div
                    className="absolute z-10 w-8 h-8 -ml-4 -mt-4 top-1/2 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e2328" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 3 12 9 6" />
                      <polyline points="15 6 21 12 15 18" />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[0.55rem] font-bold px-2 py-1 rounded-sm border border-white/10 z-20 pointer-events-none">
                    ORIGINAL
                  </div>
                  <div className="absolute top-2 right-2 bg-[var(--accent)]/30 backdrop-blur-sm text-[var(--accent)] text-[0.55rem] font-bold px-2 py-1 rounded-sm border border-[var(--accent)]/20 z-20 pointer-events-none">
                    UPSCALED {scale}x
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={displayMode === "upscaled" && resultDataUrl ? resultDataUrl : image.src}
                    alt={displayMode === "upscaled" ? "Upscaled" : "Original"}
                    className="w-full h-auto"
                    style={{ maxHeight: 500, objectFit: "contain" }}
                  />
                  <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[0.55rem] font-bold px-2 py-1 rounded-sm border border-white/10">
                    {displayMode === "upscaled" ? `UPSCALED ${scale}x` : "ORIGINAL"}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[280px] flex flex-col gap-3"
          >
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Original</h3>
              <div className="text-[0.72rem] text-[#8d9aaa] space-y-1">
                <div className="truncate font-medium text-[#e6edf5]">{fileName}</div>
                <div>{image.naturalWidth} &times; {image.naturalHeight} px</div>
                <div>{(fileSize / 1024).toFixed(0)} KB</div>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Scale Factor</h3>
              <div className="flex gap-1 mb-2">
                {SCALES.map((s) => (
                  <button key={s} onClick={() => setScale(s)}
                    className={`flex-1 text-[0.6rem] font-bold px-1 py-1.5 rounded-sm border transition-all ${
                      scale === s
                        ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa] hover:border-[rgba(255,255,255,0.10)]"
                    }`}
                  >{s}x</button>
                ))}
              </div>
              <div className="text-[0.65rem] text-[#576675]">
                Output: <strong className="text-[#8d9aaa]">{Math.round(image.naturalWidth * scale)} &times; {Math.round(image.naturalHeight * scale)} px</strong>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675]">Smart Sharpen</h3>
                <button onClick={() => setSharpen(!sharpen)}
                  className={`relative w-9 h-5 rounded-full transition-all cursor-pointer ${
                    sharpen ? "bg-[var(--accent)]" : "bg-[rgba(255,255,255,0.10)]"
                  }`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    sharpen ? "left-4" : "left-0.5"
                  }`} />
                </button>
              </div>
              <p className="text-[0.62rem] text-[#576675] mt-1.5 leading-relaxed">
                Applies unsharp mask after upscaling for crisper details.
              </p>
            </div>

            {error && (
              <div className="bg-[rgba(244,63,94,0.08)] border border-[rgba(244,63,94,0.15)] rounded-lg p-3">
                <p className="text-[0.68rem] text-[#f43f5e] leading-relaxed m-0">{error}</p>
              </div>
            )}

            <button onClick={handleUpscale} disabled={processing}
              className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 active:brightness-125 shadow-[0_4px_20px_var(--accent-glow)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Upscaling...
                </span>
              ) : (result ? "Re-upscale" : "Upscale Image")}
            </button>

            {result && (
              <>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
                  <div className="flex gap-1">
                    {(["original", "compare", "upscaled"] as const).map((m) => (
                      <button key={m} onClick={() => setDisplayMode(m)}
                        className={`flex-1 text-[0.55rem] font-bold px-1 py-1.5 rounded-sm border transition-all ${
                          displayMode === m
                            ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                            : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa] hover:border-[rgba(255,255,255,0.10)]"
                        }`}
                      >{m === "compare" ? `Compare` : m === "upscaled" ? `${scale}x` : "Original"}</button>
                    ))}
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
                  <div className="text-[0.65rem] text-[#8d9aaa] space-y-0.5">
                    <div className="flex justify-between">
                      <span>Original</span>
                      <strong className="text-[#e6edf5]">{result.originalWidth} &times; {result.originalHeight}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Upscaled</span>
                      <strong className="text-[var(--accent)]">{result.width} &times; {result.height}</strong>
                    </div>
                    <div className="text-[0.55rem] text-[#576675] text-center pt-1 border-t border-[rgba(255,255,255,0.04)] mt-1">
                      {(result.width * result.height / (result.originalWidth * result.originalHeight)).toFixed(0)}&times; more pixels
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
                  <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Export</h3>
                  <div className="flex gap-1 mb-2">
                    {(["png", "jpeg", "webp"] as const).map((f) => (
                      <button key={f} onClick={() => setExpFormat(f)}
                        className={`flex-1 text-[0.6rem] font-bold px-1 py-1.5 rounded-sm border transition-all ${
                          expFormat === f
                            ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                            : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa] hover:border-[rgba(255,255,255,0.10)]"
                        }`}
                      >{f.toUpperCase()}</button>
                    ))}
                  </div>
                  {expFormat !== "png" && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-[0.65rem] text-[#8d9aaa] mb-1">
                        <span>Quality</span>
                        <span>{expQuality}%</span>
                      </div>
                      <input type="range" min={10} max={100} value={expQuality}
                        onChange={(e) => setExpQuality(Number(e.target.value))}
                        className="w-full" />
                    </div>
                  )}
                  <button onClick={handleExport}
                    className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 active:brightness-125 shadow-[0_4px_20px_var(--accent-glow)]">
                    Download {scale}x
                  </button>
                </div>
              </>
            )}

            <button onClick={reset}
              className="w-full bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] py-2 rounded-lg text-xs font-semibold cursor-pointer hover:text-[#f43f5e] hover:border-[rgba(244,63,94,0.2)] transition-all">
              Upload New Image
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
