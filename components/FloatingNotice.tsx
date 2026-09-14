"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconClose, IconChevronLeft, IconExternal } from "./Icons";

type Slide = { image?: string; title?: string; desc?: string; link?: string };

function slidesFromData(data: Record<string, string>): Slide[] {
  const out: Slide[] = [];
  for (let i = 1; i <= 3; i++) {
    const image = (data[`noticeImage${i}`] || "").trim();
    const title = (data[`noticeTitle${i}`] || "").trim();
    const desc = (data[`noticeDesc${i}`] || "").trim();
    const link = (data[`noticeLink${i}`] || "").trim();
    if (image || title || desc) out.push({ image, title, desc, link });
  }
  return out;
}

export function FloatingNotice({ data }: { data: Record<string, string> }) {
  const enabled = (data.noticeEnabled || "").trim().toLowerCase() === "true";
  const slides = slidesFromData(data);
  const intervalMs = Math.max(1500, Number(data.noticeInterval) || 4000);
  const [idx, setIdx] = useState(0);
  const [dismissed, setDismissed] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!enabled || slides.length === 0) return;
    try {
      const raw = localStorage.getItem("noticeDismissedAt");
      if (raw) {
        const at = Number(raw);
        if (Number.isFinite(at) && Date.now() - at < 24 * 60 * 60 * 1000) {
          setDismissed(true);
          return;
        }
        localStorage.removeItem("noticeDismissedAt");
      }
    } catch {}
    setDismissed(false);
  }, [enabled, slides.length]);

  const go = useCallback((next: number) => {
    if (slides.length <= 1) return;
    setIdx((i) => (next + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (dismissed || !enabled || slides.length <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [dismissed, enabled, slides.length, intervalMs, paused]);

  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, dismissed, go]);

  function handleClose() {
    setDismissed(true);
    try { localStorage.setItem("noticeDismissedAt", String(Date.now())); } catch {}
  }

  if (!enabled || dismissed || slides.length === 0) return null;
  const cur = slides[idx] ?? slides[0];
  const isExternal = !!cur.link && /^https?:\/\//i.test(cur.link);

  const CardInner = (
    <>
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        {cur.image ? (
          <Image
            src={cur.image}
            alt={cur.title || "Notice"}
            fill
            sizes="360px"
            unoptimized={cur.image.startsWith("http") || cur.image.startsWith("data:")}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">No image</div>
        )}
      </div>
      <div className="p-4">
        {cur.title ? (
          <div className="text-[15px] font-bold leading-tight text-slate-900 flex items-start gap-1.5">
            <span className="flex-1">{cur.title}</span>
            {cur.link ? <IconExternal size={12} className="mt-1 shrink-0 text-orange-500" /> : null}
          </div>
        ) : null}
        {cur.desc ? <p className="mt-1.5 text-[12.5px] leading-snug text-slate-500 line-clamp-2">{cur.desc}</p> : null}
        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Notice slides">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={i === idx ? "h-2 w-5 rounded-full bg-orange-500 transition-all" : "h-2 w-2 rounded-full bg-slate-200 transition-all hover:bg-slate-300"}
              />
            ))}
          </div>
          {slides.length > 1 ? (
            <div className="flex items-center gap-1">
              <button aria-label="Previous slide" onClick={() => go(idx - 1)} className="h-7 w-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50">
                <IconChevronLeft size={12} />
              </button>
              <button aria-label="Next slide" onClick={() => go(idx + 1)} className="h-7 w-7 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50">
                <IconChevronLeft size={12} className="rotate-180" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <div
      className="fixed z-[1001] bottom-6 right-3 left-3 md:left-auto md:right-6 md:bottom-8 md:w-[360px] pointer-events-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-slate-200 overflow-hidden pointer-events-auto">
        <button
          aria-label="Close notice"
          onClick={handleClose}
          className="absolute -top-2 -right-2 md:top-2 md:right-2 z-10 h-8 w-8 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:bg-slate-50"
        >
          <IconClose size={14} />
        </button>
        {cur.link ? (
          isExternal ? (
            <a href={cur.link} target="_blank" rel="noopener noreferrer" className="block">
              {CardInner}
            </a>
          ) : (
            <Link href={cur.link} className="block">
              {CardInner}
            </Link>
          )
        ) : (
          CardInner
        )}
      </div>
    </div>
  );
}
