import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { UpscalerTool } from "@/components/upscaler/upscaler-tool";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";
import { ToolLinks } from "@/components/layout/tool-links";
import { UpscaleOutputExample } from "@/components/guides/upscale-output-example";

export const metadata = pageMetadata({
  title: "Image Upscaler: Enlarge PNG & JPG Without AI",
  description: "Upscale PNG, JPG and WebP images online free without AI. Enlarge 2x, 3x or 4x, preserve PNG transparency and try optional sharpening. No signup or watermark.",
  path: "/upscaler",
  image: "/og/og-upscaler.png",
});

const heading = "text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3";
const linkStyle = "text-[var(--accent)] hover:underline";
const questions = [
  { question: "Is this an AI image upscaler?", answer: "No. SquarePic uses browser image smoothing and optional sharpening. It enlarges the pixels already in your image rather than generating new texture, facial detail, or lettering with an AI model." },
  { question: "Can I upscale a PNG with a transparent background?", answer: "Yes. Upload the PNG and select PNG for export to preserve transparent areas. JPEG does not support transparency. Check the downloaded PNG in an editor that displays transparency." },
  { question: "Will upscaling fix a blurry or compressed photo?", answer: "Enlargement cannot restore detail missing from the source. Sharpening can increase edge contrast, but it can also exaggerate noise and compression artifacts. Compare the original and result before downloading." },
  { question: "Is this suitable for pixel art?", answer: "This tool smooths images during scaling. Pixel art usually needs nearest-neighbor scaling to keep hard pixel edges, so a dedicated pixel-art editor is a better choice for that task." },
  { question: "Does upscaling change the aspect ratio?", answer: "No. The same multiplier is applied to width and height. A 600 × 400 photo becomes 1200 × 800 at 2x, keeping its 3:2 proportions." },
];

export default function UpscalerPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Upscaler", url: `${SITE}/upscaler` }]} />
      <WebAppSchema name="SquarePic - Image Upscaler" url={`${SITE}/upscaler`} description="Enlarge images locally using browser smoothing and optional sharpening, without an AI model." dateModified="2026-10-08" />
      <UpscalerTool />
      <ToolLinks current="/upscaler" />
      <section className="max-w-[900px] mx-auto px-4 pb-16 text-[0.9rem] text-[#8d9aaa] leading-relaxed">
        <h2 className={heading}>How to upscale a PNG or JPG image</h2>
        <p>Image upscaling increases width and height. SquarePic offers 2x, 3x, and 4x enlargement with optional sharpening, all on your device. It uses the browser&apos;s image-smoothing controls, so the exact resampling method and appearance can vary by browser.</p>
        <ol className="list-decimal pl-5 space-y-2 mt-4">
          <li>Select the original image rather than a screenshot or a previously compressed copy.</li>
          <li>Start with 2x. Choose 3x or 4x only if you need the additional output pixels.</li>
          <li>Try Smart Sharpen both on and off. Compare the edges of lettering, hair, and other fine detail in the preview.</li>
          <li>Export as PNG for lossless output and transparency, JPEG for photographs, or WebP when your destination supports it.</li>
        </ol>
        <h2 className={heading}>What 2x, 3x, and 4x actually change</h2>
        <p>The multiplier applies to each dimension, not to the total pixel count. A 2x enlargement contains four times as many pixels; 4x contains sixteen times as many. More pixels increase memory use and may slow processing on a phone.</p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-[0.875rem] border-collapse">
            <caption className="text-left mb-2">Calculated output sizes for a 600 × 400 source photo</caption>
            <thead><tr className="border-b border-white/10"><th scope="col" className="text-left py-2">Scale</th><th scope="col" className="text-left py-2">Output dimensions</th><th scope="col" className="text-left py-2">Pixel count</th></tr></thead>
            <tbody>{[
              { scale: "2x", size: "1200 × 800", pixels: "0.96 MP" },
              { scale: "3x", size: "1800 × 1200", pixels: "2.16 MP" },
              { scale: "4x", size: "2400 × 1600", pixels: "3.84 MP" },
            ].map((row) => <tr key={row.scale} className="border-b border-white/10"><th scope="row" className="text-left py-3">{row.scale}</th><td>{row.size}</td><td>{row.pixels}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4">Use the <Link href="/image-size-calculator" className={linkStyle}>image size and aspect ratio calculator</Link> when you need a specific proportional size. Enlarging a rectangular photo does not make it square; follow the <Link href="/guides/make-image-square-without-cropping" className={linkStyle}>square-photo guide</Link> to add background or crop.</p>
        <h2 className={heading}>Compare actual 2x and 4x downloads</h2>
        <UpscaleOutputExample />
        <h2 className={heading}>Supported files and output limits</h2>
        <p>Start with a browser-decodable PNG, JPEG or WebP of up to 30 MB. Output is limited to 40 million pixels
          and 16,384 pixels per side. Large images can still exceed a device&apos;s available memory.
          If processing fails, choose a smaller source or lower multiplier and try again.</p>
        <p className="mt-3">PNG and WebP retain transparency; JPEG fills transparent areas with white.
          Animated inputs become one still frame. Source metadata is not copied to the export.</p>
        <h2 className={heading}>Smoothing and sharpening have different jobs</h2>
        <p>Smoothing resamples the source into a larger grid of pixels. Smart Sharpen then increases contrast around edges. It can make the result look crisper, but it cannot reconstruct missing detail. Turn it off if you see halos around edges or stronger noise in flat areas.</p>
        <p className="mt-3">The implementation requests high-quality smoothing through Canvas and applies a local sharpening filter. It does not guarantee a particular bicubic algorithm or use a generative AI model. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality" className={linkStyle}>MDN&apos;s documentation of browser image smoothing</a> for how that setting works.</p>
        <h2 className={heading}>Questions about enlarging photos</h2>
        <div className="space-y-5">{questions.map((item) => <div key={item.question}><h3 className="font-bold text-[#e6edf5] mb-1">{item.question}</h3><p>{item.answer}</p></div>)}</div>
        <h2 className={heading}>Prepare an enlarged image for its destination</h2>
        <p className="mb-3">Planning a print? Read <Link href="/guides/how-to-enlarge-a-photo" className={linkStyle}>how to enlarge a photo for screens and printing</Link> to calculate the required pixels and check the result before ordering.</p>
        <p>Review the output at its intended display size. For a banner or avatar, check the <Link href="/resize/linkedin" className={linkStyle}>LinkedIn dimensions</Link> or <Link href="/resize/instagram" className={linkStyle}>Instagram presets</Link> before exporting. If a larger image exceeds an upload limit, use the <Link href="/compressor" className={linkStyle}>image compressor</Link> after choosing the required dimensions.</p>
        <p className="text-base mt-8">Last updated: October 8, 2026</p>
      </section>
    </>
  );
}
