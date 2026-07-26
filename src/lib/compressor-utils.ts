export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = Math.max(decimals, 0);
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function truncateMiddle(str: string, maxLength = 16) {
  if (str.length <= maxLength) return str;
  const mid = Math.floor(maxLength / 2) - 1;
  return str.substring(0, mid) + "..." + str.substring(str.length - mid);
}

export function getOutputMimeType(originalType: string, fallback: "jpeg" | "webp"): string {
  if (originalType === "image/jpeg" || originalType === "image/jpg") return "image/jpeg";
  if (originalType === "image/webp") return "image/webp";
  return fallback === "webp" ? "image/webp" : "image/jpeg";
}

const imgCache = new Map<string, HTMLImageElement>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imgCache.get(src);
  if (cached) return Promise.resolve(cached);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { imgCache.set(src, img); resolve(img); };
    img.onerror = () => reject(new Error("Image failed to load"));
    img.src = src;
  });
}

function getCanvasBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas toBlob failed"));
    }, mimeType, quality);
  });
}

function binarySearchQuality(
  canvas: HTMLCanvasElement,
  mimeType: string,
  targetSize: number,
  iterations: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    let low = 0.05;
    let high = 1.0;
    let best: Blob | null = null;
    let pending = iterations;
    let finished = false;

    function tryQuality(quality: number) {
      canvas.toBlob((blob) => {
        if (finished) return;
        if (!blob) { pending--; if (pending <= 0) resolve(best); return; }
        if (blob.size <= targetSize) {
          best = blob;
          low = quality;
          if (blob.size >= targetSize * 0.9) { finished = true; resolve(best); return; }
        } else {
          high = quality;
        }
        pending--;
        if (pending <= 0) resolve(best);
      }, mimeType, quality);
    }

    // Fire all iterations in parallel (canvas.toBlob is async but serializes on the GPU queue)
    for (let i = 0; i < iterations; i++) {
      const quality = (low + high) / 2;
      tryQuality(quality);
    }
  });
}

async function compressToTargetSize(
  canvas: HTMLCanvasElement,
  mimeType: string,
  targetSizeInBytes: number,
): Promise<Blob> {
  // Phase 1: binary search on quality (6 iterations, fired in parallel)
  let best = await binarySearchQuality(canvas, mimeType, targetSizeInBytes, 6);

  if (best && best.size <= targetSizeInBytes && best.size >= targetSizeInBytes * 0.85) {
    return best;
  }

  // Phase 2: try dimension scaling (3 steps, quality search in parallel each)
  const origW = canvas.width;
  const origH = canvas.height;
  const scales = [0.8, 0.6, 0.4];

  for (const scale of scales) {
    const temp = document.createElement("canvas");
    temp.width = Math.round(origW * scale);
    temp.height = Math.round(origH * scale);
    const tCtx = temp.getContext("2d")!;
    if (mimeType === "image/jpeg") {
      tCtx.fillStyle = "#FFFFFF";
      tCtx.fillRect(0, 0, temp.width, temp.height);
    }
    tCtx.drawImage(canvas, 0, 0, temp.width, temp.height);

    const scaled = await binarySearchQuality(temp, mimeType, targetSizeInBytes, 4);
    if (scaled && scaled.size <= targetSizeInBytes) {
      if (scaled.size >= targetSizeInBytes * 0.85) return scaled;
      best = scaled;
    }
  }

  return best || (await getCanvasBlob(canvas, mimeType, 0.05));
}

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  src: string;
  imgElement: HTMLImageElement | null;
  status: "ready" | "compressing" | "done" | "error";
  compressedBlob: Blob | null;
  newSize: number | null;
}

export async function compressFile(
  item: FileItem,
  mode: "slider" | "size",
  sliderQuality: number,
  targetFormat: "jpeg" | "webp",
  targetSizeValue: number,
  targetSizeUnit: "KB" | "MB"
): Promise<{ blob: Blob; size: number }> {
  const img = item.imgElement ?? await loadImage(item.src);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context failed");

  const mime =
    mode === "slider"
      ? getOutputMimeType(item.file.type, targetFormat)
      : targetFormat === "webp"
        ? "image/webp"
        : "image/jpeg";

  if (mime === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);

  let blob: Blob;
  if (mode === "slider") {
    blob = await getCanvasBlob(canvas, mime, sliderQuality / 100);
  } else {
    const sizeInBytes = targetSizeValue * (targetSizeUnit === "MB" ? 1024 * 1024 : 1024);
    blob = await compressToTargetSize(canvas, mime, sizeInBytes);
  }

  return { blob, size: blob.size };
}
