import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, WebAppSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ConverterTool } from "@/components/converter/converter-tool";
import { OUTPUT_FORMATS, type OutputFormat } from "@/lib/image-export";
import { SITE_URL as SITE } from "@/lib/constants";
import { ToolLinks } from "@/components/layout/tool-links";
import { FORMAT_DETAILS, getPairContent } from "./converter-data";

type Props = { params: Promise<{ slug: string }> };

const PAIRS = [
  "png-to-jpg",
  "jpg-to-png",
  "png-to-webp",
  "jpg-to-webp",
  "webp-to-png",
  "webp-to-jpg",
  "png-to-gif",
  "jpg-to-gif",
  "webp-to-gif",
  "png-to-ico",
  "jpg-to-ico",
  "png-to-avif",
  "jpg-to-avif",
  "webp-to-avif",
];

const label = (format: string) => (format === "jpg" ? "JPEG" : format === "webp" ? "WebP" : format.toUpperCase());

function pair(slug: string) {
  if (!PAIRS.includes(slug)) return null;
  const [from, to] = slug.split("-to-");
  const output = to === "jpg" ? "jpeg" : to;
  return { from, to, output, supported: OUTPUT_FORMATS.includes(output as OutputFormat) };
}

export function generateStaticParams() {
  return PAIRS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = pair(slug);
  if (!p) return {};

  const fromName = label(p.from);
  const toName = label(p.to);

  return {
    ...pageMetadata({
      title: p.supported
        ? `${fromName} to ${toName} Converter Online Free`
        : `${fromName} to ${toName}: Export Unavailable`,
      description: p.supported
        ? `Convert ${fromName} to ${toName} online free, with no signup or server uploads. ${
            p.to === "ico"
              ? "Create a clean icon fitting within 256x256 pixels."
              : p.to === "jpg"
              ? "Reduce file size; transparent areas seamlessly fill with white."
              : "Keep source dimensions and alpha transparency."
          } Fast, secure in-browser processing.`
        : `${fromName} to ${toName} export is currently unavailable. Use PNG, JPEG, WebP or ICO output instead. Supported conversions run locally in your browser, with no signup.`,
      path: `/converter/${slug}`,
      image: "/og/og-converter.png",
    }),
    ...(!p.supported ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function FormatToFormatPage({ params }: Props) {
  const { slug } = await params;
  const p = pair(slug);
  if (!p) notFound();

  const fromName = label(p.from);
  const toName = label(p.to);
  const title = `${fromName} to ${toName}`;
  const fromInfo = FORMAT_DETAILS[p.from] || {
    name: fromName,
    fullName: `${fromName} Image`,
    extension: `.${p.from}`,
    compression: "Standard",
    transparency: "Varies",
    typicalSize: "Medium",
    colorDepth: "24-bit",
    bestFor: "General image use",
    browserSupport: "Standard",
  };
  const toInfo = FORMAT_DETAILS[p.to] || {
    name: toName,
    fullName: `${toName} Image`,
    extension: `.${p.to}`,
    compression: "Standard",
    transparency: "Varies",
    typicalSize: "Medium",
    colorDepth: "24-bit",
    bestFor: "General image use",
    browserSupport: "Standard",
  };
  const pairData = getPairContent(slug, p.from, p.to);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Image Converter", url: `${SITE}/converter` },
          { name: title, url: `${SITE}/converter/${slug}` },
        ]}
      />
      {p.supported && (
        <WebAppSchema
          name={`${title} Converter`}
          url={`${SITE}/converter/${slug}`}
          description={`Convert ${fromName} images to ${toName} directly in your browser with zero server uploads.`}
          dateModified="2026-10-21"
        />
      )}
      {p.supported && <FAQPageSchema questions={pairData.faqs} />}

      <div className="max-w-[960px] w-full mx-auto px-5 pt-6">
        <Link href="/converter" className="text-[var(--accent)] underline inline-flex items-center gap-1 text-sm mb-2">
          &larr; All image conversions
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight my-2 text-[#e6edf5]">
          {title}
          {p.supported ? " Converter" : " Export is Currently Unavailable"}
        </h1>
        <p className="text-[#8d9aaa] leading-relaxed mb-4 max-w-[760px]">
          {p.supported
            ? `Convert ${fromName} images into ${toName} format directly on your device. Adjust compression quality, preserve visual clarity, and download your converted files instantly — 100% private with no server uploads or signups required.`
            : `${toName} output is temporarily disabled until a reliable encoder is available. Choose a supported alternative on our converter page.`}
        </p>
      </div>

      {p.supported && (
        <ConverterTool
          key={slug}
          initialFormat={p.output as OutputFormat}
          inputFormat={p.from}
          showHeading={false}
        />
      )}

      <ToolLinks current="/converter" />

      {p.supported && (
        <section className="w-full min-w-0 max-w-[960px] mx-auto px-5 pb-16 text-[#8d9aaa] leading-relaxed">
          {/* How to Convert in 3 Steps */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#e6edf5] mb-4">
              How to Convert {fromName} to {toName} Online
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--accent)] font-bold text-sm mb-3">
                  1
                </span>
                <h3 className="text-sm font-extrabold text-[#e6edf5] mb-2">Upload {fromName} Image</h3>
                <p className="text-sm text-[#8d9aaa] m-0">
                  Drag and drop your {fromName} files into the box above, or click Browse to select files from your computer or phone.
                </p>
              </div>

              <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--accent)] font-bold text-sm mb-3">
                  2
                </span>
                <h3 className="text-sm font-extrabold text-[#e6edf5] mb-2">Adjust Settings</h3>
                <p className="text-sm text-[#8d9aaa] m-0">
                  {toName} format is pre-selected. Fine-tune the quality slider if desired to balance visual sharpness and file weight.
                </p>
              </div>

              <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--accent)] font-bold text-sm mb-3">
                  3
                </span>
                <h3 className="text-sm font-extrabold text-[#e6edf5] mb-2">Convert &amp; Download</h3>
                <p className="text-sm text-[#8d9aaa] m-0">
                  Click Convert All to process your files in seconds. Download your converted {toName} files individually or as a single batch.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Comparison Table */}
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-12">
            <h2 className="text-lg font-bold text-[#e6edf5] mb-2">
              {fromName} vs {toName}: Format Comparison
            </h2>
            <p className="text-sm text-[#8d9aaa] mb-4">
              Compare the technical specifications, compression mechanisms, and ideal use cases between {fromName} and {toName}.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)] text-[#e6edf5]">
                    <th className="py-2.5 pr-4 font-bold">Feature</th>
                    <th className="py-2.5 px-4 font-bold">{fromName}</th>
                    <th className="py-2.5 pl-4 font-bold">{toName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[0.875rem]">
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-[#c8d4e0]">Full Format Name</td>
                    <td className="py-2.5 px-4">{fromInfo.fullName}</td>
                    <td className="py-2.5 pl-4">{toInfo.fullName}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-[#c8d4e0]">File Extension</td>
                    <td className="py-2.5 px-4 font-mono text-xs">{fromInfo.extension}</td>
                    <td className="py-2.5 pl-4 font-mono text-xs">{toInfo.extension}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-[#c8d4e0]">Compression Type</td>
                    <td className="py-2.5 px-4">{fromInfo.compression}</td>
                    <td className="py-2.5 pl-4">{toInfo.compression}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-[#c8d4e0]">Transparency Support</td>
                    <td className="py-2.5 px-4">{fromInfo.transparency}</td>
                    <td className="py-2.5 pl-4">{toInfo.transparency}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-[#c8d4e0]">Typical File Size</td>
                    <td className="py-2.5 px-4">{fromInfo.typicalSize}</td>
                    <td className="py-2.5 pl-4">{toInfo.typicalSize}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-[#c8d4e0]">Best Used For</td>
                    <td className="py-2.5 px-4">{fromInfo.bestFor}</td>
                    <td className="py-2.5 pl-4">{toInfo.bestFor}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Convert - Key Advantages */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#e6edf5] mb-3">{pairData.headline}</h2>
            <p className="text-sm text-[#8d9aaa] leading-relaxed mb-6">{pairData.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pairData.whyConvert.map((item) => (
                <div
                  key={item.title}
                  className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5"
                >
                  <h3 className="text-sm font-extrabold text-[#e6edf5] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#8d9aaa] leading-relaxed m-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Browser Execution Guarantee */}
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-12">
            <h2 className="text-lg font-bold text-[#e6edf5] mb-2">
              100% Client-Side Privacy: Your Photos Never Leave Your Device
            </h2>
            <p className="text-sm text-[#8d9aaa] leading-relaxed m-0">
              Unlike cloud-based file conversion services that upload your personal or proprietary media to remote servers, SquarePic performs all image decoding, manipulation, and encoding locally in your web browser via HTML5 Canvas. Your photos never travel over the network to external storage. This architecture delivers instantaneous processing speed, eliminates bandwidth quotas, and guarantees strict privacy for your confidential images.
            </p>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#e6edf5] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {pairData.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5"
                >
                  <h3 className="text-sm font-bold text-[#e6edf5] mb-2">{faq.question}</h3>
                  <p className="text-sm text-[#8d9aaa] leading-relaxed m-0">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Conversions */}
          <div>
            <h2 className="text-lg font-bold text-[#e6edf5] mb-3">
              Other Conversions for {fromName} Images
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {PAIRS.filter((candidate) => {
                const alternative = pair(candidate);
                return alternative?.supported && alternative.from === p.from && candidate !== slug;
              }).map((candidate) => (
                <li key={candidate}>
                  <Link href={`/converter/${candidate}`} className="text-[var(--accent)] hover:underline">
                    {fromName} to {label(candidate.split("-to-")[1])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
