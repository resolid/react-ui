import { defineDevConfig } from "@resolid/dev";
import { env } from "node:process";

export const { vitePluginOptions, reactRouterConfig } = defineDevConfig({
  appDirectory: "src",
  platform: env.VERCEL == 1 ? "vercel" : "node",
  nodeVersion: 24,
  includeFiles: [".resolid/content/*.json"],
  devExclude: ["/.resolid/**/*"],
});
