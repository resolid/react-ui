import type { PropsWithChildren, ReactNode } from "react";
import { Portal } from "../../components/portal/portal";
import { usePopperTransition } from "./popper-transtion-context";

export function PopperPortal({ children }: PropsWithChildren): ReactNode {
  const { mounted } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  return <Portal>{children}</Portal>;
}
