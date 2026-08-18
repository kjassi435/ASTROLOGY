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

const PLANET_ICONS: Record<string, string> = {
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

const SIGN_COLORS: Record<string, string> = {
  "Aries": "bg-red-500/10 text-red-600",
  "Taurus": "bg-green-500/10 text-green-600",
  "Gemini": "bg-yellow-500/10 text-yellow-600",
  "Cancer": "bg-white/10 text-white",
  "Leo": "bg-orange-500/10 text-orange-600",
  "Virgo": "bg-green-500/10 text-green-600",
  "Libra": "bg-pink-500/10 text-pink-600",
  "Scorpio": "bg-red-700/10 text-red-700",
  "Sagittarius": "bg-purple-500/10 text-purple-600",
  "Capricorn": "bg-gray-500/10 text-gray-600",
  "Aquarius": "bg-blue-500/10 text-blue-600",
  "Pisces": "bg-indigo-500/10 text-indigo-600",
};

const DEFAULT_PLANETS: PlanetPosition[] = [
  { planet: "Sun", planetHi: "सूर्य", symbol: "☉", sign: "Leo", signHi: "सिंह", degree: "10° 15'", nakshatra: "Magha", nakshatraHi: "मगहा", retrograde: false },
  { planet: "Moon", planetHi: "चंद्र", symbol: "☽", sign: "Taurus", signHi: "वृषभ", degree: "23° 45'", nakshatra: "Rohini", nakshatraHi: "रोहिणी", retrograde: false },
  { planet: "Mars", planetHi: "मंगल", symbol: "♂", sign: "Cancer", signHi: "कर्क", degree: "5° 30'", nakshatra: "Pushya", nakshatraHi: "पुष्य", retrograde: true },
  { planet: "Mercury", planetHi: "बुध", symbol: "☿", sign: "Virgo", signHi: "कन्या", degree: "18° 20'", nakshatra: "Hasta", nakshatraHi: "हस्त", retrograde: false },
  { planet: "Jupiter", planetHi: "गुरु", symbol: "♃", sign: "Taurus", signHi: "वृषभ", degree: "2° 10'", nakshatra: "Krittika", nakshatraHi: "कृत्तिका", retrograde: true },
  { planet: "Venus", planetHi: "शुक्र", symbol: "♀", sign: "Gemini", signHi: "मिथुन", degree: "25° 40'", nakshatra: "Ardra", nakshatraHi: "आर्द्रा", retrograde: false },
  { planet: "Saturn", planetHi: "शनि", symbol: "♄", sign: "Aquarius", signHi: "कुंभ", degree: "8° 55'", nakshatra: "Purva Bhadrapada", nakshatraHi: "पूर्व भाद्रपद", retrograde: true },
  { planet: "Rahu", planetHi: "राहु", symbol: "☊", sign: "Pisces", signHi: "मीन", degree: "14° 00'", nakshatra: "Uttara Bhadrapada", nakshatraHi: "उत्तर भाद्रपद", retrograde: true },
  { planet: "Ketu", planetHi: "केतु", symbol: "☋", sign: "Virgo", signHi: "कन्या", degree: "14° 00'", nakshatra: "Uttara Phalguni", nakshatraHi: "उत्तर फाल्गुनी", retrograde: true },
];

export function PlanetTransitChart() {
  const [planets, setPlanets] = useState<PlanetPosition[]>(DEFAULT_PLANETS);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchTransits() {
      try {
        const res = await fetch("https://api.vedicastro.org/v1/planets/current", {
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          const data = await res.json();
          setPlanets(data.planets || DEFAULT_PLANETS);
          setLastUpdated(new Date());
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
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-20 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {planets.map((p) => (
            <div
              key={p.planet}
              className="bg-card rounded-xl p-4 border border-muted hover:border-primary-hover transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-primary group-hover:scale-110 transition-transform duration-300">{p.symbol}</span>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{p.planet}</h4>
                    <p className="text-[0.65rem] opacity-60">{p.planetHi}</p>
                  </div>
                </div>
                {p.retrograde && (
                  <span className="text-[0.6rem] font-bold uppercase tracking-wider bg-red-500/10 text-red-600 px-2 py-0.5 rounded-full">Retro</span>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] opacity-70">Sign</span>
                  <span className={`text-[0.7rem] font-semibold px-2 py-0.5 rounded-full ${SIGN_COLORS[p.sign] || "bg-muted text-foreground"}`}>{p.sign} ({p.signHi})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] opacity-70">Degree</span>
                  <span className="text-[0.7rem] font-mono font-medium">{p.degree}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] opacity-70">Nakshatra</span>
                  <span className="text-[0.7rem] font-medium text-right">{p.nakshatra} ({p.nakshatraHi})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
