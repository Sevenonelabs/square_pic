const SITE = process.env.SITE_URL || "https://www.squarepic.io";

const IMAGE_ENTRIES = [
  { page: "", image: "/og/og-home.png", title: "SquarePic - Free Square Image Maker", caption: "Make any image square online without cropping" },
  { page: "/compressor", image: "/og/og-compressor.png", title: "SquarePic Image Compressor", caption: "Reduce JPG, PNG and WebP file sizes without losing quality" },
  { page: "/converter", image: "/og/og-converter.png", title: "SquarePic Image Converter", caption: "Convert between JPG, PNG, WebP, AVIF, GIF and ICO" },
  { page: "/cropper", image: "/og/og-cropper.png", title: "SquarePic Image Cropper", caption: "Precision crop with aspect ratio lock" },
  { page: "/upscaler", image: "/og/og-upscaler.png", title: "SquarePic HD Image Upscaler", caption: "Upscale images 2x, 3x or 4x with smart sharpening" },
  { page: "/about", image: "/images/logo-256.png", title: "SquarePic Logo", caption: "SquarePic logo" },
  { page: "/guides/social-media-image-sizes-2026", image: "/og/og-social-media-image-sizes.png", title: "Social Media Image Sizes 2026", caption: "Complete cheat sheet for every major platform" },
  { page: "/guides/instagram-feed-sizes-2026", image: "/og/og-instagram-feed-sizes.png", title: "Instagram Image Sizes 2026", caption: "Feed, carousel and profile picture dimensions" },
  { page: "/guides/facebook-image-sizes-2026", image: "/og/og-facebook-image-sizes.png", title: "Facebook Image Sizes 2026", caption: "Cover photo, profile and post dimensions" },
  { page: "/guides/pinterest-image-sizes-2026", image: "/og/og-pinterest-image-sizes.png", title: "Pinterest Image Sizes 2026", caption: "Pin dimensions and board cover guide" },
  { page: "/guides/discord-image-sizes-2026", image: "/og/og-discord-image-sizes.png", title: "Discord Image Sizes 2026", caption: "Server icon, banner and emoji guide" },
  { page: "/guides/linkedin-image-sizes-2026", image: "/og/og-linkedin-image-sizes.png", title: "LinkedIn Image Sizes 2026", caption: "Banner, profile and post dimensions" },
  { page: "/guides/youtube-banner-thumbnail-sizes-2026", image: "/og/og-youtube-banner-thumbnail.png", title: "YouTube Banner & Thumbnail Sizes 2026", caption: "Channel art, profile and video specs" },
  { page: "/guides/tiktok-image-sizes-2026", image: "/og/og-tiktok-image-sizes.png", title: "TikTok Image Sizes 2026", caption: "Profile, video and story dimensions" },
  { page: "/guides/instagram-reels-stories-guide", image: "/og/og-instagram-reels-stories.png", title: "Instagram Reels & Stories Guide", caption: "Dimensions, safe zones and format tips" },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${IMAGE_ENTRIES.map(
  (e) => `  <url>
    <loc>${SITE}${e.page}</loc>
    <image:image>
      <image:loc>${SITE}${e.image}</image:loc>
      <image:title>${e.title}</image:title>
      <image:caption>${e.caption}</image:caption>
    </image:image>
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
