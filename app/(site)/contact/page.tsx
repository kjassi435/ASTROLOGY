import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/Forms";
import { CONTACT } from "@/lib/site";
import { waLink } from "@/lib/utils";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us — Astrology, Numerology & Vastu Expert | Arvin Astro",
  description:
    "Contact Arvindrun Vnjay for Astrology, Name Numerology, Numerology & Vastu consultation, courses and vastu products. Call, WhatsApp or email — we reply quickly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={<>Let&apos;s Talk About Your <span className="text-accent">Cosmic Journey</span></>}
        subtitle="Have a question about a course, consultation, or a vastu product? Reach out — we usually reply within a few hours."
        items={[{ label: "Contact Us" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10">
          <div className="space-y-4">
            {[
              { icon: <IconPhone size={20} />, title: "Phone / WhatsApp", lines: [CONTACT.phoneMain], href: waLink(CONTACT.phoneMainRaw, "Hello Arvin Astro, I have a question.") },
              { icon: <IconMail size={20} />, title: "Email", lines: [CONTACT.email], href: `mailto:${CONTACT.email}` },
              { icon: <IconPin size={20} />, title: "Location", lines: [CONTACT.address], href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}` },
              { icon: <IconClock size={20} />, title: "Availability", lines: ["Mon – Sat · 10:00 AM – 8:00 PM IST", "Consultations by appointment"] },
            ].map((card) => (
              <div key={card.title} className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-6 flex gap-4">
                <span className="w-12 h-12 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">{card.icon}</span>
                <div>
                    <h2 className="text-lg mb-1">{card.title}</h2>
                  {card.lines.map((line) =>
                    card.href ? (
                      <a key={line} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block text-sm opacity-80 hover:text-primary-hover transition">
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm opacity-80">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}

            <a
              href={CONTACT.whatsappCommunity}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-foreground text-bg rounded-[var(--radius-lg)] p-6 group"
            >
              <span className="w-12 h-12 rounded-full bg-whatsapp text-white flex items-center justify-center shrink-0">
                <IconWhatsApp size={20} />
              </span>
              <div>
                <h2 className="text-lg">Join our free WhatsApp Community</h2>
                <p className="text-xs opacity-75">Free resources, live session updates &amp; daily remedies</p>
              </div>
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition">→</span>
            </a>
          </div>

          <div className="bg-card rounded-[var(--radius-xl)] border-2 border-primary-hover/20 p-7 sm:p-10">
            <h2 className="text-2xl sm:text-3xl mb-2">Send us a message</h2>
            <p className="text-sm opacity-70 mb-8">
              Fill the form and we will get back to you on WhatsApp or call. You can also write to us directly on {CONTACT.email}.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Arvin Astro",
          telephone: CONTACT.phoneMainRaw,
          email: CONTACT.email,
          address: { "@type": "PostalAddress", addressLocality: "Greater Noida West", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
        }}
      />
    </>
  );
}
