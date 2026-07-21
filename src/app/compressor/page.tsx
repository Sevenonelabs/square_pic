import type { Metadata } from "next";
import Link from "next/link";
import { CompressorTool } from "@/components/compressor/compressor-tool";
import { BreadcrumbSchema, WebAppSchema, HowToSchema, JsonLd } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Image Compressor - JPG, PNG & WebP",
  description: "Compress JPG, PNG, and WebP images online without losing quality. Reduce file sizes for faster websites and easier sharing. No uploads, no signup.",
  openGraph: {
    title: "Free Image Compressor - JPG, PNG & WebP | SquarePic",
    description: "Compress images online with quality slider or target-size mode. Batch compress and download as ZIP. Free, private, browser-based.",
    url: "https://www.squarepic.io/compressor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor - JPG, PNG & WebP | SquarePic",
    description: "Reduce image file sizes with quality slider or target size. Batch mode. Free, no uploads.",
  },
  alternates: { canonical: "https://www.squarepic.io/compressor" },
};

const SITE = "https://www.squarepic.io";

export default function CompressorPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Compressor", url: `${SITE}/compressor` }]} />
      <WebAppSchema name="SquarePic - Image Compressor" url={SITE + "/compressor"} description="Compress JPG, PNG, and WebP images online with quality slider or target size mode. Batch compress and download as ZIP." />
      <HowToSchema steps={[
        { name: "Upload your images", text: "Select one or more images to compress. Supports JPEG, PNG, and WebP formats with batch upload." },
        { name: "Choose compression mode", text: "Use the quality slider for instant compression, or enable target size mode to hit a specific file size." },
        { name: "Review and adjust", text: "Preview the compressed result and compare file sizes. Adjust the quality until you are satisfied." },
        { name: "Download the results", text: "Download files individually or click Download All as ZIP to get all compressed images at once." },
      ]} />
      <CompressorTool />
      <ToolLinks current="/compressor" />

      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How to Compress Images Like a Pro
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Image compression reduces file size by removing redundant data while preserving visual quality.
            Smaller images load faster on websites, send quicker in emails, and take up less storage space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Quality vs File Size", desc: "Higher quality retains more detail but creates larger files. For web use, quality 70-85% is ideal - images look nearly identical to originals but are 50–80% smaller. For thumbnails, quality 40-60% works well." },
            { title: "Target Size Mode", desc: "Need an image under 100 KB? Enable target size mode and set your goal. The compressor automatically adjusts the quality slider to hit your exact file size target, saving you manual trial and error." },
            { title: "Batch Compression", desc: "Compress multiple images at once to save time. Upload several files, set your quality or target size, and download them all as a ZIP archive. Each image is compressed individually for optimal results." },
            { title: "Lossy vs Lossless", desc: "JPEG compression is lossy -- some data is discarded to reduce size. PNG compression is lossless -- quality stays identical. WebP supports both modes. Choose based on whether you need perfect quality or smaller files." },
          ].map((c) => (
            <div key={c.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Supported Image Format Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-4">Format</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Compression</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Best For</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Typical Savings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fmt: "JPEG", comp: "Lossy", best: "Photos, web images", saving: "50–80%" },
                  { fmt: "PNG", comp: "Lossless", best: "Screenshots, logos, graphics with text", saving: "10-40%" },
                  { fmt: "WebP", comp: "Lossy + Lossless", best: "Web performance, modern sites", saving: "25-35% vs JPEG" },
                ].map((r) => (
                  <tr key={r.fmt} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-4">{r.fmt}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.comp}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.best}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">When to Compress Images</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Website performance:</strong> Compress hero images and product photos to improve Core Web Vitals and page load times.</li>
              <li><strong className="text-[#e6edf5]">Email attachments:</strong> Most email servers reject files over 25 MB. Compression keeps your images within limits.</li>
              <li><strong className="text-[#e6edf5]">Social media uploads:</strong> Platforms like Instagram and LinkedIn have file size caps. Pre-compress to ensure smooth uploads.</li>
              <li><strong className="text-[#e6edf5]">Cloud storage:</strong> Reduce backup sizes and save on storage costs by compressing images before archiving.</li>
              <li><strong className="text-[#e6edf5]">E-commerce product images:</strong> Compressed product photos load faster on shop pages, improving conversion rates and reducing bounce rates on mobile.</li>
              <li><strong className="text-[#e6edf5]">CMS and blog uploads:</strong> Most content management systems have upload limits. Pre-compress to avoid hitting file size caps and keep your media library lean.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Compression Best Practices</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Always keep the original file as a backup before compressing.</li>
              <li>Start at quality 80% and adjust down only if the file is still too large.</li>
              <li>Use lossless compression (PNG) for screenshots and graphics with sharp text edges.</li>
              <li>For website hero images, compress to under 200 KB for fast loading on mobile connections.</li>
              <li>Batch compress before uploading to a content management system to save time.</li>
              <li>Compress thumbnails aggressively (quality 40-50%) — they are small and fast loading matters most.</li>
              <li>Re-compress previously optimized images only if you need even smaller files for a specific use case.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Common Compression Myths</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Myth: Compression always ruins quality.</strong> Modern compression algorithms preserve visual quality down to 70-80% quality. The difference is often invisible to the human eye while cutting file sizes by more than half.</li>
              <li><strong className="text-[#e6edf5]">Myth: You should never compress PNG.</strong> PNG compression is lossless — file sizes shrink without any quality loss. Many PNG files have inefficient metadata and color profiles that can be stripped safely.</li>
              <li><strong className="text-[#e6edf5]">Myth: WebP always beats JPEG.</strong> WebP offers better compression at equivalent quality, but JPEG still wins for compatibility and is better for photographs with subtle gradients at high quality settings.</li>
              <li><strong className="text-[#e6edf5]">Myth: Compressing once is enough.</strong> Different platforms and use cases need different file sizes. An image for email should be smaller than one for print. Always compress for the specific medium.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Compression & SEO</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Page speed is a confirmed Google ranking factor — compressed images load faster and improve user experience signals.</li>
              <li>Core Web Vitals track Largest Contentful Paint — hero images that are compressed load before the 2.5-second threshold.</li>
              <li>Google Lighthouse flags images that can be compressed further — passing this audit improves your SEO score.</li>
              <li>Smaller images reduce bandwidth costs for your hosting and improve time-to-interactive for mobile visitors on slow networks.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Private & Secure Compression</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            All image compression happens locally in your browser. Your files are never uploaded to any server.
          </p>
        </div>
        <p className="text-[0.7rem] text-[#576675] text-center mt-8">Last updated: March 2026</p>
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[0.75rem] text-[#8d9aaa] text-center">
            Learn more: <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Social Media Image Sizes 2026</Link> · <Link href="/guides/instagram-feed-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Instagram Image Sizes</Link> · <Link href="/guides/linkedin-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">LinkedIn Image Sizes</Link>
          </p>
        </div>
      </section>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SquarePic - Image Compressor",
        url: "https://www.squarepic.io/compressor",
        description: "Free online image compressor with quality slider and target-size mode. Batch compress JPEG, PNG, and WebP. No uploads, no signup.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }} />
    </>
  );
}

