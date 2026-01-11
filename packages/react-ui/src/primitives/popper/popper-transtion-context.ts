import type { TransitionStatus } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperTransitionContextValue = {
  status: TransitionStatus;
  mounted: boolean;
  duration: number;
};

const dest = createSafeContext<PopperTransitionContextValue>({
  name: "PopperTransitionContext",
});

export const PopperTransitionContext: SafeContext<PopperTransitionContextValue> = dest[0];
export const usePopperTransition: UseSafeContext<PopperTransitionContextValue> = dest[1];
