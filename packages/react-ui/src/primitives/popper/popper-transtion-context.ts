import type { Duration, TransitionStatus } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperTransitionContextValue = {
  status: TransitionStatus;
  mounted: boolean;
  duration: Duration;
};

const [context, hook] = createSafeContext<PopperTransitionContextValue>({
  name: "PopperTransitionContext",
});

export const PopperTransitionContext: SafeContext<PopperTransitionContextValue> = context;
export const usePopperTransition: UseSafeContext<PopperTransitionContextValue> = hook;
