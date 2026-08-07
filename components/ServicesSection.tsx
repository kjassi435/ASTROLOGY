"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SectionHeader, ServiceCard } from "@/components/Cards";
import { Reveal } from "@/components/Preloader";
import { IconArrowRight } from "@/components/Icons";

export function ServicesSection() {
  const homeServices = SERVICES.filter((s) => s.slug !== "mobile-analysis");
  return (
    <section className="bg-section-blue section" id="services">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          center
          subtitle="What We Offer"
          title={<>Transformative <span className="text-accent">Services</span></>}
          desc="Personalized guidance rooted in ancient wisdom, designed for modern life challenges"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {homeServices.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 100}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services" className="btn btn-outline">
            See All Services <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
