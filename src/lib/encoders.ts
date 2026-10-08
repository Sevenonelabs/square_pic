// One PNG-backed icon. Directory dimensions describe the embedded PNG.
export async function encodeICO(pngBlob: Blob, width: number, height: number): Promise<Blob> {
  const png = new Uint8Array(await pngBlob.arrayBuffer());
  const buffer = new ArrayBuffer(22 + png.length);
  const view = new DataView(buffer);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);
  view.setUint8(6, width === 256 ? 0 : width);
  view.setUint8(7, height === 256 ? 0 : height);
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, png.length, true);
  view.setUint32(18, 22, true);
  new Uint8Array(buffer).set(png, 22);
  return new Blob([buffer], { type: "image/x-icon" });
}
