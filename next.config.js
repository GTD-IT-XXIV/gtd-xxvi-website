import createJiti from "jiti";
import { fileURLToPath } from "url";

const jiti = createJiti(fileURLToPath(import.meta.url));

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
      {
        protocol: "https",
        hostname: "ddjhntpphokusdgpaxuv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/gtd-xxvi-website/*",
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
