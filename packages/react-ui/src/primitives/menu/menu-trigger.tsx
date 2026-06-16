import type { ComponentProps, ReactNode } from "react";
import { PopperTrigger } from "../popper/popper-trigger";
import { useMenuHover } from "./menu-hover-context";

export function MenuTrigger(
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): ReactNode {
  const { setHoverEnabled } = useMenuHover();

  return (
    <PopperTrigger
      active
      {...props}
      onMouseEnter={() => {
        setHoverEnabled(true);
      }}
    />
  );
}
