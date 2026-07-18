const SITE = process.env.SITE_URL || "https://www.squarepic.io";

const IMAGE_ENTRIES = [
  { page: "", images: ["/squareframe_preview.png", "/images/logo-256.png"] },
  { page: "/compressor", images: ["/squareframe_preview.png"] },
  { page: "/converter", images: ["/squareframe_preview.png"] },
  { page: "/cropper", images: ["/squareframe_preview.png"] },
  { page: "/about", images: ["/images/logo-256.png"] },
  { page: "/blog", images: ["/squareframe_preview.png"] },
  { page: "/guides/social-media-image-sizes-2026", images: ["/squareframe_preview.png"] },
  { page: "/research/image-compression-benchmarks", images: ["/squareframe_preview.png"] },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${IMAGE_ENTRIES.map(
  (e) => `  <url>
    <loc>${SITE}${e.page}</loc>
${e.images.map((img) => `    <image:image>
      <image:loc>${SITE}${img}</image:loc>
    </image:image>`).join("\n")}
  </url>`
).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
