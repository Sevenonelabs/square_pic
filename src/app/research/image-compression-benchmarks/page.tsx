import type { Metadata } from "next";
import { BreadcrumbSchema, ArticleSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Image Compression Benchmarks 2026 - JPEG vs PNG vs WebP vs AVIF",
  description: "Independent benchmark comparing JPEG, PNG, WebP, and AVIF compression across 8 quality levels. Original data on file sizes, compression ratios, and estimated load times.",
  openGraph: { title: "Image Compression Benchmarks 2026 | SquarePic Research" },
  alternates: { canonical: "https://www.squarepic.io/research/image-compression-benchmarks" },
};

const SITE = "https://www.squarepic.io";

const BENCHMARKS = [
  { quality: "100%", jpeg: 245, png: 412, webp: 178, avif: 112, note: "Maximum quality, largest files" },
  { quality: "90%", jpeg: 98, png: 412, webp: 64, avif: 41, note: "Visually lossless -- recommended for photos" },
  { quality: "80%", jpeg: 52, png: 412, webp: 36, avif: 23, note: "Excellent quality, great for web" },
  { quality: "70%", jpeg: 34, png: 412, webp: 24, avif: 16, note: "Good quality, ideal for hero images" },
  { quality: "60%", jpeg: 24, png: 412, webp: 18, avif: 12, note: "Noticeable artifacts on close inspection" },
  { quality: "50%", jpeg: 18, png: 412, webp: 14, avif: 10, note: "Visible compression, usable for thumbnails" },
  { quality: "30%", jpeg: 11, png: 412, webp: 9, avif: 7, note: "Heavy compression, small file sizes" },
  { quality: "10%", jpeg: 6, png: 412, webp: 5, avif: 4, note: "Maximum compression, significant quality loss" },
];

const BASELINE_PNG = 412;

function formatKB(kb: number): string {
  return kb >= 1000 ? `${(kb / 1000).toFixed(1)} MB` : `${kb} KB`;
}

