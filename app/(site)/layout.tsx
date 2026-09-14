import { Header } from "@/components/Header";
import { Footer, FloatingWidgets } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { Preloader } from "@/components/Preloader";
import { FloatingNotice } from "@/components/FloatingNotice";
import { getPageContent } from "@/lib/cms";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const global = await getPageContent("global");
  const footer = await getPageContent("footer");
  const notice = await getPageContent("notice");
  const merged = { ...global, copyright: footer.copyright || global.copyright, siteTagline: footer.tagline || global.siteTagline };
  return (
    <>
      <Preloader />
      <Header global={merged} />
      <main className="min-h-screen">{children}</main>
      <Footer global={merged} />
      <FloatingWidgets />
      <SocialLinks />
      <FloatingNotice data={notice} />
    </>
  );
}
