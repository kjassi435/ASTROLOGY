"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ZODIAC_SIGNS, type ZodiacSign, type HoroscopeData } from "@/lib/horoscope";
import { Reveal } from "@/components/Preloader";
import { SectionHeader } from "@/components/Cards";
import { IconClose } from "@/components/Icons";

function StarRating({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-primary" : "text-muted"}>★</span>
      ))}
    </span>
  );
}

/* ─── Sign Colors ─── */
const SIGN_COLORS: Record<string, { bg: string; text: string }> = {
  aries:      { bg: "#EF4444", text: "#FFFFFF" },
  taurus:     { bg: "#F97316", text: "#FFFFFF" },
  gemini:     { bg: "#EAB308", text: "#FFFFFF" },
  cancer:     { bg: "#F59E0B", text: "#FFFFFF" },
  leo:        { bg: "#EAB308", text: "#FFFFFF" },
  virgo:      { bg: "#22C55E", text: "#FFFFFF" },
  libra:      { bg: "#14B8A6", text: "#FFFFFF" },
  scorpio:    { bg: "#06B6D4", text: "#FFFFFF" },
  sagittarius:{ bg: "#3B82F6", text: "#FFFFFF" },
  capricorn:  { bg: "#8B5CF6", text: "#FFFFFF" },
  aquarius:   { bg: "#7C3AED", text: "#FFFFFF" },
  pisces:     { bg: "#EC4899", text: "#FFFFFF" },
};

/* ─── Horoscope Modal ─── */
function HoroscopeModal({ sign, onClose }: { sign: ZodiacSign; onClose: () => void }) {
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const starCount = useMemo(() => 3 + Math.floor(Math.random() * 3), []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/horoscope/${sign.slug}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [sign.slug]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const sections = [
    { key: "career" as const, label: lang === "en" ? "Career" : "करियर", icon: "💼" },
    { key: "love" as const, label: lang === "en" ? "Love & Relationships" : "प्रेम और संबंध", icon: "❤️" },
    { key: "health" as const, label: lang === "en" ? "Health" : "स्वास्थ्य", icon: "🏥" },
    { key: "finance" as const, label: lang === "en" ? "Finance" : "वित्त", icon: "💰" },
  ];

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl border border-primary/30 shadow-2xl w-full max-w-md sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto lg:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand gradient header */}
        <div className="relative rounded-t-2xl bg-gradient-to-r from-primary to-[#00c6ff] px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-2xl text-white shrink-0">
              {sign.symbol}
            </span>
              <div className="min-w-0">
                <div className="text-white font-bold text-lg leading-tight">Moon Sign: {sign.hindi} / {sign.english}</div>
                <div className="text-white/80 text-xs uppercase tracking-wider">Chandra Rashi</div>
              </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex gap-1 bg-white/15 rounded-lg p-0.5">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-md text-xs font-semibold transition ${lang === "en" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}>English</button>
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-md text-xs font-semibold transition ${lang === "hi" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}>हिन्दी</button>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition p-1" aria-label="Close">
              <IconClose size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm text-muted-foreground">{dateStr}</div>
            <StarRating count={starCount} />
          </div>

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-bg border border-muted rounded-xl p-4">
                  <div className="h-3 bg-primary/10 rounded animate-pulse mb-2 w-1/3" />
                  <div className="h-3 bg-muted rounded animate-pulse w-full" />
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4 mt-1" />
                </div>
              ))}
            </div>
          ) : data ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2 mb-5">
                {sections.map((s) => {
                  const content = data.sections?.[s.key];
                  const text = content ? (lang === "hi" ? content.hi : content.en) : data.description;
                  return (
                    <div key={s.key} className="bg-bg border border-muted rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">{s.icon}</span>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{s.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="bg-primary/5 rounded-xl p-3 text-center border border-primary/10">
                  <div className="text-xs text-primary/70 mb-1">{lang === "en" ? "Mood" : "मूड"}</div>
                  <div className="text-sm font-semibold text-primary capitalize">{data.mood}</div>
                </div>
                <div className="bg-primary/5 rounded-xl p-3 text-center border border-primary/10">
                  <div className="text-xs text-primary/70 mb-1">{lang === "en" ? "Lucky Color" : "शुभ रंग"}</div>
                  <div className="text-sm font-semibold text-primary capitalize">{data.luckyColor}</div>
                </div>
                <div className="bg-primary/5 rounded-xl p-3 text-center border border-primary/10">
                  <div className="text-xs text-primary/70 mb-1">{lang === "en" ? "Lucky Number" : "शुभ अंक"}</div>
                  <div className="text-sm font-semibold text-primary">{data.luckyNumber}</div>
                </div>
              </div>

              <button onClick={onClose} className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition shadow-[var(--shadow-primary)]">
                Got It
              </button>
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">Horoscope unavailable. Try again later.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function DailyHoroscope({ kicker, title, desc }: { kicker?: string; title?: string; desc?: string }) {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);

  return (
    <div id="horoscope">
      <div className="mb-10">
        <SectionHeader
          center
          subtitle={kicker}
          title={title}
          desc={desc}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {ZODIAC_SIGNS.map((sign, i) => {
          const color = SIGN_COLORS[sign.slug] ?? { bg: "#0EA5E9", text: "#FFFFFF" };
          return (
            <Reveal key={sign.slug} delay={i * 50}>
              <button
                onClick={() => setSelected(sign)}
                className="w-full flex flex-col items-center gap-2.5 p-4 rounded-xl border border-muted bg-card hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group"
              >
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: color.bg }}
                >
                  <span style={{ color: color.text, fontSize: "1.4rem", lineHeight: 1 }}>{sign.symbol}</span>
                </span>
                <span className="font-semibold text-sm text-foreground leading-tight">{sign.hindi} / {sign.english}</span>
                <span className="text-[0.6rem] opacity-60 uppercase tracking-wider font-medium">Moon Sign (Chandra Rashi)</span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {selected && <HoroscopeModal sign={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}