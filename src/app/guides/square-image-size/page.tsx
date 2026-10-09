import Link from "next/link";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { TableOfContents } from "@/components/guides/table-of-contents";
import { SquareSizePlanner } from "@/components/guides/image-planning-calculators";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

const PATH = "/guides/square-image-size";
const TITLE = "Square Image Size: Pixels, Ratios and Printing";
const DESCRIPTION = "Choose a square image size in pixels. Calculate padding, crop loss and enlargement for your photo, then compare square dimensions and print sizes.";
const link = "text-[var(--accent)] hover:underline";
const heading = "text-xl font-extrabold text-[#e6edf5] mt-8 mb-3";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, article: true, publishedTime: "2026-10-09" });

export default function SquareImageSizeGuide() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE_URL }, { name: "Guides", url: `${SITE_URL}/guides` }, { name: "Square image size", url: `${SITE_URL}${PATH}` }]} />
      <ArticleSchema title={TITLE} description={DESCRIPTION} url={`${SITE_URL}${PATH}`} imageUrl={`${SITE_URL}/og/og-home.png`} datePublished="2026-10-09" dateModified="2026-10-09" authorName="SevenOneLabs" authorUrl={`${SITE_URL}/author/sevenonelabs`} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8 text-base text-[#8d9aaa] leading-relaxed">
        <Link href="/guides" className={`inline-flex min-h-11 items-center ${link}`}>&larr; All guides</Link>
        <h1 className="text-[1.8rem] font-extrabold text-[#e6edf5] tracking-tight mt-4 mb-3">{TITLE}</h1>
        <p className="mb-6">Published October 9, 2026 · By <Link href="/author/sevenonelabs" className={link}>SevenOneLabs</Link></p>
        <p className="mb-6">A square image size has equal width and height. Both 400 × 400 and 1200 × 1200 pixels are square because they have a 1:1 aspect ratio. There is no single standard pixel size for every square photo. Choose the dimensions your destination asks for, then check whether your original has enough detail.</p>
        <a href="#planner" className={`inline-flex min-h-11 items-center mb-4 font-semibold ${link}`}>Calculate padding and crop loss for my photo &darr;</a>
        <TableOfContents items={[
          { id: "pixels", label: "Square sizes in pixels", level: 2 },
          { id: "planner", label: "Calculate your square size", level: 2 },
          { id: "source", label: "Choose a size your source can support", level: 2 },
          { id: "print", label: "Convert square pixels to print inches", level: 2 },
          { id: "export", label: "Export the exact square size", level: 2 },
          { id: "questions", label: "Common size questions", level: 2 },
        ]} />

        <h2 id="pixels" className={heading}>Square sizes in pixels</h2>
        <p>All of these canvases have the same shape. Doubling each edge creates four times as many pixels. The table compares dimensions; it does not prescribe a platform upload requirement.</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-left">
            <caption className="text-left mb-3">Calculated dimensions for square canvases</caption>
            <thead><tr className="border-b border-white/10"><th scope="col" className="py-2 pr-4">Width × height</th><th scope="col" className="pr-4">Megapixels</th><th scope="col">At 300 PPI</th></tr></thead>
            <tbody>{[
              ["400 × 400", "0.16 MP", "1.33 × 1.33 in"],
              ["800 × 800", "0.64 MP", "2.67 × 2.67 in"],
              ["1080 × 1080", "1.17 MP", "3.6 × 3.6 in"],
              ["1200 × 1200", "1.44 MP", "4 × 4 in"],
              ["2400 × 2400", "5.76 MP", "8 × 8 in"],
            ].map(([size, pixels, inches]) => <tr key={size} className="border-b border-white/10"><th scope="row" className="py-3 pr-4 font-semibold text-[#e6edf5]">{size}</th><td className="pr-4">{pixels}</td><td>{inches}</td></tr>)}</tbody>
          </table>
        </div>
        <p>For a particular upload, start with the <Link href="/guides/social-media-image-sizes-2026" className={link}>social media dimensions guide</Link> and check the destination&apos;s current instructions. A square source file can still appear inside a circular avatar or a differently shaped preview.</p>

        <h2 id="planner" className={heading}>Calculate padding and crop loss for your photo</h2>
        <SquareSizePlanner />

        <h2 id="source" className={heading}>Choose a size your source can support</h2>
        <p>Consider a 1200 × 800 photo. Fitting it into a 1200 × 1200 canvas at 100% Zoom and 0% Outer Border keeps the photo at 1200 × 800 and adds 200 pixels above and below. The canvas has more pixels, but the photo itself has not gained detail.</p>
        <figure className="my-5 rounded-xl border border-white/10 p-4">
          <svg viewBox="0 0 360 310" role="img" aria-labelledby="square-size-title square-size-description" className="w-full max-w-[360px] mx-auto h-auto">
            <title id="square-size-title">Square image size of 1200 by 1200 pixels with a landscape photo</title>
            <desc id="square-size-description">A 1200 by 800 photo fits inside the square with 200 pixels of padding above and below. The source keeps its dimensions.</desc>
            <rect x="60" y="10" width="240" height="240" fill="#18212c" stroke="#8d9aaa" />
            <rect x="60" y="50" width="240" height="160" fill="#247579" />
            <text x="180" y="35" textAnchor="middle" fill="#e6edf5" fontSize="14">200 px padding</text>
            <text x="180" y="135" textAnchor="middle" fill="#fff" fontSize="17">1200 × 800 photo</text>
            <text x="180" y="235" textAnchor="middle" fill="#e6edf5" fontSize="14">200 px padding</text>
            <text x="180" y="285" textAnchor="middle" fill="#e6edf5" fontSize="16">1200 × 1200 square canvas</text>
          </svg>
          <figcaption className="text-sm mt-3">Calculated fit example. Padding changes the canvas size while retaining the full scene.</figcaption>
        </figure>
        <p>A centered square crop of the same source keeps only an 800 × 800 region. Exporting that crop at 1200 × 1200 enlarges the retained region by 1.5x. This is why choosing a large square export can soften a cropped photo even when the original width looks sufficient.</p>
        <p className="mt-3">Check both source dimensions in the <Link href="/image-size-calculator" className={link}>image size calculator</Link>. For fit mode, compare your target edge with the longer source edge. For an edge-to-edge square crop, compare it with the shorter source edge. Extra border and zoom change how much of the canvas the photo occupies.</p>

        <h2 id="print" className={heading}>Convert square pixels to print inches</h2>
        <p>Print edge in inches equals pixel edge divided by pixels per inch. A 1200-pixel square is 4 inches at 300 PPI or 6 inches at 200 PPI. These are calculations, not a promise that either print will look sharp. Ask your print provider which resolution, file format and margins it needs.</p>
        <p className="mt-3">Adobe&apos;s <a href="https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/printed-image-resolution.html" className={link}>printed image resolution guide</a> explains how PPI relates pixels to physical size. If your target print needs more pixels, follow the <Link href="/guides/how-to-enlarge-a-photo" className={link}>photo enlargement guide</Link> before ordering.</p>

        <h2 id="export" className={heading}>Export the exact square size in SquarePic</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Open the <Link href="/" className={link}>square image maker</Link> and select the original image.</li>
          <li>Choose Solid, Blur or Transparent to keep the full photo. Choose Crop if you want a centered square cutout.</li>
          <li>In Square size, choose 1080 × 1080 or 1200 × 1200, or apply a custom edge from 1 to 4096 pixels. Check the displayed output dimensions.</li>
          <li>Keep Zoom at 100% to start. Check the edges, choose an export format and download the file.</li>
        </ol>
        <p className="mt-3">For detailed framing instructions, see <Link href="/guides/make-image-square-without-cropping" className={link}>how to make an image square without cropping</Link>. Original size uses the longer source dimension, capped at 4096 pixels. A larger original can therefore produce a smaller export.</p>

        <h2 id="questions" className={heading}>Common size questions</h2>
        <h3 className="font-bold text-[#e6edf5] mt-4 mb-2">Is 1080 × 1080 the same as 1:1?</h3>
        <p>1080 × 1080 is one pixel size with a 1:1 ratio. The ratio describes shape; the dimensions describe the number of pixels on each edge.</p>
        <h3 className="font-bold text-[#e6edf5] mt-4 mb-2">Does a square image have a fixed file size?</h3>
        <p>No. Two 1080-pixel squares can have different byte sizes because their content, formats and compression differ. Choose dimensions first, then use the <Link href="/compressor" className={link}>image compressor</Link> if you need to meet a file-size limit.</p>
        <h3 className="font-bold text-[#e6edf5] mt-4 mb-2">Should I choose 1080 or 1200 pixels?</h3>
        <p>Use the dimensions requested by your destination. A 1200-pixel square has about 23% more pixels than a 1080-pixel square, but enlarging a small photo to reach it adds no captured detail. The planner above shows whether your chosen edge enlarges the photo or its cropped region.</p>
        <p className="mt-6 text-sm">Calculation method: the fit scale uses the longer source edge; the centered crop uses the shorter edge. These match SquarePic&apos;s framing behavior at the stated settings. Print sizes use pixels divided by PPI. Reviewed October 9, 2026.</p>
        <Link href="/" className="inline-flex min-h-11 items-center mt-8 px-5 py-3 rounded-md bg-[var(--accent)] text-black font-bold">Choose your square size</Link>
      </article>
    </>
  );
}
