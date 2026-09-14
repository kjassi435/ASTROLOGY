import type { Metadata } from "next";
import { getCourses } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { CourseCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { WhatsAppCommunity } from "@/components/WhatsAppCommunity";

export const metadata: Metadata = {
  title: "Free Courses - Astrology, Numerology & Vastu | Arvin Astro",
  description:
    "Start your occult journey for free! Learn Astrology, Numerology & Vastu with expert teacher Arvindrun Vnjay. Free recorded lessons and tutorials on YouTube.",
  keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
  };

export default async function FreeCoursesPage() {
  const freeCourses = (await getCourses()).filter((c) => c.type === "free");
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
            {freeCourses.map((course, i) => (
              <Reveal key={course.slug} delay={(i % 2) * 100}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          <WhatsAppCommunity />
        </div>
      </section>
    </>
  );
}
