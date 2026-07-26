export function encodeGIF(
  imageData: ImageData,
  maxColors = 255
): Uint8Array {
  const { data, width, height } = imageData;
  const totalPixels = width * height;

  // Build color histogram (colorKey -> count)
  const hist = new Map<number, { r: number; g: number; b: number; count: number }>();
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
    if (a < 128) continue;
    const key = (r << 16) | (g << 8) | b;
    const entry = hist.get(key);
    if (entry) entry.count++;
    else hist.set(key, { r, g, b, count: 1 });
  }

  const colors: { r: number; g: number; b: number; count: number }[] = Array.from(hist.values());
  const numColors = colors.length;

  // Weighted median-cut on histogram entries
  function medianCutWeighted(arr: typeof colors, depth: number): typeof colors {
    if (arr.length <= 1 || depth >= 8) return arr;

    let rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0;
    for (const c of arr) {
      if (c.r < rMin) rMin = c.r;
      if (c.r > rMax) rMax = c.r;
      if (c.g < gMin) gMin = c.g;
      if (c.g > gMax) gMax = c.g;
      if (c.b < bMin) bMin = c.b;
      if (c.b > bMax) bMax = c.b;
    }
    const rRng = rMax - rMin, gRng = gMax - gMin, bRng = bMax - bMin;
    const axis = rRng >= gRng && rRng >= bRng ? 0 : gRng >= bRng ? 1 : 2;

    arr.sort((a, b) => {
      const va = axis === 0 ? a.r : axis === 1 ? a.g : a.b;
      const vb = axis === 0 ? b.r : axis === 1 ? b.g : b.b;
      return va - vb;
    });

    let totalCount = 0;
    for (const c of arr) totalCount += c.count;
    const half = totalCount / 2;
    let running = 0;
    let splitIdx = 0;
    for (let i = 0; i < arr.length; i++) {
      running += arr[i].count;
      if (running >= half) { splitIdx = i + 1; break; }
    }
    if (splitIdx === 0 || splitIdx >= arr.length) return arr;

    return [
      ...medianCutWeighted(arr.slice(0, splitIdx), depth + 1),
      ...medianCutWeighted(arr.slice(splitIdx), depth + 1),
    ];
  }

  const quantized = medianCutWeighted(colors, 0);
  const palette = quantized.map((c) => [c.r, c.g, c.b] as [number, number, number]);

  // Map each pixel to nearest palette color (with 5-bit quantized LUT cache)
  const colorIndices = new Uint8Array(totalPixels);
  const nearestLUT = new Map<number, number>();
  const qshift = 3;
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
    if (a < 128) { colorIndices[i] = 0; continue; }
    const qkey = ((r >> qshift) << 10) | ((g >> qshift) << 5) | (b >> qshift);
    let pi = nearestLUT.get(qkey) ?? -1;
    if (pi < 0) {
      let bestDist = Infinity;
      let bestP = 0;
      for (let p = 0; p < palette.length; p++) {
        const dr = r - palette[p][0], dg = g - palette[p][1], db = b - palette[p][2];
        const dist = dr * dr + dg * dg + db * db;
        if (dist < bestDist) { bestDist = dist; bestP = p; }
      }
      pi = bestP;
      nearestLUT.set(qkey, pi);
    }
    colorIndices[i] = pi;
  }

  const colorCount = Math.min(palette.length, maxColors);

  // LZW compression with integer keys
  let clearCode = 1 << Math.min(8, Math.ceil(Math.log2(colorCount + 1)));
  if (clearCode < 4) clearCode = 4;
  const eoiCode = clearCode + 1;
  const initCodeSize = Math.ceil(Math.log2(clearCode + 2));

  const dict = new Map<number, number>();
  for (let i = 0; i < colorCount; i++) dict.set(i, i);

  const lzwData: number[] = [clearCode];
  let nextCode = eoiCode + 1;
  let current = colorIndices[0];

  for (let i = 1; i < totalPixels; i++) {
    const sym = colorIndices[i];
    const key = (current + 1) * 256 + sym;
    const entry = dict.get(key);
    if (entry !== undefined) {
      current = entry;
    } else {
      lzwData.push(current);
      if (nextCode < 4096) dict.set(key, nextCode++);
      current = sym;
    }
  }
  lzwData.push(current);
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

  let buf = 0, bits = 0, cs = initCodeSize;
  for (const code of lzwData) {
    buf |= code << bits;
    bits += cs;
    while (bits >= 8) {
      gif.push(buf & 0xff);
      buf >>= 8;
      bits -= 8;
    }
    if (code === clearCode || code === eoiCode) cs = initCodeSize;
    else if (code + 1 > (1 << cs) && cs < 12) cs++;
  }
  if (bits > 0) gif.push(buf & 0xff);
  gif.push(0x00);
  gif.push(0x3b);

  return new Uint8Array(gif);
}

export async function encodeICO(pngBlob: Blob): Promise<Blob> {
  const pngArray = new Uint8Array(await pngBlob.arrayBuffer());
  const pngSize = pngArray.length;

  const header = new ArrayBuffer(6 + 16 + pngSize);
  const view = new DataView(header);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);

  const entryOffset = 6;
  view.setUint8(entryOffset, 0);
  view.setUint8(entryOffset + 1, 0);
  view.setUint8(entryOffset + 2, 0);
  view.setUint8(entryOffset + 3, 0);
  view.setUint16(entryOffset + 4, 1, true);
  view.setUint16(entryOffset + 6, 32, true);
  view.setUint32(entryOffset + 8, pngSize, true);
  view.setUint32(entryOffset + 12, 22, true);

  new Uint8Array(header).set(pngArray, 22);

  return new Blob([header], { type: "image/x-icon" });
}

export function encodeTIFF(imageData: ImageData): Blob {
  const { data, width, height } = imageData;

  const stripData = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    stripData[i * 3] = data[i * 4];
    stripData[i * 3 + 1] = data[i * 4 + 1];
    stripData[i * 3 + 2] = data[i * 4 + 2];
  }

  const ifd: number[] = [];
  function addEntry(tag: number, type: number, count: number, value: number) {
    ifd.push(tag, type, count, value & 0xffff, (value >> 16) & 0xffff);
  }

  const stripOffset = 8 + 2 + 12 * 10 + 4;
  const stripByteCounts = stripData.length;

  ifd.push(10);
  addEntry(256, 3, 1, width);
  addEntry(257, 3, 1, height);
  addEntry(258, 3, 3, 8);
  addEntry(259, 3, 1, 1);
  addEntry(262, 3, 1, 2);
  addEntry(273, 4, 1, stripOffset);
  addEntry(277, 3, 1, 3);
  addEntry(278, 3, 1, height);
  addEntry(279, 4, 1, stripByteCounts);
  addEntry(282, 5, 1, 72);
  addEntry(283, 5, 1, 72);
  ifd.push(0);

  const tiff = new Uint8Array(8 + ifd.length * 2 + stripByteCounts);
  const view = new DataView(tiff.buffer);
  view.setUint16(0, 0x4949, true);
  view.setUint16(2, 42, true);
  view.setUint32(4, 8, true);

  for (let i = 0; i < ifd.length; i++) {
    view.setUint16(8 + i * 2, ifd[i], true);
  }

  const ifdEnd = 8 + ifd.length * 2;
  tiff.set(stripData, ifdEnd);

  return new Blob([tiff], { type: "image/tiff" });
}
