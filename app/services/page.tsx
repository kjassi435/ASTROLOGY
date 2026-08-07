import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { PageHero } from "@/components/PageHero";
import { SectionHeader, ServiceCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { IconArrowRight, IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our Services — Astrology, Vastu & Name Designing | Arvin Astro",
  description:
    "Expert Astrology, Vastu & Name Designing services. Kundli Analysis, Vastu Consultation, Name Analysis, Company & Newborn Name Designing, Logo Designing and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={<>Expert <span className="text-accent">Astrology, Name Numerology & Vastu</span> Consultation Services</>}
        subtitle="Get expert guidance and result-oriented occult science solutions for your life, business, and personal growth. Trusted by clients in India and worldwide."
        items={[{ label: "Our Services" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 100}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card section">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <SectionHeader
              subtitle="Why Choose Us"
              title={<>Astrology Vastu Name Designing for <span className="text-accent">Best Success</span></>}
            />
            <div className="space-y-4">
              {[
                "Combining ancient Vedic Wisdom with modern scientific approaches for results that actually work",
                "Vastu is not just about changing furniture — it is about balancing the five elements (Panchbhootas) of your space",
                "Company Name Designing based on numerology and phonetic vibrations for an auspicious start",
                "Newborn Baby Name Designing that is astrologically powerful for the child's future",
                "Logo Designing based on Vastu and color therapy principles so your brand radiates power, trust, and growth",
                "Mobile Number Analysis to help you choose numbers that attract opportunities",
                "Consultation Combos for a holistic approach combining astrology, vastu, and numerology",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                    <IconCheck size={13} />
                  </span>
                  <p className="opacity-85 text-sm sm:text-base">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/courses" className="btn btn-primary">
                Explore Our Courses <IconArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="gradient-band rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow-lg)] text-center">
              <span className="text-[5rem] block text-primary-hover mb-4">✦</span>
              <h3 className="text-3xl mb-4">
                Your cosmic alignment <span className="text-accent">starts here</span>
              </h3>
              <p className="opacity-85 mb-8">Every consultation is conducted with the highest level of ethics and precision.</p>
              <Link href="/contact" className="btn btn-primary">
                Book a Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
