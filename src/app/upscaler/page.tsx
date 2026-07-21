import type { Metadata } from "next";
import Link from "next/link";
import { UpscalerTool } from "@/components/upscaler/upscaler-tool";
import { BreadcrumbSchema, WebAppSchema, HowToSchema, JsonLd } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Image Upscaler Online - Enlarge Photos 2x, 3x, 4x HD",
  description: "Upscale images online free with bicubic interpolation and smart sharpening. Enlarge photos 2x, 3x, or 4x — all processing is private and local.",
  openGraph: {
    title: "Free HD Image Upscaler - 2x, 3x, 4x | SquarePic",
    description: "Upscale images 2x, 3x, or 4x with smart sharpening. All processing happens locally in your browser — no uploads, no watermarks, no signup.",
    url: "https://www.squarepic.io/upscaler",
    images: [{ url: "/squareframe_preview.png", width: 1200, height: 630, alt: "SquarePic HD Image Upscaler - enlarge photos 2x, 3x, or 4x" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free HD Image Upscaler - 2x, 3x, 4x | SquarePic",
    description: "Upscale images 2x, 3x, or 4x with smart sharpening. Free, private, browser-based.",
  },
  alternates: { canonical: "https://www.squarepic.io/upscaler" },
};

const SITE = "https://www.squarepic.io";

export default function UpscalerPage() {
  return (
    <>
          <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "HD Image Upscaler", url: `${SITE}/upscaler` }]} />
            <WebAppSchema name="SquarePic - HD Image Upscaler" url={SITE + "/upscaler"} description="Upscale images 2x, 3x, or 4x with bicubic interpolation and smart sharpening. All processing happens locally in your browser." />
      <HowToSchema steps={[
        { name: "Upload your image", text: "Select a photo from your device. Supports JPEG, PNG, WebP, BMP, GIF, and TIFF formats up to 30 MB." },
        { name: "Choose the scale factor", text: "Select 2x, 3x, or 4x magnification. The output dimensions are calculated automatically based on your selection." },
        { name: "Enable Smart Sharpen", text: "Toggle Smart Sharpen to apply an unsharp mask after upscaling. This enhances edges and brings out finer details in the enlarged image." },
        { name: "Export the upscaled image", text: "Download your enlarged image in PNG, JPEG, or WebP format at the new higher resolution." },
      ]} />
      <UpscalerTool />
      <ToolLinks current="/upscaler" />

      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How to Upscale Images Without Losing Quality
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Image upscaling enlarges a photo while minimizing quality loss. Unlike simple
            browser zoom or stretching, our tool uses high-quality bicubic interpolation followed
            by smart sharpening to produce crisp, usable results at 2x, 3x, or 4x the original size.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Bicubic Interpolation", desc: "Bicubic interpolation produces smooth, high-quality enlargements by sampling 16 surrounding pixels (a 4x4 grid) for each output pixel. It preserves edge sharpness better than bilinear filtering while avoiding the blocky artifacts of nearest-neighbor scaling." },
            { title: "Smart Sharpen (Unsharp Mask)", desc: "After upscaling, a subtle unsharp mask is applied to enhance edge contrast and recover detail that naturally softens during enlargement. Adjust the toggle to control the effect." },
            { title: "2x, 3x & 4x Scaling", desc: "Choose from three common magnification factors. 2x is ideal for most use cases, 3x for aggressive enlargement, and 4x for extreme upscaling where maximum detail recovery is needed." },
            { title: "100% Private & Local", desc: "Every pixel stays on your device. The entire upscaling process runs in your browser using the Canvas API — nothing is uploaded to any server." },
          ].map((c) => (
            <div key={c.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Upscale Factor Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Scale</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Megapixels (1 MP input)</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Example Input</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Example Output</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scale: "2x", mp: "4 MP", input: "1080 &times; 720", output: "2160 &times; 1440" },
                  { scale: "3x", mp: "9 MP", input: "1080 &times; 720", output: "3240 &times; 2160" },
                  { scale: "4x", mp: "16 MP", input: "1080 &times; 720", output: "4320 &times; 2880" },
                ].map((r) => (
                  <tr key={r.scale} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-3">{r.scale}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.mp}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.input}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">When to Upscale Images</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Print enlargement:</strong> Upscale low-resolution photos before printing to avoid pixelation at larger print sizes.</li>
              <li><strong className="text-[#e6edf5]">Social media covers:</strong> Enlarge small images to fit banner dimensions for Twitter, LinkedIn, or Facebook without stretching.</li>
              <li><strong className="text-[#e6edf5]">Product photos:</strong> Increase resolution of product images for e-commerce platforms that require high-resolution uploads.</li>
              <li><strong className="text-[#e6edf5]">Thumbnails to heroes:</strong> Convert small thumbnails into larger hero images for blog posts and landing pages.</li>
              <li><strong className="text-[#e6edf5]">Legacy photo restoration:</strong> Enlarge old digital photos to modern resolution standards before editing or sharing.</li>
              <li><strong className="text-[#e6edf5]">Website hero images:</strong> Upscale stock photos or small graphics to fit full-width hero sections on landing pages without quality loss.</li>
              <li><strong className="text-[#e6edf5]">Presentation slides:</strong> Increase resolution of embedded images before inserting into slide decks to avoid pixelation on projectors or large displays.</li>
              <li><strong className="text-[#e6edf5]">Digital art portfolios:</strong> Prepare artwork at higher resolutions for print-on-demand services that require minimum dimension thresholds.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Upscaling Best Practices</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Start with the highest quality source image available. Garbage in, garbage out.</li>
              <li>Use 2x upscaling for the best quality-to-size ratio. 4x is best for small source images.</li>
              <li>Always keep the Smart Sharpen toggle on unless you prefer a softer look.</li>
              <li>Export to PNG for maximum quality, or WebP for smaller files with good quality.</li>
              <li>For best results, upscale images that are already sharp and well-exposed.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Understanding Upscaling Quality</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Bicubic interpolation</strong> produces smoother results than bilinear or nearest-neighbor by sampling 16 surrounding pixels. It preserves edge definition better than simpler algorithms.</li>
              <li><strong className="text-[#e6edf5]">Smart Sharpen</strong> applies an unsharp mask after upscaling to enhance edge contrast. This recovers some of the perceived detail that naturally softens during enlargement.</li>
              <li><strong className="text-[#e6edf5]">Upscaling is not magic</strong> — it cannot create detail that is not in the original image. The best results come from sharp, well-exposed source images. Severely compressed or blurry originals will not look sharp after upscaling.</li>
              <li><strong className="text-[#e6edf5]">Source quality matters:</strong> A 500x500 image upscaled 4x to 2000x2000 will look significantly better if the original was saved at JPEG quality 95% versus 60%.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">When Each Scale Factor Works Best</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">2x upscaling:</strong> Best quality-to-size ratio. Use for most general-purpose enlargements — profile pictures, social media posts, and blog images. Results are crisp with minimal softening.</li>
              <li><strong className="text-[#e6edf5]">3x upscaling:</strong> Good for moderate enlargement needs. Use when you need to convert small thumbnails to medium-sized display images or prepare images for half-page print layouts.</li>
              <li><strong className="text-[#e6edf5]">4x upscaling:</strong> Maximum enlargement for extreme cases. Best for converting tiny images for large displays, full-page print, or when the source image is very small and no alternative exists.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Private & Secure Upscaling</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            All image upscaling happens locally in your browser using GPU-accelerated bicubic interpolation.
            Your images never leave your device.
          </p>
        </div>
        <p className="text-[0.7rem] text-[#576675] text-center mt-8">Last updated: March 2026</p>
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[0.75rem] text-[#8d9aaa] text-center">
            Learn more: <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Social Media Image Sizes 2026</Link> · <Link href="/guides/instagram-feed-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Instagram Image Sizes</Link> · <Link href="/guides/pinterest-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Pinterest Image Sizes</Link>
          </p>
        </div>
      </section>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SquarePic - HD Image Upscaler",
        url: "https://www.squarepic.io/upscaler",
        description: "Free online HD image upscaler. Enlarge photos 2x, 3x, or 4x with bicubic interpolation and smart sharpening. All processing is private and local.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }} />
    </>
  );
}
