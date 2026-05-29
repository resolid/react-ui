import type { ReactNode } from "react";
import { runIf } from "@resolid/utils";
import { useHydrated } from "../../hooks";

export type ClientOnlyProps = {
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode;
};

export function ClientOnly({ children, fallback }: ClientOnlyProps): ReactNode {
  const hydrated = useHydrated();

  return hydrated ? runIf(children) : fallback;
}
