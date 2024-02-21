import createJiti from "jiti";

const jiti = createJiti(new URL(import.meta.url).pathname);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for Docker builds.
 */
jiti("./src/env");

const shouldAnalyzeBundles = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
let nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/*",
      },
    ],
  },
  output: "standalone",
};

if (shouldAnalyzeBundles) {
  const { default: bundleAnalyzer } = await import("@next/bundle-analyzer");
  const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
