import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function requireAdmin(): Promise<boolean> {
  const c = await cookies();
  return c.get("admin-token")?.value === "authenticated";
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
