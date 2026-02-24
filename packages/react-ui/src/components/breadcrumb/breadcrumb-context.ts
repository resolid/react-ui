import type { ReactNode } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type BreadcrumbContextValue = {
  /**
   * 每个面包屑项目之间的视觉分隔符
   * @default <SlashIcon>
   */
  separator?: ReactNode;
};

const [context, hook] = createSafeContext<BreadcrumbContextValue>({
  name: "BreadcrumbContext",
});

export const BreadcrumbContext: SafeContext<BreadcrumbContextValue> = context;
export const useBreadcrumb: UseSafeContext<BreadcrumbContextValue> = hook;
