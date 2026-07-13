import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog - Image Editing Tips & Tutorials",
    template: "%s | SquarePic Blog",
  },
  description: "Image editing tutorials, social media size guides, privacy tips, and web performance insights from the SquarePic team.",
  openGraph: {
    type: "website",
    siteName: "SquarePic Blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
