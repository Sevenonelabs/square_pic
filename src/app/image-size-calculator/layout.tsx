import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Size Calculator - Social Media Dimensions",
  description: "Find the perfect image dimensions for any social media platform. Search by pixel size or browse Instagram, Facebook, Twitter, LinkedIn, and more.",
  openGraph: { title: "Image Size Calculator - Social Media Dimensions | SquarePic" },
  alternates: { canonical: "https://www.squarepic.io/image-size-calculator" },
};

export default function ImageSizeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
