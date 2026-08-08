"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ZODIAC_SIGNS, type ZodiacSign, type HoroscopeData } from "@/lib/horoscope";
import { Reveal } from "@/components/Preloader";
import { IconClose } from "@/components/Icons";

function StarRating({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-[#0083fe]" : "text-white/20"}>★</span>
      ))}
    </span>
  );
}

/* ─── Constellation Data ─── */
interface Star {
  x: number;
  y: number;
  size?: number;
}

interface ConstellationData {
  stars: Star[];
  lines: [number, number][];
}

const CONSTELLATIONS: Record<string, ConstellationData> = {
  aries: {
    stars: [
      { x: 0, y: 0, size: 2.5 },
      { x: 18, y: -8, size: 2 },
      { x: 36, y: -4, size: 2.2 },
      { x: 52, y: -14, size: 1.8 },
    ],
    lines: [[0, 1], [1, 2], [2, 3]],
  },
  taurus: {
    stars: [
      { x: -20, y: 6, size: 2.5 },
      { x: -6, y: -10, size: 2 },
      { x: 8, y: 4, size: 2.2 },
      { x: 22, y: -6, size: 2 },
      { x: 36, y: 2, size: 1.8 },
      { x: 28, y: 16, size: 1.6 },
      { x: 14, y: 18, size: 1.6 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 6], [6, 5]],
  },
  gemini: {
    stars: [
      { x: -16, y: -14, size: 2.5 },
      { x: -16, y: 14, size: 2.5 },
      { x: -4, y: -8, size: 2 },
      { x: -4, y: 8, size: 2 },
      { x: 10, y: -12, size: 2 },
      { x: 10, y: 12, size: 2 },
      { x: 24, y: -6, size: 1.8 },
      { x: 24, y: 6, size: 1.8 },
    ],
    lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7]],
  },
  cancer: {
    stars: [
      { x: -14, y: -6, size: 2 },
      { x: 0, y: 0, size: 2.2 },
      { x: 14, y: -10, size: 1.8 },
      { x: 14, y: 8, size: 1.8 },
      { x: 28, y: 0, size: 2 },
    ],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]],
  },
  leo: {
    stars: [
      { x: -22, y: 4, size: 2.5 },
      { x: -10, y: -10, size: 2 },
      { x: -2, y: 0, size: 2.2 },
      { x: 8, y: -14, size: 2 },
      { x: 18, y: -6, size: 2 },
      { x: 28, y: -10, size: 1.8 },
      { x: 22, y: 8, size: 2 },
      { x: 12, y: 14, size: 1.6 },
      { x: -8, y: 12, size: 1.6 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [6, 7], [7, 8], [8, 0]],
  },
  virgo: {
    stars: [
      { x: -18, y: -12, size: 2.5 },
      { x: -6, y: 0, size: 2 },
      { x: 6, y: -8, size: 2 },
      { x: 18, y: 2, size: 2 },
      { x: 30, y: -4, size: 2.2 },
      { x: 22, y: 12, size: 1.8 },
      { x: 10, y: 16, size: 1.8 },
      { x: -4, y: 14, size: 1.6 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [6, 7], [7, 1]],
  },
  libra: {
    stars: [
      { x: -16, y: -6, size: 2.2 },
      { x: -4, y: -12, size: 2 },
      { x: 10, y: -12, size: 2 },
      { x: 22, y: -6, size: 2.2 },
      { x: 10, y: 6, size: 2 },
      { x: -4, y: 6, size: 2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [0, 5], [5, 4], [4, 3], [1, 5], [2, 4]],
  },
  scorpio: {
    stars: [
      { x: -24, y: 0, size: 2.5 },
      { x: -12, y: -8, size: 2 },
      { x: 0, y: 0, size: 2.2 },
      { x: 12, y: 6, size: 2 },
      { x: 24, y: -2, size: 2 },
      { x: 34, y: 8, size: 1.8 },
      { x: 42, y: 0, size: 2 },
      { x: 48, y: 10, size: 1.6 },
      { x: 40, y: 18, size: 1.6 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
  },
  sagittarius: {
    stars: [
      { x: -14, y: 8, size: 2 },
      { x: 0, y: 0, size: 2.5 },
      { x: 14, y: 8, size: 2 },
      { x: 0, y: -14, size: 2.2 },
      { x: -8, y: -4, size: 1.8 },
      { x: 8, y: -4, size: 1.8 },
      { x: 24, y: -6, size: 2 },
      { x: 34, y: 2, size: 1.8 },
    ],
    lines: [[0, 1], [1, 2], [3, 4], [4, 1], [1, 5], [5, 3], [2, 6], [6, 7]],
  },
  capricorn: {
    stars: [
      { x: -18, y: -8, size: 2 },
      { x: -6, y: -14, size: 2.2 },
      { x: 8, y: -10, size: 2 },
      { x: 18, y: 0, size: 2 },
      { x: 22, y: 12, size: 1.8 },
      { x: 10, y: 16, size: 1.8 },
      { x: -4, y: 10, size: 2 },
      { x: -16, y: 4, size: 1.6 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]],
  },
  aquarius: {
    stars: [
      { x: -20, y: -6, size: 2 },
      { x: -10, y: 4, size: 2 },
      { x: 0, y: -4, size: 2.2 },
      { x: 10, y: 6, size: 2 },
      { x: 20, y: -2, size: 2 },
      { x: 30, y: 8, size: 1.8 },
      { x: -14, y: -14, size: 1.6 },
      { x: 16, y: -12, size: 1.6 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [4, 7]],
  },
  pisces: {
    stars: [
      { x: -20, y: 0, size: 2 },
      { x: -10, y: -8, size: 2 },
      { x: 0, y: 0, size: 2.2 },
      { x: 10, y: -6, size: 2 },
      { x: 20, y: 2, size: 2 },
      { x: -10, y: 10, size: 1.8 },
      { x: 10, y: 10, size: 1.8 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 2], [2, 6], [6, 4]],
  },
};

/* ─── Background Stars ─── */
function BackgroundStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      x: (i * 37.7) % 100,
      y: (i * 23.3) % 100,
      size: 0.5 + (i % 3) * 0.5,
      opacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Single Constellation ─── */
function Constellation({
  slug,
  sign,
  data,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}: {
  slug: string;
  sign: ZodiacSign;
  data: ConstellationData;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const cx = 60;
  const cy = 50;

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onSelect}
    >
      <svg
        viewBox="0 0 120 100"
        className="w-full h-full transition-all duration-500"
        style={{
          filter: isHovered ? "drop-shadow(0 0 12px rgba(0,255,240,0.5))" : "none",
        }}
        suppressHydrationWarning
      >
        <defs>
          <radialGradient id={`glow-${slug}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00fff0" stopOpacity={isHovered ? 0.3 : 0} />
            <stop offset="100%" stopColor="#0083fe" stopOpacity={0} />
          </radialGradient>
          <filter id={`starGlow-${slug}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hover glow background */}
        <circle cx={cx} cy={cy} r={50} fill={`url(#glow-${slug})`} />

        {/* Constellation lines */}
        {data.lines.map(([a, b], i) => {
          const s1 = data.stars[a];
          const s2 = data.stars[b];
          return (
            <line
              key={i}
              x1={cx + s1.x}
              y1={cy + s1.y}
              x2={cx + s2.x}
              y2={cy + s2.y}
              stroke={isHovered ? "rgba(0,255,240,0.6)" : "rgba(0,131,254,0.25)"}
              strokeWidth={isHovered ? 1.5 : 0.8}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          );
        })}

        {/* Stars */}
        {data.stars.map((star, i) => (
          <circle
            key={i}
            cx={cx + star.x}
            cy={cy + star.y}
            r={isHovered ? (star.size || 2) * 1.4 : star.size || 2}
            fill={isHovered ? "#00fff0" : "#0083fe"}
            opacity={isHovered ? 1 : 0.7}
            filter={isHovered ? `url(#starGlow-${slug})` : undefined}
            className="transition-all duration-500"
          />
        ))}
      </svg>

      {/* Sign label */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-end pb-1 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <span className="text-[10px] font-bold text-[#00fff0] tracking-wider drop-shadow-[0_0_6px_rgba(0,255,240,0.5)]">
          {sign.hindi}
        </span>
      </div>
    </div>
  );
}

/* ─── Constellation Map ─── */
function ConstellationMap({ onSelect }: { onSelect: (sign: ZodiacSign) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <BackgroundStars />

      <div className="relative z-10 grid grid-cols-4 sm:grid-cols-6 gap-2 p-4">
        {ZODIAC_SIGNS.map((sign) => {
          const constellation = CONSTELLATIONS[sign.slug];
          if (!constellation) return null;

          return (
            <div key={sign.slug} className="aspect-square">
              <Constellation
                slug={sign.slug}
                sign={sign}
                data={constellation}
                isHovered={hovered === sign.slug}
                onHover={() => setHovered(sign.slug)}
                onLeave={() => setHovered(null)}
                onSelect={() => onSelect(sign)}
              />
            </div>
          );
        })}
      </div>

      {/* Hover info bar */}
      <div className="h-10 flex items-center justify-center">
        {hovered ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#0083fe] font-semibold">
              {ZODIAC_SIGNS.find((s) => s.slug === hovered)?.hindi}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">
              {ZODIAC_SIGNS.find((s) => s.slug === hovered)?.english}
            </span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Hover over a constellation to explore</p>
        )}
      </div>
    </div>
  );
}

/* ─── Sign Cards ─── */
const SIGN_COLORS: Record<string, { bg: string; text: string }> = {
  aries:      { bg: "#FEE2E2", text: "#EF4444" },
  taurus:     { bg: "#FFE4D6", text: "#F97316" },
  gemini:     { bg: "#FEF9C3", text: "#CA8A04" },
  cancer:     { bg: "#FEF3C7", text: "#D97706" },
  leo:        { bg: "#FEF08A", text: "#CA8A04" },
  virgo:      { bg: "#DCFCE7", text: "#16A34A" },
  libra:      { bg: "#D1FAE5", text: "#059669" },
  scorpio:    { bg: "#CCFBF1", text: "#0D9488" },
  sagittarius:{ bg: "#DBEAFE", text: "#2563EB" },
  capricorn:  { bg: "#E9D5FF", text: "#9333EA" },
  aquarius:   { bg: "#F3E8FF", text: "#7C3AED" },
  pisces:     { bg: "#FCE7F3", text: "#DB2777" },
};

function SignCards({ onSelect }: { onSelect: (sign: ZodiacSign) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ZODIAC_SIGNS.map((sign) => {
        const color = SIGN_COLORS[sign.slug] ?? { bg: "#E0F2FE", text: "#0284C7" };
        return (
          <button
            key={sign.slug}
            onClick={() => onSelect(sign)}
            className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 text-left cursor-pointer group"
          >
            <span
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: color.bg, color: color.text }}
            >
              {sign.symbol}
            </span>
            <div>
              <div className="font-semibold text-sm text-gray-900">{sign.hindi} / {sign.english}</div>
              <div className="text-[0.65rem] text-gray-400 uppercase tracking-wider mt-0.5">{sign.hindiTransliteration}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

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
    <section className="bg-section-blue-alt section">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal>
          <div className="text-center mb-10">
            <span className="section-subtitle">Daily Horoscope</span>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-medium">
              Your <span className="text-accent">Daily Cosmic</span> Forecast
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Click your zodiac constellation to reveal today&apos;s horoscope, lucky color, and lucky number.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <Reveal>
            <ConstellationMap onSelect={setSelected} />
          </Reveal>
          <Reveal delay={120}>
            <SignCards onSelect={setSelected} />
          </Reveal>
        </div>
      </div>

      {selected && <HoroscopeModal sign={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
