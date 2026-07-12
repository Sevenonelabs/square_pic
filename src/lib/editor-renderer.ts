// Canvas render pipeline — ported from main.js:944-1040

export interface EditorState {
  image: HTMLImageElement | null;
  mode: "blur" | "solid" | "crop";
  blurAmount: number;
  paddingPercent: number;
  imageScale: number;
  cornerRadius: number;
  backgroundColor: string;
  targetWidth: number;
  targetHeight: number;
}

export function renderToCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  state: EditorState
) {
  const {
    image,
    mode,
    blurAmount,
    paddingPercent,
    imageScale,
    cornerRadius,
    backgroundColor,
    targetWidth,
    targetHeight,
  } = state;

  if (!image) return;

  const hasPreset = targetWidth > 0 && targetHeight > 0;
  const canvasW = hasPreset ? targetWidth : Math.max(image.width, image.height);
  const canvasH = hasPreset ? targetHeight : canvasW;

  if (canvas.width !== canvasW || canvas.height !== canvasH) {
    canvas.width = canvasW;
    canvas.height = canvasH;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const minDim = Math.min(canvasW, canvasH);
  const radiusPx = (cornerRadius / 100) * (minDim / 2);

  ctx.clearRect(0, 0, canvasW, canvasH);

  // Apply corner radius clip
  if (radiusPx > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radiusPx, 0);
    ctx.arcTo(canvasW, 0, canvasW, radiusPx, radiusPx);
    ctx.arcTo(canvasW, canvasH, canvasW - radiusPx, canvasH, radiusPx);
    ctx.arcTo(0, canvasH, 0, canvasH - radiusPx, radiusPx);
    ctx.arcTo(0, 0, radiusPx, 0, radiusPx);
    ctx.closePath();
    ctx.clip();
  }

  if (mode === "blur") {
    ctx.filter = `blur(${blurAmount}px)`;
    const bgScale = Math.max(canvasW / image.width, canvasH / image.height);
    const bgW = image.width * bgScale;
    const bgH = image.height * bgScale;
    ctx.drawImage(image, (canvasW - bgW) / 2, (canvasH - bgH) / 2, bgW, bgH);
    ctx.filter = "none";
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else if (mode === "solid") {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
  } else if (mode === "crop") {
    const targetAspect = canvasW / canvasH;
    const imgAspect = image.width / image.height;
    let sx: number, sy: number, sw: number, sh: number;
    if (imgAspect > targetAspect) {
      sh = image.height;
      sw = image.height * targetAspect;
      sx = (image.width - sw) / 2;
      sy = 0;
    } else {
      sw = image.width;
      sh = image.width / targetAspect;
      sx = 0;
      sy = (image.height - sh) / 2;
    }
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
    if (radiusPx > 0) ctx.restore();
    return;
  }

  // Draw main image centered
  const aspect = image.width / image.height;
  let dw = canvasW;
  let dh = canvasW / aspect;
  if (dh > canvasH) {
    dh = canvasH;
    dw = canvasH * aspect;
  }

  const paddingPx = (minDim * paddingPercent) / 100;
  const paddedW = canvasW - paddingPx * 2;
  const paddedH = canvasH - paddingPx * 2;
  const paddingScale = Math.min(paddedW / canvasW, paddedH / canvasH);

  dw *= paddingScale;
  dh *= paddingScale;

  const userScaleFactor = imageScale / 100;
  dw *= userScaleFactor;
  dh *= userScaleFactor;

  const dx = (canvasW - dw) / 2;
  const dy = (canvasH - dh) / 2;

  ctx.drawImage(image, 0, 0, image.width, image.height, dx, dy, dw, dh);

  if (radiusPx > 0) ctx.restore();
}
