// GIF encoder — median-cut color quantization + LZW compression
export function encodeGIF(
  imageData: ImageData,
  maxColors = 255
): Uint8Array {
  const { data, width, height } = imageData;
  const totalPixels = width * height;

  // Median-cut color quantization
  const refs: number[] = new Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) refs[i] = i;

  function calcRange(lo: number, hi: number) {
    if (lo >= hi) return { rng: -1, axis: 0 };
    let rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0;
    for (let i = lo; i <= hi; i++) {
      const idx = refs[i] * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < rMin) rMin = r;
      if (r > rMax) rMax = r;
      if (g < gMin) gMin = g;
      if (g > gMax) gMax = g;
      if (b < bMin) bMin = b;
      if (b > bMax) bMax = b;
    }
    const rRng = rMax - rMin, gRng = gMax - gMin, bRng = bMax - bMin;
    const maxRng = Math.max(rRng, gRng, bRng);
    const axis = maxRng === rRng ? 0 : maxRng === gRng ? 1 : 2;
    return { rng: maxRng, axis };
  }

  function sortByAxis(lo: number, hi: number, axis: number) {
    const slice = refs.slice(lo, hi + 1);
    slice.sort((a, b) => data[a * 4 + axis] - data[b * 4 + axis]);
    for (let i = lo; i <= hi; i++) refs[i] = slice[i - lo];
  }

  function medianCut(lo: number, hi: number, depth: number) {
    const count = hi - lo + 1;
    if (count <= 1 || depth >= 8) return;

    const { rng, axis } = calcRange(lo, hi);
    if (rng < 0) return;

    sortByAxis(lo, hi, axis);
    const mid = lo + Math.floor(count / 2);
    medianCut(lo, mid, depth + 1);
    medianCut(mid + 1, hi, depth + 1);
  }

  medianCut(0, totalPixels - 1, 0);

  // Build palette
  const paletteMap = new Map<number, number>();
  const palette: number[][] = [];
  let transparencyIndex = -1;

  for (let i = 0; i < totalPixels; i++) {
    const idx = refs[i] * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
    if (a < 128 && transparencyIndex === -1) transparencyIndex = palette.length;

    const key = (r << 16) | (g << 8) | b;
    if (!paletteMap.has(key) && palette.length < maxColors) {
      paletteMap.set(key, palette.length);
      palette.push([r, g, b]);
    }
  }

  const colorCount = Math.min(palette.length, maxColors);
  const colorIndices = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    const idx = refs[i] * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const key = (r << 16) | (g << 8) | b;
    colorIndices[i] = paletteMap.get(key) || 0;
  }

  // LZW compression
  const clearCode = 1 << Math.min(8, Math.ceil(Math.log2(colorCount + 1)));
  const eoiCode = clearCode + 1;
  const initCodeSize = Math.ceil(Math.log2(clearCode + 2));

  const dict = new Map<string, number>();
  for (let i = 0; i < colorCount; i++) dict.set(String.fromCharCode(i), i);
  dict.set("clr", clearCode);
  dict.set("eoi", eoiCode);

  const lzwData: number[] = [clearCode];
  let nextCode = eoiCode + 1;
  let current = String.fromCharCode(colorIndices[0]);

  for (let i = 1; i < totalPixels; i++) {
    const sym = String.fromCharCode(colorIndices[i]);
    const combo = current + sym;
    if (dict.has(combo)) {
      current = combo;
    } else {
      lzwData.push(dict.get(current)!);
      if (nextCode < 4096) dict.set(combo, nextCode++);
      current = sym;
    }
  }
  lzwData.push(dict.get(current)!);
  lzwData.push(eoiCode);

  // Build GIF binary
  const gif: number[] = [];
  gif.push(0x47, 0x49, 0x46, 0x38, 0x39, 0x61);
  gif.push(width & 0xff, (width >> 8) & 0xff);
  gif.push(height & 0xff, (height >> 8) & 0xff);
  const packed = 0x80 | ((colorCount - 1) & 0x07) << 4 | ((colorCount - 1) & 0x07);
  gif.push(packed, 0, 0);
  for (let i = 0; i < colorCount; i++) gif.push(palette[i][0], palette[i][1], palette[i][2]);
  for (let i = colorCount; i < 256; i++) gif.push(0, 0, 0);
  gif.push(0x2c, 0, 0, 0, 0);
  gif.push(width & 0xff, (width >> 8) & 0xff);
  gif.push(height & 0xff, (height >> 8) & 0xff);
  gif.push(0x00);
  const minCodeSize = Math.ceil(Math.log2(colorCount));
  gif.push(minCodeSize < 2 ? 2 : minCodeSize);
  let lzwBuf: number[] = [];
  let buf = 0, bits = 0;
  let cs = initCodeSize;
  for (const code of lzwData) {
    buf |= code << bits;
    bits += cs;
    while (bits >= 8) {
      lzwBuf.push(buf & 0xff);
      buf >>= 8;
      bits -= 8;
    }
    if (code === clearCode || code === eoiCode) cs = initCodeSize;
    else if (nextCode > (1 << cs)) cs++;
  }
  if (bits > 0) lzwBuf.push(buf & 0xff);
  gif.push(lzwBuf.length);
  gif.push(...lzwBuf);
  gif.push(0x00);
  gif.push(0x3b);

  return new Uint8Array(gif);
}

