import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { Direction } from "../../shared/types";

const desc = createSafeContext<Direction>({
  name: "DirectionContext",
});

export const DirectionContext: SafeContext<Direction> = desc[0];
export const useDirection: UseSafeContext<Direction> = desc[1];
