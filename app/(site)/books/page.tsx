import type { Metadata } from "next";
import { getBooks } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { BookCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Recommended Books — Best Astrology, Numerology & Vastu Books | Arvin Astro",
  description:
    "Get the best recommended Astrology, Numerology, Name Numerology & Vastu books handpicked by Arvindrun Vnjay — curated occult library for serious learners.",
};

export default async function BooksPage() {
  const books = await getBooks();
  return (
    <>
      <PageHero
        title={<>Recommended Books for <span className="text-accent">Astrology, Numerology & Vastu</span> Learning</>}
        subtitle="We recommend the best astrology, numerology & vastu books for occult science learners — from beginner to advanced level."
        items={[{ label: "Recommended Books" }]}
      />

      <section className="bg-section-blue-alt section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book, i) => (
              <Reveal key={book.title} delay={(i % 4) * 60}>
                <BookCard book={book} index={i} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 text-center max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Want a personalised reading list based on your level and goal? Message us on WhatsApp and we will recommend the right books for you.
            </p>
            <a
              href="https://wa.me/919718646655?text=Hi%2C%20please%20recommend%20books%20for%20me."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-sm mt-5"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
