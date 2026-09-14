import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, type Course } from "@/lib/courses";
import { getCourses, matchSlug } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { IconCheck, IconClock, IconUsers, IconVideo } from "@/components/Icons";
import { waLink, stripPerClass, stripRecordingRefs, formatINR } from "@/lib/utils";
import { InlineText } from "@/components/Inline";
import { CONTACT } from "@/lib/site";

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function resolveCourse(slug: string): Promise<Course | undefined> {
  const base = matchSlug(COURSES, slug);
  const db = matchSlug(await getCourses(), slug);
  if (!base && !db) return undefined;
  return (db ? { ...(base ?? {}), ...(db as Course) } : base) as Course;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = (await getCourses()).find((c) => c.type === "live" && c.slug === slug);
  if (!course) return { title: "Course Not Found" };
  const title = `${course.title} - Live Course | Arvin Astro`;
  return {
    title,
    description: course.tagline ?? course.description,
    keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
    };
}

const DEFAULT_LIVE_BOX_TITLE = "Every session is **live** — join in real time, ask questions on the spot, and stay connected with the community between classes.";

export default async function LiveCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await resolveCourse(slug);
  if (!course) notFound();

  // Derived price string for the top dark box right side. Always reflects
  // the canonical `price` and `originalPrice` fields, so editing them in
  // the admin updates this string in real time. If the admin has set a
  // custom `priceNote`, that text is used instead (free-form override).
  const derivedPriceNote = (() => {
    const parts: string[] = [];
    if (course.price) parts.push(`Booking Amount — ${formatINR(course.price)}/– Only`);
    if (course.originalPrice) parts.push(`TOTAL FEES ${formatINR(course.originalPrice)}/– Only`);
    return parts.join(" | ");
  })();
  const rightText = (course.priceNote && course.priceNote.trim()) || derivedPriceNote;

  // Bottom dark box text: admin override > default.
  const bottomBoxTitle = (course.liveSessionTitle && course.liveSessionTitle.trim()) || DEFAULT_LIVE_BOX_TITLE;
  const bottomBoxBody = (course.liveSessionBody && course.liveSessionBody.trim()) || "";

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
              <p className="text-lg opacity-90 leading-relaxed mb-8"><InlineText text={stripRecordingRefs(stripPerClass(course.description))} keyPrefix="d" /></p>
            </Reveal>

            {course.startsFrom ? (
              <Reveal>
                <div className="bg-foreground text-bg rounded-[var(--radius-lg)] p-6 sm:p-7 mb-8 flex flex-wrap items-center gap-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">New Batch</div>
                    <div className="text-xl font-bold">{course.startsFrom}</div>
                  </div>
                  {rightText ? <span className="ml-auto text-sm opacity-80"><InlineText text={stripRecordingRefs(stripPerClass(rightText))} keyPrefix="r" /></span> : null}
                </div>
              </Reveal>
            ) : null}

            {course.about ? (
              <Reveal>
                <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                  <h2 className="text-2xl mb-4">About This Course</h2>
                  <p className="opacity-80 leading-relaxed"><InlineText text={stripRecordingRefs(stripPerClass(course.about))} keyPrefix="a" /></p>
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
                        <InlineText text={item} keyPrefix={`wj-${i}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            {(() => {
              const livePerks = (course.perks ?? []).filter((p) => !/record/i.test(p));
              return livePerks.length ? (
                <Reveal>
                  <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                    <h2 className="text-2xl mb-5">Perks of Enrollment</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {livePerks.map((p, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          <InlineText text={p} keyPrefix={`pk-${i}`} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null;
            })()}

            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-8">
                <h2 className="text-2xl mb-5">What You Get</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.features.filter((f) => !/record/i.test(f)).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                        <IconCheck size={12} />
                      </span>
                      <InlineText text={f} keyPrefix={`ft-${i}`} />
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
                      <InlineText text={item} keyPrefix={`sy-${i}`} />
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 flex flex-wrap items-center gap-4 bg-foreground text-bg rounded-[var(--radius-lg)] p-7">
                <IconVideo size={28} className="text-primary shrink-0" />
                <p className="text-sm flex-1">
                  <InlineText text={bottomBoxTitle} keyPrefix="bs-title" />
                  {bottomBoxBody ? <> <InlineText text={bottomBoxBody} keyPrefix="bs-body" /></> : null}
                </p>
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
                        <IconClock size={16} className="text-primary-hover" /> {stripRecordingRefs(stripPerClass(course.duration))}
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2.5">
                      <IconVideo size={16} className="text-primary-hover" /> Live
                    </div>
                  </div>
                  {course.payUrl ? (
                    <a
                      href={course.payUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center"
                    >
                      Pay Now {course.price ? `— ${formatINR(course.price)}` : ""}
                    </a>
                  ) : (
                    <a
                      href={waLink(CONTACT.phoneMainRaw, `Namaste Arvindrun ji, I want to enroll in the "${course.title}" live course. Please share the details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-full justify-center"
                    >
                      Enroll Now
                    </a>
                  )}
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
