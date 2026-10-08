import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ConverterTool } from "@/components/converter/converter-tool";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata = pageMetadata({
  title: "Free Image Converter: JPG, PNG, WebP & ICO",
  description: "Convert images online free to JPG, PNG, WebP or ICO. Adjust quality and download files in your browser. No signup or uploads. GIF and AVIF export unavailable.",
  path: "/converter", image: "/og/og-converter.png",
});

export default function ConverterPage() {
  return <>
    <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Converter", url: `${SITE}/converter` }]} />
    <WebAppSchema name="SquarePic image converter" url={`${SITE}/converter`} description="Convert browser-decodable still images to JPEG, PNG, WebP or one PNG-backed ICO." dateModified="2026-10-08" />
    <ConverterTool />
    <ToolLinks current="/converter" />
    <section className="w-full min-w-0 max-w-[900px] mx-auto px-4 pb-16 text-[#8d9aaa] leading-relaxed">
      <h2 className="text-xl font-bold text-[#e6edf5] mb-4">Choose an output format</h2>
      <div className="overflow-x-auto mb-6"><table className="w-full text-sm text-left">
        <thead><tr><th className="p-2">Output</th><th className="p-2">Dimensions and transparency</th><th className="p-2">Compression</th></tr></thead>
        <tbody>
          <tr><th className="p-2">JPEG</th><td className="p-2">Source dimensions, white behind transparent pixels</td><td className="p-2">Lossy, adjustable quality</td></tr>
          <tr><th className="p-2">PNG</th><td className="p-2">Source dimensions and alpha</td><td className="p-2">Lossless encoding of decoded pixels</td></tr>
          <tr><th className="p-2">WebP</th><td className="p-2">Source dimensions and alpha</td><td className="p-2">Lossy, adjustable quality</td></tr>
          <tr><th className="p-2">ICO</th><td className="p-2">One icon, longest edge at most 256 px, alpha retained</td><td className="p-2">PNG-backed, aspect ratio preserved</td></tr>
        </tbody>
      </table></div>
      <p className="mb-4">AVIF, BMP, GIF and TIFF output are temporarily unavailable. Their previous encoders could produce invalid or mislabeled files. No substitute format is downloaded under those extensions.</p>
      <h2 className="text-xl font-bold text-[#e6edf5] mb-3">Convert and check your result</h2>
      <ol className="list-decimal pl-5 space-y-2 mb-5">
        <li>Select an image your browser can decode. Unsupported or corrupt inputs produce an error.</li>
        <li>Choose the output for each file. JPEG and WebP quality changes can alter visible detail; even 100% is not a lossless mode.</li>
        <li>Click Convert All, then download each result or use Download All for separate files.</li>
      </ol>
      <p className="mb-5">Conversion keeps one still frame of an animated input and does not preserve animation or source metadata. Converting JPEG to PNG does not restore lost detail or remove a background. Images stay on your device; the site also uses analytics as described in our <Link href="/privacy" className="text-[var(--accent)] underline">privacy policy</Link>.</p>
      <h2 className="text-xl font-bold text-[#e6edf5] mb-3">Start with a selected conversion</h2>
      <div className="flex flex-wrap gap-3">{["png-to-jpg", "jpg-to-png", "png-to-webp", "jpg-to-webp", "webp-to-png", "webp-to-jpg", "png-to-ico", "jpg-to-ico"].map((slug) => <Link key={slug} href={`/converter/${slug}`} className="text-[var(--accent)] underline">{slug.replace("-to-", " to ").toUpperCase()}</Link>)}</div>
    </section>
  </>;
}
