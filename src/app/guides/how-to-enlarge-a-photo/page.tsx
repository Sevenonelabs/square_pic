import Link from "next/link";
import { RelatedGuides } from "@/components/guides/related-guides";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { UpscaleOutputExample } from "@/components/guides/upscale-output-example";
import { TableOfContents } from "@/components/guides/table-of-contents";
import { PrintSizePlanner } from "@/components/guides/image-planning-calculators";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

const PATH = "/guides/how-to-enlarge-a-photo";
const TITLE = "How to Enlarge a Photo for Screens and Printing";
const DESCRIPTION = "Learn how to enlarge a photo for screens or print. Calculate required pixels, check cropping and find a supported scale before exporting your image.";
const link = "text-[var(--accent)] hover:underline";
const heading = "text-xl font-extrabold text-[#e6edf5] mt-8 mb-3";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, image: "/og/og-upscaler.png", article: true, publishedTime: "2026-10-09" });

export default function EnlargePhotoGuide() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE_URL }, { name: "Guides", url: `${SITE_URL}/guides` }, { name: "Enlarge a photo", url: `${SITE_URL}${PATH}` }]} />
      <ArticleSchema title={TITLE} description={DESCRIPTION} url={`${SITE_URL}${PATH}`} imageUrl={`${SITE_URL}/og/og-upscaler.png`} datePublished="2026-10-09" dateModified="2026-10-09" authorName="SevenOneLabs" authorUrl={`${SITE_URL}/author/sevenonelabs`} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8 text-base text-[#8d9aaa] leading-relaxed">
        <Link href="/guides" className={`inline-flex min-h-11 items-center ${link}`}>&larr; All guides</Link>
        <h1 className="text-[1.8rem] font-extrabold text-[#e6edf5] tracking-tight mt-4 mb-3">{TITLE}</h1>
        <p className="mb-6">Published October 9, 2026 · By <Link href="/author/sevenonelabs" className={link}>SevenOneLabs</Link></p>
        <p className="mb-6">To enlarge a photo, start with the original file, calculate the dimensions you need, and apply the smallest enlargement that meets them. Inspect the result before exporting. More output pixels cannot recover detail your source never captured, so enlarging an image without losing quality depends on the source and how you will view it.</p>
        <a href="#planner" className={`inline-flex min-h-11 items-center mb-4 font-semibold ${link}`}>Calculate the pixels and scale for my print &darr;</a>
        <TableOfContents items={[
          { id: "target", label: "Calculate the pixels you need", level: 2 },
          { id: "planner", label: "Plan your print enlargement", level: 2 },
          { id: "steps", label: "Enlarge a photo online", level: 2 },
          { id: "quality", label: "Check quality before saving", level: 2 },
          { id: "print", label: "Prepare a photo for printing", level: 2 },
          { id: "alternatives", label: "When a different source is better", level: 2 },
          { id: "questions", label: "Questions before enlarging", level: 2 },
        ]} />

        <h2 id="target" className={heading}>Calculate the pixels you need</h2>
        <p>For a screen image, use the destination&apos;s requested width and height. If a 600 × 400 photo needs to become 1200 × 800, the enlargement is 2x on both edges. It contains four times the original pixel count and keeps its 3:2 proportions. The <Link href="/image-size-calculator" className={link}>aspect ratio calculator</Link> can calculate a proportional height from your target width.</p>
        <p className="mt-3">For a print, multiply each physical dimension in inches by the requested PPI. An 8 × 10 inch print at 300 PPI needs 2400 × 3000 pixels. Check the shape as well as the count. A 3:2 photo cannot fill a 4:5 print without cropping, adding borders or distorting the subject.</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-left">
            <caption className="text-left mb-3">Calculated print examples at 300 PPI, before bleed or margins</caption>
            <thead><tr className="border-b border-white/10"><th scope="col" className="py-2 pr-4">Print size</th><th scope="col" className="pr-4">Required pixels</th><th scope="col">Shape</th></tr></thead>
            <tbody>{[
              ["4 × 6 in", "1200 × 1800", "2:3"],
              ["5 × 7 in", "1500 × 2100", "5:7"],
              ["8 × 10 in", "2400 × 3000", "4:5"],
              ["8 × 8 in", "2400 × 2400", "1:1"],
            ].map(([size, pixels, ratio]) => <tr key={size} className="border-b border-white/10"><th scope="row" className="py-3 pr-4 font-semibold text-[#e6edf5]">{size}</th><td className="pr-4">{pixels}</td><td>{ratio}</td></tr>)}</tbody>
          </table>
        </div>

        <h2 id="planner" className={heading}>Plan your print enlargement</h2>
        <PrintSizePlanner />
        <h2 id="steps" className={heading}>How to enlarge a photo online</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Open the <Link href="/upscaler" className={link}>SquarePic image upscaler</Link>. Select the original PNG, JPEG or WebP rather than a screenshot or a copy saved from a messaging app.</li>
          <li>Start with 2x. Choose 3x or 4x only when the required output dimensions justify it. The same factor applies to width and height.</li>
          <li>Run the enlargement with Smart Sharpen enabled, then compare with it disabled. Inspect faces, fine lettering and high-contrast edges.</li>
          <li>Download PNG to avoid another lossy compression step, or choose JPEG or WebP when your destination requires it. Check the saved file at its intended display size.</li>
        </ol>
        <p className="mt-3">Image processing stays on your device. SquarePic uses browser smoothing and optional sharpening, without an AI model. It accepts inputs up to 30 MB; output is limited to 40 million pixels and 16,384 pixels per edge. A 4000 × 3000 source already contains 12 million pixels, so 2x would require 48 million and exceed the output limit.</p>

        <h2 id="quality" className={heading}>Check quality before saving</h2>
        <p>Look for bright or dark outlines around edges, stronger grain in flat areas, and blocky patterns around text. Those are reasons to reduce sharpening or use a better source. Compare at the same display size first; then open the download at 100% to inspect individual pixels.</p>
        <UpscaleOutputExample />
        <p>Smoothing estimates the pixels between existing samples. Sharpening increases local edge contrast. Neither makes small unreadable text reliable. Adobe&apos;s <a href="https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/image-size-resolution-and-resampling.html" className={link}>explanation of resampling</a> covers the difference between pixel dimensions and resolution settings.</p>

        <h2 id="print" className={heading}>Prepare an enlarged photo for printing</h2>
        <p>Ask the print provider for its required PPI, crop, bleed and file format. Adobe uses 300 PPI as a common high-quality print reference in its <a href="https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/change-print-dimensions-and-resolution.html" className={link}>print dimensions guidance</a>; your provider&apos;s specification should decide your export.</p>
        <p className="mt-3">A 600 × 400 source printed at 6 × 4 inches has 100 source pixels per inch. Enlarging to 1800 × 1200 gives the printer 300 output pixels per inch, but the captured detail still comes from that original 600 × 400 file. Order a small proof before paying for a large print.</p>
        <p className="mt-3">SquarePic exports pixel dimensions and does not copy source metadata. Set the physical print size in your print software or ordering form. For square prints, use the <Link href="/guides/square-image-size" className={link}>square image size guide</Link> to calculate the canvas and padding.</p>

        <h2 id="alternatives" className={heading}>When a different source is better</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>For an old paper photo, a higher-resolution scan may capture detail a small digital copy lacks. Upscaling that small copy cannot recover the original scan information.</li>
          <li>For a logo, ask for the original vector artwork and export it at the required size.</li>
          <li>For pixel art, use a dedicated editor with nearest-neighbor scaling. SquarePic&apos;s smoothing can soften the hard pixel edges. <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled" className={link}>MDN explains the effect of smoothing on pixel art</a>.</li>
          <li>For the wrong image shape, use the <Link href="/cropper" className={link}>photo cropper</Link> or <Link href="/guides/make-image-square-without-cropping" className={link}>add padding</Link> before judging whether enlargement is necessary.</li>
        </ul>
        <h2 id="questions" className={heading}>Questions before enlarging</h2>
        <h3 className="font-bold text-[#e6edf5] mt-4 mb-2">Can I enlarge a photo without losing quality?</h3>
        <p>A modest enlargement can look acceptable at its intended viewing size. It still estimates additional pixels. Check the downloaded result for blurred text, halos and noise; changing the file to PNG prevents another lossy export but does not repair existing damage.</p>
        <h3 className="font-bold text-[#e6edf5] mt-4 mb-2">Where can I enlarge photos for printing?</h3>
        <p>Use an image editor to prepare the digital file, then order the physical print from a local photo lab or print service. SquarePic prepares the image on your device. Ask the lab for pixel dimensions, crop and bleed requirements before exporting.</p>
        <h3 className="font-bold text-[#e6edf5] mt-4 mb-2">Will changing 72 PPI to 300 PPI make it sharper?</h3>
        <p>Changing the resolution label alone does not add pixels. At the same pixel dimensions, a higher PPI sets a smaller physical print size. Use the pixel target and source resolution in the planner to decide whether enlargement is needed.</p>
        <p className="mt-6 text-sm">Calculation method: print targets use inches × PPI. Scale and source PPI assume the photo fills the print, with cropping when shapes differ. Output limits match SquarePic&apos;s upscaler. Reviewed October 9, 2026.</p>
        <Link href="/upscaler" className="inline-flex min-h-11 items-center mt-8 px-5 py-3 rounded-md bg-[var(--accent)] text-black font-bold">Try a 2x enlargement</Link>
        <RelatedGuides current="how-to-enlarge-a-photo" />
      </article>
    </>
  );
}
