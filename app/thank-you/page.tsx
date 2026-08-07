import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CONTACT } from "@/lib/site";
import { IconMail, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Thank You | Arvin Astro",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        title={<>Thank You! <span className="text-accent">✦</span></>}
        subtitle="Your message has been received. We will get back to you very soon — usually within a few hours on WhatsApp or call."
        items={[{ label: "Thank You" }]}
      />

      <section className="bg-bg section pt-10 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-card rounded-[var(--radius-xl)] border-2 border-primary-hover/20 p-10">
            <span className="text-[4rem] text-primary-hover block mb-4">✦</span>
            <p className="opacity-80 mb-8">
              Meanwhile, feel free to explore our courses or join our free WhatsApp community for daily remedies and updates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses" className="btn btn-primary">
                Explore Courses
              </Link>
              <a href={CONTACT.whatsappCommunity} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <IconWhatsApp size={16} /> Join Community
              </a>
              <a href={`mailto:${CONTACT.email}`} className="btn btn-outline">
                <IconMail size={16} /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
