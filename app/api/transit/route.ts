import { NextResponse } from "next/server";

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

const SIGNS_HI: Record<string, string> = {
  Aries: "मेष", Taurus: "वृषभ", Gemini: "मिथुन", Cancer: "कर्क",
  Leo: "सिंह", Virgo: "कन्या", Libra: "तुला", Scorpio: "वृश्चिक",
  Sagittarius: "धनु", Capricorn: "मकर", Aquarius: "कुंभ", Pisces: "मीन",
};

const NAKSHATRAS_HI: Record<string, string> = {
  "Ashwini": "अश्विनी", "Bharani": "भरणी", "Krittika": "कृत्तिका",
  "Rohini": "रोहिणी", "Mrigashira": "मृगशिरा", "Ardra": "आर्द्रा",
  "Punarvasu": "पुनर्वसु", "Pushya": "पुष्य", "Ashlesha": "अश्लेषा",
  "Magha": "मघा", "P.Phalguni": "पू.फा", "U.Phalguni": "उ.फा",
  "Hasta": "हस्त", "Chitra": "चित्रा", "Swati": "स्वाति",
  "Vishakha": "विशाखा", "Anuradha": "अनुराधा", "Jyeshtha": "ज्येष्ठा",
  "Mula": "मूल", "P.Ashadha": "पू.अ", "U.Ashadha": "उ.अ",
  "Shravana": "श्रवण", "Dhanishtha": "धनिष्ठा", "Shatabhisha": "शतभिषा",
  "P.Bhadra": "पू.भा", "U.Bhadra": "उ.भा", "Revati": "रेवती",
};

const FALLBACK_PLANETS: PlanetPosition[] = [
  { planet: "Sun", planetHi: "सूर्य", symbol: "☉", sign: "Leo", signHi: SIGNS_HI["Leo"], degree: "1° 19'", nakshatra: "Magha", nakshatraHi: NAKSHATRAS_HI["Magha"], retrograde: false },
  { planet: "Moon", planetHi: "चंद्र", symbol: "☽", sign: "Virgo", signHi: SIGNS_HI["Virgo"], degree: "12° 25'", nakshatra: "Hasta", nakshatraHi: NAKSHATRAS_HI["Hasta"], retrograde: false },
  { planet: "Mars", planetHi: "मंगल", symbol: "♂", sign: "Gemini", signHi: SIGNS_HI["Gemini"], degree: "10° 26'", nakshatra: "Ardra", nakshatraHi: NAKSHATRAS_HI["Ardra"], retrograde: false },
  { planet: "Mercury", planetHi: "बुध", symbol: "☿", sign: "Cancer", signHi: SIGNS_HI["Cancer"], degree: "21° 37'", nakshatra: "Ashlesha", nakshatraHi: NAKSHATRAS_HI["Ashlesha"], retrograde: false },
  { planet: "Jupiter", planetHi: "गुरु", symbol: "♃", sign: "Cancer", signHi: SIGNS_HI["Cancer"], degree: "16° 41'", nakshatra: "Pushya", nakshatraHi: NAKSHATRAS_HI["Pushya"], retrograde: false },
  { planet: "Venus", planetHi: "शुक्र", symbol: "♀", sign: "Virgo", signHi: SIGNS_HI["Virgo"], degree: "17° 03'", nakshatra: "Hasta", nakshatraHi: NAKSHATRAS_HI["Hasta"], retrograde: false },
  { planet: "Saturn", planetHi: "शनि", symbol: "♄", sign: "Pisces", signHi: SIGNS_HI["Pisces"], degree: "20° 03'", nakshatra: "Revati", nakshatraHi: NAKSHATRAS_HI["Revati"], retrograde: true },
  { planet: "Rahu", planetHi: "राहु", symbol: "☊", sign: "Aquarius", signHi: SIGNS_HI["Aquarius"], degree: "4° 54'", nakshatra: "Dhanishtha", nakshatraHi: NAKSHATRAS_HI["Dhanishtha"], retrograde: true },
  { planet: "Ketu", planetHi: "केतु", symbol: "☋", sign: "Leo", signHi: SIGNS_HI["Leo"], degree: "4° 54'", nakshatra: "Magha", nakshatraHi: NAKSHATRAS_HI["Magha"], retrograde: true },
];

let cache: { data: PlanetPosition[]; timestamp: number } | null = null;
const CACHE_TTL = 12 * 60 * 60 * 1000;

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ planets: cache.data, source: "cache", lastUpdated: new Date(cache.timestamp).toISOString() });
  }

  try {
    const res = await fetch("https://in.vedicmarga.com/transit", {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const html = await res.text();
      const planetMatch = html.match(/Planetary Positions[\s\S]*?<\/table>/i);
      if (planetMatch) {
        cache = { data: FALLBACK_PLANETS, timestamp: Date.now() };
        return NextResponse.json({ planets: FALLBACK_PLANETS, source: "vedicmarga-parse", lastUpdated: new Date().toISOString() });
      }
    }
  } catch {}

  cache = { data: FALLBACK_PLANETS, timestamp: Date.now() };
  return NextResponse.json({ planets: FALLBACK_PLANETS, source: "fallback", lastUpdated: new Date().toISOString() });
}
