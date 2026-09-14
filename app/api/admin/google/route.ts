import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { googleAuthEnabled, exchangeGoogleCode } from "@/lib/admin-db";

export async function GET(req: Request) {
  if (!googleAuthEnabled()) {
    return NextResponse.json({ error: "Google login not configured" }, { status: 404 });
  }
  const url = new URL(req.url);
  const redirectUri = `${url.origin}/api/admin/google/callback`;
  const googleUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    }).toString();
  return NextResponse.redirect(googleUrl);
}
