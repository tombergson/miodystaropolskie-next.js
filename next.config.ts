import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.8.16", "192.168.8.16:3000", "localhost:3000"],
};

export default nextConfig;