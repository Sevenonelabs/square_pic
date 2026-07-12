import type { Metadata } from "next";
import { CropperTool } from "@/components/cropper/cropper-tool";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Online Photo Cropper - Perfect Crop",
  description: "Crop photos online for free with precision controls. Aspect ratio presets, zoom, pan, and export to JPEG, PNG, or WebP.",
  openGraph: { title: "Free Online Photo Cropper - Perfect Crop | SquarePic" },
  alternates: { canonical: "https://squarepic-next.vercel.app/cropper" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function CropperPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Photo Cropper", url: `${SITE}/cropper` }]} />
      <WebAppSchema name="SquarePic - Photo Cropper" url={SITE + "/cropper"} description="Crop photos online with precision. 8 drag handles, aspect ratio lock, zoom and pan, export to JPEG, PNG, or WebP." />
      <CropperTool />
      <ToolLinks current="/cropper" />
    </>
  );
}