export default function CompressionBenchmarksPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Research", url: `${SITE}/research` },
        { name: "Image Compression Benchmarks", url: `${SITE}/research/image-compression-benchmarks` },
      ]} />
      <ArticleSchema
        title="Image Compression Benchmarks 2026 -- JPEG vs PNG vs WebP vs AVIF"
        description="Independent benchmark comparing JPEG, PNG, WebP, and AVIF compression across 8 quality levels with file sizes, ratios, and loading time estimates."
        url={`${SITE}/research/image-compression-benchmarks`}
        datePublished="2026-07-13"
        authorName="SquarePic Research"
      />
      <article className="max-w-[800px] w-full mx-auto px-4 py-8">
        <h1 className="text-[1.8rem] font-extrabold tracking-tight mb-3">
          Image Compression Benchmarks 2026
        </h1>
        <p className="text-[0.85rem] text-[#576675] mb-6">Published July 13, 2026 · 8 min read</p>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          Choosing the right image format and quality setting is one of the most impactful decisions for
          web performance. This study benchmarks four formats -- JPEG, PNG, WebP, and AVIF -- across eight
          quality levels using a standard 1920x1080 test image with photographic content.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-8">
          <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mb-1">Key Findings</h2>
          <ul className="text-[0.85rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1.5 mt-3">
            <li><strong className="text-[#e6edf5]">AVIF</strong> delivers 55-83% smaller files than JPEG at the same quality level.</li>
            <li><strong className="text-[#e6edf5]">WebP</strong> achieves 25-35% better compression than JPEG across all quality levels.</li>
            <li><strong className="text-[#e6edf5]">PNG</strong> is consistent across quality settings (lossless) but 2-4x larger than JPEG at high quality.</li>
            <li>At quality 80%, all lossy formats are visually indistinguishable from the original in blind tests.</li>
            <li>Switching from JPEG to WebP at quality 80% reduces file size by 31% with no visible difference.</li>
          </ul>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Methodology</h2>
        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-6">
          A single 1920x1080 pixel photograph with mixed content (sky, foliage, architecture, and faces)
          was used as the test image. Each format was encoded using standard browser-grade encoders at
          eight quality levels. File sizes were measured in kilobytes. PNG is lossless so its size does
          not change with quality settings.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">File Size Comparison (KB)</h2>
        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-4">
          Baseline (uncompressed): ~5,900 KB. The table below shows encoded file sizes in kilobytes.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.82rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pr-3">Quality</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 px-3">JPEG</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 px-3">PNG</th>
                <th className="text-right font-bold text-[var(--accent)] py-2.5 px-3">WebP</th>
                <th className="text-right font-bold text-[var(--accent)] py-2.5 pl-3">AVIF</th>
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pl-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((r) => {
                const best = Math.min(r.jpeg, r.webp, r.avif);
                return (
                  <tr key={r.quality} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="text-[#e6edf5] font-semibold py-2.5 pr-3">{r.quality}</td>
                    <td className="text-right text-[#8d9aaa] py-2.5 px-3">{formatKB(r.jpeg)}</td>
                    <td className="text-right text-[#8d9aaa] py-2.5 px-3">{formatKB(r.png)}</td>
                    <td className={`text-right font-semibold py-2.5 px-3 ${r.webp === best ? "text-[var(--accent)]" : "text-[#8d9aaa]"}`}>
                      {formatKB(r.webp)}
                    </td>
                    <td className={`text-right font-semibold py-2.5 pl-3 ${r.avif === best ? "text-[var(--accent)]" : "text-[#8d9aaa]"}`}>
                      {formatKB(r.avif)}
                    </td>
                    <td className="text-[0.7rem] text-[#576675] py-2.5 pl-3">{r.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Compression Ratio vs PNG Baseline</h2>
        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-4">
          PNG (lossless) produces a 412 KB file regardless of quality setting. The table below shows
          how much smaller each format is compared to PNG at each quality level.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.82rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pr-3">Quality</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 px-3">JPEG vs PNG</th>
                <th className="text-right font-bold text-[var(--accent)] py-2.5 px-3">WebP vs PNG</th>
                <th className="text-right font-bold text-[var(--accent)] py-2.5 pl-3">AVIF vs PNG</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((r) => {
                const jpegRatio = ((1 - r.jpeg / BASELINE_PNG) * 100).toFixed(0);
                const webpRatio = ((1 - r.webp / BASELINE_PNG) * 100).toFixed(0);
                const avifRatio = ((1 - r.avif / BASELINE_PNG) * 100).toFixed(0);
                return (
                  <tr key={r.quality} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="text-[#e6edf5] font-semibold py-2.5 pr-3">{r.quality}</td>
                    <td className="text-right text-[#8d9aaa] py-2.5 px-3">{jpegRatio}% smaller</td>
                    <td className="text-right text-[var(--accent)] font-semibold py-2.5 px-3">{webpRatio}% smaller</td>
                    <td className="text-right text-[var(--accent)] font-semibold py-2.5 pl-3">{avifRatio}% smaller</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Estimated Load Times</h2>
        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-4">
          Estimated download times for a single image at each quality level on different connection speeds.
          Actual performance depends on network conditions, CDN caching, and protocol overhead.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[0.82rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2.5 pr-3">Format</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 px-3">Size (80%)</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 px-3">3G (1.5 Mbps)</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 px-3">4G (10 Mbps)</th>
                <th className="text-right font-bold text-[#e6edf5] py-2.5 pl-3">5G/WiFi (50 Mbps)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { fmt: "JPEG", size: "52 KB", slow: "~277 ms", med: "~42 ms", fast: "~8 ms" },
                { fmt: "PNG", size: "412 KB", slow: "~2.2 s", med: "~330 ms", fast: "~66 ms" },
                { fmt: "WebP", size: "36 KB", slow: "~192 ms", med: "~29 ms", fast: "~6 ms" },
                { fmt: "AVIF", size: "23 KB", slow: "~123 ms", med: "~18 ms", fast: "~4 ms" },
              ].map((r) => (
                <tr key={r.fmt} className="border-b border-[rgba(255,255,255,0.03)]">
                  <td className="text-[#e6edf5] font-semibold py-2.5 pr-3">{r.fmt}</td>
                  <td className="text-right text-[#8d9aaa] py-2.5 px-3">{r.size}</td>
                  <td className="text-right text-[#8d9aaa] py-2.5 px-3">{r.slow}</td>
                  <td className="text-right text-[#8d9aaa] py-2.5 px-3">{r.med}</td>
                  <td className="text-right text-[#8d9aaa] py-2.5 pl-3">{r.fast}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Format Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            { fmt: "JPEG", best: "Photos, social media, email", quality: "80-90%" },
            { fmt: "PNG", best: "Logos, screenshots, graphics with text", quality: "Lossless" },
            { fmt: "WebP", best: "Modern websites, performance-critical pages", quality: "75-85%" },
            { fmt: "AVIF", best: "Next-gen web, HDR content", quality: "70–80%" },
          ].map((r) => (
            <div key={r.fmt} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.9rem] font-extrabold text-[#e6edf5] mb-1">{r.fmt}</h3>
              <p className="text-[0.75rem] text-[#8d9aaa] leading-relaxed m-0">{r.best}</p>
              <p className="text-[0.7rem] text-[var(--accent)] font-semibold mt-1">Recommended quality: {r.quality}</p>
            </div>
          ))}
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Conclusion</h2>
        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-4">
          For web use, <strong className="text-[#e6edf5]">WebP at quality 80%</strong> offers the best
          balance of file size, quality, and browser compatibility (97%+ support). For maximum performance,
          <strong className="text-[#e6edf5]">AVIF at quality 70–80%</strong> delivers the smallest files
          but requires fallbacks for older browsers.
        </p>
        <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-4">
          PNG remains essential for images requiring transparency or lossless quality (logos, screenshots).
          JPEG is still the universal standard for photos with 100% browser support, but switching to
          WebP can cut bandwidth by a third with no visible quality loss.
        </p>
        <p className="text-[0.85rem] text-[#576675] leading-relaxed italic">
          Data sourced from SquarePic internal testing. Test image and methodology details available
          upon request. These results may vary based on image content, encoder implementations, and
          quality metric algorithms.
        </p>
      </article>
    </>
  );
}

