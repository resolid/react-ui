import type { ComponentProps, PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperArrow, type PopperArrowProps } from "../../primitives/popper/popper-arrow";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { PopoverProvider } from "./popover-provider";
import { type PopoverProps, usePopover } from "./use-popover";

export type { PopoverProps };

export function Popover(props: PropsWithChildren<PopoverProps>): JSX.Element {
  const { children, ...rest } = props;

  const popover = usePopover(rest);

  return <PopoverProvider value={popover}>{children}</PopoverProvider>;
}

export function PopoverTrigger(
  props: Omit<ComponentProps<typeof PopperTrigger>, "active">,
): JSX.Element {
  return <PopperTrigger active {...props} />;
}

export function PopoverArrow(props: PopperArrowProps): JSX.Element {
  const { width = 11, height = 6, ...rest } = props;

  return <PopperArrow width={width} height={height} {...rest} />;
}

export { PopperAnchor as PopoverAnchor } from "../../primitives/popper/popper-anchor";
export { PopperClose as PopoverClose } from "../../primitives/popper/popper-close";
export { PopperDescription as PopoverDescription } from "../../primitives/popper/popper-description";
export { PopperTitle as PopoverTitle } from "../../primitives/popper/popper-title";

export { PopoverContent } from "./popover-content";
