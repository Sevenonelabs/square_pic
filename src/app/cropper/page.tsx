import type { Metadata } from "next";
import Link from "next/link";
import { CropperTool } from "@/components/cropper/cropper-tool";
import { BreadcrumbSchema, WebAppSchema, HowToSchema } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Online Photo Cropper - Perfect Crop",
  description: "Crop photos online for free with precision controls. Aspect ratio presets, zoom, pan, and export to JPEG, PNG, or WebP.",
  openGraph: { title: "Free Online Photo Cropper - Perfect Crop | SquarePic" },
  alternates: { canonical: "https://squarepic.io/cropper" },
};

const SITE = "https://squarepic.io";

export default function CropperPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Photo Cropper", url: `${SITE}/cropper` }]} />
      <WebAppSchema name="SquarePic - Photo Cropper" url={SITE + "/cropper"} description="Crop photos online with precision. 8 drag handles, aspect ratio lock, zoom and pan, export to JPEG, PNG, or WebP." aggregateRating={{ ratingValue: "4.7", ratingCount: "63", bestRating: "5" }} />
      <HowToSchema steps={[
        { name: "Upload your image", text: "Select a photo from your device. Supports JPEG, PNG, WebP, GIF, BMP, and TIFF formats." },
        { name: "Adjust the crop area", text: "Drag the 8 resize handles to define your crop area. Use the zoom slider and pan for precise positioning." },
        { name: "Lock the aspect ratio", text: "Choose from common social media ratios (1:1, 4:5, 16:9, 9:16) or keep it freeform for custom crops." },
        { name: "Export the cropped image", text: "Click Export and download your cropped image in JPEG, PNG, or WebP format at the resolution you selected." },
      ]} />
      <CropperTool />
      <ToolLinks current="/cropper" />

      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How to Crop Photos for Social Media
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Cropping is one of the most fundamental photo editing skills. The right crop can transform a
            mediocre composition into a striking image. Whether you are preparing photos for Instagram,
            LinkedIn, or YouTube, choosing the correct aspect ratio is essential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Precision Crop Controls", desc: "Our photo cropper gives you eight drag handles for pixel-perfect control. Resize the crop area freely or lock the aspect ratio to maintain consistent dimensions across multiple images." },
            { title: "Aspect Ratio Lock", desc: "Keep your crop proportional with built-in presets for Instagram (1:1), portrait (4:5), widescreen (16:9), and story (9:16). The lock button toggles freeform mode for custom dimensions." },
            { title: "Zoom and Pan", desc: "Zoom in for detailed adjustments and pan around the image to position the crop area exactly where you want it. Fine-tune your composition without losing resolution." },
            { title: "Export at Full Resolution", desc: "The cropped image exports at the exact pixel dimensions you defined -- no downscaling. Download as JPEG, PNG, or WebP for maximum flexibility." },
          ].map((c) => (
            <div key={c.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Aspect Ratio Quick Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Ratio</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Common Dimensions</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Best For</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Platform</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ratio: "1:1", dim: "1080x1080", use: "Profile photos, square posts", plat: "Instagram, LinkedIn, Facebook" },
                  { ratio: "4:5", dim: "1080x1350", use: "Portrait feed posts", plat: "Instagram, Pinterest" },
                  { ratio: "16:9", dim: "1920x1080", use: "Landscape video, thumbnails", plat: "YouTube, Twitter/X" },
                  { ratio: "9:16", dim: "1080x1920", use: "Stories, Reels, Shorts", plat: "Instagram, TikTok, YouTube" },
                  { ratio: "2:3", dim: "1200x1800", use: "Portrait photography", plat: "Pinterest, print" },
                  { ratio: "3:2", dim: "1800x1200", use: "Landscape photography", plat: "Blog posts, articles" },
                  { ratio: "21:9", dim: "2560x1080", use: "Ultrawide banners", plat: "Twitter header, desktop wallpaper" },
                ].map((r) => (
                  <tr key={r.ratio} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-3">{r.ratio}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.dim}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.use}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.plat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Cropping Best Practices</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Follow the rule of thirds -- position key subjects along the grid lines for balanced compositions.</li>
              <li>Avoid cropping too tightly around faces. Leave some breathing room for social media rounded corners.</li>
              <li>Use the same aspect ratio for a series of posts to create a cohesive feed aesthetic.</li>
              <li>For print, always crop at the final output resolution to avoid quality loss from upscaling.</li>
              <li>Check platform guidelines -- each social network has specific optimal image dimensions.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Common Cropping Mistakes</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Cropping at joints:</strong> Avoid cutting off limbs at the ankle, wrist, or knee -- it looks unnatural.</li>
              <li><strong className="text-[#e6edf5]">Too much headroom:</strong> Leaving too much space above the subject makes the image feel empty.</li>
              <li><strong className="text-[#e6edf5]">Ignoring orientation:</strong> A vertical crop for a horizontal layout wastes pixels and looks awkward.</li>
              <li><strong className="text-[#e6edf5]">Over-cropping:</strong> Removing too much context can make the subject unrecognizable or the story unclear.</li>
            </ul>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Crop Photos Privately</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            All image cropping happens locally in your browser. Your photos never leave your device.
            <Link href="/blog/privacy-first-image-editing" className="text-[var(--accent)] no-underline hover:underline ml-1 font-semibold">
              Learn more about our privacy-first approach →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

