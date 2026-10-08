import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Syne_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrgSchema } from "@/components/schema-scripts";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const syneMono = Syne_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

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
    <html lang="en" className={`${inter.variable} ${syneMono.variable}`}>
      <head>
        <meta name="theme-color" content="#07080b" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-dvh flex flex-col pt-[116px] max-md:pt-[110px]">
        <Script src="https://startupbar.co/widget/loader.js" data-startup-id="1a065196-b7e8-4bec-9e25-1af9492b9cc0" strategy="lazyOnload" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9TTBK0ZDM5" strategy="afterInteractive" />
        <Script id="ga-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-9TTBK0ZDM5');`,
        }} />
        <OrgSchema />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

