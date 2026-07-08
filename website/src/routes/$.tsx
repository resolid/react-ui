import { mergeMeta } from "@resolid/dev/router";
import { ErrorComponent } from "~/components/error-component";
import type { Route } from "./+types/$";

export const loader = async () => {
  throw new Response("页面未找到", { status: 404 });
};

export const meta = mergeMeta(() => [
  {
    title: "页面未找到",
  },
]);

export default function Catchall() {
  return null;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <ErrorComponent error={error} />;
}
