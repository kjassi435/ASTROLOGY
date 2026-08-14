import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, type Course } from "@/lib/courses";
import { getCourses } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { CourseEnrollBar } from "@/components/Cards";
import { IconCheck, IconClock, IconUsers, IconVideo, IconWhatsApp } from "@/components/Icons";
import { CONTACT } from "@/lib/site";

export const dynamicParams = true;

async function resolveCourse(slug: string): Promise<Course | undefined> {
  const base = COURSES.find((c) => c.slug === slug);
  const db = (await getCourses()).find((c) => c.slug === slug);
  if (!base && !db) return undefined;
  return (db ? { ...(base ?? {}), ...(db as Course) } : base) as Course;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await resolveCourse(slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Live Course | Arvin Astro`,
    description: course.tagline,
  };
}

export default async function LiveCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await resolveCourse(slug);
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

            {course.startsFrom ? (
              <Reveal>
                <div className="bg-foreground text-bg rounded-[var(--radius-lg)] p-6 sm:p-7 mb-8 flex flex-wrap items-center gap-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">New Batch</div>
                    <div className="text-xl font-bold">{course.startsFrom}</div>
                  </div>
                  {course.priceNote ? <span className="ml-auto text-sm opacity-80">{course.priceNote}</span> : null}
                </div>
              </Reveal>
            ) : null}

            {course.about ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-4">About This Course</h2>
                  <p className="opacity-80 leading-relaxed">{course.about}</p>
                </div>
              </Reveal>
            ) : null}

            {course.whyJoin?.length ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-5">Why Join?</h2>
                  <ul className="space-y-3">
                    {course.whyJoin.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                          <IconCheck size={12} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            {course.perks?.length ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-5">Perks of Enrollment</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 text-[0.6rem]">✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

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
                <h2 className="text-2xl mb-5">What You Will Learn</h2>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
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
                  {course.payUrl ? (
                    <a
                      href={course.payUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center mt-3"
                    >
                      Pay Now {course.price ? `— ₹${course.price}/class` : ""}
                    </a>
                  ) : null}
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
