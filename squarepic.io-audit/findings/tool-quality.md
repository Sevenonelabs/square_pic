# Live tool quality audit

Audited on 2026-10-08 with fresh uploads and actual downloads from https://www.squarepic.io. Test input `data/test-transparent.png` is synthetic 600 x 400 RGBA, 2,929 bytes, with transparent corners and a red center. Local source only corroborates observations. Pending local edits are not deployed fixes.

## Export results

| Tool/action | Actual result | Assessment |
|---|---|---|
| Homepage square PNG | Valid PNG 600 x 600, alpha 77 to 255 | Core workflow succeeds; blur affects transparency |
| Converter WebP | Valid WebP 600 x 400, alpha 0 to 255 | Pass for this input |
| Converter JPEG | Valid JPEG 600 x 400; white flattening | Pass for this input |
| Converter AVIF | `.avif` filename, `image/png` blob, PNG signature | High: format mismatch |
| Converter BMP | `.bmp` filename, `image/png` blob, PNG signature | High: format mismatch |
| Converter TIFF | TIFF-like header; Pillow and FFmpeg reject file | High: corrupt output for this input |
| Converter GIF | Chromium editor accepts it; Pillow full pixel decode fails | Decoder compatibility failure; not universal corruption |
| Converter ICO | Valid ICO 256 x 256, alpha 0 to 255 | Succeeds; rectangular source is stretched square |
| Compressor default JPEG | JPEG 600 x 400, 5,605 bytes | Grows 91%; transparency removed |
| Cropper default desktop PNG | PNG 560 x 560 from 600 x 400 | Display crop dimensions; includes empty area/enlargement |
| Cropper 16:9 desktop PNG | PNG 700 x 394 from 600 x 400 | Uses display crop size |
| Upscaler 2x PNG | PNG 1200 x 800, alpha 0 to 255 | Size/transparency pass |
| Homepage Instagram Stories/Reels preset | Valid PNG 1080 x 1920 | Exact preset dimensions pass |

Evidence: `data/tool-results.json`, downloaded binaries in `data/`, `data/compressor-retest.json`, `data/extra-results.json`, `data/preset-export.json`. Alpha checks decode pixels. GIF full pixel decoding failed in Pillow, while Chromium accepted re-upload in the homepage editor. Treat this as interoperability failure, not proof every reader rejects the GIF.

## Reproducible failures

### High: AVIF and BMP outputs are disguised PNGs

Open `/converter`, upload test PNG, select AVIF, Convert All, Download. Result `test-transparent.avif` has blob MIME `image/png`, starts `89 50 4e 47 0d 0a 1a 0a`, and decodes as PNG. BMP produces the same mismatch. This undermines AVIF landing-page intent. Unsupported canvas MIME types silently fall back to PNG. Local `src/components/converter/converter-tool.tsx` lines 98 to 109 calls `canvas.toBlob` without checking returned `blob.type`; download naming uses requested format. Add real encoders or remove unsupported output choices; verify MIME/signature. Screenshots `converter-avif-done.png`, `converter-bmp-done.png`.

### High: TIFF download is invalid

Pillow rejects actual TIFF download with `Truncated File Read` and `cannot identify image file`. FFmpeg independently returns `Invalid data found when processing input`. Local `src/lib/encoders.ts` corroborates malformed IFD entries: count 10 despite 11 entries, five 16-bit values per entry rather than a full 12-byte TIFF entry, and incorrect multi-value/rational offsets. Use a tested encoder and round-trip pixel decoding. Evidence `data/convert-tiff-test-transparent.tiff`, `converter-tiff-done.png`.

### High: completed compression ignores setting changes

Upload PNG to `/compressor`, Compress All with default JPEG, select WEBP, Compress All again, Download. The result remains JPEG with the same 5,605 bytes. Local `src/components/compressor/compressor-tool.tsx` line 54 filters out completed items without invalidating them when settings change. Reset results or reprocess all files after format/quality/target changes. Evidence `data/compressor-retest.json`, `screenshots/compressor-webp-after-recompress.png`.

### Medium: compressor enlarges small PNG and removes transparency

Default output grows 2,929 bytes to 5,605 and UI prints `--91%`. Offer keep-original when no saving occurs, label growth plainly, warn before alpha removal and avoid "without losing quality" for lossy output. UI only outputs JPEG/WebP, so explanatory PNG lossless-compression advice describes no supported export workflow. Evidence `compressor-result.png`.

### High: crop export uses display coordinates

Desktop default exports 560 x 560; 16:9 exports 700 x 394, both from a 600 x 400 input. Mobile default also exports 560 x 560. Source sets output dimensions from `Math.round(c.w)`/`Math.round(c.h)`, where `c` is display crop rectangle, then scales source coordinates separately. Convert display dimensions back to source pixels and clamp to source image bounds. This conflicts with full-resolution crop promises. Evidence `cropper-uploaded.png`, exported PNGs and `data/extra-results.json` mobile comparison. A device-dependent dimension change was not observed in this sample.

### Medium: calculator and platform pages lack promised task depth

Live calculator matches exact preset dimensions. It does not calculate aspect ratio or proportional resize for 600 x 400 despite copy describing aspect-ratio matching and dimension calculation. Local calculator has GCD, ratio/megapixel and proportional sizing logic, but live does not. `/resize/instagram` has no upload/editor; CTA opens generic home without platform/preset selection. Visitors must manually choose the preset afterward. Match titles/CTAs to current capability or pass platform/preset state into editor. Evidence `data/browser-inspect.json`, `data/extra-results.json`.

### Medium: upscaler overstates algorithm guarantees

Live copy promises bicubic/GPU-accelerated bicubic processing. Local implementation sets browser canvas `imageSmoothingQuality='high'`, which does not guarantee a bicubic algorithm, then applies a CPU pixel sharpening loop. The 2x size and PNG alpha pass. Describe browser smoothing and optional sharpening. Local pending copy already does so; verify after deployment. Evidence `data/tool-ui.json`, `src/lib/upscaler-utils.ts`, `screenshots/upscaler-result.png`.

## Before release

Check signatures, MIME and full pixel decoding for every output with portrait/landscape/alpha/animated inputs. Re-test changed settings after completed batches. Check crop source bounds and dimensions on desktop/mobile. Test exact platform preset exports. Measure large-image responsiveness, memory and cancellation separately; small inputs do not establish maximum-size reliability.
