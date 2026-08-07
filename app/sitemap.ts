import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { RECORDED_COURSES, LIVE_COURSES } from "@/lib/courses";
import { POSTS } from "@/lib/blog";
import { BRAND } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const courseRoutes: MetadataRoute.Sitemap = [
    ...RECORDED_COURSES.map((c) => ({
      url: `${base}/courses/recorded/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...LIVE_COURSES.map((c) => ({
      url: `${base}/courses/live/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...courseRoutes, ...blogRoutes];
}
