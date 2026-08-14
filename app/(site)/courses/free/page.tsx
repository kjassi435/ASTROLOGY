import type { Metadata } from "next";
import { FREE_COURSES } from "@/lib/courses";
import { PageHero } from "@/components/PageHero";
import { CourseCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { CONTACT } from "@/lib/site";
import { IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Free Courses — Astrology, Numerology & Vastu | Arvin Astro",
  description:
    "Start your occult journey for free! Learn Astrology, Numerology & Vastu with expert teacher Arvindrun Vnjay. Free recorded lessons and tutorials on YouTube.",
};

export default function FreeCoursesPage() {
  return (
    <>
      <PageHero
        title={<>Free Online <span className="text-accent">Astrology, Numerology & Vastu</span> Learning Resources</>}
        subtitle="Start your occult journey for free! Learn Astrology, Numerology & Vastu with our expert teacher, Arvindrun Vnjay."
        items={[{ label: "Courses", href: "/courses" }, { label: "Free Courses" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {FREE_COURSES.map((course, i) => (
              <Reveal key={course.slug} delay={(i % 2) * 100}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 bg-card rounded-[var(--radius-xl)] border-2 border-primary-hover/20 p-8 sm:p-12 text-center">
            <span className="text-[4rem] block text-primary-hover mb-4">✦</span>
            <h2 className="text-3xl mb-4">
              Join our <span className="text-accent">WhatsApp Community</span> for updates
            </h2>
            <p className="opacity-80 max-w-2xl mx-auto mb-8">
              We often arrange free Astrology, Name Numerology, Numerology & Vastu sessions for our learners. Join the community to stay updated
              about free &amp; paid sessions.
            </p>
            <a href={CONTACT.whatsappCommunity} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <IconWhatsApp size={16} /> Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
