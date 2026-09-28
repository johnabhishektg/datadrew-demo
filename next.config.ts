import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Live datadrew.io URLs are slash-terminated (/blog/, /pricing/) and that is
  // what GSC, the sitemap and every backlink carry. Keep them at cutover.
  trailingSlash: true,
  // /book used to be a demo-request form. Every CTA now links Sumit's Calendly
  // directly (Sep 22 2026); this catches stale /book links from old pages,
  // emails and the app.
  async redirects() {
    const calendly = "https://calendly.com/sumit-growth/discussion";
    return [
      { source: "/book", destination: calendly, permanent: true },
      { source: "/book/", destination: calendly, permanent: true },
    ];
  },
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
