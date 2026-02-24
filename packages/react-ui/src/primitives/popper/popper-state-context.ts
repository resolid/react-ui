import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperStateContextValue = {
  open: boolean;
};

const [context, hook] = createSafeContext<PopperStateContextValue>({
  name: "PopperStateContext",
});

export const PopperStateContext: SafeContext<PopperStateContextValue> = context;
export const usePopperState: UseSafeContext<PopperStateContextValue> = hook;
