import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Tắt cảnh báo compile
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Tắt console trong production
  },
  // Tắt các cảnh báo khác
  staticPageGenerationTimeout: 1000,
  // Tối ưu hóa để bỏ qua lỗi
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  images: {
    unoptimized: true,      // ⭐ BỎ QUA sharp / image optimizer
    domains: ["127.0.0.1"], 
    formats: ["image/avif", "image/webp"], // AVIF trước
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.vietnam-tickets.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

};


export default nextConfig;