import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema, HowToSchema } from "@/components/schema-scripts";

type Props = { params: Promise<{ slug: string }> };

const SITE = "https://squarepic.io";

const FORMAT_LABELS: Record<string, string> = {
  png: "PNG", jpg: "JPEG", jpeg: "JPEG", webp: "WebP",
  gif: "GIF", bmp: "BMP", ico: "ICO", avif: "AVIF", tiff: "TIFF",
};

const FORMAT_DESCS: Record<string, { desc: string; best: string; lossy: boolean; alpha: boolean }> = {
  png: { desc: "Portable Network Graphics - lossless format with transparency support.", best: "Logos, screenshots, graphics with sharp text and transparency.", lossy: false, alpha: true },
  jpg: { desc: "JPEG - the universal standard for photographs with excellent compression.", best: "Photography, web images, social media where file size matters.", lossy: true, alpha: false },
  webp: { desc: "Google's modern format delivering JPEG-quality at 25-35% smaller sizes.", best: "Modern websites, performance-critical pages, anywhere speed matters.", lossy: true, alpha: true },
  gif: { desc: "Graphics Interchange Format - supports simple animations and transparency.", best: "Simple animations, memes, short looping clips.", lossy: false, alpha: true },
  bmp: { desc: "Bitmap - uncompressed raster format with large file sizes.", best: "Legacy software compatibility, raw bitmap data.", lossy: false, alpha: false },
  ico: { desc: "Icon format used for favicons and Windows application icons.", best: "Website favicons, Windows desktop icons.", lossy: false, alpha: true },
  avif: { desc: "AV1 Image Format - next-gen format with 50% better compression than JPEG.", best: "Next-gen web performance, HDR content, highest compression needs.", lossy: true, alpha: true },
  tiff: { desc: "Tagged Image File Format - high-fidelity format for professional use.", best: "Print publishing, professional photography, archival storage.", lossy: false, alpha: true },
};

const PAIRS: Record<string, { from: string; to: string }> = {
  "png-to-jpg": { from: "png", to: "jpg" },
  "png-to-jpeg": { from: "png", to: "jpg" },
  "jpg-to-png": { from: "jpg", to: "png" },
  "jpeg-to-png": { from: "jpg", to: "png" },
  "png-to-webp": { from: "png", to: "webp" },
  "jpg-to-webp": { from: "jpg", to: "webp" },
  "jpeg-to-webp": { from: "jpg", to: "webp" },
  "webp-to-png": { from: "webp", to: "png" },
  "webp-to-jpg": { from: "webp", to: "jpg" },
  "webp-to-jpeg": { from: "webp", to: "jpg" },
  "png-to-gif": { from: "png", to: "gif" },
  "jpg-to-gif": { from: "jpg", to: "gif" },
  "jpeg-to-gif": { from: "jpg", to: "gif" },
  "png-to-ico": { from: "png", to: "ico" },
  "jpg-to-ico": { from: "jpg", to: "ico" },
  "webp-to-gif": { from: "webp", to: "gif" },
  "png-to-avif": { from: "png", to: "avif" },
  "jpg-to-avif": { from: "jpg", to: "avif" },
  "webp-to-avif": { from: "webp", to: "avif" },
};

