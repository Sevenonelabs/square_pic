import type { Metadata } from "next";
import { ConverterTool } from "@/components/converter/converter-tool";
import { BreadcrumbSchema } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Image Converter - JPG, PNG & WebP",
  description: "Convert images to JPG, PNG, or WebP formats online for free. Batch convert multiple images at once with no uploads required.",
  openGraph: { title: "Free Image Converter - JPG, PNG & WebP | SquarePic" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function ConverterPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Converter", url: `${SITE}/converter` }]} />
      <ConverterTool />
      <ToolLinks current="/converter" />
    </>
  );
}
