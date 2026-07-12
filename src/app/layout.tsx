import type { Metadata } from "next";
import { Asap_Condensed, Syne_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const asap = Asap_Condensed({
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
  description: "Make any photo perfectly square for Instagram and social media. Free online image resizer with blur backgrounds, solid fills, and smart crop. No uploads, no watermarks.",
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL(process.env.SITE_URL || "https://squarepic-next.vercel.app"),
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${asap.variable} ${syneMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TFGGLL8S');`,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9TTBK0ZDM5" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-9TTBK0ZDM5');`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col pt-[60px] max-md:pt-[52px]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
