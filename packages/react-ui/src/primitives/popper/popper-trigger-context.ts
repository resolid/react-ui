import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import type { AnyObject } from "../polymorphic";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperTriggerContextValue = {
  setReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element>) => AnyObject;
};

const [context, hook] = createSafeContext<PopperTriggerContextValue>({
  name: "PopperTriggerContext",
});

export const PopperTriggerContext: SafeContext<PopperTriggerContextValue> = context;
export const usePopperTrigger: UseSafeContext<PopperTriggerContextValue> = hook;
