import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getTestimonials, saveTestimonial, deleteTestimonial, type TestimonialInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getTestimonials() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as TestimonialInput;
  if (!body.name) return NextResponse.json({ error: "name required" }, { status: 400 });
  await saveTestimonial(body);
  return NextResponse.json({ success: true });
}
