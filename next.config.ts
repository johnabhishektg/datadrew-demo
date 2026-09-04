import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Live datadrew.io URLs are slash-terminated (/blog/, /pricing/) and that is
  // what GSC, the sitemap and every backlink carry. Keep them at cutover.
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.brandfetch.io",
      },
      {
        protocol: "https",
        hostname: "cms-production-0fcb.up.railway.app",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
