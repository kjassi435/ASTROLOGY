import { NextResponse } from "next/server";
import { ensureDb, saveEnquiry } from "@/lib/cms";

// Public endpoint so website forms can store leads in contact_submissions
// (visible in Admin → Contact). No admin auth by design; failures must never
// block the WhatsApp flow, so forms fire-and-forget this call.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    await ensureDb();
    await saveEnquiry({
      name: String(body.name ?? ""),
      phone: String(body.phone ?? body.contact ?? ""),
      email: String(body.email ?? ""),
      service: String(body.service ?? ""),
      message: String(body.message ?? ""),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not save enquiry" }, { status: 400 });
  }
}
