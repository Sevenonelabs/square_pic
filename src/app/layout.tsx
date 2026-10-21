import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DeferredGoogleAnalytics } from "@/components/layout/deferred-google-analytics";
import { OrgSchema } from "@/components/schema-scripts";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Square Image Maker: Make an Image Square",
    description: "Make any image square online with blur or a solid background. Keep the full photo without cropping, or crop to fill. Free PNG, JPG and WebP downloads.",
    path: "/",
  }),
  title: {
    default: "Square Image Maker: Make an Image Square | SquarePic",
    template: "%s | SquarePic",
  },
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/logo-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-256.png", sizes: "256x256" }],
  },
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#07080b" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-dvh flex flex-col">
        <DeferredGoogleAnalytics />
        <Script id="ga-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-9TTBK0ZDM5',{allow_google_signals:false,allow_ad_personalization_signals:false});`,
        }} />
        <OrgSchema />
        <a href="#main-content" className="skip-link">Skip to image tools and content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">{children}</main>
        <Footer />
        {process.env.VERCEL === "1" && <Analytics />}
        {process.env.VERCEL === "1" && <SpeedInsights />}
      </body>
    </html>
  );
}

