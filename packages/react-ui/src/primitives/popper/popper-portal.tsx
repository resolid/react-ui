import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import { Portal } from "../../components/portal/portal";
import { usePopperTransition } from "./popper-transtion-context";

export function PopperPortal({ children }: PropsWithChildren): JSX.Element | null {
  const { mounted } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  return <Portal>{children}</Portal>;
}
