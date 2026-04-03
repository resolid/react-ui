import mdx from "@mdx-js/rollup";
import { resolidVite } from "@resolid/dev/vite";
import rolldownBabel from "@rolldown/plugin-babel";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { join } from "node:path";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { type AliasOptions, defineConfig, type UserConfig } from "vite";
import { rehypeParseMeta } from "./plugins/rehype-parse-meta";
import remarkDetails from "./plugins/remark-details";
import remarkDocgen from "./plugins/remark-docgen";
import remarkGithubAlert from "./plugins/remark-github-alert";
import remarkRemove from "./plugins/remark-remove";
import viteContent from "./plugins/vite-content";
import { vitePluginOptions } from "./resolid.config";

export default defineConfig(({ command }) => {
  const isBuild = command == "build";

  const config: UserConfig = {
    plugins: [
      mdx({
        providerImportSource: "@mdx-js/react",
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeShiki,
            {
              langs: ["bash", "js", "jsx", "ts", "tsx", "html", "css"],
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
              defaultColor: false,
              parseMetaString: rehypeParseMeta,
            },
          ],
        ],
        remarkPlugins: [
          remarkDirective,
          remarkFrontmatter,
          remarkGfm,
          remarkGithubAlert,
          remarkDetails,
          [remarkDocgen, { sourceRoot: join(__dirname, "../packages/react-ui/src/components") }],
          remarkRemove,
        ],
      }),
      resolidVite(vitePluginOptions),
      tailwindcss(),
      rolldownBabel({ presets: [reactCompilerPreset()] }),
      viteContent(),
    ],
    build: {
      rolldownOptions: {
        checks: { pluginTimings: false },
        output: {
          codeSplitting: {
            groups: [
              {
                name: "react",
                test: /node_modules[\\/](react|react-dom|react-is|scheduler)[\\/]/,
              },
              {
                name: "react-router",
                test: /node_modules[\\/](@react-router|react-router)[\\/]/,
              },
              {
                name: "components",
                test: /node_modules[\\/]@resolid[\\/]dev|src[\\/]components[\\/](?:history-link|error-component|route-process-bar|color-mode-toggle|sprite-icon)\.tsx/,
              },
            ],
          },
        },
      },
    },
    resolve: {
      tsconfigPaths: !isBuild,
      alias: [isBuild && { find: "~", replacement: join(__dirname, "./src") }].filter(
        Boolean,
      ) as AliasOptions,
    },
  };

  return config;
});
