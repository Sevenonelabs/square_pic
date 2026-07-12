import type { Metadata } from "next";
import { CompressorTool } from "@/components/compressor/compressor-tool";
import { BreadcrumbSchema, WebAppSchema } from "@/components/schema-scripts";
import { ToolLinks } from "@/components/layout/tool-links";

export const metadata: Metadata = {
  title: "Free Image Compressor - JPG, PNG & WebP",
  description: "Compress JPG, PNG, and WebP images online without losing quality. Reduce file sizes for faster website loading and easier sharing.",
  openGraph: { title: "Free Image Compressor - JPG, PNG & WebP | SquarePic" },
  alternates: { canonical: "https://squarepic-next.vercel.app/compressor" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function CompressorPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Image Compressor", url: `${SITE}/compressor` }]} />
      <WebAppSchema name="SquarePic - Image Compressor" url={SITE + "/compressor"} description="Compress JPG, PNG, and WebP images online with quality slider or target size mode. Batch compress and download as ZIP." />
      <CompressorTool />
      <ToolLinks current="/compressor" />
    </>
  );
}
