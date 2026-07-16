import type { Metadata } from "next";
import Link from "next/link";
import { CompressorTool } from "@/components/compressor/compressor-tool";
import { BreadcrumbSchema, WebAppSchema, HowToSchema } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Image Compressor - JPG, PNG & WebP",
  description: "Compress JPG, PNG, and WebP images online without losing quality. Reduce file sizes for faster website loading and easier sharing.",
  openGraph: { title: "Free Image Compressor - JPG, PNG & WebP | SquarePic" },
  alternates: { canonical: "https://squarepic.io/compressor" },
};

const SITE = "https://squarepic.io";

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
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Private & Secure Compression</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            All image compression happens locally in your browser. Your files are never uploaded to any server.
            <Link href="/blog/privacy-first-image-editing" className="text-[var(--accent)] no-underline hover:underline ml-1 font-semibold">
              Read about our privacy-first approach →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

