import { mergeMeta } from "@resolid/dev/router";
import { ErrorComponent } from "~/components/error-component";

export const loader = async () => {
  throw new Response("文档未找到", { status: 404 });
};

export const meta = mergeMeta(() => [
  {
    title: "文档未找到",
  },
]);

export default function Catchall() {
  return null;
}

export const ErrorBoundary = ErrorComponent;
