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

const SIGN_MAP: Record<string, string> = {
  Mesh: "Aries", Vrish: "Taurus", Mitu: "Gemini", Kark: "Cancer",
  Simh: "Leo", Kany: "Virgo", Tula: "Libra", Vrishchik: "Scorpio",
  Dhan: "Sagittarius", Makar: "Capricorn", Kumb: "Aquarius", Meen: "Pisces",
};

const PLANET_MAP: Record<string, { name: string; hi: string; symbol: string }> = {
  Surya: { name: "Sun", hi: "सूर्य", symbol: "☉" },
  Chandra: { name: "Moon", hi: "चंद्र", symbol: "☽" },
  Mangal: { name: "Mars", hi: "मंगल", symbol: "♂" },
  Budha: { name: "Mercury", hi: "बुध", symbol: "☿" },
  Guru: { name: "Jupiter", hi: "गुरु", symbol: "♃" },
  Shukra: { name: "Venus", hi: "शुक्र", symbol: "♀" },
  Shani: { name: "Saturn", hi: "शनि", symbol: "♄" },
  Rahu: { name: "Rahu", hi: "राहु", symbol: "☊" },
  Ketu: { name: "Ketu", hi: "केतु", symbol: "☋" },
};

const FALLBACK_PLANETS: PlanetPosition[] = [
  { planet: "Sun", planetHi: "सूर्य", symbol: "☉", sign: "Leo", signHi: SIGNS_HI["Leo"], degree: "1° 24'", nakshatra: "Magha", nakshatraHi: NAKSHATRAS_HI["Magha"], retrograde: false },
  { planet: "Moon", planetHi: "चंद्र", symbol: "☽", sign: "Libra", signHi: SIGNS_HI["Libra"], degree: "13° 55'", nakshatra: "Swati", nakshatraHi: NAKSHATRAS_HI["Swati"], retrograde: false },
  { planet: "Mars", planetHi: "मंगल", symbol: "♂", sign: "Gemini", signHi: SIGNS_HI["Gemini"], degree: "10° 30'", nakshatra: "Ardra", nakshatraHi: NAKSHATRAS_HI["Ardra"], retrograde: false },
  { planet: "Mercury", planetHi: "बुध", symbol: "☿", sign: "Cancer", signHi: SIGNS_HI["Cancer"], degree: "21° 55'", nakshatra: "Ashlesha", nakshatraHi: NAKSHATRAS_HI["Ashlesha"], retrograde: false },
  { planet: "Jupiter", planetHi: "गुरु", symbol: "♃", sign: "Cancer", signHi: SIGNS_HI["Cancer"], degree: "16° 35'", nakshatra: "Pushya", nakshatraHi: NAKSHATRAS_HI["Pushya"], retrograde: false },
  { planet: "Venus", planetHi: "शुक्र", symbol: "♀", sign: "Virgo", signHi: SIGNS_HI["Virgo"], degree: "17° 13'", nakshatra: "Hasta", nakshatraHi: NAKSHATRAS_HI["Hasta"], retrograde: false },
  { planet: "Saturn", planetHi: "शनि", symbol: "♄", sign: "Pisces", signHi: SIGNS_HI["Pisces"], degree: "20° 05'", nakshatra: "Revati", nakshatraHi: NAKSHATRAS_HI["Revati"], retrograde: true },
  { planet: "Rahu", planetHi: "राहु", symbol: "☊", sign: "Aquarius", signHi: SIGNS_HI["Aquarius"], degree: "5° 47'", nakshatra: "Dhanishtha", nakshatraHi: NAKSHATRAS_HI["Dhanishtha"], retrograde: true },
  { planet: "Ketu", planetHi: "केतु", symbol: "☋", sign: "Leo", signHi: SIGNS_HI["Leo"], degree: "5° 47'", nakshatra: "Magha", nakshatraHi: NAKSHATRAS_HI["Magha"], retrograde: true },
];

let cache: { data: PlanetPosition[]; timestamp: number } | null = null;
const CACHE_TTL = 12 * 60 * 60 * 1000;

function parseDrik(html: string): PlanetPosition[] | null {
  try {
    const clean = html.replace(/<\s*\/\s*/g, "</");
    const blocks = clean.split(/dpPlanetCell/);
    const result: PlanetPosition[] = [];
    for (const block of blocks) {
      const nameMatch = block.match(/>\s*([A-Za-z]+)\s*</);
      if (!nameMatch) continue;
      const planet = PLANET_MAP[nameMatch[1]];
      if (!planet) continue;
      const longMatch = block.match(/dpLongitudeCell">(\d+)&#176;\s*<strong>([^<]+)<\/strong>\s*(\d+)&#8242;\s*(\d+)&#8243;/);
      const nakMatch = block.match(/dpNakshatraCell">\s*(?:<img[^>]*>\s*)*([A-Za-z]+)/);
      if (!longMatch || !nakMatch) continue;
      const deg = parseInt(longMatch[1], 10);
      const sign = SIGN_MAP[longMatch[2]] || longMatch[2];
      const min = parseInt(longMatch[3], 10);
      const nakshatra = nakMatch[1];
      const retrograde = block.includes("↺") || block.includes("&#x21ba;") || block.toLowerCase().includes("retrograde");
      result.push({
        planet: planet.name,
        planetHi: planet.hi,
        symbol: planet.symbol,
        sign,
        signHi: SIGNS_HI[sign] || sign,
        degree: `${deg}° ${min}'`,
        nakshatra,
        nakshatraHi: NAKSHATRAS_HI[nakshatra] || nakshatra,
        retrograde,
      });
    }
    return result.length >= 9 ? result : null;
  } catch {
    return null;
  }
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ planets: cache.data, source: "cache", lastUpdated: new Date(cache.timestamp).toISOString() });
  }

  try {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const url = `https://www.drikpanchang.com/planet/position/planetary-positions-sidereal.html?date=${dd}/${mm}/${now.getFullYear()}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const parsed = parseDrik(await res.text());
      if (parsed && parsed.length >= 9) {
        cache = { data: parsed, timestamp: Date.now() };
        return NextResponse.json({ planets: parsed, source: "drikpanchang", lastUpdated: new Date().toISOString() });
      }
    }
  } catch {}

  cache = { data: FALLBACK_PLANETS, timestamp: Date.now() };
  return NextResponse.json({ planets: FALLBACK_PLANETS, source: "fallback", lastUpdated: new Date().toISOString() });
}
