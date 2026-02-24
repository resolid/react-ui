import type { Orientation } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

const [context, hook] = createSafeContext<Orientation>({
  name: "OrientationContext",
});

export const OrientationContext: SafeContext<Orientation> = context;
export const useOrientation: UseSafeContext<Orientation> = hook;
