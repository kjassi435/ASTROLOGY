import type { Metadata } from "next";
import type { ReactNode } from "react";
import { STATS } from "@/lib/site";
import { getPageContent, pageJson, pageList } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/Cards";
import { Reveal, StatCounter } from "@/components/Preloader";
import { WhatsAppCommunity } from "@/components/WhatsAppCommunity";
import { IconAward, IconCheck, IconHeart, IconPhone, IconSparkle, IconUsers } from "@/components/Icons";
import { InlineText } from "@/components/Inline";

export const metadata: Metadata = {
  title: "About Us | Arvindrun Vnjay: Astrologer, Numerologist & Vastu Expert",
  description:
    "Meet Arvindrun Vnjay - 8+ years of experience, 2666+ students enrolled, 999+ consultations globally. Vedic Astrology, Name Numerology & Vastu expert.",
  keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
  };

// Blank line = new paragraph.
function Paras({ text, className = "" }: { text?: string; className?: string }) {
  if (!text) return null;
  const paras = text
    .split(/\n\s*\n/)
    .flatMap((p) => p.split(/\n/))
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className={className}>
          <InlineText text={p} keyPrefix={String(i)} />
        </p>
      ))}
    </>
  );
}

function AboutMarquee({ items }: { items?: string[] }) {
  const fallback = [
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
  const list = items && items.length ? items : fallback;
  const track = [...list, ...list];
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

function Chapter({ eyebrow, title, children }: { eyebrow?: string; title?: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-primary text-sm">{"\u2726"}</span>
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</span>
        </div>
      ) : null}
      {title ? <h3 className="text-[1.6rem] font-medium text-foreground mb-4">{title}</h3> : null}
      <div className="text-[1.05rem] leading-[1.95] text-foreground/80">{children}</div>
    </div>
  );
}

const WHY_ICONS: Record<string, ReactNode> = {
  sparkle: <IconSparkle size={22} />,
  users: <IconUsers size={22} />,
  award: <IconAward size={22} />,
  heart: <IconHeart size={22} />,
  check: <IconCheck size={22} />,
  phone: <IconPhone size={22} />,
};

const WHY_FALLBACK = [
  { icon: "sparkle", title: "Deep Vedic Knowledge", desc: "Rooted in classical texts — BPHS, Saravali, Phala Deepika and rare Bhrigu techniques." },
  { icon: "users", title: "Bhrigu Nandi Nadi", desc: "Rare Nadi astrology techniques for precise, life-relevant predictions." },
  { icon: "award", title: "Result-Oriented Remedies", desc: "Simple, logical remedies that do not require heavy structural changes." },
  { icon: "heart", title: "Ethical & Honest Guidance", desc: "I can't change your destiny — but I will guide you there with minimum hurdles, honestly." },
  { icon: "check", title: "Kundli-Aligned Naming", desc: "Names aligned holistically with kundli — an approach very few numerologists practice." },
  { icon: "phone", title: "Global Consultations", desc: "Serving clients in USA, UK, Canada, Australia and beyond, online & offline." },
];

export default async function AboutPage() {
  const marqueeCms = await getPageContent("marquee");
  const aboutMarquee = pageList(marqueeCms.aboutMarquee);
  const about = await getPageContent("about");
  const roles = pageJson<string[]>(about.aboutRoles, []);
  const whyBoxes = pageJson<{ icon: string; title: string; desc: string }[]>(about.whyBoxes, []);
  const whyItems = whyBoxes.length ? whyBoxes : WHY_FALLBACK;
  return (
    <>
      <PageHero
        title={<>About <span className="text-accent">Arvindrun Vnjay</span></>}
        subtitle={about.heroSubtitle}
        items={[{ label: "About Us" }]}
        bgImage={about.aboutHeroBg}
      />
      <AboutMarquee items={aboutMarquee} />

      {/* Bio Section */}
      <section className="bg-bg section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:items-start">
            <div className="relative lg:sticky lg:top-28">
              <Reveal>
                <div className="relative w-full aspect-[3/4] gradient-band rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border-8 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={about.aboutImage || "/images/about.png"} alt="Arvindrun Vnjay — Astrologer, Numerologist and Vastu Teacher" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </Reveal>
              {about.badgeValue ? (
                <div className="absolute -bottom-7 right-6 bg-foreground text-bg p-5 sm:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-center border-[3px] border-primary">
                  <div className="text-4xl font-bold text-primary leading-none">{about.badgeValue}</div>
                  <div className="text-sm mt-1 opacity-90 whitespace-pre-line">{about.badgeLabel}</div>
                </div>
              ) : null}
            </div>

            <Reveal delay={120}>
              {roles.length ? (
                <div className="flex flex-wrap gap-2.5 mb-9">
                  {roles.map((t) => (
                    <span key={t} className="px-4 py-1.5 rounded-full bg-card border border-primary-hover/25 text-sm font-medium text-foreground/80 shadow-[var(--shadow-sm)]">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {about.bioWelcome ? (
                <p className="text-[1.1rem] leading-[1.95] text-foreground/85 mb-10 first-letter:float-left first-letter:text-[4.2rem] first-letter:leading-[0.78] first-letter:font-bold first-letter:text-primary first-letter:pr-3 first-letter:pt-1 first-letter:font-serif">
                  <InlineText text={about.bioWelcome} keyPrefix="bw" />
                </p>
              ) : null}

              <Chapter eyebrow={about.journeyKicker} title={about.journeyTitle}>
                <Paras text={about.journeyText} className="mb-4" />
              </Chapter>

              <Chapter eyebrow={about.offerKicker} title={about.offerTitle}>
                <Paras text={about.offerText} className="mb-4" />
              </Chapter>

              {about.quoteMain ? (
                <blockquote className="my-10 pl-6 border-l-4 border-primary">
                  <p className="text-[1.25rem] leading-[1.8] font-serif italic text-foreground/90">
                    <InlineText text={about.quoteMain} keyPrefix="qm" />
                  </p>
                  {about.quoteSub ? <p className="text-sm text-foreground/60 mt-3">{about.quoteSub}</p> : null}
                </blockquote>
              ) : null}

              <Chapter eyebrow={about.promiseKicker} title={about.promiseTitle}>
                <Paras text={about.promiseText} className="mb-4" />
              </Chapter>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/15 p-5 shadow-[var(--shadow-sm)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">🌍</span>
                    <p className="text-sm font-semibold text-foreground">{about.globalTitle}</p>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed"><InlineText text={about.globalText ?? ""} keyPrefix="gt" /></p>
                </div>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/15 p-5 shadow-[var(--shadow-sm)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">📍</span>
                    <p className="text-sm font-semibold text-foreground">{about.locationTitle}</p>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{about.locationText}</p>
                </div>
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
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 100}>
                <div className="h-full p-8 bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 card-lift">
                  <div className="w-12 h-12 bg-primary text-foreground rounded-full flex items-center justify-center mb-5">{WHY_ICONS[item.icon] ?? WHY_ICONS.sparkle}</div>
                  <h3 className="text-xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Community (same as homepage) */}
      <WhatsAppCommunity
        kicker="Stay Connected"
        title="Join our WhatsApp Community"
        desc="Get free session updates, astrology tips & course announcements directly on WhatsApp."
      />
    </>
  );
}
