import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Αγνοεί τα σφάλματα TypeScript μόνο κατά το build στο Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Αγνοεί και τα σφάλματα ESLint κατά το build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
