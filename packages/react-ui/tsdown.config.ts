import { defineConfig, type UserConfig } from "tsdown";
import { reactCompilerRolldownPlugin } from "./plugins/react-compiler-plugin.js";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: {
    index: "src/index.ts",
    "locales/*": ["src/locales/*.ts", "!src/locales/en-US.ts"],
  },
  format: "esm",
  platform: "neutral",
  target: "es2022",
  dts: true,
  treeshake: true,
  clean: true,
  minify: "dce-only",
  plugins: [reactCompilerRolldownPlugin({ filter: /\.[jt]sx?$/ })],
}) as UserConfig;
