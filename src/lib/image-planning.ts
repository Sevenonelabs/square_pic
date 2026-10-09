import { MAX_EXPORT_EDGE } from "./editor-renderer";

export function validPixelDimension(value: number) {
  return Number.isInteger(value) && value >= 1 && value <= 100000;
}

export function squarePlan(width: number, height: number, edge: number) {
  if (!validPixelDimension(width) || !validPixelDimension(height) ||
      !Number.isInteger(edge) || edge < 1 || edge > MAX_EXPORT_EDGE) return null;
  const fitScale = edge / Math.max(width, height);
  const cropEdge = Math.min(width, height);
  return {
    fitWidth: width * fitScale,
    fitHeight: height * fitScale,
    horizontalPadding: (edge - width * fitScale) / 2,
    verticalPadding: (edge - height * fitScale) / 2,
    fitScale,
    cropEdge,
    cropLeftRight: (width - cropEdge) / 2,
    cropTopBottom: (height - cropEdge) / 2,
    cropScale: edge / cropEdge,
  };
}

export function printPlan(width: number, height: number, inchesWide: number, inchesHigh: number, ppi: number) {
  if (!validPixelDimension(width) || !validPixelDimension(height) ||
      !Number.isFinite(inchesWide) || inchesWide <= 0 || inchesWide > 100 ||
      !Number.isFinite(inchesHigh) || inchesHigh <= 0 || inchesHigh > 100 ||
      !Number.isInteger(ppi) || ppi < 1 || ppi > 1200) return null;
  const targetWidth = Math.max(1, Math.round(inchesWide * ppi));
  const targetHeight = Math.max(1, Math.round(inchesHigh * ppi));
  const scale = Math.max(targetWidth / width, targetHeight / height);
  const sourcePpi = Math.min(width / inchesWide, height / inchesHigh);
  const needsCrop = Math.abs(width * targetHeight - height * targetWidth) > 0;
  const candidates = [2, 3, 4].filter((factor) => factor >= scale);
  const multiplier = candidates.find((factor) => {
    const w = width * factor, h = height * factor;
    return w <= 16384 && h <= 16384 && w * h <= 40000000;
  });
  return { targetWidth, targetHeight, scale, sourcePpi, needsCrop,
    multiplier: scale <= 1 ? null : multiplier ?? null,
    status: scale <= 1 ? "source-sufficient" as const : multiplier ? "supported" as const : "unsupported" as const,
  };
}
