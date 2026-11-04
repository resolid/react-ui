import type { ReactNode } from "react";
import { resolveValue } from "@resolid/utils";
import { useHydrated } from "../../hooks/use-hydrated";

export type ClientOnlyProps = {
  /**
   * @ignore
   * */
  children: ReactNode | (() => ReactNode);

  /**
   * 组件在客户端挂载期间渲染的后备内容。
   * */
  fallback?: ReactNode;
};

export function ClientOnly({ children, fallback }: ClientOnlyProps): ReactNode {
  const hydrated = useHydrated();

  return hydrated ? resolveValue(children) : fallback;
}
