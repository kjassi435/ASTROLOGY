import Link from "next/link";
import { BRAND, CONTACT, STATS } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { RECORDED_COURSES, FREE_COURSES, LIVE_COURSES } from "@/lib/courses";
import { POSTS } from "@/lib/blog";
import { TESTIMONIALS } from "@/lib/testimonials";
import { FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";
import { Marquee, SectionHeader, ServiceCard, CourseCard, TestimonialCard, RevealCard } from "@/components/Cards";
import { Reveal, StatCounter } from "@/components/Preloader";
import { FaqList } from "@/components/FaqList";
import { BookingForm } from "@/components/Forms";
import HeroMoon from "@/components/HeroMoon";
import DailyHoroscope from "@/components/DailyHoroscope";
import { IconArrowRight, IconCalendar, IconClock, IconHeart, IconMail, IconPhone, IconPin, IconPlay, IconSparkle, IconUsers, IconVideo, IconAward, IconWhatsApp } from "@/components/Icons";

function Hero() {
  return (
    <section className="relative min-h-screen bg-hero-glow flex items-center overflow-hidden pt-28 pb-16" id="home">
      <div className="container relative z-[2] mx-auto max-w-[1280px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <h1 className="font-medium mt-6 mb-6 text-[clamp(2.6rem,5vw,4.2rem)] leading-[1.05] text-foreground">
            Align Your Life with <br className="hidden sm:block" />
            <span className="text-primary-hover">Cosmic Wisdom</span>
          </h1>
          <p className="text-[1.1rem] opacity-85 mb-9 max-w-[540px] mx-auto lg:mx-0">
            Expert guidance in <strong className="text-primary-hover">Astrology</strong>, <strong className="text-primary-hover">Name Numerology</strong>, and{" "}
            <strong className="text-primary-hover">Vastu Shastra</strong> to unlock health, wealth, and lasting happiness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
            <Link href="/services" className="btn btn-primary">
              Explore Services <IconArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn btn-secondary">
              <IconPlay size={16} /> Meet the Expert
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-6 sm:p-8 bg-bg border border-primary-hover/30 rounded-[var(--radius-lg)] max-w-fit mx-auto lg:mx-0">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-5 sm:gap-8">
                {i > 0 ? <div className="hidden sm:block w-px h-10 bg-primary-hover/40" /> : null}
                <div className="text-center">
                  <StatCounter value={s.value} suffix={s.suffix} />
                  <div className="text-sm opacity-70 mt-1.5 leading-snug">
                    {s.label}
                    <br />
                    {s.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] lg:h-[520px] flex items-center justify-center">
          <HeroMoon className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}

function AboutStrip() {
  return (
    <section className="bg-bg section" id="about">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle="About the Expert" title={<>Meet <span className="text-accent">Arvindrun Vnjay</span></>} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative w-full aspect-[3/4] gradient-band rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border-8 border-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/about.png" alt="Arvindrun Vnjay — Astrologer, Numerologist and Vastu Teacher" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-7 -right-4 sm:right-8 bg-foreground text-bg p-5 sm:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] text-center border-[3px] border-primary">
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
            <p className="text-[1.3rem] text-foreground leading-relaxed mb-5">
              A passionate practitioner of ancient Vedic sciences, helping individuals discover their true potential through celestial insights.
            </p>
            <p className="opacity-85 mb-8">
              With over <strong>8 years of dedicated practice</strong>, I have guided <strong>2666+ students</strong> and provided{" "}
              <strong>999+ consultations</strong> globally through the transformative wisdom of Astrology, Name Numerology, and Vastu Shastra. My
              approach combines traditional Vedic knowledge with practical, modern application — I see myself not as a predictor, but as a bridge
              connecting you to the ancient, profound wisdom held in the stars, the rhythm of numbers, and the silent language of your home.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {[
                { icon: <IconSparkle size={22} />, title: "Vedic Astrology", desc: "Deep kundli analysis & life predictions" },
                { icon: <IconUsers size={22} />, title: "Name Numerology", desc: "Cosmic alignment through names" },
                { icon: <IconHeart size={22} />, title: "Vastu Shastra", desc: "Spatial harmony for prosperity" },
              ].map((s) => (
                <div key={s.title} className="text-center p-5 bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] card-lift border border-transparent hover:border-primary-hover">
                  <div className="w-[50px] h-[50px] mx-auto mb-3 bg-primary text-foreground rounded-full flex items-center justify-center">{s.icon}</div>
                  <h4 className="text-lg mb-1">{s.title}</h4>
                  <p className="text-sm opacity-75">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Book a Consultation <IconArrowRight size={16} />
              </Link>
              <a href={CONTACT.whatsappCommunity} className="btn btn-whatsapp">
                <IconWhatsApp size={16} /> WhatsApp &amp; Book Your Slot
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const homeServices = SERVICES.filter((s) => s.slug !== "mobile-analysis");
  return (
    <section className="bg-section-blue section" id="services">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          center
          subtitle="What We Offer"
          title={<>Transformative <span className="text-accent">Services</span></>}
          desc="Personalized guidance rooted in ancient wisdom, designed for modern life challenges"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {homeServices.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 100}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services" className="btn btn-outline">
            See All Services <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  const [featured, recorded, free] = [LIVE_COURSES[0], RECORDED_COURSES[0], FREE_COURSES[0]];
  return (
    <section className="bg-bg section" id="courses">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          center
          subtitle="Learn & Grow"
          title={<>Master the <span className="text-accent">Cosmic Sciences</span></>}
          desc="A complete platform for Astrology, Numerology, Name Numerology & Vastu"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[featured, recorded, free].map((course, i) => (
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

function JourneySection() {
  const steps = [
    { n: "01", title: "Choose Service", desc: "Select the consultation that resonates with your needs." },
    { n: "02", title: "Book Slot", desc: "Pick a convenient time slot from our schedule." },
    { n: "03", title: "Get Guidance", desc: "Receive personalized insights during your consultation." },
    { n: "04", title: "Transform", desc: "Apply cosmic wisdom to manifest positive changes." },
  ];
  return (
    <section className="bg-section-blue-alt section">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle="How It Works" title={<>Your <span className="text-accent">Journey</span> With Us</>} />
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

function YouTubeSection() {
  const videos = [
    { id: "XOT9V3g1DrA", title: "Astrology Insights" },
    { id: "fjsBFTP-lH4", title: "Numerology Basics" },
    { id: "IlGagLhP1yI", title: "Vastu Tips" },
    { id: "u7mIDoYU7UA", title: "Cosmic Wisdom" },
  ];

  return (
    <section className="bg-section-blue section pt-0">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <SectionHeader center subtitle="YouTube" title={<>Watch & <span className="text-accent">Learn</span></>} desc="Short clips from our live sessions and courses — subscribe for full-length content." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {videos.map((v) => (
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

function TestimonialsSection() {
  return (
    <section className="bg-bg section" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle="Testimonials" title={<>What Our <span className="text-accent">Students</span> Say</>} desc="Real reviews from our students on Google" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t, i) => (
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

function CtaSection() {
  return (
    <section className="bg-bg section pt-0" id="contact-home">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card p-8 sm:p-12 lg:p-16 rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border-2 border-primary-hover/20 relative overflow-hidden">
            <span className="absolute top-6 right-10 text-[8rem] text-primary opacity-20 select-none pointer-events-none">✦</span>
            <div className="relative">
              <span className="section-subtitle">Begin Your Cosmic Journey Today</span>
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-medium mb-5">
                Align your karma with <span className="text-accent">cosmic energy</span>.
              </h2>
              <p className="opacity-85 mb-8">
                Get personalized guidance on astrology, name numerology, and vastu for health, wealth, and happiness.
              </p>
              <div className="grid gap-5 mb-8">
                {[
                  { icon: <IconPhone size={18} />, label: "Call Us", value: CONTACT.phoneMain, href: CONTACT.whatsappCommunity },
                  { icon: <IconMail size={18} />, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { icon: <IconPin size={18} />, label: "Visit", value: CONTACT.address, href: undefined },
                  { icon: <IconClock size={18} />, label: "Hours", value: "Mon–Sun · 9:00 AM – 5:00 PM", href: undefined },
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
                <a href={CONTACT.whatsappCommunity} className="btn btn-whatsapp">
                  <IconWhatsApp size={16} /> WhatsApp Us
                </a>
                <a href={`tel:${CONTACT.phoneMainRaw}`} className="btn btn-primary">
                  <IconPhone size={16} /> Call Now
                </a>
              </div>
            </div>
            <div className="bg-card p-7 sm:p-10 rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
              <h3 className="text-2xl mb-6 text-center">
                Book Your <span className="text-accent">Consultation</span>
              </h3>
              <BookingForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BlogTeaser() {
  const [first, ...rest] = POSTS;
  return (
    <section className="bg-bg section pt-0" id="blog">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader center subtitle="From the Blog" title={<>Latest <span className="text-accent">Research</span> &amp; Insights</>} desc="Deep dives into astrology, numerology and vastu — by Arvindrun Vnjay" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {POSTS.slice(0, 3).map((post, i) => (
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
      "@type": ["ProfessionalService", "Organization"],
      "@id": "https://arvinastro.in/#organization",
      name: "Arvin Astro",
      url: "https://arvinastro.in",
      logo: { "@type": "ImageObject", url: "https://arvinastro.in/images/logo.png" },
      address: { "@type": "PostalAddress", streetAddress: "Sector 16B", addressLocality: "Greater Noida West", addressRegion: "UP", addressCountry: "IN" },
      email: CONTACT.email,
      telephone: CONTACT.phoneMain,
      openingHours: "Mo-Su 09:00-17:00",
    },
    {
      "@type": "WebSite",
      "@id": "https://arvinastro.in/#website",
      url: "https://arvinastro.in",
      name: BRAND.brand,
      publisher: { "@id": "https://arvinastro.in/#organization" },
    },
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <Marquee />
      <DailyHoroscope />
      <AboutStrip />
      <ServicesSection />
      <CoursesSection />
      <JourneySection />
      <YouTubeSection />
      <TestimonialsSection />
      <BlogTeaser />
      <CtaSection />
    </>
  );
}
