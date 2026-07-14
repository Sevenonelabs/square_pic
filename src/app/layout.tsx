import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Syne_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrgSchema } from "@/components/schema-scripts";

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
  title: {
    default: "Free Square Image Maker - Resize Photos Online | SquarePic",
    template: "%s | SquarePic",
  },
  description: "Make any photo square for Instagram. Free online image resizer with blur backgrounds, solid fills, and smart crop. No uploads, no watermarks.",
  icons: { icon: "/images/favicon.svg" },
  metadataBase: new URL(process.env.SITE_URL || "https://squarepic.io"),
  openGraph: {
    type: "website",
    siteName: "SquarePic",
    locale: "en_US",
    images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syneMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-dvh flex flex-col pt-[60px] max-md:pt-[52px]">
        <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TFGGLL8S');`,
        }} />
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

