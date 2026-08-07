import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(root, { recursive: true });

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(text, max = 34) {
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 3);
}

function svg({ w, h, title, subtitle = "", palette, icon = "✦" }) {
  const [c1, c2, c3, ink, ink2] = palette;
  const lines = wrap(title);
  const fs = Math.min(w, h) / (title.length > 22 ? 14 : 10);
  const ty = h / 2 - ((lines.length - 1) * fs * 1.25) / 2;
  const stars = [15, 25, 75, 85, 50].map((x, i) => {
    const y = [18, 82, 12, 78, 50][i];
    const s = [14, 10, 18, 12, 8][i];
    return `<circle cx="${(w * x) / 100}" cy="${(h * y) / 100}" r="${s}" fill="${c3}" opacity="0.25"/>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.9}" cy="${h * 0.12}" r="${Math.min(w, h) * 0.16}" fill="none" stroke="${c3}" stroke-width="2" opacity="0.5"/>
  <circle cx="${w * 0.08}" cy="${h * 0.9}" r="${Math.min(w, h) * 0.22}" fill="none" stroke="${c3}" stroke-width="2" opacity="0.35" stroke-dasharray="8 10"/>
  ${stars.join("\n  ")}
  <text x="${w / 2}" y="${h * 0.22}" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.16}" fill="${c3}" text-anchor="middle">${esc(icon)}</text>
  ${lines
    .map((l, i) => `<text x="${w / 2}" y="${ty + i * fs * 1.25 + fs * 0.4}" font-family="Georgia, serif" font-weight="600" font-size="${fs}" fill="${ink}" text-anchor="middle">${esc(l)}</text>`)
    .join("\n  ")}
  ${subtitle ? `<text x="${w / 2}" y="${ty + lines.length * fs * 1.25 + fs}" font-family="Arial, sans-serif" font-size="${fs * 0.45}" fill="${ink2}" text-anchor="middle">${esc(subtitle)}</text>` : ""}
</svg>`;
}

function write(rel, content) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log("wrote", rel);
}

const GOLD = ["#FEED9F", "#F7D327", "#D0A823", "#504C41", "#6b6759"];
const OLIVE = ["#504C41", "#6b6759", "#F7D327", "#FBFBF5", "#FEED9F"];
const CREAM = ["#FBFBF5", "#FEED9F", "#D0A823", "#504C41", "#6b6759"];
const ROYAL = ["#3a2e5c", "#504C41", "#F7D327", "#FBFBF5", "#FEED9F"];

// Brand / hero / about
write("logo.svg", svg({ w: 200, h: 200, title: "", palette: GOLD, icon: "✦" }));
write("hero.svg", svg({ w: 2048, h: 726, title: "Arvindrun Vijay", subtitle: "Astrologer  ·  Numerology Expert  ·  Vastu Consultant", palette: GOLD, icon: "✦" }));
write("about.svg", svg({ w: 800, h: 1067, title: "Arvindrun Vijay", subtitle: "Your Photo Here", palette: CREAM, icon: "✦" }));

// Courses
const courses = [
  ["courses/graphology", "Graphology"],
  ["courses/devta-vastu", "Devta Vastu"],
  ["courses/lo-shu-9", "9 Star Lo Shu Grid"],
  ["courses/advanced-numerology", "Advanced Predictive Numerology"],
  ["courses/predictive-name", "Predictive Name Numerology"],
  ["courses/medical-vastu", "Medical Vastu"],
  ["courses/vastu-fundamentals", "Vastu Fundamentals 16 Zones"],
  ["courses/medical-astrology", "Medical Astrology"],
  ["courses/alphabets", "Alphabets A-Z"],
  ["courses/lo-shu", "Lo Shu Numerology"],
  ["courses/numbers", "Know The Number 1-9"],
  ["courses/vedic-numerology", "Vedic Numerology"],
  ["courses/basic-astrology", "Basic Astrology"],
  ["courses/marriage", "Marriage Astrology"],
  ["courses/progeny", "Progeny Astrology"],
  ["courses/career", "Profession & Career Astrology"],
  ["courses/bhrigu", "Bhrigu Chakra Padhiti"],
  ["courses/pythagorean", "Pythagorean Numerology"],
  ["courses/currency", "Prediction From Currency Notes"],
  ["courses/wealth", "Wealth Property Foreign Astrology"],
  ["courses/complete-vastu", "Complete Vastu Course"],
  ["courses/free-hora", "Learn Jagannath Hora Software"],
  ["courses/free-marriage", "Marriage Astrology - Free Series"],
  ["courses/free-vastu-entrances", "Learn 32 Vastu Entrances"],
  ["courses/free-remedies", "Vastu Symbolic Remedies"],
  ["courses/live-predictive", "Predictive Numerology Course"],
  ["courses/live-vastu", "Complete Basic to Advanced Vastu"],
  ["courses/live-name", "Predictive Name Numerology Course"],
  ["courses/prashna", "Prashna Kundali"],
];
for (const [rel, title] of courses) {
  write(`${rel}.svg`, svg({ w: 640, h: 360, title, palette: rel.startsWith("courses/live") || rel.startsWith("courses/free") ? OLIVE : GOLD, icon: "✦" }));
}

// Books
const books = [
  ["books/bphs", "Brihat Parasara Hora Sastra"],
  ["books/bvraman", "How to Judge a Horoscope"],
  ["books/lightonlife", "Light on Life"],
  ["books/phala", "Phala Deepika"],
  ["books/yogi", "Autobiography of A Yogi"],
  ["books/navagraha", "Navagraha Purana"],
  ["books/navagraha-hi", "Navagraha Purana Hindi"],
  ["books/nakshatras", "The Nakshatras"],
  ["books/bphs-hi", "Brihat Parashara Hora (Hindi)"],
  ["books/elements", "Elements of Vedic Astrology"],
  ["books/bhrigu-saral", "Bhrigu Saral Paddhati"],
  ["books/bhrigu-hi", "Bhrigu Saral Paddhati Hindi"],
  ["books/cjk", "Learn Astrology Easily"],
  ["books/satyajatakam", "Satya Jatakam"],
  ["books/navamsa", "Navamsa System of Prediction"],
  ["books/dispositors", "Dispositors in Astrology"],
  ["books/aadhunik", "Kundali Vivechna (Aadhunik Vidhi)"],
  ["books/dictionary", "Dictionary of Astrology"],
  ["books/vimshottari", "Timing Events Through Vimshottary Dasha"],
  ["books/vimshottari-hi", "Vimshottari Dasha Hindi"],
  ["books/finer", "Finer Techniques of Prediction"],
  ["books/deva", "Deva Keralam"],
  ["books/catechism", "A Catechism of Astrology"],
  ["books/golden", "Golden Rules of Astrology"],
  ["books/fundamentals", "Fundamentals of Astrology"],
  ["books/karma", "Karamvipak Sahinta"],
  ["books/muhurat-hi", "Muhurat Chintamani Hindi"],
  ["books/muhurat-en", "Muhurta Chintamani English"],
  ["books/jataka", "Jataka Desh Marga"],
  ["books/kalaprakasika", "Kalaprakasika"],
  ["books/sarvarth", "Sarvarth Chintamani"],
  ["books/brihatjatak", "Brihat Jatak"],
  ["books/ayurveda-en", "Everyday Ayurveda"],
  ["books/ayurveda-hi", "Everyday Ayurveda Hindi"],
  ["books/vishwakarma", "Vishwakarma Prakash"],
  ["books/vishwakarma-decoded", "Visvakarma Prakash Decoded"],
  ["books/vastu-retold", "The Ancient Science of Vastu"],
  ["books/uttara", "Uttara Kalamrita"],
  ["books/samrangana-hi", "Samrangana Sutradhar Hindi"],
  ["books/samrangana-en", "Samarangana-Sutradhara English"],
];
for (const [rel, title] of books) {
  write(`${rel}.svg`, svg({ w: 400, h: 400, title, palette: CREAM, icon: "✦" }));
}

// Products
const products = [
  ["products/swastik", "Copper Swastik"],
  ["products/tortoise", "Brass Tortoise"],
  ["products/chakra", "Vastu Shakti Chakra"],
  ["products/compass", "Military Compass"],
  ["products/bosch", "Bosch Laser Measure"],
  ["products/aluminium", "Aluminium Strip"],
  ["products/copper", "Vastu Copper Strip"],
  ["products/iron", "Vastu Iron Strip"],
  ["products/brass-strip", "Brass Vastu Strip"],
  ["products/steel", "Steel Vastu Strip"],
  ["products/tapes", "Vastu Color Floor Tapes"],
  ["products/strips-combo", "Vastu Strips Combo"],
  ["products/camel", "Brass Camel Statue"],
  ["products/lion", "Brass Lion Statue"],
  ["products/eagle", "Brass Eagle Statue"],
  ["products/deer", "Brass Deer Statue"],
];
for (const [rel, title] of products) {
  write(`${rel}.svg`, svg({ w: 400, h: 400, title, palette: ROYAL, icon: "✦" }));
}

// Blog
const blog = [
  ["blog/gochar", "21 Pillars of Gochar Research"],
  ["blog/market", "Stock Market Astrology"],
  ["blog/dasha", "Vimshottari Dasha Research"],
  ["blog/ashtakavarga", "Ashtakavarga System Research"],
  ["blog/vastu-mandala", "Vastu Purusha Mandala 81-Grid"],
  ["blog/sadhe-sati", "Shani Sadhe Sati Research"],
];
for (const [rel, title] of blog) {
  write(`${rel}.svg`, svg({ w: 800, h: 450, title, palette: GOLD, icon: "✦" }));
}

console.log("All images generated.");
