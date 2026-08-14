import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, seedIfEmpty } from "@/lib/cms";

export async function POST() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const result = await seedIfEmpty();
  return NextResponse.json(result);
}
