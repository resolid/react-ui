import type { Direction } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

const [context, hook] = createSafeContext<Direction>({
  name: "DirectionContext",
});

export const DirectionContext: SafeContext<Direction> = context;
export const useDirection: UseSafeContext<Direction> = hook;
