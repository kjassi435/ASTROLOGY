"use client";

import React, { useState, useEffect } from "react";

interface PlanetPosition {
  planet: string;
  planetHi: string;
  symbol: string;
  sign: string;
  signHi: string;
  degree: string;
  nakshatra: string;
  nakshatraHi: string;
  retrograde: boolean;
}

const SIGN_COLORS: Record<string, string> = {
  "Aries": "bg-red-100 text-red-700 border-red-200",
  "Taurus": "bg-green-100 text-green-700 border-green-200",
  "Gemini": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Cancer": "bg-blue-100 text-blue-700 border-blue-200",
  "Leo": "bg-orange-100 text-orange-700 border-orange-200",
  "Virgo": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Libra": "bg-pink-100 text-pink-700 border-pink-200",
  "Scorpio": "bg-purple-100 text-purple-700 border-purple-200",
  "Sagittarius": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Capricorn": "bg-slate-100 text-slate-700 border-slate-200",
  "Aquarius": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Pisces": "bg-violet-100 text-violet-700 border-violet-200",
};

const PLANET_SYMBOLS: Record<string, string> = {
  "Sun": "☉",
  "Moon": "☽",
  "Mars": "♂",
  "Mercury": "☿",
  "Jupiter": "♃",
  "Venus": "♀",
  "Saturn": "♄",
  "Rahu": "☊",
  "Ketu": "☋",
};

const DEFAULT_PLANETS: PlanetPosition[] = [
  { planet: "Sun", planetHi: "सूर्य", symbol: "☉", sign: "Leo", signHi: "सिंह", degree: "1° 19'", nakshatra: "Magha", nakshatraHi: "मघा", retrograde: false },
  { planet: "Moon", planetHi: "चंद्र", symbol: "☽", sign: "Virgo", signHi: "कन्या", degree: "12° 25'", nakshatra: "Hasta", nakshatraHi: "हस्त", retrograde: false },
  { planet: "Mars", planetHi: "मंगल", symbol: "♂", sign: "Gemini", signHi: "मिथुन", degree: "10° 26'", nakshatra: "Ardra", nakshatraHi: "आर्द्रा", retrograde: false },
  { planet: "Mercury", planetHi: "बुध", symbol: "☿", sign: "Cancer", signHi: "कर्क", degree: "21° 37'", nakshatra: "Ashlesha", nakshatraHi: "अश्लेषा", retrograde: false },
  { planet: "Jupiter", planetHi: "गुरु", symbol: "♃", sign: "Cancer", signHi: "कर्क", degree: "16° 41'", nakshatra: "Pushya", nakshatraHi: "पुष्य", retrograde: false },
  { planet: "Venus", planetHi: "शुक्र", symbol: "♀", sign: "Virgo", signHi: "कन्या", degree: "17° 03'", nakshatra: "Hasta", nakshatraHi: "हस्त", retrograde: false },
  { planet: "Saturn", planetHi: "शनि", symbol: "♄", sign: "Pisces", signHi: "मीन", degree: "20° 03'", nakshatra: "Revati", nakshatraHi: "रेवती", retrograde: true },
  { planet: "Rahu", planetHi: "राहु", symbol: "☊", sign: "Aquarius", signHi: "कुंभ", degree: "4° 54'", nakshatra: "Dhanishtha", nakshatraHi: "धनिष्ठा", retrograde: true },
  { planet: "Ketu", planetHi: "केतु", symbol: "☋", sign: "Leo", signHi: "सिंह", degree: "4° 54'", nakshatra: "Magha", nakshatraHi: "मघा", retrograde: true },
];

export function PlanetTransitChart() {
  const [planets, setPlanets] = useState<PlanetPosition[]>(DEFAULT_PLANETS);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchTransits() {
      try {
        const res = await fetch("/api/transit", { next: { revalidate: 43200 } });
        if (res.ok) {
          const data = await res.json();
          setPlanets(data.planets || DEFAULT_PLANETS);
          setLastUpdated(data.lastUpdated ? new Date(data.lastUpdated) : new Date());
        }
      } catch {
        // Use default data
      } finally {
        setLoading(false);
      }
    }
    fetchTransits();
  }, []);

  return (
    <div id="transits">
      <div className="text-center mb-8">
        <span className="section-subtitle">Live Vedic Tracker</span>
        <h2 className="text-2xl font-medium">Planetary Transits <span className="text-accent">Today</span></h2>
        <p className="text-sm opacity-70 mt-1">
          Live positions of the nine Vedic Gochar planets — Sidereal (Lahiri Ayanamsha)
          {lastUpdated && (
            <span className="block text-xs opacity-60 mt-1">Last updated: {lastUpdated.toLocaleString("en-IN")}</span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-14 bg-card rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {planets.map((p) => (
            <div
              key={p.planet}
              className="bg-card rounded-lg p-3 border border-muted hover:border-primary-hover transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-primary group-hover:scale-110 transition-transform duration-300 w-6 text-center">
                  {PLANET_SYMBOLS[p.planet]}
                </span>
                <div className="w-20">
                  <span className="font-semibold text-foreground text-sm leading-tight">{p.planet}</span>
                  <span className="block text-[0.6rem] opacity-50 leading-tight">{p.planetHi}</span>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${SIGN_COLORS[p.sign] || "bg-muted text-foreground border-muted"}`}>
                    {p.sign}
                  </span>
                  <span className="text-[0.7rem] font-mono opacity-80">{p.degree}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] opacity-60 truncate max-w-[100px]" title={`${p.nakshatra} (${p.nakshatraHi})`}>
                    {p.nakshatra}
                  </span>
                  {p.retrograde && (
                    <span className="text-[0.55rem] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded">
                      R
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
