import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Square Photo Editor - Make Images Square Online",
  description: "Make any photo square for Instagram and social media. Free online square image editor with blur backgrounds, solid color fills, and smart crop. No uploads.",
  openGraph: { title: "Square Photo Editor - Make Images Square Online | SquarePic" },
  alternates: { canonical: "https://squarepic.io/edit" },
};

export default function EditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
