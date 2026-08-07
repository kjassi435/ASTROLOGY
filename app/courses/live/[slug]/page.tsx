import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LIVE_COURSES } from "@/lib/courses";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { CourseEnrollBar } from "@/components/Cards";
import { IconCheck, IconClock, IconUsers, IconVideo, IconWhatsApp } from "@/components/Icons";
import { CONTACT } from "@/lib/site";

export const dynamicParams = true;

export function generateStaticParams() {
  return LIVE_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = LIVE_COURSES.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Live Course | Arvin Astro`,
    description: course.tagline,
  };
}

export default async function LiveCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = LIVE_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHero
        title={course.title}
        subtitle={course.tagline}
        items={[{ label: "Courses", href: "/courses" }, { label: "Live Courses", href: "/courses/live" }, { label: course.title }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <Reveal>
              <p className="text-lg opacity-90 leading-relaxed mb-8">{course.description}</p>
            </Reveal>

            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
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

            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7">
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
              <div className="mt-8 flex flex-wrap items-center gap-4 bg-foreground text-bg rounded-[var(--radius-lg)] p-7">
                <IconVideo size={28} className="text-primary shrink-0" />
                <p className="text-sm flex-1">
                  Every live class is <strong className="text-primary">recorded</strong> and shared, so you never miss a session. Doubts are cleared in
                  real time, and you stay connected with the community between classes.
                </p>
                <a href={CONTACT.whatsappCommunity} className="btn btn-whatsapp btn-sm">
                  <IconWhatsApp size={14} /> Ask a Question
                </a>
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border-2 border-primary-hover/25 overflow-hidden">
                <div className="gradient-band h-40 flex items-center justify-center text-[3rem] text-primary-hover">✦</div>
                <div className="p-7">
                  <div className="text-xl mb-4">Live Batch — Enroll Now</div>
                  <div className="space-y-2.5 text-sm mb-6">
                    <div className="flex items-center gap-2.5">
                      <IconUsers size={16} className="text-primary-hover" /> By {course.teacher}
                    </div>
                    {course.duration ? (
                      <div className="flex items-center gap-2.5">
                        <IconClock size={16} className="text-primary-hover" /> {course.duration}
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2.5">
                      <IconVideo size={16} className="text-primary-hover" /> Live + Recorded
                    </div>
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
        }}
      />
    </>
  );
}
