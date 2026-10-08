import { canvasBlob } from "./image-export";

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return "0 Bytes";
  const i = Math.min(3, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${parseFloat((bytes / 1024 ** i).toFixed(Math.max(0, decimals)))} ${["Bytes", "KB", "MB", "GB"][i]}`;
}

export function truncateMiddle(str: string, maxLength = 16) {
  if (str.length <= maxLength) return str;
  const mid = Math.floor(maxLength / 2) - 1;
  return str.substring(0, mid) + "..." + str.substring(str.length - mid);
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("This image could not be decoded. Try PNG, JPEG or WebP."));
    img.src = src;
  });
}

async function searchQuality(canvas: HTMLCanvasElement, mime: string, target: number): Promise<Blob | null> {
  const highest = await canvasBlob(canvas, mime, 0.95);
  if (highest.size <= target) return highest;
  let best = await canvasBlob(canvas, mime, 0.05);
  if (best.size > target) return null;
  let low = 0.05, high = 0.95;
  // Each midpoint depends on the previous encode result.
  for (let i = 0; i < 8; i++) {
    const quality = (low + high) / 2;
    const blob = await canvasBlob(canvas, mime, quality);
    if (blob.size <= target) { best = blob; low = quality; }
    else high = quality;
  }
  return best;
}

export interface FileItem {
  id: string; file: File; name: string; size: number; src: string;
  imgElement: HTMLImageElement | null;
  status: "ready" | "compressing" | "done" | "error";
  compressedBlob: Blob | null; newSize: number | null;
  width?: number; height?: number; error?: string;
}

export async function compressFile(
  item: FileItem, mode: "slider" | "size", sliderQuality: number,
  targetFormat: "jpeg" | "webp", targetSizeValue: number, targetSizeUnit: "KB" | "MB"
): Promise<{ blob: Blob; size: number; width: number; height: number }> {
  const img = item.imgElement ?? await loadImage(item.src);
  const mime = `image/${targetFormat}`;
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image is too large for this browser.");
  if (targetFormat === "jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.drawImage(img, 0, 0);
  if (mode === "slider") {
    const blob = await canvasBlob(canvas, mime, sliderQuality / 100);
    return { blob, size: blob.size, width: canvas.width, height: canvas.height };
  }
  const target = targetSizeValue * (targetSizeUnit === "MB" ? 1048576 : 1024);
  if (!Number.isFinite(target) || target <= 0) throw new Error("Enter a target size greater than zero.");
  let blob = await searchQuality(canvas, mime, target);
  if (blob) return { blob, size: blob.size, width: canvas.width, height: canvas.height };
  const smallest = document.createElement("canvas");
  smallest.width = 1;
  smallest.height = 1;
  const smallestCtx = smallest.getContext("2d");
  if (!smallestCtx) throw new Error("Image resizing failed.");
  smallestCtx.drawImage(canvas, 0, 0, 1, 1);
  const smallestBlob = await searchQuality(smallest, mime, target);
  if (!smallestBlob) throw new Error("This target is too small for a valid image. Choose a larger size.");
  let width = canvas.width, height = canvas.height;
  while (width > 1 || height > 1) {
    width = Math.max(1, Math.floor(width * 0.8));
    height = Math.max(1, Math.floor(height * 0.8));
    const resized = document.createElement("canvas");
    resized.width = width; resized.height = height;
    const resizedCtx = resized.getContext("2d");
    if (!resizedCtx) throw new Error("Image resizing failed.");
    resizedCtx.drawImage(canvas, 0, 0, width, height);
    blob = await searchQuality(resized, mime, target);
    if (blob) return { blob, size: blob.size, width, height };
  }
  throw new Error("This target is too small for a valid image. Choose a larger size.");
}
