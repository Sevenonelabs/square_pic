import { TableOfContents } from "@/components/guides/table-of-contents";
import { PlatformIcon } from "@/components/platform-icon";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { FramingExample } from "@/components/guides/framing-example";
import { RelatedGuides } from "@/components/guides/related-guides";
import { SITE_URL as SITE } from "@/lib/constants";
const PATH = "/guides/instagram-feed-sizes-2026";
const TITLE = "Instagram Post Sizes 2026: Feed, Carousel & Profile";
export const metadata = pageMetadata({ title: "Instagram Post Sizes: Feed, Carousel & Profile", description: "Compare Instagram feed, carousel and profile sizes with square, portrait and landscape canvases. See fit-versus-crop examples and check placement previews.", path: PATH, image: "/og/og-instagram-feed-sizes.png", article: true, publishedTime: "2026-07-19" });
export default function InstagramGuide() {
 return <>
  <BreadcrumbSchema items={[{name:"Home",url:SITE},{name:"Guides",url:`${SITE}/guides`},{name:"Instagram photo sizes",url:`${SITE}${PATH}`}]} />
  <ArticleSchema title={TITLE} description="Compare Instagram feed, carousel and profile sizes with square, portrait and landscape canvases. See fit-versus-crop examples and check placement previews." url={`${SITE}${PATH}`} imageUrl={`${SITE}/og/og-instagram-feed-sizes.png`} datePublished="2026-07-19" dateModified="2026-10-08" authorName="SevenOneLabs" authorUrl={`${SITE}/author/sevenonelabs`} />
  <article className="max-w-[680px] w-full mx-auto px-4 py-8 text-[#8d9aaa] leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#e6edf5] [&_h2]:mt-8 [&_h2]:mb-3 [&_a]:text-[var(--accent)] [&_a]:underline">
        <Link href="/guides" className="inline-flex min-h-11 items-center mb-4 text-base font-semibold text-[var(--accent)] hover:underline">&larr; All guides</Link>
   <h1 className="text-3xl font-extrabold tracking-tight text-[#e6edf5] mb-4"><PlatformIcon platform="instagram" />{" "}{TITLE}</h1>
   <p className="text-sm mb-5">Updated October 8, 2026. By <Link href="/author/sevenonelabs">SevenOneLabs</Link>. Review method: compare exported image dimensions with SquarePic presets and check fit/crop examples. Instagram&apos;s help reference may require access; these sizes are working canvases.</p>
   <p>A square file and its profile-grid preview can show different parts of a photo. Prepare the canvas you need, then check Instagram&apos;s actual preview before posting. The sizes below are SquarePic working presets, not a claim that Instagram requires or accepts only these sizes.</p>
        <TableOfContents items={[
  {
    "id": "choose-a-working-canvas",
    "label": "Choose a working canvas",
    "level": 2
  },
  {
    "id": "fit-the-whole-photo-or-crop-the-edges",
    "label": "Fit the whole photo or crop the edges",
    "level": 2
  },
  {
    "id": "check-a-carousel-and-profile-preview",
    "label": "Check a carousel and profile preview",
    "level": 2
  },
  {
    "id": "export-once-from-the-original",
    "label": "Export once from the original",
    "level": 2
  }
]} />
   <h2 id="choose-a-working-canvas">Choose a working canvas</h2>
   <ul className="list-disc pl-5 space-y-2"><li><Link href="/resize/instagram?preset=square#resizer">Square Post</Link>: 1080 x 1080, 1:1.</li><li><Link href="/resize/instagram?preset=portrait#resizer">Portrait Post</Link>: 1080 x 1350, 4:5. This preset does not define the maximum supported portrait ratio.</li><li><Link href="/resize/instagram?preset=landscape#resizer">Landscape Post</Link>: 1080 x 566, approximately 1.91:1.</li><li><Link href="/resize/instagram?preset=stories#resizer">Stories/Reels artwork</Link>: 1080 x 1920, 9:16. These are still images, not exported videos.</li><li><Link href="/resize/instagram?preset=profile#resizer">Profile Picture</Link>: 320 x 320 working canvas. Keep the subject central for a circular preview.</li></ul>
   <p className="mt-4">Open the <Link href="/resize/instagram">Instagram image resizer</Link> to use these presets directly. For current upload behavior, consult <a href="https://help.instagram.com/1631821640426723">Instagram&apos;s photo-resolution help</a> and the upload screen. Publishing methods can differ, so preview carousel and feed placement separately.</p>
   <h2 id="fit-the-whole-photo-or-crop-the-edges">Fit the whole photo or crop the edges</h2>
   <FramingExample />
   <p>Choose Solid or Blur and leave Zoom at 100% to retain every edge. Extra padding makes the photo smaller inside the canvas. Crop fills the destination by trimming the source. A 600 x 400 image exported by the square maker becomes a 600 x 600 canvas; the <Link href="/cropper">source-pixel cropper</Link> instead exports only the selected source region.</p>
   <h2 id="check-a-carousel-and-profile-preview">Check a carousel and profile preview</h2>
   <p>Prepare a consistent canvas for related carousel artwork and review every slide. Keep key text away from edges so you can adjust it when the visible preview changes. Use the <Link href="/guides/instagram-reels-stories-guide">Reels and Stories guide</Link> for vertical artwork and sample overlay checks.</p>
   <h2 id="export-once-from-the-original">Export once from the original</h2>
   <p>JPEG is useful for photographs; PNG retains sharp graphic edges and alpha. Instagram may process the upload again. Avoid repeated lossy exports and check that text remains readable after upload. Enlarging a small file adds pixels but cannot recover missing detail.</p>
   <RelatedGuides current="instagram-feed-sizes-2026" />
  </article>
 </>;
}
