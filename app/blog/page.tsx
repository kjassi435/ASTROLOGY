import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, BLOG_CATEGORIES } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Blog — Astrology, Numerology & Vastu Articles | Arvin Astro",
  description:
    "Read practical articles on Astrology, Name Numerology, Numerology & Vastu from expert Arvindrun Vnjay. Learn remedies, tips and deep occult science insights.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title={<>Insights from the <span className="text-accent">Occult World</span></>}
        subtitle="Practical articles on Astrology, Numerology, Name Numerology and Vastu — written with the learner in mind."
        items={[{ label: "Blog" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-4 py-2 rounded-full bg-primary text-foreground text-sm font-semibold">All Posts</span>
            {BLOG_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/blog?category=${cat.slug}`} className="px-4 py-2 rounded-full border border-primary-hover/30 text-sm hover:bg-primary/30 transition">
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 100}>
                <Link href={`/blog/${post.slug}`} className="group bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 overflow-hidden flex flex-col h-full card-lift">
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-foreground/60 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-card border border-primary-hover/20">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-xl mb-3 group-hover:text-primary-hover transition leading-snug">{post.title}</h2>
                    <p className="text-sm opacity-75 mb-5 flex-1">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-hover">
                      Read Article <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
