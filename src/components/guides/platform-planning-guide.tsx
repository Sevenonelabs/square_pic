import Link from "next/link";
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema-scripts";
import { GuideEditions } from "@/components/guides/guide-editions";
import { PlatformReference } from "@/components/guides/platform-reference";
import { RelatedGuides } from "@/components/guides/related-guides";
import reference from "@/data/social-image-reference.json";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { edition2027ForPath } from "@/lib/guide-editions";

const PLANNING = {
  facebook: {
    sections: [
      { title: "Choose the placement before resizing", text: "A Page cover, a feed post, an event image and a Story are separate placements. The table gives working canvases for the most common exports. Facebook Help required sign-in during this review, so we have not confirmed current upload minimums or file-size limits. Open the linked documentation and check the uploader for your Page before preparing a campaign." },
      { title: "Prepare a cover that survives mobile crops", text: "Start with a wide composition. Keep the logo, face and short headline near the center, with background space around them. Preview the cover with the profile picture visible, then inspect it on a phone. Do not assume that the full exported rectangle will appear on every screen." },
      { title: "Create separate feed and Story exports", text: "Use the square canvas for a square feed composition and the vertical 9:16 canvas for Story artwork. Reposition text and faces for each version. Stretching the same image into a different ratio distorts the subject. Use fit with padding to retain the whole photo, or crop deliberately when the edges can be removed." },
      { title: "Check ads in Ads Manager", text: "Organic-post canvases do not establish ad requirements. Select the exact ad placement in Ads Manager, check its current specifications and inspect every generated preview. Keep an editable original so a different crop or placement can be exported without rebuilding the design." },
    ],
  },
  pinterest: {
    sections: [
      { title: "Use 2:3 for a standard image Pin", text: "Pinterest's standard image ad specification recommends 1000 x 1500 pixels at 2:3. This gives you a practical starting canvas for a static Pin. The documentation warns that taller images can be cut off in feeds. Keep the product, headline and branding inside the visible composition." },
      { title: "Keep the headline readable in the feed", text: "Preview the Pin at phone width before exporting. Use a short headline with enough contrast against the image, and keep essential details away from the edges. A headline that only works at full resolution will be hard to read when Pinterest reduces the preview." },
      { title: "Treat covers and other ad formats separately", text: "The standard Pin recommendation does not establish a board-cover or profile-photo requirement. We did not confirm those upload dimensions in the linked specification. Use the actual profile or board editor to check its crop. Carousel, collection and video formats also have their own specifications." },
      { title: "Prepare reusable artwork for 2027", text: "Keep the source photo and text editable. Make the standard 2:3 export first, then create separate compositions for any additional formats. Recheck Pinterest's linked specification when scheduling a campaign because the 2027 edition uses documentation available in October 2026." },
    ],
  },
  tiktok: {
    sections: [
      { title: "Separate organic artwork from ad specifications", text: "TikTok for Business documents horizontal 1200 x 628, square 640 x 640 and vertical 720 x 1280 images for Standard Carousel ads. Those sizes apply to that ad product. They do not prove that every organic photo post, profile image or video cover needs the same dimensions." },
      { title: "Use a vertical canvas for full-screen artwork", text: "The 1080 x 1920 canvas is a 9:16 working size for vertical artwork. Position the face, product and short headline away from app controls and captions. Check the actual posting preview because controls, visible crops and cover displays can vary by device and publishing flow." },
      { title: "Prepare a consistent carousel", text: "Choose the intended placement before making the slides. Use one composition style and leave enough room around the subject on every image. For Standard Carousel ads, TikTok's linked specification lists JPG or PNG images, 2 to 35 images and a suggested file size of 100 KB or less. Review the current music and campaign requirements separately." },
      { title: "Check profiles and covers in the app", text: "Profile pictures and video-cover previews are separate from carousel ad images. A 200 x 200 profile export is a SquarePic working preset, not a minimum verified by the carousel documentation. Center the subject and check the circular crop at a small display size." },
    ],
  },
} as const;

export type PlanningPlatform = keyof typeof PLANNING;

export function platformPlanningMetadata(id: PlanningPlatform) {
  const page = edition2027ForPath(`/guides/${id}-image-sizes-2027`);
  return pageMetadata({ title: page.title, description: page.description, path: `/guides/${id}-image-sizes-2027`, image: page.image, article: true, publishedTime: reference.updated, modifiedTime: reference.updated });
}

export function PlatformPlanningGuide({ id }: { id: PlanningPlatform }) {
  const page = { ...PLANNING[id], ...edition2027ForPath(`/guides/${id}-image-sizes-2027`) };
  const platform = reference.platforms.find((item) => item.id === id)!;
  const slug = `${id}-image-sizes`;
  const path = `/guides/${slug}-2027`;
  const link = "text-[var(--accent)] underline";
  return <>
    <BreadcrumbSchema items={[{ name: "Home", url: SITE_URL }, { name: "Guides", url: `${SITE_URL}/guides` }, { name: page.title, url: `${SITE_URL}${path}` }]} />
    <ArticleSchema title={page.title} description={page.description} url={`${SITE_URL}${path}`} imageUrl={`${SITE_URL}${page.image}`} datePublished={reference.updated} dateModified={reference.updated} authorName="SevenOneLabs" authorUrl={`${SITE_URL}/author/sevenonelabs`} />
    <article className="max-w-[800px] w-full mx-auto px-4 py-8 text-[#abb8c7] leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#e6edf5] [&_h2]:mt-8 [&_h2]:mb-3">
      <Link href="/guides" className={`${link} inline-flex min-h-11 items-center mb-4`}>&larr; All guides</Link>
      <h1 className="text-3xl font-extrabold text-[#e6edf5] mb-4">{page.title}</h1>
      <p>Published and updated <time dateTime={reference.updated}>October 9, 2026</time> · By <Link href="/author/sevenonelabs" className={link}>SevenOneLabs</Link></p>
      <GuideEditions slug={slug} year={2027} />
      <p>{page.description}</p>
      <h2>{platform.name} image sizes for 2027 planning</h2>
      <PlatformReference platform={platform} />
      {page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
      <h2>Resize and check the download</h2>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Open the <Link href={`/resize/${platform.tool}`} className={link}>{platform.name} image resizer</Link> and choose the target placement.</li>
        <li>Use a preset for a working canvas, or set custom dimensions to match the current platform specification.</li>
        <li>Choose fit with padding to keep the whole photo, or crop to fill the frame.</li>
        <li>Export a supported format, check the file dimensions and inspect the destination&apos;s upload preview.</li>
      </ol>
      <p className="mt-6"><Link href="/guides/social-media-image-sizes-2027" className={link}>Download the 2027 social media image-size cheat sheet</Link> for a printable reference with source URLs and the update date.</p>
      <RelatedGuides current={`${slug}-2027`} />
    </article>
  </>;
}
