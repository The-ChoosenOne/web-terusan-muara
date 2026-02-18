import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Ini untuk memperbaiki error 1MB tadi
    },
  },
};

export default nextConfig;