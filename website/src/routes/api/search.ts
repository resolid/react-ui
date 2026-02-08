import { getSearchData } from "~/utils/mdx-utils.server";
import type { Route } from "../../../.react-router/types/src/routes/api/+types/search";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const keyword = new URL(request.url).searchParams.get("q");

  const result = await getSearchData(keyword ?? "");

  return result.map((r) => ({ value: r.id, label: r.title, description: r.description }));
};
