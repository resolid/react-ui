import { defineConfig, type UserConfig } from "tsdown";
import { reactCompilerRolldownPlugin } from "./plugins/react-compiler-plugin.js";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: "src/index.ts",
  format: "esm",
  platform: "browser",
  target: "es2022",
  dts: true,
  treeshake: true,
  clean: true,
  plugins: [reactCompilerRolldownPlugin({ filter: /\.[jt]sx?$/ })],
}) as UserConfig;
