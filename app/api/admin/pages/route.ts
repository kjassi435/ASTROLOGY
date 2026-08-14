import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getSiteContent, saveSiteContent } from "@/lib/cms";

const PAGES = [
  { slug: "home", title: "Homepage", fields: ["heroTitle", "heroSubtitle", "aboutText", "ctaText"] },
  { slug: "about", title: "About Page", fields: ["title", "subtitle", "bio"] },
  { slug: "services", title: "Services Page", fields: ["title", "subtitle", "description"] },
  { slug: "contact", title: "Contact Page", fields: ["title", "subtitle", "address", "phone", "email"] },
  { slug: "books", title: "Books Page", fields: ["title", "subtitle"] },
  { slug: "courses", title: "Courses Page", fields: ["title", "subtitle", "description"] },
  { slug: "blog", title: "Blog Page", fields: ["title", "subtitle"] },
];

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const items = await Promise.all(
    PAGES.map(async (p) => ({ ...p, fields: await getSiteContent(p.slug) }))
  );
  return NextResponse.json({ items });
}
