import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Privacy Policy - SquarePic Free Online Image Editor",
  description: "Your privacy matters. Read the SquarePic privacy policy to understand how we handle your data and images. No uploads, no tracking.",
  openGraph: { title: "Privacy Policy - SquarePic Free Online Image Editor" },
  alternates: { canonical: "https://www.squarepic.io/privacy" },
};

const SITE = "https://www.squarepic.io";

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
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic does not collect, store, or transmit your images. All image processing happens entirely within your web browser using the HTML5 Canvas API. Your photos never leave your device.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">2</span>
          Local Storage
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          We use localStorage to remember your accent color preference (theme). This data stays on your device and is never sent to our servers. No cookies are used for tracking purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">3</span>
          Analytics
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          We use Google Analytics (GA4) and Google Tag Manager to collect anonymous usage statistics. This helps us understand which tools are most popular and improve the site. No personal information or image data is collected.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">4</span>
          Data Retention
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          We do not store or retain any images you process through SquarePic. All image data exists only in your browser&apos;s memory during the editing session and is permanently deleted when you close the page. Your images are never transmitted over the network.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">5</span>
          Contact
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          If you have questions about this privacy policy, please visit our <a href="/faq" className="text-[var(--accent)] no-underline hover:underline">FAQ page</a> or <a href="/support" className="text-[var(--accent)] no-underline hover:underline">contact support</a>. We are committed to protecting your privacy and being transparent about how SquarePic works.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Email:</strong> <a href="mailto:support@squarepic.io" className="text-[var(--accent)] no-underline hover:underline">support@squarepic.io</a>
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Project:</strong> <a href="https://github.com/Sevenonelabs/square_pic" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">github.com/Sevenonelabs/square_pic</a>
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
          <strong className="text-[#e6edf5]">Organization:</strong> SevenOneLabs
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">✓</span>
          Privacy Guarantees
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {[
            { label: "HTTPS Everywhere", desc: "All connections are encrypted. No image data is transmitted." },
            { label: "No Third-Party Scripts", desc: "We do not use third-party scripts that can access your images." },
            { label: "Open Source Code", desc: "Our entire codebase is public and auditable on GitHub." },
            { label: "No User Tracking", desc: "We never track, fingerprint, or profile individual users." },
          ].map((item) => (
            <div key={item.label} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.8rem] font-extrabold text-[#e6edf5] mb-1">{item.label}</h3>
              <p className="text-[0.75rem] text-[#8d9aaa] leading-relaxed m-0">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}

