import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { type UserConfig, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()] as UserConfig["plugins"],
  test: {
    environment: "jsdom",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    setupFiles: ["dotenv/config"],
  },
});
