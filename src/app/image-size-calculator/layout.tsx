import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  "title": "Image Size Calculator: Pixels & Aspect Ratios",
  "description": "Use this calculator to find pixel dimensions, aspect ratios and megapixels. Calculate proportional resize dimensions and matching social media presets.",
  "path": "/image-size-calculator",
  "image": "/og/og-social-media-image-sizes.png"
});

export default function ImageSizeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
