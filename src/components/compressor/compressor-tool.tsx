"use client";

import { useState, useRef, useCallback } from "react";
import JSZip from "jszip";
import { formatBytes, truncateMiddle, compressFile, type FileItem } from "@/lib/compressor-utils";

const MAX_SIZE_MB = 30;

export function CompressorTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [mode, setMode] = useState<"slider" | "size">("slider");
  const [sliderQuality, setSliderQuality] = useState(60);
  const [targetFormat, setTargetFormat] = useState<"jpeg" | "webp">("jpeg");
  const [targetSizeValue, setTargetSizeValue] = useState(100);
  const [targetSizeUnit, setTargetSizeUnit] = useState<"KB" | "MB">("KB");
  const [compressing, setCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList) => {
    const newItems: FileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;

      const id = Math.random().toString(36).substring(2, 11);
      const src = URL.createObjectURL(file);
      const img = new Image();
      const item: FileItem = { id, file, name: file.name, size: file.size, src, imgElement: null, status: "ready", compressedBlob: null, newSize: null };
      img.onload = () => {
        item.imgElement = img;
        setFiles((prev) => [...prev]);
      };
      img.src = src;
      newItems.push(item);
    }
    setFiles((prev) => [...prev, ...newItems]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) URL.revokeObjectURL(item.src);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach((f) => URL.revokeObjectURL(f.src));
    setFiles([]);
  }, [files]);

  const runCompression = useCallback(async () => {
    setCompressing(true);
    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      if (item.status === "done") continue;
      item.status = "compressing";
      setFiles([...updated]);

      try {
        const result = await compressFile(item, mode, sliderQuality, targetFormat, targetSizeValue, targetSizeUnit);
        item.compressedBlob = result.blob;
        item.newSize = result.size;
        item.status = "done";
      } catch {
        item.status = "error";
      }
      setFiles([...updated]);
    }

    setCompressing(false);
  }, [files, mode, sliderQuality, targetFormat, targetSizeValue, targetSizeUnit]);

  const downloadZip = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.compressedBlob);
    if (done.length === 0) return;

    const zip = new JSZip();
    done.forEach((item) => {
      const ext = item.compressedBlob!.type === "image/webp" ? "webp" : "jpg";
      const cleanName = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
      zip.file(`${cleanName}_compressed.${ext}`, item.compressedBlob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.download = "compressed_images.zip";
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }, [files]);

  const anyDone = files.some((f) => f.status === "done");

  return (
    <div className="max-w-[960px] w-full mx-auto px-5 py-6">
      <div className="text-center mb-6 p-6 bg-gradient-to-br from-[rgba(6,182,212,0.04)] to-[rgba(139,92,246,0.04)] border border-[rgba(6,182,212,0.08)] rounded-lg">
        <h1 className="text-[1.65rem] font-extrabold tracking-tight mb-1">Free Image Compressor</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] max-w-[600px] mx-auto leading-relaxed">
          Compress JPG, PNG, and WebP images online without losing quality. Reduce file sizes for faster website loading and easier sharing.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all mb-4 ${
          files.length > 0 ? "border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.15)]" : "border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.08)] hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-glow)]"
        }`}
      >
        <svg aria-hidden="true" className="w-10 h-10 mx-auto mb-3 text-[var(--accent)] opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h3 className="text-[1.1rem] font-bold mb-1">Drop images here or click to browse</h3>
        <p className="text-[0.82rem] text-[#8d9aaa] mb-0">Max {MAX_SIZE_MB}MB per file</p>
        <input ref={inputRef} type="file" hidden multiple accept="image/*" onChange={(e) => e.target.files && addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          {/* Controls */}
          <div className="grid grid-cols-[280px_1fr] gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-3">Settings</h3>

              <div className="flex gap-1 bg-[rgba(0,0,0,0.25)] p-[3px] rounded-sm border border-[rgba(255,255,255,0.06)] mb-3">
                {(["slider", "size"] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`flex-1 bg-transparent border-none text-[0.68rem] font-semibold px-2 py-1.5 rounded-sm cursor-pointer transition-all ${
                      mode === m ? "bg-[rgba(255,255,255,0.08)] text-white" : "text-[#8d9aaa]"
                    }`}
                  >
                    {m === "slider" ? "Quality Slider" : "Target Size"}
                  </button>
                ))}
              </div>

              {mode === "slider" ? (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[0.68rem] text-[#8d9aaa] font-semibold mb-1">
                    <span>Quality</span>
                    <span>{sliderQuality}%</span>
                  </div>
                  <input type="range" min={5} max={95} value={sliderQuality} onChange={(e) => setSliderQuality(Number(e.target.value))}
                    className="w-full h-[2px] appearance-none bg-[rgba(255,255,255,0.06)] outline-none" />
                </div>
              ) : (
                <div className="space-y-2 mb-3">
                  <div className="flex gap-2">
                    <input type="number" min={1} value={targetSizeValue} onChange={(e) => setTargetSizeValue(Number(e.target.value))}
                      className="flex-1 bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.06)] rounded-sm px-2 py-1 text-[0.8rem] text-[#e6edf5]" />
                    <select value={targetSizeUnit} onChange={(e) => setTargetSizeUnit(e.target.value as "KB" | "MB")}
                      className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.06)] rounded-sm px-2 py-1 text-[0.8rem] text-[#e6edf5]">
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {[50, 100, 200, 500].map((v) => (
                      <button key={v} onClick={() => { setTargetSizeValue(v); setTargetSizeUnit("KB"); }}
                        className={`text-[0.6rem] font-bold px-2 py-1 rounded-sm border transition-all ${
                          targetSizeValue === v && targetSizeUnit === "KB"
                            ? "bg-[rgba(6,182,212,0.10)] border-[var(--accent)] text-[var(--accent)]"
                            : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa]"
                        }`}
                      >{v}KB</button>
                    ))}
                    {[1, 2].map((v) => (
                      <button key={`${v}MB`} onClick={() => { setTargetSizeValue(v); setTargetSizeUnit("MB"); }}
                        className={`text-[0.6rem] font-bold px-2 py-1 rounded-sm border transition-all ${
                          targetSizeValue === v && targetSizeUnit === "MB"
                            ? "bg-[rgba(6,182,212,0.10)] border-[var(--accent)] text-[var(--accent)]"
                            : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa]"
                        }`}
                      >{v}MB</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-3">
                <span className="text-[0.62rem] font-semibold text-[#576675] block mb-1">Output Format</span>
                <div className="flex gap-1">
                  {(["jpeg", "webp"] as const).map((fmt) => (
                    <button key={fmt} onClick={() => setTargetFormat(fmt)}
                      className={`flex-1 text-[0.65rem] font-bold px-2 py-1.5 rounded-sm border transition-all ${
                        targetFormat === fmt
                          ? "bg-[rgba(6,182,212,0.10)] border-[var(--accent)] text-[var(--accent)]"
                          : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa]"
                      }`}
                    >{fmt.toUpperCase()}</button>
                  ))}
                </div>
              </div>

              <button onClick={runCompression} disabled={compressing || files.length === 0}
                className="w-full bg-[var(--accent)] text-black border-none py-2 rounded-md font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shadow-[0_4px_16px_var(--accent-glow)]"
              >
                {compressing ? "Compressing..." : "Compress All"}
              </button>
              {files.length > 0 && (
                <button onClick={clearAll} className="w-full bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] py-1.5 rounded-md text-xs font-semibold cursor-pointer mt-2 hover:text-[#f43f5e] hover:border-[rgba(244,63,94,0.2)]">
                  Clear All Files
                </button>
              )}
            </div>

            {/* File grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 content-start">
              {files.map((item) => (
                <div key={item.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 flex flex-col gap-2 transition-all hover:bg-[rgba(255,255,255,0.04)]">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[0.72rem] font-bold text-[#e6edf5] truncate flex-1" title={item.name}>{truncateMiddle(item.name)}</span>
                    <span className="text-[0.68rem] text-[#8d9aaa] shrink-0">{formatBytes(item.size)}</span>
                    <button onClick={() => removeFile(item.id)} className="bg-[rgba(0,0,0,0.6)] border-none text-[#8d9aaa] w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all hover:text-[#f43f5e] shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-black border border-[rgba(255,255,255,0.05)]">
                    <img src={item.src} className="w-full h-full object-cover" alt={item.name} />
                    {item.status === "compressing" && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="text-[0.68rem] text-center text-[#8d9aaa]">
                    New Size: <strong className="text-[#e6edf5]">
                      {item.status === "compressing" ? "..." : item.status === "done" && item.newSize !== null ? formatBytes(item.newSize) : item.status === "error" ? <span className="text-[#f43f5e]">Failed</span> : "--"}
                    </strong>
                    {item.status === "done" && item.newSize !== null && item.size > 0 && (
                      <span className="text-[#10b981] font-extrabold ml-1">-{Math.round(((item.size - item.newSize) / item.size) * 100)}%</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (!item.compressedBlob) return;
                      const ext = item.compressedBlob.type === "image/webp" ? "webp" : "jpg";
                      const name = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
                      const url = URL.createObjectURL(item.compressedBlob);
                      const a = document.createElement("a");
                      a.download = `${name}_compressed.${ext}`;
                      a.href = url;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    disabled={item.status !== "done"}
                    className="w-full bg-[var(--accent)] text-black border-none py-1.5 rounded-sm text-[0.68rem] font-extrabold cursor-pointer transition-all hover:brightness-110 active:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    Download
                  </button>
                </div>
              ))}
              <div onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-[rgba(255,255,255,0.06)] rounded-lg flex flex-col items-center justify-center cursor-pointer p-5 gap-1 min-h-[180px] transition-all hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-glow)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" className="opacity-80">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <span className="text-[0.72rem] font-bold text-[#e6edf5]">Add Images</span>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-[0.72rem] text-[#8d9aaa] font-semibold">{files.length} file{files.length !== 1 ? "s" : ""}</span>
            <div className="flex gap-2">
              <button onClick={() => inputRef.current?.click()}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] px-3 py-1.5 rounded-md text-[0.72rem] font-semibold cursor-pointer hover:text-[#e6edf5]">
                + Select Images
              </button>
              {anyDone && (
                <button onClick={downloadZip}
                  className="bg-[var(--accent)] text-black px-3 py-1.5 rounded-md text-[0.72rem] font-extrabold cursor-pointer hover:brightness-110 active:brightness-125 shadow-[0_4px_12px_var(--accent-glow)]">
                  Download ZIP
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
