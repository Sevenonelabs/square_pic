const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://startupbar.co",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.google.com https://*.google.co.in https://*.g.doubleclick.net https://*.googleusercontent.com https://startupbar.co",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.google.com https://*.google.co.in https://*.g.doubleclick.net https://startupbar.co",
  "frame-src https://startupbar.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Ship the compiled stylesheet in the initial response so first paint
    // does not wait for another request. Element styling stays in CSS classes.
    inlineCss: true,
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Security-Policy", value: CSP },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  redirects: async () => {
    const legacy = [
      { source: "/free-image-compressor", destination: "/compressor", permanent: true },
      { source: "/free-image-converter", destination: "/converter", permanent: true },
      { source: "/free-photo-cropper", destination: "/cropper", permanent: true },
      { source: "/social-media-resizer", destination: "/", permanent: true },
      { source: "/instagram-post-resizer", destination: "/resize/instagram?preset=square", permanent: true },
      { source: "/instagram-profile-picture-resizer", destination: "/resize/instagram?preset=profile", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/blog/how-to-square-image-for-any-platform", destination: "/guides/make-image-square-without-cropping", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/free-square-image-tool", destination: "/", permanent: true },
      { source: "/free-image-resizer", destination: "/", permanent: true },
      { source: "/free-square-image-tool.html", destination: "/", permanent: true },
      { source: "/free-online-photo-resizer", destination: "/", permanent: true },
      { source: "/free-image-optimizer", destination: "/compressor", permanent: true },
      { source: "/resize", destination: "/", permanent: true },
      { source: "/edit", destination: "/", permanent: true },
      { source: "/converter/png-to-jpeg", destination: "/converter/png-to-jpg", permanent: true },
      { source: "/converter/jpeg-to-png", destination: "/converter/jpg-to-png", permanent: true },
      { source: "/converter/jpeg-to-webp", destination: "/converter/jpg-to-webp", permanent: true },
      { source: "/converter/webp-to-jpeg", destination: "/converter/webp-to-jpg", permanent: true },
      { source: "/converter/jpeg-to-gif", destination: "/converter/jpg-to-gif", permanent: true },
    ];
    const apexHost = [{ type: "host" as const, value: "squarepic.io" }];
    return [
      // Combine legacy paths and the canonical host in one redirect.
      ...legacy.map((rule) => ({ ...rule, destination: `https://www.squarepic.io${rule.destination}`, has: apexHost })),
      { source: "/:path*", destination: "https://www.squarepic.io/:path*", permanent: true, has: apexHost },
      ...legacy,
    ];
  },
};

export default nextConfig;
