import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { APPS, CONTACT } from "@/lib/site";
import { getServices, getCourses, getPosts, getTestimonials, getPageContent, pageJson, pageList, youtubeId } from "@/lib/cms";
import { FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Arvindrun Vnjay | Astrologer, Name Numerology Expert & Vastu Consultant",
  description:
    "Consult with Arvindrun Vnjay — Astrologer, Name Numerology Expert & Vastu Consultant. Get personalized guidance and join our courses on Astrology, Name Numerology, and Vastu.",
  keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology", "best astrologer in Greater Noida", "vastu for home", "name correction numerology"],
  };
import { SectionHeader, CourseCard, TestimonialCard, RevealCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { FaqList } from "@/components/FaqList";
import { BookingForm } from "@/components/Forms";
import { ServicesSection } from "@/components/ServicesSection";
import { PlanetTransitChart } from "@/components/PlanetTransitChart";
import { WhatsAppCommunity } from "@/components/WhatsAppCommunity";
import DailyHoroscope from "@/components/DailyHoroscope";
import { Hero } from "@/components/Hero";
import { IconArrowRight, IconCalendar, IconClock, IconHeart, IconMail, IconPhone, IconPin, IconPlay, IconSparkle, IconUsers, IconVideo, IconAward, IconWhatsApp } from "@/components/Icons";
import { InlineText } from "@/components/Inline";

function AboutStrip({ aboutText, expertImage, expertName, expertText, kicker, didYouKnow, longText, boxes, badgeValue, badgeLabel }: {
  aboutText?: string; expertImage?: string; expertName?: string; expertText?: string; kicker?: string;
  didYouKnow?: string; longText?: string; boxes?: string; badgeValue?: string; badgeLabel?: string;
}) {
  const aboutBoxes = pageJson<{ icon: string; title: string; desc: string }[]>(boxes ?? "", []);
  return (
    <section className="bg-bg section" id="about">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle={kicker} title={<>Meet <span className="text-accent">{expertName ?? "Arvindrun Vnjay"}</span></>} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative w-full aspect-[3/4] gradient-band rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border-8 border-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={expertImage || "/images/about.png"} alt="Arvindrun Vnjay — Astrologer, Numerologist and Vastu Teacher" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              {badgeValue ? (
                <div className="absolute -bottom-7 -right-4 sm:right-8 bg-foreground text-bg p-5 sm:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-center border-[3px] border-primary">
                  <div className="text-4xl font-bold text-primary leading-none">{badgeValue}</div>
                  <div className="text-sm mt-1 opacity-90 whitespace-pre-line">{badgeLabel}</div>
                </div>
              ) : null}
            </div>
          </Reveal>
            <Reveal delay={120}>
              <p className="text-[1.3rem] text-foreground leading-relaxed mb-5">
                {expertText ?? aboutText ?? "A passionate practitioner of ancient Vedic sciences, helping individuals discover their true potential through celestial insights."}
              </p>
              {didYouKnow ? (
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-5 mb-6 flex gap-4 items-start shadow-[var(--shadow-sm)]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                  <p className="text-[0.95rem] leading-relaxed text-foreground/85"><InlineText text={didYouKnow ?? ""} keyPrefix="d" /></p>
                </div>
              ) : null}
              {longText ? <p className="opacity-85 mb-8"><InlineText text={longText} keyPrefix="l" /></p> : null}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {(aboutBoxes.length ? aboutBoxes : [
                { icon: "sparkle", title: "Vedic Astrology", desc: "Deep kundli analysis & life predictions" },
                { icon: "users", title: "Name Numerology", desc: "Cosmic alignment through names" },
                { icon: "heart", title: "Vastu Shastra", desc: "Spatial harmony for prosperity" },
              ]).map((s) => {
                const ic = s.icon === "users" ? <IconUsers size={22} /> : s.icon === "heart" ? <IconHeart size={22} /> : <IconSparkle size={22} />;
                return (
                  <div key={s.title} className="text-center p-5 bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] card-lift border border-transparent hover:border-primary-hover">
                    <div className="w-[50px] h-[50px] mx-auto mb-3 bg-primary text-foreground rounded-full flex items-center justify-center">{ic}</div>
                    <h4 className="text-lg mb-1">{s.title}</h4>
                    <p className="text-sm opacity-75">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

async function CoursesSection({ featuredSlugs = [], kicker, title, desc }: { featuredSlugs?: string[]; kicker?: string; title?: string; desc?: string }) {
  const courses = await getCourses();
  let featured: typeof courses = [];
  if (featuredSlugs.length === 3) {
    featured = featuredSlugs
      .map((s) => courses.find((c) => c.slug === s))
      .filter(Boolean) as typeof courses;
  }
  if (featured.length < 3) {
    const live = courses.find((c) => c.type === "live");
    const recorded = courses.find((c) => c.type === "recorded");
    const free = courses.find((c) => c.type === "free");
    featured = [live, recorded, free].filter(Boolean) as typeof courses;
  }
  return (
    <section className="bg-bg section" id="courses">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          center
          subtitle={kicker}
          title={title}
          desc={desc}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((course, i) => (
            <Reveal key={course.slug} delay={i * 100}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link href="/courses/live" className="btn btn-dark">
            <IconVideo size={16} /> Live Courses
          </Link>
          <Link href="/courses/recorded" className="btn btn-primary">
            <IconAward size={16} /> Recorded Courses
          </Link>
          <Link href="/courses/free" className="btn btn-outline">
            <IconPlay size={16} /> Free Courses
          </Link>
        </div>
      </div>
    </section>
  );
}

function JourneySection({ kicker, title }: { kicker?: string; title?: string }) {
  const steps = [
    { n: "01", title: "Choose Service", desc: "Select the consultation that resonates with your needs." },
    { n: "02", title: "Book Slot", desc: "Pick a convenient time slot from our schedule." },
    { n: "03", title: "Get Guidance", desc: "Receive personalized insights during your consultation." },
    { n: "04", title: "Transform", desc: "Apply cosmic wisdom to manifest positive changes." },
  ];
  return (
    <section className="bg-section-blue-alt section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle={kicker} title={title} />
        <div className="flex flex-wrap items-stretch justify-between gap-5">
          {steps.map((step, i) => (
            <div key={step.n} className="flex items-center gap-5 flex-1 min-w-[200px]">
              <Reveal delay={i * 100} className="flex-1">
                <div className="h-full text-center p-6 bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] card-lift border border-primary-hover/20">
                  <div className="text-5xl font-bold text-primary-hover leading-none mb-4">{step.n}</div>
                  <h3 className="text-xl mb-2">{step.title}</h3>
                  <p className="text-sm opacity-80">{step.desc}</p>
                </div>
              </Reveal>
              {i < steps.length - 1 ? (
                <span className="text-primary-hover text-2xl shrink-0 hidden md:block">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function YouTubeSection({ videos = [], kicker, title, desc }: { videos?: string[]; kicker?: string; title?: string; desc?: string }) {
  const ids = videos.map((v) => youtubeId(v)).filter(Boolean) as string[];
  const resolved = ids.length
    ? ids
    : ["XOT9V3g1DrA", "fjsBFTP-lH4", "IlGagLhP1yI", "u7mIDoYU7UA"];
  const videosData = resolved.map((id, i) => ({
    id,
    title: ["Astrology Insights", "Numerology Basics", "Vastu Tips", "Cosmic Wisdom"][i] ?? "Video",
  }));

  return (
    <section className="bg-section-blue section pt-0">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionHeader center subtitle={kicker} title={title} desc={desc} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {videosData.map((v) => (
              <div key={v.id} className="rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] border border-primary-hover/15 bg-card">
                <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://www.youtube.com/@arvinastro/featured"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <IconPlay size={16} /> View More Videos
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

async function TestimonialsSection({ kicker, title, desc }: { kicker?: string; title?: string; desc?: string }) {
  const testimonials = await getTestimonials();
  return (
    <section className="bg-bg section" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle={kicker} title={title} desc={desc} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=arvin+astro+Reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-hover hover:underline"
          >
            See More Real Reviews on Google <IconArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function CtaSection({ ctaText, kicker, desc }: { ctaText?: string; kicker?: string; desc?: string }) {
  return (
    <section className="bg-bg section pt-0" id="contact-home">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card p-8 sm:p-12 lg:p-16 rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border-2 border-primary-hover/20 relative overflow-hidden">
            <div className="relative">
              {kicker ? <span className="section-subtitle">{kicker}</span> : null}
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-medium mb-5">
                {ctaText ?? (
                  <>
                    Align your karma with <span className="text-accent">cosmic energy</span>.
                  </>
                )}
              </h2>
              <p className="opacity-85 mb-8">
                {desc}
              </p>
              <div className="grid gap-5 mb-8">
                {[
                  { icon: <IconPhone size={18} />, label: "Call Us", value: CONTACT.phoneMain, href: `tel:${CONTACT.phoneMainRaw}` },
                  { icon: <IconMail size={18} />, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { icon: <IconPin size={18} />, label: "Visit", value: CONTACT.address, href: undefined },
                  { icon: <IconClock size={18} />, label: "Hours", value: (
                    <span className="block">
                      Mon – Sat · 10:00 AM – 6:00 PM IST
                      <span className="block text-[0.8rem] font-normal opacity-70">Consultations by appointment</span>
                    </span>
                  ), href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="w-11 h-11 bg-card text-primary-hover rounded-full flex items-center justify-center shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-[0.75rem] uppercase tracking-wider opacity-60">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-medium hover:text-primary-hover transition">
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
              </div>
            </div>
            <div className="bg-card p-7 sm:p-10 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
              <h3 className="text-2xl mb-6 text-center">
                Ask a <span className="text-accent">Question</span>
              </h3>
              <BookingForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AppSection({ kicker, title, desc1, desc2 }: { kicker?: string; title?: string; desc1?: string; desc2?: string }) {
  return (
    <section className="bg-bg section pt-0">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-card p-8 sm:p-12 rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border-2 border-primary-hover/20 relative overflow-hidden">
            <div>
              <span className="section-subtitle">{kicker}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-medium mb-4">
                {title}
              </h2>
              <p className="opacity-85 mb-2 max-w-lg">
                {desc1}
              </p>
              <p className="opacity-85 mb-6 max-w-lg">
                {desc2}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={APPS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-foreground text-bg rounded-2xl px-6 py-3.5 hover:bg-foreground/90 transition shadow-md"
                >
                  <span className="leading-tight text-left">
                    <span className="block text-[0.65rem] uppercase tracking-widest opacity-70">Download on the</span>
                    <span className="block text-lg font-bold">App Store</span>
                  </span>
                </a>
                <a
                  href={APPS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-foreground text-bg rounded-2xl px-6 py-3.5 hover:bg-foreground/90 transition shadow-md"
                >
                  <span className="leading-tight text-left">
                    <span className="block text-[0.65rem] uppercase tracking-widest opacity-70">Get it on</span>
                    <span className="block text-lg font-bold">Google Play</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <img
                src="/images/app-mockup.png"
                alt="Arvin Astro App"
                style={{ width: "180px", height: "auto" }}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

async function BlogTeaser({ kicker, title, desc }: { kicker?: string; title?: string; desc?: string }) {
  const posts = (await getPosts())
    .filter((p) => (p.status ?? "published") !== "draft")
    .sort((a, b) => (Date.parse(b.date ?? "") || 0) - (Date.parse(a.date ?? "") || 0));
  return (
    <section className="bg-bg section pt-0" id="blog">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle={kicker} title={title} desc={desc} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link href={`/blog/${post.slug}`} className="block h-full bg-card rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] card-lift border border-primary-hover/15 group">
                <div className="h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary-hover font-semibold uppercase tracking-wider mb-2">{post.category}</div>
                  <h3 className="text-xl leading-snug mb-3 group-hover:text-primary-hover transition">{post.title}</h3>
                  <div className="text-xs opacity-60 mb-4">
                    {post.date} · {post.readTime}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-hover">
                    Read More <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default async function HomePage() {
  const services = await getServices();
  const home = await getPageContent("home");
  const marqueeCms = await getPageContent("marquee");
  const homeMarquee = pageList(marqueeCms.homeMarquee);
  const heroImages = [home.heroImage1, home.heroImage2, home.heroImage3, home.heroImage4, home.heroImage5].filter(Boolean) as string[];
  const featuredSlugs = pageJson<string[]>(home.featuredCourseSlugs, []);
  let youtubeUrls = pageJson<string[]>(home.youtubeVideos, []);
  if (youtubeUrls.length === 1 && typeof youtubeUrls[0] === "string") {
    const inner = pageJson<string[]>(youtubeUrls[0], []);
    if (inner.length) youtubeUrls = inner;
  }
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Hero desktopSlides={heroImages} mobileSlide={home.heroImageMobile} title={home.heroTitle} subtitle={home.heroSubtitle} marqueeItems={homeMarquee} />
      <section className="bg-section-blue section" id="transits">
        <div className="max-w-[1280px] mx-auto px-6">
          <PlanetTransitChart kicker={home.transitKicker} title={home.transitTitle} desc={home.transitDesc} />
        </div>
      </section>
      <section className="bg-section-blue-alt section" id="horoscope">
        <div className="max-w-[1280px] mx-auto px-6">
          <DailyHoroscope kicker={home.horoscopeKicker} title={home.horoscopeTitle} desc={home.horoscopeDesc} />
        </div>
      </section>
      <AboutStrip
        aboutText={home.aboutText}
        expertImage={home.expertImage}
        expertName={home.expertName}
        expertText={home.expertText}
        kicker={home.aboutKicker}
        didYouKnow={home.aboutDidYouKnow}
        longText={home.aboutLongText}
        boxes={home.aboutBoxes}
        badgeValue={home.aboutBadgeValue}
        badgeLabel={home.aboutBadgeLabel}
      />
      <ServicesSection services={services} kicker={home.servicesKicker} title={home.servicesTitle} desc={home.servicesDesc} />
      <CoursesSection featuredSlugs={featuredSlugs} kicker={home.coursesKicker} title={home.coursesTitle} desc={home.coursesDesc} />
      <JourneySection kicker={home.journeyKicker} title={home.journeyTitle} />
      <YouTubeSection videos={youtubeUrls} kicker={home.youtubeKicker} title={home.youtubeTitle} desc={home.youtubeDesc} />
      <TestimonialsSection kicker={home.testimonialsKicker} title={home.testimonialsTitle} desc={home.testimonialsDesc} />
      <AppSection kicker={home.appKicker} title={home.appTitle} desc1={home.appDesc1} desc2={home.appDesc2} />
      <BlogTeaser kicker={home.blogKicker} title={home.blogTitle} desc={home.blogDesc} />
      <WhatsAppCommunity kicker={home.waKicker} title={home.waTitle} desc={home.waDesc} />
      <CtaSection ctaText={home.ctaText} kicker={home.ctaKicker} desc={home.ctaDesc} />
    </>
  );
}
