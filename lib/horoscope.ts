export interface ZodiacSign {
  slug: string;
  hindi: string;
  english: string;
  symbol: string;
  angle: number;
  hindiTransliteration: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { slug: "aries",      hindi: "मेष",      english: "Aries",      symbol: "♈", angle: 0,   hindiTransliteration: "MESH" },
  { slug: "taurus",     hindi: "वृषभ",    english: "Taurus",     symbol: "♉", angle: 30,  hindiTransliteration: "VRISHABH" },
  { slug: "gemini",     hindi: "मिथुन",    english: "Gemini",     symbol: "♊", angle: 60,  hindiTransliteration: "MITHUN" },
  { slug: "cancer",     hindi: "कर्क",     english: "Cancer",     symbol: "♋", angle: 90,  hindiTransliteration: "KARK" },
  { slug: "leo",        hindi: "सिंह",     english: "Leo",        symbol: "♌", angle: 120, hindiTransliteration: "SIMHA" },
  { slug: "virgo",      hindi: "कन्या",    english: "Virgo",      symbol: "♍", angle: 150, hindiTransliteration: "KANYA" },
  { slug: "libra",      hindi: "तुला",     english: "Libra",      symbol: "♎", angle: 180, hindiTransliteration: "TULA" },
  { slug: "scorpio",    hindi: "वृश्चिक",  english: "Scorpio",    symbol: "♏", angle: 210, hindiTransliteration: "VRISHCHIK" },
  { slug: "sagittarius", hindi: "धनु",     english: "Sagittarius", symbol: "♐", angle: 240, hindiTransliteration: "DHANU" },
  { slug: "capricorn",  hindi: "मकर",      english: "Capricorn",  symbol: "♑", angle: 270, hindiTransliteration: "MAKAR" },
  { slug: "aquarius",   hindi: "कुम्भ",    english: "Aquarius",   symbol: "♒", angle: 300, hindiTransliteration: "KUMBH" },
  { slug: "pisces",     hindi: "मीन",      english: "Pisces",     symbol: "♓", angle: 330, hindiTransliteration: "MEEN" },
];

export interface HoroscopeSection {
  hi: string;
  en: string;
}

export interface HoroscopeData {
  description: string;
  luckyNumber: string;
  luckyColor: string;
  mood: string;
  date: string;
  sections: {
    career: HoroscopeSection;
    love: HoroscopeSection;
    health: HoroscopeSection;
    finance: HoroscopeSection;
  };
}
