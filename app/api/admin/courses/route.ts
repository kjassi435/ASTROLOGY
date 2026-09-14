import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getAdminCourses, saveCourse, type CourseInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getAdminCourses() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as CourseInput & { id?: number };
  if (!body.title) return NextResponse.json({ error: "title required" }, { status: 400 });
  const { id, ...input } = body;
  const newId = await saveCourse(input, id);
  return NextResponse.json({ id: newId });
}
