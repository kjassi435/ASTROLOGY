import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 32, height: 32 };

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          borderRadius: "50%",
        }}
      >
        <div style={{ fontSize: 20, color: "#00c6ff", fontWeight: 700 }}>✦</div>
      </div>
    ),
    { ...size }
  );
}