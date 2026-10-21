export interface FormatDetail {
  name: string;
  fullName: string;
  extension: string;
  compression: string;
  transparency: string;
  typicalSize: string;
  colorDepth: string;
  bestFor: string;
  browserSupport: string;
}

export interface PairDetail {
  headline: string;
  summary: string;
  whyConvert: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const FORMAT_DETAILS: Record<string, FormatDetail> = {
  jpg: {
    name: "JPEG",
    fullName: "Joint Photographic Experts Group",
    extension: ".jpg / .jpeg",
    compression: "Lossy (DCT compression)",
    transparency: "No (solid background, fills white)",
    typicalSize: "Small to medium (optimized for web & sharing)",
    colorDepth: "24-bit RGB (16.7 million colors)",
    bestFor: "Photographs, detailed pictures, blog banners, and email attachments",
    browserSupport: "100% universal across all browsers, operating systems, and devices",
  },
  png: {
    name: "PNG",
    fullName: "Portable Network Graphics",
    extension: ".png",
    compression: "Lossless (DEFLATE algorithm)",
    transparency: "Yes (full 8-bit alpha channel)",
    typicalSize: "Medium to large (uncompressed pixel grids)",
    colorDepth: "Up to 32-bit RGBA (16.7M colors + transparency)",
    bestFor: "Logos, transparent graphics, UI screenshots, and diagrams with text",
    browserSupport: "100% universal across all modern web browsers and editing apps",
  },
  webp: {
    name: "WebP",
    fullName: "Web Picture Format (developed by Google)",
    extension: ".webp",
    compression: "Lossy & Lossless (predictive coding)",
    transparency: "Yes (supports alpha in both modes)",
    typicalSize: "Very small (25–35% smaller than JPEG, 50–70% smaller than PNG)",
    colorDepth: "Up to 32-bit RGBA",
    bestFor: "High-performance websites, ecommerce catalogs, and mobile web apps",
    browserSupport: "Over 97% of global web traffic (Chrome, Safari, Firefox, Edge, Opera)",
  },
  ico: {
    name: "ICO",
    fullName: "Microsoft Windows Icon Format",
    extension: ".ico",
    compression: "PNG-backed (lossless raster icon)",
    transparency: "Yes (transparent background support)",
    typicalSize: "Very small (standard dimensions up to 256×256 px)",
    colorDepth: "32-bit RGBA",
    bestFor: "Website favicons, browser tab bookmarks, and desktop application shortcuts",
    browserSupport: "Universal across all web browsers as favicon and Windows OS",
  },
};

const PAIR_CONTENT: Record<string, PairDetail> = {
  "png-to-jpg": {
    headline: "Why Convert PNG to JPEG?",
    summary:
      "PNG files store lossless, uncompressed raster data. While this ensures pixel perfection, photographic and complex images often produce huge file sizes that slow down web pages. Converting PNG to JPEG applies advanced lossy compression to reduce file weight by up to 70–80%, making your images load faster on websites, send quicker in emails, and consume far less disk storage.",
    whyConvert: [
      {
        title: "Slash File Size by Up to 70–80%",
        desc: "JPEG utilizes discrete cosine transform (DCT) compression to remove high-frequency visual details invisible to the human eye, dramatically decreasing file weight compared to raw PNG files.",
      },
      {
        title: "Speed Up Page Loads & Improve Core Web Vitals",
        desc: "Compact JPEG images load much faster on mobile connections, boosting Largest Contentful Paint (LCP) performance scores and keeping site visitors engaged.",
      },
      {
        title: "Universal Hardware & Software Compatibility",
        desc: "JPEG is natively supported by virtually every smartphone, camera, digital picture frame, email platform, and desktop application in existence.",
      },
      {
        title: "Clean Solid White Backgrounds",
        desc: "Because JPEG does not support transparency, transparent or translucent areas are seamlessly composited onto a clean, solid white background.",
      },
    ],
    faqs: [
      {
        question: "Will converting PNG to JPEG reduce image quality?",
        answer:
          "JPEG uses lossy compression, which discards subtle pixel variations to achieve much smaller file sizes. At our default 85% to 92% quality setting, the visual difference is virtually imperceptible to the human eye, while file weight is reduced by up to 70%.",
      },
      {
        question: "What happens to the transparent background in my PNG image?",
        answer:
          "JPEG does not support alpha transparency. Any transparent or translucent areas in your PNG are automatically rendered over a solid white background during conversion.",
      },
      {
        question: "Are my images uploaded to a remote server?",
        answer:
          "No. SquarePic processes all conversions 100% locally in your web browser using the HTML5 Canvas API. Your files are never uploaded to any remote server or cloud database, ensuring complete privacy.",
      },
      {
        question: "Can I convert multiple PNG files to JPEG at once?",
        answer:
          "Yes! You can drag and drop multiple PNG files into the converter and click 'Convert All' to process and download them individually or as a batch.",
      },
      {
        question: "What is the best quality setting for web images?",
        answer:
          "For websites and social media, a quality setting between 80% and 85% offers the ideal balance between crisp visual clarity and compact file size.",
      },
    ],
  },
  "jpg-to-png": {
    headline: "Why Convert JPEG to PNG?",
    summary:
      "JPEG files experience compression artifacts every time they are modified and re-saved. Converting your JPEG images to PNG encapsulates current pixel data into a lossless container, halting generational compression loss during subsequent photo editing, graphic composition, or long-term archiving.",
    whyConvert: [
      {
        title: "Halt Generational Compression Artifacts",
        desc: "Re-saving JPEG files compounds compression noise. Converting to PNG ensures that all future edits and saves preserve exact pixel fidelity without additional loss.",
      },
      {
        title: "Design Tool & Engine Requirements",
        desc: "Many graphic design apps, game development engines, and document publishing platforms require PNG assets to avoid compression ringing around text and borders.",
      },
      {
        title: "Pixel-Perfect Sharpness for Overlays",
        desc: "Decoded pixels are saved without introducing new compression noise or halos around high-contrast edges, making it ideal for graphic layering.",
      },
      {
        title: "Clean Archival Storage",
        desc: "Store your graphics in a lossless, standardized raster format that will never degrade over repeated software transfers.",
      },
    ],
    faqs: [
      {
        question: "Does converting JPEG to PNG restore lost image quality?",
        answer:
          "No. Lossless PNG preserves the exact decoded pixels of your current JPEG image, but it cannot recreate fine textures or details that were discarded during original JPEG compression.",
      },
      {
        question: "Will converting JPEG to PNG make the background transparent?",
        answer:
          "No. JPEG files have solid backgrounds. Converting to PNG retains that solid background. To make a background transparent, you would need to cut out the subject in an image editor.",
      },
      {
        question: "Why is the converted PNG file larger than my original JPEG?",
        answer:
          "PNG uses lossless DEFLATE compression rather than lossy DCT compression. Storing exact pixel values requires more data than lossy approximation, resulting in a larger file.",
      },
      {
        question: "Is there any limit on image dimensions or file size?",
        answer:
          "SquarePic processes images directly in your browser. As long as your computer has enough memory to decode the image in canvas, there are no artificial file size caps.",
      },
    ],
  },
  "jpg-to-webp": {
    headline: "Why Convert JPEG to WebP?",
    summary:
      "WebP is an open, modern image format engineered by Google specifically for the web. WebP delivers state-of-the-art predictive compression, producing files that are on average 25% to 35% smaller than comparable JPEG images while preserving equivalent visual clarity.",
    whyConvert: [
      {
        title: "25–35% Smaller File Sizes",
        desc: "WebP uses advanced predictive coding derived from VP8 video keyframes, creating files roughly a third smaller than standard JPEGs at the same visual quality level.",
      },
      {
        title: "Boost Core Web Vitals & SEO",
        desc: "Smaller web payloads reduce mobile data usage and speed up page load times, directly boosting Google search rankings and mobile conversion rates.",
      },
      {
        title: "Fewer Compression Artifacts",
        desc: "WebP's adaptive block quantization significantly diminishes blockiness and color banding in gradients and smooth backgrounds.",
      },
      {
        title: "Broad Modern Browser Adoption",
        desc: "All modern browsers (Chrome, Safari, Firefox, Edge) natively display WebP, covering more than 97% of worldwide web users.",
      },
    ],
    faqs: [
      {
        question: "Which browsers support WebP images?",
        answer:
          "WebP is natively supported in Google Chrome, Apple Safari (iOS 14+ and macOS Big Sur+), Mozilla Firefox, Microsoft Edge, and Opera — covering over 97% of global web traffic.",
      },
      {
        question: "Does WebP look identical to JPEG?",
        answer:
          "Yes. At equivalent quality settings, WebP matches or exceeds JPEG's perceptual image quality (SSIM metric) while taking up substantially less disk space.",
      },
      {
        question: "Can I use WebP for high-resolution photographs?",
        answer:
          "Yes. WebP supports image dimensions up to 16,383 × 16,383 pixels and 24-bit color, making it an excellent choice for full-width banners, hero shots, and galleries.",
      },
      {
        question: "Does my image leave my computer when converting?",
        answer:
          "Never. All encoding is performed locally inside your browser using client-side Web APIs.",
      },
    ],
  },
  "png-to-webp": {
    headline: "Why Convert PNG to WebP?",
    summary:
      "While PNG has long been the standard for transparent web graphics and logos, its uncompressed file size can severely slow down website load times. WebP offers full 8-bit alpha transparency with modern predictive compression, shrinking transparent graphics by 50% to 70% compared to standard PNGs.",
    whyConvert: [
      {
        title: "Keep Transparency at a Fraction of the Size",
        desc: "WebP supports full 24-bit color with 8-bit alpha transparency just like PNG, but uses advanced entropy coding to reduce file weights by up to 70%.",
      },
      {
        title: "Ideal for Logos, Badges & UI Elements",
        desc: "Transparent website headers, product cutouts, floating badges, and app UI components render instantly without weighing down pages.",
      },
      {
        title: "Significant Bandwidth Savings",
        desc: "Serving WebP instead of PNG cuts bandwidth costs and improves responsiveness for visitors on cellular connections.",
      },
      {
        title: "Pixel-Sharp Edges",
        desc: "Maintain crisp silhouettes and soft shadows on transparent graphics without the heavy file size penalty of legacy PNG files.",
      },
    ],
    faqs: [
      {
        question: "Will converting PNG to WebP preserve transparency?",
        answer:
          "Yes! WebP provides full alpha channel support. Transparent backgrounds, soft shadows, and translucent glows will remain completely intact.",
      },
      {
        question: "How much smaller will the WebP file be compared to PNG?",
        answer:
          "Depending on image complexity, WebP typically reduces PNG file sizes by 50% to 75% for photographic cutouts, and 25% to 40% for flat graphics.",
      },
      {
        question: "Can I convert transparent logos for my website?",
        answer:
          "Absolutely. Modern web development frameworks and performance guidelines recommend WebP as the primary format for transparent web assets.",
      },
      {
        question: "Is there any software installation required?",
        answer:
          "No software or browser extensions are required. SquarePic runs entirely in your browser without signups or downloads.",
      },
    ],
  },
  "webp-to-png": {
    headline: "Why Convert WebP to PNG?",
    summary:
      "Although WebP is widespread on the modern web, many desktop design tools, older image editors, office productivity suites, and print vendor upload portals still lack native WebP support. Converting WebP to PNG unlocks universal editing compatibility while maintaining lossless fidelity and transparency.",
    whyConvert: [
      {
        title: "Universal Desktop Compatibility",
        desc: "Open and edit your downloaded web images in legacy versions of Photoshop, Illustrator, Microsoft Word, PowerPoint, and offline image viewers.",
      },
      {
        title: "Preserves Transparency Losslessly",
        desc: "PNG faithfully renders any alpha channel transparency present in the WebP image without compression loss.",
      },
      {
        title: "Ready for Print & Offline Workflows",
        desc: "Print shops and layout programs frequently mandate PNG or TIFF assets over web-first formats.",
      },
      {
        title: "Pixel-Perfect Encoding",
        desc: "Every pixel of the decoded WebP image is preserved exactly in the resulting PNG file.",
      },
    ],
    faqs: [
      {
        question: "Can I edit PNG files in all image editors?",
        answer:
          "Yes. PNG is universally compatible with virtually every graphic software application created in the last 25 years.",
      },
      {
        question: "Will converting WebP to PNG lose quality?",
        answer:
          "No. The conversion decodes the WebP into raw pixel data and encodes it into PNG losslessly, maintaining 100% of the image's existing visual details.",
      },
      {
        question: "Will the transparency be preserved?",
        answer:
          "Yes. Any transparent background in your WebP file will be preserved in the resulting PNG.",
      },
    ],
  },
  "webp-to-jpg": {
    headline: "Why Convert WebP to JPEG?",
    summary:
      "Downloaded a WebP image from the internet and can't open it or send it to someone? Converting WebP to JPEG gives you a universally recognized photo file that works on every smartphone, television, email service, and digital camera frame.",
    whyConvert: [
      {
        title: "Guaranteed Universal Viewing",
        desc: "JPEG is recognized by 100% of devices and software, eliminating 'unsupported file format' errors when sharing photos.",
      },
      {
        title: "Seamless Email & Document Sharing",
        desc: "Attach photos to emails, embed them into Word documents, or upload them to portals that block WebP file extensions.",
      },
      {
        title: "Adjustable File Compression",
        desc: "Easily adjust the quality slider to find the right compromise between visual sharpness and compact file size.",
      },
      {
        title: "Clean Solid White Background",
        desc: "Any transparent areas in the WebP image are automatically filled with clean white, perfect for documents and prints.",
      },
    ],
    faqs: [
      {
        question: "Why do websites use WebP if JPEG is more compatible?",
        answer:
          "Websites use WebP because it is smaller and loads faster for web visitors. Converting to JPEG is ideal when you need to use the image offline or in legacy desktop software.",
      },
      {
        question: "What happens to transparent areas when converting WebP to JPEG?",
        answer:
          "Since JPEG does not support transparency, transparent background pixels are automatically converted to solid white.",
      },
      {
        question: "Can I adjust the output JPEG quality?",
        answer:
          "Yes! You can adjust the quality slider before converting to balance fine details and file size.",
      },
    ],
  },
  "png-to-ico": {
    headline: "Why Convert PNG to ICO?",
    summary:
      "The ICO format is the dedicated standard for Windows icons and website favicons. SquarePic automatically scales your image to fit cleanly within standard 256×256 icon boundaries while maintaining aspect ratio and transparent backgrounds.",
    whyConvert: [
      {
        title: "Instant Website Favicons",
        desc: "Generate standards-compliant .ico files that browsers look for at /favicon.ico to display in browser tabs and bookmarks.",
      },
      {
        title: "Proportional Automatic Resizing",
        desc: "SquarePic automatically scales images down to fit within the standard 256×256 pixel limit without stretching or distorting your artwork.",
      },
      {
        title: "Preserves Clean Silhouettes",
        desc: "PNG-backed ICO files maintain transparency for crisp, professional logos on both light and dark browser themes.",
      },
      {
        title: "Windows Shortcut Icons",
        desc: "Use the resulting .ico file to customize folder icons and application shortcuts on Windows.",
      },
    ],
    faqs: [
      {
        question: "What size does SquarePic use for ICO icons?",
        answer:
          "SquarePic exports a PNG-backed ICO fitting within 256 × 256 pixels, preserving your source aspect ratio.",
      },
      {
        question: "Can I use this ICO as my website favicon?",
        answer:
          "Yes! Rename your downloaded file to favicon.ico and place it in your website root directory or reference it in your HTML head tag.",
      },
      {
        question: "Does it keep transparency?",
        answer:
          "Yes! The ICO encoder preserves the alpha transparency channel from your source PNG.",
      },
    ],
  },
  "jpg-to-ico": {
    headline: "Why Convert JPEG to ICO?",
    summary:
      "Convert your photos or logos into standard ICO format for website favicons and desktop shortcuts. SquarePic automatically scales your image to fit cleanly within 256×256 pixels without distortion.",
    whyConvert: [
      {
        title: "Create Website Favicons",
        desc: "Generate standard .ico files recognized by all web browsers for bookmarks and tabs.",
      },
      {
        title: "Automatic Proportional Scaling",
        desc: "SquarePic automatically fits your image within 256×256 pixels while preserving original proportions.",
      },
      {
        title: "Desktop Application Icons",
        desc: "Easily create custom Windows desktop shortcuts from standard photo files.",
      },
      {
        title: "Fast In-Browser Generation",
        desc: "Create your icon in seconds with zero uploads or external tools.",
      },
    ],
    faqs: [
      {
        question: "What size will the output ICO icon be?",
        answer:
          "The longest edge will be at most 256 pixels, with aspect ratio preserved.",
      },
      {
        question: "Can I use this for my website favicon?",
        answer:
          "Yes, simply place the downloaded .ico file on your web server and link to it in your HTML.",
      },
    ],
  },
};

export function getPairContent(slug: string, from: string, to: string): PairDetail {
  if (PAIR_CONTENT[slug]) {
    return PAIR_CONTENT[slug];
  }
  const fromName = FORMAT_DETAILS[from]?.name || from.toUpperCase();
  const toName = FORMAT_DETAILS[to]?.name || to.toUpperCase();
  return {
    headline: `Why Convert ${fromName} to ${toName}?`,
    summary: `Easily convert ${fromName} images into ${toName} format online. Adjust quality settings, preserve visual clarity, and download your converted files in seconds without server uploads.`,
    whyConvert: [
      {
        title: `Format Flexibility for ${toName}`,
        desc: `Switch to ${toName} to meet target platform requirements, reduce file weight, or ensure compatibility with your software tools.`,
      },
      {
        title: "Fast, Private Browser Processing",
        desc: "Processing happens on your local device with HTML5 Canvas, ensuring complete confidentiality for your files.",
      },
      {
        title: "Zero Registration or Fees",
        desc: "Convert as many images as you need completely free, with no watermarks or file limits.",
      },
    ],
    faqs: [
      {
        question: `How do I convert ${fromName} to ${toName}?`,
        answer: `Simply upload your ${fromName} image, verify the ${toName} output selection, and click Convert to download your file.`,
      },
      {
        question: "Are my files uploaded to your servers?",
        answer:
          "No. All image processing runs locally in your web browser. Your files never leave your device.",
      },
    ],
  };
}
