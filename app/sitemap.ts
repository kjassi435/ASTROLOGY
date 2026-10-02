import type { MetadataRoute } from "next";
import { getServices, getCourses, getPosts } from "@/lib/cms";
import { BRAND } from "@/lib/site";

// Cached for 24h at CDN (Vercel usage fix). DB-driven but static-ish:
// force-dynamic har /sitemap.xml hit pe 3x Turso query + origin transfer
// jala raha tha (bots roz hammer karte hain). Ab 1 din me 1 baar regenerate.
export const dynamic = "force-static";
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base = `https://${BRAND.domain}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses/recorded`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses/free`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/courses/live`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/vastu-products`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [services, courses, posts] = await Promise.all([getServices(), getCourses(), getPosts()]);

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const courseRoutes: MetadataRoute.Sitemap = courses
    .filter((c) => c.type === "live" || c.type === "free")
    .map((c) => ({
      url: `${base}/courses/${c.type}/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => (p.status ?? "published") !== "draft")
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...serviceRoutes, ...courseRoutes, ...blogRoutes];
}
