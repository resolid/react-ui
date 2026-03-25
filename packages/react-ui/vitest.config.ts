import { defineConfig, type ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});

export default config;
