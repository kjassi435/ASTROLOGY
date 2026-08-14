import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getSiteContent, saveSiteContent } from "@/lib/cms";
import { SITE_PAGES } from "@/lib/site-content";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const items = await Promise.all(
    SITE_PAGES.map(async (p) => ({
      slug: p.slug,
      title: p.title,
      fields: p.fields,
      values: await getSiteContent(p.slug),
    }))
  );
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = await req.json();
  const slug = String(body.slug ?? "");
  if (!SITE_PAGES.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 400 });
  }
  const fields = body.fields && typeof body.fields === "object" ? body.fields : {};
  await saveSiteContent(slug, fields);
  return NextResponse.json({ ok: true });
}
