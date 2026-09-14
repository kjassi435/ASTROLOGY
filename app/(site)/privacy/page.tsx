import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getPageContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Privacy Policy | Arvin Astro",
  description: "How we collect, use and protect your information.",
  robots: { index: false },
  };

export default async function PrivacyPage() {
  const privacy = await getPageContent("privacy");
  return (
    <>
      <PageHero title={<>Privacy <span className="text-accent">Policy</span></>} subtitle="How we collect, use and protect your information." items={[{ label: "Privacy Policy" }]} />
      <section className="bg-bg section pt-10 pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-6 text-sm leading-relaxed whitespace-pre-wrap">
          {privacy.content}
        </div>
      </section>
    </>
  );
}
