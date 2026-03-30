import MiniSearch from "minisearch";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

export async function getMdxMeta(pathname: string): Promise<{
  meta: { title: string; description?: string };
  documentLink: string;
  sourceLink: string | null;
  toc: { depth: number; text: string; slug: string }[];
} | null> {
  const filePath = join(cwd(), ".resolid/content/markdown.json");

  const markdownMeta = JSON.parse(await readFile(filePath, { encoding: "utf-8" }));

  return markdownMeta[pathname] ?? null;
}

export async function getSearchData(q: string) {
  const filePath = join(cwd(), ".resolid/content/search.json");

  const searchData = JSON.parse(await readFile(filePath, { encoding: "utf-8" }));

  const miniSearch = new MiniSearch({
    fields: ["title", "description", "content"],
    storeFields: ["id", "title", "description"],
    searchOptions: { fuzzy: 0.2, prefix: true },
  });

  miniSearch.addAll(searchData);

  return miniSearch.search(q);
}
