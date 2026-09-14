import type { Metadata } from "next";
import { getProducts } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Vastu Products - Genuine Energy Products | Arvin Astro",
  description:
    "Buy genuine vastu products, energy products, remedies and spiritual items recommended by Arvindrun Vnjay. Certified vastu products for home and office.",
  keywords: ["astrologer", "numerologist", "vastu", "name numerology", "kundli analysis", "Arvindrun Vnjay", "Arvin Astro", "online consultation", "occult science", "vedic astrology"],
  };

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        title={<>Vastu Products & <span className="text-accent">Energy Remedies</span></>}
        subtitle="Genuine vastu products and spiritual energy remedies for home, office and living spaces — personally recommended by Arvindrun Vnjay."
        items={[{ label: "Vastu Products" }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <Reveal key={product.title} delay={(i % 4) * 60} className="h-full">
                <ProductCard product={product} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
