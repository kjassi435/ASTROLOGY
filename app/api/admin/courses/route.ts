import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getCourses, saveCourse, type CourseInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getCourses() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as CourseInput;
  if (!body.slug || !body.title) return NextResponse.json({ error: "slug and title required" }, { status: 400 });
  await saveCourse(body);
  return NextResponse.json({ success: true });
}
