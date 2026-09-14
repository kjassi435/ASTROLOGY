import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getPageContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Arvin Astro",
  description: "Terms and conditions for using Arvin Astro services.",
  robots: { index: false },
  };

export default async function TermsPage() {
  const terms = await getPageContent("terms");
  return (
    <>
      <PageHero title={<>Terms & <span className="text-accent">Conditions</span></>} subtitle="Please read these terms carefully before using our services." items={[{ label: "Terms & Conditions" }]} />
      <section className="bg-bg section pt-10 pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-6 text-sm leading-relaxed whitespace-pre-wrap">
          {terms.content}
        </div>
      </section>
    </>
  );
}
