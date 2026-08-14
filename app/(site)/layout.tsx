import { Header } from "@/components/Header";
import { Footer, FloatingWidgets } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { Preloader } from "@/components/Preloader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWidgets />
      <SocialLinks />
    </>
  );
}
