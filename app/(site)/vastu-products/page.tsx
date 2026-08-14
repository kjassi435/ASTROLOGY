import type { Metadata } from "next";
import { getProducts } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { IconWhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Vastu Products — Genuine Energy Products | Arvin Astro",
  description:
    "Buy genuine vastu products, energy products, remedies and spiritual items recommended by Arvindrun Vnjay. Certified vastu products for home and office.",
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

          <div className="mt-14 bg-foreground rounded-[var(--radius-lg)] p-8 sm:p-10 text-center text-bg">
            <h2 className="text-2xl sm:text-3xl mb-3">Not sure which product you need?</h2>
            <p className="text-sm opacity-80 max-w-xl mx-auto mb-7">
              Describe your concern on WhatsApp and we will recommend the right product or remedy for you — no pushy upselling.
            </p>
            <a
              href="https://wa.me/919718646655?text=Hi%2C%20I%20need%20help%20choosing%20a%20vastu%20product."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <IconWhatsApp size={16} /> Get a Recommendation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
