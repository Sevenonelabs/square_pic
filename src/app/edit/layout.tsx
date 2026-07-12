import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Square Image Editor - Make Photos Square Online",
  description: "Upload any photo and convert it to a perfect square. Dynamic blur backgrounds or solid fills. No uploads, no watermarks, 100% free.",
  openGraph: { title: "Square Image Editor - Make Photos Square Online | SquarePic" },
  alternates: { canonical: "https://squarepic-next.vercel.app/edit" },
};

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
