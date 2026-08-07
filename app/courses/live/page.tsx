import type { Metadata } from "next";
import { LIVE_COURSES } from "@/lib/courses";
import { PageHero } from "@/components/PageHero";
import { CourseCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Live Courses — Numerology, Vastu & Astrology | Arvin Astro",
  description:
    "Professional live Numerology, Vastu & Astrology occult courses. Learn from India's expert Numerologist and Vastu Consultant Arvindrun Vnjay with interactive live classes.",
};

export default function LiveCoursesPage() {
  return (
    <>
      <PageHero
        title={<>Professional Live <span className="text-accent">Numerology, Vastu & Astrology</span> Occult Courses</>}
        subtitle="Learn from India's expert Numerologist and Vastu Consultant, Arvindrun Vnjay. Join our online Live classes to master Name Numerology, Predictive Numerology, Astrology and Vastu."
        items={[{ label: "Courses", href: "/courses" }, { label: "Live Courses" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {LIVE_COURSES.map((course, i) => (
              <Reveal key={course.slug} delay={(i % 2) * 100}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
