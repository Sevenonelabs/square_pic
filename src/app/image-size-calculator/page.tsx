"use client";

import PRESETS from "@/data/social-presets.json";
import { useRef, useState } from "react";
import { trackToolEvent } from "@/lib/analytics";
import Link from "next/link";
import { motion } from "motion/react";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";

const PLATFORMS = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "x-twitter", label: "X (Twitter)" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "pinterest", label: "Pinterest" },
  { key: "snapchat", label: "Snapchat" },
  { key: "twitch", label: "Twitch" },
  { key: "reddit", label: "Reddit" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "telegram", label: "Telegram" },
  { key: "discord", label: "Discord" },
];

const ALL_TYPES = Object.entries(PRESETS).flatMap(([platform, p]) => Object.entries(p.types).map(([key, t]) => ({ platform: platform === "twitter" ? "x-twitter" : platform, key, label: t.label, w: t.w, h: t.h })));

function greatestCommonDivisor(a: number, b: number): number {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function validDimension(value: number): boolean {
  return Number.isInteger(value) && value > 0 && value <= 10000;
}

export default function ImageSizeCalculatorPage() {
  const [searchW, setSearchW] = useState("");
  const [searchH, setSearchH] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [targetWidth, setTargetWidth] = useState("1080");
  const lastCalculation = useRef("");

  const w = Number(searchW);
  const h = Number(searchH);
  const hasValidInput = validDimension(w) && validDimension(h);
  const divisor = hasValidInput ? greatestCommonDivisor(w, h) : 1;
  const resizeWidth = Number(targetWidth);
  const resizeHeight = hasValidInput && validDimension(resizeWidth)
    ? Math.round(resizeWidth * h / w) : 0;
  const canResize = validDimension(resizeWidth) && validDimension(resizeHeight);
  const recordCalculation = () => {
    if (!searchW || !searchH) return;
    const signature = `${searchW}:${searchH}:${targetWidth}`;
    if (lastCalculation.current === signature) return;
    lastCalculation.current = signature;
    trackToolEvent(hasValidInput && canResize ? "processing_success" : "processing_error", "calculator");
  };
  const ratioMatches = hasValidInput
    ? ALL_TYPES.filter((t) => t.w * h === t.h * w && (t.w !== w || t.h !== h)) : [];

  const matches = hasValidInput
    ? ALL_TYPES.filter((t) => t.w === w && t.h === h)
    : [];

  const filteredTypes = selectedPlatform
    ? ALL_TYPES.filter((t) => t.platform === selectedPlatform)
    : ALL_TYPES;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Image Size Calculator", url: `${SITE}/image-size-calculator` },
      ]} />
      <WebAppSchema name="SquarePic - Image Size Calculator" url={`${SITE}/image-size-calculator`} description="Calculate aspect ratio, megapixels and proportional resize dimensions, then open a matching image preset." dateModified="2026-10-08" />
      <div className="max-w-[800px] w-full mx-auto px-4 py-8">
      <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-2">Image Size Calculator & Aspect Ratios</h1>
      <p className="text-[0.9rem] text-[#8d9aaa] mb-6 leading-relaxed">
        Enter width and height in pixels to calculate aspect ratio and megapixels. Set a new width to find
        the proportional height, then open a matching image preset. This calculates dimensions, not compressed file size.
      </p>

      <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
        <h2 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-3">Search by Dimensions</h2>
        <div className="flex items-end gap-3 mb-2">
          <div className="flex-1">
            <label htmlFor="image-width" className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[#8d9aaa] mb-1 block">Width (px)</label>
            <input
              id="image-width" type="number" min="1" max="10000" step="1" value={searchW}
              onChange={(e) => setSearchW(e.target.value)}
              onBlur={recordCalculation}
              placeholder="e.g. 1080"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-md px-3 py-2 text-[0.875rem] text-[#e6edf5] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <span className="text-[1.2rem] text-[#8d9aaa] pb-2">×</span>
          <div className="flex-1">
            <label htmlFor="image-height" className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[#8d9aaa] mb-1 block">Height (px)</label>
            <input
              id="image-height" type="number" min="1" max="10000" step="1" value={searchH}
              onChange={(e) => setSearchH(e.target.value)}
              onBlur={recordCalculation}
              placeholder="e.g. 1080"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-md px-3 py-2 text-[0.875rem] text-[#e6edf5] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        {(searchW !== "" || searchH !== "") && !hasValidInput && (
          <p className="text-base text-[#8d9aaa] mt-3" role="status">Enter whole pixel dimensions from 1 to 10,000 for both fields.</p>
        )}

        {hasValidInput && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="text-[0.875rem] text-[#e6edf5] leading-relaxed" aria-live="polite" aria-atomic="true">
              <p>Aspect ratio: <strong>{w / divisor}:{h / divisor}</strong> ({(w / h).toFixed(3)}:1)</p>
              <p>Resolution: <strong>{(w * h / 1000000).toFixed(2)} megapixels</strong></p>
            </div>
            <label htmlFor="target-width" className="text-[0.875rem] text-[#8d9aaa] block mt-4 mb-2">New width (px), keeping the same proportions</label>
            <input id="target-width" type="number" min="1" max="10000" step="1" value={targetWidth}
              onChange={(e) => setTargetWidth(e.target.value)}
              onBlur={recordCalculation}
              className="w-full max-w-[200px] bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[0.875rem] text-[#e6edf5] outline-none focus:border-[var(--accent)]" />
            <p className="text-base text-[#8d9aaa] mt-2" aria-live="polite" aria-atomic="true">
              {canResize ? <>Resize dimensions: <strong className="text-[#e6edf5]">{resizeWidth} × {resizeHeight} px</strong>. Height is rounded to the nearest pixel.</>
                : "Choose a width that keeps both output dimensions between 1 and 10,000 pixels."}
            </p>
            {ratioMatches.length > 0 && (
              <div className="mt-4">
                <h3 className="text-[0.875rem] text-[#e6edf5] font-bold mb-2">Presets with the same aspect ratio</h3>
                <div className="flex flex-wrap gap-2">
                  {ratioMatches.slice(0, 8).map((t) => (
                    <Link key={`${t.platform}-${t.key}`} href={`/resize/${t.platform}?preset=${t.key}#resizer`}
                      className="text-[0.875rem] text-[var(--accent)] hover:underline">
                      {PLATFORMS.find((p) => p.key === t.platform)?.label} {t.label}: {t.w} × {t.h}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {matches.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-[var(--accent)]/8 border border-[var(--accent)]/15 rounded-md">
            <p className="text-base text-[#e6edf5] font-semibold m-0">
              {w}×{h} matches:
            </p>
            {matches.map((m) => {
              const plat = PLATFORMS.find((p) => p.key === m.platform);
              return (
                <Link
                  key={`${m.platform}-${m.key}`}
                  href={`/resize/${m.platform}?preset=${m.key}#resizer`}
                  className="block text-[0.875rem] text-[var(--accent)] no-underline hover:underline mt-1"
                >
                  {plat?.label || m.platform}: {m.label}, {m.w}×{m.h}
                </Link>
              );
            })}
          </motion.div>
        )}

        {hasValidInput && matches.length === 0 && (
          <p className="text-base text-[#8d9aaa] mt-2">
            No exact match found for {w}×{h}. Try common sizes like 1080×1080, 1080×1920, or 1200×1200.
          </p>
        )}
      </div>

      <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
        <h2 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-3">Browse by Platform</h2>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {PLATFORMS.map((p) => (
            <button
              key={p.key}
              onClick={() => setSelectedPlatform(selectedPlatform === p.key ? null : p.key)}
              className={`text-[0.875rem] font-bold px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                selectedPlatform === p.key
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20"
                  : "bg-transparent text-[#8d9aaa] border-[rgba(255,255,255,0.06)] hover:text-[#8d9aaa]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selectedPlatform && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-1.5">
              {filteredTypes.map((t) => (
                <Link
                  key={`${t.platform}-${t.key}`}
                  href={`/resize/${t.platform}?preset=${t.key}#resizer`}
                  className="flex items-center justify-between px-3 py-2 rounded-sm bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] no-underline transition-all hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)]"
                >
                  <span className="text-[0.875rem] text-[#e6edf5] font-semibold">{t.label}</span>
                  <span className="text-[0.875rem] text-[var(--accent)] font-bold">{t.w}×{t.h}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <section className="mb-10">
        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">Why Image Dimensions Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Consistent Brand Appearance</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              Choose the canvas for the intended placement, such as a square post or a wide company cover.
              The exported dimensions describe the file. The platform&apos;s feed, grid and avatar previews may
              show different crops, so inspect the destination before publishing.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Faster Page Load Times</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              A smaller pixel canvas can reduce image data, but the encoded byte size also depends on
              format, quality and image content. This calculator cannot predict KB or MB.
              Use the image compressor when you need to meet a file-size limit.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Aspect Ratio Explained</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              Aspect ratio describes the proportional relationship between width and height (e.g., 1:1 for
              square, 16:9 for widescreen). Two images with different pixel dimensions can share the same
              aspect ratio. Enter 1920 and 1080 above to see 16:9, then choose a new width to calculate the matching height.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Avoid Upscaling Issues</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              Increasing the calculated dimensions adds pixels without restoring missing detail.
              Review the result at its intended display size before enlarging a small source.
              The platform presets are working canvases; they do not establish minimum upload requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">How to Use the Image Size Calculator</h2>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <ol className="text-base text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-2">
            <li><strong className="text-[#e6edf5]">Search by dimensions:</strong> Enter your image&apos;s width and height in pixels. The calculator instantly checks if these dimensions match any standard social media image size.</li>
            <li><strong className="text-[#e6edf5]">Browse by platform:</strong> Select a platform from the buttons above to see all supported image sizes for that platform, from profile pictures to cover photos and post dimensions.</li>
            <li><strong className="text-[#e6edf5]">Calculate a resize:</strong> Enter a new width to see the proportional height. These are calculations; your image is not modified here.</li>
            <li><strong className="text-[#e6edf5]">Use a preset:</strong> Click a result to open its platform editor with that preset already selected.</li>
            <li><strong className="text-[#e6edf5]">Check the calculation:</strong> 1200 × 800 simplifies to 3:2 and contains 960,000 pixels, or 0.96 MP. At a new width of 1080 pixels, the proportional height is 720.</li>
          </ol>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">Common Image Dimension Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-1">What is the most common image size for social media?</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              A 1080 × 1080 square is one useful working canvas, but there is no single size for every placement.
              Select the intended platform and asset, then check its upload preview.
            </p>
          </div>
          <div>
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-1">How do I calculate aspect ratio from width and height?</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              Divide both width and height by their greatest common divisor. For example, 1920x1080 simplifies to
              16:9 (1920/120 = 16, 1080/120 = 9). Use this calculator to find which standard aspect ratio
              matches your image dimensions.
            </p>
          </div>
          <div>
            <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-1">What resolution is best for print vs web?</h3>
            <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
              On a screen, pixel dimensions matter more than the DPI value stored in a file.
              For printing, divide the pixel dimensions by the printer&apos;s requested pixels per inch.
              A 3000 × 2400 image at 300 PPI produces a 10 × 8 inch print. Ask your printer which PPI to use.
            </p>
          </div>
        </div>
      </section>

      <p className="text-base text-[#8d9aaa] mb-8 leading-relaxed">
        Changing a 3:2 photo to 1:1 requires a crop or added background, rather than a proportional resize.
        See <Link href="/guides/make-image-square-without-cropping" className="text-[var(--accent)] hover:underline">how to make an image square without cropping</Link>.
        If the source is too small, review the <Link href="/upscaler" className="text-[var(--accent)] hover:underline">image upscaler</Link> before enlarging it.
        {" "}For a physical print, <Link href="/guides/how-to-enlarge-a-photo#planner" className="text-[var(--accent)] hover:underline">calculate print pixels and enlargement</Link> from your source dimensions and the printer&apos;s requested PPI.
      </p>

      <div className="text-center py-4">
        <Link href="/" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
          Resize Your Image Free
        </Link>
      </div>
    </div>
    </>
  );
}

