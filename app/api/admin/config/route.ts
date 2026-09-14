import { NextResponse } from "next/server";
import { googleAuthEnabled } from "@/lib/admin-db";

export async function GET() {
  return NextResponse.json({ googleEnabled: googleAuthEnabled() });
}
