import { PlatformTitle } from "@/components/platform-icon";
import { TableOfContents } from "@/components/guides/table-of-contents";
import { PlatformIcon } from "@/components/platform-icon";
import { FramingExample } from "@/components/guides/framing-example";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";
import { SITE_URL as SITE } from "@/lib/constants";

const PATH = "/guides/instagram-reels-stories-guide";
const TITLE = "Instagram Reels & Stories Dimensions and Safe Zones";
const heading = "text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3";
const linkStyle = "text-[var(--accent)] hover:underline";

export const metadata = pageMetadata({
  title: "Instagram Reels & Stories Sizes and Safe Zones",
  description: "Compare Instagram Reels and Stories dimensions, 9:16 format and safe-zone checks. Plan 1080x1920 artwork, review cover crops and keep text clear of controls.",
  path: PATH,
  image: "/og/og-instagram-reels-stories.png",
  article: true,
  publishedTime: "2026-07-19",
});

const FAQ_QUESTIONS = [
  { question: "Are Instagram Reels and Stories the same size?", answer: "They can use the same 9:16 canvas. A 1080 × 1920 image is a practical working size for both. Their interface overlays and cover previews differ, so check each placement separately." },
  { question: "Can I use the same image for a Story and a Reel cover?", answer: "You can reuse the source artwork, but make a separate preview check for each placement. A Reel cover may be cropped in a grid or feed preview. A Story may have stickers and reply controls over the image." },
  { question: "Is there one safe zone for every Instagram placement?", answer: "No fixed rectangle guarantees visibility in every organic post, preview, and ad placement. Keep important text near the center, away from interface controls, then check the current preview. For ads, use Meta's placement-specific safe-zone checker." },
  { question: "Does SquarePic resize Reel videos?", answer: "SquarePic prepares still images, such as Story artwork and Reel covers. It exports PNG, JPEG, and WebP images. It does not transcode or resize an MP4 video." },
  { question: "Why does my Reel cover look cropped?", answer: "The full-screen player and grid or feed thumbnails can use different visible areas. Keep the title and main subject near the center, and use Instagram's cover preview to adjust the composition." },
];

