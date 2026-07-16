import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "SquarePic vs The Competition - Comparison Guide",
  description: "Compare SquarePic with iLoveIMG, TinyPNG, Canva, and other image editing tools. See why privacy-first, client-side processing is better.",
  openGraph: { title: "SquarePic vs The Competition | SquarePic" },
  alternates: { canonical: "https://squarepic.io/compare" },
};

const SITE = "https://squarepic.io";

const COMPARISONS = [
  {
    slug: "squarepic-vs-iloveimg",
    competitor: "iLoveIMG",
    desc: "iLoveIMG offers a suite of image editing tools but uploads your files to their servers. See how SquarePic's client-side approach compares.",
  },
  {
    slug: "squarepic-vs-tinypng",
    competitor: "TinyPNG",
    desc: "TinyPNG is great for PNG/JPEG compression but limited in scope. SquarePic combines compression with resizing, cropping, and format conversion.",
  },
  {
    slug: "squarepic-vs-canva",
    competitor: "Canva",
    desc: "Canva is a full design platform with a learning curve. SquarePic focuses on fast, free image resizing and editing without an account.",
  },
];

export default function ComparePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Comparisons", url: `${SITE}/compare` },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "SquarePic vs The Competition",
        description: "Compare SquarePic with iLoveIMG, TinyPNG, Canva, and other image editing tools.",
        url: `${SITE}/compare`,
        about: { "@type": "Thing", name: "Image Editor Comparisons" },
      }} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-2">SquarePic vs The Competition</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] mb-8 leading-relaxed">
          Honest, detailed comparisons between SquarePic and other popular image editing tools.
        </p>
        <div className="flex flex-col gap-4">
          {COMPARISONS.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <h2 className="text-[1.05rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">
                SquarePic vs {c.competitor}
              </h2>
              <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

