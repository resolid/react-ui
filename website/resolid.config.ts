import { defineDevConfig } from "@resolid/dev";

export const { vitePluginOptions, reactRouterConfig } = defineDevConfig({
  appDirectory: "src",
  platform: "node",
  nodeVersion: 26,
  includeFiles: [".resolid/content/*.json"],
  devExclude: ["/.resolid/**/*"],
  reactRouterConfig: {
    future: {
      unstable_optimizeDeps: true,
    },
  },
});
