import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { CropperTool } from "@/components/cropper/cropper-tool";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = pageMetadata({
  "title": "Free Photo Cropper: Crop Images Online",
  "description": "Crop photos online free with square, 4:5, 16:9 and 9:16 presets. Preview source-pixel dimensions and export PNG, JPG or WebP locally, with no signup.",
  "path": "/cropper",
  "image": "/og/og-cropper.png"
});

export default function CropperPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Cropper", url: `${SITE}/cropper` }]} />
      <WebAppSchema name="SquarePic - Image Cropper" url={SITE + "/cropper"} description="Select a bounded source-image region, preview its pixel dimensions and export JPEG, PNG or WebP without enlargement." dateModified="2026-10-08" />
      <CropperTool />
      <ToolLinks current="/cropper" />

      <section className="w-full min-w-0 max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            How to Crop Images for Social Media
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            Select the part of your photo you want to keep, then check Export size before downloading.
            The result contains the selected source pixels. Changing the preview zoom does not enlarge the export.
            To reach a specific canvas size, use a platform resizer after cropping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Precision Crop Controls", desc: "Our image cropper gives you eight drag handles for pixel-perfect control. Resize the crop area freely or lock the aspect ratio to maintain consistent dimensions across multiple images." },
            { title: "Aspect Ratio Presets", desc: "Choose square 1:1, portrait 4:5, widescreen 16:9 or vertical 9:16. Choose Free when you want to change width and height independently." },
            { title: "Zoom and Pan", desc: "Zoom in for detailed adjustments and pan around the image to position the crop area exactly where you want it. Fine-tune your composition without losing resolution." },
            { title: "Export Source Pixels", desc: "Export size shows the selected region in source pixels, rounded and kept inside the original image. A square crop from a 600 × 400 source cannot be larger than 400 × 400 without resizing afterward." },
          ].map((c) => (
            <div key={c.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-8">
          Start with a browser-decodable PNG, JPEG or WebP. PNG and WebP retain transparent pixels;
          JPEG fills them with white. Animated inputs produce one still frame and source metadata is not copied.
          A decode or export failure appears in the tool. Try a smaller image or save the source as PNG or JPEG.
        </p>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Cropping for Different Platforms</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Instagram feed:</strong> Crop to 1:1 (1080x1080) for square posts or 4:5 (1080x1350) for portrait posts that fill more screen space.</li>
              <li><strong className="text-[#e6edf5]">Instagram Stories / Reels:</strong> A 9:16 crop prepares vertical still artwork. Use the <Link href="/resize/instagram?preset=stories#resizer" className="text-[var(--accent)] hover:underline">1080 × 1920 editor</Link> for exact canvas dimensions, then check text against the current placement preview.</li>
              <li><strong className="text-[#e6edf5]">YouTube thumbnails:</strong> Crop to 16:9 (1280x720) with bold, centered subjects. Thumbnails drive click-through rates.</li>
              <li><strong className="text-[#e6edf5]">LinkedIn covers:</strong> Personal and company covers use different shapes. Choose the <Link href="/resize/linkedin?preset=cover#resizer" className="text-[var(--accent)] hover:underline">1512 × 256 company Page cover</Link> or <Link href="/resize/linkedin?preset=personalCover#resizer" className="text-[var(--accent)] hover:underline">1584 × 396 personal cover</Link>, then inspect the upload preview.</li>
              <li><strong className="text-[#e6edf5]">Facebook link previews:</strong> Open Graph images display at 1200x630 (1.91:1). Crop your images to this ratio for clean link shares.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Composition Techniques</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Rule of thirds:</strong> Position key elements along the grid lines (or at their intersections) for naturally balanced compositions.</li>
              <li><strong className="text-[#e6edf5]">Leading lines:</strong> Use natural lines in your image (roads, fences, architecture) to draw the viewer&apos;s eye toward the subject.</li>
              <li><strong className="text-[#e6edf5]">Symmetry and patterns:</strong> Centered compositions with symmetrical elements create visually striking images that work well in square formats.</li>
              <li><strong className="text-[#e6edf5]">Negative space:</strong> Leaving empty space around your subject creates focus and gives text overlays room to breathe in social media graphics.</li>
              <li><strong className="text-[#e6edf5]">Fill the frame:</strong> Get close to your subject. A tight crop often creates more impact than a wide shot with too much background.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Crop Images Privately</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            All image cropping happens locally in your browser. Your images never leave your device.
          </p>
        </div>
        <p className="text-[0.7rem] text-[#576675] text-center mt-8">Last updated: October 8, 2026</p>
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[0.75rem] text-[#8d9aaa] text-center">
            Learn more: <Link href="/image-size-calculator" className="text-[var(--accent)] no-underline hover:underline">Calculate aspect ratio</Link> · <Link href="/guides/make-image-square-without-cropping" className="text-[var(--accent)] no-underline hover:underline">Fit a photo without cropping</Link> · <Link href="/guides/instagram-feed-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Instagram framing guide</Link> · <Link href="/guides/linkedin-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">LinkedIn cover references</Link>
          </p>
        </div>
      </section>
    </>
  );
}

