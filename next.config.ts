import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // The Google Sites URLs have been live and indexed — keep them working (§4).
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/what-we-do", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/about", permanent: true },
      {
        source: "/prospective-members",
        destination: "/recruitment",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
