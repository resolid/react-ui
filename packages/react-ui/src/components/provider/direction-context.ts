import type { Direction } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

const desc = createSafeContext<Direction>({
  name: "DirectionContext",
});

export const DirectionContext: SafeContext<Direction> = desc[0];
export const useDirection: UseSafeContext<Direction> = desc[1];
