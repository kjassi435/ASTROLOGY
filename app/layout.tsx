import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/site";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),
  title: {
    default: "Arvindrun Vnjay | Astrologer • Name Numerology • Vastu Expert",
    template: "%s | Arvin Astro",
  },
  description: BRAND.description,
  keywords: [
    "astrologer",
    "numerologist",
    "vastu expert",
    "name numerology",
    "kundli analysis",
    "kundali reading",
    "Arvindrun Vnjay",
    "Arvin Astro",
    "name designing",
    "vastu consultant",
    "vastu for home",
    "vastu for office",
    "online astrology consultation",
    "numerology consultation",
    "Vastu Shastra",
    "astrology courses",
    "numerology courses",
    "learn vastu online",
    "free astrology course",
    "recorded numerology course",
    "live vastu classes",
    "best astrologer in Greater Noida",
    "name correction numerology",
    "business name numerology",
    "mobile number numerology",
    "newborn baby name astrology",
    "vastu remedies",
    "astrology books",
    "vastu products",
    "cosmic energy alignment",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Arvin Astro",
    title: "Arvindrun Vnjay | Astrologer • Name Numerology • Vastu Expert",
    description: BRAND.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvindrun Vnjay | Astrologer • Name Numerology • Vastu Expert",
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/images/logo.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/images/logo.png", color: "#0083fe" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0083fe",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Analytics />
      </head>
      <body className="bg-bg text-foreground antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}