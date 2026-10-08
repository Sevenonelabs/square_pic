import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { ConverterTool } from "@/components/converter/converter-tool";
import { OUTPUT_FORMATS, type OutputFormat } from "@/lib/image-export";
import { SITE_URL as SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };
const PAIRS = ["png-to-jpg", "jpg-to-png", "png-to-webp", "jpg-to-webp", "webp-to-png", "webp-to-jpg", "png-to-gif", "jpg-to-gif", "webp-to-gif", "png-to-ico", "jpg-to-ico", "png-to-avif", "jpg-to-avif", "webp-to-avif"];
const label = (format: string) => format === "jpg" ? "JPEG" : format === "webp" ? "WebP" : format.toUpperCase();
function pair(slug: string) {
  if (!PAIRS.includes(slug)) return null;
  const [from, to] = slug.split("-to-");
  const output = to === "jpg" ? "jpeg" : to;
  return { from, to, output, supported: OUTPUT_FORMATS.includes(output as OutputFormat) };
}
export function generateStaticParams() { return PAIRS.map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = pair(slug);
  if (!p) return {};
  return pageMetadata({ title: p.supported ? `${label(p.from)} to ${label(p.to)} Converter Online Free` : `${label(p.from)} to ${label(p.to)}: Export Unavailable`,
    description: p.supported ? `Convert ${label(p.from)} to ${label(p.to)} online free, with no signup or server uploads. ${p.to === "ico" ? "Create an icon within 256x256 pixels." : p.to === "jpg" ? "Keep dimensions; transparent areas turn white." : "Keep source dimensions and transparency."} Download in your browser.` : `${label(p.from)} to ${label(p.to)} export is currently unavailable. Use PNG, JPEG, WebP or ICO output instead. Supported conversions run locally in your browser, with no signup.`,
    path: `/converter/${slug}`, image: "/og/og-converter.png" });
}
export default async function FormatToFormatPage({ params }: Props) {
  const { slug } = await params;
  const p = pair(slug);
  if (!p) notFound();
  const title = `${label(p.from)} to ${label(p.to)}`;
  return <>
    <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Converter", url: `${SITE}/converter` }, { name: title, url: `${SITE}/converter/${slug}` }]} />
    {p.supported && <WebAppSchema name={`${title} converter`} url={`${SITE}/converter/${slug}`} description={`Convert ${label(p.from)} still images to ${label(p.to)} directly on this page.`} dateModified="2026-10-08" />}
    <div className="max-w-[960px] w-full mx-auto px-5 pt-6">
      <Link href="/converter" className="text-[var(--accent)] underline">All image conversions</Link>
      <h1 className="text-2xl font-extrabold tracking-tight my-4">{title}{p.supported ? " Converter" : " export is currently unavailable"}</h1>
      <p className="text-[#8d9aaa] leading-relaxed mb-4">{p.supported ? `Choose a ${label(p.from)} image below. ${label(p.to)} output is already selected; processing happens on your device.` : `${label(p.to)} output is disabled until a reliable encoder is available. Choose a supported alternative on the converter page.`}</p>
      {p.supported && <p className="text-sm text-[#8d9aaa] mb-4">{p.to === "jpg" ? "Transparent pixels become white. JPEG is lossy and retains source dimensions." : p.to === "ico" ? "One PNG-backed icon fits within 256 x 256 pixels without stretching. Transparency is retained." : p.to === "webp" ? "WebP uses lossy compression, retains alpha and keeps source dimensions." : "PNG encodes the decoded pixels losslessly, keeps dimensions and alpha, and does not recover detail or create transparency."} Animated inputs export one still frame. Source metadata is not preserved.</p>}
    </div>
    {p.supported && <ConverterTool key={slug} initialFormat={p.output as OutputFormat} inputFormat={p.from} showHeading={false} />}
    {p.supported && <section className="max-w-[960px] w-full mx-auto px-5 pb-10 text-[#8d9aaa]">
      <h2 className="text-lg font-bold text-[#e6edf5] mb-3">Other conversions for {label(p.from)} images</h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {PAIRS.filter((candidate) => {
          const alternative = pair(candidate);
          return alternative?.supported && alternative.from === p.from && candidate !== slug;
        }).map((candidate) => <li key={candidate}><Link href={`/converter/${candidate}`} className="text-[var(--accent)] hover:underline">
          {label(p.from)} to {label(candidate.split("-to-")[1])}
        </Link></li>)}
      </ul>
    </section>}
  </>;
}
