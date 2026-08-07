import type { Metadata } from "next";
import { RECORDED_COURSES, type CourseCategory } from "@/lib/courses";
import { PageHero } from "@/components/PageHero";
import { CourseCard, SectionHeader } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Recorded Courses — Astrology, Numerology & Vastu | Arvin Astro",
  description:
    "Professional online recorded Numerology, Vastu & Astrology courses. Learn occult science at your own pace with expert-led sessions. Ideal for India and global learners.",
};

const CATEGORIES: { key: CourseCategory; label: string }[] = [
  { key: "vastu", label: "🔮 Vastu Courses" },
  { key: "numerology", label: "🔢 Numerology Courses" },
  { key: "astrology", label: "⭐️ Astrology Courses" },
];

const coursesInCategory = (key: CourseCategory) =>
  RECORDED_COURSES.filter((c) => c.category === key).sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

export default function RecordedCoursesPage() {
  return (
    <>
      <PageHero
        title={<>Professional Online <span className="text-accent">Recorded Courses</span></>}
        subtitle="Learn Occult Science at your own pace with our expert-led recorded sessions. Master Astrology, Numerology & Vastu."
        items={[{ label: "Courses", href: "/courses" }, { label: "Recorded Courses" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-6 sm:p-8 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Fixed validity period", "Expert-led video lectures", "Study files included", "Learn at your own pace", "Hindi + English guidance", "Certificate on completion"].map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm font-medium">
                <span className="w-6 h-6 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                  <IconCheck size={13} />
                </span>
                {f}
              </div>
            ))}
          </div>

          {CATEGORIES.map(({ key, label }) => {
            const courses = coursesInCategory(key);
            if (courses.length === 0) return null;
            return (
              <div key={key} className="mb-16 last:mb-0">
                <SectionHeader center subtitle="Recorded Courses" title={label} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {courses.map((course, i) => (
                    <Reveal key={course.slug} delay={(i % 3) * 100}>
                      <CourseCard course={course} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
