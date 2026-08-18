import type { NextConfig } from "next";
import path from "node:path";

// Hôte Supabase autorisé pour next/image (dérivé de NEXT_PUBLIC_SUPABASE_URL).
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "**.supabase.co";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // En local, certains DNS résolvent supabase.co en adresses NAT64 (64:ff9b::/96)
    // que Next considère comme privées et refuse d'optimiser. On lève la restriction
    // en développement uniquement : en production elle reste active.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
