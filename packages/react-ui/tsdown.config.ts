import rolldownBabel from "@rolldown/plugin-babel";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
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
  plugins: [rolldownBabel({ presets: [reactCompilerPreset()] })],
});

export default config;
