import type { Metadata } from "next";
import Link from "next/link";
import { RECORDED_COURSES, FREE_COURSES, LIVE_COURSES } from "@/lib/courses";
import { PageHero } from "@/components/PageHero";
import { CourseCard, SectionHeader } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { IconAward, IconPlay, IconVideo } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Courses — Astrology, Numerology & Vastu | Arvin Astro",
  description:
    "Live, Recorded and Free courses on Astrology, Name Numerology, Numerology and Vastu by Arvindrun Vnjay. Certified professional courses for India and global learners.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        title={<>A Complete <span className="text-accent">Learning Platform</span></>}
        subtitle="A complete platform for Astrology, Numerology, Name Numerology & Vastu. Learn at your pace, live with the master, or start free."
        items={[{ label: "Our Courses" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {[
              { icon: <IconVideo size={22} />, title: "Live Sessions", desc: "Interactive live classes with real-time Q&A and community learning.", href: "/courses/live", btn: "Explore Live" },
              { icon: <IconAward size={22} />, title: "Recorded Lectures", desc: "Comprehensive pre-recorded courses on every topic — learn at your pace.", href: "/courses/recorded", btn: "Browse Recorded" },
              { icon: <IconPlay size={22} />, title: "Free Courses", desc: "In-depth free courses to get you started on your cosmic journey.", href: "/courses/free", btn: "Start Free" },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <Link href={card.href} className="block h-full bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-8 card-lift group">
                  <div className="w-14 h-14 rounded-full bg-primary text-foreground flex items-center justify-center mb-5">{card.icon}</div>
                  <h3 className="text-2xl mb-3 group-hover:text-primary-hover transition">{card.title}</h3>
                  <p className="text-sm opacity-80 mb-6">{card.desc}</p>
                  <span className="btn btn-outline btn-sm">{card.btn}</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <SectionHeader center subtitle="Live Courses" title={<>Learn Live with <span className="text-accent">Arvindrun Vnjay</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16">
            {LIVE_COURSES.slice(0, 2).map((course, i) => (
              <Reveal key={course.slug} delay={i * 100}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          <SectionHeader center subtitle="Recorded Courses" title={<>Most Popular <span className="text-accent">Recorded Courses</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {RECORDED_COURSES.slice(0, 3).map((course, i) => (
              <Reveal key={course.slug} delay={(i % 3) * 100}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          <SectionHeader center subtitle="Free Courses" title={<>Start Your Journey <span className="text-accent">Free</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {FREE_COURSES.map((course, i) => (
              <Reveal key={course.slug} delay={(i % 4) * 80}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
