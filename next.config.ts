const CSP = [
  "default-src 'self'",
  "script-src 'self' 'sha256-PNPK/4YftWOsk75hkcEE1I44Bht1p5BGlZApb+dhXNs=' 'sha256-7D+MUc7yHeafco5WvShveDoJ2HsVnC6gXeCiz5mEx9k=' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  redirects: async () => [
    { source: "/index", destination: "/", permanent: true },
    { source: "/index.html", destination: "/", permanent: true },
    { source: "/free-square-image-tool", destination: "/", permanent: true },
    { source: "/free-image-resizer", destination: "/", permanent: true },
    { source: "/free-square-image-tool.html", destination: "/", permanent: true },
    { source: "/free-online-photo-resizer", destination: "/", permanent: true },
    { source: "/free-image-optimizer", destination: "/compressor", permanent: true },
  ],
};

export default nextConfig;
