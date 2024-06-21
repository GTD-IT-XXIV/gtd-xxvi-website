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
  transpilePackages: ["three"],
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    /* eslint-disable */
    // @ts-ignore
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
    /* eslint-enable */
  },
};

if (shouldAnalyzeBundles) {
  const { default: bundleAnalyzer } = await import("@next/bundle-analyzer");
  const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
