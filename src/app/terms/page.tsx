import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Terms of Service - Free Online Image Editor",
  description: "Review SquarePic's terms of service for using our free online image editor, square photo maker, and image resizer tools.",
  openGraph: { title: "Terms of Service - Free Online Image Editor | SquarePic" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Terms of Service", url: `${SITE}/terms` }]} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-center text-[0.72rem] text-[#576675] mb-6">Last updated: June 2026</p>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">1</span>
          Acceptance of Terms
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          By using SquarePic, you agree to these terms of service. If you do not agree, please do not use our tools.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">2</span>
          Use of Service
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic provides free online image editing tools for personal and commercial use. You may use our tools to edit, resize, crop, and convert images. You are responsible for ensuring you have the rights to edit and use any images you upload.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">3</span>
          No Warranty
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic is provided "as is" without warranty of any kind. While we strive to keep the tools available and functional, we do not guarantee uninterrupted service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">4</span>
          Limitation of Liability
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic shall not be liable for any damages arising from the use or inability to use our tools. All image processing is client-side, and we are not responsible for any data loss.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">5</span>
          Intellectual Property
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic and its tools are provided for free use. You retain all rights to the images you process using our tools. We do not claim any ownership over your content. The SquarePic brand name, logo, and website design are our intellectual property and may not be reproduced without permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">6</span>
          Changes to Terms
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          We reserve the right to update these terms at any time. Continued use of SquarePic after changes constitutes acceptance of the new terms. We encourage you to review this page periodically for any updates.
        </p>
      </section>
    </div>
    </>
  );
}
