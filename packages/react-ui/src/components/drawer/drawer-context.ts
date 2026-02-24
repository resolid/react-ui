import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type DrawerPlacement = "start" | "end" | "bottom" | "top";

export type DrawerContextValue = {
  /**
   * 放置位置
   * @default 'right'
   */
  placement: DrawerPlacement;
};

const [context, hook] = createSafeContext<DrawerContextValue>({
  name: "DrawerContext",
});

export const DrawerContext: SafeContext<DrawerContextValue> = context;
export const useDrawer: UseSafeContext<DrawerContextValue> = hook;
