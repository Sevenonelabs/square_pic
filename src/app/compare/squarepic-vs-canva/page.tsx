import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "SquarePic vs Canva - Detailed Comparison (2026)",
  description: "Compare SquarePic vs Canva: features, pricing, privacy, and ease of use. See why SquarePic is the faster choice for quick image resizing and editing.",
  openGraph: { title: "SquarePic vs Canva - Comparison | SquarePic" },
  alternates: { canonical: "https://squarepic.io/compare/squarepic-vs-canva" },
};

const SITE = "https://squarepic.io";

export default function VsCanvaPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Comparisons", url: `${SITE}/compare` },
        { name: "SquarePic vs Canva", url: `${SITE}/compare/squarepic-vs-canva` },
      ]} />
      <article className="max-w-[720px] w-full mx-auto px-4 py-8">
        <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-3">SquarePic vs Canva (2026)</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-6">
          Canva is a powerful graphic design platform with millions of templates. SquarePic is a focused
          image editing tool for quick resizing, cropping, and format conversion. They serve different
          needs, but for pure image editing without the overhead, SquarePic has some clear advantages.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.82rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pr-4">Feature</th>
                <th className="text-center font-bold text-[var(--accent)] py-2.5 px-3">SquarePic</th>
                <th className="text-center font-bold text-[#8d9aaa] py-2.5 pl-4">Canva</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feat: "Price", sp: "Free forever", c: "Freemium (Pro $13/mo)" },
                { feat: "Signup Required", sp: "No", c: "Yes" },
                { feat: "Client-Side Only", sp: "Yes", c: "No -- server processing" },
                { feat: "Image Squaring", sp: "Yes (blur, solid, crop)", c: "Yes (crop only)" },
                { feat: "Blur Background", sp: "Yes", c: "No (free tier)" },
                { feat: "Smart Crop", sp: "Yes", c: "Yes" },
                { feat: "Design Templates", sp: "No", c: "500,000+" },
                { feat: "Social Media Presets", sp: "13 platforms", c: "Yes" },
                { feat: "Format Conversion", sp: "8 formats", c: "Limited" },
                { feat: "Compression", sp: "Quality slider + target size", c: "No dedicated tool" },
                { feat: "Batch Processing", sp: "Yes (ZIP)", c: "No (free tier)" },
                { feat: "Watermarks", sp: "None", c: "Yes (free tier)" },
                { feat: "Open Source", sp: "Yes (MIT)", c: "No" },
                { feat: "Privacy", sp: "Images never leave device", c: "Stored on Canva servers" },
                { feat: "Learning Curve", sp: "Instant -- upload and edit", c: "Moderate -- many features" },
              ].map((r) => (
                <tr key={r.feat} className="border-b border-[rgba(255,255,255,0.03)]">
                  <td className="text-[#e6edf5] font-semibold py-2.5 pr-4">{r.feat}</td>
                  <td className="text-center text-[var(--accent)] font-bold py-2.5 px-3">{r.sp}</td>
                  <td className="text-center text-[#576675] py-2.5 pl-4">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Key Differences</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Speed & Simplicity</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">SquarePic is designed for one thing -- editing images fast. Upload, adjust, download. No account creation, no template browsing, no overwhelming interface. Canva requires signup and navigating a full design tool even for a simple resize.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Privacy</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">Canva stores all your uploads on their servers and uses them to power their AI features. SquarePic processes everything locally in your browser. Your images never leave your device, and there is no account system to compromise.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">Pricing</h3>
              <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">SquarePic is 100% free -- every feature, every tool, no limits. Canva's free tier adds watermarks to your designs and limits access to premium templates and features. Canva Pro costs $13/month.</p>
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

