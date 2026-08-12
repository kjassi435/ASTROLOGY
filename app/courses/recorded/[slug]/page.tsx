import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECORDED_COURSES } from "@/lib/courses";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { CourseEnrollBar } from "@/components/Cards";
import { IconCheck, IconClock, IconUsers } from "@/components/Icons";
import { formatINR } from "@/lib/utils";

export const dynamicParams = true;

export function generateStaticParams() {
  return RECORDED_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = RECORDED_COURSES.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Recorded Course | Arvin Astro`,
    description: course.tagline,
  };
}

export default async function RecordedCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = RECORDED_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHero
        title={course.title}
        subtitle={course.tagline}
        items={[{ label: "Courses", href: "/courses" }, { label: "Recorded Courses", href: "/courses/recorded" }, { label: course.title }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <Reveal>
              <p className="text-lg opacity-90 leading-relaxed mb-6">{course.description}</p>
            </Reveal>
            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                <h2 className="text-2xl mb-5">Course Syllabus</h2>
                <ol className="space-y-3">
                  {course.syllabus?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary-hover w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7">
                <h2 className="text-2xl mb-5">What You Get</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                        <IconCheck size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border-2 border-primary-hover/25 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-7">
                  {course.price ? (
                    <div className="mb-5">
                      <span className="text-[2.4rem] font-bold">{formatINR(course.price)}</span>
                      {course.originalPrice ? <span className="ml-2 text-foreground/50 line-through">{formatINR(course.originalPrice)}</span> : null}
                      <div className="text-xs text-foreground/60 mt-1">One-time payment</div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-primary-hover mb-5">Price on request</div>
                  )}
                  <div className="space-y-2.5 text-sm mb-6">
                    <div className="flex items-center gap-2.5">
                      <IconUsers size={16} className="text-primary-hover" /> By {course.teacher}
                    </div>
                    {course.duration ? (
                      <div className="flex items-center gap-2.5">
                        <IconClock size={16} className="text-primary-hover" /> {course.duration}
                      </div>
                    ) : null}
                  </div>
                  <CourseEnrollBar course={course} />
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.tagline,
          provider: { "@type": "Person", name: "Arvindrun Vnjay" },
          offers: course.price ? { "@type": "Offer", price: course.price, priceCurrency: "INR" } : undefined,
        }}
      />
    </>
  );
}
