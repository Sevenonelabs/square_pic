import { SITE_URL as SITE } from "@/lib/constants";

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (char) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[char]!);
}

const IMAGE_ENTRIES = [
  { page: "", image: "/og/og-home.png" },
  { page: "/compressor", image: "/og/og-compressor.png" },
  { page: "/converter", image: "/og/og-converter.png" },
  { page: "/cropper", image: "/og/og-cropper.png" },
  { page: "/upscaler", image: "/og/og-upscaler.png" },
  { page: "/about", image: "/images/logo-256.png" },
  { page: "/guides/social-media-image-sizes-2026", image: "/og/og-social-media-image-sizes.png" },
  { page: "/guides/instagram-feed-sizes-2026", image: "/og/og-instagram-feed-sizes.png" },
  { page: "/guides/facebook-image-sizes-2026", image: "/og/og-facebook-image-sizes.png" },
  { page: "/guides/pinterest-image-sizes-2026", image: "/og/og-pinterest-image-sizes.png" },
  { page: "/guides/discord-image-sizes-2026", image: "/og/og-discord-image-sizes.png" },
  { page: "/guides/linkedin-image-sizes-2026", image: "/og/og-linkedin-image-sizes.png" },
  { page: "/guides/youtube-banner-thumbnail-sizes-2026", image: "/og/og-youtube-banner-thumbnail.png" },
  { page: "/guides/tiktok-image-sizes-2026", image: "/og/og-tiktok-image-sizes.png" },
  { page: "/guides/instagram-reels-stories-guide", image: "/og/og-instagram-reels-stories.png" },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${IMAGE_ENTRIES.map(
  (e) => `  <url>
    <loc>${escapeXml(e.page ? new URL(e.page, SITE).href : new URL(SITE).origin)}</loc>
    <image:image>
      <image:loc>${escapeXml(new URL(e.image, SITE).href)}</image:loc>
    </image:image>
  </url>`
).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
