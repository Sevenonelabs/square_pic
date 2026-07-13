import type { Metadata } from "next";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Find answers to common questions about SquarePic. Learn how to make square images, resize photos, and edit pictures online for free.",
  openGraph: { title: "FAQ - Frequently Asked Questions | SquarePic" },
  alternates: { canonical: "https://squarepic-next.vercel.app/faq" },
};

const SITE = "https://squarepic-next.vercel.app";

const FAQS = [
  {
    q: "How do I make a square image online?",
    a: "It is simple. Upload your portrait or landscape photo to SquarePic. The editor will automatically convert the image to square format by adding smart blur or solid color backgrounds. Then, just download your final image.",
  },
  {
    q: "How can I make a square photo without cropping?",
    a: "Instead of cropping out important parts of your photo, SquarePic acts as an image background extension tool. It fills the remaining space in the 1:1 canvas with a blurred version of your image or a solid color, keeping your entire original photo visible.",
  },
  {
    q: "Is this square image maker free?",
    a: "Yes. SquarePic is a free online square image maker. There are no hidden fees, no subscriptions, and no registration required. Full tool access is unlocked for everyone immediately.",
  },
  {
    q: "Does this tool add watermarks?",
    a: "No. We are a no watermark image editor. Your downloaded photos will be completely clean.",
  },
  {
    q: "Are my images uploaded to your server?",
    a: "Never. SquarePic is a privacy-first image editor. Images are not stored on servers, and images are not uploaded to the cloud. Processing happens locally in the browser using HTML5 Canvas, ensuring your user photos remain private.",
  },
  {
    q: "Can I create square Instagram photos here?",
    a: "Yes. SquarePic is the perfect Instagram and Facebook square photo maker. It guarantees your images fit perfectly into the Instagram feed or profile grid without awkward cropping.",
  },
  {
    q: "Do I need an account to use this?",
    a: "No signup or account is required. You can make an image square online instantly without giving us an email address.",
  },
  {
    q: "Which platforms is this tool best for?",
    a: "Square images are ideal when you need to resize images for social media like Instagram grids, LinkedIn posts, Facebook updates, profile pictures, YouTube thumbnails, and product listings on marketplaces.",
  },
];

export default function FAQPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "FAQ", url: `${SITE}/faq` }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-6">Frequently Asked Questions</h1>
      <div className="space-y-5">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">{faq.q}</h3>
            <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
