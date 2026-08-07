import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/thank-you", "/privacy", "/terms"] },
    ],
    sitemap: `https://${BRAND.domain}/sitemap.xml`,
  };
}
