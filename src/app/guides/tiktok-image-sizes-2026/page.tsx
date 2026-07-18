import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "TikTok Image Sizes 2026: Profile, Video & Story Dimensions",
  description: "Complete guide to TikTok image dimensions for 2026. Profile picture size, video aspect ratios, story specs, ad formats, and best practices for maximum engagement.",
  openGraph: { title: "TikTok Image Sizes 2026: Profile, Video & Story Dimensions | SquarePic", description: "Complete guide to TikTok image dimensions for 2026. Profile pictures, video aspect ratios, story specs, ad formats, and best practices.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/tiktok-image-sizes-2026" },
  twitter: { card: "summary_large_image", title: "TikTok Image Sizes 2026: Profile, Video & Story Dimensions | SquarePic", description: "Complete guide to TikTok image dimensions for 2026." },
};

const SITE = "https://www.squarepic.io";

export default function TikTokImageSizesPage() {
  const FAQ_QUESTIONS = [
    { question: "What is the best TikTok profile picture size?", answer: "200 x 200 pixels at 1:1 aspect ratio. Upload a square image, and TikTok will crop it to a circle. Keep your subject centered." },
    { question: "What aspect ratio does TikTok use for videos?", answer: "9:16 (1080 x 1920) is the standard TikTok video aspect ratio. Videos can also use 1:1 (square) or 16:9 (landscape), but 9:16 fills the screen and performs best." },
    { question: "What image size should I use for TikTok ads?", answer: "TikTok video ads use 1080 x 1920 (9:16). Image ads use 1080 x 1920 (9:16) or 1080 x 1080 (1:1). Carousel ads support 2 to 35 images at 1080 x 1920 each." },
    { question: "Can I upload photos to TikTok?", answer: "Yes. Photo posts (also called Photo Mode or image posts) display at 1080 x 1920 (9:16) and let users swipe through your images. You can also post single-image videos." },
    { question: "What file format does TikTok prefer for images?", answer: "TikTok accepts JPEG, PNG, and WebP for images. Use JPEG for photos, PNG for graphics with text or transparency." },
  ];

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "TikTok Image Sizes 2026", url: `${SITE}/guides/tiktok-image-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="TikTok Image Sizes 2026: Profile, Video & Story Dimensions"
        description="Complete guide to TikTok image dimensions for 2026. Profile picture size, video aspect ratios, story specs, ad formats, and best practices for maximum engagement."
        url={`${SITE}/guides/tiktok-image-sizes-2026`}
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
            TikTok
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">TikTok Image Sizes 2026: Profile, Video & Story Dimensions</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 8 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/tiktok-image-sizes-2026" title="TikTok Image Sizes 2026: Profile, Video & Story Dimensions" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          TikTok is the most format-specific social platform. Nearly all content is vertical 9:16 video, and images that do not match this aspect ratio get padded with black bars or cropped awkwardly. Whether you are creating video content, designing profile assets, or running ads, knowing the exact dimensions saves time and keeps your content looking native. This guide covers every TikTok image format updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">TikTok Image Sizes at a Glance</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Image Type</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Aspect Ratio</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">200 x 200</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Video / Photo Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG / MP4</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Story</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG / MP4</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Carousel Image</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Video Cover</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Ad (In-Feed Video)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">MP4 / JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Ad (Image)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">TikTok Profile Picture</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your TikTok profile picture displays at 200 x 200 pixels and is cropped to a circle. At this small size, detail matters more than resolution. Use a close-up headshot or a simple logo with high contrast. TikTok displays your profile picture at 60 x 60 in comments and 30 x 30 in follower lists, so avoid fine detail that disappears at thumbnail scale. Upload at 200 x 200 minimum. PNG preserves sharp edges for logos; JPEG works for photos.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload a <strong className="text-[#e6edf5]">square 200 x 200</strong> image at minimum.</li>
          <li>Center the subject for TikTok&apos;s <strong className="text-[#e6edf5]">circular crop</strong>.</li>
          <li>Avoid text — it becomes unreadable at 30 x 30.</li>
          <li>Use a <strong className="text-[#e6edf5]">simple, high-contrast background</strong> for recognizability.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">TikTok Video and Photo Posts</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          TikTok&apos;s primary content format is vertical 9:16 video at 1080 x 1920 pixels. Unlike other platforms, TikTok does not crop or pad non-9:16 content gracefully. Landscape or square videos get displayed with solid color bars above and below, reducing the effective screen area and making your content look amateurish. Always export vertical 9:16 for native display.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Photo posts (sometimes called Photo Mode) let you share multiple images that users swipe through. Each image must be 1080 x 1920 at 9:16. TikTok assigns background colors from the image palette when photos do not fill the full screen, so design images that extend edge-to-edge for the cleanest look.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Video Specifications</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Spec</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Resolution</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">1080 x 1920</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Aspect ratio</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">9:16</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Max duration</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">10 minutes</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">File format</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">MP4 (H.264) / MOV</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Max file size</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">500 MB</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Frame rate</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">30 fps (60 fps supported)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">TikTok Video Cover Image</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          You can upload a custom cover image for each TikTok video. The cover should be 1080 x 1920 at 9:16 aspect ratio. Unlike YouTube, TikTok does not prominently feature your cover in search results or the For You feed — the first frame of your video serves as the primary thumbnail. However, the cover image appears in your profile grid and when users pause on your video. Design covers with the same care as your video&apos;s first frame: centered subject, bold text if used, and high contrast.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">TikTok Ads Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          TikTok Ads Manager supports several ad formats. In-Feed Ads are the most common — they appear in users&apos; For You feeds as they scroll. All ad formats use 9:16 as the primary aspect ratio, with 1:1 available for image-only ads:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li><strong className="text-[#e6edf5]">In-Feed Video:</strong> 1080 x 1920 (9:16), 5-60 seconds, MP4 or MOV, up to 500 MB.</li>
          <li><strong className="text-[#e6edf5]">In-Feed Image:</strong> 1080 x 1920 (9:16) or 1080 x 1080 (1:1), JPEG or PNG, up to 20 MB.</li>
          <li><strong className="text-[#e6edf5]">Carousel:</strong> 2-35 images at 1080 x 1920 (9:16) each, JPEG or PNG, up to 20 MB per image.</li>
          <li><strong className="text-[#e6edf5]">Spark Ads:</strong> Use existing organic posts — dimensions follow the original post format.</li>
          <li><strong className="text-[#e6edf5]">TopView:</strong> 1080 x 1920 (9:16), 5-60 seconds, app&apos;s first impression ad format.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Best Practices for TikTok Images</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Always use 9:16 vertical.</strong> TikTok is a vertical-first platform. Every non-9:16 image gets padded with background color, reducing the visual impact. Design for 1080 x 1920 from the start.</li>
          <li><strong className="text-[#e6edf5]">Text safe zones matter.</strong> TikTok overlays the caption, like button, share button, and user handle on your content. Keep critical visual elements in the center 70% of the frame. Leave the bottom 10% clear for the caption area.</li>
          <li><strong className="text-[#e6edf5]">Bright, saturated colors perform best.</strong> TikTok&apos;s algorithm favors visually stimulating content. High-brightness, high-saturation images get more attention in the For You feed. Muted or dark content gets scrolled past faster.</li>
          <li><strong className="text-[#e6edf5]">Keep file sizes manageable.</strong> TikTok compresses large uploads aggressively. A 50 MB video uploaded at 1080p will look worse after TikTok&apos;s compression than a 10 MB video at the same resolution. Export at reasonable bitrates.</li>
          <li><strong className="text-[#e6edf5]">Design for sound-off viewing.</strong> Over 70% of TikTok initial views happen with sound off. If your content relies on audio, add captions burned into the video within the center safe zone.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common TikTok Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Horizontal or square video.</strong> TikTok adds background bars to non-9:16 content, shrinking the effective viewing area. This is the most common reason amateur content looks low-effort on TikTok.</li>
          <li><strong className="text-[#e6edf5]">Text in the bottom 10%.</strong> TikTok places the caption bar and action buttons at the bottom of the screen. Text placed in this area is completely hidden from view.</li>
          <li><strong className="text-[#e6edf5]">Pixelated profile picture.</strong> Uploading a small or low-resolution profile picture at 200 x 200 or below results in a blurry avatar at every display size.</li>
          <li><strong className="text-[#e6edf5]">Oversized files causing failed uploads.</strong> TikTok silently fails or times out on files exceeding the 500 MB limit. Compress before uploading, especially for longer videos.</li>
          <li><strong className="text-[#e6edf5]">Ignoring the first frame.</strong> The first frame of your TikTok video acts as the cover in the profile grid. If it is dark, blurry, or uninteresting, users will not click. Set the cover frame deliberately.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with TikTok Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to TikTok&apos;s exact 9:16 format directly in your browser. Use the <Link href="/resize/tiktok" className="text-[var(--accent)] no-underline hover:underline">TikTok image resizer</Link> to select your target format — profile picture, video cover, or ad creative — and download perfectly sized images in seconds. No signup, no uploads, no watermarks. All processing happens client-side; your images never leave your device.
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
          TikTok is defined by vertical 9:16 content. Nearly every image asset — profile picture, video, cover, ad — follows this format. Upload a 200 x 200 profile picture, design all content at 1080 x 1920, and keep critical elements in the center 70% of the frame to avoid UI overlay clipping. For a complete reference across all platforms, see the <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">social media image sizes cheat sheet</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for TikTok?</strong>{" "}
            Use <Link href="/resize/tiktok" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s TikTok image resizer</Link> — select your target format and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="tiktok-image-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/resize/tiktok"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px var(--accent-glow)]"
          >
            Resize Images for TikTok Free
          </Link>
        </div>
      </article>
    </>
  );
}
