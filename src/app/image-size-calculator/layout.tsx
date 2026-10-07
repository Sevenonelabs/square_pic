import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  "title": "Image Size Calculator & Aspect Ratios",
  "description": "Find image dimensions and aspect ratios for social media. Search by pixel size or browse platform presets for posts, profiles, and banners.",
  "path": "/image-size-calculator",
  "image": "/og/og-social-media-image-sizes.png"
});

export default function ImageSizeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
