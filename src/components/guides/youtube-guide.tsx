import Link from "next/link";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { GuideEditions } from "@/components/guides/guide-editions";
import { PlatformReference } from "@/components/guides/platform-reference";
import { RelatedGuides } from "@/components/guides/related-guides";
import { ShareButtons } from "@/components/guides/share-buttons";
import reference from "@/data/social-image-reference.json";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { edition2027ForPath } from "@/lib/guide-editions";

const slug = "youtube-banner-thumbnail-sizes";
const previewImage = (year: 2026 | 2027) => year === 2027 ? edition2027ForPath(`/guides/${slug}-2027`).image : "/og/og-youtube-banner-thumbnail.png";
export function youtubeGuideMetadata(year: 2026 | 2027) {
  return pageMetadata({ title: `YouTube Banner & Thumbnail Sizes ${year}`, description: `YouTube image sizes for ${year}. Check current thumbnail and banner recommendations, safe areas and upload limits against YouTube Help.`, path: `/guides/${slug}-${year}`, image: previewImage(year), article: true, publishedTime: year === 2026 ? "2026-07-19" : reference.updated, modifiedTime: reference.updated });
}

export function YouTubeGuide({ year }: { year: 2026 | 2027 }) {
  const title = `YouTube Banner & Thumbnail Sizes ${year}: Channel Art`;
  const path = `/guides/${slug}-${year}`;
  const link = "text-[var(--accent)] underline";
  return <>
    <BreadcrumbSchema items={[{ name: "Home", url: SITE_URL }, { name: "Guides", url: `${SITE_URL}/guides` }, { name: title, url: `${SITE_URL}${path}` }]} />
    <ArticleSchema title={title} description="YouTube thumbnail and banner dimensions, safe areas and upload limits with official sources." url={`${SITE_URL}${path}`} imageUrl={`${SITE_URL}${previewImage(year)}`} datePublished={year === 2026 ? "2026-07-19" : reference.updated} dateModified={reference.updated} authorName="SevenOneLabs" authorUrl={`${SITE_URL}/author/sevenonelabs`} />
    <article className="max-w-[800px] w-full mx-auto px-4 py-8 text-[#abb8c7] leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#e6edf5] [&_h2]:mt-8 [&_h2]:mb-3">
      <Link href="/guides" className={`${link} inline-flex min-h-11 items-center mb-4`}>&larr; All guides</Link>
      <h1 className="text-3xl font-extrabold text-[#e6edf5] mb-4">{title}</h1>
      <p>Updated <time dateTime={reference.updated}>October 9, 2026</time> · By <Link href="/author/sevenonelabs" className={link}>SevenOneLabs</Link></p>
      <GuideEditions slug={slug} year={year} />
      <p>Use a different export for your channel banner and each video thumbnail. YouTube&apos;s current thumbnail recommendation is larger than the older 1280 x 720 preset still found in many guides.</p>
      <h2>YouTube image sizes at a glance</h2>
      <PlatformReference platform={reference.platforms.find((platform) => platform.id === "youtube")!} />
      <h2>Channel banner and safe area</h2>
      <p>Prepare a 2560 x 1440 banner. YouTube allows a minimum 2048 x 1152 upload and a file up to 6 MB. At that minimum size, the safe area for text and logos is 1235 x 338. Scaling that area to a 2560-pixel canvas gives approximately 1544 x 423, but the uploader preview is the final check. The safe area is part of the banner, not a separate cover image.</p>
      <p className="mt-3">Keep your channel name and logo centered. Use the outer area for background artwork because phones, desktop windows and TVs show different crops. Check every device preview before saving.</p>
      <h2>Video thumbnails and upload limits</h2>
      <p>YouTube Help recommends 3840 x 2160 for video thumbnails at 16:9. The minimum width is 640 pixels. JPG and PNG are listed formats. Current limits depend on the upload device: mobile video thumbnails must be under 2 MB, while desktop video, Shorts and podcast thumbnails have a 50 MB limit. Mobile podcast thumbnails have a 10 MB limit.</p>
      <p className="mt-3">Keep the subject and headline readable at a small preview size. The 1280 x 720 editor preset remains a smaller working export; choose custom dimensions to follow the current recommendation. A larger canvas cannot recover detail missing from the original photo.</p>
      <h2>Profile picture and Shorts</h2>
      <p>The channel-branding article says a profile picture renders at 98 x 98 pixels and should be no larger than 15 MB. An 800 x 800 square is a working canvas, not a published minimum. Center the face or logo for the circular crop.</p>
      <p className="mt-3">YouTube&apos;s thumbnail article lists 2160 x 3840 at 9:16 for Shorts artwork. Cover controls and visible crops vary by publishing flow and device. Check YouTube Studio&apos;s current options for your account before preparing a separate cover.</p>
      <h2>Prepare and check your export</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Open the <Link href="/resize/youtube" className={link}>YouTube image resizer</Link> and choose the intended placement.</li>
        <li>Set custom width and height if you need dimensions beyond the preset.</li>
        <li>Use fit with padding to retain the whole image, or crop to fill the frame.</li>
        <li>Export a supported format, then check the file size and the actual upload preview.</li>
      </ol>
      <p className="mt-6"><Link href={`/guides/social-media-image-sizes-${year}`} className={link}>Download the {year} social media image-size cheat sheet</Link> for the platform comparison and source list.</p>
      <ShareButtons path={path} title={title} />
      <RelatedGuides current={`${slug}-${year}`} />
    </article>
  </>;
}
