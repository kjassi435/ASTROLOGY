import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/thank-you", "/admin", "/api/"] },
      // Polite AI/scraper bots: ye robots.txt mante hain, origin load bachata hai.
      // Google/Bing/WhatsApp/Facebook previews allow rehte hain — SEO safe.
      { userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "ClaudeBot", "anthropic-ai", "Bytespider", "PerplexityBot", "YouBot", "cohere-ai", "Ai2Bot-Dolma", "Diffbot", "omgilibot", "omgili", "FacebookBot"], allow: [], disallow: ["/"] },
    ],
    sitemap: `https://${BRAND.domain}/sitemap.xml`,
  };
}
