import browserConfig from "@resolid/config/oxlint/browser";
import reactConfig from "@resolid/config/oxlint/react";
import typescriptConfig from "@resolid/config/oxlint/typescript";
import { defineConfig, type OxlintConfig } from "oxlint";

export default defineConfig({
  extends: [typescriptConfig, reactConfig, browserConfig],
  rules: {
    "jsx-a11y/prefer-tag-over-role": "off",
    "jsx-a11y/no-noninteractive-element-to-interactive-role": [
      "error",
      {
        table: ["grid"],
      },
    ],
  },
}) as OxlintConfig;
