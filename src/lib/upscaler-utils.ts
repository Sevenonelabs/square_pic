export interface UpscaleResult {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

export function createComparisonOriginal(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  pixelated = true
): string {
  const c = document.createElement("canvas");
  c.width = targetWidth;
  c.height = targetHeight;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = !pixelated;
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
  return c.toDataURL();
}

function sharpenCanvas(canvas: HTMLCanvasElement, amount: number) {
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width;
  const h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const src = new Uint8ClampedArray(imageData.data);
  const dst = imageData.data;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;

      const ri =
        src[idx - w * 4 - 4] + src[idx - w * 4] + src[idx - w * 4 + 4] +
        src[idx - 4] + src[idx] + src[idx + 4] +
        src[idx + w * 4 - 4] + src[idx + w * 4] + src[idx + w * 4 + 4];
      const gi =
        src[idx - w * 4 - 4 + 1] + src[idx - w * 4 + 1] + src[idx - w * 4 + 4 + 1] +
        src[idx - 4 + 1] + src[idx + 1] + src[idx + 4 + 1] +
        src[idx + w * 4 - 4 + 1] + src[idx + w * 4 + 1] + src[idx + w * 4 + 4 + 1];
      const bi =
        src[idx - w * 4 - 4 + 2] + src[idx - w * 4 + 2] + src[idx - w * 4 + 4 + 2] +
        src[idx - 4 + 2] + src[idx + 2] + src[idx + 4 + 2] +
        src[idx + w * 4 - 4 + 2] + src[idx + w * 4 + 2] + src[idx + w * 4 + 4 + 2];

      dst[idx] = Math.max(0, Math.min(255, src[idx] + amount * (src[idx] - ri / 9)));
      dst[idx + 1] = Math.max(0, Math.min(255, src[idx + 1] + amount * (src[idx + 1] - gi / 9)));
      dst[idx + 2] = Math.max(0, Math.min(255, src[idx + 2] + amount * (src[idx + 2] - bi / 9)));
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

export async function upscaleImage(
  image: HTMLImageElement,
  scale: number,
  sharpen: boolean
): Promise<UpscaleResult> {
  const ow = image.naturalWidth;
  const oh = image.naturalHeight;
  const nw = Math.round(ow * scale);
  const nh = Math.round(oh * scale);

  const canvas = document.createElement("canvas");
  canvas.width = nw;
  canvas.height = nh;
  const ctx = canvas.getContext("2d")!;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(image, 0, 0, nw, nh);

  if (sharpen) {
    sharpenCanvas(canvas, 0.6);
  }

  return { canvas, width: nw, height: nh, originalWidth: ow, originalHeight: oh };
}
