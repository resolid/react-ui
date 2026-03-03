import { getSearchData } from "~/utils/mdx-utils.server";

export async function search(keyword: string | undefined) {
  const result = await getSearchData(keyword ?? "");

  return result.map((r) => ({ value: r.id, label: r.title, description: r.description }));
}
