import type { NextConfig } from "next";

/** Old static-site URLs (v1) that may still be shared or indexed. */
const legacy: [string, string][] = [
  ["/index.html", "/"],
  ["/mia.html", "/"],
  ["/concept-grouping.html", "/work/concept-grouping"],
  ["/alegra-app.html", "/work/app-redesign"],
  ["/atelier.html", "/work/atelier"],
  ["/bestie.html", "/work/bestie"],
  ["/cv/camilo-bermeo-cv.html", "/cv/camilo-bermeo-cv.pdf"],
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
