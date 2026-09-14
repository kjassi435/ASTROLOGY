import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, type BlogPost } from "@/lib/blog";
import { getPosts, matchSlug } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { waLink, sanitizeHtml } from "@/lib/utils";
import { CONTACT } from "@/lib/site";
import { IconArrowLeft, IconWhatsApp } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = true;

async function resolvePost(slug: string): Promise<BlogPost | undefined> {
  const base = matchSlug(POSTS, slug);
  const db = matchSlug(await getPosts(), slug);
  if (!base && !db) return undefined;
  let post: BlogPost;
  if (base) {
    post = {
      ...base,
      title: db?.title ?? base.title,
      category: db?.category ?? base.category,
      excerpt: db?.excerpt ?? base.excerpt,
      date: db?.date ?? base.date,
      image: db?.image ?? base.image,
      readTime: db?.readTime ?? base.readTime,
      body: db?.body ?? base.body,
      status: db?.status ?? base.status,
      author: db?.author ?? base.author,
      tags: db?.tags ?? base.tags,
    };
  } else {
    post = { ...(db as BlogPost), content: [] };
  }
  if ((post.status ?? "published") === "draft") return undefined;
  return post;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return { title: "Article Not Found | Arvin Astro Blog" };
  const title = `${post.title} | Arvin Astro Blog`;
  const desc = post.excerpt ?? "";
  return {
    title,
    description: desc,
    keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) notFound();

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        items={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
      />

      <article className="bg-bg section pt-10 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="aspect-[16/8] rounded-[var(--radius-lg)] overflow-hidden border border-primary-hover/20 mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60 mb-8 border-b border-muted pb-6">
              {post.author ? (
                <span className="font-semibold text-foreground">{post.author}</span>
              ) : null}
              {post.date ? <span>· {post.date}</span> : null}
              {post.readTime ? <span>· {post.readTime}</span> : null}
            </div>
          </Reveal>

          <Reveal>
            {post.body && post.body.trim() ? (
              <div
                className="prose-foreground space-y-6 text-[1.02rem] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body) }}
              />
            ) : (
              <div className="prose-foreground space-y-6 text-[1.02rem] leading-relaxed">
                {post.content.map((block, i) => (
                  <div key={i}>
                    {block.heading ? <h2 className="text-2xl mt-10 mb-2">{block.heading}</h2> : null}
                    {block.paragraphs.map((p, j) => (
                      <p key={j} className="mb-4">
                        {p}
                      </p>
                    ))}
                    {block.list ? (
                      <ul className="list-disc pl-5 space-y-2 my-4 opacity-90">
                        {block.list.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          {post.tags && post.tags.trim() ? (
            <Reveal>
              <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
                {post.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-card border border-primary-hover/20 text-foreground/70">#{t}</span>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal>
            <div className="mt-12 bg-foreground text-bg rounded-[var(--radius-lg)] p-8 text-center">
              <h2 className="text-2xl mb-3">Got questions about this topic?</h2>
              <p className="text-sm opacity-80 mb-6">Ask us directly on WhatsApp — we love discussing the occult science.</p>
              <a href={waLink(CONTACT.phoneMainRaw, "I read your article and have a question.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <IconWhatsApp size={16} /> Ask on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 mt-10 text-sm font-semibold text-primary-hover hover:gap-3 transition-all">
              <IconArrowLeft size={15} /> Back to all articles
            </Link>
          </Reveal>
        </div>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Person", name: "Arvindrun Vnjay" },
        }}
      />
    </>
  );
}
