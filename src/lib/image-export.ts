export type OutputFormat = "jpeg" | "png" | "webp" | "ico";

export const OUTPUT_FORMATS = ["jpeg", "png", "webp", "ico"] as const;
export const FORMAT_MIME: Record<OutputFormat, string> = {
  jpeg: "image/jpeg", png: "image/png", webp: "image/webp", ico: "image/x-icon",
};

export function outputExtension(blob: Blob): string {
  const extension = Object.entries(FORMAT_MIME).find(([, mime]) => mime === blob.type)?.[0];
  if (!extension) throw new Error("Unrecognized export format. Please try PNG.");
  return extension === "jpeg" ? "jpg" : extension;
}

export async function verifyImageBlob(blob: Blob, mime: string): Promise<Blob> {
  const b = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
  const signature = mime === "image/png" ? b[0] === 137 && b[1] === 80 && b[2] === 78 && b[3] === 71 && b[4] === 13 && b[5] === 10 && b[6] === 26 && b[7] === 10
    : mime === "image/jpeg" ? b[0] === 255 && b[1] === 216 && b[2] === 255
    : mime === "image/webp" ? String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP"
    : mime === "image/x-icon" ? b[0] === 0 && b[1] === 0 && b[2] === 1 && b[3] === 0 && b[4] === 1 && b[5] === 0
    : false;
  if (blob.type !== mime || !signature) {
    throw new Error("Your browser cannot export this format. Choose PNG or JPEG instead.");
  }
  return blob;
}

export async function canvasBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Image export failed. Try a smaller image.")), mime, quality);
  });
  return verifyImageBlob(blob, mime);
}

export function downloadImage(blob: Blob, name: string) {
  downloadBlob(blob, `${name}.${outputExtension(blob)}`);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  a.hidden = true;
  // Keep the anchor connected while the browser starts the download. WebKit
  // can defer blob navigation; revoking immediately can cancel that request.
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 10000);
}
