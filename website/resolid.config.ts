import { defineDevConfig } from "@resolid/dev";
import { env } from "node:process";

export const { vitePluginOptions, reactRouterConfig } = defineDevConfig({
  appDirectory: "src",
  nodeVersion: 24,
  platform: env.VERCEL == 1 ? "vercel" : "node",
  devExclude: ["/.resolid/**/*"],
  reactRouterConfig: {
    future: {
      unstable_optimizeDeps: true,
    },
  },
});
