import { trimEnd } from "@resolid/utils";
import chokidar from "chokidar";
import glob from "fast-glob";
import GithubSlugger from "github-slugger";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import { mkdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { cwd } from "node:process";
import removeMd from "remove-markdown";
import { visit } from "unist-util-visit";
import { parse } from "yaml";

export default function viteContent() {
  const contentDir = join(cwd(), ".resolid", "content");

  mkdirSync(contentDir, { recursive: true });

  let root;
  let enabled = false;
  let started = false;

  return {
    name: "vite-content-plugin",

    config(config) {
      root = config.root;
    },

    configResolved(config) {
      enabled = isEnabled(config);
    },

    async configureServer() {
      if (!enabled) {
        return;
      }

      if (started) {
        return;
      }

      started = true;

      await contentBuild({ root, contentDir, watch: true });
    },

    async buildStart() {
      if (!enabled) {
        return;
      }

      if (started) {
        return;
      }

      started = true;

      await contentBuild({ root, contentDir, watch: false });
    },
  };
}

const isEnabled = (config) => {
  if (!config.build?.ssr) {
    if (config.__reactRouterPluginContext) {
      return true;
    }
  }

  return false;
};

const MATTER_RE = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

const contentBuild = async ({ root, contentDir, watch }) => {
  const pattern = "src/routes/docs/_mdx/**/*.mdx";
  const routesPath = join(root, "src/routes");
  const githubRepo = "https://github.com/resolid/react-ui/blob/main/";

  const build = async () => {
    const files = await glob(pattern, { cwd: root, absolute: true, onlyFiles: true });

    const markdownMeta = {};
    const markdownSearch = [];

    for (const file of files) {
      const slugs = new GithubSlugger();

      const resolvePath = relative(routesPath, file).split(sep).join("/");

      const documentLink = new URL(resolvePath, githubRepo + "website/src/routes/").toString();

      const urlPath = trimEnd(
        resolvePath.replace("/_mdx", "").replace("_index", "").replace(".mdx", ""),
        "/",
      );

      const componentName = resolvePath.replace("docs/_mdx/", "").startsWith("components/")
        ? resolvePath.replace("docs/_mdx/components/", "").replace(".mdx", "")
        : null;

      const sourceLink =
        componentName && componentName !== "icon" && componentName !== "typography"
          ? new URL(
              componentName + "/" + componentName + ".tsx",
              githubRepo + "/packages/react-ui/src/components/",
            ).toString()
          : null;

      const doc = await readFile(file, { encoding: "utf-8" });

      const match = doc.match(MATTER_RE);
      const matter = match == null ? null : match[1];

      const meta = matter == null ? {} : (parse(matter) ?? {});

      const tree = fromMarkdown(match == null ? doc : doc.slice(match[0].length).trim());

      const toc = [];

      visit(tree, ["heading"], (node) => {
        if (node.type === "heading") {
          const text = toString(node);

          toc.push({
            depth: node.depth,
            text: text,
            slug: slugs.slug(text),
          });
        }
      });

      markdownMeta[urlPath] = {
        meta,
        toc,
        documentLink,
        sourceLink,
      };

      markdownSearch.push({
        id: urlPath,
        title: meta.title,
        description: meta.description,
        content: removeMd(
          doc
            .replace(MATTER_RE, "")
            .replace(/```[\s\S]*?```/g, "")
            .replace(/::[A-Za-z0-9_-]+\{[^}]*}/g, ""),
          {},
        ).replace(/\n+/g, "\n"),
      });
    }

    await writeFile(join(contentDir, "markdown.json"), JSON.stringify(markdownMeta, null, 2), {
      encoding: "utf8",
    });
    await writeFile(join(contentDir, "search.json"), JSON.stringify(markdownSearch, null, 2), {
      encoding: "utf8",
    });
  };

  if (watch) {
    chokidar
      .watch("src/routes/docs/_mdx", {
        cwd: root,
        awaitWriteFinish: { stabilityThreshold: 50, pollInterval: 10 },
      })
      .on("all", async (event, filename) => {
        if (event === "addDir" || event === "unlinkDir") {
          return;
        }
        if (filename == null || typeof filename !== "string") {
          return;
        }

        await build();
      });
  } else {
    await build();
  }
};
