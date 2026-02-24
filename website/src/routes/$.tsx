import { ErrorComponent } from "~/components/error-component";
import { mergeMeta } from "~/utils/react-router-meta";

// noinspection JSUnusedGlobalSymbols
export const loader = async () => {
  throw new Response("页面未找到", { status: 404 });
};

// noinspection JSUnusedGlobalSymbols
export const meta = mergeMeta(() => [
  {
    title: "页面未找到",
  },
]);

// noinspection JSUnusedGlobalSymbols
export default function Catchall() {
  return null;
}

// noinspection JSUnusedGlobalSymbols
export const ErrorBoundary = ErrorComponent;
