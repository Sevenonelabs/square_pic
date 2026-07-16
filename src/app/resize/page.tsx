import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Photos for Social Media | SquarePic",
  description: "Resize your photos to the exact dimensions required by Instagram, Facebook, LinkedIn, Twitter/X, TikTok, and more. Free, no uploads.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://squarepic.io/resize" },
};

export default function ResizePage() {
  permanentRedirect("/");
}
