import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Privacy Policy - Free Online Image Editor",
  description: "Your privacy matters. Read the SquarePic privacy policy to understand how we handle your data and images. No uploads, no tracking.",
  openGraph: { title: "Privacy Policy - Free Online Image Editor | SquarePic" },
};

const SITE = "https://squarepic-next.vercel.app";

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Privacy Policy", url: `${SITE}/privacy` }]} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-center text-[0.72rem] text-[#576675] mb-6">Last updated: June 2026</p>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">1</span>
          No Data Collection
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic does not collect, store, or transmit your images. All image processing happens entirely within your web browser using the HTML5 Canvas API. Your photos never leave your device.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">2</span>
          Local Storage
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          We use localStorage to remember your accent color preference (theme). This data stays on your device and is never sent to our servers. No cookies are used for tracking purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">3</span>
          Analytics
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          We use Google Analytics (GA4) and Google Tag Manager to collect anonymous usage statistics. This helps us understand which tools are most popular and improve the site. No personal information or image data is collected.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">4</span>
          Third-Party Services
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          We use Google Fonts for typography. Google may collect usage data as described in their privacy policy. We do not use any other third-party services that process your data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">5</span>
          Data Retention
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          We do not store or retain any images you process through SquarePic. All image data exists only in your browser's memory during the editing session and is permanently deleted when you close the page. Your images are never transmitted over the network.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">6</span>
          Contact
        </h2>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-4">
          If you have questions about this privacy policy, please visit our FAQ page or contact us through the support page. We are committed to protecting your privacy and being transparent about how SquarePic works.
        </p>
      </section>
    </div>
    </>
  );
}
