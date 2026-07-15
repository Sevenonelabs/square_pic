"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";

const RATIOS: { label: string; value: number | null }[] = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "3:2", value: 3 / 2 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

type Handle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

const HANDLE_SIZE = 10;
const HANDLE_COORDS: [Handle, (c: { x: number; y: number; w: number; h: number }) => { x: number; y: number }][] = [
  ["nw", (c) => ({ x: c.x, y: c.y })],
  ["n", (c) => ({ x: c.x + c.w / 2, y: c.y })],
  ["ne", (c) => ({ x: c.x + c.w, y: c.y })],
  ["e", (c) => ({ x: c.x + c.w, y: c.y + c.h / 2 })],
  ["se", (c) => ({ x: c.x + c.w, y: c.y + c.h })],
  ["s", (c) => ({ x: c.x + c.w / 2, y: c.y + c.h })],
  ["sw", (c) => ({ x: c.x, y: c.y + c.h })],
  ["w", (c) => ({ x: c.x, y: c.y + c.h / 2 })],
];

function hitTestHandle(x: number, y: number, crop: { x: number; y: number; w: number; h: number }): Handle | null {
  const hs = HANDLE_SIZE;
  for (const [handle, getPos] of HANDLE_COORDS) {
    const pos = getPos(crop);
    if (Math.abs(x - pos.x) < hs && Math.abs(y - pos.y) < hs) {
      return handle;
    }
  }
  return null;
}

function isInsideCrop(x: number, y: number, crop: { x: number; y: number; w: number; h: number }): boolean {
  return x >= crop.x && x <= crop.x + crop.w && y >= crop.y && y <= crop.y + crop.h;
}

