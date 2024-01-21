import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "node",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    setupFiles: ["dotenv/config"],
  },
});
