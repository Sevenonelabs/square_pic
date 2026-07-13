import type { Metadata } from "next";
import { HowToSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Square Image Editor - Make Photos Square Online",
  description: "Upload any photo and convert it to a perfect square. Dynamic blur backgrounds or solid fills. No uploads, no watermarks, 100% free.",
  openGraph: { title: "Square Image Editor - Make Photos Square Online | SquarePic" },
  alternates: { canonical: "https://squarepic.io/edit" },
};

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HowToSchema steps={[
        { name: "Upload your image", text: "Click the upload area or drag and drop a photo from your device. Supported formats include JPEG, PNG, WebP, GIF, BMP, and TIFF." },
        { name: "Choose an editing mode", text: "Select between Dynamic Blur (blurred background), Solid Background (custom color fill), or Smart Crop (auto square crop)." },
        { name: "Adjust the settings", text: "Fine-tune blur intensity, padding amount, zoom level, and corner radius. Preview the result in real time." },
        { name: "Export your square image", text: "Click Export Perfect Square and download your image in PNG, JPEG, or WebP format at full quality." },
      ]} />
      {children}
    </>
  );
}

