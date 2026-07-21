import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema, HowToSchema } from "@/components/schema-scripts";

type Props = { params: Promise<{ slug: string }> };

const SITE = "https://www.squarepic.io";

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

const PAIR_USE_CASES: Record<string, { useCase: string; detail: string; audience: string }> = {
  "png-to-jpg": { useCase: "Reducing file sizes for web publishing", detail: "PNG to JPEG conversion is ideal when you need to shrink large PNG screenshots or graphics for faster web page loads. JPEG compression can reduce file size by 50-80% with minimal visible quality loss.", audience: "Web developers, bloggers, and social media managers who need to optimize images for fast loading." },
  "jpg-to-png": { useCase: "Adding transparency for design projects", detail: "Convert JPEG to PNG when you need to overlay an image on a colored background or add transparent elements. PNG's alpha channel support makes it essential for graphic design, logos, and compositing work.", audience: "Graphic designers, marketers, and content creators building layered visuals." },
  "png-to-webp": { useCase: "Modern web performance optimization", detail: "PNG to WebP conversion gives you the best of both worlds: transparency support like PNG with file sizes 25-35% smaller. This makes it the top choice for performance-conscious websites that need sharp graphics with alpha channels.", audience: "Web performance engineers, frontend developers, and site owners focused on Core Web Vitals." },
  "jpg-to-webp": { useCase: "Cutting bandwidth without sacrificing quality", detail: "JPEG to WebP is one of the most impactful optimizations for image-heavy websites. You get the same visual quality at 25-35% smaller file sizes, directly improving page load times and reducing hosting costs.", audience: "E-commerce sites, media publishers, and anyone running image-rich websites." },
  "webp-to-png": { useCase: "Ensuring universal compatibility", detail: "Convert WebP to PNG when you need maximum compatibility across all platforms, devices, and legacy software. PNG works everywhere without fallback handling, making it the safe choice for email attachments and document embedding.", audience: "Email marketers, document creators, and users sharing images with less technical audiences." },
  "webp-to-jpg": { useCase: "Preparing images for social media and email", detail: "WebP to JPEG conversion is essential when sharing images on platforms that don't support WebP. JPEG is universally accepted by social media sites, email clients, and legacy applications.", audience: "Social media managers, email newsletter creators, and anyone distributing images broadly." },
  "png-to-gif": { useCase: "Creating simple animations", detail: "Convert PNG images to GIF format when you need basic animation or want to create short looping clips from static images. GIF's 256-color palette limitation means it is best suited for simple graphics rather than photographs.", audience: "Meme creators, social media posters, and designers making simple animated graphics." },
  "jpg-to-gif": { useCase: "Converting photos for retro-style animation", detail: "JPEG to GIF conversion turns photographs into lower-color palette images suitable for simple animated sequences. GIF works universally across all browsers and messaging platforms.", audience: "Anyone creating nostalgic-style animations or simple looping graphics from photos." },
  "png-to-ico": { useCase: "Creating website favicons", detail: "Convert PNG to ICO to create the icon files browsers display in tabs, bookmarks, and address bars. A well-designed favicon improves brand recognition and gives your site a professional appearance.", audience: "Web developers, site owners, and brand managers setting up new websites." },
  "jpg-to-ico": { useCase: "Making favicons from photographs", detail: "JPEG to ICO conversion lets you turn any photo into a browser favicon. Since ICO files can store multiple sizes, this is ideal for creating icons that display well at 16x16, 32x32, and 48x48 resolutions.", audience: "Small business owners and bloggers who want branded favicons from existing photos." },
  "webp-to-gif": { useCase: "Repurposing web-optimized images for universal sharing", detail: "Convert WebP to GIF when you need to share optimized images on platforms or devices that lack WebP support. GIF ensures your image or simple animation is viewable everywhere without technical barriers.", audience: "Content distributors and social media managers who need universal format support." },
  "png-to-avif": { useCase: "Next-generation image compression", detail: "PNG to AVIF conversion delivers 50% better compression than JPEG while maintaining transparency support. It is the most efficient format for modern websites targeting the best possible performance.", audience: "Forward-thinking web developers and performance teams building next-gen web experiences." },
  "jpg-to-avif": { useCase: "Maximum compression for photographic content", detail: "JPEG to AVIF offers the highest compression ratio available, reducing file sizes by up to 50% compared to JPEG at the same quality. AVIF also supports HDR and wide color gamut for superior image quality.", audience: "High-traffic websites, media platforms, and developers targeting maximum performance gains." },
  "webp-to-avif": { useCase: "Upgrading to the most efficient format", detail: "WebP to AVIF conversion takes already optimized WebP images and further reduces their size by 25-35% on average. This is ideal for sites that already use WebP and want to push performance further.", audience: "Performance-obsessed developers and sites already on the WebP upgrade path." },
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
  return { title, description: desc, openGraph: { title: `${title} | SquarePic`, description: desc }, alternates: { canonical: `${SITE}/converter/${slug}` } };
}

