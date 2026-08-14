import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/utils";
import { CONTACT } from "@/lib/site";
import { IconArrowLeft, IconWhatsApp } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article Not Found | Arvin Astro" };
  return { title: `${post.title} | Arvin Astro Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

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
          </Reveal>

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
