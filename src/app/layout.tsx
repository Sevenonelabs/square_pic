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
    default: "Make a Photo Square Online for Free | SquarePic",
    template: "%s | SquarePic",
  },
    description: "SquarePic is a free online tool that crops and creates photos into square format for social media like Facebook, Instagram, and WhatsApp profile pictures. Add backgrounds, blur, or fill — no uploads, no signup.",
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/logo-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-256.png", sizes: "256x256" }],
  },
  metadataBase: new URL(process.env.SITE_URL || "https://www.squarepic.io"),
  openGraph: {
    type: "website",
    siteName: "SquarePic",
    locale: "en_US",
  description: "SquarePic is a free online tool that crops and creates photos into square format for social media like Facebook, Instagram, and WhatsApp profile pictures. Add backgrounds, blur, or fill — no uploads, no signup.",
    images: [{ url: "/squareframe_preview.png", width: 1200, height: 630, alt: "SquarePic - Free online square image maker and photo editor" }],
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
        <script async src="https://startupbar.co/widget/loader.js" data-startup-id="1a065196-b7e8-4bec-9e25-1af9492b9cc0"></script>
      </head>
      <body className="min-h-dvh flex flex-col pt-[96px] max-md:pt-[88px]">
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

