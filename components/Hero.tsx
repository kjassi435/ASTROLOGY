"use client";

import { useEffect, useState } from "react";
import { IconChevronLeft, IconArrowRight } from "@/components/Icons";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/hero-1.png",
    "/images/hero-2.png",
    "/images/hero-3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100dvh] min-h-[500px] bg-black flex items-center justify-center overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide}
              alt={`Hero slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 sm:bottom-10">
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
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:left-6 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <IconChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:right-6 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <IconArrowRight size={18} />
      </button>
    </section>
  );
}
