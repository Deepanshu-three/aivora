import type { NextConfig } from "next";

// next.config.js or next.config.ts
const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 50 * 1024 * 1024, // 50 MB
    },
  },
};


export default nextConfig;
