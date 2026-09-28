import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Bad-bot gate (runs on the edge, ~zero CPU).
// Blocks aggressive SEO-scraper bots BEFORE any page render / DB query,
// so they can't burn Fluid CPU. Genuine crawlers (Google, Bing),
// link-preview fetchers (WhatsApp, Facebook, Twitter, LinkedIn) and
// normal browsers always pass through untouched.
const BAD_BOTS = [
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "blexbot",
  "megaindex",
  "exabot",
  "linkdexbot",
  "serpstatbot",
  "seokicks",
  "backlink-check",
  "link-checker",
  "spbot",
  "barkrowler",
  "dataforseo",
  "ev-crawler",
  "zoominfobot",
  "crawlson",
];

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";
  if (ua && BAD_BOTS.some((b) => ua.includes(b))) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  // Everything except static assets, crawler essentials (robots/sitemap)
  // and Next internals. API + admin stay covered against bot floods.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon|opengraph-image|twitter-image|apple-touch-icon.png|site.webmanifest|images/).*)",
  ],
};
