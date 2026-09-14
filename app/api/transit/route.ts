import { NextResponse } from "next/server";

interface PlanetPosition {
  planet: string;
  planetHi: string;
  symbol: string;
  sign: string;
  signHi: string;
  degree: string;
  longitude: string;
  nakshatra: string;
  nakshatraHi: string;
  nakshatraPada: string;
  nakshatraLord: string;
  nakshatraSubLord: string;
  rulerOf: string;
  isIn: string;
  houseOwner: string;
  relationship: string;
  dignity: string;
  retrograde: boolean;
  isLagna?: boolean;
}

interface Bhava {
  bhava: string;
  residents: string;
  owner: string;
  rashi: string;
  qualities: string;
  aspectedBy: string;
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
  "U Bhadrapada": "उ.भा", "P Bhadrapada": "पू.भा",
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

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9A-Fa-f]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => (({ amp: "&", lt: "<", gt: ">", quot: '"', nbsp: " ", "#39": "'" } as Record<string, string>)[n.toLowerCase()] ?? m));
}

function stripTags(s: string): string {
  return decodeEntities(s).replace(/<\s*\/\s*/g, "</").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function cellsOf(rowHtml: string): string[] {
  const parts = rowHtml.split('<div class="dpFlexEqual dpTableCell');
  const cells: string[] = [];
  for (let i = 1; i < parts.length; i++) {
    const frag = parts[i];
    const inner = frag.substring(frag.indexOf(">") + 1);
    const end = inner.indexOf("</div>");
    cells.push(stripTags(end >= 0 ? inner.substring(0, end) : inner));
  }
  return cells;
}

function rowsOf(tableHtml: string): string[] {
  return tableHtml
    .split("dpTableRow dpFlex")
    .slice(1) // drop header/opening
    .filter((r) => !r.includes("dpTableHeader"));
}

let cache: { data: { planets: PlanetPosition[]; bhavas: Bhava[] }; timestamp: number } | null = null;
const CACHE_TTL = 12 * 60 * 60 * 1000;

function parsePlanets(planetHtml: string): PlanetPosition[] | null {
  try {
    const rows = rowsOf(planetHtml);
    const result: PlanetPosition[] = [];
    for (const row of rows) {
      const cells = cellsOf(row);
      if (cells.length < 9) continue;
      const [planetCell, longCell, nakCell, lordCell, rulerCell, isInCell, ownerCell, relCell, dignCell] = cells;
      const isLagna = /lagna/i.test(planetCell);
      const retroMatch = /retrograded/i.test(row);
      const sanskrit = planetCell.replace(/\(Q\)/g, "").replace(/[^\p{L}\s]/gu, "").trim().split(/\s+/)[0];
      const pm = PLANET_MAP[sanskrit];
      const planet = isLagna ? "Lagna" : pm?.name ?? sanskrit;
      const planetHi = isLagna ? "लग्न" : pm?.hi ?? sanskrit;

      const longMatch = longCell.match(/(\d+)\s*°\s*([A-Za-z]+)\s*(\d+)\s*′\s*(\d+)\s*″/);
      const signAbbr = longMatch ? longMatch[2] : "";
      const sign = SIGN_MAP[signAbbr] || signAbbr;
      const deg = longMatch ? `${longMatch[1]}° ${longMatch[3]}′ ${longMatch[4]}″` : longCell;
      const longitude = longMatch ? `${longMatch[1]}° ${signAbbr} ${longMatch[3]}′ ${longMatch[4]}″` : longCell;

      const nakText = stripTags(nakCell).replace(/[^\p{L}\p{N}\s.]/gu, " ").trim();
      const nakMatch = nakText.match(/([A-Za-z. ]+?)\s*(\d+)\s*$/);
      const nakshatra = nakMatch ? nakMatch[1].trim() : nakText;
      const pada = nakMatch ? nakMatch[2] : "";
      const nakshatraHi = NAKSHATRAS_HI[nakshatra] || nakshatra;

      const lordParts = lordCell.split(",").map((s) => s.trim()).filter(Boolean);
      const nakshatraLord = lordParts[0] ?? "";
      const nakshatraSubLord = lordParts[1] ?? "";

      result.push({
        planet,
        planetHi,
        symbol: isLagna ? "☊" : pm?.symbol ?? "●",
        sign,
        signHi: SIGNS_HI[sign] || sign,
        degree: deg,
        longitude,
        nakshatra,
        nakshatraHi,
        nakshatraPada: pada,
        nakshatraLord,
        nakshatraSubLord,
        rulerOf: rulerCell,
        isIn: isInCell,
        houseOwner: ownerCell,
        relationship: relCell,
        dignity: dignCell === "-" ? "" : dignCell,
        retrograde: retroMatch,
        isLagna,
      });
    }
    return result.length >= 9 ? result : null;
  } catch {
    return null;
  }
}

function parseBhavas(bhavaHtml: string): Bhava[] {
  try {
    const rows = rowsOf(bhavaHtml);
    const result: Bhava[] = [];
    for (const row of rows) {
      const cells = cellsOf(row);
      if (cells.length < 6) continue;
      const [bhavaCell, residentCell, ownerCell, rashiCell, qualityCell, aspectCell] = cells;
      const rashiImg = row.match(/alt="([^"]+)"/);
      const rashi = rashiImg ? rashiImg[1] : rashiCell;
      result.push({
        bhava: bhavaCell.replace(/\(Q\)/g, "").trim(),
        residents: residentCell,
        owner: ownerCell,
        rashi,
        qualities: qualityCell,
        aspectedBy: aspectCell,
      });
    }
    return result.length >= 12 ? result.slice(0, 12) : [];
  } catch {
    return [];
  }
}

