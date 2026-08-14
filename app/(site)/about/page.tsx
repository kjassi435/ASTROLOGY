import type { Metadata } from "next";
import { CONTACT, STATS } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Marquee, SectionHeader } from "@/components/Cards";
import { Reveal, StatCounter } from "@/components/Preloader";
import { IconAward, IconCheck, IconHeart, IconPhone, IconSparkle, IconUsers, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us — Arvindrun Vnjay: Astrologer, Numerologist & Vastu Expert",
  description:
    "Meet Arvindrun Vnjay — 8+ years of experience, 2666+ students enrolled, 999+ consultations globally. Vedic Astrology, Name Numerology & Vastu expert.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={<>About <span className="text-accent">Arvindrun Vnjay</span></>}
        subtitle="Astrologer · Name Numerology Expert · Vastu Consultant · Teacher"
        items={[{ label: "About Us" }]}
      />
      <Marquee />

      <section className="bg-bg section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <Reveal>
              <div className="relative lg:sticky lg:top-28">
                <div className="relative w-full aspect-[3/4] gradient-band rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border-8 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/about.png" alt="Arvindrun Vnjay — Astrologer, Numerologist and Vastu Teacher" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-7 right-6 bg-foreground text-bg p-5 sm:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-center border-[3px] border-primary">
                  <div className="text-4xl font-bold text-primary leading-none">8+</div>
                  <div className="text-sm mt-1 opacity-90">
                    Years of
                    <br />
                    Practice
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Astrologer", "Name Numerology Expert", "Vastu Consultant", "Teacher", "Consultant"].map((t) => (
                  <span key={t} className="px-4 py-1.5 rounded-full bg-card border border-primary-hover/30 text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[1.35rem] leading-relaxed mb-6">
                Welcome to Arvin Astro. Under the guidance of Arvindrun Vnjay, we offer Live and Recorded courses, expert consultations, and
                result-oriented occult science solutions.
              </p>
              <p className="opacity-85 mb-6">
                With over <strong>8+ years of experience</strong>, I have mentored more than <strong>2666+ students</strong> enrolled and provided{" "}
                <strong>999+ consultations</strong> globally. Whether you need Name Numerology correction or Vastu advice, my services are designed
                for your growth. Through Arvin Astro, I provide expert guidance to help you align your life with cosmic energy.
              </p>
              <p className="opacity-85 mb-6">
                I see myself not as a predictor, but as a bridge — connecting you to the ancient, profound wisdom held in the stars, the rhythm of
                numbers, and the silent language of your home. My journey is dedicated to the truth: the universe has written a magnificent story
                for you, and I am here simply to help you read the script with confidence and courage.
              </p>
              <p className="opacity-85 mb-6">
                I promise you guidance that is loyal, precise, and deeply rooted in ethics. Together, we will gently turn your gaze inward, because
                the greatest power to change your life resides not in external remedies, but in the sincerity of your own heart and the power of
                your changing karma. Let us begin the beautiful work of alignment.
              </p>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-6 mb-8">
                <p className="text-sm font-semibold mb-2">🌍 Global Consultation</p>
                <p className="text-sm opacity-80">
                  Available for clients in USA, UK, Canada, and Australia. Contact Arvindrun Vnjay for professional Astrology, Numerology and Vastu
                  services.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={CONTACT.whatsappCommunity} className="btn btn-whatsapp">
                  <IconWhatsApp size={16} /> WhatsApp &amp; Book Your Slot
                </a>
                <a href={`tel:${CONTACT.phoneMainRaw}`} className="btn btn-outline">
                  <IconPhone size={16} /> {CONTACT.phoneMain}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-card section">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader center subtitle="Our Numbers" title={<>A Legacy of <span className="text-accent">Trust</span></>} />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            {STATS.map((s, i) => (
              <div key={s.label} className="text-center">
                <StatCounter value={s.value} suffix={s.suffix} />
                <div className="text-sm opacity-70 mt-2">
                  {s.label}
                  <br />
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg section pt-0">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader center subtitle="Why Arvin Astro" title={<>Offering The Best Experience of <span className="text-accent">Cosmic Sciences</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              { icon: <IconSparkle size={22} />, title: "Deep Vedic Knowledge", desc: "Rooted in classical texts — BPHS, Saravali, Phala Deepika and rare Bhrigu techniques." },
              { icon: <IconUsers size={22} />, title: "2666+ Students Mentored", desc: "A growing community of learners across India and the world, many now practicing professionals." },
              { icon: <IconAward size={22} />, title: "Result-Oriented Remedies", desc: "Simple, logical remedies that do not require heavy structural changes." },
              { icon: <IconHeart size={22} />, title: "Ethical & Honest Guidance", desc: "I can't change your destiny — but I will guide you there with minimum hurdles, honestly." },
              { icon: <IconCheck size={22} />, title: "Kundli-Aligned Naming", desc: "Names aligned holistically with kundli — an approach very few numerologists practice." },
              { icon: <IconPhone size={22} />, title: "Global Consultations", desc: "Serving clients in USA, UK, Canada, Australia and beyond, online & offline." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 100}>
                <div className="h-full p-8 bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 card-lift">
                  <div className="w-12 h-12 bg-primary text-foreground rounded-full flex items-center justify-center mb-5">{item.icon}</div>
                  <h3 className="text-xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href={CONTACT.whatsappCommunity} className="btn btn-primary">
              <IconWhatsApp size={16} /> Book Your Consultation Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
