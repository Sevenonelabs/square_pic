import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "How to Square an Image for Any Social Media Platform",
  description: "Step-by-step guide to making perfect square images for Instagram, LinkedIn, Facebook, and more. Learn three methods: blur background, solid fill, and smart crop.",
  openGraph: { title: "How to Square an Image for Any Social Media Platform | SquarePic" },
  alternates: { canonical: "https://squarepic.io/blog/how-to-square-image-for-any-platform" },
};

const SITE = "https://squarepic.io";

export default function HowToSquareImagePost() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Blog", url: `${SITE}/blog` },
        { name: "How to Square an Image", url: `${SITE}/blog/how-to-square-image-for-any-platform` },
      ]} />
      <ArticleSchema
        title="How to Square an Image for Any Social Media Platform"
        description="Step-by-step guide to making perfect square images for Instagram, LinkedIn, Facebook, and more. Learn three methods: blur background, solid fill, and smart crop."
        url={`${SITE}/blog/how-to-square-image-for-any-platform`}
        datePublished="2026-07-13"
        authorName="SquarePic Team"
      />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
            How-To
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">
            How to Square an Image for Any Social Media Platform
          </h1>
          <p className="text-[0.78rem] text-[#576675]">July 13, 2026 · 5 min read</p>
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          Every social media platform has its preferred image dimensions, but one format works everywhere:
          the square. Instagram feeds, LinkedIn profiles, Facebook posts, and Twitter/X headers all use
          square images in some form. Here is how to make any photo perfectly square without cropping out
          the parts you need.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Method 1: Dynamic Blur Background</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The most popular technique. Instead of cropping your image, it extends the canvas to a square
          and fills the empty space with a blurred version of your photo. The result looks intentional
          and professional.
        </p>
        <ol className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li>Upload your photo to <Link href="/" className="text-[var(--accent)] no-underline hover:underline">SquarePic</Link>.</li>
          <li>Select the <strong className="text-[#e6edf5]">Dynamic Blur</strong> mode.</li>
          <li>Adjust the blur intensity using the slider. Higher values create a smoother background.</li>
          <li>Set your padding amount to control how much of the blurred border shows around your image.</li>
          <li>Download your square image as PNG, JPEG, or WebP.</li>
        </ol>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Method 2: Solid Color Fill</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Perfect for brand consistency. This method places your image on a solid color background,
          making it square while keeping the original photo intact. Ideal for product photos and
          brand assets where you want a consistent aesthetic.
        </p>
        <ol className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li>Upload your photo to SquarePic and select <strong className="text-[#e6edf5]">Solid</strong> mode.</li>
          <li>Choose a color from the preset swatches or pick a custom color using the color picker.</li>
          <li>Match the background color to your brand palette for a cohesive look across posts.</li>
          <li>Adjust padding, zoom, and corner radius to fine-tune the positioning.</li>
          <li>Export your square image at the dimensions you need.</li>
        </ol>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Method 3: Smart Crop</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          When you want to fill the entire square with your image, Smart Crop automatically centers
          and crops your photo to the required square dimensions. Best for images where the subject
          is already centered and you do not need a background.
        </p>
        <ol className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li>Upload your photo and select <strong className="text-[#e6edf5]">Smart Crop</strong> mode.</li>
          <li>Adjust the zoom slider to control how much of the image is visible in the square frame.</li>
          <li>Use the padding setting to add a white or transparent border around the cropped area.</li>
          <li>Download your perfectly cropped square image.</li>
        </ol>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">When to Use Each Method</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Scenario</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Best Method</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Instagram feed post with busy background</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">Dynamic Blur</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Product photo on white background</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">Solid Color Fill</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Profile picture or avatar</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">Smart Crop</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Brand assets with consistent colors</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">Solid Color Fill</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Photo with good composition</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">Smart Crop</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Square Size Cheat Sheet</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Here are the most common square image dimensions you need for each platform:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li><strong className="text-[#e6edf5]">Instagram:</strong> 1080x1080 (feed), 320x320 (profile)</li>
          <li><strong className="text-[#e6edf5]">Facebook:</strong> 1200x1200 (post), 320x320 (profile)</li>
          <li><strong className="text-[#e6edf5]">LinkedIn:</strong> 1200x1200 (post), 400x400 (profile)</li>
          <li><strong className="text-[#e6edf5]">X/Twitter:</strong> 1200x1200 (post), 400x400 (profile)</li>
        </ul>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          For a complete list of every platform&apos;s image dimensions, see our{" "}
          <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">
            Social Media Image Sizes 2026 guide
          </Link>.
        </p>

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)] mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Make a Square Image Now
          </Link>
        </div>
      </article>
    </>
  );
}

