import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          borderRadius: 40,
        }}
      >
        <div style={{ fontSize: 60, color: "#00c6ff", fontWeight: 700 }}>✦</div>
        <div style={{ fontSize: 18, color: "#ffffff", marginTop: 8 }}>Arvin Astro</div>
      </div>
    ),
    { ...size }
  );
}