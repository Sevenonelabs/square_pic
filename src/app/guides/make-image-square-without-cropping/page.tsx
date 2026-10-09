import { PlatformTitle } from "@/components/platform-icon";
import { TableOfContents } from "@/components/guides/table-of-contents";
import { SquareOutputExample } from "@/components/guides/square-output-example";
import Link from "next/link";
import { RelatedGuides } from "@/components/guides/related-guides";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";

const PATH = "/guides/make-image-square-without-cropping";
const TITLE = "How to Make an Image Square Without Cropping";
const linkStyle = "text-[var(--accent)] hover:underline";
const headingStyle = "text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3";

export const metadata = pageMetadata({
  title: "How to Make an Image Square Without Cropping",
  description: "Learn how to make an image square without cropping. Follow photo examples, compare blur and solid padding, calculate borders and choose PNG, JPG or WebP export.",
  path: PATH,
  article: true,
  publishedTime: "2026-10-07",
});

export default function SquarePhotoGuide() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE_URL }, { name: "Guides", url: `${SITE_URL}/guides` }, { name: "Make a photo square", url: `${SITE_URL}${PATH}` }]} />
      <ArticleSchema title={TITLE} description="Learn how to make an image square without cropping. Follow photo examples, compare blur and solid padding, calculate borders and choose PNG, JPG or WebP export."
        url={`${SITE_URL}${PATH}`} imageUrl={`${SITE_URL}/og/og-home.png`} datePublished="2026-10-07" dateModified="2026-10-08"
        authorName="SevenOneLabs" authorUrl={`${SITE_URL}/author/sevenonelabs`} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8 text-[1rem] text-[#8d9aaa] leading-relaxed">
        <Link href="/guides" className="inline-flex min-h-11 items-center mb-4 text-base font-semibold text-[var(--accent)] hover:underline">&larr; All guides</Link>
        <Link href="/guides" className={linkStyle}>All image guides</Link>
        <h1 className="text-[1.8rem] font-extrabold text-[#e6edf5] tracking-tight mt-4 mb-3">{TITLE}</h1>
        <p className="text-[1rem] mb-6">Published October 7, 2026 · By <Link href="/author/sevenonelabs" className={linkStyle}>SevenOneLabs</Link></p>
        <p className="text-[1rem] mb-4">Review method: export the same source in Solid and Crop modes, decode the downloads, and compare their dimensions and retained edges. The examples use 0% Outer Border and 100% Zoom. Reviewed October 8, 2026.</p>
        <p>To make an image square without cropping, place the entire photo inside a 1:1 canvas and fill the unused space with a solid color or blurred background. The photo keeps its proportions; only the surrounding canvas changes shape. Use <Link href="/" className={linkStyle}>SquarePic&apos;s square image maker</Link> to try both backgrounds.</p>
        <nav aria-label="In this guide" className="my-6 p-5 border border-white/10 rounded-xl text-[1rem]">
          <p className="font-bold text-[#e6edf5] mb-2">In this guide</p>
          <ul className="pl-5 list-disc space-y-1">
            <li><a href="#steps" className={linkStyle}>Make a square photo in SquarePic</a></li>
            <li><a href="#crop-or-fit" className={linkStyle}>Crop, pad, or stretch?</a></li>
            <li><a href="#dimensions" className={linkStyle}>Calculate the background space</a></li>
            <li><a href="#export" className={linkStyle}>Choose size and file format</a></li>
          </ul>
        </nav>
        <TableOfContents items={[
  {
    "id": "steps",
    "label": "How to make a photo square without cropping",
    "level": 2
  },
  {
    "id": "crop-or-fit",
    "label": "Should you crop, add padding, or stretch?",
    "level": 2
  },
  {
    "id": "dimensions",
    "label": "A worked example: 1200 × 800 to 1080 × 1080",
    "level": 2
  },
  {
    "id": "export",
    "label": "Choose the output size and file format",
    "level": 2
  },
  {
    "id": "will-instagram-still-crop-the-result",
    "label": "Will Instagram still crop the result?",
    "level": 2
  }
]} />
        <h2 id="steps" className={headingStyle}>How to make a photo square without cropping</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Open the <Link href="/" className={linkStyle}>square photo editor</Link> and select your image. Image processing happens on your device.</li>
          <li>Choose <strong className="text-[#e6edf5]">Blur</strong> for a background made from your photo, <strong className="text-[#e6edf5]">Solid</strong> for a plain color, or <strong className="text-[#e6edf5]">Transparent</strong> for empty padding around a logo. Crop trims the picture instead.</li>
          <li>Leave Zoom at 100%. Adjust Outer Border to control padding. Set it to 0% if you want the photo&apos;s longer edge to reach the edge of the square.</li>
          <li>Choose 1080 × 1080 or 1200 × 1200 in Square size, or enter a custom edge from 1 to 4096 pixels and select Apply. Original size uses the photo&apos;s longer dimension, capped at 4096 pixels. The editor shows actual output dimensions and a notice when the limit applies.</li>
          <li>Check that faces, text, and objects are visible in the preview. Choose PNG, JPEG, or WebP, then use Download &amp; Share to save the result.</li>
        </ol>
        <p className="mt-4">Increasing Zoom can push the photo beyond the canvas, even in Blur, Solid or Transparent mode. Reduce Zoom if a face or an edge disappears. For avatars, leave extra room around the subject because the destination may display a circular crop.</p>

        <h2 id="crop-or-fit" className={headingStyle}>Should you crop, add padding, or stretch?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[1rem] border-collapse">
            <caption className="text-left mb-3">Three ways a rectangular picture can occupy a square</caption>
            <thead><tr className="border-b border-white/10"><th scope="col" className="text-left py-2 pr-3">Method</th><th scope="col" className="text-left py-2 pr-3">What changes</th><th scope="col" className="text-left py-2">Use it when</th></tr></thead>
            <tbody>
              <tr className="border-b border-white/10"><th scope="row" className="text-left py-3 pr-3">Fit with background</th><td className="pr-3">Adds space; keeps the full scene</td><td>Edges contain people, text, or product details</td></tr>
              <tr className="border-b border-white/10"><th scope="row" className="text-left py-3 pr-3">Centered crop</th><td className="pr-3">Removes edges; fills the canvas</td><td>The subject fits within the center square</td></tr>
              <tr><th scope="row" className="text-left py-3 pr-3">Stretch</th><td className="pr-3">Changes the subject&apos;s proportions</td><td>Avoid it for photos; faces and objects become distorted</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">SquarePic&apos;s Blur, Solid and Transparent modes fit the photo; Crop uses a centered crop. If you need to choose a different crop area, use the <Link href="/cropper" className={linkStyle}>image cropper</Link> before returning to the square editor.</p>

        <h2 id="dimensions" className={headingStyle}>A worked example: 1200 × 800 to 1080 × 1080</h2>
        <p>A 1200 × 800 landscape photo has a 3:2 aspect ratio. To fit it inside a 1080 × 1080 square with no extra outer border, scale both dimensions by 1080 ÷ 1200 = 0.9. The photo becomes 1080 × 720. That leaves 360 pixels vertically, or 180 pixels of background above and below it.</p>
        <figure className="my-5 border border-white/10 rounded-xl p-4">
          <svg viewBox="0 0 480 250" role="img" aria-labelledby="square-example-title square-example-desc" className="w-full h-auto">
            <title id="square-example-title">Fitting a landscape photo versus cropping it to a square</title>
            <desc id="square-example-desc">On the left the whole landscape photo fits inside a square with background above and below. On the right a centered square crop removes the left and right edges.</desc>
            <rect x="10" y="10" width="210" height="210" fill="#18212c" stroke="#8d9aaa" />
            <rect x="10" y="45" width="210" height="140" fill="#247579" />
            <circle cx="55" cy="100" r="13" fill="#e6edf5" /><circle cx="175" cy="100" r="13" fill="#e6edf5" />
            <path d="M20 172L80 120L135 155L180 130L210 172" fill="none" stroke="#e6edf5" strokeWidth="3" />
            <rect x="260" y="10" width="210" height="210" fill="#247579" stroke="#8d9aaa" />
            <path d="M260 201L310 100L392 151L470 103" fill="none" stroke="#e6edf5" strokeWidth="3" />
            <text x="115" y="242" textAnchor="middle" fill="#e6edf5" fontSize="13">Fit: keep both edges</text>
            <text x="365" y="242" textAnchor="middle" fill="#e6edf5" fontSize="13">Crop: remove both edges</text>
          </svg>
          <figcaption className="text-[1rem] mt-2">Illustration of the two methods, with Outer Border at 0% and Zoom at 100%.</figcaption>
        </figure>
        <p>A centered crop of that source keeps an 800 × 800 region, removing 200 source pixels from each side before resizing. For a portrait photo, fitting adds background to the left and right instead. Use the <Link href="/image-size-calculator" className={linkStyle}>aspect ratio calculator</Link> to check your source dimensions.</p>

        <h2 id="export" className={headingStyle}>Choose the output size and file format</h2>
        <p className="mb-3">Need to choose an exact edge length? The <Link href="/guides/square-image-size" className={linkStyle}>square image size guide</Link> compares pixel dimensions, crop limits and print sizes.</p>
        <p>A larger export does not restore missing detail. Start with the original photo rather than a screenshot or a previously compressed copy. Read <Link href="/guides/how-to-enlarge-a-photo" className={linkStyle}>how to enlarge a photo for screens or printing</Link> to check the required pixels. If enlargement is necessary, the <Link href="/upscaler" className={linkStyle}>non-AI image upscaler</Link> offers 2x, 3x, and 4x scaling with optional sharpening.</p>
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Choose JPEG for photographs when a smaller file is useful. Repeated JPEG exports can add compression artifacts.</li>
          <li>Choose PNG for logos, text, or lossless export. Select Transparent to preserve empty padding and transparency in your source image. The checkerboard marks empty space and does not appear in the download. PNG alone does not remove a solid background already in the source.</li>
          <li>Choose WebP for a smaller web image when your destination supports it. If an upload has a file-size limit, use the <Link href="/compressor" className={linkStyle}>image compressor</Link> after framing the photo.</li>
        </ul>
        <h2 className={headingStyle} id="will-instagram-still-crop-the-result"><PlatformTitle title={"Will Instagram still crop the result?"} /></h2>
        <p>Your exported file remains square, but feed views, grid previews, and circular profile pictures can display it differently. Inspect the destination&apos;s preview before publishing. For vertical content, use the <Link href="/guides/instagram-reels-stories-guide" className={linkStyle}>Reels and Stories dimensions guide</Link>; a 9:16 Story needs a different canvas from a 1:1 post.</p>
        <p className="mt-6">This guide describes SquarePic&apos;s fit and centered-crop controls. The dimension examples are calculated from the stated source and output sizes, rather than platform display guarantees.</p>
        <Link href="/" className="inline-block mt-6 px-5 py-3 rounded-md bg-[var(--accent)] text-black font-bold">Make your photo square</Link>
        <SquareOutputExample />
        <RelatedGuides current="make-image-square-without-cropping" />
      </article>
    </>
  );
}