export default async function FormatToFormatPage({ params }: Props) {
  const { slug } = await params;
  const pair = PAIRS[slug];
  if (!pair) notFound();

  const fromLabel = FORMAT_LABELS[pair.from] || pair.from.toUpperCase();
  const toLabel = FORMAT_LABELS[pair.to] || pair.to.toUpperCase();
  const fromInfo = FORMAT_DESCS[pair.from];
  const toInfo = FORMAT_DESCS[pair.to];
  const useCase = PAIR_USE_CASES[slug];
  const tips: string[] = [];
  if (pair.from === "png" && pair.to === "jpg") {
    tips.push("PNG supports transparency but JPEG does not - transparent areas will become white or black.");
    tips.push("JPEG compression is lossy, so the converted file will be significantly smaller but may show artifacts at low quality.");
    tips.push("Use quality 85-95% for a good balance between file size and visual fidelity when converting PNG to JPEG.");
    tips.push("Batch convert multiple PNGs to JPEG at once using the ZIP download feature to save time on large projects.");
  } else if (pair.from === "jpg" && pair.to === "png") {
    tips.push("JPEG to PNG conversion is lossless - the image quality stays exactly the same.");
    tips.push("PNG files are typically larger than JPEGs, so expect file size to increase.");
    tips.push("Convert JPEG to PNG when you need transparency or plan to edit the image further.");
    tips.push("Use PNG output when overlaying images on colored backgrounds in design software like Photoshop or Canva.");
  } else if (pair.from === "png" && pair.to === "webp") {
    tips.push("WebP supports both lossy and lossless compression - your PNG will stay sharp while often ending up smaller.");
    tips.push("WebP also supports transparency just like PNG, so no quality is lost for logos and graphics.");
    tips.push("Browser support for WebP is 97%+ - safe to use for modern websites.");
    tips.push("For WordPress sites, WebP can significantly improve PageSpeed Insights scores without plugin overhead.");
  } else if (pair.from === "jpg" && pair.to === "webp") {
    tips.push("WebP typically achieves 25-35% smaller file sizes than JPEG at the same visual quality.");
    tips.push("WebP supports transparency - a major advantage over JPEG if you need alpha channels.");
    tips.push("Use quality 75-85% in WebP for equivalent visual quality to JPEG at quality 85-95%.");
    tips.push("Convert hero images and product photos to WebP first — they deliver the biggest performance gains.");
  } else if (pair.from === "webp" && pair.to === "png") {
    tips.push("WebP to PNG conversion is lossless - no quality is lost during the conversion.");
    tips.push("PNG files will be larger than the original WebP. Use this when you need maximum compatibility.");
    tips.push("PNG is universally supported across all platforms, browsers, and applications.");
    tips.push("This conversion is essential when preparing images for print or embedding in PDF documents.");
  } else if (pair.from === "webp" && pair.to === "jpg") {
    tips.push("JPEG does not support transparency - any transparent areas in the WebP will become a solid background.");
    tips.push("JPEG offers universal compatibility, making it ideal for sharing on social media and email.");
    tips.push("Adjust quality to balance file size - JPEG at quality 85% is usually indistinguishable from the original.");
    tips.push("Always preview the result to ensure the background fill color matches your design when transparency is lost.");
  } else if (pair.to === "gif") {
    tips.push("GIF is limited to 256 colors - images with gradients or many colors will lose quality.");
    tips.push("GIF supports animation and transparency, making it ideal for simple graphics and memes.");
    tips.push("For photos, consider JPEG or WebP instead - GIF file sizes can be very large for photographic content.");
    tips.push("Reduce the original image dimensions before converting to GIF for better results and smaller file sizes.");
  } else if (pair.to === "ico") {
    tips.push("ICO is the standard format for website favicons and Windows application icons.");
    tips.push("Most favicons work best at 32x32 or 16x16 pixels - resize before or after conversion.");
    tips.push("Multi-size ICO files can include multiple resolutions in a single file.");
    tips.push("Use a square source image with a simple, recognizable design for the best favicon results.");
  } else if (pair.from === "avif" || pair.to === "avif") {
    tips.push("AVIF offers 50% better compression than JPEG at the same quality level.");
    tips.push("AVIF supports HDR, wide color gamut, and transparency.");
    tips.push("Browser support is at 93% - provide a JPEG or WebP fallback for older browsers.");
    tips.push("AVIF is ideal for serving high-quality images on modern browsers while minimizing bandwidth usage.");
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

        {useCase && (
          <section className="mb-10">
            <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">When to Convert {fromLabel} to {toLabel}</h2>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{useCase.useCase}</h3>
              <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed mb-3">{useCase.detail}</p>
              <p className="text-[0.72rem] text-[#576675] m-0">
                <strong className="text-[#8d9aaa]">Who needs this: </strong>{useCase.audience}
              </p>
            </div>
          </section>
        )}

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