export function generateStaticParams() {
  return Object.keys(PAIRS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pair = PAIRS[slug];
  if (!pair) return {};
  const fromLabel = FORMAT_LABELS[pair.from] || pair.from.toUpperCase();
  const toLabel = FORMAT_LABELS[pair.to] || pair.to.toUpperCase();
  const title = `Convert ${fromLabel} to ${toLabel} Online Free - Image Converter`;
  const desc = `Free online ${fromLabel} to ${toLabel} converter. Convert your images instantly - no uploads, no signup, no watermarks. Batch convert and download as ZIP.`;
  return { title, description: desc, openGraph: { title: `${title} | SquarePic` }, alternates: { canonical: `${SITE}/converter/${slug}` } };
}

export default async function FormatToFormatPage({ params }: Props) {
  const { slug } = await params;
  const pair = PAIRS[slug];
  if (!pair) notFound();

  const fromLabel = FORMAT_LABELS[pair.from] || pair.from.toUpperCase();
  const toLabel = FORMAT_LABELS[pair.to] || pair.to.toUpperCase();
  const fromInfo = FORMAT_DESCS[pair.from];
  const toInfo = FORMAT_DESCS[pair.to];
  const normalizedSlug = slug.replace("jpeg", "jpg").replace("jpeg", "jpg");

  const tips: string[] = [];
  if (pair.from === "png" && pair.to === "jpg") {
    tips.push("PNG supports transparency but JPEG does not - transparent areas will become white or black.");
    tips.push("JPEG compression is lossy, so the converted file will be significantly smaller but may show artifacts at low quality.");
    tips.push("Use quality 85-95% for a good balance between file size and visual fidelity when converting PNG to JPEG.");
  } else if (pair.from === "jpg" && pair.to === "png") {
    tips.push("JPEG to PNG conversion is lossless - the image quality stays exactly the same.");
    tips.push("PNG files are typically larger than JPEGs, so expect file size to increase.");
    tips.push("Convert JPEG to PNG when you need transparency or plan to edit the image further.");
  } else if (pair.from === "png" && pair.to === "webp") {
    tips.push("WebP supports both lossy and lossless compression - your PNG will stay sharp while often ending up smaller.");
    tips.push("WebP also supports transparency just like PNG, so no quality is lost for logos and graphics.");
    tips.push("Browser support for WebP is 97%+ - safe to use for modern websites.");
  } else if (pair.from === "jpg" && pair.to === "webp") {
    tips.push("WebP typically achieves 25-35% smaller file sizes than JPEG at the same visual quality.");
    tips.push("WebP supports transparency - a major advantage over JPEG if you need alpha channels.");
    tips.push("Use quality 75-85% in WebP for equivalent visual quality to JPEG at quality 85-95%.");
  } else if (pair.from === "webp" && pair.to === "png") {
    tips.push("WebP to PNG conversion is lossless - no quality is lost during the conversion.");
    tips.push("PNG files will be larger than the original WebP. Use this when you need maximum compatibility.");
    tips.push("PNG is universally supported across all platforms, browsers, and applications.");
  } else if (pair.from === "webp" && pair.to === "jpg") {
    tips.push("JPEG does not support transparency - any transparent areas in the WebP will become a solid background.");
    tips.push("JPEG offers universal compatibility, making it ideal for sharing on social media and email.");
    tips.push("Adjust quality to balance file size - JPEG at quality 85% is usually indistinguishable from the original.");
  } else if (pair.to === "gif") {
    tips.push("GIF is limited to 256 colors - images with gradients or many colors will lose quality.");
    tips.push("GIF supports animation and transparency, making it ideal for simple graphics and memes.");
    tips.push("For photos, consider JPEG or WebP instead - GIF file sizes can be very large for photographic content.");
  } else if (pair.to === "ico") {
    tips.push("ICO is the standard format for website favicons and Windows application icons.");
    tips.push("Most favicons work best at 32x32 or 16x16 pixels - resize before or after conversion.");
    tips.push("Multi-size ICO files can include multiple resolutions in a single file.");
  } else if (pair.from === "avif" || pair.to === "avif") {
    tips.push("AVIF offers 50% better compression than JPEG at the same quality level.");
    tips.push("AVIF supports HDR, wide color gamut, and transparency.");
    tips.push("Browser support is at 93% - provide a JPEG or WebP fallback for older browsers.");
  } else {
    tips.push(`Converting from ${fromLabel} to ${toLabel} is quick and lossless when both formats support the same features.`);
    tips.push(`The file size may change depending on the compression characteristics of ${toLabel}.`);
    tips.push(`Download your converted image and verify the result looks as expected before using it.`);
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Image Converter", url: `${SITE}/converter` },
        { name: `${fromLabel} to ${toLabel}`, url: `${SITE}/converter/${slug}` },
      ]} />
      <HowToSchema steps={[
        { name: "Upload your image", text: `Select a ${fromLabel} image from your device to convert to ${toLabel}.` },
        { name: "Choose output format", text: `Set the target format to ${toLabel} and adjust the quality slider.` },
        { name: "Download the result", text: `Download your converted ${toLabel} image or continue editing.` },
      ]} />

      <div className="max-w-[800px] w-full mx-auto px-4 py-8">
        <Link href="/converter" className="text-[0.7rem] font-semibold text-[#576675] no-underline hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Format Conversions
        </Link>

        <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-3">
          Convert {fromLabel} to {toLabel} Online - Free
        </h1>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-6">
          Convert your {fromLabel} images to {toLabel} format instantly. All processing happens
          locally in your browser - no uploads, no signup, no watermarks.
        </p>

        <div className="flex items-center justify-center gap-4 mb-8 p-6 bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl">
          <span className="text-[1.2rem] font-extrabold text-[#e6edf5]">{fromLabel}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          <span className="text-[1.2rem] font-extrabold text-[var(--accent)]">{toLabel}</span>
        </div>

        <div className="text-center mb-10">
          <Link
            href="/converter"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Convert {fromLabel} to {toLabel} Now
          </Link>
        </div>

        <section className="mb-10">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">About {fromLabel} and {toLabel} Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.9rem] font-extrabold text-[#e6edf5] mb-1.5">{fromLabel}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed mb-2">{fromInfo?.desc}</p>
              <p className="text-[0.72rem] text-[#576675] m-0">
                Best for: {fromInfo?.best}
                {fromInfo?.alpha && <span className="ml-2">· Supports transparency</span>}
                {fromInfo?.lossy ? <span className="ml-2">· Lossy compression</span> : <span className="ml-2">· Lossless</span>}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.9rem] font-extrabold text-[#e6edf5] mb-1.5">{toLabel}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed mb-2">{toInfo?.desc}</p>
              <p className="text-[0.72rem] text-[#576675] m-0">
                Best for: {toInfo?.best}
                {toInfo?.alpha && <span className="ml-2">· Supports transparency</span>}
                {toInfo?.lossy ? <span className="ml-2">· Lossy compression</span> : <span className="ml-2">· Lossless</span>}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Tips for Converting {fromLabel} to {toLabel}</h2>
          <ul className="text-[0.85rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        {pair.from !== pair.to && (
          <section className="mb-10">
            <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Other Format Conversions</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PAIRS).filter(([k]) => k !== slug && !k.includes("jpeg")).slice(0, 12).map(([k]) => {
                const f = PAIRS[k];
                return (
                  <Link
                    key={k}
                    href={`/converter/${k}`}
                    className="text-[0.68rem] font-semibold text-[#8d9aaa] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-2.5 py-1 rounded-sm no-underline hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all"
                  >
                    {FORMAT_LABELS[f.from] || f.from.toUpperCase()} → {FORMAT_LABELS[f.to] || f.to.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="text-center py-4">
          <Link
            href="/converter"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Open {fromLabel} to {toLabel} Converter
          </Link>
        </section>
      </div>
    </>
  );
}
