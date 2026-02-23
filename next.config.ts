import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Quality 60 is sufficient for high-DPI "Cinematic" dark-mode visuals
    // while significantly reducing bandwidth for LCP.
    qualities: [60, 75],
    // Include 1400 to match the actual hero source image width (1400x934)
    // preventing Next.js from serving an unnecessarily upscaled variant.
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1920, 2048],
  },
};

export default nextConfig;
