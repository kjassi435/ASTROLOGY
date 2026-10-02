import { Header } from "@/components/Header";
import { Footer, FloatingWidgets } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { Preloader } from "@/components/Preloader";
import { getPageContent } from "@/lib/cms";

// Cache public pages for 1h (Vercel usage fix: 5min caused ISR storm +
// Fast Origin Transfer + Fluid CPU burn). Admin reads use getAdmin*
// with noStore, so the panel always shows fresh data.
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const global = await getPageContent("global");
  const footer = await getPageContent("footer");
  const merged = { ...global, copyright: footer.copyright || global.copyright, siteTagline: footer.tagline || global.siteTagline };
  return (
    <>
      <Preloader />
      <Header global={merged} />
      <main className="min-h-screen">{children}</main>
      <Footer global={merged} />
      <FloatingWidgets />
      <SocialLinks />
    </>
  );
}
