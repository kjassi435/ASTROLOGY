import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer, FloatingWidgets } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { Preloader } from "@/components/Preloader";
import { BRAND } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arvinastro.in"),
  title: {
    default: "Arvindrun Vnjay | Astrologer \u2022 Name Numerology \u2022 Vastu Expert",
    template: "%s | Arvin Astro",
  },
  description: BRAND.description,
  keywords: ["astrologer", "numerology", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "name designing", "vastu consultant"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arvinastro.in",
    siteName: "arvinastro.in",
    title: "Arvindrun Vnjay | Astrologer \u2022 Name Numerology \u2022 Vastu Expert",
    description: BRAND.description,
    images: [{ url: "/images/logo.png", alt: "Arvin Astro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvindrun Vnjay | Astrologer \u2022 Name Numerology \u2022 Vastu Expert",
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-foreground antialiased">
        <Preloader />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWidgets />
        <SocialLinks />
      </body>
    </html>
  );
}
