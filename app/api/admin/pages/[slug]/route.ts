import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, saveSiteContent, normalizeImageUrl } from "@/lib/cms";
import { SITE_PAGES } from "@/lib/site-content";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { slug } = await params;
  const { getSiteContent } = await import("@/lib/cms");
  return NextResponse.json({ fields: await getSiteContent(slug) });
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { slug } = await params;
  const body = (await req.json()) as { fields: Record<string, string> };
  const fields = body.fields ?? {};
  const page = SITE_PAGES.find((p) => p.slug === slug);
  if (page) {
    for (const f of page.fields) {
      if (f.type === "image" && typeof fields[f.key] === "string") {
        fields[f.key] = normalizeImageUrl(fields[f.key]) ?? "";
      }
    }
  }
  await saveSiteContent(slug, fields);
  return NextResponse.json({ success: true });
}
