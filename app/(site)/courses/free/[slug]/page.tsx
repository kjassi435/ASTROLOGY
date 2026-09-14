import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, type Course } from "@/lib/courses";
import { getCourses, matchSlug } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { CourseEnrollBar } from "@/components/Cards";
import { IconCheck, IconClock, IconUsers, IconPlay, IconWhatsApp } from "@/components/Icons";
import { CONTACT } from "@/lib/site";
import { InlineText } from "@/components/Inline";

export const dynamicParams = true;

async function resolveCourse(slug: string): Promise<Course | undefined> {
  const base = matchSlug(COURSES, slug);
  const db = matchSlug(await getCourses(), slug);
  if (!base && !db) return undefined;
  return (db ? { ...(base ?? {}), ...(db as Course) } : base) as Course;
}

function youtubeEmbed(url?: string): string | null {
  if (!url) return null;
  let m = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/videoseries?list=${m[1]}`;
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = (await getCourses()).find((c) => c.type === "free" && c.slug === slug);
  if (!course) return { title: "Course Not Found" };
  const title = `${course.title} - Free Course | Arvin Astro`;
  return {
    title,
    description: course.tagline ?? course.description,
    keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
    };
}

export default async function FreeCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await resolveCourse(slug);
  if (!course) notFound();

  const embed = youtubeEmbed(course.youtubeUrl);

  return (
    <>
      <PageHero
        title={course.title}
        subtitle={course.tagline}
        items={[{ label: "Courses", href: "/courses" }, { label: "Free Courses", href: "/courses/free" }, { label: course.title }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <Reveal>
              <p className="text-lg opacity-90 leading-relaxed mb-8"><InlineText text={course.description} keyPrefix="fd" /></p>
            </Reveal>

            {embed ? (
              <Reveal>
                <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] border border-primary-hover/20 mb-8">
                  <iframe
                    src={embed}
                    title={course.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            ) : null}

            {course.bullets?.length ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-5">Course Highlights</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                          <IconCheck size={12} />
                        </span>
                        <InlineText text={b} keyPrefix={`bl-${i}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            {course.about ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-4">About This Course</h2>
                  <p className="opacity-80 leading-relaxed"><InlineText text={course.about} keyPrefix="fa" /></p>
                </div>
              </Reveal>
            ) : null}

            {course.whyJoin?.length ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-5">Why Join?</h2>
                  <ul className="space-y-3">
                    {course.whyJoin.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                          <IconCheck size={12} />
                        </span>
                        <InlineText text={item} keyPrefix={`fwj-${i}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                <h2 className="text-2xl mb-5">What You Will Learn</h2>
                <ol className="space-y-3">
                  {course.syllabus?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="font-bold text-primary-hover w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <InlineText text={item} keyPrefix={`fsy-${i}`} />
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7">
                <h2 className="text-2xl mb-5">What You Get</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                        <IconCheck size={12} />
                      </span>
                      <InlineText text={f} keyPrefix={`fft-${i}`} />
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
                  <div className="text-xl mb-4">Free Course</div>
                  <div className="space-y-2.5 text-sm mb-6">
                    <div className="flex items-center gap-2.5">
                      <IconUsers size={16} className="text-primary-hover" /> By {course.teacher}
                    </div>
                    {course.duration ? (
                      <div className="flex items-center gap-2.5">
                        <IconClock size={16} className="text-primary-hover" /> {course.duration}
                      </div>
                    ) : null}
                    {course.language ? (
                      <div className="flex items-center gap-2.5">
                        <IconPlay size={16} className="text-primary-hover" /> {course.language}
                      </div>
                    ) : null}
                  </div>
                  <CourseEnrollBar course={course} />
                </div>
              </div>
            </Reveal>

            {course.beginnerNote ? (
              <Reveal>
                <div className="bg-foreground text-bg rounded-[var(--radius-lg)] p-6 text-sm leading-relaxed">
                  <InlineText text={course.beginnerNote} keyPrefix="fbn" />
                </div>
              </Reveal>
            ) : null}

            <Reveal>
              <a href={CONTACT.whatsappCommunity} className="btn btn-whatsapp w-full justify-center">
                <IconWhatsApp size={16} /> Join Free Community
              </a>
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