// ICO encoder — wraps a PNG blob in ICO container
export async function encodeICO(pngBlob: Blob): Promise<Blob> {
  const pngArray = new Uint8Array(await pngBlob.arrayBuffer());
  const pngSize = pngArray.length;

  const header = new ArrayBuffer(6 + 16 + pngSize);
  const view = new DataView(header);

  // ICO header
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // ICO type
  view.setUint16(4, 1, true); // 1 image

  // ICO directory entry
  const entryOffset = 6;
  view.setUint8(entryOffset, 0); // width (0 = 256)
  view.setUint8(entryOffset + 1, 0); // height (0 = 256)
  view.setUint8(entryOffset + 2, 0); // colors
  view.setUint8(entryOffset + 3, 0); // reserved
  view.setUint16(entryOffset + 4, 1, true); // planes
  view.setUint16(entryOffset + 6, 32, true); // bpp
  view.setUint32(entryOffset + 8, pngSize, true); // size
  view.setUint32(entryOffset + 12, 22, true); // offset

  // PNG data
  new Uint8Array(header).set(pngArray, 22);

  return new Blob([header], { type: "image/x-icon" });
}

// TIFF encoder — basic little-endian TIFF with RGBA data
export function encodeTIFF(imageData: ImageData): Blob {
  const { data, width, height } = imageData;

  // Strip data (RGBA to RGB)
  const stripData = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    stripData[i * 3] = data[i * 4];
    stripData[i * 3 + 1] = data[i * 4 + 1];
    stripData[i * 3 + 2] = data[i * 4 + 2];
  }

  // Build IFD entries
  const ifd: number[] = [];
  function addEntry(tag: number, type: number, count: number, value: number) {
    ifd.push(tag, type, count, value & 0xffff, (value >> 16) & 0xffff);
  }

  const stripOffset = 8 + 2 + 12 * 10 + 4; // header + entryCount + entries + nextIFD
  const stripByteCounts = stripData.length;

  ifd.push(10); // number of entries
  addEntry(256, 3, 1, width);      // ImageWidth
  addEntry(257, 3, 1, height);     // ImageLength
  addEntry(258, 3, 3, 8);          // BitsPerSample (8 for each)
  addEntry(259, 3, 1, 1);          // Compression (none)
  addEntry(262, 3, 1, 2);          // PhotometricInterpretation (RGB)
  addEntry(273, 4, 1, stripOffset); // StripOffsets
  addEntry(277, 3, 1, 3);          // SamplesPerPixel
  addEntry(278, 3, 1, height);     // RowsPerStrip
  addEntry(279, 4, 1, stripByteCounts); // StripByteCounts
  addEntry(282, 5, 1, 72);         // XResolution
  addEntry(283, 5, 1, 72);         // YResolution
  ifd.push(0); // next IFD pointer

  // Build TIFF binary
  const tiff = new Uint8Array(8 + ifd.length * 2 + stripByteCounts);
  const view = new DataView(tiff.buffer);
  view.setUint16(0, 0x4949, true); // little-endian
  view.setUint16(2, 42, true);     // magic
  view.setUint32(4, 8, true);      // offset to IFD

  for (let i = 0; i < ifd.length; i++) {
    view.setUint16(8 + i * 2, ifd[i], true);
  }

  const ifdEnd = 8 + ifd.length * 2;
  tiff.set(stripData, ifdEnd);

  return new Blob([tiff], { type: "image/tiff" });
}
