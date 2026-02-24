import type { TransitionStatus } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperTransitionContextValue = {
  status: TransitionStatus;
  mounted: boolean;
  duration: number;
};

const [context, hook] = createSafeContext<PopperTransitionContextValue>({
  name: "PopperTransitionContext",
});

export const PopperTransitionContext: SafeContext<PopperTransitionContextValue> = context;
export const usePopperTransition: UseSafeContext<PopperTransitionContextValue> = hook;