function parseDrik(html: string): { planets: PlanetPosition[]; bhavas: Bhava[] } | null {
  const pStart = html.indexOf('<div class="dpKundaliTable dpPlanetTable">');
  const hStart = html.indexOf('<div class="dpKundaliTable dpHouseTable">');
  if (pStart < 0) return null;
  const planetHtml = html.substring(pStart, hStart < 0 ? html.length : hStart);
  const bhavaHtml = hStart < 0 ? "" : html.substring(hStart);
  const planets = parsePlanets(planetHtml);
  if (!planets) return null;
  const bhavas = hStart >= 0 ? parseBhavas(bhavaHtml) : [];
  return { planets, bhavas };
}

const FALLBACK = (): { planets: PlanetPosition[]; bhavas: Bhava[] } => ({
  planets: [
    { planet: "Sun", planetHi: "सूर्य", symbol: "☉", sign: "Leo", signHi: "सिंह", degree: "06° 15′ 23″", longitude: "06° Simh 15′ 23″", nakshatra: "Magha", nakshatraHi: "मघा", nakshatraPada: "2", nakshatraLord: "Ketu", nakshatraSubLord: "Rahu", rulerOf: "12 Bhava", isIn: "12 Bhava", houseOwner: "Sun", relationship: "Own House", dignity: "Mooltrikona", retrograde: false },
    { planet: "Moon", planetHi: "चंद्र", symbol: "☽", sign: "Sagittarius", signHi: "धनु", degree: "14° 29′ 12″", longitude: "14° Dhan 29′ 12″", nakshatra: "P.Ashadha", nakshatraHi: "पू.अ", nakshatraPada: "1", nakshatraLord: "Venus", nakshatraSubLord: "Venus", rulerOf: "11 Bhava", isIn: "4 Bhava", houseOwner: "Jupiter", relationship: "Neutral", dignity: "", retrograde: false },
    { planet: "Mars", planetHi: "मंगल", symbol: "♂", sign: "Gemini", signHi: "मिथुन", degree: "13° 47′ 04″", longitude: "13° Mitu 47′ 04″", nakshatra: "Ardra", nakshatraHi: "आर्द्रा", nakshatraPada: "3", nakshatraLord: "Rahu", nakshatraSubLord: "Mercury", rulerOf: "8, 3 Bhava", isIn: "10 Bhava", houseOwner: "Mercury", relationship: "Enemy's House", dignity: "", retrograde: false },
    { planet: "Mercury", planetHi: "बुध", symbol: "☿", sign: "Leo", signHi: "सिंह", degree: "02° 03′ 12″", longitude: "02° Simh 03′ 12″", nakshatra: "Magha", nakshatraHi: "मघा", nakshatraPada: "1", nakshatraLord: "Ketu", nakshatraSubLord: "Venus", rulerOf: "10, 1 Bhava", isIn: "12 Bhava", houseOwner: "Sun", relationship: "Friend's House", dignity: "", retrograde: false },
    { planet: "Jupiter", planetHi: "गुरु", symbol: "♃", sign: "Cancer", signHi: "कर्क", degree: "17° 40′ 45″", longitude: "17° Kark 40′ 45″", nakshatra: "Ashlesha", nakshatraHi: "अश्लेषा", nakshatraPada: "1", nakshatraLord: "Mercury", nakshatraSubLord: "Mercury", rulerOf: "4, 7 Bhava", isIn: "11 Bhava", houseOwner: "Moon", relationship: "Friend's House", dignity: "Exalted", retrograde: false },
    { planet: "Venus", planetHi: "शुक्र", symbol: "♀", sign: "Virgo", signHi: "कन्या", degree: "21° 49′ 51″", longitude: "21° Kany 49′ 51″", nakshatra: "Hasta", nakshatraHi: "हस्त", nakshatraPada: "4", nakshatraLord: "Moon", nakshatraSubLord: "Venus", rulerOf: "9, 2 Bhava", isIn: "1 Bhava", houseOwner: "Mercury", relationship: "Friend's House", dignity: "Debilitated", retrograde: false },
    { planet: "Saturn", planetHi: "शनि", symbol: "♄", sign: "Pisces", signHi: "मीन", degree: "19° 52′ 15″", longitude: "19° Meen 52′ 15″", nakshatra: "Revati", nakshatraHi: "रेवती", nakshatraPada: "1", nakshatraLord: "Mercury", nakshatraSubLord: "Venus", rulerOf: "5, 6 Bhava", isIn: "7 Bhava", houseOwner: "Jupiter", relationship: "Neutral", dignity: "", retrograde: true },
    { planet: "Rahu", planetHi: "राहु", symbol: "☊", sign: "Aquarius", signHi: "कुंभ", degree: "05° 30′ 35″", longitude: "05° Kumb 30′ 35″", nakshatra: "Dhanishtha", nakshatraHi: "धनिष्ठा", nakshatraPada: "4", nakshatraLord: "Mars", nakshatraSubLord: "Sun", rulerOf: "6 Bhava", isIn: "6 Bhava", houseOwner: "Saturn", relationship: "Friend's House", dignity: "", retrograde: true },
    { planet: "Ketu", planetHi: "केतु", symbol: "☋", sign: "Leo", signHi: "सिंह", degree: "05° 30′ 35″", longitude: "05° Simh 30′ 35″", nakshatra: "Magha", nakshatraHi: "मघा", nakshatraPada: "2", nakshatraLord: "Ketu", nakshatraSubLord: "Mars", rulerOf: "3 Bhava", isIn: "12 Bhava", houseOwner: "Sun", relationship: "Enemy's House", dignity: "", retrograde: true },
    { planet: "Lagna", planetHi: "लग्न", symbol: "☊", sign: "Virgo", signHi: "कन्या", degree: "24° 20′ 28″", longitude: "24° Kany 20′ 28″", nakshatra: "Chitra", nakshatraHi: "चित्रा", nakshatraPada: "1", nakshatraLord: "Mars", nakshatraSubLord: "Rahu", rulerOf: "1 Bhava", isIn: "1 Bhava", houseOwner: "Mercury", relationship: "", dignity: "", retrograde: false, isLagna: true },
  ],
  bhavas: [],
});

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ ...cache.data, source: "cache", lastUpdated: new Date(cache.timestamp).toISOString() });
  }

  try {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const url = `https://www.drikpanchang.com/jyotisha/kundali/kundali.html?date=${dd}/${mm}/${now.getFullYear()}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" },
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const parsed = parseDrik(await res.text());
      if (parsed && parsed.planets.length >= 9) {
        cache = { data: parsed, timestamp: Date.now() };
        return NextResponse.json({ ...parsed, source: "drikpanchang", lastUpdated: new Date().toISOString() });
      }
    }
  } catch {}

  cache = { data: FALLBACK(), timestamp: Date.now() };
  return NextResponse.json({ ...FALLBACK(), source: "fallback", lastUpdated: new Date().toISOString() });
}
