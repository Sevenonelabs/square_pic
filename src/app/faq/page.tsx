import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  "title": "SquarePic FAQ: Image Editing Help",
  "description": "Get answers about making photos square, resizing, cropping, compression, supported formats, and browser processing with SquarePic.",
  "path": "/faq"
});

const FAQS = [
  {
    q: "How do I make a square image online?",
    a: "Upload your photo, choose Blur, Solid or Transparent, and leave Zoom at 100% to keep the whole image. Choose 1080, 1200 or a custom square edge from 1 to 4096 pixels, then select Download & Share.",
  },
  {
    q: "How can I make a square photo without cropping?",
    a: "Choose Blur, Solid or Transparent and leave Zoom at 100%. SquarePic fits your photo inside a 1:1 canvas with added padding. Higher zoom can trim edges, and Crop uses a centered crop.",
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
    a: "Yes. Select a square preset and use Blur or Solid to preserve the full photo at 100% zoom. Instagram can crop grid and profile previews differently, so check the preview before publishing.",
  },
  {
    q: "Do I need an account to use this?",
    a: "No signup or account is required. You can make an image square online instantly without giving us an email address.",
  },
  {
    q: "Which platforms is this tool best for?",
    a: "Square images are ideal when you need to resize images for social media like Instagram grids, LinkedIn posts, Facebook updates, profile pictures, YouTube thumbnails, and product listings on marketplaces.",
  },
  {
    q: "How can I contact support?",
    a: "If you need help or any questions, you can email us at support@squarepic.io. We aim to respond as quickly as possible.",
  },
  {
    q: "What image formats does SquarePic support?",
    a: "The converter exports JPEG, PNG, WebP and ICO. AVIF, BMP, GIF and TIFF output are currently unavailable. Other editors export PNG, JPEG and WebP. Input support depends on your browser's image decoder; animated inputs export one still frame.",
  },
  {
    q: "Can I resize images for specific social media platforms?",
    a: "Yes. SquarePic includes preset dimensions for 13 social media platforms including Instagram, Facebook, Twitter/X, LinkedIn, TikTok, YouTube, Pinterest, Snapchat, WhatsApp, Twitch, Reddit, Telegram, and Discord. Each platform has its specific size requirements built in.",
  },
  {
    q: "Is there a file size limit?",
    a: "Yes, the maximum file size for upload is 20 MB. Most photos and screenshots fall well under this limit. If your file is larger, try compressing it first using our free image compressor tool.",
  },
  {
    q: "Does SquarePic work on mobile devices?",
    a: "Yes. SquarePic works on any modern browser, including Chrome, Safari, Firefox, and Edge on both desktop and mobile devices. The interface adapts to your screen size for a smooth editing experience on phones and tablets.",
  },
  {
    q: "Can I batch process multiple images?",
    a: "Our image compressor supports batch processing -- you can upload multiple files, compress them all at once, and download them individually or as a ZIP archive. The square image editor processes one image at a time for precise control over each result.",
  },
  {
    q: "What is the difference between Blur, Solid, Transparent and Crop?",
    a: "Blur fills empty space with a blurred copy of your photo. Solid uses your chosen background color. Transparent leaves padding empty and selects PNG export. Crop fills the canvas with a centered crop, removing edges when the source has different proportions. It does not detect subjects. The other modes preserve the full photo at 100% zoom.",
  },
  {
    q: "How does SquarePic compare to other image editors?",
    a: "SquarePic is completely free with no signup, no watermarks, and no uploads. All processing happens locally in your browser using HTML5 Canvas, making it one of the fastest and most private options available. Unlike many tools, we never store your images on any server.",
  },
  {
    q: "How do I keep a square logo background transparent?",
    a: "Choose Transparent. The checkerboard preview marks empty space, and PNG export preserves the padding and any transparency in your original logo. This setting does not remove an existing background from the source image.",
  },
  {
    q: "Can I set an exact square image size?",
    a: "Yes. Use the 1080 or 1200 square shortcut, or enter a whole number from 1 to 4096 in Custom square edge in pixels and select Apply. The editor shows actual output dimensions. Original size uses the source's longest side, capped at 4096 pixels with a limit notice.",
  },
];

const SECTIONS = [
  {
    title: "Getting Started",
    items: [0, 1, 2, 3],
  },
  {
    title: "Privacy & Security",
    items: [4, 5, 6],
  },
  {
    title: "Platforms & Formats",
    items: [7, 8, 9, 10],
  },
  {
    title: "Technical Details",
    items: [11, 12, 13, 14, 15, 16, 17],
  },
];

export default function FAQPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "FAQ", url: `${SITE}/faq` }]} />
      <FAQPageSchema questions={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-6">SquarePic FAQ: Image Editing Help</h1>
      {SECTIONS.map((section) => (
        <section key={section.title} className="mb-8">
          <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-3 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">
            {section.title}
          </h2>
          <div className="space-y-5">
            {section.items.map((i) => (
              <div key={i}>
                <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">{FAQS[i].q}</h3>
                <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">{FAQS[i].a}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
    </>
  );
}

