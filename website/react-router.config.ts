import type { Config } from "@react-router/dev/config";
import { nodePreset } from "@resolid/react-router-hono/node-preset";
import { vercelPreset } from "@resolid/react-router-hono/vercel-preset";
import { env } from "node:process";

const includeFiles = [".resolid/content/*.json"];

// noinspection JSUnusedGlobalSymbols
export default {
  appDirectory: "src",
  ssr: true,
  presets: [
    env.VERCEL == "1"
      ? vercelPreset({
          entryFile: "server.vercel.ts",
          includeFiles,
          nodeVersion: 24,
        })
      : nodePreset({
          entryFile: "server.node.ts",
          includeFiles,
          nodeVersion: 24,
        }),
  ],
  future: {
    unstable_optimizeDeps: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
