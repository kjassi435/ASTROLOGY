const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.setTimeout(10000, () => req.destroy(new Error("timeout")));
  });
}

(async () => {
  const dd = "19", mm = "08", yyyy = "2026";
  const url = `https://www.drikpanchang.com/planet/position/planetary-positions-sidereal.html?date=${dd}/${mm}/${yyyy}`;
  const html = await get(url);
  // Extract dpPlanetCell blocks
  const blocks = html.split(/dpPlanetCell/);
  const SIGN_MAP = { Mesh:"Aries",Vrish:"Taurus",Mitu:"Gemini",Kark:"Cancer",Simh:"Leo",Kany:"Virgo",Tula:"Libra",Vrishchik:"Scorpio",Dhan:"Sagittarius",Makar:"Capricorn",Kumb:"Aquarius",Meen:"Pisces" };
  console.log("=== DRIKPANCHANG RAW (today) ===");
  for (const b of blocks) {
    const nm = b.match(/>\s*([A-Za-z]+)\s*</);
    if (!nm) continue;
    const longM = b.match(/dpLongitudeCell">(\d+)&#176;\s*<strong>([^<]+)<\/strong>\s*(\d+)&#8242;\s*(\d+)&#8243;/);
    const nakM = b.match(/dpNakshatraCell">\s*(?:<img[^>]*>\s*)*([A-Za-z]+)/);
    if (!longM) continue;
    const sign = SIGN_MAP[longM[2]] || longM[2];
    console.log(`${nm[1].padEnd(10)} ${sign.padEnd(12)} ${longM[1]}°${longM[3]}'${longM[4]}" nak=${nakM?nakM[1]:'?'} R=${b.includes('↺')||b.includes('&#x21ba;')}`);
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
