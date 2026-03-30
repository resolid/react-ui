import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperTrigger } from "../popper/popper-trigger";
import { useMenuHover } from "./menu-hover-context";

export function MenuTrigger(
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): JSX.Element {
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
