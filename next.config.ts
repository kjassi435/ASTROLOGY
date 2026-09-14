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
      { source: "/vastu-products/", destination: "/vastu-products", permanent: true },
      { source: "/contact-with-us/", destination: "/contact", permanent: true },
      { source: "/our-courses/", destination: "/courses", permanent: true },
      { source: "/blog/", destination: "/blog", permanent: true },
      { source: "/live/", destination: "/courses/live", permanent: true },
    ];
  },
};

export default nextConfig;
