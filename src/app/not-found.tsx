import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist. Try our free square image editor, image converter, or image compressor instead.",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-[600px]">
        <div className="text-[5rem] font-extrabold leading-none text-[var(--accent)] mb-4">404</div>
        <h1 className="text-[1.75rem] font-extrabold mb-4">This page doesn&apos;t exist</h1>
        <p className="text-[1rem] text-[#8d9aaa] mb-8 max-w-[400px] mx-auto leading-relaxed">
          The link you followed might be broken, or the page may have been moved. Try one of our free tools below instead.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="inline-flex items-center justify-center bg-[var(--accent)] text-black px-8 py-3 rounded-md text-base font-extrabold no-underline shadow-[0_4px_16px_var(--accent-glow)] transition-all hover:brightness-110">
            Square Image Editor
          </Link>
          <Link href="/converter" className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] text-[#8d9aaa] px-8 py-3 rounded-md text-base font-semibold border border-[rgba(255,255,255,0.06)] no-underline transition-all hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.06)]">
            Image Converter
          </Link>
          <Link href="/compressor" className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] text-[#8d9aaa] px-8 py-3 rounded-md text-base font-semibold border border-[rgba(255,255,255,0.06)] no-underline transition-all hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.06)]">
            Image Compressor
          </Link>
        </div>
      </div>
    </div>
  );
}
