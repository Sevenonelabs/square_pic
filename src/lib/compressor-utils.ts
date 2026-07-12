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

function getCanvasBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas toBlob failed"));
    }, mimeType, quality);
  });
}

async function compressToTargetSize(
  canvas: HTMLCanvasElement,
  mimeType: string,
  targetSizeInBytes: number,
  maxIterations = 8
): Promise<Blob> {
  let low = 0.01;
  let high = 1.0;
  let bestBlob: Blob | null = null;

  for (let i = 0; i < maxIterations; i++) {
    const quality = (low + high) / 2;
    const blob = await getCanvasBlob(canvas, mimeType, quality);
    if (blob.size <= targetSizeInBytes) {
      bestBlob = blob;
      low = quality;
    } else {
      high = quality;
    }
  }

  if (!bestBlob || bestBlob.size > targetSizeInBytes) {
    let scale = 0.95;
    const origWidth = canvas.width;
    const origHeight = canvas.height;

    while (scale > 0.05) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = Math.round(origWidth * scale);
      tempCanvas.height = Math.round(origHeight * scale);
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        if (mimeType === "image/jpeg") {
          tempCtx.fillStyle = "#FFFFFF";
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }
        tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

        let scaleLow = 0.05;
        let scaleHigh = 0.95;
        let scaleBestBlob: Blob | null = null;

        for (let i = 0; i < 6; i++) {
          const quality = (scaleLow + scaleHigh) / 2;
          const blob = await getCanvasBlob(tempCanvas, mimeType, quality);
          if (blob.size <= targetSizeInBytes) {
            scaleBestBlob = blob;
            scaleLow = quality;
          } else {
            scaleHigh = quality;
          }
        }

        if (scaleBestBlob && scaleBestBlob.size <= targetSizeInBytes) {
          return scaleBestBlob;
        }
      }
      scale -= 0.1;
    }
  }

  return bestBlob || (await getCanvasBlob(canvas, mimeType, 0.01));
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
  if (!item.imgElement) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        item.imgElement = img;
        resolve();
      };
      img.src = item.src;
    });
  }

  const canvas = document.createElement("canvas");
  canvas.width = item.imgElement!.naturalWidth;
  canvas.height = item.imgElement!.naturalHeight;
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
  ctx.drawImage(item.imgElement!, 0, 0);

  let blob: Blob;
  if (mode === "slider") {
    blob = await getCanvasBlob(canvas, mime, sliderQuality / 100);
  } else {
    const sizeInBytes = targetSizeValue * (targetSizeUnit === "MB" ? 1024 * 1024 : 1024);
    blob = await compressToTargetSize(canvas, mime, sizeInBytes);
  }

  return { blob, size: blob.size };
}
