import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "SquarePic vs iLoveIMG - Detailed Comparison (2026)",
  description: "Compare SquarePic vs iLoveIMG: features, pricing, privacy, and limitations. See why client-side image processing is the better choice for privacy-conscious users.",
  openGraph: { title: "SquarePic vs iLoveIMG - Comparison | SquarePic" },
  alternates: { canonical: "https://www.squarepic.io/compare/squarepic-vs-iloveimg" },
};

const SITE = "https://www.squarepic.io";

export default function VsIloveimgPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Comparisons", url: `${SITE}/compare` },
        { name: "SquarePic vs iLoveIMG", url: `${SITE}/compare/squarepic-vs-iloveimg` },
      ]} />
      <article className="max-w-[720px] w-full mx-auto px-4 py-8">
        <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-3">SquarePic vs iLoveIMG (2026)</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-6">
          iLoveIMG is one of the most popular free image editing websites. It offers compression, resizing,
          cropping, and format conversion — similar to SquarePic. But there are key differences in how
          they handle your images.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.82rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pr-4">Feature</th>
                <th className="text-center font-bold text-[var(--accent)] py-2.5 px-3">SquarePic</th>
                <th className="text-center font-bold text-[#8d9aaa] py-2.5 pl-4">iLoveIMG</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feat: "Price", sp: "Free forever", il: "Free tier + Pro ($)" },
                { feat: "Signup Required", sp: "No", il: "No (free tier)" },
                { feat: "Client-Side Only", sp: "Yes", il: "No — uploads to server" },
                { feat: "Max File Size", sp: "20 MB", il: "Free: 25 MB, Pro: 100 MB" },
                { feat: "Image Squaring", sp: "Yes (blur, solid, crop)", il: "Yes (crop only)" },
                { feat: "Blur Background", sp: "Yes", il: "No" },
                { feat: "Smart Crop", sp: "Yes", il: "Yes" },
                { feat: "Batch Processing", sp: "Compressor, Converter", il: "Yes (Pro for ZIP)" },
                { feat: "Format Conversion", sp: "JPEG, PNG, WebP, AVIF, GIF, ICO, BMP, TIFF", il: "JPEG, PNG, WebP, GIF" },
                { feat: "Social Media Presets", sp: "13 platforms", il: "No" },
                { feat: "Compression Modes", sp: "Quality slider + target size", il: "Compression level" },
                { feat: "Privacy", sp: "Images never leave device", il: "Uploaded to servers, deleted after 1 hour" },
                { feat: "Open Source", sp: "Yes (MIT)", il: "No" },
                { feat: "Watermarks", sp: "None", il: "None on free tier" },
              ].map((r) => (
                <tr key={r.feat} className="border-b border-[rgba(255,255,255,0.03)]">
                  <td className="text-[#e6edf5] font-semibold py-2.5 pr-4">{r.feat}</td>
                  <td className="text-center text-[var(--accent)] font-bold py-2.5 px-3">{r.sp}</td>
                  <td className="text-center text-[#576675] py-2.5 pl-4">{r.il}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Key Differences</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Privacy</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">iLoveIMG uploads your images to their servers for processing. They state files are deleted after one hour, but during processing your images exist on a remote server. SquarePic processes everything locally — your images never leave your device.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Social Media Features</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">SquarePic includes built-in presets for 13 social media platforms with exact dimensions for profile pictures, posts, stories, and covers. iLoveIMG focuses on basic resize/crop without platform-specific presets.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Image Squaring</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">SquarePic offers three squaring modes: Dynamic Blur (blurred background extension), Solid Color (custom color fill), and Smart Crop. iLoveIMG only offers basic crop-to-square with no background options.</p>
            </div>
          </div>
        </section>

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link href="/" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
            Try SquarePic Free
          </Link>
        </div>
      </article>
    </>
  );
}
