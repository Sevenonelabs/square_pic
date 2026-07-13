import type { Metadata } from "next";
import Link from "next/link";
import { ConverterTool } from "@/components/converter/converter-tool";
import { BreadcrumbSchema, WebAppSchema, HowToSchema } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Image Converter - JPG, PNG & WebP",
  description: "Convert images to JPG, PNG, or WebP formats online for free. Batch convert multiple images at once with no uploads required.",
  openGraph: { title: "Free Image Converter - JPG, PNG & WebP | SquarePic" },
  alternates: { canonical: "https://squarepic.io/converter" },
};

const SITE = "https://squarepic.io";

export default function ConverterPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Converter", url: `${SITE}/converter` }]} />
      <WebAppSchema name="SquarePic - Image Converter" url={SITE + "/converter"} description="Convert images between JPEG, PNG, WebP, BMP, GIF, ICO, AVIF, and TIFF formats online for free." aggregateRating={{ ratingValue: "4.9", ratingCount: "112", bestRating: "5" }} />
      <HowToSchema steps={[
        { name: "Upload your images", text: "Select one or more images to convert. Supports JPEG, PNG, WebP, BMP, GIF, ICO, AVIF, and TIFF formats." },
        { name: "Choose the output format", text: "Pick your target format from the dropdown. Each file can have its own format and quality settings." },
        { name: "Adjust quality settings", text: "Set the output quality for each file. Higher quality means larger file size." },
        { name: "Download converted files", text: "Download each converted image individually or use Download All as ZIP for batch export." },
      ]} />
      <ConverterTool />
      <ToolLinks current="/converter" />

      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How to Convert Images Between Formats
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Different platforms and use cases require different image formats. Whether you need a transparent PNG
            for a logo, a compressed JPEG for a website, or a modern WebP for better performance, knowing when
            to use each format makes a big difference.
          </p>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Image Format Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Format</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Transparency</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Compression</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Best Use Case</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Browser Support</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fmt: "JPEG", trans: "No", comp: "Lossy", use: "Photography, web images, social media", browser: "Universal" },
                  { fmt: "PNG", trans: "Yes", comp: "Lossless", use: "Logos, screenshots, graphics with text", browser: "Universal" },
                  { fmt: "WebP", trans: "Yes", comp: "Both", use: "Modern web, performance-critical sites", browser: "97%" },
                  { fmt: "GIF", trans: "Yes", comp: "Lossless", use: "Simple animations, memes", browser: "Universal" },
                  { fmt: "BMP", trans: "No", comp: "None", use: "Legacy software, raw bitmap data", browser: "Universal" },
                  { fmt: "AVIF", trans: "Yes", comp: "Lossy + Lossless", use: "Next-gen web, highest compression", browser: "93%" },
                  { fmt: "TIFF", trans: "Yes", comp: "Both", use: "Print, publishing, professional photography", browser: "Limited" },
                  { fmt: "ICO", trans: "Yes", comp: "Lossless", use: "Favicons, Windows icons", browser: "Universal" },
                ].map((r) => (
                  <tr key={r.fmt} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-3">{r.fmt}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.trans}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.comp}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.use}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.browser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: "When to Convert to JPEG", desc: "JPEG remains the gold standard for photographs and complex images on the web. Use JPEG when you need broad compatibility and small file sizes and do not require transparency. Most social media platforms recommend JPEG for photo uploads." },
            { title: "When to Convert to PNG", desc: "PNG is the go-to format for images that need transparency -- logos, icons, screenshots, and graphics with sharp text. PNG compression is lossless, so the image quality is preserved exactly. The trade-off is larger file sizes compared to JPEG." },
            { title: "When to Convert to WebP", desc: "WebP is Google's modern format that delivers JPEG-quality images at 25–35% smaller file sizes. It supports both lossy and lossless compression plus transparency. Use WebP for website hero images, thumbnails, and anywhere page speed matters." },
            { title: "When to Convert to AVIF", desc: "AVIF offers even better compression than WebP -- typically 50% smaller than JPEG at the same quality. It supports HDR and wide color gamut. Use AVIF for next-generation web performance, but always provide JPEG or WebP fallbacks for older browsers." },
          ].map((c) => (
            <div key={c.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Batch Conversion Tips</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Convert multiple images at once by uploading them all and setting the same output format.</li>
              <li>Each file keeps its own quality slider -- adjust per image for fine-grained control.</li>
              <li>Download all converted images as a single ZIP to save time.</li>
              <li>Use the same output quality for batch jobs when all images are similar (e.g., same product photo set).</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Format Selection Guide</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Need transparency?</strong> Use PNG or WebP. JPEG does not support transparency.</li>
              <li><strong className="text-[#e6edf5]">Maximum compatibility?</strong> JPEG for photos, PNG for graphics. Both work everywhere.</li>
              <li><strong className="text-[#e6edf5]">Smallest file size?</strong> AVIF offers the best compression, followed by WebP.</li>
              <li><strong className="text-[#e6edf5]">Print quality?</strong> TIFF preserves the highest fidelity for professional printing workflows.</li>
              <li><strong className="text-[#e6edf5]">Animation needed?</strong> GIF works universally, but consider video formats for longer clips.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-4">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Format-to-Format Conversions</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "png-to-jpg", "jpg-to-png", "png-to-webp", "jpg-to-webp",
              "webp-to-png", "webp-to-jpg", "png-to-gif", "jpg-to-gif",
              "png-to-ico", "jpg-to-ico", "png-to-avif", "jpg-to-avif",
            ].map((k) => {
              const parts = k.split("-to-");
              return (
                <Link key={k} href={`/converter/${k}`} className="text-[0.68rem] font-semibold text-[#8d9aaa] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-2.5 py-1 rounded-sm no-underline hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all">
                  {parts[0].toUpperCase()} → {parts[1].toUpperCase()}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Privacy-First Image Conversion</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            Every image conversion happens locally in your browser using HTML5 Canvas. Your images are never uploaded to any server.
            <Link href="/blog/privacy-first-image-editing" className="text-[var(--accent)] no-underline hover:underline ml-1 font-semibold">
              Learn more about our privacy-first approach →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

