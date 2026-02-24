import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperDispatchContextValue = {
  handleOpen?: () => void;
  handleClose: () => void;
};

const [context, hook] = createSafeContext<PopperDispatchContextValue>({
  name: "PopperDispatchContext",
});

export const PopperDispatchContext: SafeContext<PopperDispatchContextValue> = context;
export const usePopperDispatch: UseSafeContext<PopperDispatchContextValue> = hook;
