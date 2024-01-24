import react from "@vitejs/plugin-react";
import { type UserConfig, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()] as UserConfig["plugins"],
  test: {
    environment: "jsdom",
  },
});
