import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "SquarePic vs TinyPNG - Detailed Comparison (2026)",
  description: "Compare SquarePic vs TinyPNG: compression features, pricing, privacy, and format support. See which tool fits your workflow.",
  openGraph: { title: "SquarePic vs TinyPNG - Comparison | SquarePic" },
  alternates: { canonical: "https://squarepic.io/compare/squarepic-vs-tinypng" },
};

const SITE = "https://squarepic.io";

export default function VsTinypngPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Comparisons", url: `${SITE}/compare` },
        { name: "SquarePic vs TinyPNG", url: `${SITE}/compare/squarepic-vs-tinypng` },
      ]} />
      <article className="max-w-[720px] w-full mx-auto px-4 py-8">
        <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-3">SquarePic vs TinyPNG (2026)</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-6">
          TinyPNG is well-known for PNG and JPEG compression using smart lossy algorithms. But it is a
          single-purpose tool. SquarePic combines compression with resizing, cropping, conversion, and
          squaring -- all without uploading your files.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.82rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pr-4">Feature</th>
                <th className="text-center font-bold text-[var(--accent)] py-2.5 px-3">SquarePic</th>
                <th className="text-center font-bold text-[#8d9aaa] py-2.5 pl-4">TinyPNG</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feat: "Price", sp: "Free forever", tp: "Free (500 images/mo) + Pro ($)" },
                { feat: "Signup Required", sp: "No", tp: "No (free tier)" },
                { feat: "Client-Side Only", sp: "Yes", tp: "No -- uploads to server" },
                { feat: "Max File Size", sp: "20 MB", tp: "Free: 5 MB, Pro: 50 MB" },
                { feat: "Image Squaring", sp: "Yes", tp: "No" },
                { feat: "Blur Background", sp: "Yes", tp: "No" },
                { feat: "Smart Crop", sp: "Yes", tp: "No" },
                { feat: "Compression", sp: "Quality slider + target size", tp: "Auto (lossy)" },
                { feat: "Batch Processing", sp: "Yes (ZIP export)", tp: "Yes (ZIP export)" },
                { feat: "Format Conversion", sp: "8 formats", tp: "PNG, JPEG, WebP only" },
                { feat: "Social Media Presets", sp: "13 platforms", tp: "No" },
                { feat: "Privacy", sp: "Images never leave device", tp: "Uploaded to server, deleted after 48h" },
                { feat: "Open Source", sp: "Yes (MIT)", tp: "No" },
                { feat: "Compression Control", sp: "Full quality slider", tp: "No manual control (auto)" },
              ].map((r) => (
                <tr key={r.feat} className="border-b border-[rgba(255,255,255,0.03)]">
                  <td className="text-[#e6edf5] font-semibold py-2.5 pr-4">{r.feat}</td>
                  <td className="text-center text-[var(--accent)] font-bold py-2.5 px-3">{r.sp}</td>
                  <td className="text-center text-[#576675] py-2.5 pl-4">{r.tp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">When to Use Each</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Choose TinyPNG when...</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">You need quick, automatic PNG/JPEG compression and trust server-side processing. TinyPNG&apos;s algorithm is excellent for reducing file sizes with minimal visible quality loss.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Choose SquarePic when...</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">You want full control over compression quality, need to also resize, crop, or convert formats, or care about privacy. SquarePic gives you a quality slider and target-size mode, plus all the other tools in one place.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Key Advantage: All-in-One</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">TinyPNG only compresses. SquarePic compresses, resizes, crops, converts, and squares images. You can compress an image, convert it to WebP, resize it for Instagram, and add a blur background -- all in one session, all locally.</p>
            </div>
          </div>
        </section>

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link href="/compressor" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
            Try SquarePic Compressor
          </Link>
        </div>
      </article>
    </>
  );
}

