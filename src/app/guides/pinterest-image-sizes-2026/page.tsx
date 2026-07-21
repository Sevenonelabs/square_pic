import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide",
  description: "Complete guide to Pinterest image dimensions for 2026. Standard pins, video pins, board covers, and profile picture sizes with best practices for maximum engagement.",
  openGraph: { title: "Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide | SquarePic", description: "Complete guide to Pinterest image dimensions for 2026. Standard pins, video pins, board covers, and profile picture sizes with best practices.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/pinterest-image-sizes-2026" },
  twitter: { card: "summary_large_image", title: "Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide | SquarePic", description: "Complete guide to Pinterest image dimensions for 2026 with best practices." },
};

const SITE = "https://www.squarepic.io";

const FAQ_QUESTIONS = [
  { question: "What is the best pin size for Pinterest?", answer: "1000 x 1500 pixels (2:3 aspect ratio) is the best size for standard Pinterest pins. Tall vertical pins perform significantly better because they take up more screen space in the feed and get 60% more repins than square pins." },
  { question: "What size should a Pinterest board cover be?", answer: "Board covers display at 600 x 600 pixels (1:1 square). Pinterest auto-crops your pins to fill the cover space, so choose a pin with a strong central focal point that won&apos;t lose meaning when cropped to square." },
  { question: "Does Pinterest support video pins?", answer: "Yes. Video pins can be uploaded directly or saved from supported platforms. Use a 16:9 aspect ratio (1920 x 1080) for landscape video or 9:16 (1080 x 1920) for vertical video. Videos autoplay on mute in the feed, so add captions." },
  { question: "What is the maximum file size for Pinterest images?", answer: "Pinterest accepts images up to 20 MB. For video pins, the limit is 2 GB. Compress images to at least 70% quality to balance file size and visual sharpness." },
  { question: "What file format should I use for Pinterest pins?", answer: "JPEG or PNG for static pins. JPEG is best for photos; PNG preserves sharp edges in text-heavy infographics. Pinterest recommends JPEG for standard pins because it loads faster in the feed." },
  { question: "How does Pinterest&apos;s smart crop affect my pin images?", answer: "Pinterest applies smart cropping to pins in the feed, search results, and related pin sections. The algorithm attempts to frame the most visually interesting part of your image, so avoid critical content near the edges." },
];

