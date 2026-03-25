import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperTriggerContextValue = {
  setReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element>) => AnyObject;
};

const [context, hook] = createSafeContext<PopperTriggerContextValue>({
  name: "PopperTriggerContext",
});

export const PopperTriggerContext: SafeContext<PopperTriggerContextValue> = context;
export const usePopperTrigger: UseSafeContext<PopperTriggerContextValue> = hook;
