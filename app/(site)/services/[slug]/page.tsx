import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/lib/services";
import { CONTACT } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Preloader";
import { IconCheck, IconPhone, IconWhatsApp } from "@/components/Icons";
import { ServiceEnquiryForm } from "@/components/ServiceEnquiryForm";
import { formatINR, waLink } from "@/lib/utils";

export const dynamicParams = true;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} — Book Consultation | Arvin Astro`,
    description: service.tagline,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.name}
        subtitle={service.tagline}
        items={[{ label: "Our Services", href: "/services" }, { label: service.name }]}
      />

      <section className="bg-bg section pt-14">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          <div>
            <Reveal>
              {service.longDescription.map((para, i) => (
                <p key={i} className={i === 0 ? "text-lg opacity-90 mb-5 leading-relaxed" : "opacity-80 mb-5 leading-relaxed"}>
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7 mb-10">
                <h2 className="text-2xl mb-4">What&apos;s Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center shrink-0">
                        <IconCheck size={12} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {service.tiers.length > 0 ? (
              <Reveal>
                <div className="mb-10">
                  <h2 className="text-2xl mb-2">Choose Your Plan</h2>
                  <p className="opacity-70 text-sm mb-6">Review the description above before booking any service or class. After making payment, please share the screenshot on WhatsApp +91 9319305731.</p>
                  <div className={`grid gap-6 ${service.tiers.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
                    {service.tiers.map((tier, i) => (
                      <div key={tier.name} className="bg-card rounded-[var(--radius-lg)] border-2 border-primary-hover/25 p-7 flex flex-col">
                        {tier.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={tier.image} alt={tier.name} className="w-full h-36 object-cover rounded-[var(--radius-md)] mb-5" loading="lazy" />
                        ) : null}
                        <div className="text-sm uppercase tracking-wider text-primary font-semibold mb-1">{tier.mode}</div>
                        <h3 className="text-xl font-bold mb-3">{tier.name}</h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl font-bold">{tier.price ? formatINR(tier.price) : "Price on request"}</span>
                          {tier.duration ? <span className="text-sm opacity-60">{tier.duration}</span> : null}
                        </div>
                        <ul className="space-y-2.5 text-sm opacity-80 mb-6 flex-1">
                          {tier.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 text-[0.6rem]">✦</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="space-y-3">
                          {tier.payLink ? (
                            <a href={tier.payLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
                              Pay Now {tier.price ? `— ${formatINR(tier.price)}` : ""}
                            </a>
                          ) : null}
                          <a
                            href={waLink(CONTACT.phoneMainRaw, `Namaste Arvindrun ji, I want to book "${tier.name}" (${service.name}). Please share the details.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp w-full justify-center"
                          >
                            <IconWhatsApp size={16} /> Book on WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal>
              <div className="bg-foreground text-bg rounded-[var(--radius-lg)] p-7 sm:p-8 mb-10">
                <h3 className="text-xl text-primary mb-4">Important Notes</h3>
                <ul className="space-y-2.5 text-sm opacity-90">
                  {service.bookingNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-primary mt-0.5">✦</span>
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-primary/20 text-sm">
                  After payment, please share the payment screenshot on WhatsApp{" "}
                  <a href={`tel:${CONTACT.phoneMainRaw}`} className="text-primary font-semibold hover:underline">
                    {CONTACT.phoneMain}
                  </a>{" "}
                  to confirm your booking.
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <Reveal delay={50}>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7">
                <h3 className="text-xl mb-5">Other Services</h3>
                <ul className="space-y-1">
                  {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-sm hover:bg-primary/10 hover:text-primary transition"
                      >
                        {s.name}
                        <span className="text-primary-hover">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-card rounded-[var(--radius-lg)] border border-primary-hover/20 p-7">
                <h3 className="text-xl mb-5">Enquire Now</h3>
                <ServiceEnquiryForm serviceSlug={service.slug} serviceName={service.name} />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-foreground rounded-[var(--radius-lg)] p-7 text-bg text-center">
                <h3 className="text-xl mb-3">If You Need Any Help Contact With Us</h3>
                <a href={`tel:${CONTACT.phoneMainRaw}`} className="text-3xl font-bold text-primary hover:opacity-90 transition">
                  {CONTACT.phoneMain}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.tagline,
          provider: { "@type": "Person", name: "Arvindrun Vnjay", url: "https://arvinastro.in/about" },
          areaServed: ["IN", "US", "GB", "CA", "AU"],
          offers: service.tiers
            .filter((t) => t.price)
            .map((t) => ({
              "@type": "Offer",
              name: t.name,
              price: t.price,
              priceCurrency: "INR",
            })),
        }}
      />
    </>
  );
}
