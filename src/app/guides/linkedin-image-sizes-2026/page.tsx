import { TableOfContents } from "@/components/guides/table-of-contents";
import { PlatformIcon } from "@/components/platform-icon";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { RelatedGuides } from "@/components/guides/related-guides";
import { SITE_URL as SITE } from "@/lib/constants";
const PATH = "/guides/linkedin-image-sizes-2026";
const TITLE = "LinkedIn Image Sizes 2026: Posts, Banners & Profiles";
export const metadata = pageMetadata({ title: "LinkedIn Image Sizes: Posts, Banners & Profiles", description: "Find LinkedIn post, profile and banner image sizes. Compare personal covers and company Pages, check aspect ratios and follow official image specifications.", path: PATH, image: "/og/og-linkedin-image-sizes.png", article: true, publishedTime: "2026-07-19" });
export default function LinkedInGuide() {
 return <>
  <BreadcrumbSchema items={[{name:"Home",url:SITE},{name:"Guides",url:`${SITE}/guides`},{name:"LinkedIn image sizes",url:`${SITE}${PATH}`}]} />
  <ArticleSchema title={TITLE} description="Find LinkedIn post, profile and banner image sizes. Compare personal covers and company Pages, check aspect ratios and follow official image specifications." url={`${SITE}${PATH}`} imageUrl={`${SITE}/og/og-linkedin-image-sizes.png`} datePublished="2026-07-19" dateModified="2026-10-08" authorName="SevenOneLabs" authorUrl={`${SITE}/author/sevenonelabs`} />
  <article className="max-w-[680px] w-full mx-auto px-4 py-8 text-[#8d9aaa] leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#e6edf5] [&_h2]:mt-8 [&_h2]:mb-3 [&_a]:text-[var(--accent)] [&_a]:underline">
        <Link href="/guides" className="inline-flex min-h-11 items-center mb-4 text-base font-semibold text-[var(--accent)] hover:underline">&larr; All guides</Link>
   <h1 className="text-3xl font-extrabold tracking-tight text-[#e6edf5] mb-4"><PlatformIcon platform="linkedin" />{" "}{TITLE}</h1>
   <p className="text-sm mb-5">Official references checked October 8, 2026. By <Link href="/author/sevenonelabs">SevenOneLabs</Link>. Review method: compare LinkedIn Help with the editor&apos;s preset dimensions and decoded downloads. Check the destination preview separately.</p>
   <p>A personal cover and a company Page cover use different shapes. Choose the matching preset in the <Link href="/resize/linkedin">LinkedIn image resizer</Link> before adding your photo.</p>
        <TableOfContents items={[
  {
    "id": "official-recommendations-and-limits",
    "label": "Official recommendations and limits",
    "level": 2
  },
  {
    "id": "working-presets-in-squarepic",
    "label": "Working presets in SquarePic",
    "level": 2
  },
  {
    "id": "fit-a-landscape-photo-without-stretching",
    "label": "Fit a landscape photo without stretching",
    "level": 2
  },
  {
    "id": "download-and-check-the-destination",
    "label": "Download and check the destination",
    "level": 2
  }
]} />
   <h2 id="official-recommendations-and-limits">Official recommendations and limits</h2>
   <p>LinkedIn recommends 1584 x 396 for a personal cover, uploaded as JPG or PNG below 8 MB. Its <a href="https://www.linkedin.com/help/linkedin/answer/a568217/">profile-cover help</a> also warns that the visible area changes with the browser window.</p>
   <p className="mt-3">The <a href="https://www.linkedin.com/help/linkedin/answer/a563309/">Pages specifications</a> now recommend a 1512 x 256 company cover and a 400 x 400 logo, with PNG or JPEG files up to 3 MB. For a Page post containing a URL and custom image, that reference suggests 1200 x 627. It does not establish one required size for every image-only post.</p>
   <h2 id="working-presets-in-squarepic">Working presets in SquarePic</h2>
   <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead><tr><th className="p-2">Preset</th><th className="p-2">Canvas</th><th className="p-2">Purpose</th></tr></thead><tbody>
    <tr><th className="p-2"><Link href="/resize/linkedin?preset=personalCover#resizer">Personal Profile Cover</Link></th><td className="p-2">1584 x 396</td><td className="p-2">4:1 cover artwork</td></tr>
    <tr><th className="p-2"><Link href="/resize/linkedin?preset=cover#resizer">Company Page Cover</Link></th><td className="p-2">1512 x 256</td><td className="p-2">Current company cover recommendation</td></tr>
    <tr><th className="p-2"><Link href="/resize/linkedin?preset=landscape#resizer">Landscape Post</Link></th><td className="p-2">1200 x 627</td><td className="p-2">Custom link artwork, exact ratio 400:209</td></tr>
    <tr><th className="p-2"><Link href="/resize/linkedin?preset=square#resizer">Square Post</Link></th><td className="p-2">1200 x 1200</td><td className="p-2">Our square working canvas</td></tr>
   </tbody></table></div>
   <h2 id="fit-a-landscape-photo-without-stretching">Fit a landscape photo without stretching</h2>
   <p>For a 1200 x 800 source and a 1200 x 627 destination, fitting the whole photo gives approximately 941 x 627 photo pixels with background at either side. A centered Crop fills the canvas by removing about 87 rows from the top and bottom. Choose Solid or Blur to retain the whole photo, keep Zoom at 100%, and inspect the export dimensions.</p>
   <p className="mt-3">A company cover is much wider. Keep the main message central, away from edges and the lower-right area, then check LinkedIn on a narrow screen. The preview can trim artwork even when the exported canvas is correct.</p>
   <h2 id="download-and-check-the-destination">Download and check the destination</h2>
   <ol className="list-decimal pl-5 space-y-2"><li>Open the resizer and select the intended cover or post preset.</li><li>Choose Solid or Blur to fit, or Crop if losing the edges is acceptable.</li><li>Export JPEG for photographs or PNG for sharp graphic edges. Use the <Link href="/compressor">compressor</Link> if the file exceeds the applicable upload limit.</li><li>Inspect the actual LinkedIn upload preview, including any profile-photo overlap.</li></ol>
   <p className="mt-4">SquarePic prepares still images. It does not create video or recover missing photo detail. Keep an original copy for later edits.</p>
   <RelatedGuides current="linkedin-image-sizes-2026" />
  </article>
 </>;
}
