import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Size Calculator - Aspect Ratio & Dimensions for Social Media",
  description: "SquarePic is a free online image size calculator. Find the perfect dimensions and aspect ratios for Instagram, Facebook, LinkedIn, YouTube, and more. Search by pixel size or browse platform presets.",
  openGraph: { title: "Image Size Calculator - Aspect Ratio & Dimensions for Social Media | SquarePic", description: "SquarePic is a free online image size calculator. Find perfect dimensions and aspect ratios for Instagram, Facebook, LinkedIn, YouTube, and more." },
  alternates: { canonical: "https://www.squarepic.io/image-size-calculator" },
};

export default function ImageSizeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
