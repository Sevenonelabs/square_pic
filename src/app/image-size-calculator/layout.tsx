import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Size Calculator - Aspect Ratio & Dimensions for Social Media",
  description: "Find the perfect image dimensions and aspect ratios for Instagram, Facebook, LinkedIn, YouTube, and more. Search by pixel size or browse platform presets.",
  openGraph: { title: "Image Size Calculator - Aspect Ratio & Dimensions for Social Media | SquarePic", description: "Find perfect image dimensions and aspect ratios for Instagram, Facebook, LinkedIn, YouTube, and more." },
  alternates: { canonical: "https://www.squarepic.io/image-size-calculator" },
};

export default function ImageSizeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
