import { PlatformTitle } from "@/components/platform-icon";
import Link from "next/link";
import { GUIDES } from "@/data/guides";

const RELATED: Record<string, string[]> = {
  "square-image-size": ["make-image-square-without-cropping", "how-to-enlarge-a-photo"],
  "how-to-enlarge-a-photo": ["square-image-size", "make-image-square-without-cropping"],
  "make-image-square-without-cropping": ["square-image-size", "how-to-enlarge-a-photo"],
  "instagram-feed-sizes-2026": ["instagram-reels-stories-guide", "facebook-image-sizes-2026", "pinterest-image-sizes-2026"],
  "instagram-reels-stories-guide": ["instagram-feed-sizes-2026", "tiktok-image-sizes-2026"],
  "linkedin-image-sizes-2026": ["facebook-image-sizes-2026", "discord-image-sizes-2026", "youtube-banner-thumbnail-sizes-2026"],
  "youtube-banner-thumbnail-sizes-2026": ["tiktok-image-sizes-2026", "linkedin-image-sizes-2026", "discord-image-sizes-2026"],
  "tiktok-image-sizes-2026": ["instagram-reels-stories-guide", "youtube-banner-thumbnail-sizes-2026", "pinterest-image-sizes-2026"],
  "facebook-image-sizes-2026": ["instagram-feed-sizes-2026", "linkedin-image-sizes-2026", "pinterest-image-sizes-2026"],
  "pinterest-image-sizes-2026": ["instagram-feed-sizes-2026", "facebook-image-sizes-2026", "tiktok-image-sizes-2026"],
  "discord-image-sizes-2026": ["youtube-banner-thumbnail-sizes-2026", "linkedin-image-sizes-2026"],
};

export function RelatedGuides({ current }: { current: string }) {
  const is2027 = current.endsWith("-2027");
  const key = is2027 ? current.replace(/-2027$/, "-2026") : current;
  const paths = RELATED[key];
  if (!paths) return null;
  const related = paths.flatMap((slug) => {
    const path = `/guides/${is2027 ? slug.replace(/-2026$/, "-2027") : slug}`;
    const guide = GUIDES.find((item) => item.path === path);
    return guide ? [guide] : [];
  });
  const social = key.endsWith("-2026") || key === "instagram-reels-stories-guide";
  const year = is2027 ? 2027 : 2026;

  return (
    <>
      {social && <p className="mt-6 text-base text-[#8d9aaa] leading-relaxed">
        Preparing artwork for more than one platform? Compare these dimensions with the{" "}
        <Link href={`/guides/social-media-image-sizes-${year}`} className="text-[var(--accent)] underline">{year} social media image sizes and PDF cheat sheet</Link>.
        {key === "instagram-reels-stories-guide" && <> For next year&apos;s artwork, use the{" "}<Link href="/guides/social-media-image-sizes-2027" className="text-[var(--accent)] underline">2027 planning reference</Link>.</>}
      </p>}
      <section aria-label="Related guides" className="border-t border-[rgba(255,255,255,0.06)] pt-8 mt-8">
        <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mb-4">Related guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {related.map((guide) => (
            <Link key={guide.path} href={guide.path} className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5">
              <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors"><PlatformTitle title={guide.title} /></h3>
              <p className="text-[0.875rem] text-[#8d9aaa] leading-relaxed m-0">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
