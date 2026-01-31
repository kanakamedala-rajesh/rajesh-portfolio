import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Quality 60 is sufficient for high-DPI "Cinematic" dark-mode visuals
    // while significantly reducing bandwidth for LCP.
    qualities: [60, 75],
  },
};

export default nextConfig;