export function CropperTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<{
    mode: "pan" | Handle | "move";
    startX: number; startY: number;
    startPan: typeof pan;
    startCrop: typeof crop | null;
  } | null>(null);

  const [crop, setCrop] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [ratio, setRatio] = useState<number | null>(null);

  const [expFormat, setExpFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [expQuality, setExpQuality] = useState(90);

  const imgRef = useRef(image);
  imgRef.current = image;

  useEffect(() => {
    if (!image || !canvasRef.current || !containerRef.current) return;
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;
    const initSize = Math.min(cw, ch) * 0.8;
    setCrop({ x: (cw - initSize) / 2, y: (ch - initSize) / 2, w: initSize, h: initSize });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [image]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imgRef.current;
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, cw, ch);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.min(cw / imgW, ch / imgH);
    const dx = (cw / zoom - pan.x / zoom - imgW * scale) / 2;
    const dy = (ch / zoom - pan.y / zoom - imgH * scale) / 2;
    ctx.drawImage(img, dx, dy, imgW * scale, imgH * scale);

    ctx.restore();

    if (!crop) return;
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);

    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, cw, crop.y);
    ctx.fillRect(0, crop.y + crop.h, cw, ch - crop.y - crop.h);
    ctx.fillRect(0, crop.y, crop.x, crop.h);
    ctx.fillRect(crop.x + crop.w, crop.y, cw - crop.x - crop.w, crop.h);

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(crop.x + (crop.w * i) / 3, crop.y);
      ctx.lineTo(crop.x + (crop.w * i) / 3, crop.y + crop.h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crop.x, crop.y + (crop.h * i) / 3);
      ctx.lineTo(crop.x + crop.w, crop.y + (crop.h * i) / 3);
      ctx.stroke();
    }

    const hs = HANDLE_SIZE;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    for (const [, getPos] of HANDLE_COORDS) {
      const pos = getPos(crop);
      ctx.fillRect(pos.x - hs / 2, pos.y - hs / 2, hs, hs);
      ctx.strokeRect(pos.x - hs / 2, pos.y - hs / 2, hs, hs);
    }
    ctx.restore();
  }, [crop, zoom, pan]);

  useEffect(() => {
    if (image) render();
  }, [image, render]);

  const getCanvasCoords = useCallback((e: React.PointerEvent): { x: number; y: number } | null => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, mode: "pan" | Handle | "move") => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragging({
        mode,
        startX: e.clientX,
        startY: e.clientY,
        startPan: { ...pan },
        startCrop: crop ? { ...crop } : null,
      });
    },
    [pan, crop]
  );

  const handleCanvasPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!crop || !canvasRef.current) {
        handlePointerDown(e, "pan");
        return;
      }
      const coords = getCanvasCoords(e);
      if (!coords) return;

      const hitHandle = hitTestHandle(coords.x, coords.y, crop);
      if (hitHandle) {
        handlePointerDown(e, hitHandle);
        return;
      }

      if (isInsideCrop(coords.x, coords.y, crop)) {
        handlePointerDown(e, "move");
        return;
      }

      handlePointerDown(e, "pan");
    },
    [crop, getCanvasCoords, handlePointerDown]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !crop) return;
      const dx = (e.clientX - dragging.startX) / (zoom || 1);
      const dy = (e.clientY - dragging.startY) / (zoom || 1);

      if (dragging.mode === "pan") {
        setPan({
          x: dragging.startPan.x + (e.clientX - dragging.startX),
          y: dragging.startPan.y + (e.clientY - dragging.startY),
        });
        return;
      }

      const sc = dragging.startCrop || crop;
      let nx = sc.x, ny = sc.y, nw = sc.w, nh = sc.h;
      const cw = canvasRef.current?.width ?? 700;
      const ch = canvasRef.current?.height ?? 700;

      if (dragging.mode === "move") {
        nx = sc.x + dx;
        ny = sc.y + dy;
      } else if (dragging.mode === "e") {
        nw = Math.max(20, sc.w + dx);
        if (ratio) nh = nw / ratio;
      } else if (dragging.mode === "w") {
        nw = Math.max(20, sc.w - dx);
        nx = sc.x + sc.w - nw;
        if (ratio) nh = nw / ratio;
      } else if (dragging.mode === "s") {
        nh = Math.max(20, sc.h + dy);
        if (ratio) nw = nh * ratio;
      } else if (dragging.mode === "n") {
        nh = Math.max(20, sc.h - dy);
        ny = sc.y + sc.h - nh;
        if (ratio) nw = nh * ratio;
      } else if (dragging.mode === "se") {
        nw = Math.max(20, sc.w + dx);
        nh = Math.max(20, sc.h + dy);
        if (ratio) { const ar = Math.max(nw / ratio, nh); nw = ar * ratio; nh = ar; }
      } else if (dragging.mode === "sw") {
        nw = Math.max(20, sc.w - dx);
        nx = sc.x + sc.w - nw;
        nh = Math.max(20, sc.h + dy);
        if (ratio) { const ar = Math.max(nw / ratio, nh); nw = ar * ratio; nh = ar; nx = sc.x + sc.w - nw; }
      } else if (dragging.mode === "ne") {
        nw = Math.max(20, sc.w + dx);
        nh = Math.max(20, sc.h - dy);
        ny = sc.y + sc.h - nh;
        if (ratio) { const ar = Math.max(nw / ratio, nh); nw = ar * ratio; nh = ar; ny = sc.y + sc.h - nh; }
      } else if (dragging.mode === "nw") {
        nw = Math.max(20, sc.w - dx);
        nx = sc.x + sc.w - nw;
        nh = Math.max(20, sc.h - dy);
        ny = sc.y + sc.h - nh;
        if (ratio) { const ar = Math.max(nw / ratio, nh); nw = ar * ratio; nh = ar; nx = sc.x + sc.w - nw; ny = sc.y + sc.h - nh; }
      }

      nw = Math.max(20, Math.min(nw, cw - nx));
      nh = Math.max(20, Math.min(nh, ch - ny));
      nx = Math.max(0, Math.min(nx, cw - nw));
      ny = Math.max(0, Math.min(ny, ch - nh));

      setCrop({ x: nx, y: ny, w: nw, h: nh });
    },
    [dragging, crop, zoom, ratio]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.1, Math.min(10, z - e.deltaY * 0.002)));
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setImage(img); };
    img.src = url;
  }, []);

  const handleExport = useCallback(() => {
    if (!image || !crop) return;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(crop.w);
    canvas.height = Math.round(crop.h);
    const ctx = canvas.getContext("2d")!;
    if (expFormat === "jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    const scale = Math.min(
      (canvasRef.current?.width || 1) / image.naturalWidth,
      (canvasRef.current?.height || 1) / image.naturalHeight
    );
    const ox = ((canvasRef.current?.width || 1) / zoom - pan.x / zoom - image.naturalWidth * scale) / 2;
    const oy = ((canvasRef.current?.height || 1) / zoom - pan.y / zoom - image.naturalHeight * scale) / 2;
    ctx.drawImage(
      image,
      (crop.x - ox) / scale, (crop.y - oy) / scale, crop.w / scale, crop.h / scale,
      0, 0, canvas.width, canvas.height
    );
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `cropped.${expFormat === "jpeg" ? "jpg" : expFormat}`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    }, `image/${expFormat === "jpeg" ? "jpeg" : expFormat}`, expQuality / 100);
  }, [image, crop, expFormat, expQuality, zoom, pan]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5 py-6">
      <motion.div
        initial={{ opacity: 0.99, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.015)] p-6 mb-6"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
        <h1 className="text-[1.65rem] font-extrabold tracking-tight mb-1">Free Photo Cropper</h1>
        <p className="text-[0.95rem] text-[#8d9aaa] max-w-[600px] leading-relaxed">Crop images to any size with precision controls.</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.58-4.58a1 1 0 011.41 0L11 12m0 0l2.59-2.59a1 1 0 011.41 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-[1.3rem] font-bold mb-2">Drop an image or click to browse</h3>
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
            <div
              ref={containerRef}
              className="relative bg-[#0a0c12] border border-[rgba(255,255,255,0.10)] overflow-hidden aspect-square p-1"
              onWheel={handleWheel}
              onPointerDown={handleCanvasPointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              style={{ touchAction: "none" }}
            >
              <canvas ref={canvasRef} width={700} height={700} className="w-full h-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[280px] flex flex-col gap-3"
          >
            {/* Aspect Ratio - first, most important */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Aspect Ratio</h3>
              <div className="flex flex-wrap gap-1">
                {RATIOS.map((r) => (
                  <button key={r.label} onClick={() => setRatio(r.value)}
                    className={`text-[0.6rem] font-bold px-2 py-1 rounded-sm border transition-all ${
                      ratio === r.value
                        ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#8d9aaa] hover:text-[#e6edf5]"
                    }`}
                  >{r.label}</button>
                ))}
              </div>
            </div>

            {/* Zoom */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Zoom</h3>
              <div className="flex items-center gap-2 mb-1.5">
                <button onClick={() => setZoom((z) => Math.max(0.1, z - 0.2))}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] w-7 h-7 rounded-md cursor-pointer hover:text-[#e6edf5] transition-all text-sm flex items-center justify-center">-</button>
                <input type="range" min={10} max={500} value={Math.round(zoom * 100)}
                  onChange={(e) => setZoom(Number(e.target.value) / 100)}
                  className="flex-1" />
                <button onClick={() => setZoom((z) => Math.min(10, z + 0.2))}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] w-7 h-7 rounded-md cursor-pointer hover:text-[#e6edf5] transition-all text-sm flex items-center justify-center">+</button>
              </div>
              <div className="text-center text-[0.72rem] text-[#8d9aaa] font-semibold">{Math.round(zoom * 100)}%</div>
            </div>

            {/* Crop size info */}
            {crop && (
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3">
                <div className="text-[0.65rem] text-[#8d9aaa]">Crop size: <strong className="text-[var(--accent)]">{Math.round(crop.w)} x {Math.round(crop.h)} px</strong></div>
                <div className="text-[0.55rem] text-[#576675] mt-0.5">Pan: click & drag background. Resize: drag corners.</div>
              </div>
            )}

            {/* Export */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4">
              <h3 className="text-[0.6rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Export</h3>
              <div className="flex gap-1 mb-2">
                {(["jpeg", "png", "webp"] as const).map((f) => (
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
                <>
                  <div className="flex items-center justify-between text-[0.65rem] text-[#8d9aaa] mb-1.5">
                    <span>Quality</span>
                    <span>{expQuality}%</span>
                  </div>
                  <input type="range" min={10} max={100} value={expQuality}
                    onChange={(e) => setExpQuality(Number(e.target.value))}
                    className="w-full mb-2" />
                </>
              )}
              <button onClick={handleExport}
                className="w-full bg-[var(--accent)] text-black border-none py-2.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all hover:brightness-110 active:brightness-125 shadow-[0_4px_20px_var(--accent-glow)]">
                Export Crop
              </button>
            </div>

            <button onClick={() => { setImage(null); setCrop(null); }}
              className="w-full bg-transparent border border-[rgba(255,255,255,0.06)] text-[#8d9aaa] py-2 rounded-lg text-xs font-semibold cursor-pointer hover:text-[#f43f5e] hover:border-[rgba(244,63,94,0.2)] transition-all">
              Upload New Image
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
