import type { Metadata } from "next";
import { getBooks } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { BookCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Recommended Books - Best Astrology, Numerology & Vastu Books | Arvin Astro",
  description:
    "Get the best recommended Astrology, Numerology, Name Numerology & Vastu books handpicked by Arvindrun Vnjay - curated occult library for serious learners.",
  keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
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
        </div>
      </section>
    </>
  );
}
