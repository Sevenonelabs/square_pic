import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions",
  description: "Complete guide to LinkedIn image dimensions for 2026. Profile pictures, banner/cover photos, post sizes, carousel specs, and company page image requirements.",
  openGraph: { title: "LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions | SquarePic", description: "Complete guide to LinkedIn image dimensions for 2026. Profile pictures, banner/cover photos, post sizes, carousel specs, and company page image requirements.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/linkedin-image-sizes-2026" },
  twitter: { card: "summary_large_image", title: "LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions | SquarePic", description: "Complete guide to LinkedIn image dimensions for 2026." },
};

const SITE = "https://www.squarepic.io";

export default function LinkedInImageSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "LinkedIn Image Sizes 2026", url: `${SITE}/guides/linkedin-image-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions"
        description="Complete guide to LinkedIn image dimensions for 2026. Profile pictures, banner/cover photos, post sizes, carousel specs, and company page image requirements."
        url={`${SITE}/guides/linkedin-image-sizes-2026`}
        imageUrl={`${SITE}/squareframe_preview.png`}
        datePublished="2026-07-19"
        dateModified="2026-07-19"
        authorName="SevenOneLabs"
        authorUrl="https://github.com/Sevenonelabs"
      />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
            LinkedIn
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 8 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/linkedin-image-sizes-2026" title="LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          LinkedIn processes over 9 billion content impressions in the feed each week. Using the correct image dimensions makes your profile look polished and your posts perform better. Wrong sizes result in cropped banners, pixelated profile photos, and awkwardly framed shared links. This guide covers every LinkedIn image format with exact dimensions updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Image Sizes at a Glance</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Image Type</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Aspect Ratio</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">400 x 400</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">8 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Personal Banner</td>
                <td className="text-[#8d9aaa] py-2 px-3">1584 x 396</td>
                <td className="text-[#8d9aaa] py-2 px-3">4:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">8 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Company Cover</td>
                <td className="text-[#8d9aaa] py-2 px-3">1128 x 191</td>
                <td className="text-[#8d9aaa] py-2 px-3">5.9:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">8 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Landscape Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1200 x 627</td>
                <td className="text-[#8d9aaa] py-2 px-3">1.91:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">20 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Square Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1200 x 1200</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">20 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Portrait Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">720 x 900</td>
                <td className="text-[#8d9aaa] py-2 px-3">4:5</td>
                <td className="text-[#8d9aaa] py-2 pl-3">20 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Carousel (Document)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">100 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Link Preview</td>
                <td className="text-[#8d9aaa] py-2 px-3">1200 x 627</td>
                <td className="text-[#8d9aaa] py-2 px-3">1.91:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">—</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Company Logo</td>
                <td className="text-[#8d9aaa] py-2 px-3">300 x 300</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">4 MB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Profile Picture</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your profile photo appears at up to 400 x 400 pixels on desktop profiles and is cropped to a circle. At smaller sizes — comments at 40 x 40, search results at 60 x 60 — detail becomes critical. Upload a minimum of 400 x 400 at 1:1 aspect ratio. LinkedIn displays it as a circle, so center your face or subject within the frame. Anything near the edges will be invisible. Use a high-contrast background and avoid busy patterns that become noise at thumbnail size.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Personal Banner (Background Photo)</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The personal banner displays at 1584 x 396 pixels (4:1 aspect ratio) on desktop. Unlike the company page cover, the personal banner is a single fixed crop with no mobile cut-off variation across devices. The banner sits behind your profile photo, so the left third is partially obscured on desktop. Keep important visual elements — taglines, logos, or graphics — in the right two-thirds of the frame.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Recommended format is JPEG at 90% quality. PNG works for graphics with text, but keep file size under 8 MB. The banner aspect ratio is unforgiving — a 4:1 frame means most standard photos need significant cropping. Design a custom banner rather than trying to fit a landscape photo.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Company Page Cover Image</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Company page cover images display at 1128 x 191 pixels. This 5.9:1 aspect ratio is extremely wide and leaves little vertical room for messaging. The cover appears behind the company logo and name, so the left portion is partially covered. Place critical branding and calls-to-action in the center-right area. On mobile, the visible area is further reduced — roughly the central 80% of the full width. Test your cover on both desktop and mobile before publishing.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Element</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Desktop</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Mobile</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#e6edf5] font-semibold py-2 pr-3">Full cover size</td>
                <td className="text-[#8d9aaa] py-2 px-3">1128 x 191</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1128 x 191</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#e6edf5] font-semibold py-2 pr-3">Safe zone (no overlap)</td>
                <td className="text-[#8d9aaa] py-2 px-3">800 x 191 (center-right)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">600 x 191 (center)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#e6edf5] font-semibold py-2 pr-3">Logo overlap area</td>
                <td className="text-[#8d9aaa] py-2 px-3">Left 300px</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Left 200px</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Feed Post Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          LinkedIn supports three image formats in the feed. Unlike Instagram, portrait images do not get a visibility boost — landscape 1.91:1 is the most common and performs best because it matches the link preview format. Here is how each format behaves in the feed:
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Landscape (1.91:1) — 1200 x 627</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The default LinkedIn post format. Landscape images display at full width in the feed and match the aspect ratio of external link previews. If users share your post outside LinkedIn, the landscape format renders correctly on every platform. Use landscape for article images, charts, infographics, and team photos.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Square (1:1) — 1200 x 1200</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Square images take up the most vertical space in the LinkedIn feed. They are ideal for quote graphics, product shots, and any content where the subject is centered. Square images also perform well when users view profiles — they fill the post preview area without black bars. Use JPEG for photographs and PNG for graphics with text overlays.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Portrait (4:5) — 720 x 900</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Portrait images on LinkedIn are smaller in width than landscape or square at 720 pixels. They display well in the feed but do not expand to full width. Use portrait sparingly — it works best for mobile-optimized content like before-and-after comparisons or tall infographics. Note that LinkedIn compresses portrait images more aggressively than landscape, so start with a clean high-resolution file.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Carousel (Document) Posts</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Carousel posts let you upload a PDF document that LinkedIn converts into a swipeable slide deck. Each slide displays at 1920 x 1080 pixels (16:9). Carousels consistently outperform single-image posts on LinkedIn — they generate 3x more clicks and 5x more direct messages because each swipe requires active engagement. The first slide is your thumbnail in the feed, so make it visually compelling with a clear title.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload a PDF file up to 100 MB with up to 300 pages.</li>
          <li>Design each slide at <strong className="text-[#e6edf5]">1920 x 1080 (16:9)</strong>.</li>
          <li>Keep text large and readable — LinkedIn compresses PDF pages to image files.</li>
          <li>Add your branding consistently across all slides.</li>
          <li>Include a call-to-action on the final slide to drive engagement.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">LinkedIn Link Preview (Open Graph)</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          When you share a URL on LinkedIn, the platform fetches Open Graph meta tags to generate a preview card. The preview image should be 1200 x 627 pixels at 1.91:1. LinkedIn&apos;s crawler caches this image, so if you update the OG image on your page, you may need to use LinkedIn&apos;s Post Inspector tool to refresh it. Include clear text overlays in your OG images — they display prominently in the feed.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Company Page Image Specs</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Company pages have additional image requirements beyond profiles:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li><strong className="text-[#e6edf5]">Company logo:</strong> 300 x 300 pixels minimum. Upload a PNG with a transparent background for the cleanest look on both light and dark mode.</li>
          <li><strong className="text-[#e6edf5]">Cover image:</strong> 1128 x 191 pixels. See the safe zone guide above.</li>
          <li><strong className="text-[#e6edf5]">Life tab images:</strong> 640 x 360 pixels (16:9). These appear in the company Life section and recruitment pages.</li>
          <li><strong className="text-[#e6edf5]">Square logo:</strong> 60 x 60 pixels. This appears in search results and follower feeds.</li>
          <li><strong className="text-[#e6edf5]">Background image:</strong> For company hero banners, use 2984 x 1080 at 2.76:1. Only the center 1128 x 191 is visible without scrolling.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Best Practices for LinkedIn Images</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Use JPEG for photos, PNG for graphics.</strong> LinkedIn compresses all images, but JPEG handles photographic compression better. PNG preserves sharp edges on logos, text, and illustrations.</li>
          <li><strong className="text-[#e6edf5]">Keep file sizes under 8 MB.</strong> LinkedIn rejects images over 8 MB for profile and banner images. Post images can go up to 20 MB, but heavily compressed images look worse than properly sized ones.</li>
          <li><strong className="text-[#e6edf5]">Design for both light and dark mode.</strong> LinkedIn supports dark mode. Test your profile picture, banner, and post images against dark backgrounds. White text on a white background disappears in light mode.</li>
          <li><strong className="text-[#e6edf5]">Add alt text to every post image.</strong> LinkedIn allows custom alt text up to 100 characters. This improves accessibility and helps your content appear in image search results.</li>
          <li><strong className="text-[#e6edf5]">Text should be readable without zooming.</strong> Most LinkedIn browsing happens on mobile. Text in post images should be at least 24px equivalent to remain legible on a phone screen.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common LinkedIn Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Banner text getting cut off.</strong> The most common mistake. Both personal and company banners have text hidden behind the profile photo or logo overlay. Always use the safe zones.</li>
          <li><strong className="text-[#e6edf5]">Pixelated profile photos.</strong> Uploading a small image (under 200 x 200) forces LinkedIn to upscale, resulting in blur. Start with 400 x 400 or larger.</li>
          <li><strong className="text-[#e6edf5]">Wrong aspect ratio for link previews.</strong> LinkedIn generates link previews at 1.91:1. If your OG image is square or portrait, LinkedIn crops it awkwardly with no control over what stays visible.</li>
          <li><strong className="text-[#e6edf5]">Oversized file uploads.</strong> LinkedIn&apos;s uploader silently fails on files exceeding platform limits. Your image appears broken or never publishes. Compress before uploading.</li>
          <li><strong className="text-[#e6edf5]">Ignoring mobile crop.</strong> Company page covers look significantly different on mobile. The visible crop narrows to the center, removing edge content entirely.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with LinkedIn Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to any LinkedIn format directly in your browser. No uploads, no signup, no watermarks. Use the <Link href="/resize/linkedin" className="text-[var(--accent)] no-underline hover:underline">LinkedIn image resizer</Link> to select your target format — profile picture, banner, post, or cover — and download a perfectly sized image in seconds. All processing happens client-side; your images never leave your device.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What is the best LinkedIn profile picture size?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">400 x 400 pixels at 1:1 aspect ratio. LinkedIn displays it as a circle, so keep your face centered within the frame. PNG format for graphics, JPEG for photos.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What size is a LinkedIn banner?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">Personal profile banners display at 1584 x 396 pixels (4:1). Company page cover images are 1128 x 191 (5.9:1). Both have different safe zones for content placement.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What image size works best for LinkedIn posts?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">Landscape 1200 x 627 (1.91:1) is the most common and performs best. Square 1200 x 1200 takes up more feed space. Portrait 720 x 900 is narrower and less impactful.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What format should I use for LinkedIn images?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">JPEG for photographs and complex images. PNG for graphics with text, logos, or transparency. Keep profile and banner images under 8 MB, post images under 20 MB.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">Does LinkedIn compress images?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">Yes. LinkedIn compresses all uploaded images. Starting with a properly sized image at high quality (90% JPEG) minimizes visible compression artifacts. Oversized or low-resolution images look worse after compression.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">Does LinkedIn support dark mode images?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">LinkedIn does not serve different images for dark mode. Design your profile picture and banner to look good on both light and dark backgrounds. Avoid dark text on dark backgrounds.</p>
          </div>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Key Takeaways</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          LinkedIn image dimensions are distinct from other platforms — the wide banners and landscape-favored feed format require specific preparation. Use 1200 x 627 for posts, 400 x 400 for profile photos, and mind the safe zones on banners. Compress your images before uploading to avoid platform compression artifacts. For a complete reference across all platforms, see the <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">social media image sizes cheat sheet</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for LinkedIn?</strong>{" "}
            Use <Link href="/resize/linkedin" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s LinkedIn image resizer</Link> — select your target format and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="linkedin-image-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/resize/linkedin"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Resize Images for LinkedIn Free
          </Link>
        </div>
      </article>
    </>
  );
}
