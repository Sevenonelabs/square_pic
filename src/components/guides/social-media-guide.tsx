import Link from "next/link";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { GuideEditions } from "@/components/guides/guide-editions";
import { PlatformReference } from "@/components/guides/platform-reference";
import { PlatformIcon } from "@/components/platform-icon";
import reference from "@/data/social-image-reference.json";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { edition2027ForPath } from "@/lib/guide-editions";

const previewImage = (year: 2026 | 2027) => year === 2027 ? edition2027ForPath("/guides/social-media-image-sizes-2027").image : "/og/og-social-media-image-sizes.png";

export function socialGuideMetadata(year: 2026 | 2027) {
  return pageMetadata({
    title: `Social Media Image Sizes ${year}: PDF Cheat Sheet`,
    description: `Social media image sizes for ${year} across 13 platforms. Compare source-checked dimensions and working canvases. Download the free PDF cheat sheet.`,
    path: `/guides/social-media-image-sizes-${year}`,
    image: previewImage(year), article: true, modifiedTime: reference.updated,
    publishedTime: year === 2026 ? "2026-07-19" : reference.updated,
  });
}

export function SocialMediaGuide({ year }: { year: 2026 | 2027 }) {
  const title = `Social Media Image Sizes ${year}: Free PDF Cheat Sheet`;
  const path = `/guides/social-media-image-sizes-${year}`;
  const link = "text-[var(--accent)] underline";
  return <>
    <BreadcrumbSchema items={[{ name: "Home", url: SITE_URL }, { name: "Guides", url: `${SITE_URL}/guides` }, { name: `Social media image sizes ${year}`, url: `${SITE_URL}${path}` }]} />
    <ArticleSchema title={title} description={`Image dimensions for 13 platforms with official source links and a downloadable ${year} PDF.`} url={`${SITE_URL}${path}`} imageUrl={`${SITE_URL}${previewImage(year)}`} datePublished={year === 2026 ? "2026-07-19" : reference.updated} dateModified={reference.updated} authorName="SevenOneLabs" authorUrl={`${SITE_URL}/author/sevenonelabs`} />
    <article id="top" className="max-w-[880px] w-full mx-auto px-4 py-8">
      <Link href="/guides" className={`${link} inline-flex min-h-11 items-center mb-4`}>&larr; All guides</Link>
      <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-tight mb-3">{title}</h1>
      <p className="text-sm text-[#abb8c7] mb-5">{year === 2026 ? "Published July 19, 2026" : "Published October 9, 2026"} · Updated <time dateTime={reference.updated}>October 9, 2026</time> · By <Link href="/author/sevenonelabs" className={link}>SevenOneLabs</Link></p>
      <p className="text-base text-[#abb8c7] leading-relaxed">Compare post, profile and banner sizes across 13 social platforms. Each row says whether it comes from platform documentation or is a SquarePic working canvas. All dimensions are in pixels, width first.</p>
      <GuideEditions slug="social-media-image-sizes" year={year} />
      <section aria-labelledby="download-heading" className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 my-8">
        <h2 id="download-heading" className="text-xl font-bold mb-2">Keep the {year} cheat sheet</h2>
        <p className="text-base text-[#abb8c7] mb-4">A six-page printable SquarePic PDF with clear dimension tables, aspect-ratio diagrams, placement notes and clickable platform sources. Squarepic.io and the full guide URL appear on every page. Updated October 9, 2026. Free download, no sign-up.</p>
        <a href={`/downloads/squarepic-social-media-image-sizes-${year}-cheat-sheet.pdf`} download={`squarepic-social-media-image-sizes-${year}-cheat-sheet.pdf`} type="application/pdf" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-3 font-bold text-black hover:opacity-90">Download {year} cheat sheet (PDF)</a>
      </section>
      <section aria-labelledby="review-heading" className="mb-8">
        <h2 id="review-heading" className="text-xl font-bold mb-3">How we checked the sizes</h2>
        <p className="text-base leading-relaxed text-[#abb8c7]">We compared dimensions with the official help and business documentation linked under each platform on October 9, 2026. A recommendation is a suggested upload size; a minimum is a lower bound. Ad specifications apply to the named ad placement. Working canvases are useful export sizes, not platform requirements. Instagram and Facebook Help restricted access during this check, so those rows remain labeled as working canvases.</p>
        {year === 2027 && <p className="text-base leading-relaxed text-[#abb8c7] mt-3">For 2027 campaigns, retain your original artwork and make separate exports for each placement. Start with the sizes below, then recheck the platform source when scheduling a campaign. This edition does not predict unannounced 2027 changes.</p>}
      </section>
      <nav aria-label="Jump to platform" className="flex flex-wrap gap-x-5 gap-y-2 mb-8">{reference.platforms.map((platform) => <a key={platform.id} href={`#${platform.id}`} className={`${link} inline-flex min-h-11 items-center`}>{platform.name}</a>)}</nav>
      {reference.platforms.map((platform) => <section key={platform.id} id={platform.id} className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-2"><PlatformIcon platform={platform.id} /> {platform.name} image sizes</h2>
        <PlatformReference platform={platform} />
        <div className="flex flex-wrap gap-4">
          <Link href={`/resize/${platform.tool}`} className={`${link} inline-flex min-h-11 items-center`}>Resize for {platform.name}</Link>
          {"guide" in platform && <Link href={`/guides/${platform.guide}-${year}`} className={`${link} inline-flex min-h-11 items-center`}>Full {platform.name} guide for {year}</Link>}
        </div>
      </section>)}
      <section className="border-t border-white/10 pt-6 mb-8">
        <h2 className="text-xl font-bold mb-3">Before you publish</h2>
        <ul className="list-disc pl-5 space-y-2 text-base text-[#abb8c7]">
          <li>Preview on desktop and mobile. A correctly sized upload can still be cropped.</li>
          <li>Keep text and faces away from edges, profile-photo overlaps and app controls.</li>
          <li>Use JPEG for photos or PNG for sharp text when the destination accepts it. Check each placement&apos;s file-size limit.</li>
          <li>Some editor presets are working sizes. Use custom dimensions when the source lists a different upload recommendation.</li>
        </ul>
      </section>
      <ShareButtons path={path} title={title} />
    </article>
  </>;
}
