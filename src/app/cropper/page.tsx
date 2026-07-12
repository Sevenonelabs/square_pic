import type { Metadata } from "next";
import { CropperTool } from "@/components/cropper/cropper-tool";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Free Online Photo Cropper - Perfect Crop",
  description: "Crop photos online for free with precision controls. Aspect ratio presets, zoom, pan, and export to JPEG, PNG, or WebP.",
  openGraph: { title: "Free Online Photo Cropper - Perfect Crop | SquarePic" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function CropperPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Photo Cropper", url: `${SITE}/cropper` }]} />
      <CropperTool />
    </>
  );
}