export default function InstagramReelsStoriesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Guides", url: `${SITE}/guides` }, { name: "Instagram Reels & Stories", url: `${SITE}${PATH}` }]} />
      <ArticleSchema type="BlogPosting" title={TITLE} description="Compare Instagram Reels and Stories dimensions, 9:16 format and safe-zone checks. Plan 1080x1920 artwork, review cover crops and keep text clear of controls."
        url={`${SITE}${PATH}`} imageUrl={`${SITE}/og/og-instagram-reels-stories.png`} datePublished="2026-07-19" dateModified="2026-10-08"
        authorName="SevenOneLabs" authorUrl={`${SITE}/author/sevenonelabs`} />
      <FAQPageSchema questions={FAQ_QUESTIONS} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8 text-[1rem] text-[#8d9aaa] leading-relaxed">
        <Link href="/guides" className="inline-flex min-h-11 items-center mb-4 text-base font-semibold text-[var(--accent)] hover:underline">&larr; All guides</Link>
        <Link href="/guides" className={linkStyle}>All image guides</Link>
        <h1 className="text-[1.8rem] font-extrabold tracking-tight text-[#e6edf5] mt-3 mb-3"><PlatformIcon platform="instagram" />{" "}{TITLE}</h1>
        <p className="text-[1rem] mb-6">Published July 19, 2026 · Updated October 8, 2026 · By <Link href="/author/sevenonelabs" className={linkStyle}>SevenOneLabs</Link></p>
        <p className="text-[1rem] mb-4">Review method: compare SquarePic&apos;s exported still-image dimensions with its presets and separate artwork advice from platform requirements. Meta&apos;s ad reference required sign-in when checked October 8, 2026; the canvases below are practical recommendations, not verified organic upload limits.</p>
        <TableOfContents items={[
  {
    "id": "are-instagram-reels-and-stories-the-same-size",
    "label": "Are Instagram Reels and Stories the same size?",
    "level": 2
  },
  {
    "id": "dimensions-and-formats-at-a-glance",
    "label": "Dimensions and formats at a glance",
    "level": 2
  },
  {
    "id": "text-safe-zones-for-stories-and-reels",
    "label": "Text safe zones for Stories and Reels",
    "level": 2
  },
  {
    "id": "why-reel-covers-look-different-in-the-profile-grid",
    "label": "Why Reel covers look different in the profile grid",
    "level": 2
  },
  {
    "id": "prepare-a-still-image-at-1080-1920",
    "label": "Prepare a still image at 1080 × 1920",
    "level": 2
  },
  {
    "id": "common-sizing-mistakes",
    "label": "Common sizing mistakes",
    "level": 2
  },
  {
    "id": "frequently-asked-questions",
    "label": "Frequently asked questions",
    "level": 2
  }
]} />
        <h2 className={heading} id="are-instagram-reels-and-stories-the-same-size"><PlatformTitle title={"Are Instagram Reels and Stories the same size?"} /></h2>
        <p><strong className="text-[#e6edf5]">Yes, they can use the same 9:16 canvas.</strong> A 1080 × 1920 image is a practical starting size for vertical artwork in both formats. Matching dimensions do not guarantee the same visible area: account controls, captions, stickers, and cover previews can cover or crop different parts of the design.</p>
        <p className="mt-3">This guide covers still Story images and Reel cover artwork. SquarePic exports images, not edited video files. For the feed, use the separate <Link href="/guides/instagram-feed-sizes-2026" className={linkStyle}>Instagram feed dimensions guide</Link>.</p>
        <h2 className={heading} id="dimensions-and-formats-at-a-glance">Dimensions and formats at a glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[1rem] border-collapse">
            <caption className="text-left mb-2">Working canvases for preparing images in SquarePic</caption>
            <thead><tr className="border-b border-white/10"><th scope="col" className="text-left py-2 pr-3">Placement</th><th scope="col" className="text-left py-2 pr-3">Canvas</th><th scope="col" className="text-left py-2">Check before publishing</th></tr></thead>
            <tbody>
              <tr className="border-b border-white/10"><th scope="row" className="text-left py-3 pr-3">Story image</th><td className="pr-3">1080 × 1920, 9:16</td><td>Stickers, account row, reply area</td></tr>
              <tr className="border-b border-white/10"><th scope="row" className="text-left py-3 pr-3">Reel cover artwork</th><td className="pr-3">1080 × 1920, 9:16</td><td>Full-screen cover and grid crop</td></tr>
              <tr><th scope="row" className="text-left py-3 pr-3">Square feed artwork</th><td className="pr-3">1080 × 1080, 1:1</td><td>Feed and profile-grid previews</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">1080 ÷ 1920 simplifies to 9:16. A smaller 720 × 1280 image has the same proportions but fewer pixels. Use the <Link href="/image-size-calculator" className={linkStyle}>aspect ratio calculator</Link> to check your source before resizing it.</p>
        <h2 className={heading} id="text-safe-zones-for-stories-and-reels">Text safe zones for Stories and Reels</h2>
        <p>A safe zone is the part of the image where your subject, logo, or text stays clear of interface overlays. Treat it as a preview task rather than one permanent set of pixel margins. Organic Stories, Reels, and ads can have different controls, and a long caption or added sticker changes the space available.</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Keep the main message close to the center of the frame, rather than against an edge.</li>
          <li>Leave room above it for the account row and below it for captions, reply controls, or a call to action.</li>
          <li>In Reels, check the right side where interaction controls may overlap the picture.</li>
          <li>Add the actual stickers and caption before checking your Story preview. An empty template does not show every overlay.</li>
          <li>For an ad, inspect the selected placement in Ads Manager and use Meta&apos;s current safe-zone checker. Do not assume an organic preview matches an ad.</li>
        </ul>
        <p className="mt-4">Consult Meta&apos;s <a href="https://www.facebook.com/business/ads/facebook-instagram-reels-ads" className={linkStyle}>Reels ad guidance</a> and the current Ads Manager preview for advertising requirements. The reference can require sign-in. The 1080 × 1920 canvas here is a working recommendation; this guide does not assert universal organic or video upload limits.</p>
        <FramingExample vertical />
        <h2 className={heading} id="why-reel-covers-look-different-in-the-profile-grid">Why Reel covers look different in the profile grid</h2>
        <p>A vertical cover contains more height than a shorter grid thumbnail can show. Put the title, face, and logo in a central area that still reads when the top and bottom are removed. Preview the cover in Instagram&apos;s current grid view before posting; do not rely on a fixed square thumbnail specification.</p>
        <p className="mt-3">If a square version is also needed elsewhere, create it separately. Our <Link href="/guides/make-image-square-without-cropping" className={linkStyle}>square-photo tutorial</Link> explains how padding preserves the whole picture and how cropping changes the visible area.</p>
        <h2 className={heading} id="prepare-a-still-image-at-1080-1920">Prepare a still image at 1080 × 1920</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Open the <Link href="/resize/instagram?preset=stories#resizer" className={linkStyle}>1080 × 1920 Stories/Reels editor</Link>. The vertical preset is already selected.</li>
          <li>Select your source image and confirm the 1080 × 1920 export dimensions.</li>
          <li>Use Blur or Solid to fit a landscape photo into the vertical frame. Keep Zoom at 100% to preserve its edges. Use Crop only if trimming the picture is acceptable.</li>
          <li>Choose JPEG for photographs or PNG for artwork with sharp text. Export and inspect the image in Instagram with the intended caption and stickers.</li>
        </ol>
        <p className="mt-4">A still image does not become a video because it has Reel dimensions. Use a video editor for timing, audio, captions, and video export. Video upload limits can vary by publishing method; check the current upload screen rather than a universal file-size or duration claim.</p>
        <h2 className={heading} id="common-sizing-mistakes">Common sizing mistakes</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-[#e6edf5]">Stretching a landscape photo:</strong> this distorts faces and objects. Fit it with background or deliberately crop it instead.</li>
          <li><strong className="text-[#e6edf5]">Checking only the full-screen view:</strong> the cover can still lose its title in the grid.</li>
          <li><strong className="text-[#e6edf5]">Repeated JPEG exports:</strong> use the original photo and save the final version once where possible.</li>
          <li><strong className="text-[#e6edf5]">Assuming 9:16 means enough detail:</strong> dimensions describe shape and pixel count, not sharpness. Enlarging a small photo cannot restore missing detail.</li>
        </ul>
        <h2 className={heading} id="frequently-asked-questions">Frequently asked questions</h2>
        <div className="space-y-5">{FAQ_QUESTIONS.map((q) => <div key={q.question}><h3 className="font-extrabold text-[#e6edf5] mb-1">{q.question}</h3><p>{q.answer}</p></div>)}</div>
        <div className="mt-8"><ShareButtons path={PATH} title={TITLE} /></div>
        <RelatedGuides current="instagram-reels-stories-guide" />
      </article>
    </>
  );
}