export default function PinterestImageSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Pinterest Image Sizes 2026", url: `${SITE}/guides/pinterest-image-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide"
        description="Complete guide to Pinterest image dimensions for 2026. Standard pins, video pins, board covers, and profile picture sizes with best practices for maximum engagement."
        url={`${SITE}/guides/pinterest-image-sizes-2026`}
        imageUrl={`${SITE}/squareframe_preview.png`}
        datePublished="2026-07-19"
        dateModified="2026-07-19"
        authorName="SevenOneLabs"
        authorUrl="https://github.com/Sevenonelabs"
      />
      <FAQPageSchema questions={FAQ_QUESTIONS} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
            Pinterest
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 10 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/pinterest-image-sizes-2026" title="Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          Pinterest is a visual discovery engine where image dimensions directly impact visibility and engagement. Tall vertical pins in a 2:3 aspect ratio consistently outperform square or wide formats because they occupy more screen space and attract longer dwell time. This guide covers every Pinterest image format with exact pixel dimensions, aspect ratios, and best practices updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Pinterest Image Sizes at a Glance</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Image Type</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Aspect Ratio</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Standard Pin</td>
                <td className="text-[#8d9aaa] py-2 px-3">1000 x 1500</td>
                <td className="text-[#8d9aaa] py-2 px-3">2:3</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Maximum feed visibility, repins</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Square Pin</td>
                <td className="text-[#8d9aaa] py-2 px-3">1000 x 1000</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Product shots, clean graphics</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Board Cover</td>
                <td className="text-[#8d9aaa] py-2 px-3">600 x 600</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Board thumbnails, categories</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">165 x 165</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Account avatar, brand identity</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Video Pin</td>
                <td className="text-[#8d9aaa] py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Tutorials, product demos</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Standard Pin Dimensions — 1000 x 1500 (2:3)</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The standard pin is Pinterest&apos;s primary format and the one you should use for the majority of your content. At 1000 x 1500 pixels with a 2:3 aspect ratio, these tall vertical pins take up significant vertical space in the feed, making users pause longer before scrolling past. Pinterest&apos;s algorithm favors tall pins because they generate longer view times and higher repin rates.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Use <strong className="text-[#e6edf5]">1000 x 1500 (2:3)</strong> as your default pin size for all new content.</li>
          <li>Tall pins (2:3 and wider) get repinned 60% more than square pins.</li>
          <li>Keep the most important visual information in the top third of the pin — the bottom gets cropped in previews and related pin sections.</li>
          <li>Overlay readable text at 24px minimum size for a clean look at thumbnail scale.</li>
          <li>Avoid clutter — Pinterest&apos;s algorithm prioritizes clean, high-contrast images with a clear focal point.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Square Pins — 1000 x 1000 (1:1)</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Square pins display consistently across all Pinterest surfaces without cropping. They work well for product shots with clean backgrounds, quote graphics, and any image where the subject is naturally centered. While square pins get less vertical space in the feed than standard tall pins, they excel in grid layouts and are less likely to have critical content cropped by Pinterest&apos;s smart crop algorithm.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Use <strong className="text-[#e6edf5]">1000 x 1000 (1:1)</strong> for product pins and simple graphics.</li>
          <li>Square pins are ideal for step-by-step infographics displayed as multiple pins.</li>
          <li>They perform better in search results where Pinterest shows square thumbnails.</li>
          <li>Keep text large and centered — square pins have less room for text overlays than tall pins.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Board Covers — 600 x 600 (1:1)</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Board covers are the thumbnail images that represent each of your boards on your profile. Pinterest auto-crops a pin from your board to fill the cover space, but you can manually set a specific pin as the cover. The cover displays at 600 x 600 pixels in a square format. Choose a pin with a strong central focal point that clearly communicates the board&apos;s theme at a glance.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">600 x 600 pixels minimum</strong> for crisp board covers.</li>
          <li>Choose a pin with a centered subject — the edges of tall pins are cropped to fit square.</li>
          <li>Use consistent cover styling across all boards for a cohesive profile aesthetic.</li>
          <li>Avoid text-heavy pins as board covers — text becomes unreadable at thumbnail size.</li>
          <li>Manually set each board cover rather than relying on Pinterest&apos;s auto-selection.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Profile Picture — 165 x 165 (1:1)</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your Pinterest profile picture displays at 165 x 165 pixels in a circular crop on your profile page and at smaller sizes in comments and notifications. Upload a square image at double the display size (330 x 330) to ensure it stays sharp after compression. Keep your subject centered within the frame — Pinterest displays the image as a circle, so anything near the corners will be clipped.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">330 x 330 pixels</strong> for best quality after compression.</li>
          <li>Keep the subject within the central 60% of the frame to account for the circular crop.</li>
          <li>Use a logo or headshot — text in profile pictures is unreadable at small sizes.</li>
          <li>PNG format is best for logos with transparent backgrounds; JPEG works for photos.</li>
          <li>Your profile picture appears across all Pinterest surfaces, including search results and boards.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Video Pin Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Video pins autoplay on mute in the Pinterest feed and can significantly boost engagement. Pinterest supports both landscape (16:9) and vertical (9:16) video formats, with vertical video being the stronger performer on mobile. Videos can be up to 2 GB and 15 minutes in length. The first frame of your video serves as the thumbnail in search results, so ensure it is visually compelling.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Video Format</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Recommended Size</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Landscape Video</td>
                <td className="text-[#8d9aaa] py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">16:9</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Vertical Video</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 pl-3">9:16</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Square Video</td>
                <td className="text-[#8d9aaa] py-2 px-3">1000 x 1000</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1:1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Vertical 9:16 video fills the mobile screen and drives the highest completion rates.</li>
          <li>Add captions — Pinterest videos autoplay on mute by default.</li>
          <li>Keep videos under 1 minute for maximum retention; the first 5 seconds are critical.</li>
          <li>Upload the highest resolution version available — Pinterest compresses video aggressively.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Pinterest Image Best Practices</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Pinterest is unique among social platforms because its users actively search for content with purchase intent. Image quality directly affects click-through rates, save rates, and how often your pins appear in search results.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Use tall vertical pins (2:3) as your default.</strong> Pinterest&apos;s column-based feed gives more visual weight to tall images. Pins with a 2:3 ratio get significantly more impressions than square or wide pins.</li>
          <li><strong className="text-[#e6edf5]">Overlay readable text on images.</strong> Pins with text overlays get more saves because users understand the content before clicking. Keep text at least 24px in the exported image and limit to 3-5 lines.</li>
          <li><strong className="text-[#e6edf5]">Maintain consistent brand colors.</strong> Pinterest users often scan quickly. A consistent color palette helps your pins stand out in the feed and builds brand recognition over time.</li>
          <li><strong className="text-[#e6edf5]">Compress images before uploading.</strong> Pinterest resizes images on the server, but starting with an optimized file (70-80% JPEG quality) prevents over-compression artifacts. Target file sizes under 500 KB for fast loading.</li>
          <li><strong className="text-[#e6edf5]">Avoid thin white borders.</strong> Pinterest&apos;s smart crop algorithm may interpret thin borders as part of the background and crop them unevenly. Use a 2-3 pixel inner stroke or a subtle shadow instead of a border.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common Pinterest Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Using square or landscape pins exclusively.</strong> Square and landscape pins take up less vertical space in the feed and get fewer impressions. While they have their place, tall 2:3 pins should be your primary format.</li>
          <li><strong className="text-[#e6edf5]">Ignoring the smart crop.</strong> Pinterest automatically crops the bottom and edges of pins in preview sections. Critical content or text in the bottom third of your pin frequently gets cut off.</li>
          <li><strong className="text-[#e6edf5]">Overly complex images.</strong> Pinterest&apos;s algorithm favors clean, high-contrast images with a single clear focal point. Busy compositions with multiple subjects or heavy textures get lower engagement.</li>
          <li><strong className="text-[#e6edf5]">Missing text on pins.</strong> Unlike Instagram, Pinterest users expect text overlays that explain the content. Pins without context text receive fewer saves because users cannot immediately understand the value.</li>
          <li><strong className="text-[#e6edf5]">Uploading low-resolution images.</strong> Pinterest displays pins at 1000px wide in the feed. Uploading smaller images makes them appear blurry and reduces user trust, especially for commercial pins.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How Pinterest&apos;s Algorithm Treats Image Size</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Pinterest&apos;s recommendation and search ranking algorithms consider several factors that your image choice directly affects:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Pin size and aspect ratio.</strong> Pins with a 2:3 aspect ratio occupy more screen space, which naturally increases close-up time. Pinterest&apos;s ranking system treats longer close-up time as a positive relevance signal.</li>
          <li><strong className="text-[#e6edf5]">Save rate.</strong> Tall infographic-style pins get saved at significantly higher rates because users keep them as references. Higher save rates improve distribution across related pin sections.</li>
          <li><strong className="text-[#e6edf5]">Click-through rate.</strong> Pinterest measures how often users click through to the source website. Clean, well-composed images with clear text overlays consistently achieve higher CTR than minimal or abstract pins.</li>
          <li><strong className="text-[#e6edf5]">Freshness signals.</strong> New pins get initial distribution boosts. Publishing fresh content regularly with optimized dimensions helps maintain consistent traffic from Pinterest search.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Quick Reference Card</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Use Case</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Standard pin</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1000 x 1500</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Square pin</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1000 x 1000</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Board cover</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">600 x 600</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Profile picture</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">165 x 165</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG (logos) / JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Video pin</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">MP4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with Pinterest Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to any Pinterest format directly in your browser. No uploads, no signup, no watermarks. Use the <Link href="/edit" className="text-[var(--accent)] no-underline hover:underline">image editor</Link> to set your target pin dimensions and download a perfectly sized image in seconds. All processing happens client-side; your images never leave your device.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-6">
          {FAQ_QUESTIONS.map((q, i) => (
            <div key={i}>
              <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">{q.question}</h3>
              <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">{q.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Key Takeaways</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Pinterest favors tall vertical pins in a 2:3 aspect ratio (1000 x 1500). Use this as your default format for maximum feed visibility and repin rates. Square pins work well for products and simple graphics. Board covers display at 600 x 600 and should have a centered focal point. Add readable text overlays to every pin and optimize for Pinterest&apos;s smart crop by keeping critical content away from the edges. For more social media image guides, see the <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">complete social media image sizes guide</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for Pinterest?</strong>{" "}
            Use <Link href="/edit" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s free image editor</Link> — set your target pin dimensions and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="pinterest-image-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/edit"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px var(--accent-glow)]"
          >
            Resize Images for Pinterest Free
          </Link>
        </div>
      </article>
    </>
  );
}
