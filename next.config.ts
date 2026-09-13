import type { NextConfig } from "next";
import path from "node:path";

// Les médias sont servis depuis public/media : aucun hôte distant à autoriser.
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
