import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CONTACT, STATS } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/Cards";
import { Reveal, StatCounter } from "@/components/Preloader";
import { IconAward, IconCheck, IconHeart, IconPhone, IconSparkle, IconUsers, IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us — Arvindrun Vnjay: Astrologer, Numerologist & Vastu Expert",
  description:
    "Meet Arvindrun Vnjay — 8+ years of experience, 2666+ students enrolled, 999+ consultations globally. Vedic Astrology, Name Numerology & Vastu expert.",
};

function AboutMarquee() {
  const items = [
    "Vedic Astrology",
    "Name Numerology",
    "Vastu Shastra",
    "Kundli Analysis",
    "Remedial Astrology",
    "Bhrigu Nandi Nadi",
    "Prediction",
    "Matchmaking",
    "Business Naming",
    "Baby Naming",
    "Address Numerology",
    "Lal Kitab",
  ];
  const track = [...items, ...items];
  return (
    <div className="marquee-section relative z-20" aria-hidden>
      <div className="marquee-track">
        <div className="marquee-content">
          {track.map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {item}
              <span className="dot">{"\u2726"}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chapter({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-primary text-sm">{"\u2726"}</span>
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</span>
      </div>
      <h3 className="text-[1.6rem] font-medium text-foreground mb-4">{title}</h3>
      <div className="text-[1.05rem] leading-[1.95] text-foreground/80">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={<>About <span className="text-accent">Arvindrun Vnjay</span></>}
        subtitle="Astrologer · Name Numerology Expert · Vastu Consultant · Teacher"
        items={[{ label: "About Us" }]}
      />
      <AboutMarquee />

      {/* Bio Section */}
      <section className="bg-bg section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:items-start">
            <div className="relative lg:sticky lg:top-28">
              <Reveal>
                <div className="relative w-full aspect-[3/4] gradient-band rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border-8 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/about.png" alt="Arvindrun Vnjay — Astrologer, Numerologist and Vastu Teacher" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </Reveal>
              <div className="absolute -bottom-7 right-6 bg-foreground text-bg p-5 sm:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-center border-[3px] border-primary">
                <div className="text-4xl font-bold text-primary leading-none">8+</div>
                <div className="text-sm mt-1 opacity-90">
                  Years of
                  <br />
                  Practice
                </div>
              </div>
            </div>

            <Reveal delay={120}>
              <div className="flex flex-wrap gap-2.5 mb-9">
                {["Astrologer", "Name Numerology Expert", "Vastu Consultant", "Teacher", "Consultant"].map((t) => (
                  <span key={t} className="px-4 py-1.5 rounded-full bg-card border border-primary-hover/25 text-sm font-medium text-foreground/80 shadow-[var(--shadow-sm)]">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-[1.1rem] leading-[1.95] text-foreground/85 mb-10">
                <span className="float-left text-[4.2rem] leading-[0.78] font-bold text-primary pr-3 pt-1 font-serif">W</span>
                elcome to <strong className="text-foreground font-semibold">Arvin Astro</strong> — your trusted destination for the ancient and life-transforming sciences of <strong className="text-foreground font-semibold">Vedic Astrology</strong>, <strong className="text-foreground font-semibold">Name Numerology</strong>, and <strong className="text-foreground font-semibold">Vastu Shastra</strong>. Whether you are seeking clarity in life, looking for the perfect name for your newborn, or wanting to harmonize your living or working space, you are at the right place.
              </p>

              <Chapter eyebrow="The Journey" title="Who I Am">
                <p className="mb-4">
                  I am <strong className="text-foreground">Arvindrun Vnjay</strong> — a passionate <strong className="text-foreground">Astrologer</strong>, <strong className="text-foreground">Name Numerologist</strong>, and <strong className="text-foreground">Vastu Consultant</strong> with over <strong className="text-foreground">8+ years of dedicated practice</strong> in the field of occult and spiritual sciences. My journey began with a deep curiosity about the cosmic forces that shape human destiny, and over the years, this curiosity has blossomed into a lifelong mission — to guide souls toward clarity, balance, and purpose.
                </p>
              </Chapter>

              <Chapter eyebrow="What We Offer" title="Services & Expertise">
                <p className="mb-4">
                  Through <strong className="text-foreground">Arvin Astro</strong>, I offer a comprehensive range of services including <strong className="text-foreground">live and recorded courses</strong> in Astrology and Numerology, <strong className="text-foreground">personal consultations</strong> for individuals and businesses, and <strong className="text-foreground">result-oriented remedies</strong> rooted in ancient wisdom. With <strong className="text-foreground">2666+ students enrolled</strong> and <strong className="text-foreground">999+ consultations delivered</strong> globally, my work has touched lives across India and in countries like the <strong className="text-foreground">USA, UK, Canada, and Australia</strong>.
                </p>
                <p>
                  My expertise spans across <strong className="text-foreground">Vedic Astrology</strong> (including Bhrigu Nandi Nadi), <strong className="text-foreground">Name Numerology</strong> (including Business Naming and Address Numerology), and <strong className="text-foreground">Vastu Shastra</strong> for home, office, and factory. I also offer specialized services such as <strong className="text-foreground">Kundli Analysis</strong>, <strong className="text-foreground">Matchmaking</strong>, <strong className="text-foreground">Remedial Astrology</strong>, <strong className="text-foreground">Lal Kitab</strong>, <strong className="text-foreground">Property Consultation</strong>, <strong className="text-foreground">Matchmaking Consultation</strong>, <strong className="text-foreground">Business Consultation</strong>, <strong className="text-foreground">Numerology Consultation</strong>, and <strong className="text-foreground">Baby Naming</strong>.
                </p>
              </Chapter>

              <blockquote className="my-10 pl-6 border-l-4 border-primary">
                <p className="text-[1.25rem] leading-[1.8] font-serif italic text-foreground/90">
                  I see myself not just as an astrologer, but as a <span className="text-primary font-semibold not-italic">bridge</span> — connecting you to the ancient, profound wisdom held in the stars, the rhythm of numbers, and the silent language of your home.
                </p>
                <p className="text-sm text-foreground/60 mt-3">
                  The universe has written a magnificent story for you, and I am here simply to help you read the script with confidence and courage.
                </p>
              </blockquote>

              <Chapter eyebrow="My Promise" title="Guidance & Approach">
                <p className="mb-4">
                  What sets me apart is my commitment to <strong className="text-foreground">ethical guidance</strong> and <strong className="text-foreground">personal attention</strong>. I don&apos;t believe in generic advice or fear-based predictions. Every consultation and every class is designed to empower you with knowledge, awareness, and practical solutions. I believe that the stars do not dictate your fate — they guide you. And with the right understanding, you can navigate life with confidence and grace.
                </p>
                <p className="mb-4">
                  Whether you are a beginner curious about the stars, a student eager to master the cosmic arts, or someone seeking answers to life&apos;s pressing questions — <strong className="text-foreground">Arvin Astro</strong> is here for you. My courses are designed for <strong className="text-foreground">all levels</strong>, from curious beginners to advanced learners, and my consultation approach is <strong className="text-foreground">rooted in classical texts</strong> yet adapted for modern life.
                </p>
                <p className="mb-4">
                  I promise you guidance that is <strong className="text-foreground">loyal, precise, and deeply rooted in ethics</strong>. Together, we will gently turn your gaze inward, because the greatest power to change your life resides not in external remedies, but in the sincerity of your own heart and the power of your changing karma.
                </p>
                <p>
                  Let us begin the beautiful work of alignment. Whether it&apos;s the stars guiding you, numbers empowering you, or vastu harmonizing your space — <strong className="text-foreground">your transformation starts here</strong>.
                </p>
              </Chapter>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/15 p-5 shadow-[var(--shadow-sm)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">🌍</span>
                    <p className="text-sm font-semibold text-foreground">Global Consultation</p>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Available for clients in <strong>USA, UK, Canada, and Australia</strong>. Online consultations available worldwide.
                  </p>
                </div>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/15 p-5 shadow-[var(--shadow-sm)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">📍</span>
                    <p className="text-sm font-semibold text-foreground">Location</p>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Greater Noida West, UP, India
                  </p>
                </div>
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

      {/* Stats Section */}
      <section className="bg-card section">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHeader center subtitle="Our Numbers" title={<>A Legacy of <span className="text-accent">Trust</span></>} />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
            {STATS.map((s) => (
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

      {/* Why Arvin Astro */}
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
