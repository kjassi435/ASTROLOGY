import { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/arvindrun-vnjay/", destination: "/about", permanent: true },
      { source: "/astrology-vastu-name-designing/", destination: "/services", permanent: true },
      { source: "/recorded-courses/", destination: "/courses/recorded", permanent: true },
      { source: "/free-courses/", destination: "/courses/free", permanent: true },
      { source: "/live-courses/", destination: "/courses/live", permanent: true },
      { source: "/recommended-books/", destination: "/books", permanent: true },
      { source: "/contact-with-us/", destination: "/contact", permanent: true },
      { source: "/our-courses/", destination: "/courses", permanent: true },
      { source: "/live/", destination: "/courses/live", permanent: true },
    ];
  },
  async headers() {
    // Vercel usage fix: API + sitemap ko CDN pe cache karo taaki har hit
    // origin compute (Fast Origin Transfer + Fluid CPU) na jalaye.
    // Real users ko fresh-ish data milta rahega, bots origin tak nahi pahunchenge.
    return [
      {
        source: "/api/transit",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=43200, stale-while-revalidate=86400" }],
      },
      {
        source: "/api/horoscope/:path*",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=86400" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
