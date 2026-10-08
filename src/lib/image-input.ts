// Some browsers/operating systems leave the MIME type empty for WebP and
// other image formats. The image decoder still validates the actual bytes.
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/") ||
    ((!file.type || file.type === "application/octet-stream") && /\.(png|jpe?g|webp|avif|gif|svg|bmp|ico|tiff?)$/i.test(file.name));
}

export function matchesImageFormat(file: File, format: string): boolean {
  const mime = `image/${format === "jpg" ? "jpeg" : format}`;
  if (file.type && file.type !== "application/octet-stream") return file.type === mime;
  const extension = file.name.split(".").pop()?.toLowerCase();
  return format === "jpg" ? extension === "jpg" || extension === "jpeg" : extension === format;
}
