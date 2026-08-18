"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ZODIAC_SIGNS, type ZodiacSign, type HoroscopeData } from "@/lib/horoscope";
import { Reveal } from "@/components/Preloader";
import { IconClose, IconArrowRight } from "@/components/Icons";

function StarRating({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-[#0083fe]" : "text-white/20"}>★</span>
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
        className="relative bg-foreground rounded-2xl border border-primary-hover/30 shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-foreground border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="text-white/50 hover:text-white transition p-1">
            <IconClose size={20} />
          </button>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-md text-xs font-semibold transition ${lang === "en" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}>English</button>
            <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-md text-xs font-semibold transition ${lang === "hi" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}>हिन्दी</button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-3xl text-primary">{sign.symbol}</span>
            <div>
              <div className="text-xl font-bold text-white">{sign.hindi}</div>
              <div className="text-sm text-white/50 uppercase tracking-wider">{sign.english} / {sign.hindiTransliteration}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-white/50">{dateStr}</div>
            <StarRating count={starCount} />
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4">
                  <div className="h-3 bg-white/10 rounded animate-pulse mb-2 w-1/3" />
                  <div className="h-3 bg-white/10 rounded animate-pulse w-full" />
                  <div className="h-3 bg-white/10 rounded animate-pulse w-3/4 mt-1" />
                </div>
              ))}
            </div>
          ) : data ? (
            <>
              <div className="space-y-3 mb-6">
                {sections.map((s) => {
                  const content = data.sections?.[s.key];
                  const text = content ? (lang === "hi" ? content.hi : content.en) : data.description;
                  return (
                    <div key={s.key} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">{s.icon}</span>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{s.label}</span>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-primary/10 rounded-xl p-3 text-center">
                  <div className="text-xs text-primary/70 mb-1">{lang === "en" ? "Mood" : "मूड"}</div>
                  <div className="text-sm font-semibold text-primary capitalize">{data.mood}</div>
                </div>
                <div className="bg-primary/10 rounded-xl p-3 text-center">
                  <div className="text-xs text-primary/70 mb-1">{lang === "en" ? "Lucky Color" : "शुभ रंग"}</div>
                  <div className="text-sm font-semibold text-primary capitalize">{data.luckyColor}</div>
                </div>
                <div className="bg-primary/10 rounded-xl p-3 text-center">
                  <div className="text-xs text-primary/70 mb-1">{lang === "en" ? "Lucky Number" : "शुभ अंक"}</div>
                  <div className="text-sm font-semibold text-primary">{data.luckyNumber}</div>
                </div>
              </div>

              <button onClick={onClose} className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition">
                Got It
              </button>
            </>
          ) : (
            <p className="text-white/60 text-center py-8">Horoscope unavailable. Try again later.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function DailyHoroscope() {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);

  return (
    <div>
      <div>
        <Reveal>
          <div className="text-center mb-8">
            <span className="section-subtitle">Daily Horoscope</span>
            <h2 className="text-2xl font-medium">Your <span className="text-accent">Daily Cosmic</span> Forecast</h2>
            <p className="text-sm opacity-70 mt-1">
              Click your zodiac sign to reveal today&apos;s horoscope, lucky color, and lucky number.
            </p>
          </div>
        </Reveal>

        <div className="space-y-2.5">
          {ZODIAC_SIGNS.map((sign) => {
            const color = SIGN_COLORS[sign.slug] ?? { bg: "#0EA5E9", text: "#FFFFFF" };
            return (
              <button
                key={sign.slug}
                onClick={() => setSelected(sign)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-muted bg-card hover:border-primary-hover hover:shadow-md transition-all duration-300 text-left cursor-pointer group"
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color.bg }}
                >
                  <span style={{ color: color.text, fontSize: "1.1rem", lineHeight: 1 }}>{sign.symbol}</span>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{sign.hindi} / {sign.english}</div>
                  <div className="text-[0.6rem] opacity-50 uppercase tracking-wider mt-0.5">{sign.hindiTransliteration}</div>
                </div>
                <IconArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </div>

      {selected && <HoroscopeModal sign={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
