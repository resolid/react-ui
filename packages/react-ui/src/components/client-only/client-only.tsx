import type { ReactNode } from "react";
import { runIf } from "@resolid/utils";
import { useHydrated } from "../../hooks";

export type ClientOnlyProps = {
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode;
};

export const ClientOnly = ({ children, fallback }: ClientOnlyProps): ReactNode =>
  useHydrated() ? runIf(children) : fallback;
