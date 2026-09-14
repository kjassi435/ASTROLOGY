import type { MetadataRoute } from "next";
import { getServices, getCourses, getPosts } from "@/lib/cms";
import { BRAND } from "@/lib/site";

// Always fresh from the database (with static fallbacks), so anything the
// client adds in the admin panel — services, courses, blogs — automatically
// appears here. Recorded-course detail pages are intentionally excluded:
// those cards link out to the ClassPlus store and have no on-site page.
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
