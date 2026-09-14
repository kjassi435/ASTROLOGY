"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconArrowRight } from "@/components/Icons";
import { MARQUEE_ITEMS } from "@/lib/site";

export function Hero({
  desktopSlides,
  mobileSlide,
  title,
  subtitle,
  marqueeItems,
}: {
  desktopSlides?: string[];
  mobileSlide?: string;
  title?: string;
  subtitle?: string;
  marqueeItems?: string[];
} = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const rawSlides =
    desktopSlides && desktopSlides.length
      ? desktopSlides
      : ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];
  const slides = [...new Set(rawSlides)];
  const multi = slides.length > 1;
  const mobile = mobileSlide || "/images/hero-mobile.png";
  const marquee = marqueeItems && marqueeItems.length ? marqueeItems : MARQUEE_ITEMS;
  const marqueeTrack = [...marquee, ...marquee];

  useEffect(() => {
    if (!multi) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [multi, slides.length]);

  return (
    <section className="relative h-[100dvh] min-h-[500px] bg-black overflow-hidden" id="home">
      {/* Desktop: 3-image slider */}
      <div className="hidden md:block absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide}
              alt={`Hero slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              unoptimized={slide.startsWith("http")}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Desktop: slide controls */}
      {multi && (
        <>
      <div className="hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 z-20 items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:left-6 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <IconChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:right-6 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <IconArrowRight size={18} />
      </button>
        </>
      )}

      {/* Mobile: single portrait image */}
      <div className="block md:hidden absolute inset-0 z-0">
        <Image
          src={mobile}
          alt="Arvin Astro"
          fill
          priority
          sizes="100vw"
          unoptimized={mobile.startsWith("http")}
          className="object-cover object-center"
        />
      </div>

      {/* Title overlay */}
      {(title || subtitle) && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 px-6">
          <div className="max-w-3xl text-center text-white">
            {title ? <h1 className="text-[clamp(1.8rem,4.5vw,3.6rem)] font-bold leading-tight drop-shadow-lg">{title}</h1> : null}
            {subtitle ? <p className="mt-4 text-[clamp(0.95rem,1.8vw,1.25rem)] font-light text-white/90 drop-shadow-md max-w-2xl mx-auto">{subtitle}</p> : null}
          </div>
        </div>
      )}

      {/* Marquee strip - positioned at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20 marquee-section" aria-hidden>
        <div className="marquee-track">
          <div className="marquee-content">
            {marqueeTrack.map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                {item}
                <span className="w-2 h-2 rounded-full bg-primary/50 shrink-0"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}